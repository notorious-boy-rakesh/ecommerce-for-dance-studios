const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(homePath, 'utf8');

// 1. Add events and gallery to useManagement extraction
content = content.replace(
    'const { classes } = useManagement();',
    'const { classes, events, gallery } = useManagement();'
);

// 2. Add styles for Events and Gallery in the HTML
// The CSS is likely in index.css, I will add inline or use existing utility classes.
// I can just append the blocks before "Why Choose Us"

const newSections = `
            {/* Upcoming Events */}
            {events && events.length > 0 && (
                <div className="container animate-3">
                    <GlassCard
                        title="Upcoming Events"
                        subtitle="Join us for our next big performance"
                        icon="🎭"
                        iconClass="icon-purple"
                        style={{ animation: 'none' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                            {events.map((ev, idx) => (
                                <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                    <h3 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '1.2rem' }}>{ev.name}</h3>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>📅 Date:</strong> {ev.date} at {ev.time}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}><strong>📍 Venue:</strong> {ev.venue}</div>
                                    <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', lineHeight: '1.4' }}>{ev.description}</p>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                                        <em>Schedule: {ev.performanceSchedule}</em>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}

            {/* Dance Gallery */}
            {gallery && gallery.length > 0 && (
                <div className="container animate-3">
                    <GlassCard
                        title="Dance Gallery"
                        subtitle="Glimpses of our graceful moments"
                        icon="📸"
                        iconClass="icon-pink"
                        style={{ animation: 'none' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                            {gallery.map((photo, idx) => (
                                <div key={idx} style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--glass-border)', aspectRatio: '4/3' }}>
                                    <img src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '12px' }}>
                                        <div style={{ color: '#fff', fontWeight: 'bold' }}>{photo.title}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{photo.album}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}
`;

content = content.replace(
    '{/* Why Choose Us */}',
    newSections + '\n            {/* Why Choose Us */}'
);

fs.writeFileSync(homePath, content);
console.log('Updated Home.jsx');
