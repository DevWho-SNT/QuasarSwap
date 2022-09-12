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
    colSymbol: 'Launch Badges',
    colName: 'Quasar Launch',
    colAddresses: {
      107: '0x7116F61094BC91c15Aef3Ef14A94144a05692784',
      87: '0x7116F61094BC91c15Aef3Ef14A94144a05692784',
    },
    collection: serializedNFTs.qlb,
    earningToken: serializedTokens.cake,
    stakingFee: 2,
    harvestingFee: 2,
    image: 'https://ipfs.io/ipfs/QmWNRPYDCA7A1kXPdGrEjc5aCbEqUuWCnuw1ftWc8qjeVN'
  },
  // {
  //   pid: 1,
  //   colSymbol: 'Nova Mutant Chimps',
  //   colName: 'Nova Mutant Chimps',
  //   colAddresses: {
  //     107: '0x2342aa975d7a775e5a1342410a3ffb7068cf43a8',
  //     87: '0x2342aa975d7a775e5a1342410a3ffb7068cf43a8',
  //   },
  //   collection: serializedNFTs.nmc,
  //   earningToken: serializedTokens.cake,
  //   stakingFee: 2,
  //   harvestingFee: 2,
  //   image: 'https://operahouse.mypinata.cloud/ipfs/'
  // },

  

].filter((f) => !!f.colAddresses[CHAIN_ID])

export default nftFarms