import { SerializedNFTFarmConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BIG_TEN, BIG_ZERO } from '../../utils/bigNumber'
import { fetchPublicNFTFarmsData } from './fetchPublicNFTFarmData'
import { fetchPulsarData } from './fetchPulsarData'

const fetchNFTFarms = async (farmsToFetch: SerializedNFTFarmConfig[]) => {
  const farmResult = await fetchPublicNFTFarmsData(farmsToFetch)
  const pulsarResult = await fetchPulsarData(farmsToFetch)

  return farmsToFetch.map((farm, index) => {
    const [pulsarNFTBalance, nftTotalSupply, earningTokenDecimals] =
      farmResult[index]

    const [info, totalAllocPoint] = pulsarResult[index]

    // Ratio in % of NFTs that are staked in Pulsar, vs the total number in circulation
    const nftRatio = new BigNumber(pulsarNFTBalance).div(new BigNumber(nftTotalSupply))

    /* Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

    // Amount of quoteToken in the LP that are staked in the MC
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)
    
    // Total staked in LP, in quote token value
    const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))
    */
    const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

    return {
      ...farm,
      collection: farm.collection,
      earningToken: farm.earningToken,
      //tokenAmountTotal: tokenAmountTotal.toJSON(),
      nftTotalSupply: new BigNumber(nftTotalSupply).toJSON(),
      //lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      //tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
      poolWeight: poolWeight.toJSON(),
      multiplier: `${allocPoint.div(100).toString()}X`,
    }
  })
}

export default fetchNFTFarms
