import { useInView } from '../hooks/useInView'
import './HowItWorks.css'

const STEPS = [
  {
    label: 'Scan on init',
    detail: (
      <>
        On <code className="hiw__code">onModuleInit</code>,{' '}
        <code className="hiw__code">ArchitectureScanner</code> hooks into NestJS's{' '}
        <code className="hiw__code">DiscoveryService</code> and{' '}
        <code className="hiw__code">ModulesContainer</code>.
      </>
    ),
  },
  {
    label: 'Enumerate components',
    detail: 'Walks all registered modules, controllers, and providers in the DI container.',
  },
  {
    label: 'Filter internals',
    detail: 'Strips out NestJS framework-internal providers so only application code is shown.',
  },
  {
    label: 'Resolve dependencies',
    detail: (
      <>
        Reads constructor parameter types via{' '}
        <code className="hiw__code">Reflect.getMetadata('design:paramtypes', ...)</code> to build
        the dependency graph edges.
      </>
    ),
  },
  {
    label: 'Extract HTTP routes',
    detail: (
      <>
        Reads route metadata via{' '}
        <code className="hiw__code">Reflect.getMetadata('method' | 'path', ...)</code> and attaches
        them to each controller node.
      </>
    ),
  },
  {
    label: 'Expose the map',
    detail: (
      <>
        Builds an <code className="hiw__code">ArchitectureMap</code> and serves it as JSON at{' '}
        <code className="hiw__code">/explorer-data</code>. The React dashboard at{' '}
        <code className="hiw__code">/arch</code> fetches it and renders the interactive graph.
      </>
    ),
  },
] as const

const NODE_TYPES = [
  {
    color: '#6366f1',
    dim: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.35)',
    label: 'Module',
    desc: 'Top-level container that groups controllers and providers.',
  },
  {
    color: '#10b981',
    dim: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
    label: 'Controller',
    desc: 'Handles incoming HTTP requests and delegates to providers.',
  },
  {
    color: '#f59e0b',
    dim: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.28)',
    label: 'Provider',
    desc: 'Injectable service, repository, guard, or any DI token.',
  },
] as const

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="hiw">
      <div className="container">
        <div className="hiw__header">
          <span className="section-label">Internals</span>
          <h2 className="hiw__title">How it works</h2>
          <p className="hiw__subtitle">
            Zero magic — just NestJS's own reflection APIs, exposed through a clean graph UI.
          </p>
        </div>

        <div ref={ref} className={`hiw__body${inView ? ' in-view' : ''}`}>
          {/* Left: step list */}
          <ol className="hiw__steps" aria-label="How nestjs-arch-explorer works">
            {STEPS.map((step, i) => (
              <li key={step.label} className="hiw__step">
                <span className="hiw__step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="hiw__step-content">
                  <strong className="hiw__step-label">{step.label}</strong>
                  <p className="hiw__step-detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: legend card */}
          <aside className="hiw__legend-card" aria-label="Node colour legend">
            <p className="hiw__legend-title">Node colours</p>

            <ul className="hiw__legend-list">
              {NODE_TYPES.map((n) => (
                <li key={n.label} className="hiw__legend-item">
                  <span
                    className="hiw__legend-swatch"
                    style={{
                      background: n.dim,
                      border: `1px solid ${n.border}`,
                      color: n.color,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="hiw__legend-dot"
                      style={{ background: n.color }}
                    />
                  </span>
                  <div>
                    <span
                      className="hiw__legend-label"
                      style={{ color: n.color }}
                    >
                      {n.label}
                    </span>
                    <p className="hiw__legend-desc">{n.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hiw__legend-edge">
              <span className="hiw__edge-line" aria-hidden="true" />
              <span className="hiw__edge-arrow" aria-hidden="true">▶</span>
              <span className="hiw__edge-label">
                Orange arrow — <code className="hiw__code">injects</code> dependency
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
