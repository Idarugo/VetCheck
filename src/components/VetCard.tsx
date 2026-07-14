import { Link } from 'react-router-dom'
import type { Vet } from '../types'
import { Icon } from './Icon'
import { VerifiedBadge } from './VerifiedBadge'
import { formatRut } from '../lib/rut'
import './VetCard.css'

export function Avatar({ initials, size = 56 }: { initials: string; size?: number }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials}
    </span>
  )
}

export function VetCard({ vet }: { vet: Vet }) {
  return (
    <Link to={`/veterinario/${vet.id}`} className="vetcard card">
      <Avatar initials={vet.photoInitials} />
      <div className="vetcard-body">
        <div className="vetcard-top">
          <h3 className="vetcard-name">
            {vet.firstName} {vet.lastName}
          </h3>
          <VerifiedBadge status={vet.status} />
        </div>
        <p className="vetcard-rut muted">RUT {formatRut(vet.rut)}</p>
        <p className="vetcard-meta">
          <Icon name="graduation" size={17} />
          {vet.title.degree} · {vet.title.university} · {vet.title.year}
        </p>
        <p className="vetcard-meta muted">
          <Icon name="map-pin" size={17} />
          {vet.city}, Región {vet.region}
        </p>
      </div>
      <Icon name="arrow-right" size={20} className="vetcard-arrow" />
    </Link>
  )
}
