import axiosInstance from './axiosInstance';

/**
 * Enquiry API
 */

/**
 * Submit an admission enquiry
 * @param {{ studentName, parentName, email, mobile, gender, danceStyle, batch, ageGroup, message }} data
 * @returns {{ id }}
 */
export const sendEnquiry = async (data) => {
    const response = await axiosInstance.post('/enquiry', data);
    return response.data;
};
