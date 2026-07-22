import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useManagement } from '../context/ManagementContext';
import GlassCard from '../components/Common/GlassCard';
import Footer from '../components/Footer/Footer';

const StudentDashboard = () => {
    const { user, currentUser } = useAuth();
    const { students, batches, classes, announcements } = useManagement();

    const studentProfile = students.find(s => 
        (s.name && user && s.name.toLowerCase() === user.toLowerCase()) || 
        (s.email && currentUser?.email && s.email.toLowerCase() === currentUser.email.toLowerCase()) ||
        (s.email && user && s.email.toLowerCase() === user.toLowerCase())
    ) || {
        id: 'DS-2026-001',
        name: user || 'STUDENT',
        batchId: 'Unassigned',
        status: 'Active'
    };

    const batchName = batches.find(b => b.id === studentProfile.batchId)?.name || (studentProfile.batchId === 'Unassigned' ? 'Not Assigned' : 'Unknown Batch');
    const displayName = studentProfile.name.toUpperCase();

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Student Dashboard</h1>
                <p className="subtitle">Access your dance course information and student services</p>
            </div>

            {/* Student Information */}
            <div className="container animate-1">
                <GlassCard
                    title="Student Information"
                    subtitle="Your registered profile details"
                    icon="👤"
                    iconClass="icon-purple"
                    style={{ animation: 'none' }}
                >
                    <div className="student-info-grid">
                        <div className="student-field">
                            <div className="field-label">Name</div>
                            <div className="field-value" id="studentNameDisplay">{displayName}</div>
                        </div>
                        <div className="student-field">
                            <div className="field-label">Student ID</div>
                            <div className="field-value"><code>{studentProfile.id}</code></div>
                        </div>
                        {currentUser?.email && (
                            <div className="student-field">
                                <div className="field-label">Email</div>
                                <div className="field-value">{currentUser.email}</div>
                            </div>
                        )}
                        {currentUser?.mobile && (
                            <div className="student-field">
                                <div className="field-label">Mobile</div>
                                <div className="field-value">{currentUser.mobile}</div>
                            </div>
                        )}
                        {currentUser?.username && (
                            <div className="student-field">
                                <div className="field-label">Username</div>
                                <div className="field-value">@{currentUser.username}</div>
                            </div>
                        )}
                        <div className="student-field">
                            <div className="field-label">Status</div>
                            <div className="field-value">{studentProfile.status}</div>
                        </div>
                        <div className="student-field">
                            <div className="field-label">Batch</div>
                            <div className="field-value">{batchName}</div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Student Services */}
            <div className="container animate-2">
                <GlassCard
                    title="Student Services"
                    subtitle="Quick access to your resources"
                    icon="🔗"
                    iconClass="icon-green"
                    style={{ animation: 'none' }}
                >
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-label">📅 Sessions</div>
                            <div className="info-value"><Link to="/session">View Session Details</Link></div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">📝 Enquiry</div>
                            <div className="info-value"><Link to="/enquiry">Submit Enquiry</Link></div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">📞 Contact</div>
                            <div className="info-value"><Link to="/contact">Contact Us</Link></div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Dance Courses Table */}
            <div className="container animate-3">
                <GlassCard
                    title="Dance Courses"
                    subtitle="Your enrolled courses and schedule"
                    icon="💃"
                    iconClass="icon-pink"
                    style={{ animation: 'none' }}
                >
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Instructor</th>
                                <th>Timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((cls, idx) => (
                                <tr key={cls.id}>
                                    <td>
                                        <span className={`badge ${idx % 3 === 0 ? 'badge-pink' : idx % 3 === 1 ? 'badge-blue' : 'badge-orange'}`}>
                                            {cls.name}
                                        </span>
                                    </td>
                                    <td>{cls.trainer}</td>
                                    <td>{cls.timing}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </div>

            {/* Announcements */}
            <div className="container animate-4">
                <GlassCard
                    title="Announcements"
                    subtitle="Latest updates and notices"
                    icon="📢"
                    iconClass="icon-orange"
                    style={{ animation: 'none' }}
                >
                    {announcements.map((ann, idx) => (
                        <div className="announcement" key={ann.id || idx}>
                            <div className="ann-dot"></div>
                            <div className="ann-text">{ann.text}</div>
                        </div>
                    ))}
                    {announcements.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '10px' }}>
                            No announcements posted yet.
                        </div>
                    )}
                </GlassCard>
            </div>

            {/* Quick Links */}
            <div className="container animate-5">
                <GlassCard style={{ animation: 'none' }}>
                    <div className="quick-links">
                        <Link to="/home">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </GlassCard>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default StudentDashboard;
