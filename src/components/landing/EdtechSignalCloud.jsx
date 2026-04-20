export function EdtechSignalCloud({ signals }) {
  return (
    <div className="edtech-signal-cloud" aria-hidden="true">
      {signals.map((signal) => (
        <div
          className="edtech-signal-card"
          key={signal.title}
          style={{
            '--signal-x': signal.x,
            '--signal-y': signal.y,
            '--signal-delay': signal.delay,
          }}
        >
          <span className="edtech-signal-title">{signal.title}</span>
          <span className="edtech-signal-subtitle">{signal.subtitle}</span>
        </div>
      ))}
    </div>
  )
}
