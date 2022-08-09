import tokens from './tokens'
import serializeNFTs from './nftCollections'
import { SerializedFarmConfig, SerializedNFTFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: 2,
    lpSymbol: 'SNT-nUSD LP',
    lpAddresses: {
      107: '',
      87: '0x050bc8fa6da93dFF0D7629923E0972c0aeCEBb9E',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

const nftPriceHelperLps: SerializedNFTFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: 0,
    colName: '',
    colSymbol: '',
    colAddresses: {
      107: '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',
      87: '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',
    },
    collection: serializeNFTs.qlb,
    earningToken: tokens.cake,
    stakingFee: 1,
    harvestingFee: 1
  },
]

export { priceHelperLps, nftPriceHelperLps } 
