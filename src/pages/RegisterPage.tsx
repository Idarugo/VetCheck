import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { isValidRut, formatRut, looksLikeRut } from '../lib/rut'
import { plans, getPlan, priceLabel, formatCLP, type PlanId } from '../data/plans'
import './misc.css'
import './RegisterPage.css'

const universities = [
  'Universidad de Chile',
  'Universidad de Concepción',
  'Universidad Austral de Chile',
  'Universidad Mayor',
  'Universidad Santo Tomás',
  'Universidad Católica de Temuco',
  'Otra',
]

const steps = ['Plan', 'Datos', 'Confirmación']

export function RegisterPage() {
  const [params] = useSearchParams()
  const initialPlan = getPlan(params.get('plan'))?.id ?? 'basico'

  const [step, setStep] = useState(1)
  const [planId, setPlanId] = useState<PlanId>(initialPlan)
  const [fullName, setFullName] = useState('')
  const [rut, setRut] = useState('')
  const [university, setUniversity] = useState('')
  const [year, setYear] = useState('')
  const [region, setRegion] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const plan = getPlan(planId)!
  const isPaid = plan.price > 0

  const rutOk = isValidRut(rut)
  const rutError = rut.trim().length > 0 && looksLikeRut(rut) && !rutOk
  const dataComplete =
    fullName.trim().length > 1 && rutOk && university !== '' && year !== '' && region.trim() !== '' && consent

  if (submitted) {
    return (
      <div className="section container page-head" style={{ maxWidth: 620, textAlign: 'center' }}>
        <span className="success-check">
          <Icon name="check" size={34} />
        </span>
        <h1>Solicitud recibida</h1>
        <p className="muted" style={{ margin: '0 auto', maxWidth: 460 }}>
          Revisaremos tu certificado de título contra la institución emisora. Cuando quede
          verificado, tu perfil aparecerá con la insignia «Verificado».
          {isPaid ? (
            <>
              {' '}
              El primer cobro del plan <strong>{plan.name}</strong> ({formatCLP(plan.price)}/mes)
              se realizará recién al activar tu cuenta verificada.
            </>
          ) : (
            ' Tu plan Básico es gratuito.'
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="section container" style={{ maxWidth: 680 }}>
      <div className="page-head">
        <h1>Registrar profesional</h1>
        <p className="muted">
          Crea tu perfil, elige tu plan y sube tu certificado de título.
        </p>
      </div>

      <ol className="stepper" aria-label="Progreso del registro">
        {steps.map((label, i) => {
          const n = i + 1
          const state = n < step ? 'done' : n === step ? 'current' : 'todo'
          return (
            <li key={label} className={`stepper-item is-${state}`}>
              <span className="stepper-dot">
                {n < step ? <Icon name="check" size={15} /> : n}
              </span>
              <span className="stepper-label">{label}</span>
            </li>
          )
        })}
      </ol>

      {/* Paso 1 — Plan */}
      {step === 1 && (
        <div className="reg-step card">
          <h2 className="reg-step-title">Elige tu plan</h2>
          <p className="muted reg-step-sub">
            Puedes empezar gratis y subir de plan cuando quieras emitir certificados.
          </p>
          <div className="plan-choices">
            {plans.map((p) => (
              <label key={p.id} className={`plan-choice ${planId === p.id ? 'is-selected' : ''}`}>
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={planId === p.id}
                  onChange={() => setPlanId(p.id)}
                />
                <span className="plan-choice-main">
                  <span className="plan-choice-name">{p.name}</span>
                  <span className="plan-choice-tag muted">{p.tagline}</span>
                </span>
                <span className="plan-choice-price">
                  {priceLabel(p)}
                  {p.price > 0 && <span className="muted">/mes</span>}
                </span>
              </label>
            ))}
          </div>
          <button className="btn btn-primary reg-next" onClick={() => setStep(2)}>
            Continuar
          </button>
        </div>
      )}

      {/* Paso 2 — Datos */}
      {step === 2 && (
        <form className="reg-step card" onSubmit={(e) => e.preventDefault()} noValidate>
          <h2 className="reg-step-title">Tus datos</h2>

          <div className="field">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre y apellidos"
            />
          </div>

          <div className="field">
            <label htmlFor="rut">RUT</label>
            <input
              id="rut"
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="12.345.678-9"
              aria-invalid={rutError}
              className={rutError ? 'input-error' : ''}
            />
            <p className="field-msg">
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
            <select id="uni" value={university} onChange={(e) => setUniversity(e.target.value)}>
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
              <input
                id="anio"
                type="number"
                min="1960"
                max="2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2018"
              />
            </div>
            <div className="field">
              <label htmlFor="region">Región</label>
              <input
                id="region"
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Metropolitana"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="titulo">Certificado de título (PDF)</label>
            <div className="filedrop">
              <Icon name="upload" size={22} />
              <span>Arrastra tu certificado o haz clic para subirlo</span>
              <input id="titulo" type="file" accept="application/pdf" />
            </div>
          </div>

          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Autorizo el tratamiento de mis datos para fines de verificación, conforme a la
              Ley 19.628 de protección de datos personales.
            </span>
          </label>

          <div className="reg-actions">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              Atrás
            </button>
            <button
              className="btn btn-primary"
              disabled={!dataComplete}
              onClick={() => setStep(3)}
            >
              Continuar
            </button>
          </div>
        </form>
      )}

      {/* Paso 3 — Confirmación */}
      {step === 3 && (
        <div className="reg-step card">
          <h2 className="reg-step-title">Confirma tu registro</h2>

          <div className="reg-summary">
            <div className="reg-summary-row">
              <span className="muted">Profesional</span>
              <strong>{fullName || '—'}</strong>
            </div>
            <div className="reg-summary-row">
              <span className="muted">RUT</span>
              <strong>{formatRut(rut)}</strong>
            </div>
            <div className="reg-summary-row">
              <span className="muted">Plan elegido</span>
              <strong>
                {plan.name} · {priceLabel(plan)}
                {isPaid ? '/mes' : ''}
              </strong>
            </div>
          </div>

          {isPaid ? (
            <div className="reg-billing">
              <div className="reg-billing-head">
                <Icon name="shield-check" size={20} />
                <strong>Cómo funciona el cobro</strong>
              </div>
              <ol className="reg-billing-steps">
                <li>Enviamos tu solicitud y verificamos tu título (sin costo).</li>
                <li>
                  Una vez verificado, activas tu plan {plan.name} y recién ahí se hace el
                  primer cobro de {formatCLP(plan.price)}/mes.
                </li>
                <li>El pago se procesa de forma segura (Webpay / Mercado Pago).</li>
              </ol>
              <p className="reg-billing-note muted">
                No se te cobra nada ahora. No pedimos datos de tarjeta en esta etapa.
              </p>
            </div>
          ) : (
            <div className="reg-billing reg-billing-free">
              <div className="reg-billing-head">
                <Icon name="check" size={20} />
                <strong>Plan Básico — gratis</strong>
              </div>
              <p className="muted">
                Tu perfil aparecerá verificado en el registro sin costo. Podrás subir al plan
                Profesional cuando quieras emitir certificados.
              </p>
            </div>
          )}

          <div className="reg-actions">
            <button className="btn btn-ghost" onClick={() => setStep(2)}>
              Atrás
            </button>
            <button className="btn btn-cta" onClick={() => setSubmitted(true)}>
              {isPaid ? 'Enviar solicitud y verificar' : 'Crear mi perfil gratis'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
