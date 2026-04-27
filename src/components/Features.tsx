import { useInView } from '../hooks/useInView'
import './Features.css'

const FEATURES = [
  {
    color: 'indigo',
    icon: <PlugIcon />,
    title: 'Zero Config',
    description:
      'Auto-discovers all Modules, Controllers, and Providers via NestJS\'s built-in DiscoveryService. No extra decorators, no manual wiring.',
  },
  {
    color: 'emerald',
    icon: <GraphIcon />,
    title: 'Interactive Graph',
    description:
      'Rendered with React Flow + dagre layout. Drag nodes, zoom in, pan around — full interactive exploration of your dependency tree.',
  },
  {
    color: 'amber',
    icon: <CursorIcon />,
    title: 'Hover to Highlight',
    description:
      'Hover any node to highlight its direct relationships and dim everything else — the same Obsidian-style focus effect, right in your browser.',
  },
  {
    color: 'indigo',
    icon: <InspectIcon />,
    title: 'Click to Inspect',
    description:
      'Click any node to open a detail panel: type, scope (Singleton / Transient / Request), injected dependencies, and HTTP routes for controllers.',
  },
  {
    color: 'emerald',
    icon: <DownloadIcon />,
    title: 'Export as PNG',
    description:
      'Download a high-quality PNG of the full architecture diagram with a single click — ready for docs, onboarding, or architecture reviews.',
  },
  {
    color: 'amber',
    icon: <ShieldIcon />,
    title: 'Production Safe',
    description:
      'One flag to disable everything in production: enabled: false. Optionally add a guardFn to restrict the JSON API endpoint.',
  },
] as const

type FeatureColor = 'indigo' | 'emerald' | 'amber'

interface Feature {
  color: FeatureColor
  icon: React.ReactNode
  title: string
  description: string
}

export function Features() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="features">
      <div className="container">
        <div className="features__header">
          <span className="section-label">Features</span>
          <h2 className="features__title">
            Everything you need to understand your app
          </h2>
          <p className="features__subtitle">
            Drop in one module import and get a fully interactive architecture
            explorer — no configuration required.
          </p>
        </div>

        <div ref={ref} className={`features__grid${inView ? ' in-view' : ''}`}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className={`feature-card feature-card--${feature.color}`}>
      <div className="feature-card__icon">{feature.icon}</div>
      <h3 className="feature-card__title">{feature.title}</h3>
      <p className="feature-card__desc">{feature.description}</p>
    </article>
  )
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

function PlugIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v6M8 6h8M6 10h12l-1 7H7l-1-7z" />
      <path d="M9 17v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3" />
    </svg>
  )
}

function GraphIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="5"  cy="12" r="2" />
      <circle cx="19" cy="5"  r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="7"  y1="11" x2="17" y2="6"  />
      <line x1="7"  y1="13" x2="17" y2="18" />
    </svg>
  )
}

function CursorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l7 18 3-7 7-3L4 4z" />
      <line x1="14" y1="14" x2="20" y2="20" />
    </svg>
  )
}

function InspectIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}
