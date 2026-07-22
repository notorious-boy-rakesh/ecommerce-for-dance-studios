import React from 'react';
import GlassCard from '../components/Common/GlassCard';
import Footer from '../components/Footer/Footer';

const TermsAndConditions = () => {
    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Terms &amp; Conditions</h1>
                <p className="subtitle">Please read the following terms carefully before using our Dance School Management System</p>
            </div>

            {/* Terms Content */}
            <div className="container animate-1">
                <GlassCard style={{ animation: 'none' }}>
                    <div className="legal-section">
                        <h2>📜 Welcome</h2>
                        <p>
                            Please read the following terms and conditions carefully before
                            using our Dance School Management System.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>📋 General Rules</h2>
                        <ul>
                            <li>Students must complete the registration process</li>
                            <li>All information provided must be correct</li>
                            <li>Students should attend classes regularly</li>
                            <li>Students must follow the instructions of the dance instructors</li>
                            <li>Respect other students and staff members</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>💰 Fees and Payments</h2>
                        <p>
                            Course fees should be paid on or before the due date.
                            Fees once paid are generally non-refundable.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>📅 Attendance</h2>
                        <p>
                            Students are expected to attend all scheduled dance sessions.
                            Regular attendance helps improve learning and performance.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>🎯 Code of Conduct</h2>
                        <ul>
                            <li>Wear proper dance uniforms during classes</li>
                            <li>Maintain discipline inside the dance studio</li>
                            <li>Do not damage school property</li>
                            <li>Use respectful language with everyone</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>🔄 Changes to Terms</h2>
                        <p>
                            The Dance School reserves the right to modify these
                            terms and conditions at any time. Updated terms
                            will be displayed on this page.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>📞 Contact Information</h2>
                        <p>
                            For any questions regarding these Terms &amp; Conditions,
                            please contact the Dance School office.
                        </p>
                        <div className="info-grid" style={{ marginTop: '12px' }}>
                            <div className="info-item">
                                <div className="info-label">Phone</div>
                                <div className="info-value">+91 8838169271</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Email</div>
                                <div className="info-value">
                                    <a href="mailto:ajaykrishnamurthy45@gmail.com">ajaykrishnamurthy45@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Agreement Notice */}
            <div className="container animate-2">
                <div className="highlight-box">
                    <h3>✅ Agreement</h3>
                    <p className="content-text" style={{ marginBottom: 0 }}>
                        Thank you for choosing our Dance School.
                        By using this website, you agree to these Terms &amp; Conditions.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
