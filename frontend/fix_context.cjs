const fs = require('fs');
const path = require('path');

const ctxPath = path.join(__dirname, 'src', 'context', 'ManagementContext.jsx');
let content = fs.readFileSync(ctxPath, 'utf8');

// Add .catch() to the first three requests in Promise.all
content = content.replace(
    'adminApi.fetchStudents(),',
    'adminApi.fetchStudents().catch(() => ({ success: false, data: [] })),'
);
content = content.replace(
    'adminApi.fetchEnquiries(),',
    'adminApi.fetchEnquiries().catch(() => ({ success: false, data: [] })),'
);
content = content.replace(
    'adminApi.fetchContacts(),',
    'adminApi.fetchContacts().catch(() => ({ success: false, data: [] })),'
);

// Helper function to replace single-line crud wrappers with try/catch and alerts
function wrapTryCatch(funcName, apiCallStr) {
    const searchStr = "const " + funcName + " = async ";
    const regex = new RegExp(searchStr + "\\((.*?)\\) => \\{ await adminApi\\." + apiCallStr.replace(/\\(/g, "\\\\(").replace(/\\)/g, "\\\\)") + "; await refreshFromBackend\\(\\); \\};", "g");
    
    const replacer = "const " + funcName + " = async ($1) => {\\n" +
        "        try {\\n" +
        "            await adminApi." + apiCallStr + ";\\n" +
        "            await refreshFromBackend();\\n" +
        "            alert('" + funcName + " succeeded!');\\n" +
        "        } catch (error) {\\n" +
        "            console.error('" + funcName + " failed:', error);\\n" +
        "            alert('Failed to execute " + funcName + ". Please check your inputs or network connection.');\\n" +
        "        }\\n" +
        "    };";
        
    content = content.replace(regex, replacer.replace(/\\n/g, '\n'));
}

wrapTryCatch('addTeacher', 'createTeacher(teacher)');
wrapTryCatch('updateTeacher', 'updateTeacher(id, data)');
wrapTryCatch('deleteTeacher', 'deleteTeacher(id)');

wrapTryCatch('addClass', 'createDanceClass(cls)');
wrapTryCatch('updateClass', 'updateDanceClass(id, data)');
wrapTryCatch('deleteClass', 'deleteDanceClass(id)');

wrapTryCatch('addBatch', 'createBatch(batch)');
wrapTryCatch('updateBatch', 'updateBatch(id, data)');
wrapTryCatch('deleteBatch', 'deleteBatch(id)');

wrapTryCatch('addSession', 'createTimetable(session)');
wrapTryCatch('updateSession', 'updateTimetable(id, data)');
wrapTryCatch('deleteSession', 'deleteTimetable(id)');

wrapTryCatch('addAnnouncement', 'createAnnouncement(ann)');
wrapTryCatch('updateAnnouncement', 'updateAnnouncement(id, data)');
wrapTryCatch('deleteAnnouncement', 'deleteAnnouncement(id)');

wrapTryCatch('addEvent', 'createEvent(event)');
wrapTryCatch('updateEvent', 'updateEvent(id, data)');
wrapTryCatch('deleteEvent', 'deleteEvent(id)');

wrapTryCatch('addGalleryPhoto', 'createPerformance(photo)');
wrapTryCatch('deleteGalleryPhoto', 'deletePerformance(id)');

wrapTryCatch('approveAdmission', "updateEnquiryStatus(id, 'enrolled')");
wrapTryCatch('rejectAdmission', "updateEnquiryStatus(id, 'rejected')");
wrapTryCatch('deleteAdmission', 'deleteEnquiry(id)');

wrapTryCatch('markMessageRead', "updateContactStatus(id, 'read')");
wrapTryCatch('deleteMessage', 'deleteContact(id)');

// Handle special ones manually
content = content.replace(
    /const markAttendance = async \(.*?\) => \{\s*await adminApi\.createAttendance.*?\s*await refreshFromBackend\(\);\s*\};/g,
    "const markAttendance = async (date, studentId, className, status) => { \n" +
    "    try {\n" +
    "        await adminApi.createAttendance({ date, studentId, className, status }); \n" +
    "        await refreshFromBackend(); \n" +
    "    } catch (error) {\n" +
    "        console.error('markAttendance failed:', error);\n" +
    "        alert('Failed to mark attendance.');\n" +
    "    }\n" +
    "};"
);

content = content.replace(
    /const updateFeeStatus = async \(.*?\) => \{\s*await adminApi\.updateFee.*?\s*await refreshFromBackend\(\);\s*\};/g,
    "const updateFeeStatus = async (feeId, status, payDate = '') => { \n" +
    "    try {\n" +
    "        await adminApi.updateFee(feeId, { status, payDate }); \n" +
    "        await refreshFromBackend(); \n" +
    "        alert('Fee status updated successfully!');\n" +
    "    } catch (error) {\n" +
    "        console.error('updateFeeStatus failed:', error);\n" +
    "        alert('Failed to update fee status.');\n" +
    "    }\n" +
    "};"
);

content = content.replace(
    /const generateCertificate = async \(.*?\) => \{\s*const issueDate.*?;\s*const certificateNo.*?;\s*await adminApi\.createCertificate.*?\s*await refreshFromBackend\(\);\s*\};/g,
    "const generateCertificate = async (studentName, courseName) => { \n" +
    "    try {\n" +
    "        const issueDate = new Date().toISOString().split('T')[0];\n" +
    "        const certificateNo = `CERT-${courseName.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-4)}`;\n" +
    "        await adminApi.createCertificate({ studentName, courseName, issueDate, certificateNo }); \n" +
    "        await refreshFromBackend(); \n" +
    "        alert('Certificate generated successfully!');\n" +
    "    } catch (error) {\n" +
    "        console.error('generateCertificate failed:', error);\n" +
    "        alert('Failed to generate certificate.');\n" +
    "    }\n" +
    "};"
);

// Add real functions for Students
content = content.replace(
    /const addStudent = async \(\) => \{\};\s*const updateStudent = async \(\) => \{\};\s*const deleteStudent = async \(\) => \{\};/,
    "const addStudent = async (student) => { \n" +
    "    try {\n" +
    "        await adminApi.createStudent(student); \n" +
    "        await refreshFromBackend(); \n" +
    "        alert('Student added successfully!');\n" +
    "    } catch (error) {\n" +
    "        console.error('addStudent failed:', error);\n" +
    "        alert('Failed to add student. Ensure email is unique and valid.');\n" +
    "    }\n" +
    "};\n" +
    "const updateStudent = async (id, data) => { \n" +
    "    try {\n" +
    "        await adminApi.updateStudent(id, data); \n" +
    "        await refreshFromBackend(); \n" +
    "        alert('Student updated successfully!');\n" +
    "    } catch (error) {\n" +
    "        console.error('updateStudent failed:', error);\n" +
    "        alert('Failed to update student.');\n" +
    "    }\n" +
    "};\n" +
    "const deleteStudent = async (id) => { \n" +
    "    try {\n" +
    "        await adminApi.deleteStudent(id); \n" +
    "        await refreshFromBackend(); \n" +
    "        alert('Student deleted successfully!');\n" +
    "    } catch (error) {\n" +
    "        console.error('deleteStudent failed:', error);\n" +
    "        alert('Failed to delete student.');\n" +
    "    }\n" +
    "};"
);

fs.writeFileSync(ctxPath, content);
console.log('Updated ManagementContext.jsx');
