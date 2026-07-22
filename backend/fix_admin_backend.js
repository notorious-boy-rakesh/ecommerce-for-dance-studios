const fs = require('fs');
const path = require('path');

const adminCtrlPath = path.join(__dirname, 'Controllers', 'adminController.js');
let ctrlContent = fs.readFileSync(adminCtrlPath, 'utf8');

// 1. Add Student CRUD methods
const studentCrud = `
// ─── Student CRUD (Admin Managed) ──────────────────────────────────────────────
const addStudent = async (req, res) => {
    try {
        const { name, email, mobile, batchId } = req.body;
        const username = (name.split(' ')[0] || 'student').toLowerCase() + Math.floor(Math.random()*10000);
        const User = require('../Models/User');
        const newUser = await User.create({
            fullName: name,
            email,
            mobile,
            username,
            password: 'password123',
            role: 'student'
        });
        // You can save batchId somewhere if you extend User schema, but for now we just create the User.
        const { sendSuccess } = require('../utils/responseFormatter');
        sendSuccess(res, newUser, 'Student created successfully');
    } catch (e) {
        const { sendError } = require('../utils/responseFormatter');
        sendError(res, e.message, 500);
    }
};

const updateStudent = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        const User = require('../Models/User');
        const updated = await User.findByIdAndUpdate(req.params.id, { fullName: name, email, mobile }, { new: true });
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
`;

// Insert before module.exports
ctrlContent = ctrlContent.replace('module.exports = {', studentCrud + '\nmodule.exports = {\n    addStudent, updateStudent, deleteStudent,');

// 2. Fix Attendance upsert
const oldAddAttendance = `const addAttendance = async (req, res) => {
    try { const data = await Attendance.create(req.body); sendSuccess(res, data, 'Attendance created'); }
    catch (e) { sendError(res, e.message, 500); }
};`;

const newAddAttendance = `const addAttendance = async (req, res) => {
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
};`;

ctrlContent = ctrlContent.replace(oldAddAttendance, newAddAttendance);
fs.writeFileSync(adminCtrlPath, ctrlContent);
console.log('Updated adminController.js');

// 3. Update adminRoutes.js
const adminRoutesPath = path.join(__dirname, 'Routers', 'adminRoutes.js');
let routesContent = fs.readFileSync(adminRoutesPath, 'utf8');

const studentRoutes = `
// Admin Student Management Routes
router.post('/students', adminController.addStudent);
router.put('/students/:id', adminController.updateStudent);
router.delete('/students/:id', adminController.deleteStudent);
`;

routesContent = routesContent.replace('// Students\nrouter.get(\'/students\', getStudents);', '// Students\nrouter.get(\'/students\', getStudents);' + studentRoutes);
fs.writeFileSync(adminRoutesPath, routesContent);
console.log('Updated adminRoutes.js');
