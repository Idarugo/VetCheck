import type { CertificateData } from '../lib/certificate'
import { Icon } from './Icon'
import './CertificateDocument.css'

/** Documento imprimible del certificado. Se usa en la emisión (preview) y es
 *  lo único que sale al imprimir/guardar como PDF (ver @media print). */
export function CertificateDocument({ cert, qr }: { cert: CertificateData; qr: string }) {
  return (
    <article className="cert" id="cert-print">
      <header className="cert-head">
        <div className="cert-brand">
          <span className="cert-logo">
            <Icon name="shield-check" size={22} />
          </span>
          <div>
            <strong>VetCheck Chile</strong>
            <span className="cert-brand-sub">Registro de médicos veterinarios</span>
          </div>
        </div>
        <div className="cert-folio">
          <span className="cert-folio-label">Folio</span>
          <span className="cert-folio-value">{cert.folio}</span>
        </div>
      </header>

      <h1 className="cert-title">{cert.type}</h1>

      <p className="cert-lead">
        Quien suscribe, médico veterinario, certifica lo siguiente respecto del paciente
        individualizado a continuación:
      </p>

      <div className="cert-fields">
        <div>
          <span className="cert-k">Paciente</span>
          <span className="cert-v">{cert.patient}</span>
        </div>
        <div>
          <span className="cert-k">Especie</span>
          <span className="cert-v">{cert.species}</span>
        </div>
        <div>
          <span className="cert-k">Tutor / Dueño</span>
          <span className="cert-v">{cert.tutor}</span>
        </div>
        <div>
          <span className="cert-k">Fecha de emisión</span>
          <span className="cert-v">{cert.date}</span>
        </div>
      </div>

      {cert.detail && (
        <div className="cert-detail">
          <span className="cert-k">Detalle</span>
          <p>{cert.detail}</p>
        </div>
      )}

      <div className="cert-foot">
        <div className="cert-sign">
          <div className="cert-sign-line" />
          <strong>{cert.vetName}</strong>
          <span>{cert.vetTitle}</span>
          <span>{cert.vetUniversity}</span>
          <span>RUT {cert.vetRut}</span>
        </div>
        <div className="cert-qr">
          {qr ? <img src={qr} alt="Código QR de verificación" width={110} height={110} /> : <div className="cert-qr-ph" />}
          <span>Escanea para verificar la autenticidad</span>
        </div>
      </div>

      <footer className="cert-legal">
        Documento verificable en vet-check.vercel.app con el folio {cert.folio}. La validez
        legal depende de la firma del profesional emisor. Documento demostrativo (MVP).
      </footer>
    </article>
  )
}
