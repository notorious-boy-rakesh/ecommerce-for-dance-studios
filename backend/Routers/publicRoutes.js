
const express = require('express');
const router = express.Router();
const publicController = require('../Controllers/publicController');

router.get('/teachers', publicController.getTeachers);
router.get('/danceclasss', publicController.getDanceClasss);
router.get('/batchs', publicController.getBatchs);
router.get('/events', publicController.getEvents);
router.get('/performances', publicController.getPerformances);
router.get('/attendances', publicController.getAttendances);
router.get('/fees', publicController.getFees);
router.get('/timetables', publicController.getTimetables);
router.get('/announcements', publicController.getAnnouncements);
router.get('/certificates', publicController.getCertificates);

module.exports = router;
