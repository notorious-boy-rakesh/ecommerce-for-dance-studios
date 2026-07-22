const fs = require('fs');
const path = require('path');

const ctxPath = path.join(__dirname, 'src', 'context', 'ManagementContext.jsx');
let content = fs.readFileSync(ctxPath, 'utf8');

const crudReplacements = [
    { old: "const addTeacher = async (teacher) => { await adminApi.createTeacher(teacher); await refreshFromBackend(); };", new: "const addTeacher = async (teacher) => { try { await adminApi.createTeacher(teacher); await refreshFromBackend(); alert('Teacher added successfully!'); } catch (err) { alert('Error adding teacher'); } };" },
    { old: "const updateTeacher = async (id, data) => { await adminApi.updateTeacher(id, data); await refreshFromBackend(); };", new: "const updateTeacher = async (id, data) => { try { await adminApi.updateTeacher(id, data); await refreshFromBackend(); alert('Teacher updated successfully!'); } catch (err) { alert('Error updating teacher'); } };" },
    { old: "const deleteTeacher = async (id) => { await adminApi.deleteTeacher(id); await refreshFromBackend(); };", new: "const deleteTeacher = async (id) => { try { await adminApi.deleteTeacher(id); await refreshFromBackend(); alert('Teacher deleted successfully!'); } catch (err) { alert('Error deleting teacher'); } };" },
    
    { old: "const addClass = async (cls) => { await adminApi.createDanceClass(cls); await refreshFromBackend(); };", new: "const addClass = async (cls) => { try { await adminApi.createDanceClass(cls); await refreshFromBackend(); alert('Class added successfully!'); } catch (err) { alert('Error adding class'); } };" },
    { old: "const updateClass = async (id, data) => { await adminApi.updateDanceClass(id, data); await refreshFromBackend(); };", new: "const updateClass = async (id, data) => { try { await adminApi.updateDanceClass(id, data); await refreshFromBackend(); alert('Class updated successfully!'); } catch (err) { alert('Error updating class'); } };" },
    { old: "const deleteClass = async (id) => { await adminApi.deleteDanceClass(id); await refreshFromBackend(); };", new: "const deleteClass = async (id) => { try { await adminApi.deleteDanceClass(id); await refreshFromBackend(); alert('Class deleted successfully!'); } catch (err) { alert('Error deleting class'); } };" },
    
    { old: "const addBatch = async (batch) => { await adminApi.createBatch(batch); await refreshFromBackend(); };", new: "const addBatch = async (batch) => { try { await adminApi.createBatch(batch); await refreshFromBackend(); alert('Batch added successfully!'); } catch (err) { alert('Error adding batch'); } };" },
    { old: "const updateBatch = async (id, data) => { await adminApi.updateBatch(id, data); await refreshFromBackend(); };", new: "const updateBatch = async (id, data) => { try { await adminApi.updateBatch(id, data); await refreshFromBackend(); alert('Batch updated successfully!'); } catch (err) { alert('Error updating batch'); } };" },
    { old: "const deleteBatch = async (id) => { await adminApi.deleteBatch(id); await refreshFromBackend(); };", new: "const deleteBatch = async (id) => { try { await adminApi.deleteBatch(id); await refreshFromBackend(); alert('Batch deleted successfully!'); } catch (err) { alert('Error deleting batch'); } };" },

    { old: "const addSession = async (session) => { await adminApi.createTimetable(session); await refreshFromBackend(); };", new: "const addSession = async (session) => { try { await adminApi.createTimetable(session); await refreshFromBackend(); alert('Session added successfully!'); } catch (err) { alert('Error adding session'); } };" },
    { old: "const updateSession = async (id, data) => { await adminApi.updateTimetable(id, data); await refreshFromBackend(); };", new: "const updateSession = async (id, data) => { try { await adminApi.updateTimetable(id, data); await refreshFromBackend(); alert('Session updated successfully!'); } catch (err) { alert('Error updating session'); } };" },
    { old: "const deleteSession = async (id) => { await adminApi.deleteTimetable(id); await refreshFromBackend(); };", new: "const deleteSession = async (id) => { try { await adminApi.deleteTimetable(id); await refreshFromBackend(); alert('Session deleted successfully!'); } catch (err) { alert('Error deleting session'); } };" },

    { old: "const addAnnouncement = async (ann) => { await adminApi.createAnnouncement(ann); await refreshFromBackend(); };", new: "const addAnnouncement = async (ann) => { try { await adminApi.createAnnouncement(ann); await refreshFromBackend(); alert('Announcement added successfully!'); } catch (err) { alert('Error adding announcement'); } };" },
    { old: "const updateAnnouncement = async (id, data) => { await adminApi.updateAnnouncement(id, data); await refreshFromBackend(); };", new: "const updateAnnouncement = async (id, data) => { try { await adminApi.updateAnnouncement(id, data); await refreshFromBackend(); alert('Announcement updated successfully!'); } catch (err) { alert('Error updating announcement'); } };" },
    { old: "const deleteAnnouncement = async (id) => { await adminApi.deleteAnnouncement(id); await refreshFromBackend(); };", new: "const deleteAnnouncement = async (id) => { try { await adminApi.deleteAnnouncement(id); await refreshFromBackend(); alert('Announcement deleted successfully!'); } catch (err) { alert('Error deleting announcement'); } };" },

    { old: "const addEvent = async (event) => { await adminApi.createEvent(event); await refreshFromBackend(); };", new: "const addEvent = async (event) => { try { await adminApi.createEvent(event); await refreshFromBackend(); alert('Event added successfully!'); } catch (err) { alert('Error adding event'); } };" },
    { old: "const updateEvent = async (id, data) => { await adminApi.updateEvent(id, data); await refreshFromBackend(); };", new: "const updateEvent = async (id, data) => { try { await adminApi.updateEvent(id, data); await refreshFromBackend(); alert('Event updated successfully!'); } catch (err) { alert('Error updating event'); } };" },
    { old: "const deleteEvent = async (id) => { await adminApi.deleteEvent(id); await refreshFromBackend(); };", new: "const deleteEvent = async (id) => { try { await adminApi.deleteEvent(id); await refreshFromBackend(); alert('Event deleted successfully!'); } catch (err) { alert('Error deleting event'); } };" },

    { old: "const addGalleryPhoto = async (photo) => { await adminApi.createPerformance(photo); await refreshFromBackend(); };", new: "const addGalleryPhoto = async (photo) => { try { await adminApi.createPerformance(photo); await refreshFromBackend(); alert('Photo added successfully!'); } catch (err) { alert('Error adding photo'); } };" },
    { old: "const deleteGalleryPhoto = async (id) => { await adminApi.deletePerformance(id); await refreshFromBackend(); };", new: "const deleteGalleryPhoto = async (id) => { try { await adminApi.deletePerformance(id); await refreshFromBackend(); alert('Photo deleted successfully!'); } catch (err) { alert('Error deleting photo'); } };" },
    
    { old: "const approveAdmission = async (id) => { await adminApi.updateEnquiryStatus(id, 'enrolled'); await refreshFromBackend(); };", new: "const approveAdmission = async (id) => { try { await adminApi.updateEnquiryStatus(id, 'enrolled'); await refreshFromBackend(); alert('Admission approved!'); } catch (err) { alert('Error approving admission'); } };" },
    { old: "const rejectAdmission = async (id) => { await adminApi.updateEnquiryStatus(id, 'rejected'); await refreshFromBackend(); };", new: "const rejectAdmission = async (id) => { try { await adminApi.updateEnquiryStatus(id, 'rejected'); await refreshFromBackend(); alert('Admission rejected!'); } catch (err) { alert('Error rejecting admission'); } };" },
    { old: "const deleteAdmission = async (id) => { await adminApi.deleteEnquiry(id); await refreshFromBackend(); };", new: "const deleteAdmission = async (id) => { try { await adminApi.deleteEnquiry(id); await refreshFromBackend(); alert('Admission deleted!'); } catch (err) { alert('Error deleting admission'); } };" },

    { old: "const markMessageRead = async (id) => { await adminApi.updateContactStatus(id, 'read'); await refreshFromBackend(); };", new: "const markMessageRead = async (id) => { try { await adminApi.updateContactStatus(id, 'read'); await refreshFromBackend(); alert('Message marked as read'); } catch (err) { alert('Error updating message'); } };" },
    { old: "const deleteMessage = async (id) => { await adminApi.deleteContact(id); await refreshFromBackend(); };", new: "const deleteMessage = async (id) => { try { await adminApi.deleteContact(id); await refreshFromBackend(); alert('Message deleted'); } catch (err) { alert('Error deleting message'); } };" }
];

crudReplacements.forEach(rep => {
    content = content.replace(rep.old, rep.new);
});

// markAttendance
content = content.replace(
    "const markAttendance = async (date, studentId, className, status) => { \n        await adminApi.createAttendance({ date, studentId, className, status }); \n        await refreshFromBackend(); \n    };",
    "const markAttendance = async (date, studentId, className, status) => { try { await adminApi.createAttendance({ date, studentId, className, status }); await refreshFromBackend(); } catch (err) { alert('Error marking attendance'); } };"
);

// updateFeeStatus
content = content.replace(
    "const updateFeeStatus = async (feeId, status, payDate = '') => { \n        await adminApi.updateFee(feeId, { status, payDate }); \n        await refreshFromBackend(); \n    };",
    "const updateFeeStatus = async (feeId, status, payDate = '') => { try { await adminApi.updateFee(feeId, { status, payDate }); await refreshFromBackend(); alert('Fee updated'); } catch (err) { alert('Error updating fee'); } };"
);

// generateCertificate
content = content.replace(
    "const generateCertificate = async (studentName, courseName) => { \n        const issueDate = new Date().toISOString().split('T')[0];\n        const certificateNo = `CERT-${courseName.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-4)}`;\n        await adminApi.createCertificate({ studentName, courseName, issueDate, certificateNo }); \n        await refreshFromBackend(); \n    };",
    "const generateCertificate = async (studentName, courseName) => { try { const issueDate = new Date().toISOString().split('T')[0]; const certificateNo = `CERT-${courseName.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-4)}`; await adminApi.createCertificate({ studentName, courseName, issueDate, certificateNo }); await refreshFromBackend(); alert('Certificate generated!'); } catch (err) { alert('Error generating certificate'); } };"
);

// Students
content = content.replace(
    "const addStudent = async () => {};",
    "const addStudent = async (student) => { try { await adminApi.createStudent(student); await refreshFromBackend(); alert('Student added'); } catch (err) { alert('Error adding student. Ensure fields are valid.'); } };"
);
content = content.replace(
    "const updateStudent = async () => {};",
    "const updateStudent = async (id, data) => { try { await adminApi.updateStudent(id, data); await refreshFromBackend(); alert('Student updated'); } catch (err) { alert('Error updating student'); } };"
);
content = content.replace(
    "const deleteStudent = async () => {};",
    "const deleteStudent = async (id) => { try { await adminApi.deleteStudent(id); await refreshFromBackend(); alert('Student deleted'); } catch (err) { alert('Error deleting student'); } };"
);

fs.writeFileSync(ctxPath, content);
console.log('Updated CRUD functions successfully.');
