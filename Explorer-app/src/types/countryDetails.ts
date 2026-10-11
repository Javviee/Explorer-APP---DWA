import type { Country } from './country'

export interface CountryNativeName {
  common: string
  official: string
}

export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

export interface CountryLanguage {
  name: string
}

export interface CountryDetails extends Country {
  names: Country['names'] & {
    native?: Record<string, CountryNativeName>
  }
  subregion?: string
  tlds?: string[]
  currencies?: CountryCurrency[]
  languages?: CountryLanguage[]
  borders?: string[]
}

export interface CountryDetailsData {
  objects: CountryDetails[]
}

export interface CountryDetailsResponse {
  data: CountryDetailsData
}
