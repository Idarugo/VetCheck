import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { plans, priceLabel } from '../data/plans'
import './PlansPage.css'

export function PlansPage() {
  return (
    <div className="section container">
      <div className="page-head" style={{ textAlign: 'center' }}>
        <h1>Planes y precios</h1>
        <p className="muted" style={{ margin: '8px auto 0' }}>
          Los profesionales y clínicas eligen un plan al registrarse. Verificar a un
          veterinario es siempre gratis.
        </p>
      </div>

      <div className="citizen-banner card">
        <div className="citizen-banner-icon">
          <Icon name="search" size={22} />
        </div>
        <div className="citizen-banner-text">
          <strong>¿Solo quieres verificar a un veterinario?</strong>
          <p className="muted">Búscalo por nombre o RUT, gratis y sin registro.</p>
        </div>
        <Link to="/buscar" className="btn btn-ghost">
          Buscar ahora
        </Link>
      </div>

      <p className="plans-section-label">Para veterinarios y clínicas</p>

      <div className="plans-grid">
        {plans.map((p) => (
          <div key={p.id} className={`plan card ${p.featured ? 'plan-featured' : ''}`}>
            {p.featured && <span className="plan-tag">Más elegido</span>}
            <h2 className="plan-name">{p.name}</h2>
            <div className="plan-price">
              <span className="plan-amount">{priceLabel(p)}</span>
              <span className="plan-period muted">
                {p.price === 0 ? '' : '/ '}
                {p.period}
              </span>
            </div>
            <p className="plan-tagline muted">{p.tagline}</p>
            <Link
              to={`/registro?plan=${p.id}`}
              className={`btn ${p.featured ? 'btn-cta' : 'btn-ghost'} plan-cta`}
            >
              {p.price === 0 ? 'Registrarme gratis' : 'Elegir plan'}
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
            Los planes Profesional y Clínica incluyen emisión de certificados. Con el plan
            Básico también puedes emitirlos pagando por documento — desde{' '}
            <strong>$1.990</strong>. El dueño de la mascota lo descarga en PDF con folio y
            código QR verificable.
          </p>
        </div>
      </div>

      <p className="plans-legal muted">
        Precios de referencia en pesos chilenos (CLP), IVA incluido. El cobro de un plan de
        pago se activa una vez que el título del profesional queda verificado. Valores
        demostrativos del MVP.
      </p>
    </div>
  )
}
