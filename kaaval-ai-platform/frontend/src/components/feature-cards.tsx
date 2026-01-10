'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Brain,
    GraduationCap,
    TrendingUp,
    Users,
    Bell,
    Shield,
    Search,
    BarChart3,
    Sparkles,
    Zap,
    CheckCircle2,
    Star
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
    {
        icon: Brain,
        title: 'AI Scam Detection Engine',
        description: 'Advanced machine learning algorithms analyze patterns, language, and behavior to identify sophisticated scams with high accuracy.',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
        borderColor: 'border-blue-300 dark:border-blue-700',
        iconBg: 'bg-blue-500'
    },
    {
        icon: GraduationCap,
        title: 'Digital Literacy Learning Hub',
        description: 'Comprehensive educational resources designed for all skill levels, from first-time internet users to tech-savvy individuals.',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
        borderColor: 'border-purple-300 dark:border-purple-700',
        iconBg: 'bg-purple-500'
    },
    {
        icon: BarChart3,
        title: 'Fraud Risk Scoring',
        description: 'Real-time risk assessment with detailed breakdowns of threat indicators and confidence levels for informed decision-making.',
        color: 'from-orange-500 to-red-500',
        bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30',
        borderColor: 'border-orange-300 dark:border-orange-700',
        iconBg: 'bg-orange-500'
    },
    {
        icon: Users,
        title: 'Community Scam Alerts',
        description: 'Crowdsourced threat intelligence from verified reports helps protect everyone from emerging scam patterns.',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
        borderColor: 'border-green-300 dark:border-green-700',
        iconBg: 'bg-green-500'
    },
    {
        icon: Bell,
        title: 'Real-Time Protection Tips',
        description: 'Instant notifications and actionable guidance when suspicious activity is detected, keeping you one step ahead.',
        color: 'from-red-500 to-pink-500',
        bgColor: 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
        borderColor: 'border-red-300 dark:border-red-700',
        iconBg: 'bg-red-500'
    },
    {
        icon: Search,
        title: 'Pattern Analysis',
        description: 'Deep analysis of URLs, messages, and transactions to detect even the most sophisticated phishing and fraud attempts.',
        color: 'from-teal-500 to-cyan-500',
        bgColor: 'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
        borderColor: 'border-teal-300 dark:border-teal-700',
        iconBg: 'bg-teal-500'
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
}

export function FeatureCards() {
    return (
        <section id="features" className="relative py-16 md:py-24 bg-gradient-to-b from-background via-blue-50/30 dark:via-blue-950/10 to-background overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5
                    }}
                    className="absolute bottom-1/2 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-block mb-6"
                    >
                        <Badge variant="outline" className="px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-purple-300/50 dark:border-purple-700/50 shadow-lg">
                            <Star className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
                            <span className="font-bold text-purple-700 dark:text-purple-300">Enterprise Features</span>
                        </Badge>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                        Comprehensive Protection Platform
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
                        Enterprise-grade security features powered by{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            artificial intelligence
                        </span>{' '}
                        to keep you safe in the digital world
                    </p>
                </motion.div>

                {/* Feature Grid with Enhanced Animations */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -10 }}
                                whileTap={{ scale: 0.98 }}
                                className="group"
                            >
                                <Card className={`h-full border-2 ${feature.borderColor} bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}>
                                    {/* Animated Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                    
                                    <CardHeader className="relative z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                                className="absolute inset-0 rounded-2xl border-2 border-white/30"
                                            />
                                        </motion.div>
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <CardTitle className="text-xl font-bold font-elegant text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                                {feature.title}
                                            </CardTitle>
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Sparkles className="w-5 h-5 text-purple-500" />
                                            </motion.div>
                                        </div>
                                        <Badge variant="outline" className={`text-xs border-${feature.color.split('-')[1]}-300 dark:border-${feature.color.split('-')[1]}-700 bg-white/50 dark:bg-gray-800/50`}>
                                            <Zap className="w-3 h-3 mr-1" />
                                            AI-Powered
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="relative z-10">
                                        <CardDescription className="text-base leading-relaxed font-body text-gray-700 dark:text-gray-300">
                                            {feature.description}
                                        </CardDescription>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                            className="mt-4 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
                                        />
                                    </CardContent>
                                    
                                    {/* Decorative Corner */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full`} />
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA with Enhanced Design */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl border-2 border-purple-300/50 dark:border-purple-700/50 shadow-xl backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-lg font-elegant text-gray-900 dark:text-gray-100">
                                Trusted by Government Agencies
                            </p>
                            <p className="text-sm text-muted-foreground font-body">
                                and leading financial institutions worldwide
                            </p>
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                        >
                            <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
