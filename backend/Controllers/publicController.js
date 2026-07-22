
const { sendSuccess, sendError } = require('../utils/responseFormatter');
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


const getTeachers = async (req, res) => {
    try { const data = await Teacher.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Teacher fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getDanceClasss = async (req, res) => {
    try { const data = await DanceClass.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'DanceClass fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getBatchs = async (req, res) => {
    try { const data = await Batch.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Batch fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getEvents = async (req, res) => {
    try { const data = await Event.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Event fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getPerformances = async (req, res) => {
    try { const data = await Performance.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Performance fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getAttendances = async (req, res) => {
    try { const data = await Attendance.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Attendance fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getFees = async (req, res) => {
    try { const data = await Fee.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Fee fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getTimetables = async (req, res) => {
    try { const data = await Timetable.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Timetable fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getAnnouncements = async (req, res) => {
    try { const data = await Announcement.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Announcement fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

const getCertificates = async (req, res) => {
    try { const data = await Certificate.find().sort({ createdAt: -1 }); sendSuccess(res, data, 'Certificate fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};

module.exports = {
    getTeachers,
    getDanceClasss,
    getBatchs,
    getEvents,
    getPerformances,
    getAttendances,
    getFees,
    getTimetables,
    getAnnouncements,
    getCertificates
};
