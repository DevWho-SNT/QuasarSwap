import { Button, Flex, Heading } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { useERC721 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchNFTFarmUserDataAsync } from 'state/nftStake'
import { DeserializedNFTFarm } from 'state/types'
import styled from 'styled-components'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useLpTokenPrice } from 'state/nftStake/hooks'

const Action = styled.div`
  // padding-top: 16px;

  button {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
`

const CardRowItem = styled.div`
  margin-bottom: 16px;
`

const CustomActionBtn = styled.div`
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 0;
`

export interface FarmWithAvailableValue extends DeserializedNFTFarm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithAvailableValue
  account?: string
  cakePrice?: BigNumber
  lpLabel?: string
  toggleModal: Function
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, cakePrice, lpLabel, toggleModal }) => {
  const { t } = useTranslation()
  const { colAddresses } = farm
  const { allowance, stakedBalance, earnings } = farm.userData || {}
  const lpAddress = getAddress(colAddresses)
  const dispatch = useAppDispatch()

  const lpContract = useERC721(lpAddress)

  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  const displayBalanceStaked = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    return stakedBalanceBigNumber.toFixed(0, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const openModal = (token) => {
    //console.log(token)
  }

  const lpPrice = useLpTokenPrice(farm.colSymbol)

  return (
    <Action>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex width='100%' justifyContent="space-between" alignItems="flex-start">
          <CardRowItem>
            <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
          </CardRowItem>

          <CardRowItem>
            <Flex>
              {
                /*
                  <Flex>
                <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
                  QSR
                </Text>
                <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
                  {t('Earned')}
                </Text>
              </Flex>
                */
              }
            </Flex>
            <Flex flexDirection="column" alignItems="flex-start">
              {
                /*
                  <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
              {earningsBusd > 0 && (
                <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
              )}
                */
              }
            </Flex>
          </CardRowItem>
        </Flex>

        <CardRowItem>
          {
            /* 
            <Flex>
            <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
              {farm.colSymbol}
            </Text>
            <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
              {t('Staked')}
            </Text>
          </Flex>
            */
          }
          <Flex flexDirection="column" alignItems="flex-start">
            {
              // <Heading>{ displayBalanceStaked()}</Heading>
            }
          </Flex>
        </CardRowItem>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        {!account ? <ConnectWalletButton mt="8px" width="100%" /> : (<StyledButton onClick={() => toggleModal(farm.collection.address, lpLabel, farm)}>{ t('Show Farm') }</StyledButton>)}
      </Flex>

      {
        // <Flex justifyContent="space-between" alignItems="center" mt="16px"><HarvestAction earnings={earnings} pid={pid} /></Flex>
      }
    </Action>
  )
}

export default CardActions
