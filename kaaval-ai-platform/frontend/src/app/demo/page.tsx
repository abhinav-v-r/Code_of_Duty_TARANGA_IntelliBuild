'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {
    Shield,
    Download,
    Chrome,
    AlertTriangle,
    ExternalLink,
    CreditCard,
    Mail,
    Gift,
    Video,
    MessageCircle,
    Search,
    ArrowLeft,
    CheckCircle,
    XCircle,
    Info,
    Smartphone,
    Globe,
    Lock
} from 'lucide-react'

const demoSites = [
    {
        id: 'paypal',
        name: 'PayPal Phishing',
        description: 'Fake account suspension alert asking for credit card details',
        url: '/demo-sites/paypal-phishing.html',
        category: 'Banking',
        icon: CreditCard,
        color: 'from-blue-500 to-blue-700',
        risk: 'Critical',
        tactics: ['Urgency', 'Fear', 'Identity Theft']
    },
    {
        id: 'sbi',
        name: 'SBI KYC Scam',
        description: 'Fake KYC update request targeting Indian bank customers',
        url: '/demo-sites/sbi-kyc-phishing.html',
        category: 'Banking',
        icon: CreditCard,
        color: 'from-indigo-500 to-indigo-700',
        risk: 'Critical',
        tactics: ['KYC Fraud', 'OTP Theft', 'Account Takeover']
    },
    {
        id: 'amazon',
        name: 'Amazon Prize Scam',
        description: 'Fake lottery claiming you won a ₹5000 gift card',
        url: '/demo-sites/amazon-prize-scam.html',
        category: 'Prize Scam',
        icon: Gift,
        color: 'from-orange-500 to-orange-700',
        risk: 'High',
        tactics: ['Fake Prize', 'Too Good To Be True', 'Payment Fraud']
    },
    {
        id: 'netflix',
        name: 'Netflix Payment Scam',
        description: 'Fake billing issue asking for payment details',
        url: '/demo-sites/netflix-phishing.html',
        category: 'Subscription',
        icon: Video,
        color: 'from-red-500 to-red-700',
        risk: 'High',
        tactics: ['Account Suspension', 'Credential Theft', 'Card Theft']
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp Verification Scam',
        description: 'Fake WhatsApp verification requesting OTP and backup codes',
        url: '/demo-sites/whatsapp-phishing.html',
        category: 'Social Media',
        icon: MessageCircle,
        color: 'from-green-500 to-green-700',
        risk: 'Critical',
        tactics: ['OTP Hijacking', 'Account Takeover', 'Impersonation']
    },
    {
        id: 'google',
        name: 'Google Login Phishing',
        description: 'Fake Google sign-in page with security alert',
        url: '/demo-sites/google-phishing.html',
        category: 'Account Theft',
        icon: Search,
        color: 'from-blue-400 to-red-500',
        risk: 'Critical',
        tactics: ['Credential Theft', 'Account Takeover', 'Data Breach']
    },
]

export default function DemoPage() {
    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Critical': return 'bg-red-500 text-white'
            case 'High': return 'bg-orange-500 text-white'
            case 'Medium': return 'bg-yellow-500 text-black'
            default: return 'bg-gray-500 text-white'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-60" />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Kaaval AI
                            </span>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Badge className="mb-4 px-4 py-2 bg-red-500/20 text-red-400 border-red-500/30">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Demo Phishing Sites
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Test{' '}
                        <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            SentinelX Guardian Pro
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        These are SAFE demo phishing pages. Install the extension, then visit these sites to see
                        how SentinelX blocks real-world scam attempts.
                    </p>
                </motion.div>

                {/* Instructions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-white">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                                    <Info className="w-5 h-5 text-white" />
                                </div>
                                How to Test the Extension
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Download Extension</h4>
                                        <p className="text-sm">Download and install SentinelX Guardian Pro in Chrome/Edge</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Click Any Demo Site</h4>
                                        <p className="text-sm">Visit the demo phishing pages listed below</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Watch It Block!</h4>
                                        <p className="text-sm">See how the extension detects and blocks the threat</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <a href="/downloads/sentinelx-guardian-pro.zip" download>
                                    <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download SentinelX Guardian Pro
                                        <Badge className="ml-2 bg-white/20">v3.0.0</Badge>
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Demo Sites Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {demoSites.map((site, index) => {
                        const Icon = site.icon
                        return (
                            <motion.div
                                key={site.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className="h-full bg-gray-800/50 border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-red-500/10">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${site.color} flex items-center justify-center shadow-lg`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <Badge className={getRiskColor(site.risk)}>
                                                {site.risk}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-white mt-4 group-hover:text-red-400 transition-colors">
                                            {site.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {site.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500 mb-2">Scam Tactics Used:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {site.tactics.map((tactic, i) => (
                                                    <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                                        {tactic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="mb-4 border-gray-600 text-gray-400">
                                            {site.category}
                                        </Badge>
                                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="block">
                                            <Button className="w-full bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 group-hover:bg-red-500 group-hover:text-white transition-all">
                                                <AlertTriangle className="w-4 h-4 mr-2" />
                                                Visit Demo Site
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Safety Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 max-w-4xl mx-auto"
                >
                    <Card className="bg-blue-500/10 border-blue-500/30">
                        <CardContent className="py-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <Lock className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">🔒 These Pages Are Completely Safe</h3>
                                    <p className="text-gray-400 text-sm">
                                        All demo phishing pages are hosted locally on this site. They do not collect any data and are
                                        designed purely for educational purposes. No actual credentials or payment information will
                                        be processed. Use these to safely test and understand how phishing attacks work.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 mt-20 py-8">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© 2026 Kaaval AI. All rights reserved. Demo pages for educational purposes only.</p>
                </div>
            </footer>
        </div>
    )
}
