import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/VetCard'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { getVet, getClinicsForVet } from '../services/registry'
import { formatRut } from '../lib/rut'
import type { Vet, Clinic } from '../types'
import './VetProfilePage.css'

const credentialLabels: Record<string, string> = {
  especialidad: 'Especialidad',
  diplomado: 'Diplomado',
  curso: 'Curso',
  internado: 'Internado',
  magister: 'Magíster',
}

const verificationCopy = {
  verificado: {
    cls: 'ok',
    title: 'Título verificado',
    text: 'El título profesional fue contrastado con la institución emisora.',
  },
  pendiente: {
    cls: 'warn',
    title: 'Verificación en curso',
    text: 'El profesional se inscribió y su documentación está siendo revisada.',
  },
  no_verificado: {
    cls: 'danger',
    title: 'Título no verificado',
    text: 'No hemos podido confirmar este título. Trátalo con precaución.',
  },
} as const

export function VetProfilePage() {
  const { id = '' } = useParams()
  const [vet, setVet] = useState<Vet | null | undefined>(undefined)
  const [clinics, setClinics] = useState<Clinic[]>([])

  useEffect(() => {
    let active = true
    getVet(id).then((v) => {
      if (!active) return
      setVet(v ?? null)
      if (v) getClinicsForVet(v).then((c) => active && setClinics(c))
    })
    return () => {
      active = false
    }
  }, [id])

  if (vet === undefined) {
    return (
      <div className="section container">
        <div className="card profile-skeleton" aria-busy="true" />
      </div>
    )
  }

  if (vet === null) {
    return (
      <div className="section container profile-notfound">
        <h1>Profesional no encontrado</h1>
        <p className="muted">El registro solicitado no existe.</p>
        <Link to="/buscar" className="btn btn-primary">
          Volver a buscar
        </Link>
      </div>
    )
  }

  const vc = verificationCopy[vet.status]

  return (
    <div className="section container profile">
      <nav className="crumbs muted" aria-label="Ruta">
        <Link to="/buscar">Buscar</Link> <span aria-hidden="true">/</span> {vet.firstName}{' '}
        {vet.lastName}
      </nav>

      <header className="profile-head card">
        <Avatar initials={vet.photoInitials} size={84} />
        <div className="profile-head-main">
          <div className="profile-head-top">
            <h1>
              {vet.firstName} {vet.lastName}
            </h1>
            <VerifiedBadge status={vet.status} size={14} />
          </div>
          <p className="profile-rut muted">RUT {formatRut(vet.rut)}</p>
          <p className="profile-loc">
            <Icon name="map-pin" size={18} /> {vet.city}, Región {vet.region}
          </p>
        </div>
      </header>

      <div className={`verify-banner verify-${vc.cls}`}>
        <Icon name={vet.status === 'verificado' ? 'shield-check' : vet.status === 'pendiente' ? 'clock' : 'shield-alert'} size={26} />
        <div>
          <strong>{vc.title}</strong>
          <p>{vc.text}</p>
          {vet.verifiedAt && (
            <p className="verify-date">Última verificación: {vet.verifiedAt}</p>
          )}
        </div>
      </div>

      <div className="profile-grid">
        <section className="card profile-section">
          <h2>
            <Icon name="graduation" size={20} /> Título profesional
          </h2>
          <dl className="deflist">
            <div>
              <dt>Título</dt>
              <dd>{vet.title.degree}</dd>
            </div>
            <div>
              <dt>Universidad</dt>
              <dd>{vet.title.university}</dd>
            </div>
            <div>
              <dt>Año de egreso</dt>
              <dd>{vet.title.year}</dd>
            </div>
          </dl>
        </section>

        <section className="card profile-section">
          <h2>
            <Icon name="award" size={20} /> Especialidades y estudios
          </h2>
          {vet.credentials.length > 0 ? (
            <ul className="credlist">
              {vet.credentials.map((c, i) => (
                <li key={i}>
                  <span className="cred-kind">{credentialLabels[c.kind]}</span>
                  <span className="cred-name">{c.name}</span>
                  <span className="cred-meta muted">
                    {c.institution} · {c.year}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-inline">Sin especialidades registradas.</p>
          )}
        </section>

        <section className="card profile-section">
          <h2>
            <Icon name="building" size={20} /> Clínicas asociadas
          </h2>
          {clinics.length > 0 ? (
            <ul className="clinic-links">
              {clinics.map((c) => (
                <li key={c.id}>
                  <Link to={`/clinica/${c.id}`}>
                    <span>{c.name}</span>
                    {c.certified && (
                      <span className="badge badge-ok">
                        <Icon name="check" size={13} /> Certificada
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-inline">Sin clínicas asociadas.</p>
          )}
        </section>

        <section className="card profile-section">
          <h2>
            <Icon name="document" size={20} /> Documentos que puede emitir
          </h2>
          {vet.services.length > 0 ? (
            <ul className="service-chips">
              {vet.services.map((s) => (
                <li key={s}>
                  <Icon name="document" size={16} /> {s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-inline">
              Este profesional aún no ofrece emisión de documentos en línea.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
