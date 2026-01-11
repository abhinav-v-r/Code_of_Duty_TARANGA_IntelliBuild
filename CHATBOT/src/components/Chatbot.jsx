import React, { useState, useEffect, useRef } from 'react';
import { getChatbotResponse } from '../utils/chatbotLogic';
import chatbotData from '../data/chatbot-data.json';
import './Chatbot.css';

/**
 * Main Chatbot Component
 * Designed specifically for senior citizens with:
 * - Large, readable fonts
 * - High-contrast colors
 * - Simple, one-click interactions
 * - Friendly, reassuring interface
 */
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show greeting message when component loads
  useEffect(() => {
    const greetingMessage = {
      id: Date.now(),
      text: chatbotData.greeting.en, // Default greeting in English
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([greetingMessage]);
    // Focus input after greeting loads
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  /**
   * Handle sending a message
   * Simple one-click function - no complex interactions
   */
  const handleSendMessage = (e) => {
    e.preventDefault();

    // Don't send empty messages
    if (!inputValue.trim()) {
      return;
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate a small delay for more natural conversation feel
    // This makes the chatbot feel more human and less abrupt
    setTimeout(() => {
      try {
        // Get chatbot response using our logic
        const botResponseText = getChatbotResponse(userMessage.text, chatbotData);

        const botMessage = {
          id: Date.now() + 1,
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        // Handle errors gracefully - show friendly error message
        const errorMessage = {
          id: Date.now() + 1,
          text: "I apologize, but I'm having a bit of trouble understanding right now. Could you please try rephrasing your question? I'm here to help!",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
        // Refocus input after sending
        inputRef.current?.focus();
      }
    }, 800); // 800ms delay for reassuring, slow-paced response
  };

  /**
   * Handle Enter key press - also sends message for accessibility
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>Chat Assistant</h1>
        <p className="subtitle">Ask me anything, I'm here to help!</p>
      </div>

      <div className="chatbot-messages" role="log" aria-live="polite" aria-atomic="false">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here..."
          className="chatbot-input"
          aria-label="Type your message"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          className="chatbot-send-button"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
