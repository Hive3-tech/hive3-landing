import { useEffect, useMemo, useRef, useState } from 'react';

const DESKTOP_PERIMETER = {
  topY: 13,
  bottomY: 87,
  leftX: 7,
  rightX: 93,
  horizontalAnchorStart: 25,
  horizontalAnchorEnd: 75,
  horizontalLaneStart: 17,
  horizontalLaneEnd: 83,
  verticalAnchorStart: 32.5,
  verticalAnchorEnd: 67.5,
  verticalLaneStart: 26,
  verticalLaneEnd: 74,
  horizontalBand: 5,
  verticalBand: 4,
};

const LARGE_LAPTOP_PERIMETER = {
  topY: 14,
  bottomY: 86,
  leftX: 8,
  rightX: 92,
  horizontalAnchorStart: 26,
  horizontalAnchorEnd: 74,
  horizontalLaneStart: 18,
  horizontalLaneEnd: 82,
  verticalAnchorStart: 33.5,
  verticalAnchorEnd: 66.5,
  verticalLaneStart: 27.5,
  verticalLaneEnd: 72.5,
  horizontalBand: 5,
  verticalBand: 4,
};

const LAPTOP_PERIMETER = {
  topY: 14,
  bottomY: 86,
  leftX: 9,
  rightX: 91,
  horizontalAnchorStart: 28,
  horizontalAnchorEnd: 72,
  horizontalLaneStart: 20,
  horizontalLaneEnd: 80,
  verticalAnchorStart: 36.8,
  verticalAnchorEnd: 63.2,
  verticalLaneStart: 29,
  verticalLaneEnd: 71,
  horizontalBand: 5,
  verticalBand: 4,
};

const TABLET_PERIMETER = {
  topY: 16,
  bottomY: 84,
  leftX: 10,
  rightX: 90,
  horizontalAnchorStart: 30,
  horizontalAnchorEnd: 70,
  horizontalLaneStart: 23,
  horizontalLaneEnd: 77,
  verticalAnchorStart: 39,
  verticalAnchorEnd: 61,
  verticalLaneStart: 32,
  verticalLaneEnd: 68,
  horizontalBand: 5,
  verticalBand: 4,
};

const FLOAT_PRESETS = [
  { x: 14, y: -12, duration: 8.2, delay: -0.8, tilt: 0.8 },
  { x: -12, y: 10, duration: 9.4, delay: -2.4, tilt: -0.7 },
  { x: 10, y: 14, duration: 8.9, delay: -1.1, tilt: 0.6 },
  { x: -14, y: -10, duration: 9.8, delay: -3.2, tilt: -0.85 },
  { x: 16, y: -8, duration: 8.7, delay: -4.1, tilt: 0.7 },
  { x: -10, y: 12, duration: 9.1, delay: -1.8, tilt: -0.55 },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getVisibleBadgeCount(viewportWidth) {
  if (viewportWidth <= 1084) {
    return 0;
  }

  if (viewportWidth <= 1280) {
    return 6;
  }

  if (viewportWidth <= 1440) {
    return 8;
  }

  return 12;
}

function buildSpread(count, start, end) {
  if (!count) {
    return [];
  }

  if (count === 1) {
    return [(start + end) / 2];
  }

  const step = (end - start) / (count - 1);

  return Array.from({ length: count }, (_, index) => start + step * index);
}

function getSideCounts(count) {
  if (count >= 12) {
    return { top: 3, right: 3, bottom: 3, left: 3 };
  }

  if (count === 8) {
    return { top: 2, right: 2, bottom: 2, left: 2 };
  }

  if (count === 6) {
    return { top: 2, right: 1, bottom: 2, left: 1 };
  }

  if (count === 4) {
    return { top: 1, right: 1, bottom: 1, left: 1 };
  }

  const counts = { top: 0, right: 0, bottom: 0, left: 0 };
  const order = ['top', 'right', 'bottom', 'left'];

  for (let index = 0; index < count; index += 1) {
    counts[order[index % order.length]] += 1;
  }

  return counts;
}

function buildPerimeterSlots(count, perimeter) {
  if (!count) {
    return [];
  }

  const counts = getSideCounts(count);

  const topSlots = buildSpread(
    counts.top,
    perimeter.horizontalAnchorStart,
    perimeter.horizontalAnchorEnd,
  ).map((x) => ({
    side: 'top',
    x,
    y: perimeter.topY,
    minX: perimeter.horizontalLaneStart,
    maxX: perimeter.horizontalLaneEnd,
    minY: perimeter.topY - perimeter.horizontalBand,
    maxY: perimeter.topY + perimeter.horizontalBand,
  }));
  const rightSlots = buildSpread(
    counts.right,
    perimeter.verticalAnchorStart,
    perimeter.verticalAnchorEnd,
  ).map((y) => ({
    side: 'right',
    x: perimeter.rightX,
    y,
    minX: perimeter.rightX - perimeter.verticalBand,
    maxX: perimeter.rightX + perimeter.verticalBand,
    minY: perimeter.verticalLaneStart,
    maxY: perimeter.verticalLaneEnd,
  }));
  const bottomSlots = buildSpread(
    counts.bottom,
    perimeter.horizontalAnchorStart,
    perimeter.horizontalAnchorEnd,
  ).map((x) => ({
    side: 'bottom',
    x,
    y: perimeter.bottomY,
    minX: perimeter.horizontalLaneStart,
    maxX: perimeter.horizontalLaneEnd,
    minY: perimeter.bottomY - perimeter.horizontalBand,
    maxY: perimeter.bottomY + perimeter.horizontalBand,
  }));
  const leftSlots = buildSpread(
    counts.left,
    perimeter.verticalAnchorStart,
    perimeter.verticalAnchorEnd,
  ).map((y) => ({
    side: 'left',
    x: perimeter.leftX,
    y,
    minX: perimeter.leftX - perimeter.verticalBand,
    maxX: perimeter.leftX + perimeter.verticalBand,
    minY: perimeter.verticalLaneStart,
    maxY: perimeter.verticalLaneEnd,
  }));

  return [...topSlots, ...rightSlots, ...bottomSlots, ...leftSlots];
}

function getBadgeSlots(viewportWidth, count) {
  if (viewportWidth <= 720) {
    return [];
  }

  if (viewportWidth <= 1080) {
    return buildPerimeterSlots(count, TABLET_PERIMETER);
  }

  if (viewportWidth <= 1280) {
    return buildPerimeterSlots(count, LAPTOP_PERIMETER);
  }

  if (viewportWidth <= 1440) {
    return buildPerimeterSlots(count, LARGE_LAPTOP_PERIMETER);
  }

  return buildPerimeterSlots(count, DESKTOP_PERIMETER);
}

function buildAvoidRect(containerRect, avoidElement) {
  if (!avoidElement) {
    return null;
  }

  const avoidRect = avoidElement.getBoundingClientRect();

  return {
    left: avoidRect.left - containerRect.left - 140,
    right: avoidRect.right - containerRect.left + 140,
    top: avoidRect.top - containerRect.top - 120,
    bottom: avoidRect.bottom - containerRect.top + 120,
  };
}

function resolveBounds(entity, width, height, padding = 12) {
  const halfWidth = entity.width / 2;
  const halfHeight = entity.height / 2;
  const minX = halfWidth + padding;
  const maxX = width - halfWidth - padding;
  const minY = halfHeight + padding;
  const maxY = height - halfHeight - padding;

  if (entity.x < minX) {
    entity.x = minX;
    entity.vx = Math.abs(entity.vx) * 0.55;
  } else if (entity.x > maxX) {
    entity.x = maxX;
    entity.vx = -Math.abs(entity.vx) * 0.55;
  }

  if (entity.y < minY) {
    entity.y = minY;
    entity.vy = Math.abs(entity.vy) * 0.55;
  } else if (entity.y > maxY) {
    entity.y = maxY;
    entity.vy = -Math.abs(entity.vy) * 0.55;
  }
}

function resolveLaneBounds(entity) {
  const lane = entity.lane;

  if (!lane) {
    return;
  }

  if (entity.x < lane.minX) {
    entity.x = lane.minX;
    entity.vx = Math.abs(entity.vx) * 0.55;
  } else if (entity.x > lane.maxX) {
    entity.x = lane.maxX;
    entity.vx = -Math.abs(entity.vx) * 0.55;
  }

  if (entity.y < lane.minY) {
    entity.y = lane.minY;
    entity.vy = Math.abs(entity.vy) * 0.55;
  } else if (entity.y > lane.maxY) {
    entity.y = lane.maxY;
    entity.vy = -Math.abs(entity.vy) * 0.55;
  }
}

function resolveAvoidance(entity, avoidRect) {
  if (!avoidRect) {
    return;
  }

  const left = entity.x - entity.width / 2;
  const right = entity.x + entity.width / 2;
  const top = entity.y - entity.height / 2;
  const bottom = entity.y + entity.height / 2;

  if (
    right <= avoidRect.left ||
    left >= avoidRect.right ||
    bottom <= avoidRect.top ||
    top >= avoidRect.bottom
  ) {
    return;
  }

  const pushes = [
    { axis: 'x', delta: avoidRect.right - left },
    { axis: 'x', delta: -(right - avoidRect.left) },
    { axis: 'y', delta: avoidRect.bottom - top },
    { axis: 'y', delta: -(bottom - avoidRect.top) },
  ];

  pushes.sort((first, second) => Math.abs(first.delta) - Math.abs(second.delta));

  const smallestPush = pushes[0];

  if (smallestPush.axis === 'x') {
    entity.x += smallestPush.delta;
    entity.vx += Math.sign(smallestPush.delta) * 0.9;
    entity.vx *= 0.8;
  } else {
    entity.y += smallestPush.delta;
    entity.vy += Math.sign(smallestPush.delta) * 0.9;
    entity.vy *= 0.8;
  }
}

function resolveCollisions(entities) {
  for (let firstIndex = 0; firstIndex < entities.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < entities.length; secondIndex += 1) {
      const first = entities[firstIndex];
      const second = entities[secondIndex];
      const overlapX = first.width / 2 + second.width / 2 + 14 - Math.abs(second.x - first.x);
      const overlapY = first.height / 2 + second.height / 2 + 10 - Math.abs(second.y - first.y);

      if (overlapX <= 0 || overlapY <= 0) {
        continue;
      }

      if (overlapX < overlapY) {
        const direction = second.x >= first.x ? 1 : -1;
        const shift = overlapX / 2;

        first.x -= shift * direction;
        second.x += shift * direction;
        first.vx -= 0.45 * direction;
        second.vx += 0.45 * direction;
      } else {
        const direction = second.y >= first.y ? 1 : -1;
        const shift = overlapY / 2;

        first.y -= shift * direction;
        second.y += shift * direction;
        first.vy -= 0.45 * direction;
        second.vy += 0.45 * direction;
      }
    }
  }
}

function createEntities(badges, badgeRefs, containerRect, avoidRect, slots) {
  const width = containerRect.width;
  const height = containerRect.height;

  return badges.map((badge, index) => {
    const badgeRect = badgeRefs.current[index]?.getBoundingClientRect();
    const badgeWidth = badgeRect?.width || 176;
    const badgeHeight = badgeRect?.height || 44;
    const slot = slots[index % slots.length];
    const halfWidth = badgeWidth / 2;
    const halfHeight = badgeHeight / 2;
    const anchorX = clamp(width * (slot.x / 100), halfWidth + 12, width - halfWidth - 12);
    const anchorY = clamp(height * (slot.y / 100), halfHeight + 12, height - halfHeight - 12);
    const lane = {
      minX: clamp(width * (slot.minX / 100), halfWidth + 12, width - halfWidth - 12),
      maxX: clamp(width * (slot.maxX / 100), halfWidth + 12, width - halfWidth - 12),
      minY: clamp(height * (slot.minY / 100), halfHeight + 12, height - halfHeight - 12),
      maxY: clamp(height * (slot.maxY / 100), halfHeight + 12, height - halfHeight - 12),
    };
    const entity = {
      id: badge.name,
      side: slot.side,
      width: badgeWidth,
      height: badgeHeight,
      anchorX,
      anchorY,
      x: anchorX,
      y: anchorY,
      lane,
      vx: 0,
      vy: 0,
      phase: index * 0.9,
    };

    resolveAvoidance(entity, avoidRect);
    resolveLaneBounds(entity);
    resolveBounds(entity, width, height);

    return entity;
  });
}

function settleEntities(entities, width, height, avoidRect) {
  for (let iteration = 0; iteration < 60; iteration += 1) {
    resolveCollisions(entities);

    entities.forEach(entity => {
      resolveAvoidance(entity, avoidRect);
      resolveLaneBounds(entity);
      resolveBounds(entity, width, height);
    });
  }
}

function getMotionPreset(index) {
  return FLOAT_PRESETS[index % FLOAT_PRESETS.length];
}

export function HeroBadgeCloud({ badges, avoidRef }) {
  const containerRef = useRef(null);
  const badgeRefs = useRef([]);
  const animationFrameRef = useRef(0);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );
  const [layout, setLayout] = useState([]);
  const visibleBadges = useMemo(
    () => badges.slice(0, getVisibleBadgeCount(viewportWidth)),
    [badges, viewportWidth]
  );
  const badgeSlots = useMemo(
    () => getBadgeSlots(viewportWidth, visibleBadges.length),
    [viewportWidth, visibleBadges.length]
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, visibleBadges.length);
  }, [visibleBadges.length]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !visibleBadges.length || !badgeSlots.length) {
      const resetLayoutFrame = window.requestAnimationFrame(() => {
        setLayout([]);
      });

      return () => window.cancelAnimationFrame(resetLayoutFrame);
    }

    let stopped = false;
    let entities = [];

    const initialize = () => {
      if (stopped || !containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const avoidRect = buildAvoidRect(containerRect, avoidRef?.current);

      entities = createEntities(visibleBadges, badgeRefs, containerRect, avoidRect, badgeSlots);
      settleEntities(entities, containerRect.width, containerRect.height, avoidRect);
      setLayout(
        entities.map((entity, index) => {
          const motionPreset = getMotionPreset(index);

          return {
            id: entity.id,
            x: entity.x - entity.width / 2,
            y: entity.y - entity.height / 2,
            width: entity.width,
            height: entity.height,
            floatX: motionPreset.x,
            floatY: motionPreset.y,
            duration: motionPreset.duration,
            delay: motionPreset.delay,
            tilt: motionPreset.tilt,
          };
        })
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      initialize();
    });

    resizeObserver.observe(container);

    if (avoidRef?.current) {
      resizeObserver.observe(avoidRef.current);
    }

    const initialFrame = window.requestAnimationFrame(() => {
      initialize();
    });

    const delayedMeasureId = window.setTimeout(initialize, 220);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(delayedMeasureId);
      resizeObserver.disconnect();
    };
  }, [avoidRef, badgeSlots, visibleBadges]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !layout.length) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      badgeRefs.current.forEach(badgeElement => {
        badgeElement?.style.setProperty('--repel-x', '0px');
        badgeElement?.style.setProperty('--repel-y', '0px');
      });

      return undefined;
    }

    const motion = layout.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
    const pointer = pointerRef.current;
    let lastTimestamp = performance.now();

    const animate = timestamp => {
      const elapsed = Math.min((timestamp - lastTimestamp) / 16.6667, 1.5);
      const rect = container.getBoundingClientRect();
      const influenceRadius = Math.max(126, Math.min(rect.width * 0.15, 180));
      const maxOffset = rect.width < 1200 ? 14 : 22;

      lastTimestamp = timestamp;

      layout.forEach((badge, index) => {
        const state = motion[index];
        let targetX = 0;
        let targetY = 0;

        if (pointer.active) {
          const anchorX = badge.x + badge.width / 2;
          const anchorY = badge.y + badge.height / 2;
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

        badgeRefs.current[index]?.style.setProperty('--repel-x', `${state.x.toFixed(2)}px`);
        badgeRefs.current[index]?.style.setProperty('--repel-y', `${state.y.toFixed(2)}px`);
      });

      animationFrameRef.current = window.requestAnimationFrame(animate);
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
    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      pointer.active = false;
      window.cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('pointermove', updatePointer);
      container.removeEventListener('pointerleave', clearPointer);

      badgeRefs.current.forEach(badgeElement => {
        badgeElement?.style.setProperty('--repel-x', '0px');
        badgeElement?.style.setProperty('--repel-y', '0px');
      });
    };
  }, [layout]);

  return (
    <div className="hero-avatars" ref={containerRef} aria-hidden="true">
      {visibleBadges.map((badge, index) => {
        const badgeLayout = layout[index];

        return (
          <div
            className={`hero-avatar-badge${badge.noWrapName ? ' is-wide-label' : ''}`}
            key={badge.name}
            ref={element => {
              badgeRefs.current[index] = element;
            }}
            style={
              badgeLayout
                ? {
                    '--badge-x': `${badgeLayout.x}px`,
                    '--badge-y': `${badgeLayout.y}px`,
                    '--float-x': `${badgeLayout.floatX}px`,
                    '--float-y': `${badgeLayout.floatY}px`,
                    '--float-duration': `${badgeLayout.duration}s`,
                    '--badge-delay': `${badgeLayout.delay}s`,
                    '--badge-tilt': `${badgeLayout.tilt}deg`,
                    opacity: 1,
                  }
                : undefined
            }
          >
            <div className="hero-avatar-badge-shell">
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
          </div>
        );
      })}
    </div>
  );
}
