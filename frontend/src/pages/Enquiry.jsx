import React, { useState } from 'react';
import GlassCard from '../components/Common/GlassCard';
import FormFeedback from '../components/Forms/FormFeedback';
import Footer from '../components/Footer/Footer';
import { sendEnquiry } from '../api/enquiryApi';

const Enquiry = () => {
    const [studentName, setStudentName] = useState('');
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [danceStyle, setDanceStyle] = useState('');
    const [batch, setBatch] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateName = (val) => /^[A-Za-z\s]{3,}$/.test(val);
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^[6-9]\d{9}$/.test(val);

    const handleReset = () => {
        setStudentName('');
        setParentName('');
        setEmail('');
        setMobile('');
        setGender('');
        setDanceStyle('');
        setBatch('');
        setMessage('');
        setFeedback(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateName(studentName.trim())) {
            setFeedback({ message: 'Please enter the student name.', type: 'error' });
            return;
        }

        if (!validateName(parentName.trim())) {
            setFeedback({ message: 'Please enter the parent or guardian name.', type: 'error' });
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

        setIsLoading(true);
        setFeedback(null);

        try {
            const response = await sendEnquiry({
                studentName: studentName.trim(),
                parentName: parentName.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                gender: gender.toLowerCase(),
                danceStyle,
                batch,
                message: message.trim(),
            });
            setFeedback({
                message: response.message || 'Your enquiry has been received. Our team will contact you soon.',
                type: 'success'
            });
            handleReset();
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
            setFeedback({ message: msg, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Enquiry Form</h1>
                <p className="subtitle">Have questions about admissions, classes, fees, or events? Fill out the form below</p>
            </div>

            {/* Enquiry Form */}
            <div className="container-sm animate-1">
                <GlassCard
                    title="Submit Your Enquiry"
                    subtitle="We'll respond as soon as possible"
                    icon="📝"
                    iconClass="icon-pink"
                    style={{ animation: 'none' }}
                >
                    <FormFeedback message={feedback?.message} type={feedback?.type} />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Student Name</label>
                            <input
                                type="text"
                                placeholder="Enter student name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Parent / Guardian Name</label>
                            <input
                                type="text"
                                placeholder="Enter parent or guardian name"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                autoComplete="tel"
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={gender === 'Male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />{' '}
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={gender === 'Female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />{' '}
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={gender === 'Other'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />{' '}
                                    Other
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Dance Style</label>
                            <select value={danceStyle} onChange={(e) => setDanceStyle(e.target.value)}>
                                <option value="" disabled>Select a dance style</option>
                                <option value="Bharatanatyam">Bharatanatyam</option>
                                <option value="Western Dance">Western Dance</option>
                                <option value="Hip-Hop">Hip-Hop</option>
                                <option value="Classical Dance">Classical Dance</option>
                                <option value="Folk Dance">Folk Dance</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Preferred Batch</label>
                            <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                                <option value="" disabled>Select preferred batch</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Your Enquiry</label>
                            <textarea
                                placeholder="Type your enquiry here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                                {isLoading ? '⏳ Submitting...' : 'Send Enquiry'}
                            </button>
                            <button type="button" className="btn btn-secondary btn-block" onClick={handleReset} disabled={isLoading}>Clear Form</button>
                        </div>
                    </form>
                </GlassCard>
            </div>

            {/* Contact Info */}
            <div className="container-sm animate-2">
                <div className="highlight-box">
                    <h3>📞 Contact Information</h3>
                    <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
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
                        <div className="info-item">
                            <div className="info-label">Address</div>
                            <div className="info-value">Aruppukottai, Chennai, Tamil Nadu</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer extraText="Thank you for contacting us. We will respond to your enquiry as soon as possible." />
        </div>
    );
};

export default Enquiry;
