import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { VetCard } from '../components/VetCard'
import { getClinic, getVetsForClinic } from '../services/registry'
import type { Clinic, Vet } from '../types'
import './misc.css'

export function ClinicProfilePage() {
  const { id = '' } = useParams()
  const [clinic, setClinic] = useState<Clinic | null | undefined>(undefined)
  const [vets, setVets] = useState<Vet[]>([])

  useEffect(() => {
    let active = true
    getClinic(id).then((c) => {
      if (!active) return
      setClinic(c ?? null)
      if (c) getVetsForClinic(c).then((v) => active && setVets(v))
    })
    return () => {
      active = false
    }
  }, [id])

  if (clinic === undefined) return <div className="section container" aria-busy="true" />
  if (clinic === null)
    return (
      <div className="section container page-head">
        <h1>Clínica no encontrada</h1>
        <Link to="/clinicas" className="btn btn-primary">
          Ver clínicas
        </Link>
      </div>
    )

  const allVerified = vets.length > 0 && vets.every((v) => v.status === 'verificado')

  return (
    <div className="section container" style={{ maxWidth: 860 }}>
      <nav className="crumbs muted" aria-label="Ruta">
        <Link to="/clinicas">Clínicas</Link> <span aria-hidden="true">/</span> {clinic.name}
      </nav>

      <header className="clinic-head card">
        <span className="clinic-icon lg">
          <Icon name="building" size={30} />
        </span>
        <div>
          <h1>{clinic.name}</h1>
          <p className="clinic-loc">
            <Icon name="map-pin" size={17} /> {clinic.city}, Región {clinic.region}
          </p>
        </div>
        {clinic.certified ? (
          <span className="badge badge-ok">
            <Icon name="shield-check" size={14} /> Clínica certificada
          </span>
        ) : (
          <span className="badge badge-warn">
            <Icon name="clock" size={14} /> Certificación en proceso
          </span>
        )}
      </header>

      {clinic.certified && allVerified && (
        <div className="verify-banner verify-ok" style={{ margin: '18px 0' }}>
          <Icon name="shield-check" size={24} />
          <div>
            <strong>Todo el equipo está verificado</strong>
            <p>Los {vets.length} profesionales que atienden aquí tienen título verificado.</p>
          </div>
        </div>
      )}

      <h2 className="clinic-team-title">Equipo profesional</h2>
      <ul className="results-list">
        {vets.map((v) => (
          <li key={v.id}>
            <VetCard vet={v} />
          </li>
        ))}
      </ul>
    </div>
  )
}
