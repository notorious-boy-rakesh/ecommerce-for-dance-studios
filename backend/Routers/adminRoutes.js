const express = require('express');
const router = express.Router();
const {
    getStudents,
    getEnquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    getContacts,
    updateContactStatus,
    deleteContact
} = require('../Controllers/adminController');
const adminController = require('../Controllers/adminController');

// All routes here are protected by the adminProtect middleware mounted in server.js

// Students
router.get('/students', getStudents);
// Admin Student Management Routes
router.post('/students', adminController.addStudent);
router.put('/students/:id', adminController.updateStudent);
router.delete('/students/:id', adminController.deleteStudent);


// Enquiries
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

// Contacts
router.get('/contacts', getContacts);
router.patch('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);


// Teacher Routes
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.addTeacher);
router.put('/teachers/:id', adminController.updateTeacher);
router.delete('/teachers/:id', adminController.deleteTeacher);

// DanceClass Routes
router.get('/danceclasss', adminController.getDanceClasss);
router.post('/danceclasss', adminController.addDanceClass);
router.put('/danceclasss/:id', adminController.updateDanceClass);
router.delete('/danceclasss/:id', adminController.deleteDanceClass);

// Batch Routes
router.get('/batchs', adminController.getBatchs);
router.post('/batchs', adminController.addBatch);
router.put('/batchs/:id', adminController.updateBatch);
router.delete('/batchs/:id', adminController.deleteBatch);

// Event Routes
router.get('/events', adminController.getEvents);
router.post('/events', adminController.addEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

// Performance Routes
router.get('/performances', adminController.getPerformances);
router.post('/performances', adminController.addPerformance);
router.put('/performances/:id', adminController.updatePerformance);
router.delete('/performances/:id', adminController.deletePerformance);

// Attendance Routes
router.get('/attendances', adminController.getAttendances);
router.post('/attendances', adminController.addAttendance);
router.put('/attendances/:id', adminController.updateAttendance);
router.delete('/attendances/:id', adminController.deleteAttendance);

// Fee Routes
router.get('/fees', adminController.getFees);
router.post('/fees', adminController.addFee);
router.put('/fees/:id', adminController.updateFee);
router.delete('/fees/:id', adminController.deleteFee);

// Timetable Routes
router.get('/timetables', adminController.getTimetables);
router.post('/timetables', adminController.addTimetable);
router.put('/timetables/:id', adminController.updateTimetable);
router.delete('/timetables/:id', adminController.deleteTimetable);

// Announcement Routes
router.get('/announcements', adminController.getAnnouncements);
router.post('/announcements', adminController.addAnnouncement);
router.put('/announcements/:id', adminController.updateAnnouncement);
router.delete('/announcements/:id', adminController.deleteAnnouncement);

// Certificate Routes
router.get('/certificates', adminController.getCertificates);
router.post('/certificates', adminController.addCertificate);
router.put('/certificates/:id', adminController.updateCertificate);
router.delete('/certificates/:id', adminController.deleteCertificate);

module.exports = router;
