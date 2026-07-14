import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import './PlansPage.css'

interface Plan {
  name: string
  price: string
  period: string
  tagline: string
  cta: string
  ctaTo: string
  featured?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Ciudadano',
    price: 'Gratis',
    period: 'siempre',
    tagline: 'Para dueños de mascotas que quieren verificar a su veterinario.',
    cta: 'Buscar ahora',
    ctaTo: '/buscar',
    features: [
      'Búsqueda ilimitada por nombre o RUT',
      'Ver título, universidad y año',
      'Ver especialidades y diplomados',
      'Estado de verificación del profesional',
    ],
  },
  {
    name: 'Profesional',
    price: '$6.990',
    period: 'por mes',
    tagline: 'Para el médico veterinario que quiere destacar y emitir documentos.',
    cta: 'Registrarme',
    ctaTo: '/registro',
    featured: true,
    features: [
      'Perfil público con insignia «Verificado»',
      'Emisión de certificados de salud en PDF',
      'Recetas y órdenes de examen en línea',
      'Certificados con folio y código QR de validación',
      'Aparición prioritaria en búsquedas',
    ],
  },
  {
    name: 'Clínica',
    price: '$24.990',
    period: 'por mes',
    tagline: 'Para clínicas que quieren certificar a todo su equipo.',
    cta: 'Hablar con ventas',
    ctaTo: '/registro',
    features: [
      'Todo lo del plan Profesional',
      'Insignia «Clínica certificada»',
      'Hasta 10 profesionales verificados',
      'Página de clínica con su equipo',
      'Panel de administración del equipo',
    ],
  },
]

export function PlansPage() {
  return (
    <div className="section container">
      <div className="page-head" style={{ textAlign: 'center' }}>
        <h1>Planes y precios</h1>
        <p className="muted" style={{ margin: '8px auto 0' }}>
          Verificar es gratis para siempre. Los profesionales y clínicas pagan por destacar y
          emitir documentos en línea.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((p) => (
          <div key={p.name} className={`plan card ${p.featured ? 'plan-featured' : ''}`}>
            {p.featured && <span className="plan-tag">Más elegido</span>}
            <h2 className="plan-name">{p.name}</h2>
            <div className="plan-price">
              <span className="plan-amount">{p.price}</span>
              <span className="plan-period muted">/ {p.period}</span>
            </div>
            <p className="plan-tagline muted">{p.tagline}</p>
            <Link to={p.ctaTo} className={`btn ${p.featured ? 'btn-cta' : 'btn-ghost'} plan-cta`}>
              {p.cta}
            </Link>
            <ul className="plan-features">
              {p.features.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="plans-note card">
        <div className="plans-note-icon">
          <Icon name="document" size={24} />
        </div>
        <div>
          <h3>¿Y los certificados?</h3>
          <p className="muted">
            Cada certificado emitido (salud, viaje, receta) puede cobrarse por documento —
            desde <strong>$1.990</strong> — o incluirse según el plan. El dueño de la mascota
            lo descarga en PDF con folio y código QR verificable.
          </p>
        </div>
      </div>

      <p className="plans-legal muted">
        Precios de referencia en pesos chilenos (CLP), IVA incluido. Valores demostrativos del
        MVP, sujetos a definición comercial.
      </p>
    </div>
  )
}
