import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  //  {
  //   pid: 0,
  //   lpSymbol: 'nUSD-QSR LP',
  //   lpAddresses: {
  //     107: '0x0cEeb8A025D5d595F54DF0a19e133D52ed21db57',
  //     87: '0x0e9768b0199e7b31852b4effb70031d860b812d6 ',
  //   },
  //   token: serializedTokens.cake,
  //   quoteToken: serializedTokens.busd,
  // },
  {
    pid: 1,
    lpSymbol: 'SNT-QSR LP',
    lpAddresses: {
      107: '0x1AceB7901Ba030B5633dE5Ea1aA9dF6943FBF3b0',
      87: '0x0e9768b0199e7b31852b4effb70031d860b812d6',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,     
    lpSymbol: 'SNT-nUSD LP',
    lpAddresses: {
      107: '0xadfB336A0183934b30DFb745EdC822260A549b8c',
      87: '0x050bc8fa6da93dFF0D7629923E0972c0aeCEBb9E',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'nUSD-QSR',
    lpAddresses: {
      107: '0x4cba2CeE9FA8caf9613EaBfEAf81BA5670b205BC',
      87: '0xa6b4b44275fe620f58242308bb380f95109dc404',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
  },
  // {
  //   pid: 4,
  //   lpSymbol: 'SNT-USDC LP',
  //   lpAddresses: {
  //     107: '0x4cba2CeE9FA8caf9613EaBfEAf81BA5670b205BC',
  //     87: '0x4cba2CeE9FA8caf9613EaBfEAf81BA5670b205BC',
  //   },
  //   token: serializedTokens.usdc,
  //   quoteToken: serializedTokens.wbnb,
  // },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms