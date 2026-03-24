import { Reveal } from '../Reveal'
import { SectionLabel } from '../SectionLabel'

export function AiSection({ aiFeatures }) {
  return (
    <section className="ai-section section-bleed" id="ai">
      <div className="container ai-grid">
        <Reveal>
          <SectionLabel>AI-Powered</SectionLabel>
          <h2 className="section-title">
            Harness AI to <em>Grow Faster</em>
          </h2>
          <p className="section-sub section-sub-spaced">
            Intelligent tools that help you attract the right members, create
            better content, and grow your community on autopilot.
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
        </Reveal>

        <Reveal delay={100}>
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
        </Reveal>
      </div>
    </section>
  )
}
