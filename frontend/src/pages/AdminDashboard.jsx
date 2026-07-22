import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useManagement } from '../context/ManagementContext';

const AdminDashboard = () => {
    const { tab } = useParams();
    const navigate = useNavigate();
    const { adminLogout } = useAuth();
    const mgmt = useManagement();

    // UI States
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Active Tab tracking
    const activeTab = tab || 'dashboard';

    // Search and Filter States
    const [searchTerm, setSearchTerm] = useState('');

    // Modal Control States
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentItem, setCurrentItem] = useState(null);

    // Theme Simulation State
    const [studioName, setStudioName] = useState(() => localStorage.getItem('mgmt_studio_name') || 'IDLY Kundan Studios');
    const [adminTheme, setAdminTheme] = useState(() => localStorage.getItem('mgmt_theme') || 'deep-indigo');

    // Admin Profile State
    const [adminProfile, setAdminProfile] = useState(() => {
        const saved = localStorage.getItem('mgmt_admin_profile');
        return saved ? JSON.parse(saved) : {
            name: 'Kundan Kumar',
            email: 'admin@idlydance.com',
            mobile: '9988776655',
            role: 'Director & Chief Architect'
        };
    });

    // Form inputs states (generic buffer)
    const [formInputs, setFormInputs] = useState({});

    // Reset search and scroll to top when switching tabs
    useEffect(() => {
        setSearchTerm('');
        setShowModal(false);
        setCurrentItem(null);
        window.scrollTo(0, 0);
    }, [activeTab]);

    // Handle profile update
    const handleSaveProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('mgmt_admin_profile', JSON.stringify(adminProfile));
        alert('Profile details updated successfully!');
    };

    // Handle Settings update
    const handleSaveSettings = (e) => {
        e.preventDefault();
        localStorage.setItem('mgmt_studio_name', studioName);
        localStorage.setItem('mgmt_theme', adminTheme);
        alert('Settings saved successfully!');
    };

    // Logout handler
    const handleLogoutClick = () => {
        adminLogout();
        navigate('/admin-login');
    };

    // Open Add/Edit Modal
    const openItemModal = (mode, item = null) => {
        setModalMode(mode);
        setCurrentItem(item);
        setShowModal(true);

        if (mode === 'edit' && item) {
            setFormInputs({ ...item });
        } else {
            // Default initial form structures depending on the active tab
            if (activeTab === 'students') {
                setFormInputs({ name: '', email: '', mobile: '', batchId: 'batch-evening' });
            } else if (activeTab === 'teachers') {
                setFormInputs({ name: '', email: '', mobile: '', specialization: '', experience: '', bio: '' });
            } else if (activeTab === 'classes') {
                setFormInputs({ name: '', desc: '', img: '', trainer: '', timing: '' });
            } else if (activeTab === 'batches') {
                setFormInputs({ name: '', timing: '' });
            } else if (activeTab === 'events') {
                setFormInputs({ name: '', date: '', time: '', venue: '', description: '', performanceSchedule: '' });
            } else if (activeTab === 'timetable') {
                setFormInputs({ type: 'Bharatanatyam', trainer: 'Ms. Priya', day: 'Monday', dayClass: 'General', time: '9:00 AM - 10:00 AM' });
            } else if (activeTab === 'announcements') {
                setFormInputs({ text: '' });
            } else if (activeTab === 'gallery') {
                setFormInputs({ album: '', url: '', title: '' });
            } else if (activeTab === 'certificates') {
                setFormInputs({ studentName: '', courseName: 'Bharatanatyam Fundamentals' });
            }
        }
    };

    // Save changes from Modal
    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'students') {
            if (modalMode === 'add') {
                mgmt.addStudent(formInputs);
            } else {
                mgmt.updateStudent(currentItem.id, formInputs);
            }
        } else if (activeTab === 'teachers') {
            if (modalMode === 'add') {
                mgmt.addTeacher(formInputs);
            } else {
                mgmt.updateTeacher(currentItem.id, formInputs);
            }
        } else if (activeTab === 'classes') {
            if (modalMode === 'add') {
                mgmt.addClass(formInputs);
            } else {
                mgmt.updateClass(currentItem.id, formInputs);
            }
        } else if (activeTab === 'batches') {
            if (modalMode === 'add') {
                mgmt.addBatch(formInputs);
            } else {
                mgmt.updateBatch(currentItem.id, formInputs);
            }
        } else if (activeTab === 'events') {
            if (modalMode === 'add') {
                mgmt.addEvent(formInputs);
            } else {
                mgmt.updateEvent(currentItem.id, formInputs);
            }
        } else if (activeTab === 'timetable') {
            if (modalMode === 'add') {
                mgmt.addSession(formInputs);
            } else {
                mgmt.updateSession(currentItem.id, formInputs);
            }
        } else if (activeTab === 'announcements') {
            if (modalMode === 'add') {
                mgmt.addAnnouncement(formInputs);
            } else {
                mgmt.updateAnnouncement(currentItem.id, formInputs);
            }
        } else if (activeTab === 'gallery') {
            mgmt.addGalleryPhoto(formInputs);
        } else if (activeTab === 'certificates') {
            mgmt.generateCertificate(formInputs.studentName, formInputs.courseName);
        }

        setShowModal(false);
        setCurrentItem(null);
    };

    // Delete handlers
    const handleDeleteItem = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            if (activeTab === 'students') mgmt.deleteStudent(id);
            else if (activeTab === 'teachers') mgmt.deleteTeacher(id);
            else if (activeTab === 'classes') mgmt.deleteClass(id);
            else if (activeTab === 'batches') mgmt.deleteBatch(id);
            else if (activeTab === 'events') mgmt.deleteEvent(id);
            else if (activeTab === 'timetable') mgmt.deleteSession(id);
            else if (activeTab === 'announcements') mgmt.deleteAnnouncement(id);
            else if (activeTab === 'gallery') mgmt.deleteGalleryPhoto(id);
            else if (activeTab === 'messages') mgmt.deleteMessage(id);
            else if (activeTab === 'admissions') mgmt.deleteAdmission(id);
        }
    };

    // Sidebar items configuration
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'profile', label: 'My Profile', icon: '👤' },
        { id: 'students', label: 'Students (Live)', icon: '🎓' },
        { id: 'teachers', label: 'Teachers', icon: '🧑‍🏫' },
        { id: 'classes', label: 'Dance Classes', icon: '🏫' },
        { id: 'batches', label: 'Batches', icon: '📦' },
        { id: 'attendance', label: 'Attendance', icon: '⏰' },
        { id: 'fees', label: 'Fees', icon: '💰' },
        { id: 'admissions', label: 'Admissions (Live)', icon: '📝' },
        { id: 'events', label: 'Events', icon: '📅' },
        { id: 'performances', label: 'Performances', icon: '💃' },
        { id: 'certificates', label: 'Certificates', icon: '🏆' },
        { id: 'timetable', label: 'Timetable', icon: '🗓️' },
        { id: 'gallery', label: 'Gallery', icon: '🖼️' },
        { id: 'announcements', label: 'Announcements', icon: '📢' },
        { id: 'messages', label: 'Messages (Live)', icon: '✉️' },
        { id: 'reports', label: 'Reports', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    // Attendance State Helpers
    const [attDate, setAttDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [attClass, setAttClass] = useState('Bharatanatyam');
    const [attRecords, setAttRecords] = useState({});

    // Load attendance records when filters change
    useEffect(() => {
        if (activeTab === 'attendance') {
            const records = {};
            mgmt.students.forEach(s => {
                const match = mgmt.attendance.find(a => a.date === attDate && a.studentId === s.id && a.className === attClass);
                records[s.id] = match ? match.status : 'Present';
            });
            setAttRecords(records);
        }
    }, [attDate, attClass, mgmt.attendance, mgmt.students, activeTab]);

    const handleSaveAttendance = () => {
        Object.entries(attRecords).forEach(([studentId, status]) => {
            mgmt.markAttendance(attDate, studentId, attClass, status);
        });
        alert('Attendance records saved successfully!');
    };

    // Receipt modal preview state
    const [activeReceipt, setActiveReceipt] = useState(null);

    // Certificate Generator view state
    const [selectedCert, setSelectedCert] = useState(null);

    // Message Reply dialog state
    const [replyingMessage, setReplyingMessage] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleSendReply = (e) => {
        e.preventDefault();
        mgmt.markMessageRead(replyingMessage.id);
        alert(`Reply sent to ${replyingMessage.email} successfully!`);
        setReplyingMessage(null);
        setReplyText('');
    };

    // Simulated Theme Classes
    const themeClassMap = {
        'deep-indigo': 'theme-indigo',
        'neon-purple': 'theme-purple',
        'emerald-glow': 'theme-emerald'
    };

    // Filtered lists
    const filteredStudents = mgmt.students.filter(s =>
        (s?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s?.mobile || '').includes(searchTerm)
    );

    const filteredTeachers = mgmt.teachers.filter(t =>
        (t?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t?.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredClasses = mgmt.classes.filter(c =>
        (c?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c?.trainer || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAnnouncements = mgmt.announcements.filter(a =>
        (a?.text || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredEvents = mgmt.events.filter(e =>
        (e?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e?.venue || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMessages = mgmt.messages.filter(m =>
        (m?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m?.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`admin-layout ${themeClassMap[adminTheme] || ''}`}>
            
            {/* COLLAPSIBLE SIDEBAR */}
            <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'open-mobile' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-logo">{studioName.substring(0, 18)}</span>
                    <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                        <span>{sidebarCollapsed ? '→' : '←'}</span>
                    </button>
                </div>
                <div className="sidebar-menu">
                    {sidebarItems.map(item => (
                        <div
                            key={item.id}
                            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => {
                                navigate(`/admin/${item.id}`);
                                setMobileOpen(false);
                            }}
                        >
                            <span className="menu-item-icon">{item.icon}</span>
                            <span className="menu-item-text">{item.label}</span>
                        </div>
                    ))}
                    
                    <div className="menu-item logout" onClick={handleLogoutClick} style={{ marginTop: 'auto', color: 'var(--accent-red)' }}>
                        <span className="menu-item-icon">🚪</span>
                        <span className="menu-item-text">Logout</span>
                    </div>
                </div>
            </aside>

            {/* MAIN MAIN CONTENT CONTAINER */}
            <main className="admin-main">
                
                {/* TOP HEADER */}
                <header className="admin-header">
                    <button 
                        className="sidebar-toggle" 
                        style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span>☰</span>
                    </button>

                    <div className="header-search">
                        <span className="search-icon-svg">🔍</span>
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab}...`} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="header-actions">
                        <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 10px', fontSize: '12px' }}
                            onClick={() => {
                                mgmt.refreshFromBackend();
                                alert('Data synced with live server!');
                            }}
                        >
                            🔄 Refresh
                        </button>

                        {/* Theme simulated quick select */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div 
                                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34908B', cursor: 'pointer', border: adminTheme === 'deep-indigo' ? '2px solid white' : 'none' }}
                                onClick={() => { setAdminTheme('deep-indigo'); localStorage.setItem('mgmt_theme', 'deep-indigo'); }}
                                title="Teal Pine & Gold Theme"
                            />
                            <div 
                                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6FBEB2', cursor: 'pointer', border: adminTheme === 'neon-purple' ? '2px solid white' : 'none' }}
                                onClick={() => { setAdminTheme('neon-purple'); localStorage.setItem('mgmt_theme', 'neon-purple'); }}
                                title="Minty Breeze & Teal Theme"
                            />
                            <div 
                                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FDF4AF', cursor: 'pointer', border: adminTheme === 'emerald-glow' ? '2px solid white' : 'none' }}
                                onClick={() => { setAdminTheme('emerald-glow'); localStorage.setItem('mgmt_theme', 'emerald-glow'); }}
                                title="Luxury Golden Teal Theme"
                            />
                        </div>

                        {/* Notifications */}
                        <div style={{ position: 'relative' }}>
                            <button className="action-btn" onClick={() => setShowNotifications(!showNotifications)}>
                                <span>🔔</span>
                                <span className="btn-badge">{mgmt.messages.filter(m => m.status === 'Unread').length + mgmt.admissions.filter(a => a.status === 'Pending').length}</span>
                            </button>
                            {showNotifications && (
                                <div className="notifications-dropdown">
                                    <div className="dropdown-header">System Notifications</div>
                                    {mgmt.admissions.filter(a => a.status === 'Pending').map(a => (
                                        <div key={a.id} className="dropdown-item" onClick={() => { navigate('/admin/admissions'); setShowNotifications(false); }}>
                                            <div className="item-title">New Admission Request</div>
                                            <div>{a.name} applied for {a.course}.</div>
                                            <div className="item-time">{a.date}</div>
                                        </div>
                                    ))}
                                    {mgmt.messages.filter(m => m.status === 'Unread').map(m => (
                                        <div key={m.id} className="dropdown-item" onClick={() => { navigate('/admin/messages'); setShowNotifications(false); }}>
                                            <div className="item-title">Enquiry Message Received</div>
                                            <div>{m.name}: {m.subject}</div>
                                            <div className="item-time">{m.date}</div>
                                        </div>
                                    ))}
                                    {mgmt.admissions.filter(a => a.status === 'Pending').length === 0 && mgmt.messages.filter(m => m.status === 'Unread').length === 0 && (
                                        <div className="dropdown-item" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                            No new notifications.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Admin profile quick link */}
                        <div className="profile-link" onClick={() => navigate('/admin/profile')}>
                            <div className="profile-avatar">{adminProfile.name.charAt(0)}</div>
                            <span className="profile-name" style={{ display: sidebarCollapsed ? 'none' : 'block' }}>{adminProfile.name}</span>
                        </div>
                    </div>
                </header>

                {/* CONTENT AREA */}
                <div className="admin-content">
                    
                    {/* DASHBOARD SUMMARY VIEW */}
                    {activeTab === 'dashboard' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Management Dashboard</h1>
                                    <p className="content-subtitle">System statistics, enrollment reports, and recent highlights</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>🕒 Active Session: <strong>{new Date().toDateString()}</strong></span>
                                </div>
                            </div>

                            {/* Stat cards grid */}
                            <div className="stats-grid">
                                <div className="stat-card" onClick={() => navigate('/admin/students')}>
                                    <div className="stat-info">
                                        <span className="stat-label">Students</span>
                                        <div className="stat-value">{mgmt.students.length}</div>
                                        <span className="stat-change up">▲ 12% vs last month</span>
                                    </div>
                                    <div className="stat-icon icon-pink">🎓</div>
                                </div>
                                <div className="stat-card" onClick={() => navigate('/admin/teachers')}>
                                    <div className="stat-info">
                                        <span className="stat-label">Teachers</span>
                                        <div className="stat-value">{mgmt.teachers.length}</div>
                                        <span className="stat-change up">▲ 2 new active</span>
                                    </div>
                                    <div className="stat-icon icon-purple">🧑‍🏫</div>
                                </div>
                                <div className="stat-card" onClick={() => navigate('/admin/classes')}>
                                    <div className="stat-info">
                                        <span className="stat-label">Dance Classes</span>
                                        <div className="stat-value">{mgmt.classes.length}</div>
                                        <span className="stat-change text-muted">• 7 Styles total</span>
                                    </div>
                                    <div className="stat-icon icon-green">🏫</div>
                                </div>
                                <div className="stat-card" onClick={() => navigate('/admin/attendance')}>
                                    <div className="stat-info">
                                        <span className="stat-label">Today's Attendance</span>
                                        <div className="stat-value">
                                            {Math.round((mgmt.attendance.filter(a => a.date === '2026-07-16' && a.status === 'Present').length / 
                                             Math.max(1, mgmt.attendance.filter(a => a.date === '2026-07-16').length)) * 100)}%
                                        </div>
                                        <span className="stat-change up">▲ 4% vs yesterday</span>
                                    </div>
                                    <div className="stat-icon icon-blue">⏰</div>
                                </div>
                                <div className="stat-card" onClick={() => navigate('/admin/fees')}>
                                    <div className="stat-info">
                                        <span className="stat-label">Pending Fees</span>
                                        <div className="stat-value">₹{mgmt.fees.filter(f => f.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0)}</div>
                                        <span className="stat-change down" style={{ color: 'var(--accent-red)' }}>▼ Needs collection</span>
                                    </div>
                                    <div className="stat-icon icon-orange">💰</div>
                                </div>
                            </div>

                            {/* Charts & Activity Logs */}
                            <div className="dashboard-grid">
                                <div className="glass-card">
                                    <div className="card-header">
                                        <h2>📊 Monthly Collections Analysis (₹ in Thousands)</h2>
                                    </div>
                                    <div className="chart-container">
                                        <div className="mock-bar-chart">
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '140px' }}><span className="mock-bar-value">14</span></div>
                                                <span className="mock-bar-label">Feb</span>
                                            </div>
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '160px' }}><span className="mock-bar-value">16</span></div>
                                                <span className="mock-bar-label">Mar</span>
                                            </div>
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '210px' }}><span className="mock-bar-value">21</span></div>
                                                <span className="mock-bar-label">Apr</span>
                                            </div>
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '180px' }}><span className="mock-bar-value">18</span></div>
                                                <span className="mock-bar-label">May</span>
                                            </div>
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '230px' }}><span className="mock-bar-value">23</span></div>
                                                <span className="mock-bar-label">Jun</span>
                                            </div>
                                            <div className="mock-bar-item">
                                                <div className="mock-bar" style={{ height: '190px' }}><span className="mock-bar-value">19</span></div>
                                                <span className="mock-bar-label">Jul</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <div className="card-header">
                                        <h2>🔔 Recent Operations Activity</h2>
                                    </div>
                                    <div className="activity-list">
                                        <div className="activity-item">
                                            <div className="activity-avatar">➕</div>
                                            <div className="activity-details">
                                                <div className="activity-text">Student <strong>Ajay Kumar</strong> was allocated to Evening Batch.</div>
                                                <div className="activity-time">10 minutes ago</div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-avatar">💰</div>
                                            <div className="activity-details">
                                                <div className="activity-text">Fee receipt generated for <strong>Ajay Kumar</strong> (₹5000).</div>
                                                <div className="activity-time">2 hours ago</div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-avatar">📢</div>
                                            <div className="activity-details">
                                                <div className="activity-text">Announcement posted: <strong>"New admissions are now open"</strong>.</div>
                                                <div className="activity-time">1 day ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client link reminder */}
                            <div className="glass-card" style={{ padding: '16px', background: 'linear-gradient(135deg, var(--accent-pink-glow), rgba(52, 144, 139, 0.08))' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--accent-pink-light)', marginBottom: '4px' }}>💡 Customer Portal Sync Enabled</h3>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All data edited in this admin panel affects the student dashboard, sessions schedules, and courses view directly.</p>
                                    </div>
                                    <Link to="/home" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Visit Student Website ↗</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MY PROFILE VIEW */}
                    {activeTab === 'profile' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>My Profile</h1>
                                    <p className="content-subtitle">Update and customize your administrator credentials</p>
                                </div>
                            </div>

                            <div className="glass-card" style={{ maxWidth: '600px' }}>
                                <form onSubmit={handleSaveProfile} style={{ padding: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                        <div className="profile-avatar" style={{ width: '80px', height: '80px', fontSize: '32px' }}>{adminProfile.name.charAt(0)}</div>
                                        <div>
                                            <h2>{adminProfile.name}</h2>
                                            <p style={{ color: 'var(--accent-pink-light)', fontSize: '14px', fontWeight: '600' }}>{adminProfile.role}</p>
                                        </div>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Admin Name</label>
                                        <input 
                                            type="text" 
                                            value={adminProfile.name}
                                            onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Official Email</label>
                                        <input 
                                            type="email" 
                                            value={adminProfile.email}
                                            onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            value={adminProfile.mobile}
                                            onChange={(e) => setAdminProfile({ ...adminProfile, mobile: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Designation Role</label>
                                        <input 
                                            type="text" 
                                            value={adminProfile.role}
                                            onChange={(e) => setAdminProfile({ ...adminProfile, role: e.target.value })}
                                            required
                                        />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update Profile</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* STUDENTS MODULE */}
                    {activeTab === 'students' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Students Management</h1>
                                    <p className="content-subtitle">Enroll, update, and manage student profiles</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Enroll Student</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Batch</th>
                                            <th>Admission Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map(student => (
                                            <tr key={student.id}>
                                                <td>
                                                    <div className="table-avatar-info">
                                                        <div className="table-avatar">{student.name.charAt(0)}</div>
                                                        <strong>{student.name}</strong>
                                                    </div>
                                                </td>
                                                <td>{student.email}</td>
                                                <td>{student.mobile}</td>
                                                <td>
                                                    {mgmt.batches.find(b => b.id === student.batchId)?.name || 'Unassigned'}
                                                </td>
                                                <td>{student.admissionDate}</td>
                                                <td>
                                                    <span className={`badge ${student.status === 'Active' ? 'badge-active' : 'badge-read'}`}>{student.status}</span>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" title="Edit Profile" onClick={() => openItemModal('edit', student)}>✏️</button>
                                                        <button className="icon-action-btn delete" title="Delete Student" onClick={() => handleDeleteItem(student.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TEACHERS MODULE */}
                    {activeTab === 'teachers' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Teachers Management</h1>
                                    <p className="content-subtitle">Organize specialization profiles and trainers details</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Add Instructor</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Specialization</th>
                                            <th>Experience</th>
                                            <th>Bio</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTeachers.map(teacher => (
                                            <tr key={teacher.id}>
                                                <td>
                                                    <div className="table-avatar-info">
                                                        <div className="table-avatar" style={{ color: 'var(--accent-purple-light)' }}>{teacher.name.charAt(0)}</div>
                                                        <strong>{teacher.name}</strong>
                                                    </div>
                                                </td>
                                                <td>{teacher.email}</td>
                                                <td>{teacher.mobile}</td>
                                                <td><span className="badge badge-pink" style={{ textTransform: 'none' }}>{teacher.specialization}</span></td>
                                                <td>{teacher.experience}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={teacher.bio}>{teacher.bio}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" onClick={() => openItemModal('edit', teacher)}>✏️</button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(teacher.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* DANCE CLASSES MODULE */}
                    {activeTab === 'classes' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Dance Classes / Courses</h1>
                                    <p className="content-subtitle">Manage class categories, descriptions, trainers, and schedules</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Create Class</button>
                            </div>

                            <div className="gallery-album-grid">
                                {filteredClasses.map(cls => (
                                    <div key={cls.id} className="gallery-photo-card">
                                        <div className="gallery-img-container">
                                            <img src={cls.img} alt={cls.name} />
                                            <div className="gallery-photo-overlay">
                                                <button className="icon-action-btn edit" onClick={() => openItemModal('edit', cls)}>✏️</button>
                                                <button className="icon-action-btn delete" onClick={() => handleDeleteItem(cls.id)}>🗑️</button>
                                            </div>
                                        </div>
                                        <div className="gallery-info-block">
                                            <h3 className="gallery-photo-title">{cls.name}</h3>
                                            <div className="gallery-album-tag">Trainer: {cls.trainer}</div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', minHeight: '36px' }}>{cls.desc}</p>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                                                ⏰ Default Time: {cls.timing}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BATCHES MODULE */}
                    {activeTab === 'batches' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Batches Management</h1>
                                    <p className="content-subtitle">Define structural day shifts and timing slots</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Create Batch</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Batch Name</th>
                                            <th>Timings</th>
                                            <th>Students Count</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.batches.map(batch => (
                                            <tr key={batch.id}>
                                                <td><strong>{batch.name}</strong></td>
                                                <td><span className="badge badge-paid" style={{ color: 'var(--accent-purple-light)' }}>{batch.timing}</span></td>
                                                <td>
                                                    {mgmt.students.filter(s => s.batchId === batch.id).length} Students
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" onClick={() => openItemModal('edit', batch)}>✏️</button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(batch.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ATTENDANCE MODULE */}
                    {activeTab === 'attendance' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Attendance Register</h1>
                                    <p className="content-subtitle">Daily check-in logs for registered students</p>
                                </div>
                            </div>

                            <div className="glass-card" style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <div className="admin-form-group" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
                                        <label>Select Register Date</label>
                                        <input type="date" value={attDate} onChange={(e) => setAttDate(e.target.value)} />
                                    </div>
                                    <div className="admin-form-group" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
                                        <label>Select Dance Course</label>
                                        <select value={attClass} onChange={(e) => setAttClass(e.target.value)}>
                                            {mgmt.classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Email</th>
                                            <th>Current Batch</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.students.map(student => (
                                            <tr key={student.id}>
                                                <td><strong>{student.name}</strong></td>
                                                <td>{student.email}</td>
                                                <td>{mgmt.batches.find(b => b.id === student.batchId)?.name || 'Unassigned'}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button 
                                                            className={`btn ${attRecords[student.id] === 'Present' ? 'btn-primary' : 'btn-secondary'}`}
                                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                                            onClick={() => setAttRecords({ ...attRecords, [student.id]: 'Present' })}
                                                        >
                                                            Present
                                                        </button>
                                                        <button 
                                                            className={`btn ${attRecords[student.id] === 'Absent' ? 'btn-danger' : 'btn-secondary'}`}
                                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                                            onClick={() => setAttRecords({ ...attRecords, [student.id]: 'Absent' })}
                                                        >
                                                            Absent
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button className="btn btn-primary" onClick={handleSaveAttendance}>💾 Save Attendance</button>
                        </div>
                    )}

                    {/* FEES MODULE */}
                    {activeTab === 'fees' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Fees & Receivables</h1>
                                    <p className="content-subtitle">Monitor invoices, payments, structures, and pending logs</p>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Invoice ID</th>
                                            <th>Student</th>
                                            <th>Monthly Fee</th>
                                            <th>Due Date</th>
                                            <th>Payment Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.fees.map(fee => {
                                            const student = mgmt.students.find(s => s.id === fee.studentId);
                                            return (
                                                <tr key={fee.id}>
                                                    <td><code>#{fee.id.substring(fee.id.length - 6)}</code></td>
                                                    <td><strong>{student ? student.name : 'Unknown Student'}</strong></td>
                                                    <td>₹{fee.amount}</td>
                                                    <td>{fee.dueDate}</td>
                                                    <td>{fee.payDate || '-'}</td>
                                                    <td>
                                                        <span className={`badge ${fee.status === 'Paid' ? 'badge-active' : 'badge-pending'}`}>{fee.status}</span>
                                                    </td>
                                                    <td>
                                                        {fee.status === 'Pending' ? (
                                                            <button 
                                                                className="btn btn-primary" 
                                                                style={{ padding: '6px 12px', fontSize: '12px' }}
                                                                onClick={() => mgmt.updateFeeStatus(fee.id, 'Paid')}
                                                            >
                                                                Mark Paid
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                className="btn btn-secondary" 
                                                                style={{ padding: '6px 12px', fontSize: '12px' }}
                                                                onClick={() => setActiveReceipt({ ...fee, studentName: student?.name })}
                                                            >
                                                                View Receipt 📄
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ADMISSIONS MODULE */}
                    {activeTab === 'admissions' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>New Student Admissions</h1>
                                    <p className="content-subtitle">Review web enquiries and approve prospective students</p>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Applicant</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Course Requested</th>
                                            <th>Date Submitted</th>
                                            <th>Status</th>
                                            <th>Process</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.admissions.map(adm => (
                                            <tr key={adm.id}>
                                                <td><strong>{adm.name}</strong></td>
                                                <td>{adm.email}</td>
                                                <td>{adm.mobile}</td>
                                                <td><span className="badge badge-paid" style={{ color: 'var(--accent-purple-light)', textTransform: 'none' }}>{adm.course}</span></td>
                                                <td>{adm.date}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        adm.status === 'Approved' ? 'badge-active' : 
                                                        adm.status === 'Pending' ? 'badge-pending' : 'badge-read'
                                                    }`}>{adm.status}</span>
                                                </td>
                                                <td>
                                                    {adm.status === 'Pending' && (
                                                        <div style={{ display: 'flex', gap: '6px' }}>
                                                            <button 
                                                                className="icon-action-btn approve" 
                                                                title="Approve & Enroll"
                                                                onClick={() => {
                                                                    mgmt.approveAdmission(adm.id);
                                                                    alert(`${adm.name} enrollment approved! Auto-created active student profile.`);
                                                                }}
                                                            >
                                                                ✓
                                                            </button>
                                                            <button 
                                                                className="icon-action-btn delete" 
                                                                title="Reject Enrolment"
                                                                onClick={() => mgmt.rejectAdmission(adm.id)}
                                                            >
                                                                ✗
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* EVENTS MODULE */}
                    {activeTab === 'events' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Events Management</h1>
                                    <p className="content-subtitle">Schedule recitals, cultural nights, and showcases</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Create Event</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Event Name</th>
                                            <th>Date / Time</th>
                                            <th>Venue</th>
                                            <th>Description</th>
                                            <th>Lineup</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEvents.map(evt => (
                                            <tr key={evt.id}>
                                                <td><strong>{evt.name}</strong></td>
                                                <td><code>{evt.date} @ {evt.time}</code></td>
                                                <td>{evt.venue}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{evt.description}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{evt.performanceSchedule}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" onClick={() => openItemModal('edit', evt)}>✏️</button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(evt.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PERFORMANCES MODULE */}
                    {activeTab === 'performances' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Performance Lineup</h1>
                                    <p className="content-subtitle">Choreography flow and slots allocations for scheduled shows</p>
                                </div>
                            </div>

                            {mgmt.events.map(evt => (
                                <div key={evt.id} className="glass-card" style={{ marginBottom: '24px' }}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h2 style={{ color: 'var(--accent-pink-light)' }}>🎭 {evt.name}</h2>
                                            <p style={{ fontSize: '12px' }}>{evt.venue} | {evt.date}</p>
                                        </div>
                                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => navigate('/admin/events')}>Edit Event Details</button>
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <strong>Choreography Timings:</strong>
                                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginTop: '8px', color: 'var(--text-secondary)' }}>
                                            {evt.performanceSchedule ? (
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
                                                    {evt.performanceSchedule.split(',').map((sch, i) => (
                                                        <li key={i} style={{ marginBottom: '6px' }}>{sch.trim()}</li>
                                                    ))}
                                                </ul>
                                            ) : 'No schedule defined yet. Use the Events tab to add a schedule.'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CERTIFICATES MODULE */}
                    {activeTab === 'certificates' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Student Certificates Deck</h1>
                                    <p className="content-subtitle">Generate merit credentials and view historical issuances</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Issue New Certificate</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Certificate Number</th>
                                            <th>Student Name</th>
                                            <th>Course Completed</th>
                                            <th>Date of Issue</th>
                                            <th>View Document</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.certificates.map(cert => (
                                            <tr key={cert.id}>
                                                <td><code>{cert.certificateNo}</code></td>
                                                <td><strong>{cert.studentName}</strong></td>
                                                <td>{cert.courseName}</td>
                                                <td>{cert.issueDate}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-secondary" 
                                                        style={{ padding: '6px 12px', fontSize: '12px' }}
                                                        onClick={() => setSelectedCert(cert)}
                                                    >
                                                        Print / Preview 🏆
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TIMETABLE MODULE */}
                    {activeTab === 'timetable' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Timetable & Schedules</h1>
                                    <p className="content-subtitle">Weekly batch calendars and sessions sync</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Create Slot</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Dance Style</th>
                                            <th>Assigned Trainer</th>
                                            <th>Timing Slot</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mgmt.timetable.map(slot => (
                                            <tr key={slot.id}>
                                                <td><span className={`day-badge ${slot.dayClass || 'day-monday'}`}>{slot.day}</span></td>
                                                <td><strong>{slot.type}</strong></td>
                                                <td>{slot.trainer}</td>
                                                <td><code>{slot.time}</code></td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" onClick={() => openItemModal('edit', slot)}>✏️</button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(slot.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* GALLERY MODULE */}
                    {activeTab === 'gallery' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Media Gallery Organizer</h1>
                                    <p className="content-subtitle">Simulate media uploads and category organization</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Add Photo Link</button>
                            </div>

                            <div className="gallery-album-grid">
                                {mgmt.gallery.map(photo => (
                                    <div key={photo.id} className="gallery-photo-card">
                                        <div className="gallery-img-container">
                                            <img src={photo.url} alt={photo.title} />
                                            <div className="gallery-photo-overlay">
                                                <button className="icon-action-btn delete" onClick={() => handleDeleteItem(photo.id)}>🗑️</button>
                                            </div>
                                        </div>
                                        <div className="gallery-info-block">
                                            <h4 className="gallery-photo-title">{photo.title}</h4>
                                            <div className="gallery-album-tag">📁 {photo.album}</div>
                                            <div className="gallery-photo-date">Added: {photo.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ANNOUNCEMENTS MODULE */}
                    {activeTab === 'announcements' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Notice Announcements</h1>
                                    <p className="content-subtitle">Broadcast reminders and news updates to student accounts</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => openItemModal('add')}>➕ Write Notice</button>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Notice Board Message</th>
                                            <th>Published Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAnnouncements.map(ann => (
                                            <tr key={ann.id}>
                                                <td style={{ fontSize: '15px' }}>📢 <strong>{ann.text}</strong></td>
                                                <td><code>{ann.date}</code></td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="icon-action-btn edit" onClick={() => openItemModal('edit', ann)}>✏️</button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(ann.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES MODULE */}
                    {activeTab === 'messages' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Enquiry Messages</h1>
                                    <p className="content-subtitle">Inbox queries submitted via Contact forms</p>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Sender Name</th>
                                            <th>Email Address</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Date Received</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMessages.map(msg => (
                                            <tr key={msg.id}>
                                                <td><strong>{msg.name}</strong></td>
                                                <td>{msg.email}</td>
                                                <td><em>{msg.subject}</em></td>
                                                <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={msg.message}>{msg.message}</td>
                                                <td>{msg.date}</td>
                                                <td>
                                                    <span className={`badge ${msg.status === 'Unread' ? 'badge-unread' : 'badge-read'}`}>{msg.status}</span>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button 
                                                            className="btn btn-primary" 
                                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                                            onClick={() => setReplyingMessage(msg)}
                                                        >
                                                            Reply ✉️
                                                        </button>
                                                        <button className="icon-action-btn delete" onClick={() => handleDeleteItem(msg.id)}>🗑️</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* REPORTS MODULE */}
                    {activeTab === 'reports' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>Administration Reports</h1>
                                    <p className="content-subtitle">Analytical summaries of classes, revenue, and enrollments</p>
                                </div>
                            </div>

                            <div className="dashboard-grid">
                                <div className="glass-card">
                                    <div className="card-header">
                                        <h2>📊 Class Enrollment Metrics</h2>
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        {mgmt.classes.map(cls => {
                                            // Calculate actual enrollment based on admission data mapping to this class name
                                            const enrolledCount = mgmt.admissions.filter(a => a.course === cls.name && a.rawStatus === 'enrolled').length;
                                            // Mock capacity for UI demo purposes, assume 30
                                            const capacity = 30;
                                            const pct = Math.min(100, Math.round((enrolledCount / capacity) * 100));
                                            
                                            return (
                                                <div key={cls.id} style={{ marginBottom: '16px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                                        <span>{cls.name} (Instructor: {cls.trainer})</span>
                                                        <strong>{pct}% Capacity Enrolled ({enrolledCount}/{capacity})</strong>
                                                    </div>
                                                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-purple))' }}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <div className="card-header">
                                        <h2>💰 Fee Collection Audit</h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                                        <div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>TOTAL REVENUE TARGET</div>
                                            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>₹{mgmt.fees.reduce((acc, curr) => acc + curr.amount, 0)}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', color: 'var(--accent-green)' }}>TOTAL PAID TO DATE</div>
                                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)' }}>
                                                ₹{mgmt.fees.filter(f => f.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0)}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', color: 'var(--accent-orange)' }}>TOTAL PENDING COLLECTION</div>
                                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-orange)' }}>
                                                ₹{mgmt.fees.filter(f => f.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SETTINGS MODULE */}
                    {activeTab === 'settings' && (
                        <div>
                            <div className="content-title-area">
                                <div>
                                    <h1>System Settings</h1>
                                    <p className="content-subtitle">Configure dance school brand variables and theme skins</p>
                                </div>
                            </div>

                            <div className="glass-card" style={{ maxWidth: '600px' }}>
                                <form onSubmit={handleSaveSettings}>
                                    <div className="admin-form-group">
                                        <label>Dance Studio Name</label>
                                        <input 
                                            type="text" 
                                            value={studioName}
                                            onChange={(e) => setStudioName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="admin-form-group">
                                        <label>System Color Theme Skin</label>
                                        <select value={adminTheme} onChange={(e) => setAdminTheme(e.target.value)}>
                                            <option value="deep-indigo">Teal Pine & Gold (Default)</option>
                                            <option value="neon-purple">Minty Breeze & Teal</option>
                                            <option value="emerald-glow">Luxury Golden Teal</option>
                                        </select>
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Mock File Storage Sync Directory</label>
                                        <input type="text" value="LocalBrowserStorage/IDLY_School" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Save Settings</button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* GENERIC CRUD MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>{modalMode === 'add' ? 'Add New Item' : 'Edit Item'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleModalSubmit}>
                            <div className="modal-body">
                                
                                {activeTab === 'students' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Full Student Name</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.name || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Email Address</label>
                                            <input 
                                                type="email" 
                                                value={formInputs.email || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, email: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Mobile Number</label>
                                                <input 
                                                    type="tel" 
                                                    value={formInputs.mobile || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, mobile: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Batch Allocation</label>
                                                <select 
                                                    value={formInputs.batchId || 'batch-evening'} 
                                                    onChange={e => setFormInputs({ ...formInputs, batchId: e.target.value })}
                                                >
                                                    {mgmt.batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        {modalMode === 'edit' && (
                                            <div className="admin-form-group">
                                                <label>Student Status</label>
                                                <select 
                                                    value={formInputs.status || 'Active'} 
                                                    onChange={e => setFormInputs({ ...formInputs, status: e.target.value })}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeTab === 'teachers' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Instructor Name</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.name || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Email</label>
                                                <input 
                                                    type="email" 
                                                    value={formInputs.email || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, email: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Mobile</label>
                                                <input 
                                                    type="tel" 
                                                    value={formInputs.mobile || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, mobile: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Specialization Styles</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Western, Classical"
                                                    value={formInputs.specialization || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, specialization: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Experience Duration</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 5 Years"
                                                    value={formInputs.experience || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, experience: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Brief Bio</label>
                                            <textarea 
                                                value={formInputs.bio || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, bio: e.target.value })} 
                                                rows="3"
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'classes' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Dance Class Name</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.name || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Description</label>
                                            <textarea 
                                                value={formInputs.desc || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, desc: e.target.value })} 
                                                rows="2"
                                                required
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Cover Photo Image URL</label>
                                            <input 
                                                type="url" 
                                                placeholder="https://example.com/image.jpg"
                                                value={formInputs.img || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, img: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Assigned Instructor</label>
                                                <input 
                                                    type="text" 
                                                    value={formInputs.trainer || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, trainer: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Default Timings</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 9:00 AM - 10:00 AM"
                                                    value={formInputs.timing || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, timing: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'batches' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Batch Name</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.name || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Shift Timings</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. 9:00 AM - 11:00 AM"
                                                value={formInputs.timing || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, timing: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'events' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Event Name</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.name || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Scheduled Date</label>
                                                <input 
                                                    type="date" 
                                                    value={formInputs.date || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, date: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Scheduled Time</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 6:00 PM"
                                                    value={formInputs.time || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, time: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Venue Auditorium</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.venue || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, venue: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Event Description</label>
                                            <textarea 
                                                value={formInputs.description || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, description: e.target.value })} 
                                                rows="2"
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Performance Schedule Lineups (Comma separated)</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Bharatanatyam: 6:00 PM, Hip Hop: 6:30 PM"
                                                value={formInputs.performanceSchedule || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, performanceSchedule: e.target.value })} 
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'timetable' && (
                                    <>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Dance Style</label>
                                                <select 
                                                    value={formInputs.type || 'Bharatanatyam'} 
                                                    onChange={e => setFormInputs({ ...formInputs, type: e.target.value })}
                                                >
                                                    {mgmt.classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Assigned Instructor</label>
                                                <select 
                                                    value={formInputs.trainer || 'Bala'} 
                                                    onChange={e => setFormInputs({ ...formInputs, trainer: e.target.value })}
                                                >
                                                    {mgmt.teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="admin-form-group">
                                                <label>Day of Week</label>
                                                <select 
                                                    value={formInputs.day || 'Monday'} 
                                                    onChange={e => setFormInputs({ ...formInputs, day: e.target.value })}
                                                >
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Class Category (dayClass)</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. General, Advanced"
                                                    value={formInputs.dayClass || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, dayClass: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Timing Slot</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 9:00 AM - 10:00 AM"
                                                    value={formInputs.time || ''} 
                                                    onChange={e => setFormInputs({ ...formInputs, time: e.target.value })} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'announcements' && (
                                    <div className="admin-form-group">
                                        <label>Broadcast Message Notice</label>
                                        <textarea 
                                            value={formInputs.text || ''} 
                                            onChange={e => setFormInputs({ ...formInputs, text: e.target.value })} 
                                            rows="4"
                                            required 
                                        />
                                    </div>
                                )}

                                {activeTab === 'gallery' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Photo Title</label>
                                            <input 
                                                type="text" 
                                                value={formInputs.title || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, title: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Album Category</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Summer Groove 2026"
                                                value={formInputs.album || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, album: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>External Photo URL Link</label>
                                            <input 
                                                type="url" 
                                                placeholder="https://images.unsplash.com/..."
                                                value={formInputs.url || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, url: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'certificates' && (
                                    <>
                                        <div className="admin-form-group">
                                            <label>Student Search</label>
                                            <select 
                                                value={formInputs.studentName || ''} 
                                                onChange={e => setFormInputs({ ...formInputs, studentName: e.target.value })}
                                                required
                                            >
                                                <option value="">-- Choose Student --</option>
                                                {mgmt.students.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Course Title Completed</label>
                                            <select 
                                                value={formInputs.courseName || 'Bharatanatyam Fundamentals'} 
                                                onChange={e => setFormInputs({ ...formInputs, courseName: e.target.value })}
                                                required
                                            >
                                                {mgmt.classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                    </>
                                )}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{modalMode === 'add' ? 'Save Item' : 'Update Details'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* RECEIPT VIEW MODAL */}
            {activeReceipt && (
                <div className="modal-overlay">
                    <div className="modal-card" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h2>Invoice Receipt Detail</h2>
                            <button className="modal-close" onClick={() => setActiveReceipt(null)}>×</button>
                        </div>
                        <div className="modal-body" style={{ color: 'var(--text-secondary)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <span style={{ fontSize: '32px' }}>📄</span>
                                <h3 style={{ color: '#fff', marginTop: '10px' }}>{studioName}</h3>
                                <p style={{ fontSize: '12px' }}>Receipt Generated Locally</p>
                            </div>
                            <div style={{ borderTop: '1px dashed var(--glass-border)', borderBottom: '1px dashed var(--glass-border)', padding: '16px 0', margin: '16px 0', fontSize: '13px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Invoice Ref:</span>
                                    <strong><code>#{activeReceipt.id.substring(activeReceipt.id.length - 8)}</code></strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Student:</span>
                                    <strong>{activeReceipt.studentName}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Monthly Due Date:</span>
                                    <span>{activeReceipt.dueDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Paid Date:</span>
                                    <span>{activeReceipt.payDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '15px', color: '#fff' }}>
                                    <span>Amount Received:</span>
                                    <strong>₹{activeReceipt.amount}</strong>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                                Thank you for learning with us! Keep dancing! 💃
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary btn-block" onClick={() => setActiveReceipt(null)}>Close Receipt</button>
                        </div>
                    </div>
                </div>
            )}

            {/* PRINT READY CERTIFICATE PREVIEW MODAL */}
            {selectedCert && (
                <div className="modal-overlay">
                    <div className="modal-card" style={{ maxWidth: '650px', background: '#fcfcfc' }}>
                        <div className="modal-header" style={{ borderBottom: '1px solid #ddd' }}>
                            <h2 style={{ color: '#1a1a2e' }}>Credentials Merit Document</h2>
                            <button className="modal-close" style={{ color: '#555' }} onClick={() => setSelectedCert(null)}>×</button>
                        </div>
                        <div className="modal-body" style={{ background: '#f4f4f4', padding: '10px' }}>
                            
                            <div className="cert-preview-card">
                                <div className="cert-seal">🏆</div>
                                <div className="cert-title">CERTIFICATE OF EXCELLENCE</div>
                                <div className="cert-subtitle">This document is proudly presented to</div>
                                <div className="cert-name">{selectedCert.studentName}</div>
                                <div className="cert-text">
                                    for successfully satisfying the fundamental program requirements and showcasing outstanding rhythmic mastery in the course study of <br />
                                    <span className="cert-course">{selectedCert.courseName}</span>
                                </div>
                                <div className="cert-meta-row">
                                    <div>
                                        <div>Date of Award: <strong>{selectedCert.issueDate}</strong></div>
                                        <div>Ref: <code>{selectedCert.certificateNo}</code></div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ textDecoration: 'underline', fontStyle: 'italic', fontWeight: 'bold' }}>{adminProfile.name}</div>
                                        <div>Director, IDLY Studios</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer" style={{ background: '#eee', borderTop: '1px solid #ccc' }}>
                            <button className="btn btn-secondary" style={{ color: '#333' }} onClick={() => setSelectedCert(null)}>Close Preview</button>
                            <button className="btn btn-primary" onClick={() => { window.print(); }}>Print Document 🖨️</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MESSAGE REPLY DIALOG */}
            {replyingMessage && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h2>Reply to Inquiry</h2>
                            <button className="modal-close" onClick={() => setReplyingMessage(null)}>×</button>
                        </div>
                        <form onSubmit={handleSendReply}>
                            <div className="modal-body">
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                                    <div><strong>From:</strong> {replyingMessage.name} &lt;{replyingMessage.email}&gt;</div>
                                    <div style={{ marginTop: '4px' }}><strong>Subject:</strong> {replyingMessage.subject}</div>
                                    <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}><em>"{replyingMessage.message}"</em></div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Write Reply Message</label>
                                    <textarea 
                                        value={replyText} 
                                        onChange={e => setReplyText(e.target.value)} 
                                        rows="4" 
                                        placeholder="Type your response here..."
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setReplyingMessage(null)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Send Email Response ✉️</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
