import { useEffect, useState } from 'react'
import './App.css'

const navLinks = [
  { href: '#features', label: 'Platform' },
  { href: '#monetize', label: 'Monetize' },
  { href: '#web3', label: 'Web3' },
  { href: '#testimonials', label: 'Community' },
  { href: '#ai', label: 'AI' },
]

const rotatingWords = ['Creators', 'Communities', 'Builders']

const avatarBadges = [
  {
    className: 'badge-1',
    initials: 'SQ',
    name: 'Stacy Q.',
    role: 'Community Builder',
    style: { backgroundColor: '#f5c842' },
  },
  {
    className: 'badge-2',
    initials: 'JR',
    name: 'Jakub R.',
    role: 'Web3 Creator',
    style: { backgroundColor: '#4f8eff', color: '#ffffff' },
  },
  {
    className: 'badge-3',
    initials: 'VK',
    name: 'Vivien K.',
    role: 'Digital Community',
    style: { backgroundColor: '#7b5fff', color: '#ffffff' },
  },
  {
    className: 'badge-4',
    initials: 'GS',
    name: 'Greg S.',
    role: 'DAO Leader',
    style: { backgroundColor: '#2ecc71' },
  },
  {
    className: 'badge-5',
    initials: 'AJ',
    name: 'Ana J.',
    role: 'NFT Creator',
    style: { backgroundColor: '#e74c3c', color: '#ffffff' },
  },
]

const tickerItems = [
  'Own Your Audience',
  'Monetize On-Chain',
  'No Algorithms',
  'Real Community Ownership',
  'Web3-Native Platform',
  'AI-Powered Matchmaking',
  'Token-Gated Access',
  'Decentralized Identity',
]

const trustItems = [
  { icon: '🏆', text: 'CryptoKnights Featured' },
  { icon: '🚀', text: 'SuperCharger Ventures Cohort 6' },
  { icon: '📰', text: 'CoinTelegraph Partner' },
  { icon: '🌐', text: '40+ Countries' },
  { icon: '🔒', text: 'Web3-Native & Secure' },
]

const featureCards = [
  {
    icon: '📡',
    title: 'Community Feeds',
    description:
      'Share updates, spark conversations, and keep your community engaged in a feed you actually own.',
  },
  {
    icon: '🎥',
    title: 'Live Video',
    description:
      'Host meetings, broadcast live, and create high-value live experiences for your members.',
  },
  {
    icon: '🗂️',
    title: 'Media Center',
    description:
      'Share images, videos, and documents. Build a rich content library your audience can explore.',
  },
  {
    icon: '🗓️',
    title: 'Events',
    description:
      'Host live events, virtual meetups, IRL gatherings, and token-gated experiences.',
  },
  {
    icon: '🏛️',
    title: 'Spaces',
    description:
      'Create focused areas for discussions, projects, and topic-specific collaboration.',
  },
  {
    icon: '💼',
    title: 'Opportunities Board',
    description:
      'Post jobs, partnerships, grants, and deals. Connect your community with real opportunities.',
  },
]

const revenueCards = [
  {
    icon: '🎟️',
    title: 'Memberships',
    description:
      'Sell recurring memberships and create a sustainable income from your community.',
  },
  {
    icon: '🔐',
    title: 'Token-Gated Content',
    description:
      'Gate premium content by NFT ownership, token holdings, or subscription tier.',
  },
  {
    icon: '👑',
    title: 'Premium Tiers',
    description:
      'Offer exclusive rights, early access, and VIP benefits to your top members.',
  },
  {
    icon: '📊',
    title: 'Ads & Sponsorships',
    description:
      'Run community-native ads and sponsorships on your own terms, keeping control.',
  },
]

const web3Pillars = [
  {
    icon: '🔑',
    title: 'Decentralized Identity',
    description:
      'Members own their identity via wallet-based auth. No lock-in.',
  },
  {
    icon: '🪙',
    title: 'Token-Gated Access',
    description:
      'Control access with NFT or token requirements at any level.',
  },
  {
    icon: '🗳️',
    title: 'On-Chain Governance',
    description:
      'Let your members vote on decisions. True community-led growth.',
  },
  {
    icon: '🔗',
    title: 'Portable Data & Ownership',
    description:
      'Your data, your members, your content stay portable and yours.',
  },
]

const testimonials = [
  {
    quote:
      "Hive3 gave our DAO a real home. Token-gating, governance, and revenue in one platform. It's exactly what Web3 communities needed.",
    initials: 'JM',
    name: 'Juan M. Cianci',
    org: 'Kosmos Ventures',
    style: { backgroundColor: '#f5c842' },
  },
  {
    quote:
      'The demo day through Hive3 connected us with investors we could never have reached on our own. This platform is a game-changer for Web3 founders.',
    initials: 'VK',
    name: 'Vivien Khoo',
    org: 'Digital Boutique',
    style: { backgroundColor: '#4f8eff', color: '#ffffff' },
  },
  {
    quote:
      'We finally escaped the algorithm. Our community is engaged, our revenue is growing, and we own every bit of it. Hive3 delivered on every promise.',
    initials: 'MK',
    name: 'Mike Kriak',
    org: 'Consensus Mesh',
    style: { backgroundColor: '#7b5fff', color: '#ffffff' },
  },
]

const steps = [
  {
    number: '01',
    title: 'Build',
    description:
      'Customize your community in a few clicks. Set up your branding, token requirements, and membership tiers. Invite your audience with one link.',
  },
  {
    number: '02',
    title: 'Engage',
    description:
      'Share content, run events, spark discussions, and build real relationships under your brand, with no algorithmic interference.',
  },
  {
    number: '03',
    title: 'Monetize',
    description:
      'Sell memberships, gate premium content, run events, or collect tokens. Turn your community into a real, sustainable revenue stream.',
  },
]

const aiFeatures = [
  {
    icon: '🤖',
    title: 'AI Content Production',
    description:
      "Generate engaging posts, newsletters, and announcements tailored to your community's voice and interests.",
  },
  {
    icon: '🧲',
    title: 'Smart Matchmaking',
    description:
      'AI-driven recommendations connect members with the right people, content, and opportunities inside your community.',
  },
  {
    icon: '📈',
    title: 'Growth Analytics',
    description:
      "Real-time insights into engagement, retention, and revenue. Know exactly what's working and what to do next.",
  },
  {
    icon: '🔔',
    title: 'Intelligent Notifications',
    description:
      'Smart push and pull notifications that reach members at the right moment, never spam and always relevant.',
  },
]

const stats = [
  { value: '10k+', label: 'Community members and growing' },
  { value: '40+', label: 'Countries represented globally' },
  { value: '$2M+', label: 'Revenue generated for creators' },
  { value: '170', label: 'Active investor leads in pipeline' },
  { value: '96%', label: 'Member retention rate' },
]

const ownershipCards = [
  {
    icon: '🎨',
    title: 'Full Branding',
    description:
      'Custom domain, colors, logo, and welcome experience. Your platform, your identity.',
  },
  {
    icon: '🗄️',
    title: 'Data Ownership',
    description:
      'You own your member data, content, and analytics. Always exportable, always yours.',
  },
  {
    icon: '🛡️',
    title: 'Content Control',
    description:
      'Moderation tools, posting review, and community guidelines on your terms.',
  },
  {
    icon: '⚙️',
    title: 'Custom Permissions',
    description:
      'Fine-grained roles, access control, and feature toggles across every part of your community.',
  },
]

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Web3 Tools', href: '#web3' },
      { label: 'Monetization', href: '#monetize' },
      { label: 'AI Engine', href: '#ai' },
      { label: 'Ownership', href: '#ownership' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Community', href: '#testimonials' },
      { label: 'Use Cases', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Stats', href: '#stats' },
      { label: 'Get Started', href: '#cta' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Hive3', href: '#top' },
      { label: 'Ownership', href: '#ownership' },
      { label: 'AI', href: '#ai' },
      { label: 'Revenue', href: '#monetize' },
      { label: 'Contact', href: '#cta' },
    ],
  },
]

const socialLinks = [
  { label: 'X', href: '#cta' },
  { label: 'in', href: '#cta' },
  { label: 'IG', href: '#cta' },
  { label: 'Chat', href: '#cta' },
]

function LogoMark() {
  return (
    <svg
      className="nav-logo-hex"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5"
        fill="#f5c842"
        opacity="0.15"
        stroke="#f5c842"
        strokeWidth="1.5"
      />
      <polygon
        points="17,7 27,12.5 27,23.5 17,29 7,23.5 7,12.5"
        fill="#f5c842"
        opacity="0.2"
      />
      <text
        x="17"
        y="22"
        textAnchor="middle"
        fontFamily="Syne"
        fontWeight="800"
        fontSize="13"
        fill="#f5c842"
      >
        H3
      </text>
    </svg>
  )
}

function SectionLabel({ children, centered = false }) {
  return (
    <div className={`section-label${centered ? ' centered' : ''}`}>{children}</div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeWordIndex, setActiveWordIndex] = useState(0)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    if (!elements.length) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveWordIndex((index) => (index + 1) % rotatingWords.length)
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page-shell" id="top">
      <header className="site-nav">
        <div className="nav-shell">
          <a className="nav-logo" href="#top" onClick={closeMenu}>
            <LogoMark />
            <span className="nav-logo-text">
              Hive<span>3</span>
            </span>
          </a>

          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-panel${menuOpen ? ' is-open' : ''}`}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-ctas">
              <a className="btn btn-ghost" href="#cta" onClick={closeMenu}>
                Log in
              </a>
              <a className="btn btn-primary" href="#cta" onClick={closeMenu}>
                Get started <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section-bleed">
          <div className="hero-hex-bg" aria-hidden="true">
            <svg className="hex-grid" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="hexPat"
                  x="0"
                  y="0"
                  width="80"
                  height="92"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="40,4 76,24 76,68 40,88 4,68 4,24"
                    fill="none"
                    stroke="#f5c842"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="1200" height="800" fill="url(#hexPat)" />
            </svg>
          </div>

          <div className="hero-avatars" aria-hidden="true">
            {avatarBadges.map((badge) => (
              <div className={`avatar-badge ${badge.className}`} key={badge.name}>
                <div className="av" style={badge.style}>
                  {badge.initials}
                </div>
                <div>
                  <div className="av-name">{badge.name}</div>
                  <div className="av-role">{badge.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="container hero-content">
            <div className="hero-eyebrow reveal" style={{ '--delay': '0ms' }}>
              <span className="hero-eyebrow-dot"></span>
              NOW IN OPEN BETA — JOIN TODAY
            </div>

            <h1 className="hero-title reveal" style={{ '--delay': '80ms' }}>
              Hive3 is Where
              <span className="hero-title-line2">
                <span className="rotating-word">
                  <span key={rotatingWords[activeWordIndex]} className="rotating-word-text">
                    {rotatingWords[activeWordIndex]}
                  </span>
                </span>
              </span>
              <span className="hero-title-line3">
                Thrive <span className="hero-title-nowrap">On-Chain</span>
              </span>
            </h1>

            <p className="hero-sub reveal" style={{ '--delay': '140ms' }}>
              Build, own, and monetize your community with real Web3 ownership. No
              algorithms, no intermediaries, no limits.
            </p>

            <div className="hero-ctas reveal" style={{ '--delay': '200ms' }}>
              <a className="btn btn-hero" href="#cta">
                Start for free <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn-hero-ghost" href="#features">
                Watch demo <span aria-hidden="true">▶</span>
              </a>
            </div>
          </div>
        </section>

        <div className="ticker-wrap" aria-label="Hive3 highlights">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>
                <span className="ticker-dot"></span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="trust-strip section-bleed" aria-label="Trust indicators">
          <div className="container trust-grid">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.text}>
                <span className="trust-item-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="features-header reveal">
              <div>
                <SectionLabel>Platform</SectionLabel>
                <h2 className="section-title">
                  One Platform, <em>Infinite</em> Ways to Build
                </h2>
                <p className="section-sub">
                  Everything your community needs: feeds, events, media, spaces,
                  and real revenue tools in one Web3-native platform.
                </p>
              </div>

              <div className="mock-ui">
                <div className="mock-topbar">
                  <div className="mock-dot mock-dot-r"></div>
                  <div className="mock-dot mock-dot-y"></div>
                  <div className="mock-dot mock-dot-g"></div>
                  <div className="mock-url">app.hive3.tech/community</div>
                </div>
                <div className="mock-content">
                  <div className="mock-feed-item">
                    <div className="mock-av" style={{ backgroundColor: '#f5c842' }}>
                      SQ
                    </div>
                    <div className="mock-post-body">
                      <div className="mock-post-name">
                        Stacy Q. <span>· 2m ago</span>
                      </div>
                      <div className="mock-post-text">
                        Just launched our token-gated alpha. Early members get
                        exclusive access to the founders round.
                      </div>
                      <div className="mock-stats-row">
                        <span className="mock-stat-pill">❤️ 48</span>
                        <span className="mock-stat-pill">💬 12</span>
                        <span className="mock-stat-pill">🔗 On-chain</span>
                      </div>
                    </div>
                  </div>

                  <div className="mock-feed-item">
                    <div
                      className="mock-av"
                      style={{ backgroundColor: '#4f8eff', color: '#ffffff' }}
                    >
                      JR
                    </div>
                    <div className="mock-post-body">
                      <div className="mock-post-name">
                        Jakub R. <span>· 14m ago</span>
                      </div>
                      <div className="mock-post-text">
                        New event: Web3 Builders Night, Malta. RSVP now, spots
                        limited to token holders.
                      </div>
                      <div className="mock-stats-row">
                        <span className="mock-stat-pill">📅 Event</span>
                        <span className="mock-stat-pill">🎟️ 23 RSVPs</span>
                      </div>
                    </div>
                  </div>

                  <div className="mock-metrics">
                    <div className="mock-metric">
                      <strong>1,240</strong>
                      <span>Members</span>
                    </div>
                    <div className="mock-metric">
                      <strong>$8.2k</strong>
                      <span>Revenue</span>
                    </div>
                    <div className="mock-metric">
                      <strong>96%</strong>
                      <span>Retention</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-grid reveal" style={{ '--delay': '80ms' }}>
              {featureCards.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="feature-name">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="monetize">
          <div className="container monetize-grid reveal">
            <div>
              <SectionLabel>Revenue</SectionLabel>
              <h2 className="section-title">
                Turn Your Community Into a <em>Revenue Machine</em>
              </h2>
              <p className="section-sub section-sub-spaced">
                Sell memberships, gate premium content, run ads, or collect
                tokens. Multiple revenue streams, zero intermediaries.
              </p>
              <a className="btn btn-hero" href="#cta">
                Start earning <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="monetize-cards">
              {revenueCards.map((card) => (
                <article className="mono-card" key={card.title}>
                  <span className="mono-card-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="mono-card-title">{card.title}</h3>
                  <p className="mono-card-desc">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight" id="web3">
          <div className="container">
            <div className="web3-banner reveal">
              <div>
                <div className="web3-tag">⬡ WEB3-NATIVE</div>
                <h2 className="section-title">
                  Your Community.
                  <br />
                  <em>On-Chain.</em>
                </h2>
                <p className="section-sub">
                  Hive3 is the only community platform built from the ground up
                  for the decentralized web. Real ownership, real data
                  sovereignty, real value.
                </p>
              </div>

              <div className="web3-pillars">
                {web3Pillars.map((pillar) => (
                  <article className="web3-pillar" key={pillar.title}>
                    <div className="web3-pillar-icon" aria-hidden="true">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="web3-pillar-title">{pillar.title}</h3>
                      <p className="web3-pillar-desc">{pillar.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-wrapper section-bleed" id="testimonials">
          <div className="container testimonials-inner">
            <div className="testimonials-header reveal">
              <div>
                <SectionLabel>Community</SectionLabel>
                <h2 className="section-title">You&apos;re in Good Company</h2>
              </div>
              <p className="testimonials-sub">
                Trusted by creators, DAOs, and community builders across 40+
                countries.
              </p>
            </div>

            <div className="testimonials-grid reveal" style={{ '--delay': '80ms' }}>
              {testimonials.map((testimonial) => (
                <article className="testi-card" key={testimonial.name}>
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">&quot;{testimonial.quote}&quot;</p>
                  <div className="testi-author">
                    <div className="testi-av" style={testimonial.style}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="testi-name">{testimonial.name}</div>
                      <div className="testi-org">{testimonial.org}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="container">
            <div className="section-header-centered reveal">
              <SectionLabel centered>How it works</SectionLabel>
              <h2 className="section-title">
                Go Live in <em>3 Simple Steps</em>
              </h2>
              <p className="section-sub centered-copy">
                No technical skills required. Launch your community in minutes,
                not months.
              </p>
            </div>

            <div className="steps-grid reveal" style={{ '--delay': '80ms' }}>
              {steps.map((step) => (
                <article className="step-card" key={step.number}>
                  <div className="step-number">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ai-section section-bleed" id="ai">
          <div className="container ai-grid">
            <div className="reveal">
              <SectionLabel>AI-Powered</SectionLabel>
              <h2 className="section-title">
                Harness AI to <em>Grow Faster</em>
              </h2>
              <p className="section-sub section-sub-spaced">
                Intelligent tools that help you attract the right members,
                create better content, and grow your community on autopilot.
              </p>

              <div className="ai-features">
                {aiFeatures.map((feature) => (
                  <article className="ai-feature" key={feature.title}>
                    <div className="ai-feature-icon" aria-hidden="true">
                      {feature.icon}
                    </div>
                    <div className="ai-feature-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ '--delay': '100ms' }}>
              <div className="ai-visual-card">
                <div className="ai-visual-glow"></div>
                <div className="ai-visual-label">AI MATCHING ENGINE</div>
                <div className="ai-match-stack">
                  <div className="ai-match-card">
                    <div className="ai-match-avatar gold">SQ</div>
                    <div className="ai-match-copy">
                      <strong>Stacy Q.</strong>
                      <span>Looking for: Web3 investors</span>
                    </div>
                    <div className="ai-match-badge gold">98% match</div>
                  </div>

                  <div className="ai-match-arrow">↕</div>

                  <div className="ai-match-card connected">
                    <div className="ai-match-avatar blue">YM</div>
                    <div className="ai-match-copy">
                      <strong>Yan Ma</strong>
                      <span>Spartan Group — Seed investor</span>
                    </div>
                    <div className="ai-match-badge blue">Connected</div>
                  </div>

                  <div className="ai-insight-card">
                    <span>AI Insight:</span> Yan&apos;s portfolio aligns with
                    Hive3&apos;s community platform thesis. Warm intro via mutual
                    connection available.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="stats">
          <div className="container">
            <div className="stats-wrapper reveal">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="stat-num">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="ownership">
          <div className="container">
            <div className="section-header-centered reveal">
              <SectionLabel centered>Ownership</SectionLabel>
              <h2 className="section-title">
                Your Community. Your Brand.
                <br />
                <em>Your Rules.</em>
              </h2>
            </div>

            <div className="ownership-grid reveal" style={{ '--delay': '80ms' }}>
              {ownershipCards.map((card) => (
                <article className="own-card" key={card.title}>
                  <span className="own-card-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="own-card-title">{card.title}</h3>
                  <p className="own-card-desc">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section section-bleed" id="cta">
          <div className="container">
            <div className="reveal">
              <h2 className="cta-title">
                Ready to Build Your
                <br />
                <em>On-Chain Community?</em>
              </h2>
              <p className="cta-sub">
                Join thousands of creators and builders who chose ownership over
                algorithms.
              </p>
              <form className="cta-form" onSubmit={(event) => event.preventDefault()}>
                <input
                  type="email"
                  className="cta-input"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-hero">
                  Get started <span aria-hidden="true">→</span>
                </button>
              </form>
              <p className="cta-note">
                Free to start. No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-top">
            <div>
              <a className="nav-logo footer-logo" href="#top">
                <LogoMark />
                <span className="nav-logo-text">
                  Hive<span>3</span>
                </span>
              </a>
              <p className="footer-brand-desc">
                The Web3-native community platform. Build, own, and monetize
                your audience without algorithms or intermediaries.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <div className="footer-col-title">{column.title}</div>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © 2026 Hive3. All rights reserved. Built for the decentralized future.
            </p>
            <div className="footer-socials">
              {socialLinks.map((social) => (
                <a className="social-icon" href={social.href} key={social.label}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
