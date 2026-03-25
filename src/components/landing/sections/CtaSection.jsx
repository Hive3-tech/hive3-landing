import { Reveal } from '../Reveal'

const APP_LOGIN_URL = 'https://app.hive3.tech/login'

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
          <div className="cta-form">
            <a
              className="btn btn-hero"
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              Get started <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="cta-note">
            Free to start. No credit card required. Cancel anytime.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
