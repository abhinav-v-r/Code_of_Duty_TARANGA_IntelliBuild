// SentinelX Guardian - API Configuration
// Add your API keys here

const API_CONFIG = {
    // Google Safe Browsing API (Free tier: 10,000 requests/day)
    // Get your key: https://developers.google.com/safe-browsing/v4/get-started
    googleSafeBrowsing: {
        enabled: false,
        apiKey: 'YOUR_GOOGLE_SAFE_BROWSING_API_KEY_HERE'
    },

    // VirusTotal API (Free tier: 4 requests/minute)
    // Get your key: https://www.virustotal.com/gui/join-us
    virusTotal: {
        enabled: false,
        apiKey: 'a5da0d26010e42839e818a5036199eda02fd8bd63c85a1163ab4b4026f63a18c'
    },

    // PhishTank API (Free, no key required for lookups)
    // Info: https://www.phishtank.com/api_info.php
    phishTank: {
        enabled: true,
        apiKey: '' // Optional, but recommended for higher limits
    },

    // URLScan.io (Free tier: 10,000 requests/month)
    // Get your key: https://urlscan.io/
    urlScan: {
        enabled: false,
        apiKey: 'YOUR_URLSCAN_API_KEY_HERE'
    },

    // Google Gemini API for AI content analysis
    // Get your key: https://makersuite.google.com/app/apikey
    gemini: {
        enabled: false,
        apiKey: 'YOUR_GEMINI_API_KEY_HERE',
        model: 'gemini-pro'
    },

    // OpenAI API for AI content analysis (Alternative to Gemini)
    // Get your key: https://platform.openai.com/api-keys
    openai: {
        enabled: false,
        apiKey: 'YOUR_OPENAI_API_KEY_HERE',
        model: 'gpt-3.5-turbo'
    },

    // Use local pattern matching as fallback
    useLocalPatterns: true,

    // Cache results to save API calls
    cacheResults: true,
    cacheDuration: 3600000 // 1 hour in milliseconds
};

// Export for use in background script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
