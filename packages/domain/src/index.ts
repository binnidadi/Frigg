export type Identifier = string

export type IsoDateTime = string

export type CurrencyCode = 'ISK' | 'EUR' | 'USD' | 'GBP' | 'DKK' | 'NOK' | 'SEK' | string

export interface MoneyAmount {
  currency: CurrencyCode
  amountMinor: number
}
