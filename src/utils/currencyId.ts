import { Currency, ETHER, Token } from '@quasarswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'SNT'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
