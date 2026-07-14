import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { Icon } from '../components/Icon'
import { listVets } from '../services/registry'
import { formatRut } from '../lib/rut'
import {
  certificateTypes,
  makeFolio,
  verifyUrl,
  type CertificateData,
} from '../lib/certificate'
import type { Vet } from '../types'
import { CertificateDocument } from '../components/CertificateDocument'
import './IssueCertificatePage.css'

export function IssueCertificatePage() {
  const [vets, setVets] = useState<Vet[]>([])
  const [vetId, setVetId] = useState('')
  const [type, setType] = useState(certificateTypes[0])
  const [patient, setPatient] = useState('')
  const [species, setSpecies] = useState('Canino')
  const [tutor, setTutor] = useState('')
  const [detail, setDetail] = useState('')
  const [folio] = useState(makeFolio)
  const [qr, setQr] = useState('')

  useEffect(() => {
    listVets().then((all) => {
      const verified = all.filter((v) => v.status === 'verificado')
      setVets(verified)
      if (verified[0]) setVetId(verified[0].id)
    })
  }, [])

  const vet = vets.find((v) => v.id === vetId)

  const cert: CertificateData | null = useMemo(() => {
    if (!vet) return null
    return {
      folio,
      type,
      vetName: `${vet.firstName} ${vet.lastName}`,
      vetRut: formatRut(vet.rut),
      vetTitle: vet.title.degree,
      vetUniversity: vet.title.university,
      patient: patient.trim() || '—',
      species,
      tutor: tutor.trim() || '—',
      date: new Date().toISOString().slice(0, 10),
      detail: detail.trim() || undefined,
    }
  }, [vet, type, patient, species, tutor, detail, folio])

  useEffect(() => {
    if (!cert) return
    QRCode.toDataURL(verifyUrl(cert), { margin: 1, width: 220 })
      .then(setQr)
      .catch(() => setQr(''))
  }, [cert])

  const ready = !!vet && patient.trim().length > 0 && tutor.trim().length > 0

  return (
    <div className="section container issue-page">
      <div className="page-head no-print">
        <h1>Emitir certificado</h1>
        <p className="muted">
          Demostración: un profesional verificado emite un documento con folio y código QR
          de validación. Descárgalo en PDF y compártelo.
        </p>
      </div>

      <div className="issue-grid">
        <form className="card issue-form no-print" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="vet">Profesional que emite</label>
            <select id="vet" value={vetId} onChange={(e) => setVetId(e.target.value)}>
              {vets.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.firstName} {v.lastName} — {v.title.university}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="type">Tipo de documento</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              {certificateTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="patient">Nombre de la mascota</label>
              <input
                id="patient"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Ej: Rocky"
              />
            </div>
            <div className="field">
              <label htmlFor="species">Especie</label>
              <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)}>
                <option>Canino</option>
                <option>Felino</option>
                <option>Ave</option>
                <option>Equino</option>
                <option>Otro</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="tutor">Nombre del tutor / dueño</label>
            <input
              id="tutor"
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
              placeholder="Ej: María González"
            />
          </div>

          <div className="field">
            <label htmlFor="detail">Detalle (opcional)</label>
            <textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={3}
              placeholder="Ej: El paciente se encuentra clínicamente sano y con vacunas al día."
            />
          </div>

          <button
            className="btn btn-cta issue-print"
            disabled={!ready}
            onClick={() => window.print()}
          >
            <Icon name="document" size={18} /> Descargar PDF
          </button>
          {!ready && (
            <p className="field-msg">Completa mascota y tutor para habilitar la descarga.</p>
          )}
        </form>

        <div className="issue-preview">
          {cert && <CertificateDocument cert={cert} qr={qr} />}
        </div>
      </div>
    </div>
  )
}
