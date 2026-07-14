import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { decodeCertificate } from '../lib/certificate'
import './VerifyCertificatePage.css'

export function VerifyCertificatePage() {
  const [params] = useSearchParams()
  const encoded = params.get('c') ?? ''
  const cert = useMemo(() => (encoded ? decodeCertificate(encoded) : null), [encoded])

  return (
    <div className="section container verify-page">
      {cert ? (
        <div className="card verify-card">
          <div className="verify-hero verify-ok-hero">
            <Icon name="shield-check" size={40} />
            <div>
              <strong>Documento auténtico</strong>
              <p>Este certificado fue emitido en VetCheck Chile.</p>
            </div>
          </div>

          <dl className="verify-list">
            <div>
              <dt>Folio</dt>
              <dd>{cert.folio}</dd>
            </div>
            <div>
              <dt>Tipo de documento</dt>
              <dd>{cert.type}</dd>
            </div>
            <div>
              <dt>Emitido por</dt>
              <dd>{cert.vetName}</dd>
            </div>
            <div>
              <dt>Título</dt>
              <dd>
                {cert.vetTitle} · {cert.vetUniversity}
              </dd>
            </div>
            <div>
              <dt>RUT profesional</dt>
              <dd>{cert.vetRut}</dd>
            </div>
            <div>
              <dt>Paciente</dt>
              <dd>
                {cert.patient} ({cert.species})
              </dd>
            </div>
            <div>
              <dt>Tutor</dt>
              <dd>{cert.tutor}</dd>
            </div>
            <div>
              <dt>Fecha de emisión</dt>
              <dd>{cert.date}</dd>
            </div>
          </dl>

          <p className="verify-note muted">
            La verificación confirma el origen del documento en la plataforma. Su validez
            legal depende de la firma del profesional emisor.
          </p>
        </div>
      ) : (
        <div className="card verify-card">
          <div className="verify-hero verify-bad-hero">
            <Icon name="shield-alert" size={40} />
            <div>
              <strong>No se pudo verificar</strong>
              <p>El código es inválido o el documento no proviene de VetCheck.</p>
            </div>
          </div>
          <p className="verify-note muted">
            Si escaneaste un código QR de un certificado, asegúrate de abrir el enlace
            completo. También puedes verificar al profesional directamente.
          </p>
          <Link to="/buscar" className="btn btn-primary">
            Buscar un veterinario
          </Link>
        </div>
      )}
    </div>
  )
}
