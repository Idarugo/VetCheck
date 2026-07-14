import { Link, NavLink, Outlet } from 'react-router-dom'
import { Icon } from './Icon'
import './Layout.css'

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="VetCheck Chile — inicio">
      <span className="brand-mark">
        <Icon name="shield-check" size={22} />
      </span>
      <span className="brand-name">
        VetCheck<span className="brand-cl"> Chile</span>
      </span>
    </Link>
  )
}

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <Brand />
          <nav className="site-nav" aria-label="Principal">
            <NavLink to="/buscar" className="site-nav-link">
              Buscar
            </NavLink>
            <NavLink to="/clinicas" className="site-nav-link">
              Clínicas
            </NavLink>
            <NavLink to="/como-funciona" className="site-nav-link">
              Cómo funciona
            </NavLink>
            <Link to="/registro" className="btn btn-primary site-nav-cta">
              Registrar profesional
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <div>
            <Brand />
            <p className="muted footer-tag">
              Registro y verificación de médicos veterinarios de Chile.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Plataforma</h4>
              <Link to="/buscar">Buscar profesional</Link>
              <Link to="/clinicas">Clínicas certificadas</Link>
              <Link to="/registro">Registrar profesional</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="#">Protección de datos (Ley 19.628)</a>
              <a href="#">Términos y condiciones</a>
              <a href="#">Fuente de verificación</a>
            </div>
          </div>
        </div>
        <div className="container footer-legal muted">
          MVP demostrativo · Los datos mostrados son ficticios. VetCheck Chile no es un
          organismo oficial.
        </div>
      </footer>
    </>
  )
}
