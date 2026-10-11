import type { Country } from '../types/country'
import { escapeHtml, formatPopulation, getCapital, getFlagDescription } from '../utils/format'

export function renderCountryCard(country: Country): string {
  const name = country.names.common
  const capital = getCapital(country)
  const flagDescription = getFlagDescription(country)
  const formattedPopulation = formatPopulation(country.population)
  const flagSrc = country.flag.url_png || '/placeholder.png'
  const code = country.codes.alpha_2
  const detailHref = code ? `#/country/${encodeURIComponent(code)}` : ''

  const nameMarkup = code
    ? `<a href="${escapeHtml(detailHref)}" class="font-semibold text-text-primary underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">${escapeHtml(name)}</a>`
    : `<span class="font-semibold text-text-primary">${escapeHtml(name)}</span>`

  const detailButtonMarkup = code
    ? `
      <a
        href="${escapeHtml(detailHref)}"
        aria-label="Ver más sobre ${escapeHtml(name)}"
        class="mt-sm flex min-h-11 w-full items-center justify-center rounded-full bg-primary font-semibold text-white transition-all duration-200 hover:bg-primary/90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ver más
      </a>
    `
    : `
      <span
        class="mt-sm flex min-h-11 w-full items-center justify-center rounded-full bg-disabled font-semibold text-text-secondary"
      >
        Detalle no disponible
      </span>
    `

  return `
    <article class="@container group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-primary">
      <div class="flex flex-col @min-[20rem]:flex-row">
        <img
          src="${escapeHtml(flagSrc)}"
          alt="${escapeHtml(flagDescription)}"
          loading="lazy"
          onerror="this.onerror=null; this.src='/placeholder.png';"
          class="aspect-3/2 w-full shrink-0 bg-background object-cover transition-transform duration-300 group-hover:scale-105 @min-[20rem]:aspect-auto @min-[20rem]:w-2/5"
        />
        <div class="flex min-w-0 flex-1 flex-col gap-xs px-md py-md">
          <h3 class="text-(length:--font-country-name)">${nameMarkup}</h3>
          <dl class="grid grid-cols-[auto_1fr] gap-x-sm gap-y-xs text-sm">
            <dt class="text-text-secondary">Capital</dt>
            <dd class="text-text-primary">${escapeHtml(capital)}</dd>
            <dt class="text-text-secondary">Región</dt>
            <dd class="text-text-primary">${escapeHtml(country.region)}</dd>
            <dt class="text-text-secondary">Población</dt>
            <dd class="text-text-primary">${formattedPopulation}</dd>
          </dl>
          ${detailButtonMarkup}
        </div>
      </div>
    </article>
  `
}
