/**
 * Scam Analysis Types
 */

export type RiskLevel = 'low' | 'medium' | 'high'

export interface ScamAnalysisRequest {
    content: string
    type: 'text' | 'url' | 'email' | 'transaction'
    metadata?: {
        source?: string
        timestamp?: string
        [key: string]: any
    }
}

export interface ScamPattern {
    pattern: string
    category: string
    severity: RiskLevel
    description: string
}

export interface RiskIndicator {
    type: string
    description: string
    severity: RiskLevel
    confidence: number
}

export interface ScamAnalysisResponse {
    id: string
    riskLevel: RiskLevel
    riskScore: number
    confidence: number
    indicators: RiskIndicator[]
    patterns: ScamPattern[]
    explanation: string
    recommendations: string[]
    timestamp: string
    processingTime: number
}

/**
 * Educational Content Types
 */

export interface EducationalTopic {
    id: string
    title: string
    description: string
    category: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimatedTime: number
    icon: string
}

export interface LearningModule {
    id: string
    title: string
    description: string
    content: string
    examples: Example[]
    quiz?: Quiz
    resources: Resource[]
}

export interface Example {
    title: string
    description: string
    type: 'safe' | 'suspicious' | 'dangerous'
    content: string
    explanation: string
}

export interface Quiz {
    questions: QuizQuestion[]
}

export interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
}

export interface Resource {
    title: string
    url: string
    type: 'article' | 'video' | 'guide' | 'tool'
}

/**
 * User Report Types
 */

export interface UserReport {
    id: string
    userId?: string
    content: string
    type: 'scam' | 'phishing' | 'fraud' | 'other'
    status: 'pending' | 'reviewing' | 'verified' | 'rejected'
    submittedAt: string
    updatedAt: string
    metadata?: {
        location?: string
        platform?: string
        [key: string]: any
    }
}

/**
 * Statistics Types
 */

export interface PlatformStats {
    scamsDetected: number
    usersProtected: number
    reportsSubmitted: number
    accuracyRate: number
    lastUpdated: string
}

/**
 * API Response Types
 */

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: {
        code: string
        message: string
        details?: any
    }
    timestamp: string
}

/**
 * Component Props Types
 */

export interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    link?: string
}

export interface StatCardProps {
    label: string
    value: number | string
    icon: React.ReactNode
    trend?: {
        value: number
        direction: 'up' | 'down'
    }
}

export interface AlertBannerProps {
    type: 'info' | 'warning' | 'error' | 'success'
    title: string
    message: string
    dismissible?: boolean
}
