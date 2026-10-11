# Explorer App

Aplicación para explorar información de países: búsqueda por nombre, filtro por región, vista de detalle con navegación tipo SPA (hash routing), y manejo de los estados de carga, vacío y error. Construida con **Vite + TypeScript (Vanilla, sin frameworks) + Tailwind CSS v4**, organizada en módulos por responsabilidad.

Esta es la **versión Vanilla TypeScript** del proyecto.

## Fuente de datos

[REST Countries API v5](https://restcountries.com/docs) (`https://api.restcountries.com/countries/v5`). La petición se autentica con una API key enviada en el header `Authorization: Bearer`, y se pagina con `limit`/`offset` hasta obtener el catálogo completo de países.

No se utilizó el JSON de contingencia facilitado por la docente: la aplicación consume la API en vivo mediante `fetch`, con tipado explícito de la respuesta y manejo de errores (sin uso de `any` en ningún archivo del proyecto).

## Cómo ejecutar el proyecto

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar la API key

Crea un archivo `.env` en la raíz del proyecto con tu propia key de REST Countries:

```
VITE_REST_COUNTRIES_API_KEY=tu_api_key_aquí
```

### 3. Levantar el servidor de desarrollo

```bash
pnpm dev
```

Abre la URL que indique la terminal (por defecto `http://localhost:5173`).

### 4. Build de producción

```bash
pnpm build
```

Genera la carpeta `dist/` lista para desplegar.

## Estructura de carpetas

```
Explorer-app/
├── index.html              Punto de entrada único (SPA)
├── public/
│   ├── favicon.svg
│   └── placeholder.png     Imagen de respaldo cuando una bandera no está disponible
├── design-reference/
│   └── mobile/             Capturas del diseño original de Figma (mobile)
├── src/
│   ├── main.ts             Orquestador: coordina módulos, eventos, router por hash
│   ├── style.css           Import de Tailwind + Design Tokens (@theme) + tipografía fluida
│   ├── vite-env.d.ts       Tipado de variables de entorno
│   ├── api/
│   │   └── countries.ts    Peticiones fetch tipadas a REST Countries (listado + detalle por código)
│   ├── types/
│   │   ├── country.ts      Interfaces Country, CountriesResponse, etc.
│   │   └── countryDetails.ts  Interfaz CountryDetails (extiende Country) con campos opcionales
│   ├── utils/
│   │   ├── format.ts       Formateo de población, capital, idiomas, monedas, escape de HTML
│   │   ├── filters.ts      Función pura de filtrado por nombre + región
│   │   └── debounce.ts     Debounce genérico y tipado (300 ms en la búsqueda)
│   └── render/
│       ├── countryCard.ts  Tarjeta individual de país
│       ├── countryGrid.ts  Grilla de tarjetas (map + join)
│       ├── details.ts      Vista de detalle de un país
│       └── states.ts       Estados de UI: loading (skeleton), empty, error
└── vite.config.ts
```

## Funcionalidad implementada

- **Búsqueda por nombre** (insensible a mayúsculas/minúsculas) con **debounce de 300 ms**.
- **Filtro por región**, aplicado de inmediato (sin debounce) y combinable con la búsqueda — limpiar uno conserva el otro.
- **Estados de interfaz**:
  - *Carga*: 8 tarjetas skeleton con `animate-pulse`.
  - *Vacío*: mensaje indicando que no hay coincidencias para el término buscado.
  - *Error*: alerta visual con botón "Reintentar" cuando falla la petición (distinto del estado vacío).
- **Vista de detalle** por país vía hash (`#/country/SV`), sin recargar la página, con botones de navegación atrás/adelante del navegador funcionando.
- **Manejo de datos ausentes**: bandera no disponible → `placeholder.png` (vía `onerror` y fallback `||`); país sin código → tarjeta sin enlace de detalle ("Detalle no disponible").
- **Tarjetas adaptables** con Container Queries (`@container`, `@min-[20rem]:`) y tipografía fluida con `clamp()`.

## Stack técnico

- [Vite](https://vite.dev/)
- TypeScript (Vanilla, sin frameworks de UI)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), Design Tokens vía `@theme`
- [REST Countries API v5](https://restcountries.com/docs)
