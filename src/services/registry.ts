import type { Vet, Clinic, SearchResult } from '../types'
import { vets as seedVets, clinics as seedClinics } from '../data/seed'
import { cleanRut, looksLikeRut } from '../lib/rut'

/**
 * Capa de acceso a datos del registro.
 *
 * Hoy resuelve contra datos en memoria (seed). Para conectar un backend real,
 * basta reemplazar el cuerpo de estas funciones por `fetch(...)` — la firma
 * (Promise) ya es asíncrona, así que la UI no cambia.
 *
 *   Ejemplo futuro:
 *   export async function searchVets(q: string) {
 *     const r = await fetch(`/api/vets?q=${encodeURIComponent(q)}`)
 *     return r.json()
 *   }
 */

const LATENCY_MS = 250

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export async function searchVets(query: string): Promise<SearchResult> {
  const q = query.trim()
  if (!q) return delay({ vets: [], query: q, byRut: false })

  const byRut = looksLikeRut(q)

  let results: Vet[]
  if (byRut) {
    const target = cleanRut(q)
    results = seedVets.filter((v) => v.rut === target)
  } else {
    const nq = normalize(q)
    results = seedVets.filter((v) =>
      normalize(`${v.firstName} ${v.lastName}`).includes(nq),
    )
  }

  return delay({ vets: results, query: q, byRut })
}

export async function getVet(id: string): Promise<Vet | undefined> {
  return delay(seedVets.find((v) => v.id === id))
}

export async function getClinic(id: string): Promise<Clinic | undefined> {
  return delay(seedClinics.find((c) => c.id === id))
}

export async function getClinicsForVet(vet: Vet): Promise<Clinic[]> {
  return delay(seedClinics.filter((c) => vet.clinicIds.includes(c.id)))
}

export async function getVetsForClinic(clinic: Clinic): Promise<Vet[]> {
  return delay(seedVets.filter((v) => clinic.vetIds.includes(v.id)))
}

export async function listClinics(): Promise<Clinic[]> {
  return delay(seedClinics)
}

export interface RegistryStats {
  verified: number
  total: number
  clinics: number
}

export async function getStats(): Promise<RegistryStats> {
  return delay({
    verified: seedVets.filter((v) => v.status === 'verificado').length,
    total: seedVets.length,
    clinics: seedClinics.filter((c) => c.certified).length,
  })
}
