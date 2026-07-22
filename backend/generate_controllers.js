const fs = require('fs');
const path = require('path');

const adminCtrlPath = path.join(__dirname, 'Controllers', 'adminController.js');
let adminCtrl = fs.readFileSync(adminCtrlPath, 'utf-8');

const models = ['Teacher', 'DanceClass', 'Batch', 'Event', 'Performance', 'Attendance', 'Fee', 'Timetable', 'Announcement', 'Certificate'];

// Add imports
const imports = models.map(m => `const ${m} = require('../Models/${m}');`).join('\n');
adminCtrl = adminCtrl.replace(/const Contact = require\('\.\.\/Models\/Contact'\);/, `const Contact = require('../Models/Contact');\n${imports}`);

let addedCode = '\n// ─── Auto-generated CRUD ──────────────────────────────────────────────\n';
let addedExports = [];

for (const m of models) {
    const varName = m.charAt(0).toLowerCase() + m.slice(1);
    const plural = varName + 's';
    
    addedCode += `
// ${m}
const get${m}s = async (req, res) => {
    try { const data = await ${m}.find().sort({ createdAt: -1 }); sendSuccess(res, data, '${m} fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};
const add${m} = async (req, res) => {
    try { const data = await ${m}.create(req.body); sendSuccess(res, data, '${m} created'); }
    catch (e) { sendError(res, e.message, 500); }
};
const update${m} = async (req, res) => {
    try { const data = await ${m}.findByIdAndUpdate(req.params.id, req.body, { new: true }); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, data, '${m} updated'); }
    catch (e) { sendError(res, e.message, 500); }
};
const delete${m} = async (req, res) => {
    try { const data = await ${m}.findByIdAndDelete(req.params.id); if(!data) return sendError(res, 'Not found', 404); sendSuccess(res, null, '${m} deleted'); }
    catch (e) { sendError(res, e.message, 500); }
};\n`;
    
    addedExports.push(`get${m}s, add${m}, update${m}, delete${m}`);
}

// Find module.exports
adminCtrl = adminCtrl.replace(/module\.exports = \{([\s\S]*?)\};/, (match, p1) => {
    return `module.exports = {${p1},\n    ${addedExports.join(',\n    ')}\n};`;
});

adminCtrl = adminCtrl + addedCode;

fs.writeFileSync(adminCtrlPath, adminCtrl);
console.log('adminController updated');

// Also generate publicController
const publicCtrl = `
const { sendSuccess, sendError } = require('../utils/responseFormatter');
${imports}

${models.map(m => `
const get${m}s = async (req, res) => {
    try { const data = await ${m}.find().sort({ createdAt: -1 }); sendSuccess(res, data, '${m} fetched'); }
    catch (e) { sendError(res, e.message, 500); }
};`).join('\n')}

module.exports = {
    ${models.map(m => `get${m}s`).join(',\n    ')}
};
`;

fs.writeFileSync(path.join(__dirname, 'Controllers', 'publicController.js'), publicCtrl);
console.log('publicController created');
