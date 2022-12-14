import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    107: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    87: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
  }

  it(`get address for mainnet (chainId 107)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '107'
    const expected = address[107]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 87)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '87'
    const expected = address[87]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '31337'
    const expected = address[107]
    expect(getAddress(address)).toEqual(expected)
  })
})
