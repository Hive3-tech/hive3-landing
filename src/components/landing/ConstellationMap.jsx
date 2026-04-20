import { useEffect, useMemo, useRef } from 'react'

export function ConstellationMap({
  nodes: rawNodes,
  centerImageSrc = '/hive3-sign.png',
  centerImageAlt = 'Hive3',
  centerEyebrow,
  centerTitle,
  persistentLabels = false,
}) {
  const containerRef = useRef(null)
  const nodeRefs = useRef([])
  const nodes = useMemo(
    () =>
      rawNodes.map((node, i) => ({
        ...node,
        animDelay: -(i * 1.15),
        animDuration: 6.6 + (i % 4) * 1.1,
        floatX: [10, -8, 9, -7, 0, 8, -10, 7][i % 8],
        floatY: [-8, 7, 6, -9, 10, -7, 5, 9][i % 8],
      })),
    [rawNodes],
  )

  useEffect(() => {
    const container = containerRef.current

    if (!container || !nodes.length) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      nodeRefs.current.forEach((node) => {
        node?.style.setProperty('--repel-x', '0px')
        node?.style.setProperty('--repel-y', '0px')
      })
      return undefined
    }

    const pointer = { active: false, x: 0, y: 0 }
    const motion = nodes.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
    let frameId = 0
    let lastTimestamp = performance.now()

    const animate = (timestamp) => {
      const rect = container.getBoundingClientRect()
      const elapsed = Math.min((timestamp - lastTimestamp) / 16.6667, 1.6)

      lastTimestamp = timestamp

      const influenceRadius = Math.max(140, Math.min(rect.width * 0.24, 220))
      const maxOffset = rect.width < 900 ? 18 : 26

      nodes.forEach((node, index) => {
        const state = motion[index]
        let targetX = 0
        let targetY = 0

        if (pointer.active) {
          const anchorX = rect.width * (node.x / 100)
          const anchorY = rect.height * (node.y / 100)
          const dx = anchorX - pointer.x
          const dy = anchorY - pointer.y
          const distance = Math.hypot(dx, dy) || 1

          if (distance < influenceRadius) {
            const force = ((influenceRadius - distance) / influenceRadius) ** 2

            targetX = (dx / distance) * force * maxOffset
            targetY = (dy / distance) * force * maxOffset
          }
        }

        state.vx += (targetX - state.x) * 0.15 * elapsed
        state.vy += (targetY - state.y) * 0.15 * elapsed
        state.vx *= 0.78
        state.vy *= 0.78
        state.x += state.vx * elapsed
        state.y += state.vy * elapsed

        nodeRefs.current[index]?.style.setProperty('--repel-x', `${state.x.toFixed(2)}px`)
        nodeRefs.current[index]?.style.setProperty('--repel-y', `${state.y.toFixed(2)}px`)
      })

      frameId = window.requestAnimationFrame(animate)
    }

    const updatePointer = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        pointer.active = false
        return
      }

      const rect = container.getBoundingClientRect()
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom

      pointer.active = insideX && insideY
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const clearPointer = () => {
      pointer.active = false
    }

    container.addEventListener('pointermove', updatePointer, { passive: true })
    container.addEventListener('pointerleave', clearPointer)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      container.removeEventListener('pointermove', updatePointer)
      container.removeEventListener('pointerleave', clearPointer)
    }
  }, [nodes])

  const centerClasses = ['constellation-center-hub']

  if (centerEyebrow || centerTitle) {
    centerClasses.push('is-textual')
  }

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

        <circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#centerGlow)"
          className="constellation-center-glow"
        />

        {nodes.map((node) => (
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

        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length]
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
          )
        })}
      </svg>

      <div className="constellation-center">
        <div className="constellation-center-orbit constellation-center-orbit-outer" />
        <div className="constellation-center-orbit constellation-center-orbit-inner" />
        <div className="constellation-center-ring" />
        <div className={centerClasses.join(' ')}>
          {centerImageSrc ? (
            <img src={centerImageSrc} alt={centerImageAlt} className="constellation-center-logo" />
          ) : null}
          {centerEyebrow ? (
            <span className="constellation-center-eyebrow">{centerEyebrow}</span>
          ) : null}
          {centerTitle ? (
            <span className="constellation-center-title">{centerTitle}</span>
          ) : null}
        </div>
      </div>

      {nodes.map((node, index) => (
        <div
          key={node.name}
          className="constellation-node"
          ref={(element) => {
            nodeRefs.current[index] = element
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
            {node.icon ? (
              <img
                src={node.icon}
                alt={node.name}
                className="constellation-node-icon"
                loading="lazy"
              />
            ) : (
              <span className="constellation-node-glyph" aria-hidden="true">
                {node.glyph}
              </span>
            )}
          </div>
          <span className={`constellation-node-name${persistentLabels ? ' is-visible' : ''}`}>
            {node.name}
          </span>
        </div>
      ))}
    </div>
  )
}
