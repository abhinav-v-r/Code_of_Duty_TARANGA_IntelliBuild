'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Shield,
    Download,
    Chrome,
    CheckCircle,
    Lock,
    Zap,
    Eye,
    Bell,
    Settings,
    Globe
} from 'lucide-react'

export function ExtensionDownload() {
    const features = [
        {
            icon: Shield,
            title: 'Real-time Protection',
            description: 'Blocks phishing sites before they can harm you',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Eye,
            title: 'AI-Powered Detection',
            description: 'Advanced machine learning identifies threats instantly',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Bell,
            title: 'Instant Alerts',
            description: 'Get notified when suspicious sites are detected',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: Lock,
            title: 'Privacy First',
            description: 'Your data never leaves your device',
            color: 'from-green-500 to-emerald-500'
        },
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    }

    return (
        <section id="extension-download" className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <Badge className="mb-4 px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
                            <Chrome className="w-4 h-4 mr-2" />
                            Browser Extension
                        </Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                            Get <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">SentinelX Guardian Pro</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Advanced AI-powered browser extension that protects you from phishing attacks,
                            malicious websites, and online scams in real-time.
                        </p>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Features List */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                                    >
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                                            <p className="text-gray-400">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>

                        {/* Download Card */}
                        <motion.div variants={itemVariants}>
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />

                                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-10">
                                    {/* Extension Icon */}
                                    <div className="flex justify-center mb-6">
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl blur-xl opacity-50" />
                                            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                                                <Shield className="w-12 h-12 text-white" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white text-center mb-2">
                                        SentinelX Guardian Pro
                                    </h3>
                                    <p className="text-gray-400 text-center mb-6">
                                        Version 3.0.0 • Chrome & Edge Compatible
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[
                                            { label: 'Active Users', value: '50K+' },
                                            { label: 'Threats Blocked', value: '1.2M+' },
                                            { label: 'Rating', value: '4.9★' },
                                        ].map((stat, i) => (
                                            <div key={i} className="text-center p-3 rounded-lg bg-white/5">
                                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                                <div className="text-xs text-gray-400">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Download Button */}
                                    <motion.a
                                        href="/downloads/sentinelx-guardian-pro.zip"
                                        download
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="block"
                                    >
                                        <Button
                                            size="lg"
                                            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 hover:from-green-600 hover:via-cyan-600 hover:to-blue-600 text-white shadow-xl shadow-green-500/30 border-0"
                                        >
                                            <Download className="w-5 h-5 mr-3" />
                                            Download Extension
                                            <span className="ml-2 text-sm opacity-80">(.zip)</span>
                                        </Button>
                                    </motion.a>

                                    {/* Installation Instructions */}
                                    <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                            <Settings className="w-4 h-4" />
                                            Quick Installation
                                        </h4>
                                        <ol className="text-sm text-gray-400 space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">1</span>
                                                Extract the downloaded ZIP file
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">2</span>
                                                Open Chrome → Extensions (chrome://extensions)
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">3</span>
                                                Enable "Developer mode" → Click "Load unpacked"
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">4</span>
                                                Select the extracted folder → Done!
                                            </li>
                                        </ol>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="flex items-center justify-center gap-4 mt-6 text-gray-400">
                                        <div className="flex items-center gap-1 text-xs">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Safe & Secure
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <Globe className="w-4 h-4 text-blue-500" />
                                            Open Source
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <Zap className="w-4 h-4 text-yellow-500" />
                                            Lightweight
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
