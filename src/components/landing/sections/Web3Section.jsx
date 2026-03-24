import { Reveal } from '../Reveal'

export function Web3Section({ web3Pillars }) {
  return (
    <section className="section section-tight" id="web3">
      <div className="container">
        <Reveal className="web3-banner">
          <div>
            <div className="web3-tag">⬡ WEB3-NATIVE</div>
            <h2 className="section-title">
              Your Community.
              <br />
              <em>On-Chain.</em>
            </h2>
            <p className="section-sub">
              Hive3 is the only community platform built from the ground up for the
              decentralized web. Real ownership, real data sovereignty, real value.
            </p>
          </div>

          <div className="web3-pillars">
            {web3Pillars.map((pillar) => (
              <article className="web3-pillar" key={pillar.title}>
                <div className="web3-pillar-icon" aria-hidden="true">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="web3-pillar-title">{pillar.title}</h3>
                  <p className="web3-pillar-desc">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
