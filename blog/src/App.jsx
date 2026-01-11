import React, { useState } from 'react';
import Header from './components/Header';
import BlogSection from './components/BlogSection';
import BlogModal from './components/BlogModal';
import Footer from './components/Footer';
import { blogPosts } from './data/blogs';
import './App.css';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <div style={{ paddingTop: '80px' }}>
          <BlogSection posts={blogPosts} onPostClick={handlePostClick} />
        </div>
      </main>
      <Footer />

      {selectedPost && (
        <BlogModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
