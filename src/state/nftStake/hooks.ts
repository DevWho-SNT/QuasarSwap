import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { nftFarmsConfig } from 'config/constants'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { deserializeToken, deserializeNFT } from 'state/user/hooks/helpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { fetchNFTFarmsPublicDataAsync, fetchNFTFarmUserDataAsync, nonArchivedFarms } from '.'
import { DeserializedNFTFarm, DeserializedNFTFarmsState, DeserializedNFTFarmUserData, SerializedNFTFarm, State } from '../types'

const deserializeNFTFarmUserData = (nftfarm: SerializedNFTFarm): DeserializedNFTFarmUserData => {
  return {
    allowance: nftfarm.userData ? new BigNumber(nftfarm.userData.allowance) : BIG_ZERO,
    nftBalance: nftfarm.userData ? new BigNumber(nftfarm.userData.nftBalance) : BIG_ZERO,
    stakedBalance: nftfarm.userData ? new BigNumber(nftfarm.userData.stakedBalance) : BIG_ZERO,
    earnings: nftfarm.userData ? new BigNumber(nftfarm.userData.earnings) : BIG_ZERO,
  }
}

const deserializeNFTFarm = (nftfarm: SerializedNFTFarm): DeserializedNFTFarm => {
  const { colAddresses, colSymbol, colName, pid, isCommunity, multiplier, earningTokenPriceBusd, collection, stakingFee, harvestingFee } = nftfarm

  return {
    colAddresses,
    colSymbol,
    colName,
    pid,
    isCommunity,
    multiplier,
    earningToken: deserializeToken(nftfarm.earningToken),
    earningTokenPriceBusd,
    collection,
    stakingFee, 
    harvestingFee,
    userData: deserializeNFTFarmUserData(nftfarm),
    lpTotalInQuoteToken: nftfarm.lpTotalInQuoteToken ? new BigNumber(nftfarm.lpTotalInQuoteToken) : BIG_ZERO,
    lpTotalSupply: nftfarm.lpTotalSupply ? new BigNumber(nftfarm.lpTotalSupply) : BIG_ZERO,
    tokenPriceVsQuote: nftfarm.tokenPriceVsQuote ? new BigNumber(nftfarm.tokenPriceVsQuote) : BIG_ZERO,
    poolWeight: nftfarm.poolWeight ? new BigNumber(nftfarm.poolWeight) : BIG_ZERO,
  }
}

export const usePollFarmsWithUserData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useSlowRefreshEffect(() => {
    const farmsToFetch = includeArchive ? nftFarmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchNFTFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchNFTFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, account])
}

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP     ---    2 = QSR-SNT LP
 * 252 = BUSD-BNB LP     ---    3 = fUSD-SNT LP
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    dispatch(fetchNFTFarmsPublicDataAsync([1, 2]))
  }, [dispatch])
}

export const useFarms = (): DeserializedNFTFarmsState => {
  const farms = useSelector((state: State) => state.nftStake)
  const deserializedNFTFarmsData = farms.data.map(deserializeNFTFarm)
  const { loadArchivedFarmsData, userDataLoaded, poolLength } = farms
  return {
    loadArchivedFarmsData,
    userDataLoaded,
    data: deserializedNFTFarmsData,
    poolLength,
  }
}

export const useFarmsPoolLength = (): number => {
  return useSelector((state: State) => state.nftStake.poolLength)
}

export const useFarmFromPid = (pid: number): DeserializedNFTFarm => {
  const nftfarm = useSelector((state: State) => state.nftStake.data.find((f) => f.pid === pid))
  return deserializeNFTFarm(nftfarm)
}

export const useFarmFromLpSymbol = (colSymbol: string): DeserializedNFTFarm => {
  const farm = useSelector((state: State) => state.nftStake.data.find((f) => f.colSymbol === colSymbol))
  return deserializeNFTFarm(farm)
}

export const useFarmUser = (pid): DeserializedNFTFarmUserData => {
  const { userData } = useFarmFromPid(pid)
  const { allowance, nftBalance, stakedBalance, earnings } = userData
  return {
    allowance,
    nftBalance,
    stakedBalance,
    earnings,
  }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.earningTokenPriceBusd)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply.gt(0) && farm.lpTotalInQuoteToken.gt(0)) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.nftAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(farm.lpTotalSupply)
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

/**
 * @@deprecated use the BUSD hook in /hooks
 */
export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromPid(0)

  const cakePriceBusdAsString = cakeBnbFarm.earningTokenPriceBusd

  const cakePriceBusd = useMemo(() => {
    return new BigNumber(cakePriceBusdAsString)
  }, [cakePriceBusdAsString])

  return cakePriceBusd
}
