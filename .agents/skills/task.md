# MERN Integration — Task Tracker

## Phase 1: Backend Infrastructure
- [x] Install backend dependencies (bcryptjs, jsonwebtoken, helmet, etc.)
- [x] Update `back -end/.env` (JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV)
- [x] Update `back -end/package.json` (scripts, deps)
- [x] Create `back -end/config/db.js`
- [x] Create `back -end/config/env.js` (Handled directly in server config)
- [x] Create `back -end/middleware/asyncHandler.js`
- [x] Create `back -end/middleware/errorHandler.js`
- [x] Create `back -end/middleware/auth.js`
- [x] Create `back -end/utils/responseFormatter.js`
- [x] Create `back -end/validators/userValidators.js`
- [x] Rewrite `back -end/Models/User.js` (bcrypt, no confirmPassword, select:false)
- [x] Create `back -end/Models/Contact.js`
- [x] Create `back -end/Models/Enquiry.js`
- [x] Rewrite `back -end/Controllers/userController.js` (bcrypt, JWT, no plain-text)
- [x] Create `back -end/Controllers/contactController.js`
- [x] Create `back -end/Controllers/enquiryController.js`
- [x] Rewrite `back -end/Routers/UserRouters.js`
- [x] Create `back -end/Routers/contactRoutes.js`
- [x] Create `back -end/Routers/enquiryRoutes.js`
- [x] Rewrite `back -end/server.js` (app setup + security middleware, fixed order)

## Phase 2: Frontend API Layer
- [x] Create `src/api/axiosInstance.js`
- [x] Create `src/api/authApi.js`
- [x] Create `src/api/contactApi.js`
- [x] Create `src/api/enquiryApi.js`
- [x] Update `vite.config.js` (add proxy /api → localhost:5000)

## Phase 3: Frontend Context + Page Integration
- [x] Rewrite `src/context/AuthContext.jsx` (real JWT auth)
- [x] Update `src/pages/Signup.jsx` (async, loading state)
- [x] Update `src/pages/Login.jsx` (async, loading state)
- [x] Update `src/pages/ForgotPassword.jsx` (real API call)
- [x] Update `src/pages/Contact.jsx` (real API call)
- [x] Update `src/pages/Enquiry.jsx` (real API call)
- [x] Update `src/pages/StudentDashboard.jsx` (real user data from JWT)

## Phase 4: Verification
- [x] Start backend, confirm no errors
- [x] Test register endpoint
- [x] Test login endpoint
- [x] Test frontend register flow
- [x] Test frontend login flow
- [x] Test contact / enquiry forms
- [x] Restructure frontend into a separate `front end` folder and update configurations
- [x] Verify project structure build and dependency integrity
