import React from 'react';
import { testimonials } from '../data/blogs';
import './Testimonials.css';

const Testimonials = () => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`star ${i < rating ? 'filled' : 'empty'}`}
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="section-header">
                    <div className="section-badge">
                        <span>💬</span>
                        Success Stories
                    </div>
                    <h2 className="section-title">
                        Real <span className="text-gradient">Impact</span> Stories
                    </h2>
                    <p className="section-subtitle">
                        See how our community saved themselves from cyber fraud
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    {testimonial.avatar}
                                </div>
                                <div className="testimonial-info">
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <span className="testimonial-location">{testimonial.location}</span>
                                </div>
                                <div className="google-logo">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                                        <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13002 18.63 6.70002 16.69 5.84002 14.09H2.18002V16.94C3.99002 20.53 7.70002 23 12 23Z" fill="#34A853" />
                                        <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.09Z" fill="#FBBC05" />
                                        <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.70002 1 3.99002 3.47 2.18002 7.06L5.84002 9.91C6.70002 7.31 9.13002 5.38 12 5.38Z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </div>

                            <div className="testimonial-rating">
                                {renderStars(testimonial.rating)}
                            </div>

                            <p className="testimonial-text">"{testimonial.text}"</p>

                            <div className="testimonial-saved">
                                <span className="saved-label">Money Saved:</span>
                                <span className="saved-amount">{testimonial.saved}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="trust-metrics">
                    <div className="metric">
                        <div className="metric-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="metric-content">
                            <div className="metric-value">98%</div>
                            <div className="metric-label">Prevention Rate</div>
                        </div>
                    </div>

                    <div className="metric">
                        <div className="metric-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="metric-content">
                            <div className="metric-value">2.8M+</div>
                            <div className="metric-label">Users Educated</div>
                        </div>
                    </div>

                    <div className="metric">
                        <div className="metric-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="metric-content">
                            <div className="metric-value">₹45Cr+</div>
                            <div className="metric-label">Money Protected</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
