import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect(() => {
        document.body.classList.add('centered');
        return () => {
            document.body.classList.remove('centered');
        };
    }, []);

    return (
        <div className="auth-wrapper">
            <div className="auth-card" style={{ textAlign: 'center' }}>
                <h1 className="auth-title" style={{ fontSize: '48px', marginBottom: '10px' }}>404</h1>
                <h2 className="auth-subtitle" style={{ marginBottom: '14px' }}>Page Not Found</h2>
                <p className="auth-desc" style={{ marginBottom: '28px' }}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <div style={{ marginTop: '20px' }}>
                    <Link to="/home" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        Go to Homepage
                    </Link>
                </div>
                <div className="divider"></div>
                <div className="auth-footer">
                    &copy; 2026 Dance School Management System. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default NotFound;
