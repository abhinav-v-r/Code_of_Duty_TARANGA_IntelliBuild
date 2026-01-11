import React, { useState } from 'react';
import './BlogCard.css';

const BlogCard = ({ post, onClick, featured = false }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="star filled" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="star half" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id={`half-${post.id}-${i}`}>
                                <stop offset="50%" stopColor="#facc15" />
                                <stop offset="50%" stopColor="#3f3f46" />
                            </linearGradient>
                        </defs>
                        <path fill={`url(#half-${post.id}-${i})`} d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="star empty" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    const formatReviews = (count) => {
        if (count >= 1000) {
            return `(${(count / 1000).toFixed(1)}K reviews)`;
        }
        return `(${count} reviews)`;
    };

    return (
        <article
            className={`blog-card ${featured ? 'featured' : ''}`}
            onClick={() => onClick && onClick(post)}
        >
            <div className="card-image-container">
                <div className={`card-image-placeholder ${imageLoaded ? 'hidden' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <path d="M21 15L16 10L11 15M11 15L9 13L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <img
                    src={post.image}
                    alt={post.title}
                    className={`card-image ${imageLoaded ? 'loaded' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="card-category" style={{ background: post.categoryColor }}>
                    {post.category}
                </div>
                {featured && (
                    <div className="card-featured-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        Featured
                    </div>
                )}
            </div>

            <div className="card-content">
                <div className="card-meta">
                    <span className="card-date">{post.date}</span>
                    <span className="card-divider">•</span>
                    <span className="card-readtime">{post.readTime}</span>
                </div>

                <h3 className="card-title">{post.title}</h3>

                <p className="card-excerpt">{post.excerpt}</p>

                {/* Google Review Style Rating */}
                <div className="card-rating">
                    <div className="rating-stars">
                        {renderStars(post.rating)}
                    </div>
                    <span className="rating-value">{post.rating}</span>
                    <span className="rating-count">{formatReviews(post.reviews)}</span>
                </div>

                <div className="card-footer">
                    <div className="card-author">
                        <div className="author-avatar" style={{ background: `linear-gradient(135deg, ${post.categoryColor}, ${post.categoryColor}aa)` }}>
                            {post.authorAvatar}
                        </div>
                        <div className="author-info">
                            <span className="author-name">
                                {post.author}
                                {post.verified && (
                                    <svg className="verified-badge" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className="author-role">{post.authorRole}</span>
                        </div>
                    </div>

                    <button className="card-read-more">
                        Read
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
