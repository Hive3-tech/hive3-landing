import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';

export function MonetizeSection({ revenueCards }) {
  return (
    <section className="section" id="monetize">
      <div className="container">
        <Reveal className="monetize-grid">
          <div>
            <SectionLabel>Revenue</SectionLabel>
            <h2 className="section-title">
              Turn Your Community Into a <em>Revenue Machine</em>
            </h2>
            <p className="section-sub section-sub-spaced">
              Sell memberships, premium content, events, courses, content, and collect rewards.
              Multiple revenue streams, onfrastructure, and community.
            </p>
            <a className="btn btn-hero" href="#cta">
              Start earning <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="monetize-cards">
            {revenueCards.map(card => (
              <article className="mono-card" key={card.title}>
                <span className="mono-card-icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="mono-card-title">{card.title}</h3>
                <p className="mono-card-desc">{card.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
