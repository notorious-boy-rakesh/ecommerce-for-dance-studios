import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import About from '../pages/About';
import Session from '../pages/Session';
import Contact from '../pages/Contact';
import Enquiry from '../pages/Enquiry';
import StudentDashboard from '../pages/StudentDashboard';
import FAQ from '../pages/FAQ';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import NotFound from '../pages/NotFound';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Welcome page (fullscreen, no navbar) */}
            <Route
                path="/welcome"
                element={
                    <ProtectedRoute>
                        <Welcome />
                    </ProtectedRoute>
                }
            />

            {/* Protected Routes wrapped in MainLayout */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/session" element={<Session />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
                path="/admin/:tab"
                element={
                    <AdminProtectedRoute>
                        <AdminDashboard />
                    </AdminProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <AdminProtectedRoute>
                        <Navigate to="/admin/dashboard" replace />
                    </AdminProtectedRoute>
                }
            />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
