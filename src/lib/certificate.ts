/**
 * Lógica de certificados veterinarios.
 *
 * DEMO sin backend: para que el código QR funcione al escanearlo desde OTRO
 * teléfono, los datos del certificado se codifican en la propia URL de
 * verificación (base64url). En producción, el QR llevaría solo el folio y la
 * página de verificación consultaría el registro central — así el documento no
 * podría alterarse editando la URL.
 */

export interface CertificateData {
  folio: string
  type: string
  vetName: string
  vetRut: string
  vetTitle: string
  vetUniversity: string
  patient: string
  species: string
  tutor: string
  date: string // ISO yyyy-mm-dd
  detail?: string
}

const TYPES = [
  'Certificado de salud',
  'Certificado para viaje',
  'Receta veterinaria',
  'Orden de exámenes',
]

export const certificateTypes = TYPES

/** Genera un folio único legible: VC-2026-XXXX-XX */
export function makeFolio(): string {
  const year = new Date().getFullYear()
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  const time = Date.now().toString(36).slice(-2).toUpperCase()
  return `VC-${year}-${rand}-${time}`
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeCertificate(data: CertificateData): string {
  return toBase64Url(JSON.stringify(data))
}

export function decodeCertificate(encoded: string): CertificateData | null {
  try {
    const obj = JSON.parse(fromBase64Url(encoded))
    if (obj && typeof obj.folio === 'string' && typeof obj.vetName === 'string') {
      return obj as CertificateData
    }
    return null
  } catch {
    return null
  }
}

/** URL pública de verificación que se incrusta en el QR. */
export function verifyUrl(data: CertificateData): string {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'https://vet-check.vercel.app'
  return `${origin}/verificar?c=${encodeCertificate(data)}`
}
