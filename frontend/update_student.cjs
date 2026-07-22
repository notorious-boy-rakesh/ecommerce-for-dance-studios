const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, 'src', 'pages', 'StudentDashboard.jsx');
let content = fs.readFileSync(dashPath, 'utf8');

const emptyClassesStr = `
                            {classes.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No courses available at the moment.
                                    </td>
                                </tr>
                            )}
`;

content = content.replace(
    '                        <tbody>\n                            {classes.map((cls, idx) => (',
    '                        <tbody>' + emptyClassesStr + '\n                            {classes.map((cls, idx) => ('
);

fs.writeFileSync(dashPath, content);
console.log('Updated StudentDashboard.jsx');
