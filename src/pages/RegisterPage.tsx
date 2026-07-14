import { useState } from 'react'
import { Icon } from '../components/Icon'
import { isValidRut, formatRut, looksLikeRut } from '../lib/rut'
import './misc.css'

const universities = [
  'Universidad de Chile',
  'Universidad de Concepción',
  'Universidad Austral de Chile',
  'Universidad Mayor',
  'Universidad Santo Tomás',
  'Universidad Católica de Temuco',
  'Otra',
]

export function RegisterPage() {
  const [rut, setRut] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const rutTouched = rut.trim().length > 0
  const rutOk = isValidRut(rut)
  const rutError = rutTouched && looksLikeRut(rut) && !rutOk

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!rutOk) return
    // En producción: POST /api/registro (multipart con el certificado de título)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="section container page-head" style={{ maxWidth: 620, textAlign: 'center' }}>
        <span className="success-check">
          <Icon name="check" size={34} />
        </span>
        <h1>Solicitud recibida</h1>
        <p className="muted">
          Revisaremos tu certificado de título contra la institución emisora. Cuando quede
          verificado, tu perfil aparecerá con la insignia «Verificado». Te avisaremos por
          correo.
        </p>
      </div>
    )
  }

  return (
    <div className="section container" style={{ maxWidth: 620 }}>
      <div className="page-head">
        <h1>Registrar profesional</h1>
        <p className="muted">
          Crea tu perfil y carga tu certificado de título. La verificación es manual mientras
          integramos las fuentes oficiales.
        </p>
      </div>

      <form className="card reg-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" name="nombre" type="text" required placeholder="Nombre y apellidos" />
        </div>

        <div className="field">
          <label htmlFor="rut">RUT</label>
          <input
            id="rut"
            name="rut"
            type="text"
            required
            inputMode="text"
            placeholder="12.345.678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            aria-invalid={rutError}
            aria-describedby="rut-msg"
            className={rutError ? 'input-error' : ''}
          />
          <p id="rut-msg" className="field-msg">
            {rutError ? (
              <span className="searchbar-error">
                <Icon name="x" size={14} /> RUT no válido
              </span>
            ) : rutOk ? (
              <span className="searchbar-ok">
                <Icon name="check" size={14} /> {formatRut(rut)}
              </span>
            ) : (
              'Validamos el dígito verificador automáticamente.'
            )}
          </p>
        </div>

        <div className="field">
          <label htmlFor="uni">Universidad</label>
          <select id="uni" name="uni" required defaultValue="">
            <option value="" disabled>
              Selecciona…
            </option>
            {universities.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="anio">Año de titulación</label>
            <input id="anio" name="anio" type="number" min="1960" max="2026" required placeholder="2018" />
          </div>
          <div className="field">
            <label htmlFor="region">Región</label>
            <input id="region" name="region" type="text" required placeholder="Metropolitana" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="titulo">Certificado de título (PDF)</label>
          <div className="filedrop">
            <Icon name="upload" size={22} />
            <span>Arrastra tu certificado o haz clic para subirlo</span>
            <input id="titulo" name="titulo" type="file" accept="application/pdf" />
          </div>
        </div>

        <label className="consent">
          <input type="checkbox" required />
          <span>
            Autorizo el tratamiento de mis datos para fines de verificación, conforme a la Ley
            19.628 de protección de datos personales.
          </span>
        </label>

        <button type="submit" className="btn btn-cta reg-submit" disabled={!rutOk}>
          Enviar solicitud de verificación
        </button>
      </form>
    </div>
  )
}
