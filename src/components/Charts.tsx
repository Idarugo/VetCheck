import type { Bucket } from '../services/registry'
import './Charts.css'

/**
 * Gráficos accesibles y sin dependencias.
 * - Barras: magnitud → una sola tonalidad (cian). Etiquetas directas, base a la izquierda.
 * - Dona: estado → colores de estado (verde/ámbar/rojo) SIEMPRE con etiqueta e icono.
 */

export function HorizontalBars({
  data,
  unit = '',
}: {
  data: Bucket[]
  unit?: string
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <ul className="bars" role="img" aria-label="Gráfico de barras">
      {data.map((d) => (
        <li key={d.label} className="bars-row">
          <span className="bars-label" title={d.label}>
            {d.label}
          </span>
          <span className="bars-track">
            <span
              className="bars-fill"
              style={{ width: `${(d.value / max) * 100}%` }}
              title={`${d.label}: ${d.value} ${unit}`.trim()}
            />
          </span>
          <span className="bars-value">{d.value}</span>
        </li>
      ))}
    </ul>
  )
}

const statusColor: Record<string, string> = {
  verificado: 'var(--c-ok)',
  pendiente: '#d97706',
  no_verificado: '#dc2626',
}

export function Donut({
  segments,
  centerLabel,
  centerValue,
}: {
  segments: { key: string; label: string; value: number }[]
  centerLabel: string
  centerValue: number
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const R = 60
  const C = 2 * Math.PI * R
  let offset = 0

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 160 160" className="donut" role="img" aria-label="Estado de verificación">
        <circle cx="80" cy="80" r={R} fill="none" stroke="var(--c-border)" strokeWidth="18" />
        {segments.map((s) => {
          const frac = s.value / total
          const dash = frac * C
          const el = (
            <circle
              key={s.key}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={statusColor[s.key] ?? 'var(--c-primary)'}
              strokeWidth="18"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
            >
              <title>
                {s.label}: {s.value} ({Math.round(frac * 100)}%)
              </title>
            </circle>
          )
          offset += dash
          return el
        })}
        <text x="80" y="74" textAnchor="middle" className="donut-num">
          {centerValue}
        </text>
        <text x="80" y="94" textAnchor="middle" className="donut-cap">
          {centerLabel}
        </text>
      </svg>
      <ul className="donut-legend">
        {segments.map((s) => (
          <li key={s.key}>
            <span className="donut-dot" style={{ background: statusColor[s.key] }} />
            <span className="donut-legend-label">{s.label}</span>
            <span className="donut-legend-val">
              {s.value}
              <span className="muted"> · {Math.round((s.value / total) * 100)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
