import type { CountryDetails } from '../types/countryDetails'
import {
  escapeHtml,
  formatPopulation,
  getBorders,
  getCapital,
  getCurrencies,
  getFlagDescription,
  getLanguages,
  getNativeName,
} from '../utils/format'

export function renderCountryDetails(country: CountryDetails): string {
  const name = country.names.common
  const nativeName = getNativeName(country)
  const capital = getCapital(country)
  const flagDescription = getFlagDescription(country)
  const flagSrc = country.flag.url_png || '/placeholder.png'
  const formattedPopulation = formatPopulation(country.population)
  const currencies = getCurrencies(country)
  const languages = getLanguages(country)
  const borders = getBorders(country)

  const bordersMarkup =
    borders.length > 0
      ? borders
          .map(
            (border) =>
              `<span class="rounded-full bg-background px-sm py-xs text-sm font-semibold text-text-primary">${escapeHtml(border)}</span>`,
          )
          .join('')
      : '<span class="text-text-secondary">Sin fronteras terrestres registradas</span>'

  const regionText = country.subregion ? `${country.region} — ${country.subregion}` : country.region

  return `
    <a
      href="#"
      class="mb-lg inline-flex items-center gap-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
        <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Volver al listado
    </a>

    <div class="flex flex-col items-center gap-lg lg:flex-row lg:items-start">
      <div class="flex flex-col items-center text-center lg:w-2/5 lg:items-start lg:text-left">
        <img
          src="${escapeHtml(flagSrc)}"
          alt="${escapeHtml(flagDescription)}"
          onerror="this.onerror=null; this.src='/placeholder.png';"
          class="aspect-3/2 w-48 rounded-2xl object-cover shadow-sm"
        />
        <h2 class="mt-lg font-display text-2xl text-text-primary sm:text-3xl">${escapeHtml(name)}</h2>
        <p class="mt-xs text-text-secondary">${escapeHtml(nativeName)}</p>
      </div>

      <div class="mt-lg w-full lg:mt-0 lg:w-3/5">
        <dl class="divide-y divide-border rounded-2xl border border-border bg-surface px-md py-sm shadow-sm lg:px-lg">
          <div class="py-md">
            <dt class="text-sm text-text-secondary">Capital</dt>
            <dd class="text-lg font-semibold text-text-primary">${escapeHtml(capital)}</dd>
          </div>
          <div class="py-md">
            <dt class="text-sm text-text-secondary">Región</dt>
            <dd class="text-lg font-semibold text-text-primary">${escapeHtml(regionText)}</dd>
          </div>
          <div class="py-md">
            <dt class="text-sm text-text-secondary">Población</dt>
            <dd class="text-lg font-semibold text-text-primary">${formattedPopulation}</dd>
          </div>
          <div class="py-md">
            <dt class="text-sm text-text-secondary">Moneda</dt>
            <dd class="text-lg font-semibold text-text-primary">${escapeHtml(currencies)}</dd>
          </div>
          <div class="py-md">
            <dt class="text-sm text-text-secondary">Idioma</dt>
            <dd class="text-lg font-semibold text-text-primary">${escapeHtml(languages)}</dd>
          </div>
        </dl>

        <div class="mt-lg">
          <h3 class="mb-sm text-sm font-semibold text-text-secondary">Países fronterizos</h3>
          <div class="flex flex-wrap gap-sm">${bordersMarkup}</div>
        </div>
      </div>
    </div>
  `
}
