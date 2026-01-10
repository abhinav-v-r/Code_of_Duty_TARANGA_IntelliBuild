# 🔧 How to Configure API Keys

## The configuration is now embedded in `background.js`

Since Chrome extensions have issues with ES6 modules, I've embedded the configuration directly into the background script.

---

## 📝 To Enable APIs:

### **Open `background.js` and find this section (around line 6):**

```javascript
const API_CONFIG = {
  googleSafeBrowsing: {
    enabled: false,  // ← Change to true
    apiKey: 'YOUR_GOOGLE_SAFE_BROWSING_API_KEY_HERE'  // ← Add your key
  },
  virusTotal: {
    enabled: false,  // ← Change to true
    apiKey: 'YOUR_KEY_HERE'  // ← Add your key
  },
  phishTank: {
    enabled: true,   // ← Already enabled!
    apiKey: ''       // ← Optional key
  },
  urlScan: {
    enabled: false,  // ← Change to true
    apiKey: 'YOUR_URLSCAN_API_KEY_HERE'  // ← Add your key
  },
  gemini: {
    enabled: false,  // ← Change to true for AI
    apiKey: 'YOUR_GEMINI_API_KEY_HERE',  // ← Add your key
    model: 'gemini-pro'
  },
  openai: {
    enabled: false,  // ← Change to true for AI
    apiKey: 'YOUR_OPENAI_API_KEY_HERE',  // ← Add your key
    model: 'gpt-3.5-turbo'
  },
  useLocalPatterns: true,  // ← Keep enabled
  cacheResults: true,
  cacheDuration: 3600000
};
```

---

## ⚡ Quick Examples

### Enable PhishTank (Free, Already Done!):
```javascript
phishTank: {
  enabled: true,
  apiKey: ''
}
```

### Enable VirusTotal:
```javascript
virusTotal: {
  enabled: true,  // ← Change this
  apiKey: 'a5da0d26010e42839e818a5036199eda02fd8bd63c85a1163ab4b4026f63a18c'  // ← Your key
}
```

### Enable Google Safe Browsing:
```javascript
googleSafeBrowsing: {
  enabled: true,  // ← Change this
  apiKey: 'YOUR_ACTUAL_KEY_HERE'  // ← Paste your key
}
```

### Enable Gemini AI:
```javascript
gemini: {
  enabled: true,  // ← Change this
  apiKey: 'YOUR_GEMINI_KEY_HERE',  // ← Paste your key
  model: 'gemini-pro'
}
```

---

## 🔄 After Making Changes:

1. Save `background.js`
2. Go to `chrome://extensions/`
3. Click **Reload** on SentinelX Guardian
4. Done!

---

## 📚 Get API Keys:

- **Google Safe Browsing**: https://developers.google.com/safe-browsing/v4/get-started
- **VirusTotal**: https://www.virustotal.com/gui/join-us  
- **Gemini AI**: https://makersuite.google.com/app/apikey
- **OpenAI**: https://platform.openai.com/api-keys
- **URLScan.io**: https://urlscan.io/

---

**Note:** PhishTank is already enabled and works without an API key! 🎉
