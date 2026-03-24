import { Reveal } from '../Reveal'

export function StatsSection({ stats }) {
  return (
    <section className="section" id="stats">
      <div className="container">
        <Reveal className="stats-wrapper">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
