import React from 'react';
import { useManagement } from '../context/ManagementContext';
import Footer from '../components/Footer/Footer';

const Session = () => {
    const { timetable: sessions, classes } = useManagement();

    const attireItems = [
        {
            emoji: '🪷',
            name: 'Bharatanatyam',
            list: [
                'Traditional saree or dance costume',
                'Ghungroos (ankle bells)',
                'Hair tied in a bun with flowers',
                'No footwear (barefoot)'
            ]
        },
        {
            emoji: '🎤',
            name: 'Hip Hop',
            list: [
                'Loose-fit joggers or cargo pants',
                'Comfortable sneakers',
                'Oversized T-shirt or hoodie',
                'Cap or bandana (optional)'
            ]
        },
        {
            emoji: '💃',
            name: 'Western Dance',
            list: [
                'Fitted leggings or jazz pants',
                'Dance shoes or ballet flats',
                'Tank top or fitted T-shirt',
                'Hair tied back securely'
            ]
        },
        {
            emoji: '🎊',
            name: 'Folk Dance',
            list: [
                'Colorful ethnic wear or kurta',
                'Comfortable footwear or mojari',
                'Dupatta or scarf accessory',
                'Traditional jewelry (optional)'
            ]
        }
    ];

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Dance Session Details</h1>
                <p className="subtitle">View your upcoming sessions, schedules, and professional attire guidelines</p>
            </div>

            {/* Dance Classes Section */}
            <div className="attire-section">
                <div className="attire-card">
                    <div className="attire-header">
                        <div className="icon">🏫</div>
                        <div>
                            <h2>Our Dance Classes</h2>
                            <p>Explore the variety of dance styles and courses we offer</p>
                        </div>
                    </div>
                    <div className="attire-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {classes && classes.map((cls, idx) => (
                            <div key={idx} className="attire-item" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                                    <img src={cls.img || 'https://via.placeholder.com/300x200?text=Dance+Class'} alt={cls.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: 'var(--accent-pink-light, #fff)' }}>{cls.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #aaa)', marginBottom: '15px' }}>{cls.desc}</p>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted, #777)' }}>
                                        <strong>Trainer:</strong> {cls.trainer} <br/>
                                        <strong style={{ marginTop: '4px', display: 'inline-block' }}>Timing:</strong> {cls.timing}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!classes || classes.length === 0) && (
                            <p style={{ color: 'var(--text-muted, #777)' }}>No classes available at the moment.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Session Table */}
            <div className="table-container">
                <div className="table-card">
                    <div className="table-card-header">
                        <div className="icon">📅</div>
                        <h2>Weekly Schedule</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Session ID</th>
                                <th>Dance Type</th>
                                <th>Trainer Name</th>
                                <th>Day</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session, idx) => (
                                <tr key={idx}>
                                    <td><span className="session-id">{session.id}</span></td>
                                    <td><span className="dance-type">{session.type}</span></td>
                                    <td className="trainer-name">{session.trainer}</td>
                                    <td><span className={`day-badge ${session.dayClass}`}>{session.day}</span></td>
                                    <td><span className="time-slot">{session.time}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Professional Attire Section */}
            <div className="attire-section">
                <div className="attire-card">
                    <div className="attire-header">
                        <div className="icon">👗</div>
                        <div>
                            <h2>Professional Attire Guidelines</h2>
                            <p>Recommended dress code for each dance session</p>
                        </div>
                    </div>

                    <div className="attire-grid">
                        {attireItems.map((item, idx) => (
                            <div key={idx} className="attire-item">
                                <span className="attire-emoji">{item.emoji}</span>
                                <div className="attire-dance-name">{item.name}</div>
                                <ul className="attire-list">
                                    {item.list.map((li, lIdx) => (
                                        <li key={lIdx}>{li}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* General Guidelines */}
                    <div className="guidelines">
                        <div className="guidelines-box">
                            <h3>📋 General Dress Code Rules</h3>
                            <ul className="guidelines-list">
                                <li>Always wear clean, well-maintained attire</li>
                                <li>Avoid heavy jewelry that may cause injury</li>
                                <li>Carry a water bottle and towel to sessions</li>
                                <li>Wear appropriate undergarments for movement</li>
                                <li>Keep nails trimmed for partner dance safety</li>
                                <li>Bring a change of clothes if attending back-to-back</li>
                                <li>Remove watches, rings, and bracelets before practice</li>
                                <li>Contact your trainer for costume purchase guidance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Session;
