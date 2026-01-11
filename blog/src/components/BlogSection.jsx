import React, { useState } from 'react';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { categories } from '../data/blogs';
import './BlogSection.css';

const BlogSection = ({ posts, onPostClick }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(post => post.category === activeCategory);

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <section className="blog-section" id="blogs">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">
                        Blogs
                    </h2>
                    <p className="section-subtitle">
                        Community-reviewed guides to help you identify and avoid online scams
                    </p>
                </div>

                <div className="category-filters" id="categories">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            className={`category-btn ${activeCategory === cat.name ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(cat.name);
                                setVisibleCount(6);
                            }}
                            style={{
                                '--category-color': cat.color,
                                borderColor: activeCategory === cat.name ? cat.color : 'transparent'
                            }}
                        >
                            <span className="category-dot" style={{ background: cat.color }}></span>
                            {cat.name}
                            <span className="category-count">{cat.count}</span>
                        </button>
                    ))}
                </div>

                <div className="blog-grid">
                    {visiblePosts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            featured={index < 2 && activeCategory === 'All'}
                            onClick={onPostClick}
                        />
                    ))}
                </div>

                {visibleCount < filteredPosts.length && (
                    <div className="load-more-container">
                        <button className="load-more-btn" onClick={handleLoadMore}>
                            <span>Load More Articles</span>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="section-divider"></div>
                <BlogForm />
            </div>
        </section>
    );
};

export default BlogSection;
