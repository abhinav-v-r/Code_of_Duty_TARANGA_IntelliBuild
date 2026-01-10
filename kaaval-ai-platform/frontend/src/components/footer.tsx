'use client'

import Link from 'next/link'
import {
    Shield,
    Mail,
    Github,
    Twitter,
    Linkedin,
    FileText,
    Lock,
    AlertCircle
} from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else if (href === '/' || href === '') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        // For external links or actual routes, let the default behavior handle it
    }

    const footerLinks = {
        platform: [
            { label: 'How It Works', href: '#scam-analyzer' },
            { label: 'Features', href: '#features' },
            { label: 'Learn', href: '#education' },
            { label: 'Stats', href: '#impact' },
        ],
        resources: [
            { label: 'Learning Center', href: '#education' },
            { label: 'Scam Analyzer', href: '#scam-analyzer' },
            { label: 'Features', href: '#features' },
            { label: 'Impact Stats', href: '#impact' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/', icon: Lock },
            { label: 'Terms of Service', href: '/', icon: FileText },
            { label: 'Cookie Policy', href: '/' },
            { label: 'Data Protection', href: '/', icon: Shield },
        ],
        support: [
            { label: 'Help Center', href: '#education' },
            { label: 'Report a Scam', href: '#scam-analyzer' },
            { label: 'Contact Us', href: '/' },
            { label: 'Status', href: '/' },
        ],
    }

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com/kaavalai', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com/company/kaavalai', label: 'LinkedIn' },
        { icon: Github, href: 'https://github.com/kaavalai', label: 'GitHub' },
    ]

    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-4 group">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-display font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Kaaval AI</span>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                                AI-powered platform protecting millions from digital fraud and building a safer internet for everyone.
                            </p>

                            {/* Government Alignment */}
                            <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-primary/20 mb-4 backdrop-blur-sm">
                                <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-muted-foreground">
                                    <p className="font-medium text-foreground mb-1">Government Aligned</p>
                                    <p>Supporting national cybersecurity initiatives and digital literacy programs</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-200 group shadow-md hover:shadow-lg"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Platform Links */}
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
                            <ul className="space-y-3">
                                {footerLinks.platform.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(link.href, e)}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(link.href, e)}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(link.href, e)}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link, index) => {
                                    const Icon = link.icon
                                    return (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleLinkClick(link.href, e)}
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group"
                                            >
                                                {Icon && <Icon className="w-3 h-3" />}
                                                <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {link.label}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="py-6 border-t border-border">
                    <div className="bg-gradient-to-r from-red-50/80 to-orange-50/80 dark:from-red-950/30 dark:to-orange-950/30 border-2 border-destructive/30 rounded-lg p-4 mb-6 backdrop-blur-sm shadow-lg">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-base mb-1 text-destructive dark:text-red-400">Report Active Fraud</p>
                                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                    If you are currently experiencing financial fraud, contact your bank immediately and report to local authorities.
                                </p>
                                <div className="flex flex-wrap gap-3 text-xs">
                                    <a href="tel:1930" className="text-destructive hover:underline font-bold px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-destructive/30 hover:border-destructive transition-all">
                                        📞 Helpline: 1930
                                    </a>
                                    <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-destructive hover:underline font-bold px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-destructive/30 hover:border-destructive transition-all">
                                        🌐 cybercrime.gov.in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-primary" />
                            <p>
                                © {currentYear} Kaaval AI. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                                <span className="text-xs font-medium text-green-700 dark:text-green-400">All systems operational</span>
                            </div>
                            <a href="mailto:security@kaavalai.com" className="flex items-center gap-2 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10">
                                <Mail className="w-4 h-4" />
                                <span>Security Contact</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
