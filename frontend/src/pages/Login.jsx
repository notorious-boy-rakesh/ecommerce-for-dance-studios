import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import FormFeedback from '../components/Forms/FormFeedback';

const Login = () => {
    const { login, isLoggedIn } = useAuth();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [strength, setStrength] = useState({
        percent: 0,
        text: '',
        color: '',
        background: 'linear-gradient(90deg, #e05e5e, #f19066)'
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        document.body.classList.add('centered');

        const savedUser = localStorage.getItem('rememberedUser');
        const isChecked = localStorage.getItem('rememberMe') === 'true';

        if (savedUser) {
            setUsername(savedUser);
        }
        setRememberMe(isChecked);

        return () => {
            document.body.classList.remove('centered');
        };
    }, []);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        let score = 0;
        if (value.length >= 8) score += 1;
        if (/[A-Z]/.test(value)) score += 1;
        if (/[a-z]/.test(value)) score += 1;
        if (/\d/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;

        const percent = Math.round((score / 5) * 100);
        let text = '';
        let color = '';
        let background = 'linear-gradient(90deg, #e05e5e, #f19066)';

        if (value.length === 0) {
            setStrength({ percent: 0, text: '', color: '', background });
            return;
        }

        if (score <= 2) {
            background = 'linear-gradient(90deg, #e05e5e, #f19066)';
            text = 'Weak';
            color = '#f7a4a4';
        } else if (score === 3 || score === 4) {
            background = 'linear-gradient(90deg, #f19066, #FDF4AF)';
            text = 'Good';
            color = '#FDF4AF';
        } else {
            background = 'linear-gradient(90deg, #6FBEB2, #A5E9DD)';
            text = 'Strong';
            color = '#A5E9DD';
        }

        setStrength({ percent, text, color, background });
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setFeedback(null);
        setStrength({
            percent: 0,
            text: '',
            color: '',
            background: 'linear-gradient(90deg, #e05e5e, #f19066)'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUser = username.trim();

        if (!trimmedUser) {
            setFeedback({ message: 'Please enter your username or email address.', type: 'error' });
            showAlert('Please enter your username or email address.', 'error');
            return;
        }

        if (!password) {
            setFeedback({ message: 'Please enter your password.', type: 'error' });
            showAlert('Please enter your password.', 'error');
            return;
        }

        setIsLoading(true);
        setFeedback(null);

        const res = await login(trimmedUser, password, rememberMe);

        setIsLoading(false);

        if (res.success) {
            setFeedback(null);
            showAlert(`Welcome back, ${res.user || 'Student'}! Redirecting...`, 'success', () => {
                navigate('/welcome');
            });
        } else {
            setFeedback({ message: res.message, type: 'error' });
            showAlert(res.message || 'Login failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1 className="auth-title">Dance School Management System</h1>
                <div className="divider"></div>

                <h2 className="auth-subtitle">Login</h2>
                <p className="auth-desc">Please enter your username and password to access your account.</p>
                <FormFeedback message={feedback?.message} type={feedback?.type} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
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
                        <div className="password-strength">
                            <div
                                className="strength-bar"
                                style={{
                                    width: `${strength.percent}%`,
                                    background: strength.background
                                }}
                            ></div>
                        </div>
                        <span className="strength-text" style={{ color: strength.color }}>
                            {strength.text}
                        </span>
                    </div>

                    <div className="form-group">
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />{' '}
                                Remember Me
                            </label>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? '⏳ Logging in...' : 'Login'}
                        </button>
                        <button type="button" className="btn btn-secondary btn-block" onClick={handleReset} disabled={isLoading}>Clear</button>
                    </div>
                </form>

                <div className="divider"></div>

                <p className="auth-link">New User? <Link to="/signup">Sign Up</Link></p>
                <p className="auth-link">Forgot Password? <Link to="/forgot-password">Click Here</Link></p>

                <div className="divider"></div>
                <p className="auth-link" style={{ textAlign: 'center', marginTop: '10px' }}>
                    🛡️ <Link to="/admin-login" style={{ fontWeight: '600', color: 'var(--accent-purple-light)' }}>Administrator Login</Link>
                </p>

                <div className="divider"></div>

                <div className="auth-footer">
                    &copy; 2026 Dance School Management System. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Login;
