import { useEffect, useMemo, useRef, useState } from 'react'

const DESKTOP_BADGE_SLOTS = [
  { x: 8, y: 15 },
  { x: 24, y: 12 },
  { x: 40, y: 14 },
  { x: 60, y: 14 },
  { x: 76, y: 12 },
  { x: 92, y: 15 },
  { x: 8, y: 86 },
  { x: 24, y: 89 },
  { x: 40, y: 87 },
  { x: 60, y: 87 },
  { x: 76, y: 89 },
  { x: 92, y: 86 },
]

const LARGE_LAPTOP_BADGE_SLOTS = [
  { x: 10, y: 16 },
  { x: 30, y: 12 },
  { x: 70, y: 12 },
  { x: 90, y: 16 },
  { x: 10, y: 86 },
  { x: 30, y: 90 },
  { x: 70, y: 90 },
  { x: 90, y: 86 },
]

const LAPTOP_BADGE_SLOTS = [
  { x: 12, y: 18 },
  { x: 50, y: 14 },
  { x: 88, y: 18 },
  { x: 12, y: 86 },
  { x: 50, y: 90 },
  { x: 88, y: 86 },
]

const TABLET_BADGE_SLOTS = [
  { x: 16, y: 22 },
  { x: 84, y: 22 },
  { x: 18, y: 84 },
  { x: 82, y: 84 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getVisibleBadgeCount(viewportWidth) {
  if (viewportWidth <= 720) {
    return 0
  }

  if (viewportWidth <= 840) {
    return 4
  }

  if (viewportWidth <= 1080) {
    return 4
  }

  if (viewportWidth <= 1280) {
    return 6
  }

  if (viewportWidth <= 1440) {
    return 8
  }

  return 12
}

function getBadgeSlots(viewportWidth) {
  if (viewportWidth <= 720) {
    return []
  }

  if (viewportWidth <= 1080) {
    return TABLET_BADGE_SLOTS
  }

  if (viewportWidth <= 1280) {
    return LAPTOP_BADGE_SLOTS
  }

  if (viewportWidth <= 1440) {
    return LARGE_LAPTOP_BADGE_SLOTS
  }

  return DESKTOP_BADGE_SLOTS
}

function buildAvoidRect(containerRect, avoidElement) {
  if (!avoidElement) {
    return null
  }

  const avoidRect = avoidElement.getBoundingClientRect()

  return {
    left: avoidRect.left - containerRect.left - 140,
    right: avoidRect.right - containerRect.left + 140,
    top: avoidRect.top - containerRect.top - 120,
    bottom: avoidRect.bottom - containerRect.top + 120,
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

function createEntities(badges, badgeRefs, containerRect, avoidRect, slots) {
  const width = containerRect.width
  const height = containerRect.height

  return badges.map((badge, index) => {
    const badgeRect = badgeRefs.current[index]?.getBoundingClientRect()
    const badgeWidth = badgeRect?.width || 176
    const badgeHeight = badgeRect?.height || 44
    const slot = slots[index % slots.length]
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
  for (let iteration = 0; iteration < 60; iteration += 1) {
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
  const badgeSlots = useMemo(() => getBadgeSlots(viewportWidth), [viewportWidth])
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

    if (!container || !visibleBadges.length || !badgeSlots.length) {
      setPositions([])
      return undefined
    }

    let stopped = false
    let entities = []

    const initialize = () => {
      if (stopped || !containerRef.current) {
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const avoidRect = buildAvoidRect(containerRect, avoidRef?.current)

      entities = createEntities(
        visibleBadges,
        badgeRefs,
        containerRect,
        avoidRect,
        badgeSlots,
      )
      settleEntities(entities, containerRect.width, containerRect.height, avoidRect)
      setPositions(mapEntitiesToPositions(entities))
    }

    const resizeObserver = new ResizeObserver(() => {
      initialize()
    })

    resizeObserver.observe(container)

    if (avoidRef?.current) {
      resizeObserver.observe(avoidRef.current)
    }

    const initialFrame = window.requestAnimationFrame(() => {
      initialize()
    })

    const delayedMeasureId = window.setTimeout(initialize, 220)

    return () => {
      stopped = true
      window.cancelAnimationFrame(initialFrame)
      window.clearTimeout(delayedMeasureId)
      resizeObserver.disconnect()
    }
  }, [avoidRef, badgeSlots, visibleBadges])

  return (
    <div className="hero-avatars" ref={containerRef} aria-hidden="true">
      {visibleBadges.map((badge, index) => {
        const position = positions[index]

        return (
          <div
            className={`hero-avatar-badge${badge.noWrapName ? ' is-wide-label' : ''}`}
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
              className={`av${badge.image ? ' has-photo' : ''}${badge.imageFit === 'contain' ? ' is-logo' : ''}${badge.avatarVariant === 'wide' ? ' is-wide' : ''}`}
              style={badge.image ? undefined : badge.style}
            >
              {badge.image ? (
                <img
                  className={`av-image${badge.imageFit === 'contain' ? ' is-contain' : ''}${badge.avatarVariant === 'wide' ? ' is-wide' : ''}`}
                  src={badge.image}
                  alt=""
                />
              ) : (
                badge.initials
              )}
            </div>
            <div>
              <div className={`av-name${badge.noWrapName ? ' is-nowrap' : ''}`}>{badge.name}</div>
              <div className="av-role">{badge.role}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
