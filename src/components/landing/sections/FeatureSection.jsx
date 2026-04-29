import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';
import { WorldVideoPreview } from '../WorldVideoPreview';

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
              Built for Communities That Want More. Your own private social network, integrated
              multi-channel communication, events, media, education, 3D virtual spaces, and real
              revenue tools — all in one place. No patchwork of apps. No limits on what you can
              build.
            </p>
          </div>

          <div className="mock-ui">
            <div className="mock-topbar">
              <div className="mock-dot mock-dot-r"></div>
              <div className="mock-dot mock-dot-y"></div>
              <div className="mock-dot mock-dot-g"></div>
              <div className="mock-url">app.hive3.tech/community</div>
            </div>
            <div className="mock-content mock-content-video">
              <WorldVideoPreview />
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
