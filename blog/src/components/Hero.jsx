import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                <div className="hero-orb orb-1"></div>
                <div className="hero-orb orb-2"></div>
                <div className="hero-grid"></div>
            </div>

            <div className="hero-container">
                <div className="hero-badge">
                    <span className="badge-icon">🛡️</span>
                    <span>Protecting India's Digital Citizens</span>
                </div>

                <h1 className="hero-title">
                    Stay Safe in the <span className="text-gradient">Digital World</span>
                </h1>

                <p className="hero-subtitle">
                    Learn about the latest cyber scams, fraud patterns, and protection strategies.
                    Our community-driven insights help millions stay safe from online threats.
                </p>

                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-value">15.2K+</div>
                        <div className="stat-label">Scams Reported</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-value">₹45 Cr+</div>
                        <div className="stat-label">Money Saved</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-value">2.8M+</div>
                        <div className="stat-label">Users Educated</div>
                    </div>
                </div>

                <div className="hero-actions">
                    <a href="#blogs" className="btn-primary">
                        <span>Read Latest Blogs</span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#about" className="btn-secondary">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <polygon points="10,8 16,12 10,16" fill="currentColor" />
                        </svg>
                        <span>Watch How It Works</span>
                    </a>
                </div>

                <div className="hero-trust">
                    <div className="trust-label">Trusted by:</div>
                    <div className="trust-logos">
                        <div className="trust-logo">RBI</div>
                        <div className="trust-logo">CERT-In</div>
                        <div className="trust-logo">NPCI</div>
                        <div className="trust-logo">Cyber Police</div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
