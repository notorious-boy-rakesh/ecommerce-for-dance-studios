import React, { createContext, useContext, useState, useEffect } from 'react';
import * as adminApi from '../api/adminApi';
import { useAuth } from './AuthContext';

const ManagementContext = createContext(null);

export const useManagement = () => useContext(ManagementContext);

const sampleStudents = [
    { id: 'ST-001', name: 'Aarav Patel', email: 'aarav@example.com', mobile: '9876543210', batchId: 'b-01', status: 'Active', admissionDate: '2026-01-10' },
    { id: 'ST-002', name: 'Priya Sharma', email: 'priya@example.com', mobile: '8765432109', batchId: 'b-02', status: 'Active', admissionDate: '2026-02-15' }
];

const sampleTeachers = [
    { id: 'T-001', name: 'Nataraj Iyer', email: 'nataraj@example.com', mobile: '7654321098', specialization: 'Bharatanatyam', experience: '15 Years', bio: 'Renowned classical dancer.' },
    { id: 'T-002', name: 'Simran Kaur', email: 'simran@example.com', mobile: '6543210987', specialization: 'Contemporary', experience: '8 Years', bio: 'Expert in modern contemporary styles.' }
];

const sampleClasses = [
    { id: 'C-001', name: 'Bharatanatyam Basics', desc: 'Introduction to foundational steps.', img: 'https://picsum.photos/seed/dance1/400/300', trainer: 'Nataraj Iyer', timing: 'Morning 7 AM - 9 AM' },
    { id: 'C-002', name: 'Contemporary Fusion', desc: 'Mix of classical and modern moves.', img: 'https://picsum.photos/seed/dance2/400/300', trainer: 'Simran Kaur', timing: 'Evening 5 PM - 7 PM' }
];

const sampleBatches = [
    { id: 'b-01', name: 'Morning Glory (7 AM)', timing: '7:00 AM - 9:00 AM' },
    { id: 'b-02', name: 'Evening Stars (5 PM)', timing: '5:00 PM - 7:00 PM' }
];

const sampleTimetable = [
    { id: 'tt-1', type: 'Bharatanatyam', trainer: 'Nataraj Iyer', day: 'Monday', dayClass: 'Beginners', time: '7:00 AM - 9:00 AM' },
    { id: 'tt-2', type: 'Contemporary', trainer: 'Simran Kaur', day: 'Tuesday', dayClass: 'Intermediate', time: '5:00 PM - 7:00 PM' }
];

const sampleAnnouncements = [
    { id: 'A-001', text: 'Annual dance showcase auditions starting next week!', date: '2026-07-20' },
    { id: 'A-002', text: 'Studio will be closed on Friday for maintenance.', date: '2026-07-22' }
];

const sampleEvents = [
    { id: 'E-001', name: 'Summer Dance Festival', date: '2026-08-15', time: '6:00 PM', venue: 'City Auditorium', description: 'Annual performance showcasing all batches.', performanceSchedule: '6:00 PM - Invoc, 7:00 PM - Contemp' }
];

const sampleGallery = [
    { id: 'G-001', album: 'Stage Performances', url: 'https://picsum.photos/seed/stage1/400/300', title: 'Solo Act' },
    { id: 'G-002', album: 'Practice Sessions', url: 'https://picsum.photos/seed/practice2/400/300', title: 'Group Rehearsal' }
];

const sampleAttendance = [
    { id: 'ATT-1', date: new Date().toISOString().split('T')[0], studentId: 'ST-001', className: 'Bharatanatyam Basics', status: 'Present' },
    { id: 'ATT-2', date: new Date().toISOString().split('T')[0], studentId: 'ST-002', className: 'Contemporary Fusion', status: 'Absent' }
];

const sampleFees = [
    { id: 'F-001', studentName: 'Aarav Patel', amount: 2000, dueDate: '2026-07-01', status: 'Paid', payDate: '2026-07-02' },
    { id: 'F-002', studentName: 'Priya Sharma', amount: 2500, dueDate: '2026-07-05', status: 'Pending', payDate: '' }
];

const sampleAdmissions = [
    { id: 'AD-001', name: 'Rohan Gupta', email: 'rohan@example.com', mobile: '9988776655', course: 'Bharatanatyam', status: 'Pending', date: '2026-07-21' },
    { id: 'AD-002', name: 'Neha Singh', email: 'neha@example.com', mobile: '8877665544', course: 'Contemporary', status: 'Approved', date: '2026-07-15' }
];

const sampleCertificates = [
    { id: 'CERT-001', studentName: 'Aarav Patel', courseName: 'Bharatanatyam Basics', issueDate: '2026-06-30', certificateNo: 'CERT-BH-0001' }
];

const sampleMessages = [
    { id: 'M-001', name: 'Vikram', email: 'vikram@example.com', subject: 'Class timings', message: 'Hi, what are the timings for weekend batches?', status: 'Unread', date: '2026-07-22' },
    { id: 'M-002', name: 'Sneha', email: 'sneha@example.com', subject: 'Fee structure', message: 'Could you please send the fee structure for contemporary dance?', status: 'Read', date: '2026-07-20' }
];

export const ManagementProvider = ({ children }) => {
    const { isLoggedIn, isAdminLoggedIn } = useAuth();
    // States
    const [students, setStudents] = useState(sampleStudents);
    const [teachers, setTeachers] = useState(sampleTeachers);
    const [classes, setClasses] = useState(sampleClasses);
    const [batches, setBatches] = useState(sampleBatches);
    const [timetable, setTimetable] = useState(sampleTimetable);
    const [announcements, setAnnouncements] = useState(sampleAnnouncements);
    const [events, setEvents] = useState(sampleEvents);
    const [gallery, setGallery] = useState(sampleGallery);
    const [attendance, setAttendance] = useState(sampleAttendance);
    const [fees, setFees] = useState(sampleFees);
    const [admissions, setAdmissions] = useState(sampleAdmissions);
    const [certificates, setCertificates] = useState(sampleCertificates);
    const [messages, setMessages] = useState(sampleMessages);

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
                    batchId: u.batchId || 'Unassigned',
                    status: u.status || 'Active',
                    admissionDate: u.admissionDate || (u.createdAt ? u.createdAt.split('T')[0] : new Date().toISOString().split('T')[0])
                }));
                setStudents([...sampleStudents, ...mappedStudents]);
            } else { setStudents(sampleStudents); }

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
                setAdmissions([...sampleAdmissions, ...mappedAdmissions]);
            } else { setAdmissions(sampleAdmissions); }

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
                setMessages([...sampleMessages, ...mappedMessages]);
            } else { setMessages(sampleMessages); }

            if (liveTeachers.success) setTeachers([...sampleTeachers, ...liveTeachers.data.map(d => ({ ...d, id: d._id }))]); else setTeachers(sampleTeachers);
            if (liveClasses.success) setClasses([...sampleClasses, ...liveClasses.data.map(d => ({ ...d, id: d._id }))]); else setClasses(sampleClasses);
            if (liveBatches.success) setBatches([...sampleBatches, ...liveBatches.data.map(d => ({ ...d, id: d._id }))]); else setBatches(sampleBatches);
            if (liveTimetable.success) setTimetable([...sampleTimetable, ...liveTimetable.data.map(d => ({ ...d, id: d._id }))]); else setTimetable(sampleTimetable);
            if (liveAnnouncements.success) setAnnouncements([...sampleAnnouncements, ...liveAnnouncements.data.map(d => ({ ...d, id: d._id }))]); else setAnnouncements(sampleAnnouncements);
            if (liveEvents.success) setEvents([...sampleEvents, ...liveEvents.data.map(d => ({ ...d, id: d._id }))]); else setEvents(sampleEvents);
            if (liveGallery.success) setGallery([...sampleGallery, ...liveGallery.data.map(d => ({ ...d, id: d._id }))]); else setGallery(sampleGallery);
            if (liveAttendance.success) setAttendance([...sampleAttendance, ...liveAttendance.data.map(d => ({ ...d, id: d._id }))]); else setAttendance(sampleAttendance);
            if (liveFees.success) setFees([...sampleFees, ...liveFees.data.map(d => ({ ...d, id: d._id }))]); else setFees(sampleFees);
            if (liveCertificates.success) setCertificates([...sampleCertificates, ...liveCertificates.data.map(d => ({ ...d, id: d._id }))]); else setCertificates(sampleCertificates);

        } catch (error) {
            console.error('Failed to sync with live backend:', error);
        }
    };

    useEffect(() => {
        refreshFromBackend();
    }, [isLoggedIn, isAdminLoggedIn]);

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
