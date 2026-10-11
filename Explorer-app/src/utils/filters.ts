import type { Country } from '../types/country'

export function filterCountries(countries: Country[], searchTerm: string, region: string): Country[] {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return countries.filter((country) => {
    const matchName = country.names.common.toLowerCase().includes(normalizedSearch)
    const matchRegion = region === '' || country.region === region
    return matchName && matchRegion
  })
}
