// SentinelX Guardian Pro - Advanced Background Service Worker
// Production-grade phishing protection with active blocking

console.log('🛡️ SentinelX Guardian Pro v3.0 - Initializing...');

// ===== CONFIGURATION =====
const CONFIG = {
    protectionMode: 'balanced', // strict, balanced, permissive
    autoBlock: true,
    showWarnings: true,
    collectStats: true,
    apis: {
        virusTotal: {
            enabled: true,
            apiKey: 'a5da0d26010e42839e818a5036199eda02fd8bd63c85a1163ab4b4026f63a18c'
        },
        phishTank: { enabled: true, apiKey: '' },
        googleSafeBrowsing: { enabled: false, apiKey: '' }
    }
};

// ===== LEGITIMATE DOMAINS (to prevent false positives) =====
const LEGITIMATE_DOMAINS = new Set([
    // Major Tech Companies
    'google.com', 'gmail.com', 'youtube.com', 'google.co.in',
    'microsoft.com', 'live.com', 'outlook.com', 'office.com', 'azure.com',
    'apple.com', 'icloud.com',
    'amazon.com', 'aws.amazon.com',
    'facebook.com', 'instagram.com', 'meta.com',
    'twitter.com', 'x.com',
    'linkedin.com',
    'github.com', 'gitlab.com',
    'stackoverflow.com',
    'reddit.com',
    'wikipedia.org', 'wikimedia.org',

    // Financial Services
    'paypal.com', 'paypal.me',
    'stripe.com',
    'square.com',
    'venmo.com',

    // E-commerce
    'ebay.com',
    'shopify.com',
    'etsy.com',
    'walmart.com',
    'target.com',

    // Cloud & Services
    'dropbox.com',
    'slack.com',
    'zoom.us',
    'discord.com',
    'teams.microsoft.com',

    // Indian Services
    'icicibank.com', 'hdfcbank.com', 'sbi.co.in', 'axisbank.com',
    'paytm.com', 'phonepe.com', 'googlepay.com',
    'irctc.co.in', 'uidai.gov.in',

    // Browsers & Extensions
    'mozilla.org', 'firefox.com',
    'brave.com',
    'opera.com',

    // Development
    'npmjs.com', 'nodejs.org',
    'reactjs.org',
    'python.org',

    // News & Media
    'bbc.com', 'cnn.com', 'nytimes.com',
    'medium.com',

    // Education
    'coursera.org', 'udemy.com', 'edx.org',

    // Government
    'gov.uk', 'gov.in', 'irs.gov',

    // Security Services
    'virustotal.com', 'phishtank.com'
]);

// ===== STATE MANAGEMENT =====
let threatDatabase = new Map();
let whitelist = new Set();
let blacklist = new Set();
let threatHistory = [];
let stats = {
    sitesScanned: 0,
    threatsBlocked: 0,
    threatsDetected: 0,
    lastUpdated: Date.now()
};

// ===== INITIALIZATION =====
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('Extension installed/updated:', details.reason);

    // Load saved data
    const data = await chrome.storage.local.get(['whitelist', 'blacklist', 'stats', 'config', 'threatHistory']);

    if (data.whitelist) whitelist = new Set(data.whitelist);
    if (data.blacklist) blacklist = new Set(data.blacklist);
    if (data.stats) stats = data.stats;
    if (data.config) Object.assign(CONFIG, data.config);
    if (data.threatHistory) threatHistory = data.threatHistory;

    console.log('✅ Data loaded. Whitelist:', whitelist.size, 'Blacklist:', blacklist.size);

    // Set up blocking rules
    await updateBlockingRules();
});

// ===== MESSAGE HANDLING =====
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Message received:', request.action);

    const handlers = {
        analyzePage: handleAnalyzePage,
        getAnalysis: handleGetAnalysis,
        blockSite: handleBlockSite,
        allowSite: handleAllowSite,
        getStats: handleGetStats,
        getThreatHistory: handleGetThreatHistory,
        clearHistory: handleClearHistory,
        exportData: handleExportData,
        updateConfig: handleUpdateConfig,
        closeCurrentTab: handleCloseCurrentTab,
        navigateToUrl: handleNavigateToUrl,
        allowSiteAndNavigate: handleAllowSiteAndNavigate
    };

    const handler = handlers[request.action];
    if (handler) {
        handler(request, sender).then(sendResponse).catch(err => {
            console.error('Handler error:', err);
            sendResponse({ error: err.message });
        });
        return true; // Keep channel open
    }
});

// ===== WEB NAVIGATION MONITORING =====
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (details.frameId !== 0) return; // Main frame only

    const url = details.url;
    stats.sitesScanned++;

    // Check blacklist
    if (isBlacklisted(url)) {
        console.log('🚫 Blacklisted URL detected:', url);
        await blockNavigation(details.tabId, url, 'blacklist');
        return;
    }

    // Skip whitelist
    if (isWhitelisted(url)) {
        console.log('✅ Whitelisted URL, skipping:', url);
        return;
    }

    // Quick threat check
    const quickCheck = await quickThreatCheck(url);
    if (quickCheck.shouldBlock) {
        console.log('⚠️ Threat detected on navigation:', url);
        stats.threatsBlocked++;
        await blockNavigation(details.tabId, url, quickCheck.reason);
    }
});

// ===== HANDLERS =====
async function handleAnalyzePage(request, sender) {
    const { url, text, forms, links } = request.data;
    const tabId = sender.tab?.id;

    // Comprehensive analysis
    const analysis = await performFullAnalysis(url, text, forms, links);

    // Store result
    if (tabId) {
        threatDatabase.set(tabId, analysis);
        updateBadge(tabId, analysis.threatLevel);
    }

    // Record in history
    if (analysis.threatLevel !== 'safe') {
        addToHistory({
            url,
            threatLevel: analysis.threatLevel,
            score: analysis.threatScore,
            timestamp: new Date(),
            blocked: false
        });
        stats.threatsDetected++;
    }

    await saveStats();
    return analysis;
}

async function handleGetAnalysis(request) {
    return threatDatabase.get(request.tabId) || null;
}

async function handleBlockSite(request) {
    const { url } = request;
    blacklist.add(getDomain(url));
    await saveList('blacklist', Array.from(blacklist));
    await updateBlockingRules();
    return { success: true };
}

async function handleAllowSite(request) {
    const { url } = request;
    const domain = getDomain(url);
    whitelist.add(domain);
    blacklist.delete(domain);
    await saveList('whitelist', Array.from(whitelist));
    await saveList('blacklist', Array.from(blacklist));
    await updateBlockingRules();
    return { success: true };
}

async function handleGetStats() {
    return stats;
}

async function handleGetThreatHistory() {
    return threatHistory.slice(0, 100); // Last 100
}

async function handleClearHistory() {
    threatHistory = [];
    await chrome.storage.local.set({ threatHistory: [] });
    return { success: true };
}

async function handleExportData() {
    return {
        whitelist: Array.from(whitelist),
        blacklist: Array.from(blacklist),
        stats,
        config: CONFIG,
        exportDate: new Date().toISOString()
    };
}

async function handleUpdateConfig(request) {
    Object.assign(CONFIG, request.config);
    await chrome.storage.local.set({ config: CONFIG });
    return { success: true };
}

// ===== BLOCKED PAGE HANDLERS =====
async function handleCloseCurrentTab(request, sender) {
    console.log('💬 handleCloseCurrentTab called');
    console.log('💬 Sender tab:', sender.tab);
    console.log('💬 Sender tab ID:', sender.tab?.id);

    try {
        let tabId = sender.tab?.id;

        // If no sender.tab, try to get current active tab
        if (!tabId) {
            console.log('⚠️ No sender.tab, querying active tab...');
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs && tabs.length > 0) {
                tabId = tabs[0].id;
                console.log('✅ Found active tab:', tabId);
            }
        }

        if (tabId) {
            console.log('🔄 Attempting to close tab:', tabId);
            await chrome.tabs.remove(tabId);
            console.log('✅ Tab closed successfully');
            return { success: true };
        } else {
            console.error('❌ No tab ID available');
            return { success: false, error: 'No tab ID available' };
        }
    } catch (error) {
        console.error('❌ Error closing tab:', error);
        return { success: false, error: error.message };
    }
}


async function handleNavigateToUrl(request, sender) {
    console.log('💬 handleNavigateToUrl called');
    console.log('💬 Target URL:', request.url);
    console.log('💬 Sender tab:', sender.tab);
    console.log('💬 Sender tab ID:', sender.tab?.id);

    try {
        let tabId = sender.tab?.id;

        // If no sender.tab, try to get current active tab
        if (!tabId) {
            console.log('⚠️ No sender.tab, querying active tab...');
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs && tabs.length > 0) {
                tabId = tabs[0].id;
                console.log('✅ Found active tab:', tabId);
            }
        }

        if (tabId) {
            console.log('🔄 Attempting to navigate tab', tabId, 'to:', request.url);
            await chrome.tabs.update(tabId, { url: request.url });
            console.log('✅ Navigation successful');
            return { success: true };
        } else {
            console.error('❌ No tab ID available');
            return { success: false, error: 'No tab ID available' };
        }
    } catch (error) {
        console.error('❌ Error navigating:', error);
        return { success: false, error: error.message };
    }
}


async function handleAllowSiteAndNavigate(request, sender) {
    console.log('💬 Whitelisting and navigating to:', request.url);

    try {
        // First, whitelist the site
        const domain = getDomain(request.url);
        whitelist.add(domain);
        blacklist.delete(domain);

        await saveList('whitelist', Array.from(whitelist));
        await saveList('blacklist', Array.from(blacklist));
        await updateBlockingRules();

        console.log('✅ Site whitelisted:', domain);

        // Then navigate to it
        if (sender.tab && sender.tab.id) {
            await chrome.tabs.update(sender.tab.id, { url: request.url });
            return { success: true };
        }

        return { success: true, noNavigation: true };
    } catch (error) {
        console.error('Error whitelisting/navigating:', error);
        return { success: false, error: error.message };
    }
}


// ===== THREAT ANALYSIS =====
async function performFullAnalysis(url, text, forms, links) {
    let score = 0;
    const threats = [];
    const sources = [];

    // 1. VirusTotal Check
    if (CONFIG.apis.virusTotal.enabled) {
        try {
            const vtResult = await checkVirusTotal(url);
            if (vtResult.malicious > 0) {
                score += Math.min(vtResult.malicious * 15, 80);
                threats.push({
                    type: 'VirusTotal Detection',
                    description: `${vtResult.malicious} security vendors flagged this URL`,
                    severity: 'critical'
                });
                sources.push('VirusTotal');
            }
        } catch (e) {
            console.warn('VirusTotal check failed:', e);
        }
    }

    // 2. PhishTank Check
    if (CONFIG.apis.phishTank.enabled) {
        try {
            const ptResult = await checkPhishTank(url);
            if (ptResult.isPhishing) {
                score += 85;
                threats.push({
                    type: 'Known Phishing Site',
                    description: 'URL found in PhishTank database',
                    severity: 'critical'
                });
                sources.push('PhishTank');
            }
        } catch (e) {
            console.warn('PhishTank check failed:', e);
        }
    }

    // 3. Local Pattern Analysis
    const localAnalysis = analyzeWithPatterns(url, text, forms, links);
    score += localAnalysis.score;
    threats.push(...localAnalysis.threats);
    sources.push('Pattern Matching');

    // Determine threat level (adjusted thresholds to reduce false positives)
    let threatLevel = 'safe';
    if (score >= 80) threatLevel = 'critical';      // Was 70
    else if (score >= 60) threatLevel = 'high';     // Was 50
    else if (score >= 40) threatLevel = 'medium';   // Was 30
    else if (score >= 20) threatLevel = 'low';      // Was 10

    return {
        threatLevel,
        threatScore: Math.min(score, 100),
        threats,
        sources,
        timestamp: new Date().toISOString(),
        url
    };
}

async function quickThreatCheck(url) {
    // Quick check for immediate blocking
    const domain = getDomain(url).replace(/^www\./, '');

    // Skip legitimate domains entirely
    if (isKnownLegitimateDomain(url)) {
        return { shouldBlock: false };
    }

    // Check blacklist
    if (blacklist.has(domain)) {
        return { shouldBlock: true, reason: 'Blacklisted domain' };
    }

    // Check only highly suspicious patterns (very specific)
    const criticalPatterns = [
        /paypal-verify.*secure/i,
        /amazon-account.*suspended/i,
        /apple-id.*locked.*verify/i,
        /microsoft.*verify.*account.*\d+/i,
        /secure.*login.*\d{5,}/i,
        /\d+\.\d+\.\d+\.\d+/, // IP address
        /.*-verify-.*-payment-.*-urgent/i
    ];

    for (const pattern of criticalPatterns) {
        if (pattern.test(url)) {
            return { shouldBlock: CONFIG.autoBlock, reason: 'Highly suspicious URL pattern' };
        }
    }

    return { shouldBlock: false };
}

function analyzeWithPatterns(url, text, forms, links) {
    const threats = [];
    let score = 0;

    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace(/^www\./, '');

        // 🔥 CHECK #1: Is this a known legitimate domain?
        const isLegitimate = isKnownLegitimateDomain(domain);

        if (isLegitimate) {
            console.log('✅ Known legitimate domain:', domain);
            // Significantly reduce score for legitimate domains
            // Even if they have keywords, they're likely legitimate
            score -= 50; // Start with negative score for legit domains
        }

        // 🔍 CHECK #2: Suspicious domain patterns (only flag if combined with domain issues)
        const suspiciousDomainPatterns = [
            /paypal-verify/i,
            /amazon-secure/i,
            /apple-id-locked/i,
            /microsoft-support-/i,
            /bank-.*-verify/i,
            /-verify-.*-secure/i,
            /secure-.*-login-.*\d+/i
        ];

        let hasSuspiciousDomain = false;
        for (const pattern of suspiciousDomainPatterns) {
            if (pattern.test(domain)) {
                threats.push({
                    type: 'Suspicious Domain Name',
                    description: `Domain contains phishing pattern: ${domain}`,
                    severity: 'high'
                });
                score += 40;
                hasSuspiciousDomain = true;
                break;
            }
        }

        // 🔍 CHECK #3: Brand impersonation (domain trying to look like a brand)
        if (!isLegitimate) {
            const brandImpersonation = [
                { pattern: /paypal/i, real: 'paypal.com' },
                { pattern: /amazon/i, real: 'amazon.com' },
                { pattern: /apple/i, real: 'apple.com' },
                { pattern: /microsoft/i, real: 'microsoft.com' },
                { pattern: /google/i, real: 'google.com' },
                { pattern: /facebook/i, real: 'facebook.com' },
                { pattern: /instagram/i, real: 'instagram.com' }
            ];

            for (const brand of brandImpersonation) {
                if (brand.pattern.test(domain) && !domain.includes(brand.real)) {
                    threats.push({
                        type: 'Brand Impersonation',
                        description: `Domain appears to impersonate ${brand.real}`,
                        severity: 'critical'
                    });
                    score += 35;
                    break;
                }
            }
        }

        // 🔍 CHECK #4: IP address in URL (very suspicious)
        if (/\d+\.\d+\.\d+\.\d+/.test(domain)) {
            threats.push({
                type: 'IP Address URL',
                description: 'Using IP address instead of domain name',
                severity: 'high'
            });
            score += 25;
        }

        // 🔍 CHECK #5: Non-HTTPS (only flag if not a local/file URL)
        if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'file:' && urlObj.protocol !== 'chrome-extension:') {
            // Only add score if combined with other issues
            if (hasSuspiciousDomain || score > 10) {
                threats.push({
                    type: 'Insecure Connection',
                    description: 'Not using HTTPS encryption',
                    severity: 'low'
                });
                score += 10;
            }
        }
    } catch (e) {
        // Invalid URL
        score += 15;
    }

    // 🔍 CHECK #6: Content analysis (smarter keyword detection)
    if (!isKnownLegitimateDomain(getDomain(url))) {
        const lowerText = text.toLowerCase();

        // High-confidence phishing phrases (rarely used legitimately)
        const criticalPhishingPhrases = [
            'verify your account immediately',
            'account will be suspended',
            'confirm your identity now',
            'unusual activity detected on your account',
            'your account has been locked',
            'click here to verify within 24 hours',
            'confirm your payment information immediately',
            'urgent: verify your identity'
        ];

        let criticalMatches = 0;
        for (const phrase of criticalPhishingPhrases) {
            if (lowerText.includes(phrase)) {
                criticalMatches++;
            }
        }

        if (criticalMatches > 0) {
            threats.push({
                type: 'Critical Phishing Language',
                description: `Found ${criticalMatches} high-confidence phishing phrase(s)`,
                severity: 'critical'
            });
            score += criticalMatches * 20;
        }

        // Medium-confidence phrases (only flag if multiple detected)
        const mediumPhishingPhrases = [
            'verify your account',
            'update your payment',
            'confirm your information',
            'unusual activity',
            'suspended account'
        ];

        let mediumMatches = 0;
        for (const phrase of mediumPhishingPhrases) {
            if (lowerText.includes(phrase)) {
                mediumMatches++;
            }
        }

        // Only add score if multiple keywords present
        if (mediumMatches >= 3) {
            threats.push({
                type: 'Multiple Phishing Keywords',
                description: `Detected ${mediumMatches} suspicious phrases`,
                severity: 'medium'
            });
            score += mediumMatches * 8;
        }

        // Context-aware urgency detection
        const urgencyWords = ['urgent', 'immediately', 'within 24 hours', 'act now', 'limited time'];
        const accountWords = ['account', 'password', 'login', 'verify', 'confirm'];

        let hasUrgency = urgencyWords.some(word => lowerText.includes(word));
        let hasAccountRequest = accountWords.filter(word => lowerText.includes(word)).length >= 2;

        // Only flag if BOTH urgency AND account-related content
        if (hasUrgency && hasAccountRequest && mediumMatches > 0) {
            threats.push({
                type: 'Urgency + Account Request',
                description: 'Combines urgency with account-related requests',
                severity: 'high'
            });
            score += 15;
        }
    }

    // 🔍 CHECK #7: Excessive forms (only flag if suspicious)
    if (forms > 5 && score > 20) {
        threats.push({
            type: 'Excessive Data Collection',
            description: `Page contains ${forms} forms`,
            severity: 'low'
        });
        score += 5;
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    return { threats, score };
}

// Helper function to check if domain is legitimate
function isKnownLegitimateDomain(url) {
    try {
        const domain = getDomain(url).replace(/^www\./, '');

        // Check exact match
        if (LEGITIMATE_DOMAINS.has(domain)) {
            return true;
        }

        // Check if subdomain of legitimate domain
        for (const legitDomain of LEGITIMATE_DOMAINS) {
            if (domain.endsWith('.' + legitDomain) || domain === legitDomain) {
                return true;
            }
        }

        return false;
    } catch {
        return false;
    }
}

// ===== API CHECKS =====
async function checkVirusTotal(url) {
    const apiKey = CONFIG.apis.virusTotal.apiKey;
    const urlId = btoa(url).replace(/=/g, '');

    const response = await fetch(
        `https://www.virustotal.com/api/v3/urls/${urlId}`,
        { headers: { 'x-apikey': apiKey } }
    );

    if (response.ok) {
        const data = await response.json();
        const stats = data.data?.attributes?.last_analysis_stats || {};
        return {
            malicious: stats.malicious || 0,
            suspicious: stats.suspicious || 0
        };
    }

    return { malicious: 0, suspicious: 0 };
}

async function checkPhishTank(url) {
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`https://checkurl.phishtank.com/checkurl/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `url=${encodedUrl}&format=json`
    });

    if (response.ok) {
        const data = await response.json();
        return { isPhishing: data.results?.in_database === true };
    }

    return { isPhishing: false };
}

// ===== BLOCKING =====
async function blockNavigation(tabId, url, reason) {
    console.log(`🚫 Blocking navigation to: ${url} (${reason})`);

    // Redirect to blocked page
    const blockedUrl = chrome.runtime.getURL(`blocked.html?url=${encodeURIComponent(url)}&reason=${encodeURIComponent(reason)}`);
    await chrome.tabs.update(tabId, { url: blockedUrl });

    // Record in history
    addToHistory({
        url,
        threatLevel: 'critical',
        score: 100,
        timestamp: new Date(),
        blocked: true,
        reason
    });

    stats.threatsBlocked++;
    await saveStats();
}

async function updateBlockingRules() {
    // Create dynamic rules from blacklist
    const rules = Array.from(blacklist).map((domain, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: 'block' },
        condition: {
            urlFilter: `*://${domain}/*`,
            resourceTypes: ['main_frame']
        }
    }));

    // Update rules
    try {
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const ruleIds = existingRules.map(r => r.id);

        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIds,
            addRules: rules
        });

        console.log(`✅ Updated ${rules.length} blocking rules`);
    } catch (e) {
        console.error('Failed to update blocking rules:', e);
    }
}

// ===== UTILITIES =====
function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
}

function isWhitelisted(url) {
    const domain = getDomain(url);
    return whitelist.has(domain) || url.startsWith('chrome://') ||
        url.startsWith('chrome-extension://') || url.startsWith('about:');
}

function isBlacklisted(url) {
    const domain = getDomain(url);
    return blacklist.has(domain);
}

function addToHistory(entry) {
    threatHistory.unshift(entry);
    if (threatHistory.length > 500) threatHistory = threatHistory.slice(0, 500);
    saveThreatHistory();
}

function updateBadge(tabId, threatLevel) {
    const colors = {
        safe: '#10b981',
        low: '#3b82f6',
        medium: '#f59e0b',
        high: '#ef4444',
        critical: '#991b1b'
    };

    const texts = {
        safe: '',
        low: '!',
        medium: '⚠',
        high: '⚠⚠',
        critical: '🚫'
    };

    chrome.action.setBadgeBackgroundColor({ color: colors[threatLevel], tabId });
    chrome.action.setBadgeText({ text: texts[threatLevel], tabId });
}

// ===== STORAGE =====
async function saveList(key, data) {
    await chrome.storage.local.set({ [key]: data });
}

async function saveStats() {
    stats.lastUpdated = Date.now();
    await chrome.storage.local.set({ stats });
}

async function saveThreatHistory() {
    await chrome.storage.local.set({ threatHistory: threatHistory.slice(0, 500) });
}

// Tab cleanup
chrome.tabs.onRemoved.addListener((tabId) => {
    threatDatabase.delete(tabId);
});

console.log('✅ SentinelX Guardian Pro - Ready!');