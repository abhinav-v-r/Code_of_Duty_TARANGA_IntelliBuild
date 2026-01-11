# Customer Support Floating Chatbot with Voice

A customer-support style floating chatbot for React web applications with Google Gemini AI integration, voice input (speech-to-text), and voice output (text-to-speech). Designed especially for senior citizens and first-time digital users.

## ✨ Features

- **🔄 Floating Widget**: Circular chat icon at bottom-right corner
- **📱 Expandable Window**: Click icon to expand into a chat window
- **🌐 Language Selection**: Mandatory language selection (English/മലയാളം) on first open
- **🤖 Gemini AI Integration**: Powered by Google Gemini AI for intelligent responses
- **🎤 Voice Input**: Speak your questions using the microphone button (Speech-to-Text)
- **🔊 Voice Output**: Automatic spoken replies (Text-to-Speech) with mute/unmute toggle
- **🎨 Senior-Friendly Design**: Large fonts, high contrast, simple UI
- **💬 Bilingual Support**: Full support for English and Malayalam
- **⌨️ Keyboard Accessible**: Enter key to send messages
- **📜 Auto-scroll**: Automatically scrolls to latest messages

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 3. Configure API Key

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual Gemini API key.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:5173` (or the URL shown in terminal)

## 📋 Requirements

- Node.js v16 or higher
- npm or yarn
- Google Gemini API key (free tier available)
- Modern browser with microphone access (for voice input)
- Modern browser with speech synthesis support (for voice output)

## 🎯 Usage

### Basic Integration

```jsx
import FloatingChatbot from './components/FloatingChatbot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <FloatingChatbot />
    </div>
  );
}
```

The chatbot will automatically appear as a floating icon at the bottom-right corner.

## 🎤 Voice Features

### Voice Input (Speech-to-Text)
- Click the **microphone button** in the input area
- Speak your question clearly
- Text appears automatically in the input field
- Supports both English and Malayalam speech recognition

### Voice Output (Text-to-Speech)
- All chatbot responses are **automatically spoken aloud**
- Toggle voice on/off using the **speaker icon** in the header
- Voice language matches your selected language
- Optimized for clarity (slightly slower speech rate)

**Perfect for elderly users** who prefer speaking and listening over typing and reading!

## 🔧 How It Works

1. **Initial State**: Circular chat icon visible at bottom-right
2. **Language Selection**: User clicks icon → Language selection screen appears
3. **Language Choice**: User selects English or Malayalam
4. **Chat Interface**: Chat window opens with greeting message (spoken if voice enabled)
5. **User Input**: User types or speaks their question
6. **AI Responses**: Messages sent to Gemini AI with language preference
7. **Voice Output**: Response automatically spoken (if voice enabled)
8. **Responses**: Gemini responds in the selected language only

## 🎨 Design Features

- **Large, readable fonts** (16-24px)
- **High-contrast colors** for visibility
- **Smooth animations** for interactions
- **Simple, clean interface**
- **Mobile-responsive** design
- **Accessibility features** (ARIA labels, keyboard navigation)
- **Visual feedback** for voice input (pulsing red button when listening)

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── FloatingChatbot.jsx    # Main floating chatbot component
│   │   └── FloatingChatbot.css    # Chatbot styles
│   ├── utils/
│   │   └── geminiApi.js           # Gemini API integration
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── .env                           # Environment variables (create this)
├── .env.example                   # Example env file
├── package.json
└── vite.config.js
```

## 🔐 Environment Variables

Create a `.env` file with:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**Important**: Never commit the `.env` file to version control (already in .gitignore)

## 🛠️ Customization

### Changing Colors

Edit `src/components/FloatingChatbot.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjusting Window Size

Edit the `.floating-chat-window` class:

```css
.floating-chat-window {
  width: 400px;  /* Change width */
  height: 600px; /* Change height */
}
```

### Modifying Voice Settings

Edit the `speakText` function in `src/components/FloatingChatbot.jsx`:

```javascript
utterance.rate = 0.85;  // Speech speed (0.1 to 10)
utterance.pitch = 1.0;  // Voice pitch (0 to 2)
utterance.volume = 1.0; // Volume (0 to 1)
```

## 📱 Browser Support

### Voice Input (Speech-to-Text)
- ✅ Chrome (latest) - Full support
- ✅ Edge (latest) - Full support
- ✅ Safari (latest) - Full support (macOS/iOS)
- ⚠️ Firefox - Limited support

### Voice Output (Text-to-Speech)
- ✅ All modern browsers

### General Features
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use and modify for your needs.

## 🆘 Troubleshooting

### API Key Not Working
- Verify the `.env` file is in the root directory
- Check the variable name is exactly `VITE_GEMINI_API_KEY`
- Restart the development server after updating `.env`

### Chatbot Not Appearing
- Check browser console for errors
- Verify React components are rendering correctly
- Ensure no CSS conflicts with z-index

### API Errors
- Verify your Gemini API key is valid
- Check API quota/limits in Google AI Studio
- Review browser console for detailed error messages

### Voice Input Not Working
- Check browser permissions (allow microphone access)
- Ensure you're using Chrome, Edge, or Safari
- Verify your microphone is working
- Check browser console for errors

### Voice Output Not Working
- Check if voice is muted (speaker icon in header)
- Ensure device volume is up
- Check browser console for errors
- Try a different browser

## 📚 Documentation

- [Gemini API Setup Guide](./GEMINI_SETUP.md)
- [Voice Features Guide](./VOICE_FEATURES.md)
- [Google Gemini Documentation](https://ai.google.dev/docs)

## 🎯 Perfect for Elderly Users

This chatbot is specifically designed with senior citizens in mind:

- ✅ **Voice-first**: Speak instead of type
- ✅ **Audible responses**: Listen instead of read
- ✅ **Large buttons**: Easy to see and click
- ✅ **Clear speech**: Slower, clearer voice output
- ✅ **Simple interface**: No complex features
- ✅ **Visual feedback**: Clear indicators for all actions
- ✅ **High contrast**: Easy to see
- ✅ **Large fonts**: Easy to read
