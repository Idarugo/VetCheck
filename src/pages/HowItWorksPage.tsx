import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import './misc.css'

const faqs = [
  {
    q: '¿De dónde sale el dato de que alguien es veterinario titulado?',
    a: 'A diferencia de los médicos —que están en el Registro Nacional de Prestadores de la Superintendencia de Salud— los veterinarios no tienen un registro público nacional equivalente. Por eso VetCheck verifica el certificado de título contra la institución emisora y, a futuro, mediante convenios con universidades y el Colegio Médico Veterinario.',
  },
  {
    q: '¿Qué significa la insignia «Verificado»?',
    a: 'Que revisamos el certificado de título del profesional y lo contrastamos con la fuente correspondiente. «Pendiente» indica que la revisión está en curso; «No verificado» que no pudimos confirmarlo.',
  },
  {
    q: '¿Cómo se validan los RUT?',
    a: 'Con el algoritmo Módulo 11, el mismo que usa el Servicio de Impuestos Internos. La validación del dígito verificador ocurre en el navegador, en tiempo real.',
  },
  {
    q: '¿Qué gana una clínica al certificarse?',
    a: 'Demuestra que todos los profesionales de su equipo están titulados y verificados, lo que da confianza a los pacientes. Además puede ofrecer certificados, recetas y órdenes de examen en línea.',
  },
]

export function HowItWorksPage() {
  return (
    <div className="section container" style={{ maxWidth: 760 }}>
      <div className="page-head">
        <h1>Cómo verificamos</h1>
        <p className="muted">
          Transparencia sobre el origen de los datos y el proceso de verificación.
        </p>
      </div>

      <ol className="flow">
        <li className="card flow-step">
          <span className="flow-icon"><Icon name="upload" size={22} /></span>
          <div>
            <h3>1 · El profesional se inscribe</h3>
            <p className="muted">Crea su perfil y carga el certificado de título en PDF.</p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-icon"><Icon name="shield-check" size={22} /></span>
          <div>
            <h3>2 · Contrastamos con la fuente</h3>
            <p className="muted">
              Revisamos el certificado contra la institución emisora / Registro Civil.
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-icon"><Icon name="award" size={22} /></span>
          <div>
            <h3>3 · Se publica el perfil verificado</h3>
            <p className="muted">
              Aparece con su insignia, universidad, año y especialidades, listo para búsqueda.
            </p>
          </div>
        </li>
      </ol>

      <h2 className="faq-title">Preguntas frecuentes</h2>
      <div className="faq">
        {faqs.map((f) => (
          <details key={f.q} className="card faq-item">
            <summary>{f.q}</summary>
            <p className="muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="cta-strip card">
        <div>
          <h3>¿Listo para verificar a un profesional?</h3>
          <p className="muted">Busca por nombre o RUT en segundos.</p>
        </div>
        <Link to="/buscar" className="btn btn-cta">
          Ir a buscar
        </Link>
      </div>
    </div>
  )
}
