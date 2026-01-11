import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="about">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="logo-text">
                                <span className="text-gradient">Cyber</span>Shield
                            </span>
                        </div>
                        <p className="footer-description">
                            Empowering India's digital citizens with knowledge to combat cyber fraud.
                            Stay informed, stay protected.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991228 9.97631 1 11.75C0.988687 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.8383 17.9581 2.17814 18.2945C2.51798 18.6308 2.93883 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0113 9.96295 22.8572 8.1787 22.54 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <a href="#">All Blogs</a>
                            <a href="#">Scam Database</a>
                            <a href="#">Safety Guides</a>
                            <a href="#">Video Tutorials</a>
                        </div>
                        <div className="footer-column">
                            <h4>Categories</h4>
                            <a href="#">UPI Scams</a>
                            <a href="#">Email Phishing</a>
                            <a href="#">Job Frauds</a>
                            <a href="#">Investment Scams</a>
                        </div>
                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#">Report a Scam</a>
                            <a href="#">Get Help</a>
                            <a href="#">Contact Us</a>
                            <a href="#">FAQs</a>
                        </div>
                        <div className="footer-column">
                            <h4>Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Disclaimer</a>
                        </div>
                    </div>
                </div>

                <div className="footer-cta">
                    <div className="cta-content">
                        <h3>Got scammed? Report it now!</h3>
                        <p>Help others by sharing your experience. Every report makes our community safer.</p>
                    </div>
                    <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="cta-btn">
                        Cyber Crime Portal
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 CyberShield. All rights reserved. Made with ❤️ for Digital India</p>
                    <div className="footer-badges">
                        <span className="badge">🔒 SSL Secured</span>
                        <span className="badge">✓ Community Verified</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
