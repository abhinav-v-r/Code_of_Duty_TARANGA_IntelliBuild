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

    const footerLinks = {
        platform: [
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'API Documentation', href: '/docs' },
        ],
        resources: [
            { label: 'Learning Center', href: '#education' },
            { label: 'Scam Database', href: '/scams' },
            { label: 'Security Blog', href: '/blog' },
            { label: 'Research Papers', href: '/research' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy', icon: Lock },
            { label: 'Terms of Service', href: '/terms', icon: FileText },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'Data Protection', href: '/data-protection', icon: Shield },
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Report a Scam', href: '/report' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Status', href: '/status' },
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
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-display font-bold">Kaaval AI</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                                AI-powered platform protecting millions from digital fraud and building a safer internet for everyone.
                            </p>

                            {/* Government Alignment */}
                            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20 mb-4">
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
                                        <Link
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-200 group"
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Platform Links */}
                        <div>
                            <h3 className="font-semibold mb-4">Platform</h3>
                            <ul className="space-y-3">
                                {footerLinks.platform.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link, index) => {
                                    const Icon = link.icon
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                            >
                                                {Icon && <Icon className="w-3 h-3" />}
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="py-6 border-t border-border">
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="font-semibold text-sm mb-1">Report Active Fraud</p>
                                <p className="text-xs text-muted-foreground mb-2">
                                    If you are currently experiencing financial fraud, contact your bank immediately and report to local authorities.
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <a href="tel:1930" className="text-destructive hover:underline font-medium">
                                        National Cyber Crime Helpline: 1930
                                    </a>
                                    <span className="text-muted-foreground">|</span>
                                    <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-destructive hover:underline font-medium">
                                        cybercrime.gov.in
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
                            <Lock className="w-4 h-4" />
                            <p>
                                © {currentYear} Kaaval AI. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs">All systems operational</span>
                            </div>
                            <Link href="mailto:security@kaavalai.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" />
                                <span>Security Contact</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
