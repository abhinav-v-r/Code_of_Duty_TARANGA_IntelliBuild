# 🤖 AI-Powered Phishing Detection Setup Guide

## Overview

SentinelX Guardian now supports **AI-powered phishing detection** using multiple industry-leading APIs!

### ✨ NEW AI Features:

1. **URL Reputation Checking** - Check URLs against known phishing databases
2. **AI Content Analysis** - Use Google Gemini or OpenAI to analyze page content
3. **Multi-Source Verification** - Combine results from multiple services
4. **Smart Caching** - Reduce API calls and improve performance
5. **Hybrid Approach** - AI + local patterns for best accuracy

---

## 🚀 Quick Start (No API Keys Required)

The extension works **immediately** with:
- ✅ **Local pattern matching** (default, no setup needed)
- ✅ **PhishTank** (free, no API key required for basic use)

---

## 🔑 API Setup (Optional but Recommended)

### Option 1: PhishTank (✅ Recommended - Free & Easy)

**Best for:** Real-time phishing URL database

1. Visit: https://www.phishtank.com/api_info.php
2. Sign up for free (optional - higher limits with API key)
3. Get your API key
4. Open `config.js` and update:
   ```javascript
   phishTank: {
     enabled: true,
     apiKey: 'YOUR_API_KEY_HERE'  // Optional
   }
   ```

**Free Tier:** Unlimited lookups (with optional API key for higher limits)

---

### Option 2: Google Safe Browsing (🔥 Highly Recommended)

**Best for:** Google's massive threat database

1. Go to: https://developers.google.com/safe-browsing/v4/get-started
2. Enable the Safe Browsing API in Google Cloud Console
3. Create credentials → API Key
4. Open `config.js` and update:
   ```javascript
   googleSafeBrowsing: {
     enabled: true,
     apiKey: 'YOUR_GOOGLE_API_KEY_HERE'
   }
   ```

**Free Tier:** 10,000 requests/day

---

### Option 3: VirusTotal (📊 Comprehensive)

**Best for:** Multi-vendor scanning

1. Visit: https://www.virustotal.com/gui/join-us
2. Sign up for free account
3. Go to your API key page
4. Open `config.js` and update:
   ```javascript
   virusTotal: {
     enabled: true,
     apiKey: 'YOUR_VIRUSTOTAL_API_KEY_HERE'
   }
   ```

**Free Tier:** 4 requests/minute, 500 requests/day

---

### Option 4: Google Gemini AI (🤖 AI-Powered Content Analysis)

**Best for:** Intelligent content analysis using AI

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Open `config.js` and update:
   ```javascript
   gemini: {
     enabled: true,
     apiKey: 'YOUR_GEMINI_API_KEY_HERE',
     model: 'gemini-pro'
   }
   ```

**Free Tier:** 60 requests/minute!

---

### Option 5: OpenAI (Alternative AI Analysis)

**Best for:** Alternative to Gemini for content analysis

1. Visit: https://platform.openai.com/api-keys
2. Sign up and add payment method (pay-as-you-go)
3. Create new API key
4. Open `config.js` and update:
   ```javascript
   openai: {
     enabled: true,
     apiKey: 'YOUR_OPENAI_API_KEY_HERE',
     model: 'gpt-3.5-turbo'
   }
   ```

**Pricing:** ~$0.002 per request (very cheap!)

---

### Option 6: URLScan.io (🔍 Deep URL Analysis)

**Best for:** Detailed URL scanning and screenshots

1. Visit: https://urlscan.io/
2. Sign up for free account
3. Get API key from settings
4. Open `config.js` and update:
   ```javascript
   urlScan: {
     enabled: true,
     apiKey: 'YOUR_URLSCAN_API_KEY_HERE'
   }
   ```

**Free Tier:** 10,000 scans/month

---

## 📝 Configuration

### Edit `config.js`:

```javascript
const API_CONFIG = {
  // Enable the services you want to use
  
  phishTank: {
    enabled: true,        // ← Set to true
    apiKey: 'your-key'    // ← Add your key
  },
  
  googleSafeBrowsing: {
    enabled: true,        // ← Set to true
    apiKey: 'your-key'    // ← Add your key
  },
  
  gemini: {
    enabled: true,        // ← Set to true for AI analysis
    apiKey: 'your-key',   // ← Add your key
    model: 'gemini-pro'
  },
  
  // Always keep this enabled as fallback
  useLocalPatterns: true,
  
  // Cache results to save API calls
  cacheResults: true,
  cacheDuration: 3600000  // 1 hour
};
```

---

## 🎯 Recommended Configurations

### For Maximum Accuracy (All APIs):
```javascript
phishTank: { enabled: true, apiKey: 'xxx' },
googleSafeBrowsing: { enabled: true, apiKey: 'xxx' },
virusTotal: { enabled: true, apiKey: 'xxx' },
gemini: { enabled: true, apiKey: 'xxx' },
useLocalPatterns: true
```

### For Free (No Cost):
```javascript
phishTank: { enabled: true, apiKey: '' },
gemini: { enabled: true, apiKey: 'free-tier-key' },
useLocalPatterns: true
```

### For Best Value:
```javascript
googleSafeBrowsing: { enabled: true, apiKey: 'xxx' },
gemini: { enabled: true, apiKey: 'xxx' },
useLocalPatterns: true
```

### For Privacy (No External Calls):
```javascript
useLocalPatterns: true  // Only this enabled
```

---

## 🧪 Testing with AI

### 1. Enable at least one API
```javascript
phishTank: { enabled: true, apiKey: '' }  // Free, no key needed
```

### 2. Reload extension
- Go to `chrome://extensions/`
- Click reload on SentinelX

### 3. Check background console
- Click "Service worker" under SentinelX
- Should see: "AI-powered features: {...}"

### 4. Visit test page
- Open your `test-phishing-page.html`
- Check background console for:
  ```
  Running AI detection...
  AI detection complete. Score: X
  ```

### 5. Check popup
- Click extension icon
- Should show "AI-Powered" indicator
- Lists which services detected threats

---

## 📊 How It Works

### Detection Flow:

1. **Content Script** collects page data (URL, text, forms)
2. **Background Script** receives data
3. **AI Detector** checks:
   - URL against PhishTank database
   - URL with Google Safe Browsing
   - URL with VirusTotal  
   - Content with Gemini/OpenAI AI
4. **Local Patterns** run as backup/supplement
5. **Results Combined** into final threat score
6. **User Notified** via popup and badge

### Example Flow:
```
Page Load
    ↓
Content Script Analyzes
    ↓
Sends to Background
    ↓
┌─────────────────┐
│ AI Detection    │
├─────────────────┤
│ PhishTank: ✓    │ ← URL in database! +80 score
│ Google SB: ✓    │ ← Confirmed threat! +90 score
│ Gemini AI: ✓    │ ← AI detected scam! +75 score
│ Local: ✓        │ ← Patterns match! +25 score
└─────────────────┘
    ↓
Total Score: 270 → CRITICAL
    ↓
Show Warning Banner
```

---

## ⚡ Performance

### Caching
- Results cached for 1 hour
- Saves API calls
- Faster repeat visits

### API Limits
- PhishTank: Unlimited (free)
- Google Safe Browsing: 10,000/day
- VirusTotal: 500/day
- Gemini: 60/minute
- OpenAI: Pay per use

### Smart Throttling
- Checks cache first
- Only calls enabled APIs
- Falls back to local patterns if APIs fail

---

## 🔒 Privacy & Security

### Data Sent to APIs:
- **URL only** (for URL reputation checks)
- **Text content** (only if AI content analysis enabled)
- **No personal data** collected or stored

### Local-Only Mode:
Disable all APIs and use:
```javascript
useLocalPatterns: true  // Only this
```

No data leaves your computer!

---

## 🐛 Troubleshooting

### "AI detection failed"
- Check API keys are correct
- Verify API is enabled in config.js
- Check API quota hasn't been exceeded

### "No AI results"
- All APIs disabled? Enable at least one
- Check internet connection
- View background console for errors

### Getting API Errors?
1. Verify API key is valid
2. Check API service status
3. Ensure enabled: true in config
4. Check API quota/limits

---

## 💡 Tips

### Free Tier Strategy:
1. Use **PhishTank** (free, unlimited)
2. Use **Google Safe Browsing** (10k/day - plenty!)
3. Use **Gemini AI** (60/min - generous!)
4. Keep **local patterns** enabled

### For Best Detection:
- Enable multiple services
- They complement each other
- More sources = higher accuracy

### Save API Calls:
- Keep caching enabled
- Set longer cache duration
- Only enable AI content analysis if needed

---

## 📈 Upgrade Path

### Level 1: Basic (No Setup)
```
✓ Local patterns only
```

### Level 2: Free APIs
```
✓ Local patterns
✓ PhishTank (free)
✓ Google Safe Browsing (free tier)
```

### Level 3: AI-Enhanced
```
✓ Local patterns
✓ PhishTank
✓ Google Safe Browsing
✓ Gemini AI (free tier)
```

### Level 4: Maximum Protection
```
✓ All services enabled
✓ Real-time AI analysis
✓ Multi-source verification
```

---

## ✅ Quick Setup Checklist

- [ ] Open `config.js`
- [ ] Enable desired APIs (set `enabled: true`)
- [ ] Add API keys
- [ ] Save file
- [ ] Reload extension
- [ ] Check background console
- [ ] Test on phishing page
- [ ] Verify AI detection working

---

## 🎓 Learning Resources

- **PhishTank API Docs**: https://www.phishtank.com/api_info.php
- **Google Safe Browsing**: https://developers.google.com/safe-browsing
- **VirusTotal API**: https://developers.virustotal.com/reference
- **Gemini API**: https://ai.google.dev/docs
- **OpenAI API**: https://platform.openai.com/docs

---

**Your extension is now ready for AI-powered threat detection!** 🤖🛡️

Start with the free options (PhishTank + Google Safe Browsing) and add more as needed!
