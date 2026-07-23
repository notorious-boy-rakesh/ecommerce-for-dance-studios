import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useManagement } from '../context/ManagementContext';
import GlassCard from '../components/Common/GlassCard';
import Footer from '../components/Footer/Footer';

const Home = () => {
    const { user } = useAuth();
    const { classes, events, gallery } = useManagement();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        const greetText = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
        const nameSuffix = user ? `, ${user}` : '';
        setGreeting(`${greetText}${nameSuffix}! Discover a polished learning experience with expert instructors and flexible batches.`);
    }, [user]);

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Welcome to Our Dance School</h1>
                <p className="subtitle" id="liveMessage">{greeting}</p>
            </div>

            {/* Quick Actions */}
            <div className="container animate-1">
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">📅 Sessions</div>
                        <div className="info-value"><Link to="/session">View Schedule</Link></div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">📝 Enquiry</div>
                        <div className="info-value"><Link to="/enquiry">Submit Form</Link></div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">👤 Student</div>
                        <div className="info-value"><Link to="/student">Dashboard</Link></div>
                    </div>
                </div>
            </div>

            {/* Dance Courses */}
            <div className="container animate-2">
                <GlassCard
                    title="Our Dance Courses"
                    subtitle="Explore our range of dance styles and find your rhythm"
                    icon="💃"
                    iconClass="icon-pink"
                    style={{ animation: 'none' }}
                >
                    <div className="course-grid">
                        {classes.map((course, idx) => (
                            <div key={idx} className="course-card">
                                <img src={course.img} alt={course.name} />
                                <div className="course-info">
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-desc">{course.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            
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
                                <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                                    {ev.img && (
                                        <div style={{ margin: '-16px -16px 16px -16px', height: '160px' }}>
                                            <img src={ev.img} alt={ev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
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

            {/* Why Choose Us */}
            <div className="container animate-3">
                <div className="highlight-box">
                    <h3>⭐ Why Choose IDLY Kundan Studios?</h3>
                    <ul className="content-list check">
                        <li>Experienced and certified dance instructors</li>
                        <li>Friendly and supportive learning environment</li>
                        <li>Flexible class timings — morning, afternoon &amp; evening batches</li>
                        <li>Annual cultural performances &amp; competitions</li>
                        <li>Certificate awarded upon course completion</li>
                    </ul>
                </div>
            </div>

            {/* Quick Links */}
            <div className="container animate-4">
                <GlassCard style={{ animation: 'none' }}>
                    <div className="quick-links">
                        <Link to="/about">About Us</Link>
                        <Link to="/session">Sessions</Link>
                        <Link to="/enquiry">Enquiry</Link>
                        <Link to="/student">Student</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </GlassCard>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
