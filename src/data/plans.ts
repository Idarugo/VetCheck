/** Definición de planes — fuente única compartida por la página de Planes y el
 *  flujo de registro. */

export type PlanId = 'basico' | 'profesional' | 'clinica'

export interface Plan {
  id: PlanId
  name: string
  /** Precio mensual en CLP. 0 = gratis. */
  price: number
  period: string
  tagline: string
  featured?: boolean
  features: string[]
}

export const plans: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    price: 0,
    period: 'para siempre',
    tagline: 'Para el veterinario que quiere aparecer verificado en el registro.',
    features: [
      'Perfil público con insignia «Verificado»',
      'Aparición en las búsquedas por nombre y RUT',
      'Título, universidad y especialidades visibles',
    ],
  },
  {
    id: 'profesional',
    name: 'Profesional',
    price: 6990,
    period: 'por mes',
    tagline: 'Para emitir documentos en línea y destacar.',
    featured: true,
    features: [
      'Todo lo del plan Básico',
      'Emisión de certificados de salud en PDF',
      'Recetas y órdenes de examen en línea',
      'Certificados con folio y código QR de validación',
      'Aparición prioritaria en búsquedas',
    ],
  },
  {
    id: 'clinica',
    name: 'Clínica',
    price: 24990,
    period: 'por mes',
    tagline: 'Para certificar a todo el equipo de la clínica.',
    features: [
      'Todo lo del plan Profesional',
      'Insignia «Clínica certificada»',
      'Hasta 10 profesionales verificados',
      'Página de clínica con su equipo',
      'Panel de administración del equipo',
    ],
  },
]

export function getPlan(id: string | null): Plan | undefined {
  return plans.find((p) => p.id === id)
}

/** Formatea CLP: 6990 -> "$6.990" */
export function formatCLP(value: number): string {
  return '$' + value.toLocaleString('es-CL')
}

export function priceLabel(plan: Plan): string {
  return plan.price === 0 ? 'Gratis' : formatCLP(plan.price)
}
