'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    Upload,
    Link2,
    MessageSquare,
    Shield,
    AlertTriangle,
    Info,
    Sparkles,
    FileText,
    Mail,
    Zap,
    Eye,
    Lock,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/api'
import type { ScamAnalysisResponse, RiskLevel } from '@/lib/types'

type AnalysisType = 'text' | 'url' | 'file'

export function ScamAnalyzer() {
    const [analysisType, setAnalysisType] = useState<AnalysisType>('text')
    const [content, setContent] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<ScamAnalysisResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleAnalyze = async () => {
        if (!content.trim()) {
            setError('Please enter content to analyze')
            return
        }

        setIsAnalyzing(true)
        setError(null)
        setResult(null)

        try {
            const response = await api.analyzeScam({
                content,
                type: analysisType === 'url' ? 'url' : 'text',
            })

            if (response.success && response.data) {
                setResult(response.data)
            } else {
                setError(response.error?.message || 'Analysis failed')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getRiskIcon = (level: RiskLevel) => {
        switch (level) {
            case 'low':
                return <CheckCircle2 className="w-7 h-7 text-green-600" />
            case 'medium':
                return <AlertCircle className="w-7 h-7 text-yellow-600" />
            case 'high':
                return <AlertTriangle className="w-7 h-7 text-red-600" />
        }
    }

    const getRiskBadgeVariant = (level: RiskLevel): "low" | "medium" | "high" => level

    const typeOptions = [
        { type: 'text' as AnalysisType, icon: MessageSquare, label: 'Text/Email', color: 'from-blue-500 to-cyan-500', description: 'Analyze messages' },
        { type: 'url' as AnalysisType, icon: Link2, label: 'URL/Link', color: 'from-purple-500 to-pink-500', description: 'Check links' },
        { type: 'file' as AnalysisType, icon: FileText, label: 'Upload File', color: 'from-orange-500 to-red-500', description: 'Scan documents' },
    ]

    return (
        <section id="scam-analyzer" className="relative py-16 md:py-24 bg-gradient-to-b from-background via-purple-50/30 dark:via-purple-950/10 to-background overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block mb-4"
                        >
                            <Badge variant="outline" className="px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-purple-300/50 dark:border-purple-600/50 shadow-lg">
                                <Zap className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400 animate-pulse" />
                                <span className="font-bold text-purple-700 dark:text-purple-300">Free AI Analysis</span>
                            </Badge>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-gray-100 dark:via-purple-100 dark:to-gray-100 bg-clip-text text-transparent">
                            Analyze Suspicious Content
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body">
                            Upload or paste suspicious messages, links, or emails for instant{' '}
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                AI-powered risk assessment
                            </span>
                        </p>
                    </motion.div>

                    {/* Analyzer Card with Enhanced Styling */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="shadow-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                            <CardHeader className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-b border-purple-200/50 dark:border-purple-800/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-elegant font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            Scam Detection Analysis
                                        </CardTitle>
                                        <CardDescription className="text-base font-body">
                                            Select the type of content you want to analyze
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                {/* Type Selector with Enhanced Design */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {typeOptions.map((option, index) => {
                                        const Icon = option.icon
                                        const isActive = analysisType === option.type
                                        return (
                                            <motion.div
                                                key={option.type}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.03, y: -5 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    variant={isActive ? 'default' : 'outline'}
                                                    onClick={() => setAnalysisType(option.type)}
                                                    className={`w-full h-auto p-5 flex flex-col items-center gap-3 border-2 transition-all duration-300 ${
                                                        isActive
                                                            ? `bg-gradient-to-br ${option.color} text-white border-transparent shadow-xl`
                                                            : 'hover:border-purple-300 dark:hover:border-purple-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm'
                                                    }`}
                                                >
                                                    <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : `bg-gradient-to-br ${option.color} opacity-20`}`}>
                                                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : `text-gray-700 dark:text-gray-300`}`} />
                                                    </div>
                                                    <div className="text-center">
                                                        <div className={`font-bold text-base mb-1 ${isActive ? 'text-white' : ''}`}>
                                                            {option.label}
                                                        </div>
                                                        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                                                            {option.description}
                                                        </div>
                                                    </div>
                                                </Button>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* Input Area with Enhanced Styling */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-3"
                                >
                                    <Label htmlFor="content" className="text-base font-semibold flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-purple-600" />
                                        {analysisType === 'url' ? 'Enter URL to Analyze' : analysisType === 'file' ? 'Upload File' : 'Paste Content to Analyze'}
                                    </Label>
                                    {analysisType === 'url' ? (
                                        <motion.div
                                            whileFocus={{ scale: 1.01 }}
                                            className="relative"
                                        >
                                            <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                                            <Input
                                                id="content"
                                                type="url"
                                                placeholder="https://example.com/suspicious-link"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="text-base pl-12 h-14 border-2 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                                            />
                                        </motion.div>
                                    ) : analysisType === 'file' ? (
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-12 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                                            >
                                                <Upload className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Drag and drop a file or click to browse
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Supports: .txt, .pdf, .eml, .msg
                                            </p>
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id="file-upload"
                                                accept=".txt,.pdf,.eml,.msg"
                                            />
                                            <Button variant="outline" size="lg" asChild className="border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                                                <label htmlFor="file-upload" className="cursor-pointer">
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Choose File
                                                </label>
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            whileFocus={{ scale: 1.01 }}
                                            className="relative"
                                        >
                                            <Mail className="absolute left-4 top-4 w-5 h-5 text-purple-500" />
                                            <Textarea
                                                id="content"
                                                placeholder="Paste the suspicious message, email, or transaction details here..."
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                rows={8}
                                                className="text-base resize-none pl-12 pt-4 border-2 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm font-body"
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Privacy Notice with Enhanced Design */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Lock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-base mb-2 flex items-center gap-2">
                                            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            Privacy & Security Guaranteed
                                        </p>
                                        <p className="text-sm text-muted-foreground font-body leading-relaxed">
                                            Your data is processed securely and anonymously. We never store personal information or share your submissions with third parties. All analysis happens in real-time with enterprise-grade encryption.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Analyze Button with Enhanced Design */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        size="lg"
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing || !content.trim()}
                                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed border-0 relative overflow-hidden group"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 className="w-6 h-6 mr-3 animate-spin relative z-10" />
                                                <span className="relative z-10">Analyzing Content...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-6 h-6 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                                                <span className="relative z-10">Analyze Now with AI</span>
                                                <Sparkles className="w-5 h-5 ml-3 relative z-10 group-hover:animate-pulse" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {/* Error Display with Animation */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-2 border-red-300 dark:border-red-800 rounded-xl backdrop-blur-sm"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                                <AlertCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-sm font-semibold text-red-700 dark:text-red-400">{error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Results Display with Enhanced Animations */}
                                <AnimatePresence>
                                    {result && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 50 }}
                                            transition={{ duration: 0.5 }}
                                            className="space-y-6 pt-6 border-t-2 border-purple-200 dark:border-purple-800"
                                        >
                                            {/* Risk Level Header */}
                                            <motion.div
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                                className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50/50 dark:from-gray-800 dark:to-purple-950/30 border-2 border-purple-200 dark:border-purple-800"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        {getRiskIcon(result.riskLevel)}
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="font-bold text-xl font-elegant mb-1">Risk Assessment</h3>
                                                        <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                                                            <Zap className="w-4 h-4 text-purple-600" />
                                                            Analysis completed in {result.processingTime}ms
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={getRiskBadgeVariant(result.riskLevel)}
                                                    className="text-base px-5 py-3 font-bold shadow-lg"
                                                >
                                                    {result.riskLevel.toUpperCase()} RISK
                                                </Badge>
                                            </motion.div>

                                            {/* Risk Score with Animated Progress */}
                                            <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-base font-bold font-body">Risk Score</span>
                                                    <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 dark:from-gray-200 dark:to-purple-200 bg-clip-text text-transparent">
                                                        {result.riskScore.toFixed(1)}/100
                                                    </span>
                                                </div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.riskScore}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                        className={`h-full rounded-full ${
                                                            result.riskLevel === 'low'
                                                                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                                                : result.riskLevel === 'medium'
                                                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                                                    : 'bg-gradient-to-r from-red-400 to-pink-500'
                                                        } shadow-lg`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Explanation */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="p-5 rounded-xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 backdrop-blur-sm"
                                            >
                                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2 font-elegant">
                                                    <Eye className="w-5 h-5 text-blue-600" />
                                                    Analysis Explanation
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed font-body">{result.explanation}</p>
                                            </motion.div>

                                            {/* Recommendations */}
                                            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800 backdrop-blur-sm">
                                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 font-elegant">
                                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                    Recommended Actions
                                                </h4>
                                                <ul className="space-y-3">
                                                    {result.recommendations.map((rec, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.4 + index * 0.1 }}
                                                            className="flex items-start gap-3 text-sm font-body"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{rec}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
