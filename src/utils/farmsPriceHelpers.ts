import { SerializedFarm } from 'state/types'
import { SerializedNFTFarm } from 'state/types'

/**
 * Returns the first farm with a quote token that matches from an array of preferred quote tokens
 * @param farms Array of farms
 * @param preferredQuoteTokens Array of preferred quote tokens
 * @returns A preferred farm, if found - or the first element of the farms array
 */
const filterFarmsByQuoteToken = (
  farms: SerializedFarm[],
  preferredQuoteTokens: string[] = ['nUSD', 'WSNT'],
): SerializedFarm => {
  const preferredFarm = farms.find((farm) => {
    return preferredQuoteTokens.some((quoteToken) => {
      return farm.quoteToken.symbol === quoteToken
    })
  })
  return preferredFarm || farms[0]
}

const filterNFTFarmsByEarningToken = (
  nftfarms: SerializedNFTFarm[],
  preferredEarningTokens: string[] = ['nUSD', 'WSNT', 'QSR'],
): SerializedNFTFarm => {
  const preferredFarm = nftfarms.find((nftfarm) => {
    return preferredEarningTokens.some((earningToken) => {
      return nftfarm.earningToken.symbol === earningToken
    })
  })
  return preferredFarm || nftfarms[0]
}

/*
export default filterFarmsByQuoteToken
export default filterNFTFarmsByEarningToken
*/

export { filterFarmsByQuoteToken, filterNFTFarmsByEarningToken }