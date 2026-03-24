import { useEffect, useState } from 'react'

export function useLandingPageEffects(wordCount) {
  const [activeWordIndex, setActiveWordIndex] = useState(0)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    if (!elements.length) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || wordCount <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveWordIndex((index) => (index + 1) % wordCount)
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [wordCount])

  return activeWordIndex
}
