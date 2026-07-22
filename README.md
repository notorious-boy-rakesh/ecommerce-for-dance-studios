# 💃 Dance School Management System

A production-quality full-stack **MERN** application for managing a dance school — students, teachers, classes, fees, attendance, and more.

---

## 📁 Project Structure

```
dance-school-management-system/
│
├── 📂 backend/                  # Express + Mongoose REST API
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── Controllers/
│   │   ├── userController.js    # Register, Login, GetMe, ForgotPassword
│   │   ├── contactController.js # Contact form submissions
│   │   └── enquiryController.js # Admission enquiry submissions
│   ├── middleware/
│   │   ├── asyncHandler.js      # Async error wrapper
│   │   ├── auth.js              # JWT protect + adminOnly
│   │   └── errorHandler.js      # Global error handler
│   ├── Models/
│   │   ├── User.js              # User schema (bcrypt, JWT)
│   │   ├── Contact.js           # Contact messages
│   │   └── Enquiry.js           # Admission enquiries
│   ├── Routers/
│   │   ├── UserRouters.js       # /api/users/*
│   │   ├── contactRoutes.js     # /api/contact
│   │   └── enquiryRoutes.js     # /api/enquiry
│   ├── utils/
│   │   └── responseFormatter.js # sendSuccess / sendError
│   ├── validators/
│   │   └── userValidators.js    # express-validator chains
│   ├── .env                     # Environment variables (not committed)
│   ├── package.json
│   └── server.js                # Express app entry point
│
├── 📂 frontend/                 # React 19 + Vite SPA
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.js  # Axios base with JWT interceptor
│   │   │   ├── authApi.js        # Auth API calls
│   │   │   ├── contactApi.js     # Contact form API
│   │   │   └── enquiryApi.js     # Enquiry form API
│   │   ├── components/
│   │   │   ├── Common/GlassCard.jsx
│   │   │   ├── Footer/Footer.jsx
│   │   │   ├── Forms/FormFeedback.jsx
│   │   │   └── Navbar/Navbar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # JWT auth (real backend)
│   │   │   ├── AlertContext.jsx  # Toast alerts
│   │   │   └── ManagementContext.jsx  # Admin data store
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Enquiry.jsx
│   │   │   ├── Session.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── TermsAndConditions.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   └── NotFound.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminProtectedRoute.jsx
│   │   ├── styles/
│   │   │   ├── variables.css
│   │   │   ├── global.css
│   │   │   ├── components.css
│   │   │   ├── animations.css
│   │   │   └── admin.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js           # Vite + /api proxy
│   └── package.json
│
├── .gitignore
├── package.json                  # Root convenience scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Setup

```bash
git clone <repo-url>
cd dance-school-management-system
```

### 2. Configure Environment

Create `backend/.env`:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/test
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Install Dependencies

```bash
# Install backend deps
cd "backend"
npm install

# Install frontend deps
cd "../frontend"
npm install
```

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd "backend"
node server.js
# ✅ MongoDB Connected
# 🚀 Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd "frontend"
npm run dev
# ✅ VITE ready at http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET`  | `/api/health` | Public | Health check |
| `POST` | `/api/users/register` | Public | Register new user |
| `POST` | `/api/users/login` | Public | Login + JWT |
| `GET`  | `/api/users/me` | 🔒 JWT | Get own profile |
| `POST` | `/api/users/forgot-password` | Public | Verify email+mobile |
| `POST` | `/api/contact` | Public | Submit contact message |
| `POST` | `/api/enquiry` | Public | Submit admission enquiry |

---

## 🔐 Security Features

- ✅ Passwords hashed with **bcrypt** (cost factor 12)
- ✅ **JWT** authentication (7-day expiry)
- ✅ **Helmet** — secure HTTP headers
- ✅ **Rate limiting** — 100 req/15min global, 20 req/15min on auth routes
- ✅ **MongoDB sanitization** — blocks `$gt` / `$ne` injection
- ✅ **express-validator** — input validation on all endpoints
- ✅ **CORS** — restricted to Vite dev origin
- ✅ Payload size limit — 10KB max

---

## 🗄️ MongoDB Collections (test database)

| Collection | Description |
|------------|-------------|
| `users` | Registered student accounts |
| `contacts` | Contact form submissions |
| `enquiries` | Admission enquiry forms |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router 7, Axios |
| Backend | Express 5, Mongoose 9, Node.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |
| Security | Helmet, express-rate-limit |

---

## 👤 Default Admin Credentials
```
Username: admin
Password: Admin@123
```
> Admin login is frontend-only (no backend admin model). Change these in `AuthContext.jsx` or move to `.env` for production.
