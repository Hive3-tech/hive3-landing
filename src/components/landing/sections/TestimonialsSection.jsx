import { Reveal } from '../Reveal'
import { SectionLabel } from '../SectionLabel'

export function TestimonialsSection({ testimonials }) {
  return (
    <section className="testimonials-wrapper section-bleed" id="testimonials">
      <div className="container testimonials-inner">
        <Reveal className="testimonials-header">
          <div>
            <SectionLabel>Community</SectionLabel>
            <h2 className="section-title">You&apos;re in Good Company</h2>
          </div>
          <p className="testimonials-sub">
            Trusted by creators, DAOs, and community builders across 40+ countries.
          </p>
        </Reveal>

        <Reveal className="testimonials-grid" delay={80}>
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
        </Reveal>
      </div>
    </section>
  )
}
