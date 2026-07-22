import React, { useState } from 'react';
import GlassCard from '../components/Common/GlassCard';
import FormFeedback from '../components/Forms/FormFeedback';
import Footer from '../components/Footer/Footer';
import { sendContactMessage } from '../api/contactApi';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateName = (val) => /^[A-Za-z\s]{3,}$/.test(val);
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^[6-9]\d{9}$/.test(val);

    const handleReset = () => {
        setName('');
        setEmail('');
        setMobile('');
        setMessage('');
        setFeedback(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateName(name.trim())) {
            setFeedback({ message: 'Please enter your full name.', type: 'error' });
            return;
        }

        if (!validateEmail(email.trim())) {
            setFeedback({ message: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        if (!validatePhone(mobile.trim())) {
            setFeedback({ message: 'Please enter a valid 10-digit mobile number.', type: 'error' });
            return;
        }

        if (message.trim().length < 10) {
            setFeedback({ message: 'Please share a little more detail so we can help you better.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setFeedback(null);

        try {
            const response = await sendContactMessage({
                name: name.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                message: message.trim(),
            });
            setFeedback({
                message: response.message || 'Thanks! Your message has been received. We will get back to you shortly.',
                type: 'success'
            });
            handleReset();
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to send message. Please try again.';
            setFeedback({ message: msg, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Contact Us</h1>
                <p className="subtitle">We're happy to help you with admissions, dance sessions, fees, and general enquiries</p>
            </div>

            {/* Contact Info Cards */}
            <div className="container animate-1">
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">📞 Phone</div>
                        <div className="info-value">+91 8838169271</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">📧 Email</div>
                        <div className="info-value">
                            <a href="mailto:ajaykrishnamurthy45@gmail.com">ajaykrishnamurthy45@gmail.com</a>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">📍 Address</div>
                        <div className="info-value">Aruppukottai, Virudhunagar, Tamil Nadu, India</div>
                    </div>
                </div>
            </div>

            {/* Office Hours & Courses */}
            <div className="container animate-2">
                <GlassCard
                    title="Office Hours &amp; Courses"
                    subtitle="Our availability and dance programs"
                    icon="🕐"
                    iconClass="icon-purple"
                    style={{ animation: 'none' }}
                >
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-label">Mon - Fri</div>
                            <div className="info-value">9:00 AM – 6:00 PM</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Saturday</div>
                            <div className="info-value">9:00 AM – 2:00 PM</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Sunday</div>
                            <div className="info-value" style={{ color: '#ff6b6b' }}>Holiday</div>
                        </div>
                    </div>

                    <h3 className="section-title" style={{ marginTop: '20px' }}>
                        <span className="dot dot-pink"></span> Courses Offered
                    </h3>
                    <ul className="content-list star">
                        <li>Bharatanatyam</li>
                        <li>Western Dance</li>
                        <li>Hip-Hop</li>
                        <li>Classical Dance</li>
                        <li>Folk Dance</li>
                    </ul>
                </GlassCard>
            </div>

            {/* Enquiry Form */}
            <div className="container animate-3">
                <GlassCard
                    title="Send Your Enquiry"
                    subtitle="Fill out the form and we'll get back to you"
                    icon="✉️"
                    iconClass="icon-pink"
                    style={{ animation: 'none' }}
                >
                    <FormFeedback message={feedback?.message} type={feedback?.type} />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
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
                            <label>Message</label>
                            <textarea
                                placeholder="Type your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? '⏳ Sending...' : 'Send Message'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={isLoading}>Clear</button>
                        </div>
                    </form>
                </GlassCard>
            </div>

            {/* Why Choose Us */}
            <div className="container animate-4">
                <div className="highlight-box">
                    <h3>⭐ Why Choose Our Dance School?</h3>
                    <ul className="content-list check">
                        <li>Experienced dance instructors</li>
                        <li>Friendly learning environment</li>
                        <li>Flexible class timings</li>
                        <li>Annual cultural performances</li>
                        <li>Certificate after course completion</li>
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <Footer extraText="Thank you for visiting. We look forward to helping you begin your dance journey." />
        </div>
    );
};

export default Contact;
