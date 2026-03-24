import { useState } from 'react'
import './App.css'
import {
  aiFeatures,
  avatarBadges,
  featureCards,
  footerColumns,
  navLinks,
  ownershipCards,
  revenueCards,
  rotatingWords,
  socialLinks,
  stats,
  steps,
  testimonials,
  tickerItems,
  trustItems,
  web3Networks,
  web3Pillars,
} from './data/landingContent'
import { SiteFooter } from './components/landing/SiteFooter'
import { SiteHeader } from './components/landing/SiteHeader'
import { AiSection } from './components/landing/sections/AiSection'
import { CtaSection } from './components/landing/sections/CtaSection'
import { FeatureSection } from './components/landing/sections/FeatureSection'
import { HeroSection } from './components/landing/sections/HeroSection'
import { HowItWorksSection } from './components/landing/sections/HowItWorksSection'
import { MonetizeSection } from './components/landing/sections/MonetizeSection'
import { OwnershipSection } from './components/landing/sections/OwnershipSection'
import { StatsSection } from './components/landing/sections/StatsSection'
import { TestimonialsSection } from './components/landing/sections/TestimonialsSection'
import { Web3Section } from './components/landing/sections/Web3Section'
import { useLandingPageEffects } from './hooks/useLandingPageEffects'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeWordIndex = useLandingPageEffects(rotatingWords.length)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        navLinks={navLinks}
        menuOpen={menuOpen}
        onCloseMenu={closeMenu}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />

      <main>
        <HeroSection
          avatarBadges={avatarBadges}
          rotatingWord={rotatingWords[activeWordIndex]}
          tickerItems={tickerItems}
          trustItems={trustItems}
        />
        <FeatureSection featureCards={featureCards} />
        <MonetizeSection revenueCards={revenueCards} />
        <Web3Section web3Networks={web3Networks} web3Pillars={web3Pillars} />
        <TestimonialsSection testimonials={testimonials} />
        <HowItWorksSection steps={steps} />
        <AiSection aiFeatures={aiFeatures} />
        <StatsSection stats={stats} />
        <OwnershipSection ownershipCards={ownershipCards} />
        <CtaSection />
      </main>

      <SiteFooter footerColumns={footerColumns} socialLinks={socialLinks} />
    </div>
  )
}

export default App
