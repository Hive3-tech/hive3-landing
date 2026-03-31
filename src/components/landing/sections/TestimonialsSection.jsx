import { Reveal } from '../Reveal';
import { SectionLabel } from '../SectionLabel';

function distributeRows(items, rowCount) {
  const rows = Array.from({ length: rowCount }, () => []);

  items.forEach((item, index) => {
    rows[index % rowCount].push(item);
  });

  return rows;
}

export function TestimonialsSection({ communityShowcase, testimonials }) {
  const communityRows = distributeRows(communityShowcase, 3);

  return (
    <section className="testimonials-wrapper section-bleed" id="testimonials">
      <div className="container testimonials-inner">
        <Reveal className="testimonials-header">
          <div>
            <SectionLabel>Community</SectionLabel>
            <h2 className="section-title">You&apos;re in Good Company</h2>
          </div>
          <p className="testimonials-sub">
            Tested by users in 75+ countries. Gaming companies, web3 organizations and web2 brands.
          </p>
        </Reveal>

        <Reveal className="community-carousel" delay={40}>
          {communityRows.map((row, rowIndex) => (
            <div className="community-row" key={`community-row-${rowIndex}`}>
              <div className={`community-track ${rowIndex % 2 === 1 ? 'is-reverse' : ''}`}>
                {[...row, ...row].map((community, itemIndex) => (
                  <article
                    className={`community-card ${
                      community.fit === 'contain' ? 'is-contained' : ''
                    }`}
                    key={`${community.id || community.image}-${rowIndex}-${itemIndex}`}
                  >
                    <img
                      className={`community-card-image ${
                        community.fit === 'contain' ? 'is-contained' : ''
                      }`}
                      src={community.image}
                      alt={community.alt || community.name || 'Community showcase logo'}
                      loading="lazy"
                    />
                    <div className="community-card-overlay"></div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="testimonials-grid" delay={80}>
          {testimonials.map(testimonial => (
            <article className="testi-card" key={testimonial.name}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">&quot;{testimonial.quote}&quot;</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
