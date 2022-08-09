import { useWeb3React } from '@web3-react/core'
import { useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Card, Flex, Text, Skeleton, Heading } from '@pancakeswap/uikit'
import { DeserializedNFTFarm } from 'state/types'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import { useERC721 } from 'hooks/useContract'

import { usePulsar } from 'hooks/useContract'

export interface FarmWithAvailableValue extends DeserializedNFTFarm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const StyledCard = styled(Card)`
  align-self: baseline;
  border-radius: 8px;
  margin: 0 16px 32px;
  padding: 0;

  & > div {
    border-radius: 8px;
  }
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 12px 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

const CardRowItem = styled.div`
  margin-bottom: 16px;
`

const StyledLine = styled.div`
  height: 1px;
  width: 100%;
  margin: 20px 0;
  background-color: #ccc;
`

interface FarmCardProps {
  farm: FarmWithAvailableValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  toggleModal?: Function
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, cakePrice, toggleModal }) => {
  const { t } = useTranslation()
  const { pid } = farm
  const { account } = useWeb3React()

  const pulsarContract = usePulsar()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const projectLink = farm.collection.projectLink

  let lpLabel = farm.colSymbol && farm.colSymbol.toUpperCase().replace('syrup', 'qsr')
  /*if (farm.pid == 0) {
    lpLabel = t('QSR');
  }*/
  let earnLabel = farm.earningToken ? farm.earningToken.symbol : t('Placeholder')
  /*if (farm.pid == 0) {
    earnLabel = farm.dual ? farm.dual.earnLabel : t('QSR');
  }*/

  /*const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`*/
  const lpAddress = getAddress(farm.colAddresses)
  const isPromotedFarm = farm.collection.symbol === 'QSR'

  return (
    <StyledCard isActive={isPromotedFarm}>
      <FarmCardInnerContainer>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          nft={farm.collection}
          earningToken={farm.earningToken}
        />

        <StyledLine></StyledLine>

        <Flex justifyContent="space-between">

          {
            // <CardRowItem><Text>{t('Earn')}:</Text><Text bold>{earnLabel}</Text></CardRowItem>
          }
        </Flex>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          cakePrice={cakePrice}
          toggleModal={toggleModal}
          //addLiquidityUrl={addLiquidityUrl}
        />
      </FarmCardInnerContainer>

      <ExpandingWrapper>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        {showExpandableSection && (
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanLink(lpAddress, 'address')}
            infoAddress={projectLink}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            //addLiquidityUrl={addLiquidityUrl}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default FarmCard
