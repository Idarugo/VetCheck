/**
 * Utilidades para el RUT chileno (Rol Único Tributario).
 *
 * El dígito verificador se calcula con el algoritmo Módulo 11:
 * se recorre el cuerpo del RUT de derecha a izquierda multiplicando
 * cada dígito por una serie cíclica 2,3,4,5,6,7 y el DV es 11 - (suma % 11).
 * 11 => '0', 10 => 'K'.
 */

/** Deja solo dígitos y una eventual K final (mayúscula). */
export function cleanRut(value: string): string {
  return value.replace(/[^0-9kK]/g, '').toUpperCase()
}

/** Calcula el dígito verificador para un cuerpo numérico de RUT. */
export function computeDv(body: string): string {
  let sum = 0
  let multiplier = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  const remainder = 11 - (sum % 11)
  if (remainder === 11) return '0'
  if (remainder === 10) return 'K'
  return String(remainder)
}

/** Valida un RUT completo (cuerpo + dígito verificador). */
export function isValidRut(value: string): boolean {
  const clean = cleanRut(value)
  if (clean.length < 2) return false
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  if (!/^\d+$/.test(body)) return false
  return computeDv(body) === dv
}

/** Formatea un RUT con puntos y guion: 12345678K -> 12.345.678-K */
export function formatRut(value: string): string {
  const clean = cleanRut(value)
  if (clean.length < 2) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${withDots}-${dv}`
}

/** Determina si una cadena de búsqueda "parece" un RUT (contiene dígitos y guion o K). */
export function looksLikeRut(query: string): boolean {
  const clean = cleanRut(query)
  return clean.length >= 7 && /^\d+[0-9K]$/.test(clean)
}
