const fs = require('fs');
const path = require('path');

const adminApiPath = path.join(__dirname, '..', 'frontend', 'src', 'api', 'adminApi.js');
let adminApi = fs.readFileSync(adminApiPath, 'utf-8');

const models = ['Teacher', 'DanceClass', 'Batch', 'Event', 'Performance', 'Attendance', 'Fee', 'Timetable', 'Announcement', 'Certificate'];

let addedCode = '\n// ─── Auto-generated CRUD Wrappers ──────────────────────────────────────────────\n';

for (const m of models) {
    const route = m.toLowerCase() + 's';
    addedCode += `
// ${m}
export const fetch${m}s = async () => { const res = await axiosInstance.get('/admin/${route}', adminConfig); return res.data; };
export const create${m} = async (data) => { const res = await axiosInstance.post('/admin/${route}', data, adminConfig); return res.data; };
export const update${m} = async (id, data) => { const res = await axiosInstance.put(\`/admin/${route}/\${id}\`, data, adminConfig); return res.data; };
export const delete${m} = async (id) => { const res = await axiosInstance.delete(\`/admin/${route}/\${id}\`, adminConfig); return res.data; };
`;
}

fs.writeFileSync(adminApiPath, adminApi + addedCode);
console.log('adminApi.js updated');

// Create publicApi.js
const publicApi = `
import axiosInstance from './axiosInstance';

${models.map(m => {
    const route = m.toLowerCase() + 's';
    return `export const fetchPublic${m}s = async () => { const res = await axiosInstance.get('/public/${route}'); return res.data; };`;
}).join('\n')}
`;
fs.writeFileSync(path.join(__dirname, '..', 'frontend', 'src', 'api', 'publicApi.js'), publicApi);
console.log('publicApi.js created');
