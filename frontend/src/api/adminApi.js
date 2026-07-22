import axiosInstance from './axiosInstance';

// In a real app this should come from env, but for this demo app it matches the backend default
const ADMIN_SECRET = 'super-secret-admin-key-2026';

const adminConfig = {
    headers: {
        'x-admin-secret': ADMIN_SECRET
    }
};

// ─── Students ─────────────────────────────────────────────────────────────────
export const fetchStudents = async () => {
    const response = await axiosInstance.get('/admin/students', adminConfig);
    return response.data;
};

export const createStudent = async (data) => {
    const response = await axiosInstance.post('/admin/students', data, adminConfig);
    return response.data;
};
export const updateStudent = async (id, data) => {
    const response = await axiosInstance.put(`/admin/students/${id}`, data, adminConfig);
    return response.data;
};
export const deleteStudent = async (id) => {
    const response = await axiosInstance.delete(`/admin/students/${id}`, adminConfig);
    return response.data;
};


// ─── Enquiries (Admissions) ───────────────────────────────────────────────────
export const fetchEnquiries = async () => {
    const response = await axiosInstance.get('/admin/enquiries', adminConfig);
    return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/admin/enquiries/${id}/status`, { status }, adminConfig);
    return response.data;
};

export const deleteEnquiry = async (id) => {
    const response = await axiosInstance.delete(`/admin/enquiries/${id}`, adminConfig);
    return response.data;
};

// ─── Contacts (Messages) ──────────────────────────────────────────────────────
export const fetchContacts = async () => {
    const response = await axiosInstance.get('/admin/contacts', adminConfig);
    return response.data;
};

export const updateContactStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/admin/contacts/${id}/status`, { status }, adminConfig);
    return response.data;
};

export const deleteContact = async (id) => {
    const response = await axiosInstance.delete(`/admin/contacts/${id}`, adminConfig);
    return response.data;
};

// ─── Auto-generated CRUD Wrappers ──────────────────────────────────────────────

// Teacher
export const fetchTeachers = async () => { const res = await axiosInstance.get('/admin/teachers', adminConfig); return res.data; };
export const createTeacher = async (data) => { const res = await axiosInstance.post('/admin/teachers', data, adminConfig); return res.data; };
export const updateTeacher = async (id, data) => { const res = await axiosInstance.put(`/admin/teachers/${id}`, data, adminConfig); return res.data; };
export const deleteTeacher = async (id) => { const res = await axiosInstance.delete(`/admin/teachers/${id}`, adminConfig); return res.data; };

// DanceClass
export const fetchDanceClasss = async () => { const res = await axiosInstance.get('/admin/danceclasss', adminConfig); return res.data; };
export const createDanceClass = async (data) => { const res = await axiosInstance.post('/admin/danceclasss', data, adminConfig); return res.data; };
export const updateDanceClass = async (id, data) => { const res = await axiosInstance.put(`/admin/danceclasss/${id}`, data, adminConfig); return res.data; };
export const deleteDanceClass = async (id) => { const res = await axiosInstance.delete(`/admin/danceclasss/${id}`, adminConfig); return res.data; };

// Batch
export const fetchBatchs = async () => { const res = await axiosInstance.get('/admin/batchs', adminConfig); return res.data; };
export const createBatch = async (data) => { const res = await axiosInstance.post('/admin/batchs', data, adminConfig); return res.data; };
export const updateBatch = async (id, data) => { const res = await axiosInstance.put(`/admin/batchs/${id}`, data, adminConfig); return res.data; };
export const deleteBatch = async (id) => { const res = await axiosInstance.delete(`/admin/batchs/${id}`, adminConfig); return res.data; };

// Event
export const fetchEvents = async () => { const res = await axiosInstance.get('/admin/events', adminConfig); return res.data; };
export const createEvent = async (data) => { const res = await axiosInstance.post('/admin/events', data, adminConfig); return res.data; };
export const updateEvent = async (id, data) => { const res = await axiosInstance.put(`/admin/events/${id}`, data, adminConfig); return res.data; };
export const deleteEvent = async (id) => { const res = await axiosInstance.delete(`/admin/events/${id}`, adminConfig); return res.data; };

// Performance
export const fetchPerformances = async () => { const res = await axiosInstance.get('/admin/performances', adminConfig); return res.data; };
export const createPerformance = async (data) => { const res = await axiosInstance.post('/admin/performances', data, adminConfig); return res.data; };
export const updatePerformance = async (id, data) => { const res = await axiosInstance.put(`/admin/performances/${id}`, data, adminConfig); return res.data; };
export const deletePerformance = async (id) => { const res = await axiosInstance.delete(`/admin/performances/${id}`, adminConfig); return res.data; };

// Attendance
export const fetchAttendances = async () => { const res = await axiosInstance.get('/admin/attendances', adminConfig); return res.data; };
export const createAttendance = async (data) => { const res = await axiosInstance.post('/admin/attendances', data, adminConfig); return res.data; };
export const updateAttendance = async (id, data) => { const res = await axiosInstance.put(`/admin/attendances/${id}`, data, adminConfig); return res.data; };
export const deleteAttendance = async (id) => { const res = await axiosInstance.delete(`/admin/attendances/${id}`, adminConfig); return res.data; };

// Fee
export const fetchFees = async () => { const res = await axiosInstance.get('/admin/fees', adminConfig); return res.data; };
export const createFee = async (data) => { const res = await axiosInstance.post('/admin/fees', data, adminConfig); return res.data; };
export const updateFee = async (id, data) => { const res = await axiosInstance.put(`/admin/fees/${id}`, data, adminConfig); return res.data; };
export const deleteFee = async (id) => { const res = await axiosInstance.delete(`/admin/fees/${id}`, adminConfig); return res.data; };

// Timetable
export const fetchTimetables = async () => { const res = await axiosInstance.get('/admin/timetables', adminConfig); return res.data; };
export const createTimetable = async (data) => { const res = await axiosInstance.post('/admin/timetables', data, adminConfig); return res.data; };
export const updateTimetable = async (id, data) => { const res = await axiosInstance.put(`/admin/timetables/${id}`, data, adminConfig); return res.data; };
export const deleteTimetable = async (id) => { const res = await axiosInstance.delete(`/admin/timetables/${id}`, adminConfig); return res.data; };

// Announcement
export const fetchAnnouncements = async () => { const res = await axiosInstance.get('/admin/announcements', adminConfig); return res.data; };
export const createAnnouncement = async (data) => { const res = await axiosInstance.post('/admin/announcements', data, adminConfig); return res.data; };
export const updateAnnouncement = async (id, data) => { const res = await axiosInstance.put(`/admin/announcements/${id}`, data, adminConfig); return res.data; };
export const deleteAnnouncement = async (id) => { const res = await axiosInstance.delete(`/admin/announcements/${id}`, adminConfig); return res.data; };

// Certificate
export const fetchCertificates = async () => { const res = await axiosInstance.get('/admin/certificates', adminConfig); return res.data; };
export const createCertificate = async (data) => { const res = await axiosInstance.post('/admin/certificates', data, adminConfig); return res.data; };
export const updateCertificate = async (id, data) => { const res = await axiosInstance.put(`/admin/certificates/${id}`, data, adminConfig); return res.data; };
export const deleteCertificate = async (id) => { const res = await axiosInstance.delete(`/admin/certificates/${id}`, adminConfig); return res.data; };
