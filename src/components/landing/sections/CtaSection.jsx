import { Reveal } from '../Reveal'

export function CtaSection() {
  return (
    <section className="cta-section section-bleed" id="cta">
      <div className="container">
        <Reveal>
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
        </Reveal>
      </div>
    </section>
  )
}
