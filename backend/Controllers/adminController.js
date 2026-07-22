const User = require('../Models/User');
const Enquiry = require('../Models/Enquiry');
const Contact = require('../Models/Contact');
const Teacher = require('../Models/Teacher');
const DanceClass = require('../Models/DanceClass');
const Batch = require('../Models/Batch');
const Event = require('../Models/Event');
const Performance = require('../Models/Performance');
const Attendance = require('../Models/Attendance');
const Fee = require('../Models/Fee');
const Timetable = require('../Models/Timetable');
const Announcement = require('../Models/Announcement');
const Certificate = require('../Models/Certificate');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// ─── Students (Registered Users) ──────────────────────────────────────────────
const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
        sendSuccess(res, students, 'Students fetched successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

// ─── Enquiries ────────────────────────────────────────────────────────────────
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        sendSuccess(res, enquiries, 'Enquiries fetched successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
        if (!enquiry) return sendError(res, 'Enquiry not found', 404);
        
        sendSuccess(res, enquiry, 'Enquiry status updated');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) return sendError(res, 'Enquiry not found', 404);
        
        sendSuccess(res, null, 'Enquiry deleted successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

// ─── Contacts (Messages) ──────────────────────────────────────────────────────
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        sendSuccess(res, contacts, 'Contacts fetched successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
        if (!contact) return sendError(res, 'Contact not found', 404);
        
        sendSuccess(res, contact, 'Contact status updated');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) return sendError(res, 'Contact not found', 404);
        
        sendSuccess(res, null, 'Contact deleted successfully');
    } catch (error) {
        sendError(res, error.message, 500);
    }
};



// ─── Auto-generated CRUD ──────────────────────────────────────────────

// Teacher
const getTeachers = async (req, res) => {
    try { const data = await Teacher.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Teacher fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addTeacher = async (req, res) => {
    try { const data = await Teacher.create(req.body); sendSuccess(res, data, 'Teacher created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateTeacher = async (req, res) => {
    try { const data = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Teacher updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteTeacher = async (req, res) => {
    try { const data = await Teacher.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Teacher deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// DanceClass
// DanceClass
const getDanceClasss = async (req, res) => {
    try { const data = await DanceClass.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'DanceClass fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addDanceClass = async (req, res) => {
    try { const data = await DanceClass.create(req.body); sendSuccess(res, data, 'DanceClass created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateDanceClass = async (req, res) => {
    try { const data = await DanceClass.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'DanceClass updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteDanceClass = async (req, res) => {
    try { const data = await DanceClass.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'DanceClass deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Batch
const getBatchs = async (req, res) => {
    try { const data = await Batch.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Batch fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addBatch = async (req, res) => {
    try { const data = await Batch.create(req.body); sendSuccess(res, data, 'Batch created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateBatch = async (req, res) => {
    try { const data = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Batch updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteBatch = async (req, res) => {
    try { const data = await Batch.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Batch deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Event
const getEvents = async (req, res) => {
    try { const data = await Event.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Event fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addEvent = async (req, res) => {
    try { const data = await Event.create(req.body); sendSuccess(res, data, 'Event created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateEvent = async (req, res) => {
    try { const data = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Event updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteEvent = async (req, res) => {
    try { const data = await Event.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Event deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Performance
const getPerformances = async (req, res) => {
    try { const data = await Performance.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Performance fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addPerformance = async (req, res) => {
    try { const data = await Performance.create(req.body); sendSuccess(res, data, 'Performance created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updatePerformance = async (req, res) => {
    try { const data = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Performance updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deletePerformance = async (req, res) => {
    try { const data = await Performance.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Performance deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Attendance
const getAttendances = async (req, res) => {
    try { const data = await Attendance.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Attendance fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addAttendance = async (req, res) => {
    try {
        const { date, studentId, className, status } = req.body;
        const data = await Attendance.findOneAndUpdate(
            { date, studentId, className },
            { status },
            { new: true, upsert: true }
        );
        sendSuccess(res, data, 'Attendance marked');
    }
    catch (e) { sendError(res, e.message, 500); }
};
const updateAttendance = async (req, res) => {
    try { const data = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Attendance updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteAttendance = async (req, res) => {
    try { const data = await Attendance.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Attendance deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Fee
const getFees = async (req, res) => {
    try { const data = await Fee.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Fee fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addFee = async (req, res) => {
    try { const data = await Fee.create(req.body); sendSuccess(res, data, 'Fee created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateFee = async (req, res) => {
    try { const data = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Fee updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteFee = async (req, res) => {
    try { const data = await Fee.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Fee deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Timetable
const getTimetables = async (req, res) => {
    try { const data = await Timetable.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Timetable fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addTimetable = async (req, res) => {
    try { const data = await Timetable.create(req.body); sendSuccess(res, data, 'Timetable created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateTimetable = async (req, res) => {
    try { const data = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Timetable updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteTimetable = async (req, res) => {
    try { const data = await Timetable.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Timetable deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Announcement
const getAnnouncements = async (req, res) => {
    try { const data = await Announcement.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Announcement fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addAnnouncement = async (req, res) => {
    try { const data = await Announcement.create(req.body); sendSuccess(res, data, 'Announcement created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateAnnouncement = async (req, res) => {
    try { const data = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Announcement updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteAnnouncement = async (req, res) => {
    try { const data = await Announcement.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Announcement deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};

// Certificate
const getCertificates = async (req, res) => {
    try { const data = await Certificate.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Certificate fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const addCertificate = async (req, res) => {
    try { const data = await Certificate.create(req.body); sendSuccess(res, data, 'Certificate created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const updateCertificate = async (req, res) => {
    try { const data = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, 'Certificate updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const deleteCertificate = async (req, res) => {
    try { const data = await Certificate.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, 'Certificate deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};


// ─── Student CRUD (Admin Managed) ──────────────────────────────────────────────
const addStudent = async (req, res) => {
    try {
        const { name, email, mobile, batchId, status, admissionDate } = req.body;
        const username = (name.split(' ')[0] || 'student').toLowerCase() + Math.floor(Math.random()*10000);
        const User = require('../Models/User');
        const newUser = await User.create({
            fullName: name,
            email,
            mobile,
            username,
            password: 'password123',
            role: 'student',
            batchId: batchId || null,
            status: status || 'Active',
            admissionDate: admissionDate || new Date().toISOString().split('T')[0]
        });
        const { sendSuccess } = require('../utils/responseFormatter');
        sendSuccess(res, newUser, 'Student created successfully');
    } catch (e) {
        const { sendError } = require('../utils/responseFormatter');
        sendError(res, e.message, 500);
    }
};

const updateStudent = async (req, res) => {
    try {
        const { name, email, mobile, batchId, status, admissionDate } = req.body;
        const User = require('../Models/User');
        const updated = await User.findByIdAndUpdate(req.params.id, { 
            fullName: name, 
            email, 
            mobile,
            batchId,
            status,
            admissionDate
        }, { new: true });
        const { sendSuccess } = require('../utils/responseFormatter');
        sendSuccess(res, updated, 'Student updated successfully');
    } catch (e) {
        const { sendError } = require('../utils/responseFormatter');
        sendError(res, e.message, 500);
    }
};

const deleteStudent = async (req, res) => {
    try {
        const User = require('../Models/User');
        await User.findByIdAndDelete(req.params.id);
        const { sendSuccess } = require('../utils/responseFormatter');
        sendSuccess(res, null, 'Student deleted successfully');
    } catch (e) {
        const { sendError } = require('../utils/responseFormatter');
        sendError(res, e.message, 500);
    }
};

module.exports = {
    addStudent, updateStudent, deleteStudent,
    getStudents,
    getEnquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    getContacts,
    updateContactStatus,
    deleteContact
,
    getTeachers, addTeacher, updateTeacher, deleteTeacher,
    getDanceClasss, addDanceClass, updateDanceClass, deleteDanceClass,
    getBatchs, addBatch, updateBatch, deleteBatch,
    getEvents, addEvent, updateEvent, deleteEvent,
    getPerformances, addPerformance, updatePerformance, deletePerformance,
    getAttendances, addAttendance, updateAttendance, deleteAttendance,
    getFees, addFee, updateFee, deleteFee,
    getTimetables, addTimetable, updateTimetable, deleteTimetable,
    getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    getCertificates, addCertificate, updateCertificate, deleteCertificate
};
