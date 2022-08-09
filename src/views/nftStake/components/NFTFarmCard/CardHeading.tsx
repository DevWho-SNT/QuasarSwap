import styled from 'styled-components'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { Token, NFT } from '@quasarswap/sdk'
import { FarmAuctionTag, CoreTag } from 'components/Tags'
import { NFTTokenImage } from 'components/TokenImage'
import nftFarms from 'config/constants/nftFarms'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  nft: NFT
  earningToken: Token
}

const Wrapper = styled(Flex)`
  margin: -24px -24px 0 -24px;
`

const CollectionImage = styled.img`
  object-fit: cover;
  height: 260px;
  width: 100%;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, nft, earningToken }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <CollectionImage src={nftFarms[0].image} />
    </Wrapper>
  )
}

export default CardHeading
