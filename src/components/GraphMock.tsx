export function GraphMock() {
  return (
    <div className="graph-mock" aria-hidden="true">
      <svg
        viewBox="0 0 480 320"
        xmlns="http://www.w3.org/2000/svg"
        className="graph-mock__svg"
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.2)" />
          </marker>
          <marker id="arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(99,102,241,0.6)" />
          </marker>
          <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(16,185,129,0.5)" />
          </marker>

          <filter id="glow-indigo">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Edges: Module → Controller ──────────────────────────── */}
        <line x1="160" y1="80"  x2="310" y2="60"  stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
        <line x1="160" y1="80"  x2="310" y2="155" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
        <line x1="160" y1="160" x2="310" y2="155" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
        <line x1="160" y1="240" x2="310" y2="250" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />

        {/* ── Edges: Controller → Provider ────────────────────────── */}
        <line x1="380" y1="60"  x2="430" y2="100" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
        <line x1="380" y1="155" x2="430" y2="195" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
        <line x1="380" y1="250" x2="430" y2="280" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />

        {/* ── Module nodes (indigo) ────────────────────────────────── */}
        <Node x={160} y={80}  color="#6366f1" glow="glow-indigo" label="AppModule"     pulse="a" />
        <Node x={160} y={160} color="#6366f1" glow="glow-indigo" label="UserModule"    pulse="b" />
        <Node x={160} y={240} color="#6366f1" glow="glow-indigo" label="AuthModule"    pulse="c" />

        {/* ── Controller nodes (emerald) ───────────────────────────── */}
        <Node x={340} y={60}  color="#10b981" glow="glow-emerald" label="UserController" pulse="b" />
        <Node x={340} y={155} color="#10b981" glow="glow-emerald" label="AppController"  pulse="c" />
        <Node x={340} y={250} color="#10b981" glow="glow-emerald" label="AuthController" pulse="a" />

        {/* ── Provider nodes (amber) ───────────────────────────────── */}
        <SmallNode x={440} y={100} color="#f59e0b" label="UserService"  pulse="c" />
        <SmallNode x={440} y={195} color="#f59e0b" label="AppService"   pulse="a" />
        <SmallNode x={440} y={280} color="#f59e0b" label="AuthService"  pulse="b" />
      </svg>

      <div className="graph-mock__legend">
        <LegendItem color="#6366f1" label="Module" />
        <LegendItem color="#10b981" label="Controller" />
        <LegendItem color="#f59e0b" label="Provider" />
      </div>
    </div>
  )
}

interface NodeProps {
  x: number; y: number; color: string; glow: string; label: string; pulse: string
}

function Node({ x, y, color, glow, label, pulse }: NodeProps) {
  const bg = color + '22'
  return (
    <g filter={`url(#${glow})`}>
      <rect
        x={x - 60} y={y - 18}
        width={120} height={36}
        rx={8}
        fill={bg}
        stroke={color}
        strokeWidth="1.5"
        className={`graph-node graph-node--pulse-${pulse}`}
      />
      <text
        x={x} y={y + 5}
        textAnchor="middle"
        fill={color}
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  )
}

interface SmallNodeProps {
  x: number; y: number; color: string; label: string; pulse: string
}

function SmallNode({ x, y, color, label, pulse }: SmallNodeProps) {
  const bg = color + '22'
  return (
    <g>
      <rect
        x={x - 44} y={y - 15}
        width={88} height={30}
        rx={6}
        fill={bg}
        stroke={color}
        strokeWidth="1.2"
        className={`graph-node graph-node--pulse-${pulse}`}
      />
      <text
        x={x} y={y + 4}
        textAnchor="middle"
        fill={color}
        fontSize="9.5"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="graph-mock__legend-item">
      <span className="graph-mock__legend-dot" style={{ background: color }} />
      <span>{label}</span>
    </div>
  )
}
