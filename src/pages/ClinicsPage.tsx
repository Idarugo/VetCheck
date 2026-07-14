import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { listClinics } from '../services/registry'
import type { Clinic } from '../types'
import './misc.css'

export function ClinicsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  useEffect(() => {
    listClinics().then(setClinics)
  }, [])

  return (
    <div className="section container">
      <div className="page-head">
        <h1>Clínicas certificadas</h1>
        <p className="muted">
          Una clínica certificada demuestra que todos los profesionales que atienden están
          titulados y verificados.
        </p>
      </div>
      <ul className="clinic-grid">
        {clinics.map((c) => (
          <li key={c.id}>
            <Link to={`/clinica/${c.id}`} className="clinic-card card">
              <span className="clinic-icon">
                <Icon name="building" size={24} />
              </span>
              <div className="clinic-card-body">
                <h3>{c.name}</h3>
                <p className="muted">
                  {c.city}, Región {c.region}
                </p>
              </div>
              {c.certified ? (
                <span className="badge badge-ok">
                  <Icon name="shield-check" size={14} /> Certificada
                </span>
              ) : (
                <span className="badge badge-warn">
                  <Icon name="clock" size={14} /> En proceso
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
