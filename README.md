# VetCheck Chile 🛡️

Registro y verificación de médicos veterinarios de Chile — **MVP**.

Busca por **nombre o RUT** y confirma si un profesional está titulado, de qué
universidad, en qué año, y sus especialidades/diplomados/cursos. Inspirado en el
Registro Nacional de Prestadores de la Superintendencia de Salud, pero para
veterinarios (que hoy **no** tienen un registro público nacional equivalente).

## Stack

- **Vite + React 18 + TypeScript**
- **react-router-dom** para el ruteo
- **CSS plano** con tokens de diseño (sin frameworks) — estilo *Accesible & Ético* (WCAG)
- Sin backend: la data vive tras una **capa de servicio** desacoplada

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción
npm run typecheck  # verificación de tipos
```

## Arquitectura

```
src/
├── lib/rut.ts             # Validación de RUT chileno (algoritmo Módulo 11) + formato
├── types.ts               # Modelo de dominio (Vet, Clinic, Credential…)
├── data/seed.ts           # Datos DEMO (ficticios, RUT con DV válido)
├── services/registry.ts   # ← CAPA DE DATOS. Hoy en memoria; cambiar a fetch() para API real
├── components/            # Icon, SearchBar, VetCard, VerifiedBadge, Layout
├── pages/                 # Home, Búsqueda, Perfil vet, Clínicas, Registro, Cómo funciona
└── styles/                # theme.css (tokens) + global.css
```

### El punto clave: `services/registry.ts`

Toda la UI consume funciones **asíncronas** (`searchVets`, `getVet`…). Hoy resuelven
contra `data/seed.ts`, pero su firma ya es `Promise`, así que conectar un backend
real es reemplazar el cuerpo por `fetch()` **sin tocar los componentes**:

```ts
export async function searchVets(q: string) {
  const r = await fetch(`/api/vets?q=${encodeURIComponent(q)}`)
  return r.json()
}
```

## El verdadero desafío (no es el código)

A diferencia de los médicos, **no existe una API pública nacional** que diga
"este RUT = veterinario titulado". El origen del dato de verificación es lo que
hace o quiebra el producto. Estrategia por fases:

1. **MVP (hoy):** el profesional carga su **certificado de título** → verificación manual → insignia «Verificado».
2. **Convenios:** universidades emisoras / Registro Civil / Colegio Médico Veterinario.
3. **Reputación:** clínicas certificadas donde todo el equipo está acreditado.

## Consideraciones legales

- **Ley 19.628** (protección de datos): consentimiento explícito en el registro.
- Recetas y órdenes de examen electrónicas: requisitos de validez y firma.
- Responsabilidad sobre la certificación: la **fuente del dato** debe ser trazable.

---

> ⚠️ MVP demostrativo. Los datos son ficticios. VetCheck Chile no es un organismo oficial.
# VetCheck
