import { serializeNFTs } from './nftCollections'
import { serializeTokens } from './tokens'
import { SerializedNFTFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedNFTs = serializeNFTs()
const serializedTokens = serializeTokens()

/*
* @params pretty straightforward
* @colSymbol collection's symbol
* @colAddresses collection's addresses
*/

const nftFarms: SerializedNFTFarmConfig[] = [
  {
    pid: 2,
    colSymbol: 'hak',
    colName: 'hackers',
    colAddresses: {
      107: '0x398799Ce97f646d146988E6A5F796b6131bBAf27',
      87: '0x398799Ce97f646d146988E6A5F796b6131bBAf27',
    },
    collection: serializedNFTs.hackers,
    earningToken: serializedTokens.cake,
    stakingFee: 1,
    harvestingFee: 1,
    image: './QuasarBanner.png'
  },
  {
    pid: 0,
    colSymbol: 'QLB',
    colName: 'Quasar Launch',
    colAddresses: {
      107: '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',
      87: '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',
    },
    collection: serializedNFTs.qlb,
    earningToken: serializedTokens.cake,
    stakingFee: 1,
    harvestingFee: 1,
    image: 'https://operahouse.mypinata.cloud/ipfs/QmRCx62NAB76mamRWdvzDiJcNgaTnKZ4twnbAgtaDNLaz1'
  },

  

].filter((f) => !!f.colAddresses[CHAIN_ID])

export default nftFarms