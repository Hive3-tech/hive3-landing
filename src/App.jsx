import { useEffect, useState } from 'react'
import './App.css'
import {
  aiFeatures,
  avatarBadges,
  communityShowcase,
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
  web3Networks,
  web3Pillars,
} from './data/landingContent'
import { SiteFooter } from './components/landing/SiteFooter'
import { SiteHeader } from './components/landing/SiteHeader'
import { TrailerModal } from './components/landing/TrailerModal'
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
  const [trailerOpen, setTrailerOpen] = useState(false)
  const activeWordIndex = useLandingPageEffects(rotatingWords.length)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!window.location.hash) {
      return undefined
    }

    const target = document.querySelector(window.location.hash)
    const scrollFrame = window.requestAnimationFrame(() => {
      target?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(scrollFrame)
  }, [])

  useEffect(() => {
    if (!trailerOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setTrailerOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [trailerOpen])

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
          onOpenTrailer={() => setTrailerOpen(true)}
          rotatingWord={rotatingWords[activeWordIndex]}
          tickerItems={tickerItems}
        />
        <FeatureSection featureCards={featureCards} />
        <MonetizeSection revenueCards={revenueCards} />
        <Web3Section web3Networks={web3Networks} web3Pillars={web3Pillars} />
        <TestimonialsSection
          communityShowcase={communityShowcase}
          testimonials={testimonials}
        />
        <HowItWorksSection steps={steps} />
        <AiSection aiFeatures={aiFeatures} />
        <StatsSection stats={stats} />
        <OwnershipSection ownershipCards={ownershipCards} />
        <CtaSection />
      </main>

      <SiteFooter footerColumns={footerColumns} socialLinks={socialLinks} />
      <TrailerModal isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />
    </div>
  )
}

export default App
