// SentinelX Guardian - AI-Powered Phishing Detection
// Multiple API integrations for comprehensive threat detection

class AIPhishingDetector {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
    }

    // Main detection method - uses all available APIs
    async detectPhishing(url, content) {
        console.log('AI Detection starting for:', url);

        const results = {
            url: url,
            urlThreats: [],
            contentThreats: [],
            aiScore: 0,
            isPhishing: false,
            source: []
        };

        // 1. Check URL reputation with multiple services
        const urlChecks = await this.checkURLReputation(url);
        results.urlThreats = urlChecks.threats;
        results.aiScore += urlChecks.score;
        results.source.push(...urlChecks.sources);

        // 2. Analyze content with AI
        if (content && content.length > 50) {
            const contentAnalysis = await this.analyzeContentWithAI(content, url);
            results.contentThreats = contentAnalysis.threats;
            results.aiScore += contentAnalysis.score;
            results.source.push(...contentAnalysis.sources);
        }

        // 3. Determine if it's phishing
        results.isPhishing = results.aiScore > 50;

        console.log('AI Detection complete:', results);
        return results;
    }

    // Check URL reputation across multiple services
    async checkURLReputation(url) {
        const threats = [];
        let score = 0;
        const sources = [];

        // Check cache first
        const cacheKey = `url:${url}`;
        if (this.config.cacheResults && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheDuration) {
                console.log('Using cached URL result for:', url);
                return cached.data;
            }
        }

        try {
            // PhishTank check (free, no key required)
            if (this.config.phishTank.enabled) {
                const phishTankResult = await this.checkPhishTank(url);
                if (phishTankResult.isPhishing) {
                    threats.push({
                        type: 'Known Phishing Site',
                        description: 'URL found in PhishTank database',
                        severity: 'critical'
                    });
                    score += 80;
                    sources.push('PhishTank');
                }
            }

            // Google Safe Browsing
            if (this.config.googleSafeBrowsing.enabled && this.config.googleSafeBrowsing.apiKey) {
                const gsbResult = await this.checkGoogleSafeBrowsing(url);
                if (gsbResult.isThreat) {
                    threats.push({
                        type: 'Google Safe Browsing Alert',
                        description: gsbResult.threatType,
                        severity: 'critical'
                    });
                    score += 90;
                    sources.push('Google Safe Browsing');
                }
            }

            // VirusTotal
            if (this.config.virusTotal.enabled && this.config.virusTotal.apiKey) {
                const vtResult = await this.checkVirusTotal(url);
                if (vtResult.maliciousCount > 0) {
                    threats.push({
                        type: 'VirusTotal Detection',
                        description: `${vtResult.maliciousCount} vendors flagged this URL`,
                        severity: vtResult.maliciousCount > 5 ? 'critical' : 'high'
                    });
                    score += Math.min(vtResult.maliciousCount * 10, 80);
                    sources.push('VirusTotal');
                }
            }

            // URLScan.io
            if (this.config.urlScan.enabled && this.config.urlScan.apiKey) {
                const urlScanResult = await this.checkURLScan(url);
                if (urlScanResult.isMalicious) {
                    threats.push({
                        type: 'URLScan Detection',
                        description: urlScanResult.verdict,
                        severity: 'high'
                    });
                    score += 70;
                    sources.push('URLScan.io');
                }
            }

        } catch (error) {
            console.error('URL reputation check error:', error);
        }

        const result = { threats, score, sources };

        // Cache the result
        if (this.config.cacheResults) {
            this.cache.set(cacheKey, {
                data: result,
                timestamp: Date.now()
            });
        }

        return result;
    }

    // Analyze content with AI
    async analyzeContentWithAI(content, url) {
        const threats = [];
        let score = 0;
        const sources = [];

        try {
            // Use Gemini API
            if (this.config.gemini.enabled && this.config.gemini.apiKey) {
                const geminiResult = await this.analyzeWithGemini(content, url);
                if (geminiResult.isPhishing) {
                    threats.push(...geminiResult.threats);
                    score += geminiResult.score;
                    sources.push('Google Gemini AI');
                }
            }

            // Use OpenAI API (fallback or alternative)
            else if (this.config.openai.enabled && this.config.openai.apiKey) {
                const openaiResult = await this.analyzeWithOpenAI(content, url);
                if (openaiResult.isPhishing) {
                    threats.push(...openaiResult.threats);
                    score += openaiResult.score;
                    sources.push('OpenAI');
                }
            }

        } catch (error) {
            console.error('AI content analysis error:', error);
        }

        return { threats, score, sources };
    }

    // PhishTank API check
    async checkPhishTank(url) {
        try {
            // PhishTank requires POST request with encoded URL
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`https://checkurl.phishtank.com/checkurl/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `url=${encodedUrl}&format=json&app_key=${this.config.phishTank.apiKey || ''}`
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    isPhishing: data.results?.in_database === true,
                    verified: data.results?.verified === true
                };
            }
        } catch (error) {
            console.error('PhishTank check failed:', error);
        }

        return { isPhishing: false };
    }

    // Google Safe Browsing API check
    async checkGoogleSafeBrowsing(url) {
        try {
            const apiKey = this.config.googleSafeBrowsing.apiKey;
            const response = await fetch(
                `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client: {
                            clientId: 'sentinelx-guardian',
                            clientVersion: '1.0.0'
                        },
                        threatInfo: {
                            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
                            platformTypes: ['ANY_PLATFORM'],
                            threatEntryTypes: ['URL'],
                            threatEntries: [{ url: url }]
                        }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                return {
                    isThreat: data.matches && data.matches.length > 0,
                    threatType: data.matches?.[0]?.threatType || 'Unknown'
                };
            }
        } catch (error) {
            console.error('Google Safe Browsing check failed:', error);
        }

        return { isThreat: false };
    }

    // VirusTotal API check
    async checkVirusTotal(url) {
        try {
            const apiKey = this.config.virusTotal.apiKey;

            // First, submit URL for scanning
            const urlId = btoa(url).replace(/=/g, '');

            // Get analysis results
            const response = await fetch(
                `https://www.virustotal.com/api/v3/urls/${urlId}`,
                {
                    headers: { 'x-apikey': apiKey }
                }
            );

            if (response.ok) {
                const data = await response.json();
                const stats = data.data?.attributes?.last_analysis_stats || {};

                return {
                    maliciousCount: stats.malicious || 0,
                    suspiciousCount: stats.suspicious || 0,
                    totalEngines: stats.malicious + stats.suspicious + stats.harmless + stats.undetected
                };
            }
        } catch (error) {
            console.error('VirusTotal check failed:', error);
        }

        return { maliciousCount: 0 };
    }

    // URLScan.io check
    async checkURLScan(url) {
        try {
            const apiKey = this.config.urlScan.apiKey;

            // Submit URL for scanning
            const submitResponse = await fetch('https://urlscan.io/api/v1/scan/', {
                method: 'POST',
                headers: {
                    'API-Key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: url, visibility: 'private' })
            });

            if (submitResponse.ok) {
                const submitData = await submitResponse.json();
                const resultId = submitData.uuid;

                // Wait a bit for scan to complete
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Get results
                const resultResponse = await fetch(
                    `https://urlscan.io/api/v1/result/${resultId}/`
                );

                if (resultResponse.ok) {
                    const resultData = await resultResponse.json();
                    const verdict = resultData.verdicts?.overall;

                    return {
                        isMalicious: verdict?.malicious === true,
                        verdict: verdict?.score > 50 ? 'Suspicious' : 'Safe'
                    };
                }
            }
        } catch (error) {
            console.error('URLScan check failed:', error);
        }

        return { isMalicious: false };
    }

    // Analyze with Google Gemini AI
    async analyzeWithGemini(content, url) {
        try {
            const apiKey = this.config.gemini.apiKey;
            const prompt = `Analyze this web page content for phishing indicators:
URL: ${url}
Content: ${content.substring(0, 2000)}

Determine if this is a phishing attempt. Look for:
- Urgency language and pressure tactics
- Requests for sensitive information
- Suspicious URLs or brand impersonation
- Threatening language about account suspension
- Promises of prizes or money

Respond in JSON format:
{
  "isPhishing": true/false,
  "confidence": 0-100,
  "threats": ["list of specific threats found"],
  "reasoning": "brief explanation"
}`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${this.config.gemini.model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

                // Extract JSON from response
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const analysis = JSON.parse(jsonMatch[0]);

                    return {
                        isPhishing: analysis.isPhishing,
                        score: analysis.confidence || 0,
                        threats: (analysis.threats || []).map(t => ({
                            type: 'AI Detection',
                            description: t,
                            severity: analysis.confidence > 70 ? 'high' : 'medium'
                        }))
                    };
                }
            }
        } catch (error) {
            console.error('Gemini analysis failed:', error);
        }

        return { isPhishing: false, score: 0, threats: [] };
    }

    // Analyze with OpenAI
    async analyzeWithOpenAI(content, url) {
        try {
            const apiKey = this.config.openai.apiKey;
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.config.openai.model,
                    messages: [{
                        role: 'user',
                        content: `Analyze if this webpage is a phishing attempt. URL: ${url}. Content: ${content.substring(0, 2000)}. Respond with JSON: {"isPhishing": true/false, "confidence": 0-100, "threats": ["list"]}`
                    }],
                    response_format: { type: 'json_object' }
                })
            });

            if (response.ok) {
                const data = await response.json();
                const analysis = JSON.parse(data.choices[0].message.content);

                return {
                    isPhishing: analysis.isPhishing,
                    score: analysis.confidence || 0,
                    threats: (analysis.threats || []).map(t => ({
                        type: 'AI Detection',
                        description: t,
                        severity: analysis.confidence > 70 ? 'high' : 'medium'
                    }))
                };
            }
        } catch (error) {
            console.error('OpenAI analysis failed:', error);
        }

        return { isPhishing: false, score: 0, threats: [] };
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('AI detector cache cleared');
    }
}

// Export for use in background script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIPhishingDetector;
}
