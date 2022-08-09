import erc20 from 'config/abi/erc20.json'
import erc721 from 'config/abi/erc721.json'
import chunk from 'lodash/chunk'
import { getAddress, getPulsarAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { SerializedNFTFarm } from '../types'
import { SerializedNFTFarmConfig } from '../../config/constants/types'

const fetchFarmCalls = (nftfarm: SerializedNFTFarm) => {
  const { colAddresses, colAddress, collection, earningToken } = nftfarm
  const lpAddress = getAddress(colAddresses)
  return [
    /* Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    }, 
    // Balance of earning token on Pulsar contract
    {
      address: earningToken.address,
      name: 'balanceOf',
      params: [getPulsarAddress()],
    },*/
    // Balance of NFTs in the Pulsar contract
    {
      address: colAddress,
      name: 'balanceOf',
      params: [getPulsarAddress()],
    },
    // Total supply of NFTs
    {
      address: colAddress,
      name: 'totalSupply',
    },
    /* Token decimals
    {
      address: token.address,
      name: 'decimals',
    },*/
    // Earning token decimals
    {
      address: earningToken.address,
      name: 'decimals',
    },
  ]
}

export const fetchPublicNFTFarmsData = async (nftfarms: SerializedNFTFarmConfig[]): Promise<any[]> => {
  const farmCalls = nftfarms.flatMap((nftfarm) => fetchFarmCalls(nftfarm))
  const chunkSize = farmCalls.length / nftfarms.length
  const farmMultiCallResult = await multicallv2(erc721, farmCalls)
  return chunk(farmMultiCallResult, chunkSize)
}
