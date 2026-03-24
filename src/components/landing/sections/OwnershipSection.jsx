import { Reveal } from '../Reveal'
import { SectionLabel } from '../SectionLabel'

export function OwnershipSection({ ownershipCards }) {
  return (
    <section className="section" id="ownership">
      <div className="container">
        <Reveal className="section-header-centered">
          <SectionLabel centered>Ownership</SectionLabel>
          <h2 className="section-title">
            Your Community. Your Brand.
            <br />
            <em>Your Rules.</em>
          </h2>
        </Reveal>

        <Reveal className="ownership-grid" delay={80}>
          {ownershipCards.map((card) => (
            <article className="own-card" key={card.title}>
              <span className="own-card-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="own-card-title">{card.title}</h3>
              <p className="own-card-desc">{card.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
