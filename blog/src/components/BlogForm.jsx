import React, { useState } from 'react';
import './BlogForm.css';

const BlogForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'General',
        content: '',
        author: '',
        email: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to backend
        console.log('Blog submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                title: '',
                category: 'General',
                content: '',
                author: '',
                email: ''
            });
        }, 3000);
    };

    return (
        <div className="blog-form-container">
            <div className="blog-form-header">
                <h3>Share Your Experience</h3>
                <p>Help others stay safe by sharing your encounter with digital fraud.</p>
            </div>

            {submitted ? (
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h4>Thank you for sharing!</h4>
                    <p>Your story has been submitted for review and will be published shortly.</p>
                </div>
            ) : (
                <form className="blog-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Story Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., How I avoided a lottery scam"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="General">General Awareness</option>
                                <option value="Email Scam">Email Scams</option>
                                <option value="UPI Fraud">UPI Fraud</option>
                                <option value="Honey Trap">Honey Trap</option>
                                <option value="Job Scam">Job Scam</option>
                                <option value="Identity Theft">Identity Theft</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Your Name (Optional)</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Anonymous"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Your Story</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Describe what happened, how you realized it was a scam, and what others should watch out for..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-story-btn">
                        <span>Submit Story</span>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </form>
            )}
        </div>
    );
};

export default BlogForm;
