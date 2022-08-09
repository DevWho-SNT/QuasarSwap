import { Button, Flex, Text, Heading } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { DeserializedFarm } from 'state/types'
import styled from 'styled-components'
import { getAddress } from 'utils/addressHelpers'
import useApproveFarm from '../../hooks/useApproveFarm'
import HarvestAction from './HarvestAction'
import StakeAction from './StakeAction'
import Balance from 'components/Balance'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useLpTokenPrice } from 'state/farms/hooks'

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

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  cakePrice?: BigNumber
  lpLabel?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl, cakePrice, lpLabel }) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { pid, lpAddresses } = farm
  const { allowance, tokenBalance, stakedBalance, earnings } = farm.userData || {}
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove()
    })
    if (receipt?.status) {
      toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    }
  }, [onApprove, dispatch, account, pid, t, toastSuccess, fetchWithCatchTxError])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        cakePrice={cakePrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={pendingTx} onClick={handleApprove}>
        {t('Enable Contract')}
      </Button>
    )
  }

  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  const displayBalanceStaked = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return '<0.0000001'
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN)
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const lpPrice = useLpTokenPrice(farm.lpSymbol)

  return (
    <Action>
      <Flex justifyContent="space-between" alignItems="center">
        <CardRowItem>
          <Flex>
            <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
              QSR
            </Text>
            <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
              {t('Earned')}
            </Text>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
            {earningsBusd > 0 && (
              <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
            )}
          </Flex>
        </CardRowItem>
        <CardRowItem>
          <Flex>
            <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
            {farm.lpSymbol}
          </Text>
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
            {t('Staked')}
          </Text>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalanceStaked()}</Heading>
            {stakedBalance.gt(0) && lpPrice.gt(0) && (
              <Balance
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={getBalanceNumber(lpPrice.times(stakedBalance))}
                unit=" USD"
                prefix="~"
              />
            )}
          </Flex>
        </CardRowItem>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt="16px">
        <HarvestAction earnings={earnings} pid={pid} />
        <CustomActionBtn>
          {!account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
        </CustomActionBtn>
      </Flex>
    </Action>
  )
}

export default CardActions
