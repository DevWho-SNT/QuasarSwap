import { ChainId, NFT } from '@quasarswap/sdk'
import { serializeNFT } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedNFT } from './types'

const { MAINNET, TESTNET } = ChainId

interface NFTList {
  [symbol: string]: NFT
}

const defineNFTs = <T extends NFTList>(t: T) => t

// Just need to copy this first one as a template and change the values

export const mainnetNFTs = defineNFTs({
  hackers: new NFT(
    MAINNET,   // ChainID
    '0x398799Ce97f646d146988E6A5F796b6131bBAf27',   // Address
    18,    // ID
    'https://gateway.pinata.cloud/ipfs/QmP1Cg7fMQ7bhv2DTvfMuFMoYKs6UYvz9FgYQh6XkhcnFp/', // BaseURI
    'hak', // Symbol
    'hackers',  // Name 
    'https://novanetwork.io/',   // projectLink
  ),
  qlb: new NFT(
    MAINNET,   // ChainID
    '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',   // Address
    1,    // ID
    'https://gateway.pinata.cloud/ipfs/Qmb1AyMhpy9tdwfW36W9VNF1mpLVdNdPJiYPLm4FB9YKGd/', // BaseURI
    'QLB', // Symbol
    'Quasar Launch Badges',  // Name 
    'https://quasarswap.xyz/',   // projectLink
  ),
} as const)

export const testnetNFTs = defineNFTs({
  // test: new NFT(
  //   MAINNET,   // ChainID
  //   '0x2757a955ed9bca156f019f43ccace5f915aad0ad',   // Address
  //   18,    // ID
  //   'https://gateway.ipfs.io/ipfs/QmP1Cg7fMQ7bhv2DTvfMuFMoYKs6UYvz9FgYQh6XkhcnFp/', // BaseURI
  //   'Test', // Symbol
  //   'Test',  // Name 
  //   'https://novanetwork.io/',   // projectLink
  // ),
  // nmc: new NFT(
  //   MAINNET,   // ChainID
  //   '0x2342aa975d7a775e5a1342410a3ffb7068cf43a8',   // Address
  //   18,    // ID
  //   'https://gateway.ipfs.io/ipfs/QmSSTmQsUpLGiYydiMaSTivYgL11zFxkukpVQdZmajYKJ2/', // BaseURI
  //   'NMC', // Symbol
  //   'Nova Mutant Chimps',  // Name 
  //   'https://novanetwork.io/',   // projectLink
  // ),
} as const)

const nfts = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetNFTs wherever they exist, and mainnetNFTs where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetNFTs).reduce((accum, key) => {
      return { ...accum, [key]: testnetNFTs[key] || mainnetNFTs[key] }
    }, {} as typeof testnetNFTs & typeof mainnetNFTs)
  }

  return mainnetNFTs
}

const unserializedNFTs = nfts()

type SerializedNFTList = Record<keyof typeof unserializedNFTs, SerializedNFT>

export const serializeNFTs = () => {
  const serializedNFTs = Object.keys(unserializedNFTs).reduce((accum, key) => {
    return { ...accum, [key]: serializeNFT(unserializedNFTs[key]) }
  }, {} as SerializedNFTList)

  return serializedNFTs
}

export default unserializedNFTs
