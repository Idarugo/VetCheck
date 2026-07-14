import type { VerificationStatus } from '../types'
import { Icon } from './Icon'

const config: Record<
  VerificationStatus,
  { label: string; cls: string; icon: 'shield-check' | 'clock' | 'shield-alert' }
> = {
  verificado: { label: 'Verificado', cls: 'badge-ok', icon: 'shield-check' },
  pendiente: { label: 'Verificación pendiente', cls: 'badge-warn', icon: 'clock' },
  no_verificado: { label: 'No verificado', cls: 'badge-danger', icon: 'shield-alert' },
}

export function VerifiedBadge({ status, size = 13 }: { status: VerificationStatus; size?: number }) {
  const c = config[status]
  return (
    <span className={`badge ${c.cls}`} style={{ fontSize: size }}>
      <Icon name={c.icon} size={size + 3} />
      {c.label}
    </span>
  )
}
