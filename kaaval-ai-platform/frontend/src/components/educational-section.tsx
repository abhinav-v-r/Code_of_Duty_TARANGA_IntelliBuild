'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    ShieldAlert,
    CreditCard,
    Smartphone,
    Mail,
    Link2,
    ArrowRight,
    PlayCircle,
    GraduationCap,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    Zap,
    Clock,
    Users
} from 'lucide-react'
import { motion } from 'framer-motion'

const scamExamples = [
    {
        category: 'UPI Scams',
        icon: CreditCard,
        title: 'Fake Payment Requests',
        description: 'Learn to identify fraudulent UPI payment links and QR codes',
        examples: ['Request to "verify" your account', 'Unexpected refund requests', 'Prize/lottery payment scams'],
        risk: 'high' as const
    },
    {
        category: 'Phishing',
        icon: Mail,
        title: 'Email & SMS Phishing',
        description: 'Recognize fake messages from banks, government, or services',
        examples: ['Urgent account verification', 'Suspicious login alerts', 'Tax refund notifications'],
        risk: 'high' as const
    },
    {
        category: 'OTP Fraud',
        icon: Smartphone,
        title: 'OTP Sharing Scams',
        description: 'Understand why you should never share OTPs with anyone',
        examples: ['"Customer support" asking for OTP', 'Delivery verification scams', 'Account recovery frauds'],
        risk: 'high' as const
    },
    {
        category: 'Fake Links',
        icon: Link2,
        title: 'Malicious URLs',
        description: 'Identify shortened links and fake websites that steal data',
        examples: ['Look-alike domain names', 'Shortened URLs without preview', 'Unencrypted payment pages'],
        risk: 'medium' as const
    }
]

const learningTopics = [
    { icon: ShieldAlert, title: 'Recognizing Red Flags', duration: '5 min', level: 'Beginner' },
    { icon: BookOpen, title: 'Safe Online Banking', duration: '10 min', level: 'Beginner' },
    { icon: Smartphone, title: 'Mobile Security Basics', duration: '8 min', level: 'Beginner' },
    { icon: Mail, title: 'Email Safety Guide', duration: '7 min', level: 'Intermediate' }
]

export function EducationalSection() {
    return (
        <section id="education" className="relative py-16 md:py-24 bg-gradient-to-b from-background via-green-50/30 dark:via-green-950/10 to-background overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -45, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5
                    }}
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
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
                            <Badge variant="outline" className="px-5 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-300/50 dark:border-green-700/50 shadow-lg">
                                <GraduationCap className="w-4 h-4 mr-2 text-green-600 dark:text-green-400 animate-pulse" />
                                <span className="font-bold text-green-700 dark:text-green-300">Digital Literacy Hub</span>
                            </Badge>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 dark:from-gray-100 dark:via-green-100 dark:to-emerald-100 bg-clip-text text-transparent">
                            Learn to Protect Yourself
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
                            Interactive guides and{' '}
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                                real-world examples
                            </span>{' '}
                            designed for everyone, from first-time internet users to experienced professionals
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Common Scam Patterns */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-8 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                                    <ShieldAlert className="w-6 h-6 text-white" />
                                </div>
                                <span className="bg-gradient-to-r from-gray-900 to-red-900 dark:from-gray-100 dark:to-red-100 bg-clip-text text-transparent">
                                    Common Scam Patterns
                                </span>
                            </h3>
                            <div className="space-y-5">
                                {scamExamples.map((scam, index) => {
                                    const Icon = scam.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                        >
                                            <Card className="border-2 border-red-200/50 dark:border-red-800/50 bg-gradient-to-br from-red-50/50 via-orange-50/50 to-yellow-50/50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-bl-full group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                                                <CardHeader className="relative z-10">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <motion.div
                                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                                                                    scam.risk === 'high' ? 'from-red-500 to-orange-500' : 'from-yellow-500 to-orange-500'
                                                                } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                                                            >
                                                                <Icon className="w-7 h-7 text-white" />
                                                            </motion.div>
                                                            <div>
                                                                <CardTitle className="text-lg md:text-xl font-bold font-elegant mb-2 text-gray-900 dark:text-gray-100">
                                                                    {scam.title}
                                                                </CardTitle>
                                                                <Badge variant={scam.risk} className="font-semibold shadow-md">
                                                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                                                    {scam.category}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="relative z-10">
                                                    <CardDescription className="mb-4 text-base font-body text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {scam.description}
                                                    </CardDescription>
                                                    <ul className="space-y-2">
                                                        {scam.examples.map((example, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: 0.2 + i * 0.05 }}
                                                                className="flex items-start gap-3 text-sm font-body"
                                                            >
                                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                                                                    <span className="text-white text-xs font-bold">!</span>
                                                                </div>
                                                                <span className="text-muted-foreground leading-relaxed">{example}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Learning Modules */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-8 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <span className="bg-gradient-to-r from-gray-900 to-green-900 dark:from-gray-100 dark:to-green-100 bg-clip-text text-transparent">
                                    Interactive Learning
                                </span>
                            </h3>

                            {/* Quick Start Guides */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="mb-6 border-2 border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-teal-50/80 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 backdrop-blur-sm shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3 text-xl font-elegant font-bold">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                                                <PlayCircle className="w-5 h-5 text-white" />
                                            </div>
                                            Quick Start Guides
                                        </CardTitle>
                                        <CardDescription className="text-base font-body">
                                            Step-by-step tutorials for digital safety
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {learningTopics.map((topic, index) => {
                                            const Icon = topic.icon
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + index * 0.1 }}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <motion.div
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                                                        >
                                                            <Icon className="w-6 h-6 text-white" />
                                                        </motion.div>
                                                        <div>
                                                            <p className="font-bold text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-elegant">
                                                                {topic.title}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground font-body flex items-center gap-2 mt-1">
                                                                <Clock className="w-3 h-3" />
                                                                {topic.duration} • {topic.level}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                    >
                                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-2 transition-all" />
                                                    </motion.div>
                                                </motion.div>
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Visual Learning */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-elegant font-bold flex items-center gap-3">
                                            <Eye className="w-6 h-6 text-purple-600" />
                                            Visual Pattern Recognition
                                        </CardTitle>
                                        <CardDescription className="text-base font-body">
                                            See real examples of scams and learn to spot them
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-500/50 shadow-lg text-center"
                                            >
                                                <motion.div
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl"
                                                >
                                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                                </motion.div>
                                                <p className="text-sm font-bold text-green-700 dark:text-green-400 font-elegant">Safe Example</p>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-500/50 shadow-lg text-center"
                                            >
                                                <motion.div
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                    className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-xl"
                                                >
                                                    <AlertTriangle className="w-8 h-8 text-white" />
                                                </motion.div>
                                                <p className="text-sm font-bold text-red-700 dark:text-red-400 font-elegant">Scam Example</p>
                                            </motion.div>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl" variant="gradient">
                                                <PlayCircle className="w-5 h-5 mr-2" />
                                                Start Interactive Tutorial
                                                <Sparkles className="w-4 h-4 ml-2" />
                                            </Button>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Regional Adaptability Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-center p-8 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-2xl border-2 border-purple-300/50 dark:border-purple-700/50 backdrop-blur-sm shadow-xl"
                    >
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            <p className="text-lg font-bold font-elegant bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Available in Multiple Languages
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
                            Educational content adapted for regional fraud patterns and local payment systems. 
                            Learn to protect yourself in your native language with culturally relevant examples.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
