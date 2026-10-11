import type { Country } from '../types/country'
import type { CountryDetails } from '../types/countryDetails'

const populationFormatter = new Intl.NumberFormat('es-SV')

export function formatPopulation(population: number): string {
  return populationFormatter.format(population)
}

export function getCapital(country: Country): string {
  return country.capitals?.[0]?.name ?? 'Sin capital registrada'
}

export function getFlagDescription(country: Country): string {
  return country.flag.description || `Bandera de ${country.names.common}`
}

export function escapeHtml(value: string): string {
  const div = document.createElement('div')
  div.textContent = value
  return div.innerHTML
}

export function getNativeName(country: CountryDetails): string {
  const native = country.names.native
  if (!native) {
    return 'No registrado'
  }

  const firstEntry = Object.values(native)[0]
  return firstEntry?.common ?? 'No registrado'
}

export function getCurrencies(country: CountryDetails): string {
  if (!country.currencies || country.currencies.length === 0) {
    return 'No registradas'
  }

  return country.currencies.map((currency) => `${currency.name} (${currency.symbol})`).join(', ')
}

export function getLanguages(country: CountryDetails): string {
  if (!country.languages || country.languages.length === 0) {
    return 'No registrados'
  }

  return country.languages.map((language) => language.name).join(', ')
}

export function getBorders(country: CountryDetails): string[] {
  return country.borders && country.borders.length > 0 ? country.borders : []
}
