import { useEffect, useMemo, useRef } from 'react';
import { Reveal } from '../Reveal';

function ConstellationMap({ web3Networks }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const nodes = useMemo(
    () =>
      web3Networks.map((network, i) => ({
        ...network,
        animDelay: -(i * 1.15),
        animDuration: 6.6 + (i % 4) * 1.1,
        floatX: [10, -8, 9, -7, 0, 8, -10, 7][i % 8],
        floatY: [-8, 7, 6, -9, 10, -7, 5, 9][i % 8],
      })),
    [web3Networks]
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !nodes.length) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      nodeRefs.current.forEach(node => {
        node?.style.setProperty('--repel-x', '0px');
        node?.style.setProperty('--repel-y', '0px');
      });
      return undefined;
    }

    const pointer = { active: false, x: 0, y: 0 };
    const motion = nodes.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
    let frameId = 0;
    let lastTimestamp = performance.now();

    const animate = timestamp => {
      const rect = container.getBoundingClientRect();
      const elapsed = Math.min((timestamp - lastTimestamp) / 16.6667, 1.6);

      lastTimestamp = timestamp;

      const influenceRadius = Math.max(140, Math.min(rect.width * 0.24, 220));
      const maxOffset = rect.width < 900 ? 18 : 26;

      nodes.forEach((node, index) => {
        const state = motion[index];
        let targetX = 0;
        let targetY = 0;

        if (pointer.active) {
          const anchorX = rect.width * (node.x / 100);
          const anchorY = rect.height * (node.y / 100);
          const dx = anchorX - pointer.x;
          const dy = anchorY - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < influenceRadius) {
            const force = ((influenceRadius - distance) / influenceRadius) ** 2;

            targetX = (dx / distance) * force * maxOffset;
            targetY = (dy / distance) * force * maxOffset;
          }
        }

        state.vx += (targetX - state.x) * 0.15 * elapsed;
        state.vy += (targetY - state.y) * 0.15 * elapsed;
        state.vx *= 0.78;
        state.vy *= 0.78;
        state.x += state.vx * elapsed;
        state.y += state.vy * elapsed;

        nodeRefs.current[index]?.style.setProperty('--repel-x', `${state.x.toFixed(2)}px`);
        nodeRefs.current[index]?.style.setProperty('--repel-y', `${state.y.toFixed(2)}px`);
      });

      frameId = window.requestAnimationFrame(animate);
    };

    const updatePointer = event => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        pointer.active = false;
        return;
      }

      const rect = container.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;

      pointer.active = insideX && insideY;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    container.addEventListener('pointermove', updatePointer, { passive: true });
    container.addEventListener('pointerleave', clearPointer);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      container.removeEventListener('pointermove', updatePointer);
      container.removeEventListener('pointerleave', clearPointer);
    };
  }, [nodes]);

  return (
    <div className="constellation-container" ref={containerRef}>
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
        {nodes.map(node => (
          <line
            key={`line-${node.name}`}
            className="constellation-spoke"
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${Math.abs(node.animDelay) * 0.35}s` }}
          />
        ))}

        {/* Ring connections between adjacent nodes */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`ring-${node.name}`}
              className="constellation-ring-link"
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          );
        })}
      </svg>

      {/* Center Hive3 Hub */}
      <div className="constellation-center">
        <div className="constellation-center-orbit constellation-center-orbit-outer" />
        <div className="constellation-center-orbit constellation-center-orbit-inner" />
        <div className="constellation-center-ring" />
        <div className="constellation-center-hub">
          <img src="/hive3-sign.png" alt="Hive3" className="constellation-center-logo" />
        </div>
      </div>

      {/* Network Nodes */}
      {nodes.map((node, index) => (
        <div
          key={node.name}
          className="constellation-node"
          ref={element => {
            nodeRefs.current[index] = element;
          }}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            '--node-delay': `${node.animDelay}s`,
            '--float-duration': `${node.animDuration}s`,
            '--float-x': `${node.floatX}px`,
            '--float-y': `${node.floatY}px`,
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
  );
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
              <ConstellationMap web3Networks={web3Networks} />
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
