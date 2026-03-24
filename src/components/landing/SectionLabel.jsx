export function SectionLabel({ children, centered = false }) {
  return (
    <div className={`section-label${centered ? ' centered' : ''}`}>{children}</div>
  )
}
