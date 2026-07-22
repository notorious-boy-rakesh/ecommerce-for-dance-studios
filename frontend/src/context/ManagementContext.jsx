import React, { createContext, useContext, useState, useEffect } from 'react';
import * as adminApi from '../api/adminApi';

const ManagementContext = createContext(null);

export const useManagement = () => useContext(ManagementContext);

export const ManagementProvider = ({ children }) => {
    // States
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [fees, setFees] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [messages, setMessages] = useState([]);

    const refreshFromBackend = async () => {
        try {
            // Fetch everything
            const [
                liveStudents, liveEnquiries, liveContacts,
                liveTeachers, liveClasses, liveBatches,
                liveTimetable, liveAnnouncements, liveEvents,
                liveGallery, liveAttendance, liveFees, liveCertificates
            ] = await Promise.all([
                adminApi.fetchStudents().catch(() => ({ success: false, data: [] })),
                adminApi.fetchEnquiries().catch(() => ({ success: false, data: [] })),
                adminApi.fetchContacts().catch(() => ({ success: false, data: [] })),
                adminApi.fetchTeachers().catch(() => ({ success: false, data: [] })),
                adminApi.fetchDanceClasss().catch(() => ({ success: false, data: [] })),
                adminApi.fetchBatchs().catch(() => ({ success: false, data: [] })),
                adminApi.fetchTimetables().catch(() => ({ success: false, data: [] })),
                adminApi.fetchAnnouncements().catch(() => ({ success: false, data: [] })),
                adminApi.fetchEvents().catch(() => ({ success: false, data: [] })),
                adminApi.fetchPerformances().catch(() => ({ success: false, data: [] })),
                adminApi.fetchAttendances().catch(() => ({ success: false, data: [] })),
                adminApi.fetchFees().catch(() => ({ success: false, data: [] })),
                adminApi.fetchCertificates().catch(() => ({ success: false, data: [] }))
            ]);

            if (liveStudents.success) {
                const mappedStudents = liveStudents.data.map(u => ({
                    id: u._id,
                    name: u.fullName,
                    email: u.email,
                    mobile: u.mobile,
                    batchId: 'batch-evening',
                    status: 'Active',
                    admissionDate: u.createdAt.split('T')[0]
                }));
                setStudents(mappedStudents);
            }

            if (liveEnquiries.success) {
                const mappedAdmissions = liveEnquiries.data.map(e => ({
                    id: e._id,
                    name: e.studentName,
                    email: e.email,
                    mobile: e.mobile,
                    course: e.danceStyle || 'General',
                    status: e.status === 'pending' ? 'Pending' : (e.status === 'enrolled' ? 'Approved' : 'Rejected'),
                    date: e.createdAt.split('T')[0],
                    rawStatus: e.status
                }));
                setAdmissions(mappedAdmissions);
            }

            if (liveContacts.success) {
                const mappedMessages = liveContacts.data.map(c => ({
                    id: c._id,
                    name: c.name,
                    email: c.email,
                    subject: c.subject || 'Enquiry',
                    message: c.message,
                    status: c.status === 'unread' ? 'Unread' : 'Read',
                    date: c.createdAt.split('T')[0],
                    rawStatus: c.status
                }));
                setMessages(mappedMessages);
            }

            if (liveTeachers.success) setTeachers(liveTeachers.data.map(d => ({ ...d, id: d._id })));
            if (liveClasses.success) setClasses(liveClasses.data.map(d => ({ ...d, id: d._id })));
            if (liveBatches.success) setBatches(liveBatches.data.map(d => ({ ...d, id: d._id })));
            if (liveTimetable.success) setTimetable(liveTimetable.data.map(d => ({ ...d, id: d._id })));
            if (liveAnnouncements.success) setAnnouncements(liveAnnouncements.data.map(d => ({ ...d, id: d._id })));
            if (liveEvents.success) setEvents(liveEvents.data.map(d => ({ ...d, id: d._id })));
            if (liveGallery.success) setGallery(liveGallery.data.map(d => ({ ...d, id: d._id })));
            if (liveAttendance.success) setAttendance(liveAttendance.data.map(d => ({ ...d, id: d._id })));
            if (liveFees.success) setFees(liveFees.data.map(d => ({ ...d, id: d._id })));
            if (liveCertificates.success) setCertificates(liveCertificates.data.map(d => ({ ...d, id: d._id })));

        } catch (error) {
            console.error('Failed to sync with live backend:', error);
        }
    };

    useEffect(() => {
        refreshFromBackend();
    }, []);

    // CRUD Helper Functions mapped to AdminApi
    const addTeacher = async (teacher) => { try { await adminApi.createTeacher(teacher); await refreshFromBackend(); alert('Teacher added successfully!'); } catch (err) { alert('Error adding teacher'); } };
    const updateTeacher = async (id, data) => { try { await adminApi.updateTeacher(id, data); await refreshFromBackend(); alert('Teacher updated successfully!'); } catch (err) { alert('Error updating teacher'); } };
    const deleteTeacher = async (id) => { try { await adminApi.deleteTeacher(id); await refreshFromBackend(); alert('Teacher deleted successfully!'); } catch (err) { alert('Error deleting teacher'); } };

    const addClass = async (cls) => { try { await adminApi.createDanceClass(cls); await refreshFromBackend(); alert('Class added successfully!'); } catch (err) { alert('Error adding class'); } };
    const updateClass = async (id, data) => { try { await adminApi.updateDanceClass(id, data); await refreshFromBackend(); alert('Class updated successfully!'); } catch (err) { alert('Error updating class'); } };
    const deleteClass = async (id) => { try { await adminApi.deleteDanceClass(id); await refreshFromBackend(); alert('Class deleted successfully!'); } catch (err) { alert('Error deleting class'); } };

    const addBatch = async (batch) => { try { await adminApi.createBatch(batch); await refreshFromBackend(); alert('Batch added successfully!'); } catch (err) { alert('Error adding batch'); } };
    const updateBatch = async (id, data) => { try { await adminApi.updateBatch(id, data); await refreshFromBackend(); alert('Batch updated successfully!'); } catch (err) { alert('Error updating batch'); } };
    const deleteBatch = async (id) => { try { await adminApi.deleteBatch(id); await refreshFromBackend(); alert('Batch deleted successfully!'); } catch (err) { alert('Error deleting batch'); } };

    const addSession = async (session) => { try { await adminApi.createTimetable(session); await refreshFromBackend(); alert('Session added successfully!'); } catch (err) { alert('Error adding session'); } };
    const updateSession = async (id, data) => { try { await adminApi.updateTimetable(id, data); await refreshFromBackend(); alert('Session updated successfully!'); } catch (err) { alert('Error updating session'); } };
    const deleteSession = async (id) => { try { await adminApi.deleteTimetable(id); await refreshFromBackend(); alert('Session deleted successfully!'); } catch (err) { alert('Error deleting session'); } };

    const addAnnouncement = async (ann) => { try { await adminApi.createAnnouncement({ ...ann, date: new Date().toISOString().split('T')[0] }); await refreshFromBackend(); alert('Announcement added successfully!'); } catch (err) { alert('Error adding announcement'); } };
    const updateAnnouncement = async (id, data) => { try { await adminApi.updateAnnouncement(id, data); await refreshFromBackend(); alert('Announcement updated successfully!'); } catch (err) { alert('Error updating announcement'); } };
    const deleteAnnouncement = async (id) => { try { await adminApi.deleteAnnouncement(id); await refreshFromBackend(); alert('Announcement deleted successfully!'); } catch (err) { alert('Error deleting announcement'); } };

    const addEvent = async (event) => { try { await adminApi.createEvent(event); await refreshFromBackend(); alert('Event added successfully!'); } catch (err) { alert('Error adding event'); } };
    const updateEvent = async (id, data) => { try { await adminApi.updateEvent(id, data); await refreshFromBackend(); alert('Event updated successfully!'); } catch (err) { alert('Error updating event'); } };
    const deleteEvent = async (id) => { try { await adminApi.deleteEvent(id); await refreshFromBackend(); alert('Event deleted successfully!'); } catch (err) { alert('Error deleting event'); } };

    const addGalleryPhoto = async (photo) => { try { await adminApi.createPerformance(photo); await refreshFromBackend(); alert('Photo added successfully!'); } catch (err) { alert('Error adding photo'); } };
    const deleteGalleryPhoto = async (id) => { try { await adminApi.deletePerformance(id); await refreshFromBackend(); alert('Photo deleted successfully!'); } catch (err) { alert('Error deleting photo'); } };

    const markAttendance = async (date, studentId, className, status) => { try { await adminApi.createAttendance({ date, studentId, className, status }); await refreshFromBackend(); } catch (err) { alert('Error marking attendance'); } };

    const updateFeeStatus = async (feeId, status, payDate = '') => { try { await adminApi.updateFee(feeId, { status, payDate }); await refreshFromBackend(); alert('Fee updated'); } catch (err) { alert('Error updating fee'); } };

    const approveAdmission = async (id) => { try { await adminApi.updateEnquiryStatus(id, 'enrolled'); await refreshFromBackend(); alert('Admission approved!'); } catch (err) { alert('Error approving admission'); } };
    const rejectAdmission = async (id) => { try { await adminApi.updateEnquiryStatus(id, 'rejected'); await refreshFromBackend(); alert('Admission rejected!'); } catch (err) { alert('Error rejecting admission'); } };
    const deleteAdmission = async (id) => { try { await adminApi.deleteEnquiry(id); await refreshFromBackend(); alert('Admission deleted!'); } catch (err) { alert('Error deleting admission'); } };

    const generateCertificate = async (studentName, courseName) => { try { const issueDate = new Date().toISOString().split('T')[0]; const certificateNo = `CERT-${courseName.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-4)}`; await adminApi.createCertificate({ studentName, courseName, issueDate, certificateNo }); await refreshFromBackend(); alert('Certificate generated!'); } catch (err) { alert('Error generating certificate'); } };

    const markMessageRead = async (id) => { try { await adminApi.updateContactStatus(id, 'read'); await refreshFromBackend(); alert('Message marked as read'); } catch (err) { alert('Error updating message'); } };
    const deleteMessage = async (id) => { try { await adminApi.deleteContact(id); await refreshFromBackend(); alert('Message deleted'); } catch (err) { alert('Error deleting message'); } };
    
    // addStudent mock from original since it was doing some local logic, but now it should just be backend
    // Actually, students are users. We'll leave it as a placeholder if needed, though they shouldn't create them here.
    const addStudent = async (student) => { try { await adminApi.createStudent(student); await refreshFromBackend(); alert('Student added'); } catch (err) { alert('Error adding student. Ensure fields are valid.'); } };
    const updateStudent = async (id, data) => { try { await adminApi.updateStudent(id, data); await refreshFromBackend(); alert('Student updated'); } catch (err) { alert('Error updating student'); } };
    const deleteStudent = async (id) => { try { await adminApi.deleteStudent(id); await refreshFromBackend(); alert('Student deleted'); } catch (err) { alert('Error deleting student'); } };
    const addMessage = async () => {};

    return (
        <ManagementContext.Provider value={{
            students, teachers, classes, batches, timetable, announcements, events, gallery, attendance, fees, admissions, certificates, messages,
            refreshFromBackend,
            addStudent, updateStudent, deleteStudent,
            addTeacher, updateTeacher, deleteTeacher,
            addClass, updateClass, deleteClass,
            addBatch, updateBatch, deleteBatch,
            addSession, updateSession, deleteSession,
            addAnnouncement, updateAnnouncement, deleteAnnouncement,
            addEvent, updateEvent, deleteEvent,
            addGalleryPhoto, deleteGalleryPhoto,
            markAttendance, updateFeeStatus,
            approveAdmission, rejectAdmission, deleteAdmission,
            generateCertificate,
            addMessage, markMessageRead, deleteMessage
        }}>
            {children}
        </ManagementContext.Provider>
    );
};
