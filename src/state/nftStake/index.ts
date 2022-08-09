import type {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction,
  // eslint-disable-next-line import/no-unresolved
} from '@reduxjs/toolkit/dist/matchers'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import stringify from 'fast-json-stable-stringify'
import nftFarmsConfig from 'config/constants/nftFarms'
import isArchivedPid from 'utils/farmHelpers'
import type { AppState } from 'state'
import { nftPriceHelperLps } from 'config/constants/priceHelperLps'
import fetchNFTFarms from './fetchNFTFarms'
import getFarmsPrices from './getNFTFarmsPrices'
import {
  fetchNFTFarmUserEarnings,
  fetchNFTFarmUserAllowances,
  fetchNFTFarmUserTokenBalances,
  fetchNFTFarmUserStakedBalances,
} from './fetchNFTFarmUser'
import { SerializedNFTFarmsState, SerializedNFTFarm } from '../types'
import { fetchPulsarFarmPoolLength } from './fetchPulsarData'

const noAccountFarmConfig = nftFarmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    nftBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

const initialState: SerializedNFTFarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
  loadingKeys: {},
}

export const nonArchivedFarms = nftFarmsConfig.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchNFTFarmsPublicDataAsync = createAsyncThunk<
  [SerializedNFTFarm[], number],
  number[],
  {
    state: AppState
  }
>(
  'nftStake/fetchNFTFarmsPublicDataAsync',
  async (pids) => {
    const poolLength = await fetchPulsarFarmPoolLength()
    const farmsToFetch = nftFarmsConfig.filter((nftFarmConfig) => pids.includes(nftFarmConfig.pid))
    const farmsCanFetch = farmsToFetch.filter((f) => poolLength.gt(f.pid))

    // Add price helper farms
    const farmsWithPriceHelpers = farmsCanFetch.concat(nftPriceHelperLps)

    const farms = await fetchNFTFarms(farmsWithPriceHelpers)
    const farmsWithPrices = getFarmsPrices(farms)

    // Filter out price helper LP config farms
    const farmsWithoutHelperLps = farmsWithPrices.filter((farm: SerializedNFTFarm) => {
      return farm.pid || farm.pid === 0
    })

    return [farmsWithoutHelperLps, poolLength.toNumber()]
  },
  {
    condition: (arg, { getState }) => {
      const { farms } = getState()
      if (farms.loadingKeys[stringify({ type: fetchNFTFarmsPublicDataAsync.typePrefix, arg })]) {
        console.debug('farms action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

interface FarmUserDataResponse {
  pid: number
  allowance: string
  nftBalance: string
  stakedBalance: string
  earnings: string
}

export const fetchNFTFarmUserDataAsync = createAsyncThunk<
  FarmUserDataResponse[],
  { account: string; pids: any[] },
  {
    state: AppState
  }
>(
  'nftStake/fetchNFTFarmUserDataAsync',
  async ({ account, pids }) => {
    const poolLength = await fetchPulsarFarmPoolLength()
    const farmsToFetch = nftFarmsConfig.filter((nftFarmConfig) => pids.includes(nftFarmConfig.pid))
    const farmsCanFetch = farmsToFetch.filter((f) => poolLength.gt(f.pid))
    const userNFTFarmAllowances = await fetchNFTFarmUserAllowances(account, farmsCanFetch)
    const userFarmTokenBalances = await fetchNFTFarmUserTokenBalances(account, farmsCanFetch)
    const userStakedBalances = await fetchNFTFarmUserStakedBalances(account, farmsCanFetch)
    const userFarmEarnings = await fetchNFTFarmUserEarnings(account, farmsCanFetch)

    return userNFTFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsCanFetch[index].pid,
        allowance: userNFTFarmAllowances[index],
        nftBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
      }
    })
  },
  {
    condition: (arg, { getState }) => {
      const { farms } = getState()
      if (farms.loadingKeys[stringify({ type: fetchNFTFarmUserDataAsync.typePrefix, arg })]) {
        console.debug('farms user action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

type UnknownAsyncThunkFulfilledOrPendingAction =
  | UnknownAsyncThunkFulfilledAction
  | UnknownAsyncThunkPendingAction
  | UnknownAsyncThunkRejectedAction

const serializeLoadingKey = (
  action: UnknownAsyncThunkFulfilledOrPendingAction,
  suffix: UnknownAsyncThunkFulfilledOrPendingAction['meta']['requestStatus'],
) => {
  const type = action.type.split(`/${suffix}`)[0]
  return stringify({
    arg: action.meta.arg,
    type,
  })
}

export const farmsSlice = createSlice({
  name: 'NFT Farms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchNFTFarmsPublicDataAsync.fulfilled, (state, action) => {
      const [farmPayload, poolLength] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = farmPayload.find((farmData) => farmData.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
      state.poolLength = poolLength
    })

    // Update farms with user data
    builder.addCase(fetchNFTFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((nftFarm) => nftFarm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })

    builder.addMatcher(isAnyOf(fetchNFTFarmUserDataAsync.pending, fetchNFTFarmsPublicDataAsync.pending), (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
    })
    builder.addMatcher(
      isAnyOf(fetchNFTFarmUserDataAsync.fulfilled, fetchNFTFarmsPublicDataAsync.fulfilled),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
      },
    )
    builder.addMatcher(
      isAnyOf(fetchNFTFarmsPublicDataAsync.rejected, fetchNFTFarmUserDataAsync.rejected),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
      },
    )
  },
})

export default farmsSlice.reducer
