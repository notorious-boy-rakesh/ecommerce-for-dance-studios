import React from 'react';
import GlassCard from '../components/Common/GlassCard';
import Footer from '../components/Footer/Footer';

const PrivacyPolicy = () => {
    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Privacy Policy</h1>
                <p className="subtitle">How we collect, use, and protect your personal information</p>
            </div>

            {/* Privacy Content */}
            <div className="container animate-1">
                <GlassCard style={{ animation: 'none' }}>
                    <div className="legal-section">
                        <h2>🛡️ Introduction</h2>
                        <p>
                            Welcome to the Dance School Management System. We respect your
                            privacy and are committed to protecting your personal information.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>📋 Information We Collect</h2>
                        <ul>
                            <li>Student Name</li>
                            <li>Date of Birth</li>
                            <li>Gender</li>
                            <li>Phone Number</li>
                            <li>Email Address</li>
                            <li>Parent/Guardian Details</li>
                            <li>Dance Course Details</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>📌 How We Use Your Information</h2>
                        <p>Your information is used to:</p>
                        <ul>
                            <li>Register students for dance classes</li>
                            <li>Maintain attendance records</li>
                            <li>Manage class schedules</li>
                            <li>Send important notifications</li>
                            <li>Improve our services</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>🔒 Data Security</h2>
                        <p>
                            We keep student information secure and take reasonable steps to
                            prevent unauthorized access, misuse, or loss of data.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>🤝 Information Sharing</h2>
                        <p>
                            Student information will not be shared with third parties unless
                            required by law or with the student's permission.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>🔄 Changes to Privacy Policy</h2>
                        <p>
                            The Dance School Management System may update this Privacy Policy
                            from time to time. Any changes will be posted on this page.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>📞 Contact Us</h2>
                        <p>
                            If you have any questions regarding this Privacy Policy, please contact us at:
                        </p>
                        <div className="info-grid" style={{ marginTop: '12px' }}>
                            <div className="info-item">
                                <div className="info-label">Email</div>
                                <div className="info-value">
                                    <a href="mailto:danceschool@gmail.com">danceschool@gmail.com</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Phone</div>
                                <div className="info-value">+91 8838169271</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
