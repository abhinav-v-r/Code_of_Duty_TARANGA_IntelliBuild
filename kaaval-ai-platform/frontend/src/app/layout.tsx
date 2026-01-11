import type { Metadata } from "next"
import { Inter, Outfit, Poppins, Playfair_Display, Space_Grotesk } from "next/font/google"
import "./globals.css"
import FloatingChatbot from "@/components/chatbot/FloatingChatbot"

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
})

const poppins = Poppins({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-playfair',
    display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space',
    display: 'swap',
})

export const metadata: Metadata = {
    title: "Kaaval AI - AI-Powered Scam Detection & Digital Safety Platform",
    description: "Protect yourself from online fraud with advanced AI analysis. Detect scams, learn digital safety, and stay secure in the digital world.",
    keywords: ["scam detection", "digital safety", "fraud prevention", "AI security", "phishing detection", "cybersecurity"],
    authors: [{ name: "Kaaval AI" }],
    creator: "Kaaval AI",
    publisher: "Kaaval AI",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kaavalai.com",
        title: "Kaaval AI - AI-Powered Scam Detection Platform",
        description: "Enterprise-grade AI platform for scam detection, digital literacy, and fraud prevention",
        siteName: "Kaaval AI",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kaaval AI - AI-Powered Scam Detection",
        description: "Protect yourself from online fraud with advanced AI analysis",
        creator: "@kaavalai",
    },
    verification: {
        google: "google-site-verification-code",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} ${playfair.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
                {children}
                <FloatingChatbot />
            </body>
        </html>
    )
}
