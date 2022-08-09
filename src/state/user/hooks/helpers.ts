import { Token, NFT } from '@quasarswap/sdk'
import { SerializedToken, SerializedNFT } from 'config/constants/types'
import { parseUnits } from '@ethersproject/units'

export function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
    projectLink: token.projectLink,
  }
}

export function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
    serializedToken.projectLink,
  )
}

export function serializeNFT(nft: NFT): SerializedNFT {
  return {
    chainId: nft.chainId,
    address: nft.address,
    id: nft.id,
    baseURI: nft.baseURI,
    symbol: nft.symbol,
    name: nft.name,
    projectLink: nft.projectLink,
  }
}

export function deserializeNFT(serializedNFT: SerializedNFT): NFT {
  return new NFT(
    serializedNFT.chainId,
    serializedNFT.address,
    serializedNFT.id,
    serializedNFT.baseURI,
    serializedNFT.symbol,
    serializedNFT.name,
    serializedNFT.projectLink,
  )
}

export enum GAS_PRICE {
  default = '2',
  fast = '3',
  instant = '4',
  testnet = '1',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}
