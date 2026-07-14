import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { looksLikeRut, isValidRut, formatRut } from '../lib/rut'
import './SearchBar.css'

export function SearchBar({ autoFocus = false, initial = '' }: { autoFocus?: boolean; initial?: string }) {
  const [value, setValue] = useState(initial)
  const navigate = useNavigate()

  const trimmed = value.trim()
  const isRut = looksLikeRut(trimmed)
  const rutInvalid = isRut && !isValidRut(trimmed)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!trimmed) return
    navigate(`/buscar?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search">
      <label htmlFor="q" className="sr-only">
        Buscar por nombre o RUT del veterinario
      </label>
      <div className={`searchbar-field ${rutInvalid ? 'is-invalid' : ''}`}>
        <Icon name="search" size={22} className="searchbar-icon" />
        <input
          id="q"
          name="q"
          type="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nombre completo o RUT del veterinario"
          autoComplete="off"
          aria-describedby="q-hint"
        />
        <button type="submit" className="btn btn-cta searchbar-btn">
          Buscar
        </button>
      </div>
      <p id="q-hint" className="searchbar-hint">
        {rutInvalid ? (
          <span className="searchbar-error">
            <Icon name="x" size={15} /> El RUT ingresado no es válido (dígito verificador).
          </span>
        ) : isRut && isValidRut(trimmed) ? (
          <span className="searchbar-ok">
            <Icon name="check" size={15} /> RUT válido: {formatRut(trimmed)}
          </span>
        ) : (
          <>Ej: «Camila Rojas» o «15.423.882-4»</>
        )}
      </p>
    </form>
  )
}
