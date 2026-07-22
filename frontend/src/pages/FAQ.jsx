import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/Common/GlassCard';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
    const faqs = [
        {
            q: 'How can I join the dance school?',
            a: 'You can join by filling out the Application Form available on our website.'
        },
        {
            q: 'What dance courses are available?',
            a: (
                <ul>
                    <li>Bharatanatyam</li>
                    <li>Western Dance</li>
                    <li>Hip-Hop</li>
                    <li>Classical Dance</li>
                    <li>Folk Dance</li>
                </ul>
            )
        },
        {
            q: 'What are the class timings?',
            a: 'Classes are conducted in the Morning, Afternoon, and Evening batches. Students can choose a suitable batch during registration.'
        },
        {
            q: 'How do I pay the course fee?',
            a: 'Fees can be paid at the school office or through the online payment facility available in the Dance School Management System.'
        },
        {
            q: 'Can I change my batch after registration?',
            a: 'Yes. Students can request a batch change based on seat availability.'
        },
        {
            q: 'Will I receive a certificate?',
            a: 'Yes. A course completion certificate is provided after successfully completing the training.'
        },
        {
            q: 'How can I contact the dance school?',
            a: 'Phone: +91 8838169271 | Email: ajaykrishnamurthy45@gmail.com'
        },
        {
            q: 'What should I wear for classes?',
            a: 'Students should wear comfortable dance clothing and follow the dress code recommended by the instructor.'
        },
        {
            q: 'What happens if I miss a class?',
            a: 'Students should inform the instructor in advance. Makeup classes may be available depending on the schedule.'
        },
        {
            q: 'Where is the dance school located?',
            a: 'Aruppukottai, Virudhunagar, Tamil Nadu, India.'
        }
    ];

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>Frequently Asked Questions</h1>
                <p className="subtitle">Answers to the most common questions about our dance school, admissions, classes, and fees</p>
            </div>

            {/* FAQ Content */}
            <div className="container animate-1">
                <GlassCard
                    title="Common Questions"
                    subtitle="Everything you need to know before joining"
                    icon="❓"
                    iconClass="icon-purple"
                    style={{ animation: 'none' }}
                >
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="faq-item">
                            <div className="faq-question">
                                <span className="faq-number">{idx + 1}</span>
                                {faq.q}
                            </div>
                            <div className="faq-answer">
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </GlassCard>
            </div>

            {/* Quick Links */}
            <div className="container animate-2">
                <GlassCard style={{ animation: 'none' }}>
                    <div className="quick-links">
                        <Link to="/home">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </GlassCard>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default FAQ;
