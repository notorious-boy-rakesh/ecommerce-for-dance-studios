import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormFeedback from '../components/Forms/FormFeedback';

const AdminLogin = () => {
    const { adminLogin, isAdminLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (isAdminLoggedIn) {
            navigate('/admin/dashboard');
        }
    }, [isAdminLoggedIn, navigate]);

    useEffect(() => {
        document.body.classList.add('centered');
        return () => {
            document.body.classList.remove('centered');
        };
    }, []);

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setFeedback(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedUser = username.trim();

        if (!trimmedUser) {
            setFeedback({ message: 'Please enter the administrator username.', type: 'error' });
            return;
        }

        if (!password) {
            setFeedback({ message: 'Please enter your password.', type: 'error' });
            return;
        }

        const res = adminLogin(trimmedUser, password);

        if (res.success) {
            setFeedback(null);
            navigate('/admin/dashboard');
        } else {
            setFeedback({ message: res.message, type: 'error' });
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1 className="auth-title">Dance School Management System</h1>
                <div className="divider"></div>

                <h2 className="auth-subtitle">🛡️ Admin Portal</h2>
                <p className="auth-desc">Please verify your administrator credentials to access the management deck.</p>
                
                <FormFeedback message={feedback?.message} type={feedback?.type} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="admin-username">Username</label>
                        <input
                            type="text"
                            id="admin-username"
                            placeholder="Enter Admin Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="admin-password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="admin-password"
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span>{showPassword ? '🙈' : '👁️'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary btn-block">Authenticate</button>
                        <button type="button" className="btn btn-secondary btn-block" onClick={handleReset}>Clear</button>
                    </div>
                </form>

                <div className="divider"></div>

                <p className="auth-link">Not an Administrator? <Link to="/login">Student Login</Link></p>

                <div className="divider"></div>

                <div className="auth-footer">
                    &copy; 2026 Dance School Management System. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
