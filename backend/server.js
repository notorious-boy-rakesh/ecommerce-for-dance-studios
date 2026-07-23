require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────

// Set secure HTTP headers
app.use(helmet());

// CORS: Allow only the Vite dev server (and same-origin in production)
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (process.env.NODE_ENV === 'production') {
                const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
                const allowedOrigins = process.env.CLIENT_URL 
                    ? process.env.CLIENT_URL.split(',').map(url => {
                        let trimmed = url.trim();
                        return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
                      }) 
                    : [];
                allowedOrigins.push('http://localhost:5173');
                allowedOrigins.push('https://ecommerce-for-dance-studios-fronten.vercel.app');
                
                if (allowedOrigins.includes(cleanOrigin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            } else {
                // Development mode allows localhost
                const devOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
                if (devOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
                     callback(null, true);
                } else {
                     callback(new Error('Not allowed by CORS'));
                }
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// Rate limiting has been disabled per user request
// Stricter rate limit for auth endpoints disabled per user request

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize MongoDB query injection (e.g., { $gt: "" } attacks)
const sanitizeObject = (obj) => {
    if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
            if (key.startsWith('$')) {
                delete obj[key];
            } else if (typeof obj[key] === 'object') {
                sanitizeObject(obj[key]);
            }
        });
    }
};

app.use((req, res, next) => {
    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);
    next();
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Dance School API is running.',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
const userRouters = require('./Routers/UserRouters');
const contactRoutes = require('./Routers/contactRoutes');
const enquiryRoutes = require('./Routers/enquiryRoutes');
const adminRoutes = require('./Routers/adminRoutes');
const publicRoutes = require('./Routers/publicRoutes');
const { adminProtect } = require('./middleware/adminAuth');

app.use('/api/users', userRouters);
app.use('/api/contact', contactRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/admin', adminProtect, adminRoutes);
app.use('/api/public', publicRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ─── Global Error Handler (MUST be last) ─────────────────────────────────────
app.use(errorHandler);

// ─── Start Server (connect DB first, then listen) ────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        console.log(`📡 API available at: http://localhost:${PORT}/api`);
        console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    });
});