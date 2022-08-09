import { useContext, useState, useEffect } from 'react'
import { useModal } from '@pancakeswap/uikit'
import { NFTFarmsPageLayout, NFTFarmsContext } from 'views/nftStake'
import FarmCard from 'views/nftStake/components/NFTFarmCard/NFTFarmCard'
import { getDisplayApr } from 'views/nftStake/NFTFarms'
import { usePriceCakeBusd } from 'state/nftStake/hooks'
import { useWeb3React } from '@web3-react/core'

import useStakeNFTs from 'views/nftStake/hooks/useStakeNFTS'
import ModalNFT from 'views/nftStake/components/ModalNFT'

const FarmsPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(NFTFarmsContext)
  const cakePrice = usePriceCakeBusd()
  const { status, ERC721tokens } = useStakeNFTs()
  const [isOpen, setIsOpen] = useState(false)
  const [filterTokens, setFilterTokens] = useState(null)
  const [collectionLabel, setCollectionLabel] = useState('')
  const [currentFarm, setCurrentFarm] = useState(null)

  const handleBeforeDismiss = () => {
    // console.log('close modal')
  }

  const [onPresentWalletStatsModal] = useModal(
    <ModalNFT tokens={filterTokens} name={collectionLabel} currentFarm={currentFarm} onBeforeDismiss={handleBeforeDismiss} />
  )

  const handleOpenModal = (address, lpLabel, farm) => {
    if(ERC721tokens) {
      const filter = ERC721tokens.filter((nft)=> { return nft.token_address.toUpperCase() === address.toUpperCase() })

      setFilterTokens( filter )
      setCollectionLabel( lpLabel )
      setCurrentFarm( farm )
    }
  }

  useEffect(() => {
    if(filterTokens) {
      onPresentWalletStatsModal()
    }
  }, [filterTokens])

  return (
    <>
      {
        (
          <>
            {chosenFarmsMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                cakePrice={cakePrice}
                removed={false}
                toggleModal={handleOpenModal}
              />
            ))}
          </>
        )
      }
    </>
  )
}

FarmsPage.Layout = NFTFarmsPageLayout

export default FarmsPage
