import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormFeedback from '../components/Forms/FormFeedback';

const Signup = () => {
    const { signup, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        return () => {
            document.body.classList.remove('centered');
        };
    }, []);

    const validateName = (val) => /^[A-Za-z\s]{3,}$/.test(val);
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^[6-9]\d{9}$/.test(val);
    const validateUsername = (val) => /^[A-Za-z0-9_]{4,12}$/.test(val);
    const validatePassword = (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(val);

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
        setFullName('');
        setEmail('');
        setMobile('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
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

        if (!validateName(fullName.trim())) {
            setFeedback({ message: 'Please enter a valid full name with at least 3 letters.', type: 'error' });
            return;
        }

        if (!validateEmail(email.trim())) {
            setFeedback({ message: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        if (!validatePhone(mobile.trim())) {
            setFeedback({ message: 'Please enter a valid 10-digit mobile number starting with 6-9.', type: 'error' });
            return;
        }

        if (!validateUsername(username.trim())) {
            setFeedback({
                message: 'Username must be 4-12 characters long and can include letters, numbers, or underscores.',
                type: 'error'
            });
            return;
        }

        if (!validatePassword(password)) {
            setFeedback({ message: 'Password must include uppercase, lowercase, a number, and a symbol.', type: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            setFeedback({ message: 'Passwords do not match. Please re-enter them carefully.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setFeedback(null);

        const res = await signup(
            fullName.trim(), email.trim(), mobile.trim(),
            username.trim(), password, confirmPassword
        );

        setIsLoading(false);

        if (res.success) {
            setFeedback({ message: res.message || 'Registration successful! Redirecting...', type: 'success' });
            // Navigation is handled automatically by the isLoggedIn useEffect above
        } else {
            setFeedback({ message: res.message, type: 'error' });
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1 className="auth-title">Dance School Management System</h1>
                <div className="divider"></div>

                <h2 className="auth-subtitle">Student Registration</h2>
                <p className="auth-desc">Create a new account by filling in the details below.</p>

                <FormFeedback message={feedback?.message} type={feedback?.type} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            autoComplete="tel"
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
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
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? '⏳ Registering...' : 'Register'}
                        </button>
                        <button type="button" className="btn btn-secondary btn-block" onClick={handleReset} disabled={isLoading}>Clear</button>
                    </div>
                </form>

                <div className="divider"></div>

                <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>

                <div className="divider"></div>

                <div className="auth-footer">
                    &copy; 2026 Dance School Management System. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Signup;
