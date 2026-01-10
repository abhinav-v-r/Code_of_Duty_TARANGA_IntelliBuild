'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Shield,
    Users,
    FileCheck,
    TrendingUp,
    Award,
    Lock,
    CheckCircle
} from 'lucide-react'
import { mockApi } from '@/lib/api'
import { formatNumber } from '@/lib/utils'
import type { PlatformStats } from '@/lib/types'

export function ImpactSection() {
    const [stats, setStats] = useState<PlatformStats | null>(null)

    useEffect(() => {
        const loadStats = async () => {
            const response = await mockApi.getStats()
            if (response.success && response.data) {
                setStats(response.data)
            }
        }
        loadStats()
    }, [])

    const statCards = stats ? [
        {
            icon: Shield,
            label: 'Scams Detected',
            value: formatNumber(stats.scamsDetected),
            color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
            trend: { value: 12, direction: 'up' as const }
        },
        {
            icon: Users,
            label: 'Users Protected',
            value: formatNumber(stats.usersProtected),
            color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
            trend: { value: 8, direction: 'up' as const }
        },
        {
            icon: FileCheck,
            label: 'Reports Submitted',
            value: formatNumber(stats.reportsSubmitted),
            color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
            trend: { value: 15, direction: 'up' as const }
        },
        {
            icon: TrendingUp,
            label: 'Accuracy Rate',
            value: `${stats.accuracyRate}%`,
            color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
            trend: { value: 2, direction: 'up' as const }
        }
    ] : []

    const certifications = [
        { name: 'ISO 27001', description: 'Information Security' },
        { name: 'SOC 2 Type II', description: 'Data Protection' },
        { name: 'GDPR', description: 'Privacy Compliant' },
        { name: 'PCI DSS', description: 'Payment Security' }
    ]

    const trustIndicators = [
        'End-to-end encryption for all data',
        'Zero personal data storage policy',
        'Open-source AI model transparency',
        'Independent security audits',
        'Government cybersecurity alignment',
        'Privacy-first architecture'
    ]

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-background to-primary-50/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <Badge variant="outline" className="mb-4">
                            <Award className="w-4 h-4 mr-2" />
                            Impact & Trust
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Making the Internet Safer for Everyone
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Real impact powered by community trust and cutting-edge technology
                        </p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {statCards.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <Card
                                    key={index}
                                    className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            {stat.trend && (
                                                <Badge variant="success" className="text-xs">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    +{stat.trend.value}%
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-3xl font-bold text-foreground">
                                                {stat.value}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </CardContent>
                                    {/* Decorative gradient */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary" />
                                </Card>
                            )
                        })}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Security Compliance */}
                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Lock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Security Certifications</h3>
                                        <p className="text-sm text-muted-foreground">Enterprise-grade compliance</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {certifications.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <p className="font-semibold text-sm">{cert.name}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{cert.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trust & Transparency */}
                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Privacy & Ethics</h3>
                                        <p className="text-sm text-muted-foreground">Your data, your control</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {trustIndicators.map((indicator, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{indicator}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Transparency Statement */}
                    <div className="text-center p-8 bg-primary/5 rounded-2xl border-2 border-primary/20">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="text-2xl font-bold mb-3">Built with Ethical AI</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                            Our AI models are transparent, explainable, and continuously monitored for bias.
                            We believe in responsible AI that empowers users without compromising privacy or security.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                            <Badge variant="outline">Open Source Components</Badge>
                            <Badge variant="outline">Bias Testing</Badge>
                            <Badge variant="outline">Explainable AI</Badge>
                            <Badge variant="outline">Community Oversight</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
