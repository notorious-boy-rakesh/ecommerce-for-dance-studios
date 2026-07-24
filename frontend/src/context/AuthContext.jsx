import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // ─── State ──────────────────────────────────────────────────────────────────
    const [currentUser, setCurrentUser] = useState(null);       // Full user object from backend
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() =>
        localStorage.getItem('isAdminLoggedIn') === 'true'
    );
    const [authLoading, setAuthLoading] = useState(true); // true while validating stored token on mount

    // ─── On Mount: Validate stored JWT with backend ──────────────────────────
    useEffect(() => {
        const validateToken = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (!storedToken) {
                setAuthLoading(false);
                return;
            }
            try {
                const response = await authApi.getMe();
                if (response.success && response.data?.user) {
                    setCurrentUser(response.data.user);
                    setIsLoggedIn(true);
                    setToken(storedToken);
                } else {
                    clearUserAuth();
                }
            } catch {
                // Token invalid or expired — clear everything
                clearUserAuth();
            } finally {
                setAuthLoading(false);
            }
        };
        validateToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Helpers ──────────────────────────────────────────────────────────────
    const persistAuth = (jwtToken, userObj) => {
        localStorage.setItem('authToken', jwtToken);
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        localStorage.setItem('isLoggedIn', 'true');
        setToken(jwtToken);
        setCurrentUser(userObj);
        setIsLoggedIn(true);
    };

    const clearUserAuth = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        // Legacy keys cleanup
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedUser');
        setToken(null);
        setCurrentUser(null);
        setIsLoggedIn(false);
    };

    // ─── signup: calls real backend ───────────────────────────────────────────
    const signup = useCallback(async (fullName, email, mobile, username, password, confirmPassword) => {
        try {
            const response = await authApi.registerUser({
                fullName, email, mobile, username, password, confirmPassword,
            });
            if (response.success) {
                // Auto-login after successful registration
                persistAuth(response.data.token, response.data.user);
                return { success: true, message: response.message };
            }
            return { success: false, message: response.message || 'Registration failed.' };
        } catch (error) {
            const message =
                error.response?.data?.message ||
                'Registration failed. Please check your details and try again.';
            return { success: false, message };
        }
    }, []);

    // ─── login: calls real backend ────────────────────────────────────────────
    const login = useCallback(async (username, password, rememberMe) => {
        try {
            const response = await authApi.loginUser({ username, password });
            if (response.success) {
                persistAuth(response.data.token, response.data.user);
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('rememberedUser');
                }
                return { success: true, user: response.data.user.fullName };
            }
            return { success: false, message: response.message || 'Login failed.' };
        } catch (error) {
            const message =
                error.response?.data?.message ||
                'Invalid username or password. Please verify your credentials.';
            return { success: false, message };
        }
    }, []);

    // ─── logout ───────────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        clearUserAuth();
        localStorage.removeItem('isAdminLoggedIn');
        sessionStorage.removeItem('loggedInUser');
        setIsAdminLoggedIn(false);
    }, []);

    // ─── adminLogin: kept as frontend-only (no admin backend model) ───────────
    const adminLogin = useCallback((username, password) => {
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            setIsAdminLoggedIn(true);
            return { success: true };
        }
        return { success: false, message: 'Invalid administrator credentials. Please try again.' };
    }, []);

    const adminLogout = useCallback(() => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdminLoggedIn(false);
    }, []);

    // ─── Derived convenience: display name ────────────────────────────────────
    // Keeps backwards compatibility with components that use `user` (a string)
    const user = currentUser?.fullName || currentUser?.username || null;

    return (
        <AuthContext.Provider
            value={{
                // User state
                isLoggedIn,
                user,          // String: display name (backwards compat)
                currentUser,   // Object: full profile from backend
                token,
                authLoading,

                // Auth actions
                login,
                signup,
                logout,

                // Admin auth (frontend-only)
                isAdminLoggedIn,
                adminLogin,
                adminLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
