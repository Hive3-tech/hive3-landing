import { Reveal } from '../Reveal'

export function HeroSection({ avatarBadges, rotatingWord, tickerItems, trustItems }) {
  return (
    <>
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
          <Reveal className="hero-eyebrow" delay={0}>
            <span className="hero-eyebrow-dot"></span>
            NOW IN OPEN BETA — JOIN TODAY
          </Reveal>

          <Reveal as="h1" className="hero-title" delay={80}>
            Hive3 is Where
            <span className="hero-title-line2">
              <span className="rotating-word">
                <span key={rotatingWord} className="rotating-word-text">
                  {rotatingWord}
                </span>
              </span>
            </span>
            <span className="hero-title-line3">
              Thrive <span className="hero-title-nowrap">On-Chain</span>
            </span>
          </Reveal>

          <Reveal as="p" className="hero-sub" delay={140}>
            Build, own, and monetize your community with real Web3 ownership. No
            algorithms, no intermediaries, no limits.
          </Reveal>

          <Reveal className="hero-ctas" delay={200}>
            <a className="btn btn-hero" href="#cta">
              Start for free <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-hero-ghost" href="#features">
              Watch demo <span aria-hidden="true">▶</span>
            </a>
          </Reveal>
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
    </>
  )
}
