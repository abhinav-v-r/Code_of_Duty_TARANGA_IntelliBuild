import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ExtensionDownload } from '@/components/extension-download'
import { ScamAnalyzer } from '@/components/scam-analyzer'
import { FeatureCards } from '@/components/feature-cards'
import { EducationalSection } from '@/components/educational-section'
import { ImpactSection } from '@/components/impact-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <HeroSection />
                <ExtensionDownload />
                <ScamAnalyzer />
                <FeatureCards />
                <EducationalSection />
                <ImpactSection />
                <Footer />
            </main>
        </>
    )
}
