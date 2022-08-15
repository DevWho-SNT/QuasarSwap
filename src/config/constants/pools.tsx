import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const vaultPoolConfig = {
  [VaultKey.CakeVault]: {
    name: <Trans>Auto QSR</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 50000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO QSR',
    description: <Trans>Stake QSR to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 1,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      87: '0x693D075Db2F6c231e2f375c29EDd52F47027b45E',
      107: '0x693D075Db2F6c231e2f375c29EDd52F47027b45E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.035',
    sortOrder: 1,
    isFinished: false,
  },

  
  
  
].filter((p) => !!p.contractAddress[CHAIN_ID])

export default pools
