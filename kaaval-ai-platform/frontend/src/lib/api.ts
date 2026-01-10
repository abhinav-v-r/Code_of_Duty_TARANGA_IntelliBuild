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
 * Mock API for development/testing
 */
export const mockApi = {
    async analyzeScam(request: ScamAnalysisRequest): Promise<ApiResponse<ScamAnalysisResponse>> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const riskScore = Math.random() * 100
        const riskLevel: 'low' | 'medium' | 'high' =
            riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high'

        return {
            success: true,
            data: {
                id: `analysis-${Date.now()}`,
                riskLevel,
                riskScore,
                confidence: 0.85,
                indicators: [
                    {
                        type: 'urgent_language',
                        description: 'Uses urgent or threatening language',
                        severity: 'high',
                        confidence: 0.9
                    },
                    {
                        type: 'suspicious_link',
                        description: 'Contains suspicious shortened URL',
                        severity: 'high',
                        confidence: 0.95
                    }
                ],
                patterns: [
                    {
                        pattern: 'phishing',
                        category: 'Email Phishing',
                        severity: 'high',
                        description: 'Common phishing attempt pattern detected'
                    }
                ],
                explanation: 'This message shows multiple indicators of a phishing attempt. It uses urgent language to pressure you into immediate action and contains a suspicious link.',
                recommendations: [
                    'Do not click on any links in this message',
                    'Do not share personal information',
                    'Report this message to the platform',
                    'Verify sender identity through official channels'
                ],
                timestamp: new Date().toISOString(),
                processingTime: 1234
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
// Default to mock API in development mode for easier local testing without backend
const envMockApi = process.env.NEXT_PUBLIC_ENABLE_MOCK_API
const useMockApi = envMockApi === 'true' || 
                   (envMockApi !== 'false' && process.env.NODE_ENV === 'development')
export const api = useMockApi ? mockApi : apiClient

