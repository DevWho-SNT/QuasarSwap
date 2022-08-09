import pulsarABI from 'config/abi/pulsar.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { SerializedNFTFarmConfig } from '../../config/constants/types'
import { SerializedNFTFarm } from '../types'
import { getPulsarAddress } from '../../utils/addressHelpers'
import { getPulsarContract } from '../../utils/contractHelpers'

const pulsarAddress = getPulsarAddress()
const pulsarContract = getPulsarContract()

export const fetchPulsarFarmPoolLength = async () => {
  const poolLength = await pulsarContract.collectionInfoLength()
  return poolLength
}

const pulsarFarmCalls = (nftfarm: SerializedNFTFarm) => {
  const { pid } = nftfarm
  return pid || pid === 0
    ? [
        {
          address: pulsarAddress,
          name: 'collectionInfo',
          params: [pid],
        },
        {
          address: pulsarAddress,
          name: 'totalAllocPoint',
        },
      ]
    : [null, null]
}

export const fetchPulsarData = async (nftfarms: SerializedNFTFarmConfig[]): Promise<any[]> => {
  const masterChefCalls = nftfarms.map((nftfarm) => pulsarFarmCalls(nftfarm))
  const chunkSize = masterChefCalls.flat().length / nftfarms.length
  const masterChefAggregatedCalls = masterChefCalls
    //.filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
    .flat()
  const masterChefMultiCallResult = await multicallv2(pulsarABI, masterChefAggregatedCalls)
  const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
  let masterChefChunkedResultCounter = 0
  return masterChefCalls.map((masterChefCall) => {
    if (masterChefCall[0] === null && masterChefCall[1] === null) {
      return [null, null]
    }
    const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
    masterChefChunkedResultCounter++
    return data
  })
}
