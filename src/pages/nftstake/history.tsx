import { useContext } from 'react'
import { NFTFarmsPageLayout, NFTFarmsContext } from 'views/nftStake'
import FarmCard from 'views/nftStake/components/NFTFarmCard/NFTFarmCard'
import { getDisplayApr } from 'views/nftStake/NFTFarms'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useWeb3React } from '@web3-react/core'

const FarmsHistoryPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(NFTFarmsContext)
  const cakePrice = usePriceCakeBusd()

  return (
    <>
      {chosenFarmsMemoized.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
          cakePrice={cakePrice}
          removed
        />
      ))}
    </>
  )
}

FarmsHistoryPage.Layout = NFTFarmsPageLayout

export default FarmsHistoryPage
