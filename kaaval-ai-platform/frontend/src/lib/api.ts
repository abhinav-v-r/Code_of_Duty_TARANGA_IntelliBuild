import axios, { AxiosInstance, AxiosError } from 'axios'
import type {
    ScamAnalysisRequest,
    ScamAnalysisResponse,
    UserReport,
    PlatformStats,
    ApiResponse
} from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Add auth token if available
                const token = typeof window !== 'undefined'
                    ? localStorage.getItem('auth_token')
                    : null

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }

                return config
            },
            (error) => Promise.reject(error)
        )

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                // Handle errors globally
                if (error.response?.status === 401) {
                    // Handle unauthorized
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token')
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    /**
     * Analyze content for scam indicators
     */
    async analyzeScam(request: ScamAnalysisRequest): Promise<ApiResponse<ScamAnalysisResponse>> {
        try {
            const response = await this.client.post<ApiResponse<ScamAnalysisResponse>>(
                '/api/analyze',
                request
            )
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    /**
     * Analyze URL for suspicious patterns
     */
    async analyzeUrl(url: string): Promise<ApiResponse<ScamAnalysisResponse>> {
        try {
            const response = await this.client.post<ApiResponse<ScamAnalysisResponse>>(
                '/api/analyze-url',
                { url }
            )
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    /**
     * Submit a scam report
     */
    async submitReport(report: Omit<UserReport, 'id' | 'submittedAt' | 'updatedAt' | 'status'>): Promise<ApiResponse<UserReport>> {
        try {
            const response = await this.client.post<ApiResponse<UserReport>>(
                '/api/reports',
                report
            )
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    /**
     * Get platform statistics
     */
    async getStats(): Promise<ApiResponse<PlatformStats>> {
        try {
            const response = await this.client.get<ApiResponse<PlatformStats>>('/api/stats')
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    /**
     * Get educational content
     */
    async getEducationalContent(category?: string): Promise<ApiResponse<any>> {
        try {
            const params = category ? { category } : {}
            const response = await this.client.get('/api/education', { params })
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    /**
     * Error handler
     */
    private handleError(error: any): ApiResponse<any> {
        const axiosError = error as AxiosError<ApiResponse<any>>

        if (axiosError.response?.data) {
            return axiosError.response.data
        }

        return {
            success: false,
            error: {
                code: 'NETWORK_ERROR',
                message: axiosError.message || 'An unexpected error occurred',
            },
            timestamp: new Date().toISOString(),
        }
    }
}

export const apiClient = new ApiClient()

/**
 * Intelligent Scam Analyzer - Real pattern-based detection
 */
export const mockApi = {
    async analyzeScam(request: ScamAnalysisRequest): Promise<ApiResponse<ScamAnalysisResponse>> {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1200))

        const content = request.content.toLowerCase()
        const originalContent = request.content
        const isUrl = request.type === 'url'

        // ===== SCAM INDICATORS DATABASE =====
        const indicators: Array<{
            type: string
            description: string
            severity: 'low' | 'medium' | 'high'
            confidence: number
        }> = []

        const patterns: Array<{
            pattern: string
            category: string
            severity: 'high' | 'medium' | 'low'
            description: string
        }> = []

        let riskScore = 0
        const recommendations: string[] = []

        // ===== URL ANALYSIS =====
        if (isUrl || content.includes('http://') || content.includes('https://') || content.includes('www.')) {
            // Extract URLs from content
            const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi
            const urls = content.match(urlRegex) || (isUrl ? [content] : [])

            for (const url of urls) {
                const lowerUrl = url.toLowerCase()

                // Check for IP address URLs (very suspicious)
                if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
                    indicators.push({
                        type: 'ip_address_url',
                        description: 'URL uses IP address instead of domain name - highly suspicious',
                        severity: 'high',
                        confidence: 0.95
                    })
                    riskScore += 35
                }

                // Check for URL shorteners
                const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly', 'short.link', 'cutt.ly']
                if (shorteners.some(s => lowerUrl.includes(s))) {
                    indicators.push({
                        type: 'url_shortener',
                        description: 'Uses URL shortener to hide actual destination',
                        severity: 'medium',
                        confidence: 0.8
                    })
                    riskScore += 20
                }

                // Check for suspicious TLDs
                const suspiciousTlds = ['.xyz', '.top', '.club', '.online', '.site', '.icu', '.buzz', '.tk', '.ml', '.ga', '.cf', '.gq']
                if (suspiciousTlds.some(tld => lowerUrl.includes(tld))) {
                    indicators.push({
                        type: 'suspicious_tld',
                        description: 'Uses suspicious top-level domain often associated with scams',
                        severity: 'high',
                        confidence: 0.85
                    })
                    riskScore += 25
                }

                // Check for brand impersonation in URLs
                const brands = ['paypal', 'amazon', 'google', 'microsoft', 'apple', 'netflix', 'facebook', 'instagram', 'whatsapp', 'sbi', 'hdfc', 'icici', 'axis', 'paytm', 'phonepe', 'gpay']
                const officialDomains = ['paypal.com', 'amazon.com', 'amazon.in', 'google.com', 'microsoft.com', 'apple.com', 'netflix.com', 'facebook.com', 'instagram.com', 'whatsapp.com', 'onlinesbi.com', 'hdfcbank.com', 'icicibank.com', 'axisbank.com', 'paytm.com', 'phonepe.com']

                for (const brand of brands) {
                    if (lowerUrl.includes(brand) && !officialDomains.some(d => lowerUrl.includes(d))) {
                        indicators.push({
                            type: 'brand_impersonation',
                            description: `Potential impersonation of ${brand.charAt(0).toUpperCase() + brand.slice(1)} - domain is not official`,
                            severity: 'high',
                            confidence: 0.9
                        })
                        patterns.push({
                            pattern: 'brand_spoofing',
                            category: 'Phishing',
                            severity: 'high',
                            description: `Fake ${brand.charAt(0).toUpperCase() + brand.slice(1)} website attempting to steal credentials`
                        })
                        riskScore += 40
                        break
                    }
                }

                // Check for misspelled domains (typosquatting)
                const typos = ['paypa1', 'amaz0n', 'g00gle', 'mircosoft', 'faceb00k', 'netf1ix', 'watsapp', 'instagran']
                if (typos.some(t => lowerUrl.includes(t))) {
                    indicators.push({
                        type: 'typosquatting',
                        description: 'URL contains misspelled brand name (typosquatting attack)',
                        severity: 'high',
                        confidence: 0.95
                    })
                    riskScore += 45
                }

                // Check for excessive subdomains
                const subdomainCount = (url.match(/\./g) || []).length
                if (subdomainCount > 4) {
                    indicators.push({
                        type: 'excessive_subdomains',
                        description: 'URL has excessive subdomains - common hiding technique',
                        severity: 'medium',
                        confidence: 0.75
                    })
                    riskScore += 15
                }

                // Check for suspicious keywords in URL
                const urlKeywords = ['login', 'verify', 'secure', 'update', 'confirm', 'account', 'suspend', 'unlock', 'alert', 'urgent']
                const foundUrlKeywords = urlKeywords.filter(k => lowerUrl.includes(k))
                if (foundUrlKeywords.length >= 2) {
                    indicators.push({
                        type: 'suspicious_url_keywords',
                        description: `URL contains suspicious keywords: ${foundUrlKeywords.join(', ')}`,
                        severity: 'medium',
                        confidence: 0.7
                    })
                    riskScore += 15
                }
            }
        }

        // ===== TEXT/EMAIL CONTENT ANALYSIS =====

        // Check for urgency language
        const urgencyPhrases = [
            'act now', 'immediate action', 'urgent', 'immediately', 'right away', 'hurry',
            'limited time', 'expires today', 'last chance', 'dont delay', "don't delay",
            'within 24 hours', 'within 48 hours', 'account suspended', 'account blocked',
            'verify immediately', 'action required', 'respond now', 'act fast'
        ]
        const foundUrgency = urgencyPhrases.filter(phrase => content.includes(phrase))
        if (foundUrgency.length > 0) {
            indicators.push({
                type: 'urgency_language',
                description: `Uses urgent/pressuring language: "${foundUrgency[0]}"`,
                severity: 'high',
                confidence: 0.85
            })
            riskScore += 20 + (foundUrgency.length * 5)
            patterns.push({
                pattern: 'social_engineering',
                category: 'Psychological Manipulation',
                severity: 'high',
                description: 'Creates false sense of urgency to pressure quick action'
            })
        }

        // Check for threat language
        const threatPhrases = [
            'account will be closed', 'account will be suspended', 'legal action',
            'police complaint', 'arrest', 'fine', 'penalty', 'blocked permanently',
            'lose access', 'terminated', 'legal consequences', 'court', 'lawsuit'
        ]
        const foundThreats = threatPhrases.filter(phrase => content.includes(phrase))
        if (foundThreats.length > 0) {
            indicators.push({
                type: 'threat_language',
                description: `Contains threatening language to create fear`,
                severity: 'high',
                confidence: 0.9
            })
            riskScore += 25
        }

        // Check for money/prize scams
        const prizeKeywords = [
            'you have won', 'congratulations you', 'lucky winner', 'selected for',
            'claim your prize', 'lottery', 'jackpot', 'million dollars', 'crore',
            'lakh rupees', 'gift card', 'free gift', 'cash prize', 'won a prize'
        ]
        const foundPrize = prizeKeywords.filter(phrase => content.includes(phrase))
        if (foundPrize.length > 0) {
            indicators.push({
                type: 'prize_scam',
                description: 'Claims you won a prize or lottery - classic scam tactic',
                severity: 'high',
                confidence: 0.95
            })
            patterns.push({
                pattern: 'lottery_scam',
                category: 'Prize/Lottery Scam',
                severity: 'high',
                description: 'Fake prize notification attempting to steal money or information'
            })
            riskScore += 40
        }

        // Check for personal info requests
        const infoRequests = [
            'enter your password', 'verify your password', 'confirm password',
            'credit card', 'debit card', 'card number', 'cvv', 'pin number',
            'bank account', 'account number', 'social security', 'ssn',
            'aadhaar', 'pan card', 'otp', 'one time password', 'verification code',
            'date of birth', 'mother maiden'
        ]
        const foundInfoRequests = infoRequests.filter(phrase => content.includes(phrase))
        if (foundInfoRequests.length > 0) {
            indicators.push({
                type: 'personal_info_request',
                description: `Requests sensitive information: ${foundInfoRequests.slice(0, 2).join(', ')}`,
                severity: 'high',
                confidence: 0.9
            })
            patterns.push({
                pattern: 'credential_theft',
                category: 'Phishing',
                severity: 'high',
                description: 'Attempting to steal personal or financial information'
            })
            riskScore += 35
        }

        // Check for KYC scam indicators (common in India)
        const kycKeywords = ['kyc', 'know your customer', 'kyc update', 'kyc verification', 'pan link', 'aadhaar link']
        const foundKyc = kycKeywords.filter(phrase => content.includes(phrase))
        if (foundKyc.length > 0 && (content.includes('click') || content.includes('link') || content.includes('update'))) {
            indicators.push({
                type: 'kyc_scam',
                description: 'KYC update request via unofficial channel - likely scam',
                severity: 'high',
                confidence: 0.88
            })
            patterns.push({
                pattern: 'kyc_fraud',
                category: 'Banking Scam',
                severity: 'high',
                description: 'Fake KYC update request to steal banking credentials'
            })
            riskScore += 35
        }

        // Check for UPI/payment scam indicators
        const upiKeywords = ['upi', 'gpay', 'phonepe', 'paytm', 'bhim', 'send money', 'receive money', 'refund', 'cashback']
        const foundUpi = upiKeywords.filter(phrase => content.includes(phrase))
        if (foundUpi.length > 0 && (content.includes('pin') || content.includes('otp') || content.includes('scan'))) {
            indicators.push({
                type: 'upi_scam',
                description: 'UPI/Payment app scam indicators detected',
                severity: 'high',
                confidence: 0.85
            })
            patterns.push({
                pattern: 'payment_scam',
                category: 'UPI/Payment Scam',
                severity: 'high',
                description: 'Attempting to trick you into sending money or sharing UPI PIN'
            })
            riskScore += 30
        }

        // Check for impersonation
        const impersonationKeywords = [
            'customer care', 'customer support', 'helpline', 'toll free',
            'rbi', 'reserve bank', 'government of india', 'income tax',
            'police', 'cyber cell', 'technical support', 'tech support'
        ]
        const foundImpersonation = impersonationKeywords.filter(phrase => content.includes(phrase))
        if (foundImpersonation.length > 0 && indicators.length > 0) {
            indicators.push({
                type: 'authority_impersonation',
                description: 'May be impersonating official authority or support',
                severity: 'medium',
                confidence: 0.75
            })
            riskScore += 15
        }

        // Check for poor grammar/spelling (common in scams)
        const grammarIssues = ['kindly do the needful', 'revert back', 'please to', 'dear customer,', 'dear user,', 'dear sir/madam']
        const foundGrammar = grammarIssues.filter(phrase => content.includes(phrase))
        if (foundGrammar.length > 0) {
            indicators.push({
                type: 'suspicious_language',
                description: 'Contains suspicious or generic language patterns',
                severity: 'low',
                confidence: 0.6
            })
            riskScore += 10
        }

        // Check for cryptocurrency scams
        const cryptoKeywords = ['bitcoin', 'crypto', 'ethereum', 'btc', 'investment opportunity', 'guaranteed returns', 'double your money', 'mining']
        const foundCrypto = cryptoKeywords.filter(phrase => content.includes(phrase))
        if (foundCrypto.length >= 2) {
            indicators.push({
                type: 'crypto_scam',
                description: 'Cryptocurrency/investment scam indicators detected',
                severity: 'high',
                confidence: 0.85
            })
            patterns.push({
                pattern: 'investment_fraud',
                category: 'Investment Scam',
                severity: 'high',
                description: 'Fake investment opportunity promising unrealistic returns'
            })
            riskScore += 35
        }

        // Check for job scams
        const jobKeywords = ['work from home', 'earn from home', 'data entry job', 'typing job', 'easy money', 'no experience required', 'part time job', 'daily payment']
        const foundJob = jobKeywords.filter(phrase => content.includes(phrase))
        if (foundJob.length >= 2) {
            indicators.push({
                type: 'job_scam',
                description: 'Suspicious job offer - may be a scam',
                severity: 'high',
                confidence: 0.8
            })
            patterns.push({
                pattern: 'employment_scam',
                category: 'Job Scam',
                severity: 'high',
                description: 'Fake job offer designed to steal money or personal information'
            })
            riskScore += 30
        }

        // ===== CALCULATE FINAL RISK LEVEL =====
        riskScore = Math.min(riskScore, 100) // Cap at 100

        let riskLevel: 'low' | 'medium' | 'high'
        if (riskScore < 25) {
            riskLevel = 'low'
        } else if (riskScore < 60) {
            riskLevel = 'medium'
        } else {
            riskLevel = 'high'
        }

        // ===== GENERATE RECOMMENDATIONS =====
        if (indicators.length === 0) {
            recommendations.push('This content appears to be safe, but always stay vigilant')
            recommendations.push('Verify sender identity through official channels if unsure')
            recommendations.push('Never share sensitive information through unofficial channels')
        } else {
            if (indicators.some(i => i.type.includes('url') || i.type.includes('phishing') || i.type === 'brand_impersonation')) {
                recommendations.push('Do NOT click on any links in this message')
                recommendations.push('Verify the URL by visiting the official website directly')
            }
            if (indicators.some(i => i.type.includes('info_request') || i.type.includes('credential'))) {
                recommendations.push('NEVER share passwords, OTPs, or card details via email/SMS')
                recommendations.push('Banks and companies never ask for sensitive info this way')
            }
            if (indicators.some(i => i.type.includes('urgency') || i.type.includes('threat'))) {
                recommendations.push('Do not act in haste - scammers create false urgency')
                recommendations.push('Take time to verify through official customer care numbers')
            }
            if (indicators.some(i => i.type.includes('prize') || i.type.includes('lottery'))) {
                recommendations.push('You cannot win a lottery you never entered')
                recommendations.push('Never pay money to claim a "prize"')
            }
            if (indicators.some(i => i.type.includes('kyc') || i.type.includes('upi'))) {
                recommendations.push('Complete KYC only through official bank apps/websites')
                recommendations.push('Never share UPI PIN or scan unknown QR codes')
            }
            recommendations.push('Report this to the National Cyber Crime Portal: cybercrime.gov.in')
            recommendations.push('Block and report the sender on the platform')
        }

        // ===== GENERATE EXPLANATION =====
        let explanation = ''
        if (indicators.length === 0) {
            explanation = 'No significant scam indicators were detected in this content. The message appears to be legitimate. However, always exercise caution and verify through official channels if you have any doubts.'
        } else if (riskLevel === 'high') {
            explanation = `⚠️ HIGH RISK: This content shows ${indicators.length} strong scam indicators. ${patterns.length > 0 ? `It matches the "${patterns[0].category}" scam pattern. ` : ''}${indicators[0].description}. This is very likely a fraudulent message designed to steal your money or personal information. Do NOT engage with this content.`
        } else if (riskLevel === 'medium') {
            explanation = `⚡ CAUTION: This content shows ${indicators.length} suspicious indicator${indicators.length > 1 ? 's' : ''}. ${indicators[0].description}. While it may not be definitively a scam, exercise caution and verify through official channels before taking any action.`
        } else {
            explanation = `This content shows minor suspicious patterns. ${indicators[0]?.description || 'No major concerns detected.'} While likely safe, remain cautious with any requests for personal information or money.`
        }

        return {
            success: true,
            data: {
                id: `analysis-${Date.now()}`,
                riskLevel,
                riskScore,
                confidence: indicators.length > 0 ? Math.min(0.95, 0.6 + (indicators.length * 0.08)) : 0.7,
                indicators: indicators.slice(0, 5), // Top 5 indicators
                patterns: patterns.slice(0, 3), // Top 3 patterns
                explanation,
                recommendations: recommendations.slice(0, 5), // Top 5 recommendations
                timestamp: new Date().toISOString(),
                processingTime: Math.floor(800 + Math.random() * 400)
            },
            timestamp: new Date().toISOString()
        }
    },

    async getStats(): Promise<ApiResponse<PlatformStats>> {
        return {
            success: true,
            data: {
                scamsDetected: 1247896,
                usersProtected: 5634521,
                reportsSubmitted: 89234,
                accuracyRate: 94.7,
                lastUpdated: new Date().toISOString()
            },
            timestamp: new Date().toISOString()
        }
    }
}

// Export dynamic API based on environment variable
// Default to real API to use Gemini-powered scam detection
// Set NEXT_PUBLIC_ENABLE_MOCK_API=true to use mock API instead
const envMockApi = process.env.NEXT_PUBLIC_ENABLE_MOCK_API
const useMockApi = envMockApi === 'true'
export const api = useMockApi ? mockApi : apiClient


