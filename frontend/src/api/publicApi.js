
import axiosInstance from './axiosInstance';

export const fetchPublicTeachers = async () => { const res = await axiosInstance.get('/public/teachers'); return res.data; };
export const fetchPublicDanceClasss = async () => { const res = await axiosInstance.get('/public/danceclasss'); return res.data; };
export const fetchPublicBatchs = async () => { const res = await axiosInstance.get('/public/batchs'); return res.data; };
export const fetchPublicEvents = async () => { const res = await axiosInstance.get('/public/events'); return res.data; };
export const fetchPublicPerformances = async () => { const res = await axiosInstance.get('/public/performances'); return res.data; };
export const fetchPublicAttendances = async () => { const res = await axiosInstance.get('/public/attendances'); return res.data; };
export const fetchPublicFees = async () => { const res = await axiosInstance.get('/public/fees'); return res.data; };
export const fetchPublicTimetables = async () => { const res = await axiosInstance.get('/public/timetables'); return res.data; };
export const fetchPublicAnnouncements = async () => { const res = await axiosInstance.get('/public/announcements'); return res.data; };
export const fetchPublicCertificates = async () => { const res = await axiosInstance.get('/public/certificates'); return res.data; };
