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
    pid: 0,
    colSymbol: 'QLB',
    colName: 'Quasar Launch',
    colAddresses: {
      107: '0x7116F61094BC91c15Aef3Ef14A94144a05692784',
      87: '0x7116F61094BC91c15Aef3Ef14A94144a05692784',
    },
    collection: serializedNFTs.qlb,
    earningToken: serializedTokens.cake,
    stakingFee: 2,
    harvestingFee: 2,
    image: 'https://operahouse.mypinata.cloud/ipfs/QmRCx62NAB76mamRWdvzDiJcNgaTnKZ4twnbAgtaDNLaz1'
  },

  

].filter((f) => !!f.colAddresses[CHAIN_ID])

export default nftFarms