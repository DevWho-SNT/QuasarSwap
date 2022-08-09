import styled from 'styled-components'

import { FarmWithAvailableValue } from 'views/nftStake/components/NFTFarmCard/NFTFarmCard'


const IconButtonWrapper = styled.div`
  display: flex;
`

interface StackedActionProps extends FarmWithAvailableValue {
  userDataReady: boolean
  lpLabel?: string
  displayApr?: string
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  apr,
  multiplier,
  colSymbol,
  lpLabel,
  colAddresses,
  earningToken,
  collection,
  userDataReady,
  displayApr,
}) => {

  return (
    <></>
  )
}

export default Staked
