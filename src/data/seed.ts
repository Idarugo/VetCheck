import type { Vet, Clinic } from '../types'

/**
 * DATOS DE DEMOSTRACIÓN.
 *
 * En producción esta información NO vive en el frontend: proviene de un backend
 * que valida los títulos contra una fuente oficial (universidad emisora / Registro
 * Civil / convenio con el Colegio Médico Veterinario). Ver services/registry.ts,
 * cuya interfaz permite reemplazar este seed por llamadas HTTP sin tocar la UI.
 *
 * Todos los RUT tienen dígito verificador válido (Módulo 11).
 */

export const clinics: Clinic[] = [
  {
    id: 'cl-01',
    name: 'Clínica Veterinaria Providencia',
    city: 'Providencia',
    region: 'Metropolitana',
    certified: true,
    vetIds: ['v-01', 'v-03'],
  },
  {
    id: 'cl-02',
    name: 'Hospital Veterinario del Sur',
    city: 'Concepción',
    region: 'Biobío',
    certified: true,
    vetIds: ['v-02'],
  },
  {
    id: 'cl-03',
    name: 'VetCare Las Condes',
    city: 'Las Condes',
    region: 'Metropolitana',
    certified: false,
    vetIds: ['v-05'],
  },
]

export const vets: Vet[] = [
  {
    id: 'v-01',
    rut: '154238824',
    firstName: 'Camila',
    lastName: 'Rojas Fuentes',
    status: 'verificado',
    title: { degree: 'Médico Veterinario', university: 'Universidad de Chile', year: 2014 },
    credentials: [
      { kind: 'especialidad', name: 'Medicina de animales de compañía', institution: 'Universidad de Chile', year: 2017 },
      { kind: 'diplomado', name: 'Diplomado en Cardiología Veterinaria', institution: 'Pontificia U. Católica', year: 2019 },
    ],
    city: 'Providencia',
    region: 'Metropolitana',
    clinicIds: ['cl-01'],
    verifiedAt: '2026-03-11',
    services: ['Certificado de salud', 'Receta electrónica', 'Orden de exámenes', 'Certificado para viaje'],
    photoInitials: 'CR',
  },
  {
    id: 'v-02',
    rut: '128765433',
    firstName: 'Ignacio',
    lastName: 'Muñoz Salas',
    status: 'verificado',
    title: { degree: 'Médico Veterinario', university: 'Universidad de Concepción', year: 2009 },
    credentials: [
      { kind: 'magister', name: 'Magíster en Ciencias Animales', institution: 'Universidad de Concepción', year: 2012 },
      { kind: 'internado', name: 'Internado en Cirugía de Tejidos Blandos', institution: 'U. de Chile', year: 2011 },
    ],
    city: 'Concepción',
    region: 'Biobío',
    clinicIds: ['cl-02'],
    verifiedAt: '2026-01-22',
    services: ['Certificado de salud', 'Receta electrónica', 'Orden de exámenes'],
    photoInitials: 'IM',
  },
  {
    id: 'v-03',
    rut: '97654328',
    firstName: 'Valentina',
    lastName: 'Pérez Lagos',
    status: 'verificado',
    title: { degree: 'Médico Veterinario', university: 'Universidad Austral de Chile', year: 2018 },
    credentials: [
      { kind: 'diplomado', name: 'Diplomado en Dermatología', institution: 'U. Austral de Chile', year: 2021 },
      { kind: 'curso', name: 'Curso de Ecografía Abdominal', institution: 'Colegio Médico Veterinario', year: 2022 },
    ],
    city: 'Providencia',
    region: 'Metropolitana',
    clinicIds: ['cl-01'],
    verifiedAt: '2026-05-02',
    services: ['Certificado de salud', 'Receta electrónica'],
    photoInitials: 'VP',
  },
  {
    id: 'v-04',
    rut: '182345679',
    firstName: 'Matías',
    lastName: 'Contreras Díaz',
    status: 'pendiente',
    title: { degree: 'Médico Veterinario', university: 'Universidad Mayor', year: 2020 },
    credentials: [],
    city: 'Temuco',
    region: 'Araucanía',
    clinicIds: [],
    services: [],
    photoInitials: 'MC',
  },
  {
    id: 'v-05',
    rut: '201112222',
    firstName: 'Antonia',
    lastName: 'Silva Vera',
    status: 'no_verificado',
    title: { degree: 'Médico Veterinario (declarado)', university: 'No verificada', year: 2016 },
    credentials: [],
    city: 'Las Condes',
    region: 'Metropolitana',
    clinicIds: ['cl-03'],
    services: [],
    photoInitials: 'AS',
  },
  {
    id: 'v-06',
    rut: '135678902',
    firstName: 'Felipe',
    lastName: 'Araya Núñez',
    status: 'verificado',
    title: { degree: 'Médico Veterinario', university: 'Universidad Santo Tomás', year: 2013 },
    credentials: [
      { kind: 'especialidad', name: 'Medicina de animales exóticos', institution: 'U. Santo Tomás', year: 2016 },
    ],
    city: 'Valparaíso',
    region: 'Valparaíso',
    clinicIds: [],
    verifiedAt: '2026-04-18',
    services: ['Certificado de salud', 'Orden de exámenes', 'Certificado para viaje'],
    photoInitials: 'FA',
  },
]
