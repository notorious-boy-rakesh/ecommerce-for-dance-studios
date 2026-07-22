import axiosInstance from './axiosInstance';

/**
 * Contact API
 */

/**
 * Submit a contact form message
 * @param {{ name, email, mobile, subject, message }} data
 * @returns {{ id }}
 */
export const sendContactMessage = async (data) => {
    const response = await axiosInstance.post('/contact', data);
    return response.data;
};
