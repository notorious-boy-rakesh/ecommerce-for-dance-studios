const fs = require('fs');
const path = require('path');

const models = ['Teacher', 'DanceClass', 'Batch', 'Event', 'Performance', 'Attendance', 'Fee', 'Timetable', 'Announcement', 'Certificate'];

// Update adminRoutes.js
const adminRoutesPath = path.join(__dirname, 'Routers', 'adminRoutes.js');
let adminRoutes = fs.readFileSync(adminRoutesPath, 'utf-8');

let addedAdminRoutes = '';
for (const m of models) {
    const route = m.toLowerCase() + 's';
    addedAdminRoutes += `
// ${m} Routes
router.get('/${route}', adminController.get${m}s);
router.post('/${route}', adminController.add${m});
router.put('/${route}/:id', adminController.update${m});
router.delete('/${route}/:id', adminController.delete${m});
`;
}

adminRoutes = adminRoutes.replace(/(module\.exports = router;)/, addedAdminRoutes + '\n$1');
fs.writeFileSync(adminRoutesPath, adminRoutes);
console.log('adminRoutes updated');

// Create publicRoutes.js
const publicRoutes = `
const express = require('express');
const router = express.Router();
const publicController = require('../Controllers/publicController');

${models.map(m => {
    const route = m.toLowerCase() + 's';
    return `router.get('/${route}', publicController.get${m}s);`;
}).join('\n')}

module.exports = router;
`;
fs.writeFileSync(path.join(__dirname, 'Routers', 'publicRoutes.js'), publicRoutes);
console.log('publicRoutes created');
