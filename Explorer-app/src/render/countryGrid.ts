import type { Country } from '../types/country'
import { renderCountryCard } from './countryCard'

export function renderCountryGrid(countries: Country[]): string {
  return countries.map(renderCountryCard).join('')
}
