import { useMemo } from 'react'
import { Reveal } from '../Reveal'

function ConstellationMap({ web3Networks }) {
  const nodes = useMemo(
    () =>
      web3Networks.map((network, i) => ({
        ...network,
        animDelay: -(i * 1.2),
        animDuration: 7 + (i % 3) * 2,
      })),
    [web3Networks]
  )

  return (
    <div className="constellation-container">
      <svg
        className="constellation-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c842" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f5c842" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#centerGlow)"
          className="constellation-center-glow"
        />

        {/* Lines from center to each node */}
        {nodes.map((node) => (
          <line
            key={`line-${node.name}`}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(245, 200, 66, 0.15)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Ring connections between adjacent nodes */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length]
          return (
            <line
              key={`ring-${node.name}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(79, 142, 255, 0.08)"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>

      {/* Center Hive3 Hub */}
      <div className="constellation-center">
        <div className="constellation-center-ring" />
        <div className="constellation-center-hub">
          <img src="/hive3-sign.png" alt="Hive3" className="constellation-center-logo" />
        </div>
      </div>

      {/* Network Nodes */}
      {nodes.map((node) => (
        <div
          key={node.name}
          className="constellation-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.animDelay}s`,
            animationDuration: `${node.animDuration}s`,
          }}
        >
          <div className="constellation-node-glow" />
          <div className="constellation-node-icon-wrap">
            <img
              src={node.icon}
              alt={node.name}
              className="constellation-node-icon"
              loading="lazy"
            />
          </div>
          <span className="constellation-node-name">{node.name}</span>
        </div>
      ))}
    </div>
  )
}

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
                Hive3 is the only community platform built from the ground up for the decentralized
                web. Real ownership, real data sovereignty, real value.
              </p>
            </div>
            <div className="web3-pillars">
              {web3Pillars.map((pillar) => (
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
          <div className="constellation-wrapper">
            <ConstellationMap web3Networks={web3Networks} />
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
              ].map((chain) => (
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
  )
}
