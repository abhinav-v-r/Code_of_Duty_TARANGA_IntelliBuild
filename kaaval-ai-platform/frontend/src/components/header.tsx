'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Shield,
    Menu,
    X,
    Search,
    Bell,
    User,
    ChevronDown,
    Home,
    BookOpen,
    BarChart3,
    HelpCircle,
    Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { label: 'Home', href: '#', icon: Home },
        { label: 'Features', href: '#features', icon: Sparkles },
        { label: 'Analyzer', href: '#scam-analyzer', icon: Search },
        { label: 'Learn', href: '#education', icon: BookOpen },
        { label: 'Stats', href: '#impact', icon: BarChart3 },
        { label: 'Help', href: '#help', icon: HelpCircle },
    ]

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-primary/10'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3"
                    >
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xl font-display font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-colors ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                                    Kaaval AI
                                </span>
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                    Your Digital Shield
                                </span>
                            </div>
                        </Link>
                        <Badge variant="outline" className="hidden lg:flex items-center gap-1 border-green-500/50 bg-green-50 dark:bg-green-950/30">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-green-700 dark:text-green-400">Live</span>
                        </Badge>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const Icon = link.icon
                            return (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={() => scrollToSection(link.href)}
                                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors relative group"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{link.label}</span>
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="gradient"
                                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg"
                                onClick={() => scrollToSection('#scam-analyzer')}
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Analyze Now
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg border-t border-primary/10"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => {
                                const Icon = link.icon
                                return (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            onClick={() => scrollToSection(link.href)}
                                            className="w-full justify-start gap-3 text-base"
                                        >
                                            <Icon className="w-5 h-5" />
                                            {link.label}
                                        </Button>
                                    </motion.div>
                                )
                            })}
                            <div className="pt-4 border-t border-border space-y-2">
                                <Button
                                    variant="gradient"
                                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                                    onClick={() => scrollToSection('#scam-analyzer')}
                                >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Analyze Now
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
