import axiosInstance from './axiosInstance';

/**
 * Auth API — all authentication calls to the backend
 */

/**
 * Register a new user account
 * @param {{ fullName, email, mobile, username, password, confirmPassword }} data
 * @returns {{ token, user }}
 */
export const registerUser = async (data) => {
    const response = await axiosInstance.post('/users/register', data);
    return response.data;
};

/**
 * Login with username + password
 * @param {{ username, password }} data
 * @returns {{ token, user }}
 */
export const loginUser = async (data) => {
    const response = await axiosInstance.post('/users/login', data);
    return response.data;
};

/**
 * Get the current logged-in user's profile (requires auth token)
 * @returns {{ user }}
 */
export const getMe = async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
};

/**
 * Verify email + mobile for password reset
 * @param {{ email, mobile }} data
 * @returns {{ username }}
 */
export const forgotPassword = async (data) => {
    const response = await axiosInstance.post('/users/forgot-password', data);
    return response.data;
};
