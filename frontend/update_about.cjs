const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, 'src', 'pages', 'About.jsx');
let content = fs.readFileSync(aboutPath, 'utf8');

// Add useManagement import if not exists
if (!content.includes('useManagement')) {
    content = content.replace(
        "import GlassCard from '../components/Common/GlassCard';",
        "import GlassCard from '../components/Common/GlassCard';\nimport { useManagement } from '../context/ManagementContext';"
    );
}

// Add teachers extraction
content = content.replace(
    'const About = () => {',
    'const About = () => {\n    const { teachers } = useManagement();\n'
);

// Add Meet Our Instructors section
const newSection = `
            {/* Meet Our Instructors */}
            {teachers && teachers.length > 0 && (
                <div className="container animate-5">
                    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem' }}>Meet Our Expert Instructors</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Learn from the best in the industry</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', paddingBottom: '40px' }}>
                        {teachers.map((teacher, idx) => (
                            <GlassCard key={idx} style={{ animation: 'none', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginRight: '16px', color: '#fff' }}>
                                        {teacher.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>{teacher.name}</h3>
                                        <div style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>{teacher.specialization}</div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <strong>Experience:</strong> {teacher.experience}
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1, margin: 0 }}>
                                    "{teacher.bio}"
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}
`;

content = content.replace(
    '{/* Footer */}',
    newSection + '\n            {/* Footer */}'
);

fs.writeFileSync(aboutPath, content);
console.log('Updated About.jsx');
