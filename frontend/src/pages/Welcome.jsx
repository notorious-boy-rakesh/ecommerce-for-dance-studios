import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [dateTime, setDateTime] = useState('');
    const [showBtn, setShowBtn] = useState(false);
    const [redirectText, setRedirectText] = useState('Redirecting to dashboard...');
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Enforce body styles
        document.body.style.overflow = 'hidden';

        // Date/Time Clock
        const updateClock = () => {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            setDateTime(now.toLocaleDateString('en-IN', options));
        };
        updateClock();
        const clockInterval = setInterval(updateClock, 1000);

        // Particle generation
        const colors = ['#34908B', '#6FBEB2', '#A5E9DD', '#FDF4AF', '#c0f2ea', '#fffbda', '#2ed573'];
        const list = Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 8 + 3;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 5;
            const delay = Math.random() * 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            return {
                id: i,
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    background: color,
                    boxShadow: `0 0 ${size * 2}px ${color}40`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                }
            };
        });
        setParticles(list);

        // Timeline triggers
        const showBtnTimeout = setTimeout(() => {
            setShowBtn(true);
            setRedirectText('Click below or wait to continue...');
        }, 3000);

        const redirectTimeout = setTimeout(() => {
            goToDashboard();
        }, 5000);

        return () => {
            document.body.style.overflow = '';
            clearInterval(clockInterval);
            clearTimeout(showBtnTimeout);
            clearTimeout(redirectTimeout);
        };
    }, []);

    const goToDashboard = () => {
        navigate('/home');
    };

    return (
        <div className="welcome-wrapper-outer">
            {/* Embedded styles to preserve exact welcome page graphics scoped to this layout */}
            <style dangerouslySetInnerHTML={{ __html: `
                .welcome-wrapper-outer {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }
                .particles {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0;
                    animation: floatUp linear infinite;
                }
                @keyframes floatUp {
                    0% {
                        opacity: 0;
                        transform: translateY(100vh) scale(0);
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10vh) scale(1);
                    }
                }
                .welcome-content {
                    text-align: center;
                    z-index: 10;
                    position: relative;
                    padding: 40px 20px;
                }
                .welcome-emoji {
                    font-size: 80px;
                    display: inline-block;
                    animation: danceEmoji 2s ease-in-out infinite;
                    margin-bottom: 20px;
                }
                @keyframes danceEmoji {
                    0%, 100% { transform: rotate(-10deg) scale(1); }
                    25% { transform: rotate(10deg) scale(1.1); }
                    50% { transform: rotate(-5deg) scale(1.05); }
                    75% { transform: rotate(8deg) scale(1.1); }
                }
                .welcome-greeting {
                    font-size: 20px;
                    font-weight: 400;
                    color: var(--text-muted);
                    opacity: 0;
                    animation: revealText 0.8s ease-out 0.3s forwards;
                    margin-bottom: 8px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                }
                .welcome-name {
                    font-size: 52px;
                    font-weight: 800;
                    background: linear-gradient(135deg, var(--accent-pink), var(--accent-gold), var(--accent-purple-light));
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: revealText 0.8s ease-out 0.6s forwards, gradientShift 3s ease infinite;
                    opacity: 0;
                    margin-bottom: 16px;
                }
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .welcome-studio {
                    font-size: 28px;
                    font-weight: 600;
                    color: var(--text-primary);
                    opacity: 0;
                    animation: revealText 0.8s ease-out 0.9s forwards;
                    margin-bottom: 10px;
                }
                .welcome-tagline {
                    font-size: 16px;
                    color: var(--text-muted);
                    opacity: 0;
                    animation: revealText 0.8s ease-out 1.2s forwards;
                    margin-bottom: 40px;
                    max-width: 480px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                }
                @keyframes revealText {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .progress-container {
                    opacity: 0;
                    animation: revealText 0.6s ease-out 1.5s forwards;
                    margin-bottom: 16px;
                }
                .progress-ring {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                    position: relative;
                }
                .progress-ring svg {
                    transform: rotate(-90deg);
                }
                .progress-ring circle {
                    fill: none;
                    stroke-width: 3;
                }
                .progress-ring .ring-bg {
                    stroke: rgba(255, 255, 255, 0.08);
                }
                .progress-ring .ring-fill {
                    stroke: url(#progressGradient);
                    stroke-dasharray: 163;
                    stroke-dashoffset: 163;
                    stroke-linecap: round;
                    animation: fillRing 3s ease-in-out 1.8s forwards;
                }
                @keyframes fillRing {
                    to { stroke-dashoffset: 0; }
                }
                .progress-text {
                    font-size: 13px;
                    color: var(--text-muted);
                    opacity: 0;
                    animation: revealText 0.5s ease-out 1.8s forwards;
                    letter-spacing: 1px;
                }
                .welcome-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 36px;
                    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
                    color: white;
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 20px rgba(52, 144, 139, 0.4);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(10px);
                    pointer-events: none;
                }
                .welcome-btn.show {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: all;
                }
                .welcome-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(52, 144, 139, 0.5);
                }
                .welcome-btn .arrow {
                    transition: transform 0.3s ease;
                }
                .welcome-btn:hover .arrow {
                    transform: translateX(4px);
                }
                .welcome-datetime {
                    position: fixed;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 13px;
                    color: var(--text-faint);
                    opacity: 0;
                    animation: revealText 0.6s ease-out 2s forwards;
                    white-space: nowrap;
                }
                @media (max-width: 768px) {
                    .welcome-name { font-size: 36px; }
                    .welcome-studio { font-size: 22px; }
                    .welcome-emoji { font-size: 60px; }
                }
                @media (max-width: 480px) {
                    .welcome-name { font-size: 28px; }
                    .welcome-studio { font-size: 18px; }
                }
            ` }} />

            {/* Floating Particles */}
            <div className="particles">
                {particles.map((p) => (
                    <div key={p.id} className="particle" style={p.style} />
                ))}
            </div>

            {/* Welcome Content */}
            <div className="welcome-content">
                <div className="welcome-emoji">💃</div>
                <p className="welcome-greeting">Welcome Back</p>
                <h1 className="welcome-name">
                    {user ? user.charAt(0).toUpperCase() + user.slice(1) : 'Student'}!
                </h1>
                <p className="welcome-studio">IDLY Kundan Studios</p>
                <p className="welcome-tagline">
                    Your journey into the world of dance continues. Let your passion move you! 🎶
                </p>

                {/* Progress Ring */}
                <div className="progress-container">
                    <div className="progress-ring">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#34908B" />
                                    <stop offset="100%" stop-color="#A5E9DD" />
                                </linearGradient>
                            </defs>
                            <circle className="ring-bg" cx="30" cy="30" r="26" />
                            <circle className="ring-fill" cx="30" cy="30" r="26" />
                        </svg>
                    </div>
                    <p className="progress-text">{redirectText}</p>
                </div>

                <button
                    className={`welcome-btn ${showBtn ? 'show' : ''}`}
                    onClick={goToDashboard}
                >
                    Go to Dashboard <span className="arrow">→</span>
                </button>
            </div>

            {/* Date/Time */}
            <div className="welcome-datetime">{dateTime}</div>
        </div>
    );
};

export default Welcome;
