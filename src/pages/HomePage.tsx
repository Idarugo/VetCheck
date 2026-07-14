import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { Icon } from '../components/Icon'
import { getStats, type RegistryStats } from '../services/registry'
import './HomePage.css'

const steps = [
  {
    icon: 'search' as const,
    title: 'Busca por nombre o RUT',
    text: 'Escribe el nombre completo o el RUT del médico veterinario que quieres verificar.',
  },
  {
    icon: 'shield-check' as const,
    title: 'Confirma su título',
    text: 'Revisa si está titulado, de qué universidad egresó y en qué año, con estado de verificación.',
  },
  {
    icon: 'award' as const,
    title: 'Conoce sus especialidades',
    text: 'Especialidades, diplomados, cursos e internados que respaldan su ejercicio profesional.',
  },
]

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label muted">{label}</span>
    </div>
  )
}

export function HomePage() {
  const [stats, setStats] = useState<RegistryStats | null>(null)
  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-eyebrow">
            <Icon name="shield-check" size={16} /> Verificación de profesionales veterinarios
          </span>
          <h1 className="hero-title">
            Comprueba si tu veterinario está <span className="hero-hl">realmente titulado</span>
          </h1>
          <p className="hero-sub">
            Busca por nombre o RUT y confirma su título, universidad, año de egreso y
            especialidades. Transparencia para que tomes decisiones informadas sobre la salud
            de tu mascota.
          </p>
          <div className="hero-search">
            <SearchBar autoFocus />
          </div>
          <div className="hero-suggested muted">
            Búsquedas frecuentes:{' '}
            <Link to="/buscar?q=Camila%20Rojas">Camila Rojas</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/buscar?q=15.423.882-4">15.423.882-4</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/buscar?q=Ignacio%20Mu%C3%B1oz">Ignacio Muñoz</Link>
          </div>
        </div>
      </section>

      {stats && (
        <section className="container stats-row">
          <Stat value={`${stats.verified}`} label="Profesionales verificados" />
          <Stat value={`${stats.clinics}`} label="Clínicas certificadas" />
          <Stat value="Módulo 11" label="Validación de RUT en tiempo real" />
        </section>
      )}

      <section className="section container">
        <div className="section-head">
          <h2>Cómo funciona</h2>
          <p className="muted">Tres pasos para verificar a cualquier médico veterinario.</p>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step card">
              <span className="step-num">{i + 1}</span>
              <span className="step-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section trust-band">
        <div className="container trust-inner">
          <div className="trust-text">
            <h2>¿Eres médico veterinario o clínica?</h2>
            <p>
              Súmate al registro, carga tu título y credenciales, y ofrece certificados,
              recetas y órdenes de examen en línea a tus pacientes. Las clínicas certificadas
              demuestran que todo su equipo está titulado.
            </p>
            <div className="trust-actions">
              <Link to="/registro" className="btn btn-cta">
                Registrar profesional
              </Link>
              <Link to="/como-funciona" className="btn btn-ghost">
                Ver cómo se verifica
              </Link>
            </div>
          </div>
          <ul className="trust-list">
            <li>
              <Icon name="check" size={20} /> Perfil público con insignia «Verificado»
            </li>
            <li>
              <Icon name="check" size={20} /> Emisión de certificados y recetas en línea
            </li>
            <li>
              <Icon name="check" size={20} /> Clínicas con todo su equipo acreditado
            </li>
            <li>
              <Icon name="check" size={20} /> Cumplimiento de protección de datos (Ley 19.628)
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
