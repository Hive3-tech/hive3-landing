import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';

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
            Intelligent tools that help you attract the right members, create better content,
            sell-out events, minimize churn, and scale globally.
          </p>

          <div className="ai-features">
            {aiFeatures.map(feature => (
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
            <div className="ai-visual-label">HIVE MIND ANALYTICS</div>
            <div className="ai-screen-frame">
              <div className="ai-screen-flip">
                <div className="ai-screen-face ai-screen-face-front">
                  <img
                    className="ai-screen-image"
                    src="/screenshots/hivemind-analytics.png"
                    alt="Hive Mind Analytics dashboard showing member growth, verification, and engagement trends."
                    loading="lazy"
                  />
                </div>
                <div className="ai-screen-face ai-screen-face-back">
                  <img
                    className="ai-screen-image is-heatmap"
                    src="/screenshots/hivemind-analytics-full.png"
                    alt="Hive Mind Analytics dashboard showing heatmap activity patterns and AI approval queue."
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="ai-screen-caption">
              AI-governed community intelligence with growth trends, churn risk, and member
              verification at a glance.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
