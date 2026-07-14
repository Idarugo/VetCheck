import { Link } from 'react-router-dom'
import './misc.css'

export function NotFoundPage() {
  return (
    <div className="section container page-head" style={{ textAlign: 'center', maxWidth: 520 }}>
      <p className="notfound-code">404</p>
      <h1>Página no encontrada</h1>
      <p className="muted">La ruta que buscas no existe o fue movida.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>
        Volver al inicio
      </Link>
    </div>
  )
}
