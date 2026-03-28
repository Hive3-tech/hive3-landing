import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';

export function HowItWorksSection({ steps }) {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <Reveal className="section-header-centered">
          <SectionLabel centered>How it works</SectionLabel>
          <h2 className="section-title">
            Go Live in <em>3 Simple Steps</em>
          </h2>
          <p className="section-sub centered-copy how-it-works-sub">
            No technical skills required. Launch your community in minutes, not months.
          </p>
        </Reveal>

        <Reveal className="steps-grid" delay={80}>
          {steps.map(step => (
            <article className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
