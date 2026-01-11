'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, Lock, Zap, Sparkles, TrendingUp, Users2, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
    const scrollToAnalyzer = () => {
        document.getElementById('scam-analyzer')?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    const scrollToEducation = () => {
        document.getElementById('education')?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    }

    const stats = [
        { icon: Shield, label: 'Scams Detected', value: '1.2M+', color: 'from-blue-500 to-cyan-500' },
        { icon: Users2, label: 'Users Protected', value: '5.6M+', color: 'from-purple-500 to-pink-500' },
        { icon: TrendingUp, label: 'Accuracy Rate', value: '94.7%', color: 'from-green-500 to-emerald-500' },
        { icon: AlertTriangle, label: 'Reports Verified', value: '89K+', color: 'from-orange-500 to-red-500' },
    ]

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50/30 via-pink-50/40 to-white dark:from-gray-900 dark:via-purple-900/20 dark:via-pink-900/20 dark:to-gray-800 pt-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5
                    }}
                    className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                {/* Decorative Shapes */}
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-purple-300/30 rounded-full"
                />
                <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-blue-300/30 rounded-full"
                />
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto text-center space-y-8"
                >
                    {/* Trust Indicators with Animation */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-3 mb-6"
                    >
                        {[
                            { icon: Zap, text: 'AI-Powered', color: 'from-yellow-400 to-orange-500' },
                            { icon: Lock, text: 'Secure & Private', color: 'from-green-400 to-emerald-500' },
                            { icon: CheckCircle, text: 'Verified Platform', color: 'from-blue-400 to-cyan-500' },
                            { icon: Sparkles, text: 'Real-Time Analysis', color: 'from-purple-400 to-pink-500' },
                        ].map((badge, index) => {
                            const Icon = badge.icon
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Badge
                                        variant="outline"
                                        className={`px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                                    >
                                        <Icon className={`w-4 h-4 mr-2 bg-gradient-to-r ${badge.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`} />
                                        <span className="font-semibold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                                            {badge.text}
                                        </span>
                                    </Badge>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Main Headline with Gradient Animation */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight"
                    >
                        <span className="block mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            AI-Powered Scam Detection
                        </span>
                        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            & Digital Safety Platform
                        </span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Protect yourself from online fraud with{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
                            advanced AI analysis
                        </span>
                        . Detect scams, learn digital safety, and stay secure in the digital world.
                    </motion.p>

                    {/* CTA Buttons with Enhanced Styling */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="xl"
                                onClick={scrollToAnalyzer}
                                className="group relative overflow-hidden w-full sm:w-auto px-8 py-7 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/50 border-0"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                <Shield className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                                <span className="relative z-10">Analyze a Scam Now</span>
                                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-spin" />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="xl"
                                variant="outline"
                                onClick={scrollToEducation}
                                className="w-full sm:w-auto px-8 py-7 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 transition-all duration-300"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Learn Digital Safety
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Trust Stats with Enhanced Animation */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-800/40 backdrop-blur-xl rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl group-hover:shadow-2xl group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all duration-300" />
                                    <div className="relative p-6 text-center">
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 200 }}
                                            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-2"
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Visual Element - Security Illustration Placeholder */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-12 flex justify-center"
                    >
                        <div className="relative w-full max-w-2xl h-64 md:h-80 rounded-3xl overflow-hidden border-4 border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="mx-auto w-32 h-32 border-8 border-blue-500/30 rounded-full relative"
                                    >
                                        <Shield className="w-16 h-16 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500" />
                                    </motion.div>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                                        Real-time AI Protection Shield
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Animated Wave Separator */}
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <motion.path
                        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                        fill="url(#gradient1)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}
