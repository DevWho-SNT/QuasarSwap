import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import erc721ABI from 'config/abi/erc721.json'
import pulsarABI from 'config/abi/pulsar.json'
import multicall from 'utils/multicall'
import { getAddress, getPulsarAddress } from 'utils/addressHelpers'
import { SerializedNFTFarmConfig } from 'config/constants/types'

export const fetchNFTFarmUserAllowances = async (nftID: string, farmsToFetch: SerializedNFTFarmConfig[]) => {
  const pulsarAddress = getPulsarAddress()

  const calls = farmsToFetch.map((farm) => {
    const colContractAddress = getAddress(farm.colAddresses)
    return { address: colContractAddress, name: 'getApproved', params: [nftID] }
  })

  const rawNFTAllowances = await multicall<BigNumber[]>(erc721ABI, calls)
  const parsedNFTAllowances = rawNFTAllowances.map((nftBalance) => {
    return new BigNumber(nftBalance).toJSON()
  })
  return parsedNFTAllowances
}

export const fetchNFTFarmUserTokenBalances = async (account: string, farmsToFetch: SerializedNFTFarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const colContractAddress = getAddress(farm.colAddresses)
    return {
      address: colContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchNFTFarmUserStakedBalances = async (account: string, farmsToFetch: SerializedNFTFarmConfig[]) => {
  const pulsarAddress = getPulsarAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: pulsarAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(pulsarABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchNFTFarmUserEarnings = async (account: string, farmsToFetch: SerializedNFTFarmConfig[]) => {
  const pulsarAddress = getPulsarAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: pulsarAddress,
      name: 'pendingQsr',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(pulsarABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
