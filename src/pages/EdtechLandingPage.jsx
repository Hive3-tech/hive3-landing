import { useState } from 'react'
import { ConstellationMap } from '../components/landing/ConstellationMap'
import { SiteFooter } from '../components/landing/SiteFooter'
import { SiteHeader } from '../components/landing/SiteHeader'
import { Reveal } from '../components/landing/Reveal'
import { SectionLabel } from '../components/landing/SectionLabel'
import {
  edtechComparePanels,
  edtechEquationSteps,
  edtechFinalCta,
  edtechFooterColumns,
  edtechFooterMeta,
  edtechFlywheelNodes,
  edtechFlywheelSection,
  edtechFlywheelSteps,
  edtechHero,
  edtechHeroPills,
  edtechHeroTickerItems,
  edtechManifesto,
  edtechMechanismCards,
  edtechMechanismsSection,
  edtechNavLinks,
  edtechOpportunitySection,
  edtechProofRails,
  edtechProofSection,
  edtechProblemCards,
  edtechProblemSection,
  edtechStats,
  socialLinks,
} from '../data/edtechLandingContent'
import { useLandingPageEffects } from '../hooks/useLandingPageEffects'

const APP_LOGIN_URL = 'https://app.hive3.tech/login'

function EdtechProblemCard({ icon, title, description, delay }) {
  return (
    <Reveal className="edtech-problem-card" delay={delay}>
      <article>
        <div className="edtech-problem-icon" aria-hidden="true">
          {icon}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </article>
    </Reveal>
  )
}

function EdtechComparePanel({ panel, delay }) {
  return (
    <Reveal className={`edtech-compare-panel is-${panel.variant}`} delay={delay}>
      <article>
        <div className={`edtech-compare-head is-${panel.variant}`}>{panel.title}</div>
        <div className="edtech-compare-items">
          {panel.items.map((item) => (
            <div className="edtech-compare-item" key={item}>
              <span className="edtech-compare-icon" aria-hidden="true">
                {panel.variant === 'good' ? '✓' : '✕'}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  )
}

function EdtechMechanismCard({ card, delay }) {
  return (
    <Reveal className="edtech-mechanism-card" delay={delay}>
      <article>
        <div className="edtech-mechanism-top">
          <div className="edtech-mechanism-number">{card.number}</div>
          <div className="edtech-mechanism-icon" aria-hidden="true">
            {card.icon}
          </div>
        </div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className="edtech-mechanism-badge">{card.badge}</div>
      </article>
    </Reveal>
  )
}

function EdtechFlywheelStep({ step, delay }) {
  return (
    <Reveal className="edtech-flywheel-step" delay={delay}>
      <article>
        <span className="edtech-flywheel-step-number">{step.number} -</span>
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </article>
    </Reveal>
  )
}

function EdtechStatCell({ stat, delay }) {
  return (
    <Reveal className="edtech-stat-cell" delay={delay}>
      <article>
        <span className="edtech-stat-value">{stat.value}</span>
        <span className="edtech-stat-label">{stat.label}</span>
      </article>
    </Reveal>
  )
}

export function EdtechLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useLandingPageEffects(0)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page-shell edtech-page" id="top">
      <SiteHeader
        navLinks={edtechNavLinks}
        menuOpen={menuOpen}
        onCloseMenu={closeMenu}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        appLoginUrl={APP_LOGIN_URL}
        primaryCtaLabel="Get early access"
        secondaryCtaLabel="Main app"
      />

      <main>
        <section className="edtech-hero hero section-bleed">
          <div className="hero-hex-bg" aria-hidden="true">
            <svg className="hex-grid" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="edtechHexPat" x="0" y="0" width="80" height="92" patternUnits="userSpaceOnUse">
                  <polygon
                    points="40,4 76,24 76,68 40,88 4,68 4,24"
                    fill="none"
                    stroke="#f5c842"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="1200" height="800" fill="url(#edtechHexPat)" />
            </svg>
          </div>
          <div className="container edtech-hero-inner">
            <Reveal className="edtech-hero-copy">
              <div className="hero-eyebrow edtech-hero-eyebrow">
                <span className="hero-eyebrow-dot"></span>
                {edtechHero.eyebrow}
              </div>
              <h1 className="edtech-hero-title">
                {edtechHero.titleLeading} <span>{edtechHero.titleAccent}</span>
                <br />
                {edtechHero.titleTrailing}
              </h1>
              <p className="hero-sub edtech-hero-sub">{edtechHero.description}</p>
              <div className="edtech-hero-ctas">
                <a className="btn btn-hero" href={APP_LOGIN_URL} target="_blank" rel="noreferrer">
                  {edtechHero.primaryCtaLabel} <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn-hero-ghost" href="#opportunity">
                  {edtechHero.secondaryCtaLabel}
                </a>
              </div>
            </Reveal>

            <Reveal className="edtech-pill-grid" delay={120}>
              {edtechHeroPills.map((pill) => (
                <div className="edtech-pill-flow" key={pill.label}>
                  <div className="edtech-pill">
                    <span aria-hidden="true">{pill.icon}</span>
                    <span>{pill.label}</span>
                  </div>
                  {pill.label !== edtechHeroPills[edtechHeroPills.length - 1].label ? (
                    <span className="edtech-pill-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <div className="ticker-wrap edtech-ticker-wrap" aria-label="Edtech narrative highlights">
          <div className="ticker-inner">
            {[...edtechHeroTickerItems, ...edtechHeroTickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>
                <span className="ticker-dot"></span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="edtech-problem-section section" id="problem">
          <div className="container">
            <Reveal className="edtech-section-intro">
              <SectionLabel centered>{edtechProblemSection.eyebrow}</SectionLabel>
              <h2 className="section-title edtech-centered-title">
                {edtechProblemSection.title}
              </h2>
              <p className="section-sub centered-copy">
                {edtechProblemSection.description}
              </p>
            </Reveal>

            <div className="edtech-problem-grid">
              {edtechProblemCards.map((card, index) => (
                <EdtechProblemCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  delay={index * 70}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="edtech-opportunity-section section section-bleed" id="opportunity">
          <div className="container">
            <Reveal className="edtech-section-intro">
              <SectionLabel centered>{edtechOpportunitySection.eyebrow}</SectionLabel>
              <h2 className="section-title edtech-centered-title">
                {edtechOpportunitySection.title}
              </h2>
              <p className="section-sub centered-copy">
                {edtechOpportunitySection.description}
              </p>
            </Reveal>

            <Reveal className="edtech-equation-grid" delay={80}>
              {edtechEquationSteps.map((step) => (
                <article className="edtech-equation-card" key={`${step.from}-${step.to}`}>
                  <div className="edtech-equation-top">
                    <span className="edtech-equation-from">{step.from}</span>
                    <span className="edtech-equation-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="edtech-equation-to">{step.to}</span>
                  </div>
                  <div className="edtech-equation-tag">{step.tag}</div>
                </article>
              ))}
            </Reveal>

            <div className="edtech-compare-grid">
              {edtechComparePanels.map((panel, index) => (
                <EdtechComparePanel key={panel.title} panel={panel} delay={index * 80} />
              ))}
            </div>
          </div>
        </section>

        <section className="edtech-system-section section" id="system">
          <div className="container">
            <Reveal className="edtech-section-intro">
              <SectionLabel centered>{edtechMechanismsSection.eyebrow}</SectionLabel>
              <h2 className="section-title edtech-centered-title">
                {edtechMechanismsSection.title}
              </h2>
              <p className="section-sub centered-copy">
                {edtechMechanismsSection.description}
              </p>
            </Reveal>

            <div className="edtech-mechanism-grid">
              {edtechMechanismCards.map((card, index) => (
                <EdtechMechanismCard key={card.number} card={card} delay={index * 55} />
              ))}
            </div>

            <section className="edtech-proof-block section-bleed" aria-labelledby="edtech-proof-heading">
              <div className="edtech-proof-layout">
                <Reveal>
                  <div className="edtech-proof-copy">
                    <SectionLabel>{edtechProofSection.eyebrow}</SectionLabel>
                    <h3 className="section-title edtech-proof-title" id="edtech-proof-heading">
                      {edtechProofSection.title}
                    </h3>
                    <p className="section-sub section-sub-spaced">
                      {edtechProofSection.description}
                    </p>
                    <div className="edtech-proof-rail-grid">
                      {edtechProofRails.map((rail) => (
                        <article className="edtech-proof-rail" key={rail.title}>
                          <div className="edtech-proof-rail-icon" aria-hidden="true">
                            {rail.icon}
                          </div>
                          <div>
                            <h4>{rail.title}</h4>
                            <p>{rail.description}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={110}>
                  <div className="edtech-proof-visual-card">
                    <div className="edtech-proof-visual-label">{edtechProofSection.visualLabel}</div>
                    <div className="edtech-proof-screen">
                      <img
                        src="/screenshots/hivemind-analytics.png"
                        alt="HiveMind analytics dashboard showing participation and growth signals."
                        loading="lazy"
                      />
                    </div>
                    <p className="edtech-proof-visual-caption">
                      {edtechProofSection.visualCaption}
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          </div>
        </section>

        <section className="edtech-flywheel-section section section-bleed" id="flywheel">
          <div className="container edtech-flywheel-layout">
            <div>
              <Reveal className="edtech-flywheel-intro">
                <SectionLabel>{edtechFlywheelSection.eyebrow}</SectionLabel>
                <h2 className="section-title edtech-flywheel-title">
                  {edtechFlywheelSection.title}
                </h2>
                <p className="section-sub">{edtechFlywheelSection.description}</p>
              </Reveal>

              <div className="edtech-flywheel-steps">
                {edtechFlywheelSteps.map((step, index) => (
                  <EdtechFlywheelStep key={step.number} step={step} delay={index * 65} />
                ))}
              </div>
            </div>

            <Reveal className="edtech-flywheel-visual" delay={120}>
              <div className="constellation-wrapper edtech-flywheel-graph">
                <ConstellationMap
                  nodes={edtechFlywheelNodes}
                  centerEyebrow="Hive3"
                  centerTitle="Participation Graph"
                  persistentLabels
                />
              </div>
              <p className="edtech-flywheel-caption">{edtechFlywheelSection.caption}</p>
            </Reveal>
          </div>
        </section>

        <section className="edtech-manifesto-section section-bleed" aria-labelledby="edtech-manifesto-heading">
          <div className="container">
            <Reveal className="edtech-manifesto-card">
              <h2 className="edtech-manifesto-text" id="edtech-manifesto-heading">
                The future of education
                <br />
                <span>isn't better courses.</span>
                <br />
                It's systems that <em>verify</em> and
                <br />
                monetize real-world participation.
              </h2>
              <p className="edtech-manifesto-sub">{edtechManifesto.subtext}</p>
            </Reveal>
          </div>
        </section>

        <section className="edtech-stats-section section" aria-labelledby="edtech-stats-heading">
          <div className="container">
            <Reveal className="edtech-stats-intro">
              <SectionLabel centered>Closing Proof</SectionLabel>
              <h2 className="section-title edtech-centered-title" id="edtech-stats-heading">
                The system is designed to turn verified participation into measurable trust.
              </h2>
            </Reveal>

            <div className="edtech-stats-grid">
              {edtechStats.map((stat, index) => (
                <EdtechStatCell key={stat.label} stat={stat} delay={index * 70} />
              ))}
            </div>
          </div>
        </section>

        <section className="edtech-route-note section-bleed" id="cta">
          <div className="container">
            <Reveal className="edtech-route-note-card">
              <div>
                <SectionLabel>{edtechFinalCta.eyebrow}</SectionLabel>
                <h2 className="section-title">{edtechFinalCta.title}</h2>
                <p className="section-sub">{edtechFinalCta.description}</p>
              </div>
              <div className="edtech-route-note-links">
                <a className="btn btn-primary" href={APP_LOGIN_URL} target="_blank" rel="noreferrer">
                  {edtechFinalCta.primaryCtaLabel}
                </a>
                <a className="btn btn-ghost" href={edtechFinalCta.secondaryCtaHref}>
                  {edtechFinalCta.secondaryCtaLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter
        footerColumns={edtechFooterColumns}
        socialLinks={socialLinks}
        brandDescription={edtechFooterMeta.brandDescription}
        copyrightText={edtechFooterMeta.copyrightText}
      />
    </div>
  )
}
