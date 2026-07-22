import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormFeedback from '../components/Forms/FormFeedback';
import { forgotPassword as forgotPasswordApi } from '../api/authApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add('centered');
        return () => {
            document.body.classList.remove('centered');
        };
    }, []);

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^[6-9]\d{9}$/.test(val);

    const handleReset = () => {
        setEmail('');
        setMobile('');
        setFeedback(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedMobile = mobile.trim();

        if (!validateEmail(trimmedEmail)) {
            setFeedback({ message: 'Please enter a valid registered email address.', type: 'error' });
            return;
        }

        if (!validatePhone(trimmedMobile)) {
            setFeedback({ message: 'Please enter a valid registered 10-digit mobile number.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setFeedback(null);

        try {
            const response = await forgotPasswordApi({ email: trimmedEmail, mobile: trimmedMobile });
            if (response.success) {
                setFeedback({
                    message: response.message || 'Account verified. Please contact the admin to reset your password.',
                    type: 'success'
                });
            } else {
                setFeedback({ message: response.message || 'Verification failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            const msg = error.response?.data?.message ||
                'No account found matching these details. Please verify your email and mobile.';
            setFeedback({ message: msg, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1 className="auth-title">Dance School Management System</h1>
                <div className="divider"></div>

                <h2 className="auth-subtitle">🔒 Forgot Password</h2>
                <p className="auth-desc">Enter your registered email address and mobile number to verify your account.</p>

                <FormFeedback message={feedback?.message} type={feedback?.type} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your registered mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            autoComplete="tel"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? '⏳ Verifying...' : 'Verify Account'}
                        </button>
                        <button type="button" className="btn btn-secondary btn-block" onClick={handleReset} disabled={isLoading}>Clear</button>
                    </div>
                </form>

                <div className="divider"></div>

                <p className="auth-link">Remember your password? <Link to="/login">Back to Login</Link></p>

                <div className="divider"></div>

                <p className="auth-desc" style={{ fontSize: '12px', marginBottom: 0 }}>
                    After verification, please contact the admin to reset your password.
                </p>

                <div className="auth-footer">
                    &copy; 2026 Dance School Management System. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
