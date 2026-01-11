import React from 'react';
import FloatingChatbot from './components/FloatingChatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Demo content to show the floating chatbot works on any page */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Welcome to Our Website</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
          This is a demo page to showcase the floating customer support chatbot. 
          The chatbot icon appears at the bottom-right corner of the screen.
          Click it to start a conversation!
        </p>
      </div>
      <FloatingChatbot />
    </div>
  );
}

export default App;
