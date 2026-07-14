import { useEffect, useState } from 'react'
import { Icon } from '../components/Icon'
import { HorizontalBars, Donut } from '../components/Charts'
import { getOverview, type RegistryOverview } from '../services/registry'
import './DashboardPage.css'

type IconName = Parameters<typeof Icon>[0]['name']

function Kpi({
  icon,
  value,
  label,
  accent,
}: {
  icon: IconName
  value: number | string
  label: string
  accent?: boolean
}) {
  return (
    <div className={`kpi card ${accent ? 'kpi-accent' : ''}`}>
      <span className="kpi-icon">
        <Icon name={icon} size={22} />
      </span>
      <span className="kpi-value">{value}</span>
      <span className="kpi-label muted">{label}</span>
    </div>
  )
}

export function DashboardPage() {
  const [data, setData] = useState<RegistryOverview | null>(null)
  useEffect(() => {
    getOverview().then(setData)
  }, [])

  if (!data) {
    return (
      <div className="section container">
        <div className="card" style={{ height: 320 }} aria-busy="true" />
      </div>
    )
  }

  const { totals } = data
  const verifiedPct = Math.round((totals.verified / totals.vets) * 100)

  return (
    <div className="section container dashboard">
      <div className="page-head">
        <span className="dash-eyebrow">
          <Icon name="shield-check" size={15} /> Panel del registro
        </span>
        <h1>Estado del registro veterinario</h1>
        <p className="muted">
          Una mirada al alcance del registro: profesionales verificados, cobertura por región
          y respaldo académico. Datos de demostración.
        </p>
      </div>

      <section className="kpi-row" aria-label="Indicadores">
        <Kpi icon="graduation" value={totals.vets} label="Profesionales" />
        <Kpi icon="shield-check" value={`${verifiedPct}%`} label="Verificados" accent />
        <Kpi icon="building" value={totals.certifiedClinics} label="Clínicas certificadas" />
        <Kpi icon="map-pin" value={totals.regions} label="Regiones con cobertura" />
      </section>

      <div className="dash-grid">
        <section className="card dash-panel">
          <h2>Estado de verificación</h2>
          <p className="dash-sub muted">Proporción de profesionales según su verificación.</p>
          <Donut segments={data.byStatus} centerLabel="Profesionales" centerValue={totals.vets} />
        </section>

        <section className="card dash-panel">
          <div className="dash-panel-head">
            <h2>Respaldo académico</h2>
            <span className="badge badge-ok">
              <Icon name="award" size={13} /> {totals.credentials} credenciales
            </span>
          </div>
          <p className="dash-sub muted">Especialidades y estudios registrados por tipo.</p>
          <HorizontalBars data={data.byCredential} />
        </section>

        <section className="card dash-panel">
          <h2>Profesionales por región</h2>
          <p className="dash-sub muted">Cobertura geográfica del registro.</p>
          <HorizontalBars data={data.byRegion} />
        </section>

        <section className="card dash-panel">
          <h2>Universidades de egreso</h2>
          <p className="dash-sub muted">Casas de estudio de los profesionales verificados.</p>
          <HorizontalBars data={data.byUniversity} />
        </section>
      </div>
    </div>
  )
}
