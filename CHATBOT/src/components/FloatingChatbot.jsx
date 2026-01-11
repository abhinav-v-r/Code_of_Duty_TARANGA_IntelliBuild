import React, { useState, useEffect, useRef } from 'react';
import { getGeminiResponse } from '../utils/geminiApi';
import './FloatingChatbot.css';

/**
 * Floating Customer Support Chatbot with Voice Support
 * - Circular icon at bottom-right
 * - Expands to chat window on click
 * - Mandatory language selection first
 * - Gemini AI integration
 * - Voice input (Speech-to-Text)
 * - Voice output (Text-to-Speech)
 */
function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // 'en' or 'ml'
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // Voice output enabled by default
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Language selection texts
  const languageTexts = {
    en: {
      selectLanguage: 'Please select your language',
      english: 'English',
      malayalam: 'മലയാളം',
      greeting: 'Hello! How can I help you today?',
      placeholder: 'Type your message or click microphone to speak...',
      send: 'Send',
      minimize: 'Minimize',
      close: 'Close',
      microphone: 'Microphone',
      listening: 'Listening...',
      mute: 'Mute Voice',
      unmute: 'Unmute Voice'
    },
    ml: {
      selectLanguage: 'ദയവായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
      english: 'English',
      malayalam: 'മലയാളം',
      greeting: 'നമസ്കാരം! ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?',
      placeholder: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ മൈക്രോഫോൺ ക്ലിക്ക് ചെയ്ത് സംസാരിക്കുക...',
      send: 'അയയ്ക്കുക',
      minimize: 'ചുരുക്കുക',
      close: 'അടയ്ക്കുക',
      microphone: 'മൈക്രോഫോൺ',
      listening: 'കേൾക്കുന്നു...',
      mute: 'ശബ്ദം നിരത്തുക',
      unmute: 'ശബ്ദം ഓണാക്കുക'
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false; // Stop after one sentence
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onstart = () => {
          console.log('[Voice Debug] Speech recognition started');
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event) => {
          console.log('[Voice Debug] Speech result received', event);
          const transcript = event.results[0][0].transcript;
          console.log('[Voice Debug] Transcript:', transcript);
          if (transcript) {
            setInputValue(transcript);
            // Optional: Auto-send if high confidence? For now just set input.
          }
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('[Voice Debug] Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please enable it in browser settings.');
          }
        };

        recognitionRef.current.onend = () => {
          console.log('[Voice Debug] Speech recognition ended');
          setIsListening(false);
        };

        recognitionRef.current.onnomatch = () => {
          console.log('[Voice Debug] No speech matched');
          setIsListening(false);
        };
      }

      synthRef.current = window.speechSynthesis;

      // Ensure voices are loaded (they may not be available immediately)
      if (synthRef.current && synthRef.current.getVoices().length === 0) {
        synthRef.current.onvoiceschanged = () => {
          // Voices loaded
        };
      }
    }

    // Cleanup function
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current && selectedLanguage) {
      recognitionRef.current.lang = selectedLanguage === 'en' ? 'en-US' : 'ml-IN';
    }
  }, [selectedLanguage]);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && selectedLanguage) {
      scrollToBottom();
    }
  }, [messages, isOpen, selectedLanguage]);

  // Handle language selection
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);

    // Add greeting message after language selection
    const greetingMessage = {
      id: Date.now(),
      text: languageTexts[lang].greeting,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([greetingMessage]);

    // Speak greeting if voice is enabled (with a small delay to ensure smooth playback)
    if (isVoiceEnabled && synthRef.current) {
      setTimeout(() => {
        speakText(languageTexts[lang].greeting, lang);
      }, 500);
    }

    // Focus input after a short delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
  };

  // Text-to-Speech function
  const speakText = (text, lang) => {
    console.log('[Voice Debug] speakText called:', text.substring(0, 20) + '...');
    if (!isVoiceEnabled || !synthRef.current) {
      console.log('[Voice Debug] Voice disabled or synth not found');
      return;
    }

    // Ensure synthesis is not paused
    if (synthRef.current.paused) {
      console.log('[Voice Debug] Resuming paused synth');
      synthRef.current.resume();
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();
    setIsSpeaking(false);

    const utter = () => {
      const voices = synthRef.current.getVoices();
      console.log(`[Voice Debug] Loaded ${voices.length} voices.`);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'ml-IN';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        console.log('[Voice Debug] Speech started');
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('[Voice Debug] Speech ended');
        setIsSpeaking(false);
      };

      utterance.onerror = (e) => {
        console.error('[Voice Debug] Speech error:', e);
        setIsSpeaking(false);
      };

      let preferredVoice = null;

      if (lang === 'en') {
        // Prefer English voices (US, UK, etc.)
        preferredVoice = voices.find(voice =>
          voice.lang.startsWith('en') && (voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha'))
        ) || voices.find(voice => voice.lang.startsWith('en'));
      } else {
        // For Malayalam, try to find Malayalam or Hindi voices (closest match)
        preferredVoice = voices.find(voice =>
          voice.lang.startsWith('ml') || voice.lang.startsWith('hi')
        ) || voices.find(voice => voice.lang.includes('IN'));
      }

      if (preferredVoice) {
        console.log(`[Voice Debug] Using voice: ${preferredVoice.name}`);
        utterance.voice = preferredVoice;
      } else {
        console.log('[Voice Debug] Using default voice');
      }

      synthRef.current.speak(utterance);
    };

    // If voices are already loaded, speak immediately
    if (synthRef.current.getVoices().length > 0) {
      utter();
    } else {
      console.log('[Voice Debug] Waiting for voices...');
      let attempts = 0;
      const waitForVoices = () => {
        attempts++;
        const voices = synthRef.current.getVoices();
        if (voices.length > 0) {
          utter();
        } else if (attempts < 20) { // Try for ~2 seconds
          setTimeout(waitForVoices, 100);
        } else {
          console.warn('[Voice Debug] Timeout waiting for voices, trying default');
          // Speak with default voice if loading fails
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang === 'en' ? 'en-US' : 'ml-IN';
          utterance.onstart = () => setIsSpeaking(true);
          utterance.onend = () => setIsSpeaking(false);
          synthRef.current.speak(utterance);
        }
      };

      // Also listen to the event
      synthRef.current.onvoiceschanged = () => {
        synthRef.current.onvoiceschanged = null; // Remove listener
        console.log('[Voice Debug] onvoiceschanged fired');
        utter();
      };

      waitForVoices();
    }
  };

  // Handle voice input (microphone button)
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(selectedLanguage === 'en'
        ? 'Speech recognition is not supported in your browser'
        : 'നിങ്ങളുടെ ബ്രൗസറിൽ സ്പീച്ച് റെക്കോഗ്നിഷൻ പിന്തുണയ്ക്കുന്നില്ല');
      return;
    }

    if (isListening) {
      console.log('[Voice Debug] Stopping microphone via button');
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      console.log('[Voice Debug] Starting microphone');
      // Explicitly set language before starting
      recognitionRef.current.lang = selectedLanguage === 'en' ? 'en-US' : 'ml-IN';

      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('[Voice Debug] Failed to start recognition:', e);
        setIsListening(false);
      }
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    if (isOpen) {
      // Logic for closing
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Minimize chat
  const minimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
    // Stop any ongoing speech when minimizing
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  // Toggle voice output
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled === false && synthRef.current) {
      synthRef.current.cancel();
    }
  };

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || !selectedLanguage) {
      return;
    }

    const messageText = inputValue.trim();

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const response = await getGeminiResponse(messageText, selectedLanguage);

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Speak the response if voice is enabled
      if (isVoiceEnabled) {
        speakText(response, selectedLanguage);
      }
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: selectedLanguage === 'en'
          ? "I apologize, but I'm having trouble right now. Please try again in a moment."
          : "ക്ഷമിക്കണം, എനിക്ക് ഇപ്പോൾ പ്രശ്നമുണ്ട്. ദയവായി കുറച്ച് നേരത്തിന് ശേഷം വീണ്ടും ശ്രമിക്കുക.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Speak error message if voice is enabled
      if (isVoiceEnabled) {
        speakText(errorMessage.text, selectedLanguage);
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle keyboard
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const texts = selectedLanguage ? languageTexts[selectedLanguage] : languageTexts.en;

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          className="floating-chat-icon"
          onClick={toggleChat}
          aria-label="Open chat"
          title="Open chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
              fill="white"
            />
            <path
              d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z"
              fill="white"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="floating-chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <h2>{selectedLanguage === 'en' ? 'Chat Support' : 'DISHA '}</h2>
            </div>
            <div className="chat-header-actions">
              {/* Voice Toggle Button */}
              {selectedLanguage && (
                <button
                  className="chat-voice-toggle"
                  onClick={toggleVoice}
                  aria-label={isVoiceEnabled ? texts.mute : texts.unmute}
                  title={isVoiceEnabled ? texts.mute : texts.unmute}
                >
                  {isVoiceEnabled ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.01C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.84 14 18.7V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.01C15.5 15.29 16.5 13.77 16.5 12ZM19 12C19 15.17 16.89 17.84 14 18.7V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              )}
              <button
                className="chat-minimize-btn"
                onClick={minimizeChat}
                aria-label={texts.minimize}
                title={texts.minimize}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 13H5V11H19V13Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Language Selection Screen */}
          {!selectedLanguage && (
            <div className="language-selection-screen">
              <h3>{languageTexts.en.selectLanguage}</h3>
              <p style={{ marginBottom: '30px', fontSize: '18px', color: '#666' }}>
                {languageTexts.ml.selectLanguage}
              </p>
              <div className="language-buttons">
                <button
                  className="language-btn language-btn-english"
                  onClick={() => handleLanguageSelect('en')}
                >
                  {languageTexts.en.english}
                </button>
                <button
                  className="language-btn language-btn-malayalam"
                  onClick={() => handleLanguageSelect('ml')}
                >
                  {languageTexts.ml.malayalam}
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {selectedLanguage && (
            <>
              {/* Speaking Indicator */}
              {isSpeaking && (
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.1)',
                  padding: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  🔊 Speaking...
                </div>
              )}

              <div className="chat-messages" role="log" aria-live="polite">
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

              {/* Input Form */}
              <form className="chat-input-form" onSubmit={handleSendMessage}>
                <div className="chat-input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={texts.placeholder}
                    className="chat-input"
                    aria-label="Type your message"
                    disabled={isLoading || isListening}
                  />
                  {/* Microphone Button */}
                  <button
                    type="button"
                    className={`microphone-btn ${isListening ? 'listening' : ''}`}
                    onClick={handleVoiceInput}
                    aria-label={texts.microphone}
                    title={isListening ? texts.listening : texts.microphone}
                    disabled={isLoading}
                  >
                    {isListening ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="red" opacity="0.3" />
                        <circle cx="12" cy="12" r="8" fill="red" />
                        <path d="M12 1C11.4 1 11 1.4 11 2V6C11 6.6 11.4 7 12 7C12.6 7 13 6.6 13 6V2C13 1.4 12.6 1 12 1ZM19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V10H19ZM12 21C13.1 21 14 21.9 14 23H10C10 21.9 10.9 21 12 21Z" fill="white" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 14C13.1 14 14 13.1 14 12V6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6V12C10 13.1 10.9 14 12 14ZM19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V10H19ZM12 21C13.1 21 14 21.9 14 23H10C10 21.9 10.9 21 12 21Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="chat-send-button"
                  disabled={isLoading || !inputValue.trim() || isListening}
                  aria-label={texts.send}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default FloatingChatbot;
