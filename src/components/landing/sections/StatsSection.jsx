import { Reveal } from '../Reveal'

export function StatsSection({ stats }) {
  return (
    <section className="section" id="stats">
      <div className="container">
        <Reveal className="stats-wrapper">
          {stats.map((stat) => {
            const statNumClassName = [
              'stat-num',
              stat.value.length > 8 ? 'is-long' : '',
              stat.value === '∞' ? 'is-symbol' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div key={stat.label}>
                <div className={statNumClassName}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
