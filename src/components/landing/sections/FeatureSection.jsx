import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';

export function FeatureSection({ featureCards }) {
  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal className="features-header">
          <div>
            <SectionLabel>Platform</SectionLabel>
            <h2 className="section-title">
              One Platform, <em>Infinite</em> Ways to Build
            </h2>
            <p className="section-sub">
              Everything your community needs: feeds, events, media, education, virtual spaces, and
              real revenue tools in one Web3 platform.
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
                    Just launched our token-gated alpha. Early members get exclusive access to the
                    founders round.
                  </div>
                  <div className="mock-stats-row">
                    <span className="mock-stat-pill">❤️ 48</span>
                    <span className="mock-stat-pill">💬 12</span>
                    <span className="mock-stat-pill">🔗 On-chain</span>
                  </div>
                </div>
              </div>

              <div className="mock-feed-item">
                <div className="mock-av" style={{ backgroundColor: '#4f8eff', color: '#ffffff' }}>
                  JR
                </div>
                <div className="mock-post-body">
                  <div className="mock-post-name">
                    Jakub R. <span>· 14m ago</span>
                  </div>
                  <div className="mock-post-text">
                    New event: Web3 Builders Night, Malta. RSVP now, spots limited to token holders.
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
                  <strong>86%</strong>
                  <span>Retention</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="features-grid" delay={80}>
          {featureCards.map(feature => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="feature-name">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
