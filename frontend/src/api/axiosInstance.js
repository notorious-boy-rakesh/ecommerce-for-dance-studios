import axios from 'axios';

/**
 * Central Axios instance for all API calls.
 * - baseURL: uses Vite proxy (/api) so no CORS issues in development
 * - Automatically attaches JWT Bearer token to every request
 * - Auto-clears auth state and redirects to /login on 401
 */
const axiosInstance = axios.create({
    // Use VITE_API_URL if provided. Otherwise, use the Render URL in production, or '/api' in local development.
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ecommerce-for-dance-studios.onrender.com/api' : '/api'),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request Interceptor: Attach JWT ──────────────────────────────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        // Fix for Axios baseURL issue: if url has a leading slash, it drops the /api from the baseURL.
        if (config.url && config.url.startsWith('/')) {
            config.url = config.url.substring(1);
        }

        // Ensure baseURL always ends with a slash so it concatenates properly
        if (config.baseURL && !config.baseURL.endsWith('/')) {
            config.baseURL += '/';
        }

        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 (token expired / invalid) ───────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear stale auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            // Redirect to login (only if not already there)
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
