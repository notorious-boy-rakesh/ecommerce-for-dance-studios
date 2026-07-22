const fs = require('fs');
const path = require('path');

const adminApiPath = path.join(__dirname, 'src', 'api', 'adminApi.js');
let apiContent = fs.readFileSync(adminApiPath, 'utf8');

const newStudentCrud = `
export const createStudent = async (data) => {
    const response = await axiosInstance.post('/admin/students', data, adminConfig);
    return response.data;
};
export const updateStudent = async (id, data) => {
    const response = await axiosInstance.put(\`/admin/students/\${id}\`, data, adminConfig);
    return response.data;
};
export const deleteStudent = async (id) => {
    const response = await axiosInstance.delete(\`/admin/students/\${id}\`, adminConfig);
    return response.data;
};
`;

apiContent = apiContent.replace('export const fetchStudents = async () => {\n    const response = await axiosInstance.get(\'/admin/students\', adminConfig);\n    return response.data;\n};', 'export const fetchStudents = async () => {\n    const response = await axiosInstance.get(\'/admin/students\', adminConfig);\n    return response.data;\n};\n' + newStudentCrud);

fs.writeFileSync(adminApiPath, apiContent);
console.log('Updated adminApi.js');
