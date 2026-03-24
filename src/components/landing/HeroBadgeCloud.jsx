import { useEffect, useMemo, useRef, useState } from 'react'

const BADGE_SLOTS = [
  { x: 15, y: 22 },
  { x: 85, y: 22 },
  { x: 15, y: 72 },
  { x: 85, y: 72 },
  { x: 26, y: 31 },
  { x: 74, y: 31 },
  { x: 26, y: 83 },
  { x: 74, y: 83 },
  { x: 32, y: 20 },
  { x: 68, y: 20 },
  { x: 32, y: 63 },
  { x: 68, y: 63 },
  { x: 20, y: 41 },
  { x: 80, y: 41 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getVisibleBadgeCount(viewportWidth) {
  if (viewportWidth <= 720) {
    return 5
  }

  if (viewportWidth <= 1080) {
    return 9
  }

  return BADGE_SLOTS.length
}

function buildAvoidRect(containerRect, avoidElement) {
  if (!avoidElement) {
    return null
  }

  const avoidRect = avoidElement.getBoundingClientRect()

  return {
    left: avoidRect.left - containerRect.left - 56,
    right: avoidRect.right - containerRect.left + 56,
    top: avoidRect.top - containerRect.top - 48,
    bottom: avoidRect.bottom - containerRect.top + 48,
  }
}

function resolveBounds(entity, width, height, padding = 12) {
  const halfWidth = entity.width / 2
  const halfHeight = entity.height / 2
  const minX = halfWidth + padding
  const maxX = width - halfWidth - padding
  const minY = halfHeight + padding
  const maxY = height - halfHeight - padding

  if (entity.x < minX) {
    entity.x = minX
    entity.vx = Math.abs(entity.vx) * 0.55
  } else if (entity.x > maxX) {
    entity.x = maxX
    entity.vx = -Math.abs(entity.vx) * 0.55
  }

  if (entity.y < minY) {
    entity.y = minY
    entity.vy = Math.abs(entity.vy) * 0.55
  } else if (entity.y > maxY) {
    entity.y = maxY
    entity.vy = -Math.abs(entity.vy) * 0.55
  }
}

function resolveAvoidance(entity, avoidRect) {
  if (!avoidRect) {
    return
  }

  const left = entity.x - entity.width / 2
  const right = entity.x + entity.width / 2
  const top = entity.y - entity.height / 2
  const bottom = entity.y + entity.height / 2

  if (
    right <= avoidRect.left ||
    left >= avoidRect.right ||
    bottom <= avoidRect.top ||
    top >= avoidRect.bottom
  ) {
    return
  }

  const pushes = [
    { axis: 'x', delta: avoidRect.right - left },
    { axis: 'x', delta: -(right - avoidRect.left) },
    { axis: 'y', delta: avoidRect.bottom - top },
    { axis: 'y', delta: -(bottom - avoidRect.top) },
  ]

  pushes.sort((first, second) => Math.abs(first.delta) - Math.abs(second.delta))

  const smallestPush = pushes[0]

  if (smallestPush.axis === 'x') {
    entity.x += smallestPush.delta
    entity.vx += Math.sign(smallestPush.delta) * 0.9
    entity.vx *= 0.8
  } else {
    entity.y += smallestPush.delta
    entity.vy += Math.sign(smallestPush.delta) * 0.9
    entity.vy *= 0.8
  }
}

function resolveCollisions(entities) {
  for (let firstIndex = 0; firstIndex < entities.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < entities.length; secondIndex += 1) {
      const first = entities[firstIndex]
      const second = entities[secondIndex]
      const overlapX =
        first.width / 2 + second.width / 2 + 14 - Math.abs(second.x - first.x)
      const overlapY =
        first.height / 2 + second.height / 2 + 10 - Math.abs(second.y - first.y)

      if (overlapX <= 0 || overlapY <= 0) {
        continue
      }

      if (overlapX < overlapY) {
        const direction = second.x >= first.x ? 1 : -1
        const shift = overlapX / 2

        first.x -= shift * direction
        second.x += shift * direction
        first.vx -= 0.45 * direction
        second.vx += 0.45 * direction
      } else {
        const direction = second.y >= first.y ? 1 : -1
        const shift = overlapY / 2

        first.y -= shift * direction
        second.y += shift * direction
        first.vy -= 0.45 * direction
        second.vy += 0.45 * direction
      }
    }
  }
}

function mapEntitiesToPositions(entities) {
  return entities.map((entity) => ({
    x: entity.x - entity.width / 2,
    y: entity.y - entity.height / 2,
  }))
}

function createEntities(badges, badgeRefs, containerRect, avoidRect) {
  const width = containerRect.width
  const height = containerRect.height

  return badges.map((badge, index) => {
    const badgeRect = badgeRefs.current[index]?.getBoundingClientRect()
    const badgeWidth = badgeRect?.width || 176
    const badgeHeight = badgeRect?.height || 44
    const slot = BADGE_SLOTS[index % BADGE_SLOTS.length]
    const halfWidth = badgeWidth / 2
    const halfHeight = badgeHeight / 2
    const anchorX = clamp(width * (slot.x / 100), halfWidth + 12, width - halfWidth - 12)
    const anchorY = clamp(height * (slot.y / 100), halfHeight + 12, height - halfHeight - 12)
    const offsetX = ((index % 3) - 1) * 10
    const offsetY = ((index % 4) - 1.5) * 8
    const entity = {
      id: badge.name,
      width: badgeWidth,
      height: badgeHeight,
      anchorX,
      anchorY,
      x: anchorX + offsetX,
      y: anchorY + offsetY,
      vx: 0,
      vy: 0,
      phase: index * 0.9,
    }

    resolveAvoidance(entity, avoidRect)
    resolveBounds(entity, width, height)

    return entity
  })
}

function settleEntities(entities, width, height, avoidRect) {
  for (let iteration = 0; iteration < 36; iteration += 1) {
    resolveCollisions(entities)

    entities.forEach((entity) => {
      resolveAvoidance(entity, avoidRect)
      resolveBounds(entity, width, height)
    })
  }
}

export function HeroBadgeCloud({ badges, avoidRef }) {
  const containerRef = useRef(null)
  const badgeRefs = useRef([])
  const animationFrameRef = useRef(0)
  const pointerRef = useRef({ active: false, x: 0, y: 0 })
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth,
  )
  const [positions, setPositions] = useState([])
  const visibleBadges = useMemo(
    () => badges.slice(0, getVisibleBadgeCount(viewportWidth)),
    [badges, viewportWidth],
  )

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, visibleBadges.length)
  }, [visibleBadges.length])

  useEffect(() => {
    const container = containerRef.current

    if (!container || !visibleBadges.length) {
      setPositions([])
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let stopped = false
    let entities = []
    let lastTimestamp = performance.now()

    const initialize = () => {
      if (stopped || !containerRef.current) {
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const avoidRect = buildAvoidRect(containerRect, avoidRef?.current)

      entities = createEntities(visibleBadges, badgeRefs, containerRect, avoidRect)
      settleEntities(entities, containerRect.width, containerRect.height, avoidRect)
      setPositions(mapEntitiesToPositions(entities))
    }

    const animate = (timestamp) => {
      if (stopped || !containerRef.current) {
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const avoidRect = buildAvoidRect(containerRect, avoidRef?.current)
      const elapsed = Math.min((timestamp - lastTimestamp) / 16.6667, 1.6)

      lastTimestamp = timestamp

      entities.forEach((entity) => {
        const pullX = entity.anchorX - entity.x
        const pullY = entity.anchorY - entity.y
        const driftAngle = timestamp * 0.00055 + entity.phase

        entity.vx += (pullX * 0.018 + Math.cos(driftAngle) * 0.18) * elapsed
        entity.vy += (pullY * 0.018 + Math.sin(driftAngle * 1.12) * 0.14) * elapsed

        if (pointerRef.current.active) {
          const dx = entity.x - pointerRef.current.x
          const dy = entity.y - pointerRef.current.y
          const distance = Math.hypot(dx, dy) || 1
          const influenceRadius = Math.max(entity.width, 180)

          if (distance < influenceRadius) {
            const force = ((influenceRadius - distance) / influenceRadius) ** 2 * 2.4 * elapsed

            entity.vx += (dx / distance) * force
            entity.vy += (dy / distance) * force
          }
        }

        entity.vx *= 0.9
        entity.vy *= 0.9
        entity.x += entity.vx
        entity.y += entity.vy
      })

      for (let iteration = 0; iteration < 3; iteration += 1) {
        resolveCollisions(entities)

        entities.forEach((entity) => {
          resolveAvoidance(entity, avoidRect)
          resolveBounds(entity, containerRect.width, containerRect.height)
        })
      }

      setPositions(mapEntitiesToPositions(entities))
      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        pointerRef.current.active = false
        return
      }

      const containerRect = containerRef.current?.getBoundingClientRect()

      if (!containerRect) {
        return
      }

      const insideX =
        event.clientX >= containerRect.left && event.clientX <= containerRect.right
      const insideY =
        event.clientY >= containerRect.top && event.clientY <= containerRect.bottom

      pointerRef.current = {
        active: insideX && insideY,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      }
    }

    const clearPointer = () => {
      pointerRef.current.active = false
    }

    const resizeObserver = new ResizeObserver(() => {
      initialize()
    })

    resizeObserver.observe(container)

    if (avoidRef?.current) {
      resizeObserver.observe(avoidRef.current)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', clearPointer)

    const initialFrame = window.requestAnimationFrame(() => {
      initialize()

      if (!prefersReducedMotion) {
        animationFrameRef.current = window.requestAnimationFrame(animate)
      }
    })

    const delayedMeasureId = window.setTimeout(initialize, 220)

    return () => {
      stopped = true
      window.cancelAnimationFrame(initialFrame)
      window.cancelAnimationFrame(animationFrameRef.current)
      window.clearTimeout(delayedMeasureId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseleave', clearPointer)
    }
  }, [avoidRef, visibleBadges])

  return (
    <div className="hero-avatars" ref={containerRef} aria-hidden="true">
      {visibleBadges.map((badge, index) => {
        const position = positions[index]

        return (
          <div
            className="hero-avatar-badge"
            key={badge.name}
            ref={(element) => {
              badgeRefs.current[index] = element
            }}
            style={
              position
                ? {
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    opacity: 1,
                  }
                : undefined
            }
          >
            <div
              className={`av${badge.image ? ' has-photo' : ''}`}
              style={badge.image ? undefined : badge.style}
            >
              {badge.image ? (
                <img className="av-image" src={badge.image} alt="" />
              ) : (
                badge.initials
              )}
            </div>
            <div>
              <div className="av-name">{badge.name}</div>
              <div className="av-role">{badge.role}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
