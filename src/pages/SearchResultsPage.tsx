import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { VetCard } from '../components/VetCard'
import { Icon } from '../components/Icon'
import { searchVets } from '../services/registry'
import { looksLikeRut, isValidRut, formatRut } from '../lib/rut'
import type { SearchResult } from '../types'
import './SearchResultsPage.css'

export function SearchResultsPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const [result, setResult] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const rutInvalid = looksLikeRut(query) && !isValidRut(query)

  useEffect(() => {
    if (!query.trim() || rutInvalid) {
      setResult(null)
      return
    }
    let active = true
    setLoading(true)
    searchVets(query).then((r) => {
      if (active) {
        setResult(r)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [query, rutInvalid])

  return (
    <div className="section container search-page">
      <div className="search-page-head">
        <h1>Buscar médico veterinario</h1>
        <SearchBar initial={query} />
      </div>

      {rutInvalid && (
        <div className="notice notice-danger">
          <Icon name="shield-alert" size={22} />
          <div>
            <strong>El RUT «{query}» no es válido.</strong>
            <p className="muted">
              Revisa el dígito verificador. Ejemplo de formato correcto: 15.423.882-4
            </p>
          </div>
        </div>
      )}

      {loading && (
        <ul className="results-list" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="card skeleton-card" aria-hidden="true">
              <span className="skeleton skeleton-avatar" />
              <span className="skeleton-lines">
                <span className="skeleton skeleton-line w60" />
                <span className="skeleton skeleton-line w40" />
                <span className="skeleton skeleton-line w80" />
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && result && (
        <>
          <p className="results-count muted">
            {result.vets.length === 0
              ? 'Sin resultados'
              : `${result.vets.length} resultado${result.vets.length > 1 ? 's' : ''}`}{' '}
            para{' '}
            {result.byRut ? (
              <strong>RUT {formatRut(result.query)}</strong>
            ) : (
              <strong>«{result.query}»</strong>
            )}
          </p>

          {result.vets.length > 0 ? (
            <ul className="results-list">
              {result.vets.map((v) => (
                <li key={v.id}>
                  <VetCard vet={v} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state card">
              <span className="empty-icon">
                <Icon name="search" size={30} />
              </span>
              <h2>No encontramos ese profesional</h2>
              <p className="muted">
                Puede que aún no esté inscrito en el registro, o que el nombre/RUT tenga otra
                escritura. Si eres tú, puedes registrarte.
              </p>
            </div>
          )}
        </>
      )}

      {!loading && !result && !rutInvalid && (
        <div className="empty-state card">
          <span className="empty-icon">
            <Icon name="search" size={30} />
          </span>
          <h2>Escribe un nombre o RUT</h2>
          <p className="muted">Comienza tu búsqueda para verificar a un médico veterinario.</p>
        </div>
      )}
    </div>
  )
}
