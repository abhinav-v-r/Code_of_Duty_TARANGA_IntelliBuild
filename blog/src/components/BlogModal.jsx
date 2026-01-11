import React, { useEffect, useState } from 'react';
import './BlogModal.css';

const BlogModal = ({ post, onClose }) => {
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderStars = (rating, interactive = false) => {
        const stars = [];
        const displayRating = interactive ? (hoverRating || userRating) : rating;

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`star ${i <= displayRating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={interactive ? () => setUserRating(i) : undefined}
                    onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
                    onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
                >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            );
        }
        return stars;
    };

    const formatContent = (content) => {
        return content.split('\n').map((line, idx) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={idx} className="content-heading">{line.replace(/\*\*/g, '')}</h4>;
            }
            if (line.startsWith('•')) {
                return <li key={idx} className="content-bullet">{line.substring(1).trim()}</li>;
            }
            if (line.trim() === '') {
                return <br key={idx} />;
            }
            return <p key={idx} className="content-paragraph">{line}</p>;
        });
    };

    if (!post) return null;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="modal-header">
                    <img src={post.image} alt={post.title} className="modal-image" />
                    <div className="modal-header-overlay">
                        <div className="modal-category" style={{ background: post.categoryColor }}>
                            {post.category}
                        </div>
                    </div>
                </div>

                <div className="modal-content">
                    <div className="modal-meta">
                        <span>{post.date}</span>
                        <span className="meta-dot">•</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h1 className="modal-title">{post.title}</h1>

                    {/* Google Style Rating Display */}
                    <div className="modal-rating-box">
                        <div className="rating-left">
                            <div className="rating-big">{post.rating}</div>
                            <div className="rating-stars-container">
                                {renderStars(post.rating)}
                            </div>
                            <div className="rating-reviews">{post.reviews.toLocaleString()} reviews</div>
                        </div>
                        <div className="rating-bars">
                            <div className="rating-bar-row">
                                <span>5</span>
                                <div className="rating-bar"><div className="rating-bar-fill" style={{ width: '75%' }}></div></div>
                            </div>
                            <div className="rating-bar-row">
                                <span>4</span>
                                <div className="rating-bar"><div className="rating-bar-fill" style={{ width: '18%' }}></div></div>
                            </div>
                            <div className="rating-bar-row">
                                <span>3</span>
                                <div className="rating-bar"><div className="rating-bar-fill" style={{ width: '5%' }}></div></div>
                            </div>
                            <div className="rating-bar-row">
                                <span>2</span>
                                <div className="rating-bar"><div className="rating-bar-fill" style={{ width: '1%' }}></div></div>
                            </div>
                            <div className="rating-bar-row">
                                <span>1</span>
                                <div className="rating-bar"><div className="rating-bar-fill" style={{ width: '1%' }}></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-author">
                        <div className="author-avatar" style={{ background: `linear-gradient(135deg, ${post.categoryColor}, ${post.categoryColor}aa)` }}>
                            {post.authorAvatar}
                        </div>
                        <div className="author-details">
                            <span className="author-name">
                                {post.author}
                                {post.verified && (
                                    <svg className="verified-icon" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                                        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className="author-role">{post.authorRole}</span>
                        </div>
                        <button className="follow-btn">Follow</button>
                    </div>

                    <div className="modal-body">
                        {formatContent(post.content)}
                    </div>

                    <div className="modal-tags">
                        {post.tags.map((tag) => (
                            <span key={tag} className="tag">#{tag}</span>
                        ))}
                    </div>

                    {/* User Review Section */}
                    <div className="user-review-section">
                        <h3>Rate this article</h3>
                        <p>Help others by sharing your experience</p>

                        <div className="user-rating-container">
                            {renderStars(userRating, true)}
                            {userRating > 0 && (
                                <span className="rating-label">
                                    {userRating === 5 ? 'Excellent!' : userRating === 4 ? 'Very Helpful' : userRating === 3 ? 'Helpful' : userRating === 2 ? 'Somewhat Helpful' : 'Not Helpful'}
                                </span>
                            )}
                        </div>

                        {userRating > 0 && !showReviewForm && (
                            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
                                Write a Review
                            </button>
                        )}

                        {showReviewForm && (
                            <div className="review-form">
                                <textarea
                                    placeholder="Share your thoughts about this article..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    rows={4}
                                />
                                <div className="review-form-actions">
                                    <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>Cancel</button>
                                    <button className="submit-btn">Submit Review</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button className="action-btn share">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 8.84066C7.54305 8.32015 6.80891 8 6 8C4.34315 8 3 9.34315 3 11C3 12.6569 4.34315 14 6 14C6.80891 14 7.54305 13.6798 8.08261 13.1593L15.0227 16.6294C15.0077 16.7508 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.1911 14 16.457 14.3202 15.9174 14.8407L8.97733 11.3706C8.99229 11.2492 9 11.1255 9 11C9 10.8745 8.99229 10.7508 8.97733 10.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Share
                        </button>
                        <button className="action-btn bookmark">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Save
                        </button>
                        <button className="action-btn report">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M4 15V3C4 3 5.5 2 8 2C10.5 2 12.5 4 15 4C17.5 4 20 3 20 3V15C20 15 17.5 16 15 16C12.5 16 10.5 14 8 14C5.5 14 4 15 4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 22V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Report Issue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
