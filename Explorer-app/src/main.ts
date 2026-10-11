import './style.css'
import type { Country } from './types/country'
import { fetchCountries, fetchCountryByCode } from './api/countries'
import { renderCountryGrid } from './render/countryGrid'
import { renderCountryDetails } from './render/details'
import { renderLoading, renderEmpty, renderError } from './render/states'
import { filterCountries } from './utils/filters'
import { debounce } from './utils/debounce'
import { escapeHtml } from './utils/format'

const menuButton = document.getElementById('menu-toggle')
const mainMenu = document.getElementById('main-menu')

if (menuButton && mainMenu) {
  const setMenuState = (isOpen: boolean): void => {
    mainMenu.classList.toggle('hidden', !isOpen)
    menuButton.setAttribute('aria-expanded', String(isOpen))
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú')
  }

  menuButton.addEventListener('click', (): void => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
    setMenuState(!isOpen)
  })
}

const countriesContainer = document.querySelector<HTMLElement>('#countries-container')
const searchInput = document.querySelector<HTMLInputElement>('#country-search')
const regionFilter = document.querySelector<HTMLSelectElement>('#region-filter')

const INITIAL_DISPLAY_COUNT = 8

let allCountries: Country[] = []

function applyFilters(): void {
  if (!searchInput || !regionFilter || !countriesContainer) {
    return
  }

  const searchTerm = searchInput.value
  const region = regionFilter.value
  const filteredCountries = filterCountries(allCountries, searchTerm, region)
  const hasActiveFilters = searchTerm.trim() !== '' || region !== ''
  const countriesToRender = hasActiveFilters
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_DISPLAY_COUNT)

  countriesContainer.innerHTML =
    countriesToRender.length > 0 ? renderCountryGrid(countriesToRender) : renderEmpty(searchTerm)
}

async function loadCountries(): Promise<void> {
  if (!countriesContainer) {
    console.error('No se encontró el contenedor #countries-container')
    return
  }

  countriesContainer.innerHTML = renderLoading()

  try {
    allCountries = await fetchCountries()
    applyFilters()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado al cargar los países.'
    countriesContainer.innerHTML = renderError(message)
    console.error(error)

    document.querySelector<HTMLButtonElement>('#retry-button')?.addEventListener(
      'click',
      () => {
        void loadCountries()
      },
      { once: true },
    )
  }
}

const debouncedApplyFilters = debounce(applyFilters, 300)

searchInput?.addEventListener('input', debouncedApplyFilters)
regionFilter?.addEventListener('change', applyFilters)

if (countriesContainer) {
  void loadCountries()
}

const homeView = document.querySelector<HTMLElement>('#home-view')
const detailView = document.querySelector<HTMLElement>('#detail-view')

const COUNTRY_HASH_PATTERN = /^#\/country\/([A-Za-z0-9]{2,3})$/

async function router(): Promise<void> {
  if (!homeView || !detailView) {
    return
  }

  const match = window.location.hash.match(COUNTRY_HASH_PATTERN)

  if (!match) {
    homeView.hidden = false
    detailView.hidden = true
    detailView.innerHTML = ''
    return
  }

  const code = match[1]
  homeView.hidden = true
  detailView.hidden = false
  detailView.innerHTML = '<p class="text-text-secondary">Cargando detalle del país…</p>'

  try {
    const country = await fetchCountryByCode(code)
    detailView.innerHTML = renderCountryDetails(country)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado al cargar el país.'
    detailView.innerHTML = `
      <div role="alert" class="rounded-2xl border border-accent/30 bg-accent/10 px-md py-lg text-accent">
        <p class="mb-sm">${escapeHtml(message)}</p>
        <a href="#" class="font-semibold underline">Volver al listado</a>
      </div>
    `
    console.error(error)
  }
}

window.addEventListener('hashchange', (): void => {
  void router()
})

void router()
