/** Modelo de dominio de VetCheck Chile. */

export type VerificationStatus = 'verificado' | 'pendiente' | 'no_verificado'

export interface Title {
  /** Ej: "Médico Veterinario" */
  degree: string
  university: string
  /** Año de titulación */
  year: number
}

export interface Credential {
  /** "especialidad" | "diplomado" | "curso" | "internado" | "magister" */
  kind: 'especialidad' | 'diplomado' | 'curso' | 'internado' | 'magister'
  name: string
  institution: string
  year: number
}

export interface Clinic {
  id: string
  name: string
  city: string
  region: string
  certified: boolean
  vetIds: string[]
}

export interface Vet {
  id: string
  /** RUT sin formato, cuerpo+DV, ej "154238820" */
  rut: string
  firstName: string
  lastName: string
  /** Estado de verificación del título contra la fuente oficial. */
  status: VerificationStatus
  title: Title
  credentials: Credential[]
  city: string
  region: string
  clinicIds: string[]
  /** Fecha ISO de la última verificación. */
  verifiedAt?: string
  /** Servicios que el profesional puede emitir en la plataforma. */
  services: string[]
  photoInitials: string
}

export interface SearchResult {
  vets: Vet[]
  query: string
  byRut: boolean
}
