import { ConstellationMap } from '../ConstellationMap';
import { Reveal } from '../Reveal';

export function Web3Section({ web3Networks, web3Pillars }) {
  return (
    <section className="section section-tight" id="web3">
      <div className="container">
        {/* Original Banner */}
        <Reveal>
          <div className="web3-banner">
            <div>
              <div className="web3-tag">⬡ WEB3-NATIVE</div>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                Your Community.
                <br />
                <em>On-Chain.</em>
              </h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>
                Hive3 is the only community platform built from the ground up for the decenralized
                web. Real ownership, real data soveregnty, endless monetization
              </p>
            </div>
            <div className="web3-pillars">
              {web3Pillars.map(pillar => (
                <div className="web3-pillar" key={pillar.title}>
                  <div className="web3-pillar-icon">{pillar.icon}</div>
                  <div>
                    <div className="web3-pillar-title">{pillar.title}</div>
                    <div className="web3-pillar-desc">{pillar.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Constellation Web - Full Width */}
        <Reveal>
          <div className="web3-ecosystem-block">
            <div className="web3-ecosystem-header">
              <h3 className="web3-ecosystem-title">Blockchain agnostic from day one.</h3>
            </div>
            <div className="constellation-wrapper">
              <ConstellationMap nodes={web3Networks} />
            </div>
          </div>
        </Reveal>

        {/* Coming Soon Chains */}
        <Reveal>
          <div className="coming-soon-section">
            <span className="coming-soon-label">Coming Soon</span>
            <div className="coming-soon-chains">
              {[
                { name: 'Solana', icon: '/network-icons/solana.svg' },
                { name: 'Hyperliquid', icon: '/network-icons/hyperliquid.svg' },
                { name: 'BNB', icon: '/network-icons/bnb.svg' },
              ].map(chain => (
                <div key={chain.name} className="constellation-node coming-soon-node">
                  <div className="constellation-node-glow" />
                  <div className="constellation-node-icon-wrap">
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="constellation-node-icon"
                      loading="lazy"
                    />
                  </div>
                  <span className="constellation-node-name">{chain.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
