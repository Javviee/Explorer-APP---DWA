import type { Country, CountriesResponse } from '../types/country'
import type { CountryDetails, CountryDetailsResponse } from '../types/countryDetails'

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY
const API_URL = 'https://api.restcountries.com/countries/v5'
const RESPONSE_FIELDS =
  'names.common,codes.alpha_2,flag.emoji,flag.description,flag.url_png,capitals.name,population,region'
const PAGE_SIZE = 100

const DETAIL_RESPONSE_FIELDS = [
  'names.common',
  'names.native',
  'codes.alpha_2',
  'flag.emoji',
  'flag.description',
  'flag.url_png',
  'capitals.name',
  'population',
  'region',
  'subregion',
  'tlds',
  'currencies',
  'languages',
  'borders',
].join(',')

export async function fetchCountries(): Promise<Country[]> {
  if (!API_KEY) {
    throw new Error('Falta configurar VITE_REST_COUNTRIES_API_KEY en el archivo .env')
  }

  const allCountries: Country[] = []
  let offset = 0
  let hasMore = true

  while (hasMore) {
    const url = `${API_URL}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${RESPONSE_FIELDS}`
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })

    if (!response.ok) {
      throw new Error(`La API de países respondió con el código ${response.status}`)
    }

    const json: CountriesResponse = await response.json()
    allCountries.push(...json.data.objects)
    hasMore = json.data.meta.more
    offset += PAGE_SIZE
  }

  return allCountries
}

export async function fetchCountryByCode(code: string): Promise<CountryDetails> {
  if (!API_KEY) {
    throw new Error('Falta configurar VITE_REST_COUNTRIES_API_KEY en el archivo .env')
  }

  const url = `${API_URL}?codes.alpha_2=${encodeURIComponent(code)}&response_fields=${DETAIL_RESPONSE_FIELDS}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  })

  if (!response.ok) {
    throw new Error(`La API de países respondió con el código ${response.status}`)
  }

  const json: CountryDetailsResponse = await response.json()
  const country = json.data.objects[0]

  if (!country) {
    throw new Error(`No se encontró ningún país con el código "${code}"`)
  }

  return country
}
