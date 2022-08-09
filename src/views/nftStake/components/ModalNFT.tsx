import { useWeb3React } from '@web3-react/core'
import {
  Box,
  CloseIcon,
  Flex,
  Grid,
  Text,
  IconButton,
  InjectedModalProps,
  LinkExternal,
  ModalContainer,
  ModalHeader,
  ProfileAvatar,
  useMatchBreakpoints,
  Skeleton,
  Heading,
} from '@pancakeswap/uikit'
import { useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, {css} from 'styled-components'
import { DeserializedNFTFarm } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { useERC721 } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import NFTCard from './NFTCard'
import { useAppDispatch } from 'state'
import useCatchTxError from 'hooks/useCatchTxError'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { fetchNFTFarmUserDataAsync } from 'state/nftStake'
import useApproveNFTFarm from '../hooks/useApproveNFTFarm'
import useUnstakeNFTFarms from '../hooks/useUnstakeNFTFarms'
import useHarvestNFTFarms from '../hooks/useHarvestNFTFarms'
import useStakeNFTFarms from '../hooks/useStakeNFTFarms'
import useStakedNFTs from '../hooks/useStakedNFTS'
import { useBalanceNFTs, useFarmsEarned, fetchNFTAllowedList } from '../hooks/useBalanceNFTs'
import { stakeNFT } from 'utils/calls'
import { formatBigNumber, formatFixedNumber } from 'utils/formatBalance'

export interface FarmWithAvailableValue extends DeserializedNFTFarm {
  apr?: number
}

interface Props {
  onBeforeDismiss?: () => void
  onDismiss?: () => void
  name: string
  currentFarm: FarmWithAvailableValue
  tokens: { 
    id: number
    image: string
    name: string
    token_address: string
    token_id: number
    token_URI?: string
   }[]
}

const ModalNFTWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 100%;
  max-width: 100%;
  margin: 0 !important;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00438299;
  }
`

const StyledModalContainer = styled(ModalContainer)`
  width: 840px;
`

const ModalNFTContent = styled.div`
  background: #fff;
  box-shadow: 0px 20px 36px -8px rgb(14 14 44 / 10%), 0px 1px 1px rgb(0 0 0 / 5%);
  border: 1px solid #E7E3EB;
  z-index: 100;
  border-radius: 2px;
`

const ModalBody = styled.div`
  padding: 24px;
`

const ModalList = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px 24px;
  margin: 0 -12px;
  flex-flow: wrap;
  max-height: 60vh;
  overflow-y: scroll;
`

const StyledModalHeader = styled(ModalHeader)`
  justify-content: space-between;
  align-items: center;
`

const ModalHeaderInfo = styled.div`
  h2 {
    color: #004382;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
    text-align: left;
    margin-bottom: 12px;

    span {
      font-size: 12px;
      margin-left: 50px;
      font-weight: normal;
    }
  }

  h3 {
    color: rgb(0, 67, 130);
    font-weight: bold;

    label {
      font-weight: normal;
      margin-left: 40px;
    }
  }
`

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  border-bottom: 1px #E7E3EB solid;
  margin: 0 -12px;
`

const ModalHeaderButtons = styled.button<{ $disabled: boolean }>`
  margin: 0 12px;
  align-items: center;
  border: 0;
  border-radius: 2px;
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600 !important;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: 1;
  outline: 0;
  transition: background-color 0.2s,opacity 0.2s;
  height: 48px;
  padding: 0 24px;
  background-color: #fe5917;
  color: white;
  width: 30%;

  ${({ $disabled }) =>
  $disabled &&
  css`
    pointer-events: none;
    background-color: #E9EAEB;
    border-color: #E9EAEB;
    box-shadow: none;
    color: #BDC2C4;
    cursor: not-allowed;
  `}
`

const NotFoundTitle = styled.h3`
  color: #004382;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;

  a {
    padding: 0;
    color: #0b71d1;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
  }
`

const ModalNFT: React.FC<Props> = ({ 
  tokens, 
  name,
  currentFarm, 
  onDismiss, 
  onBeforeDismiss, 
}) => {
  const { theme } = useTheme()
  const [tokensNftsIds, setTokensNftsIds] = useState([])
  const [allowedNfts, setAllowedNfts] = useState([])
  const [allTokens, setAllTokens] = useState(tokens)
  const { account } = useWeb3React()
  const { pid, colAddresses, stakingFee, harvestingFee } = currentFarm
  const { onStake } = useStakeNFTFarms(pid, stakingFee)
  const { onUnstake } = useUnstakeNFTFarms(pid, harvestingFee)
  const { onHarvest } = useHarvestNFTFarms(pid, harvestingFee)
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()
  const { fetchWithCatchTxError } = useCatchTxError()
  const lpAddress = getAddress(colAddresses)

  const lpContract = useERC721(lpAddress)

  const { stakedList } = useStakedNFTs(lpContract, account, pid)

  const [balanceStaked, setBalanceStaked] = useState(null)
  const [userEarned, setUserEarned] = useState(null)
  const { balance } = useBalanceNFTs(account, pid)
  const { earned } = useFarmsEarned(account, pid)


  useEffect(() => {
    getStakedList()
    getBalance()
    getUserEarned()
  }, []);

  useEffect(() => {
    if(allTokens && allTokens.length > 0) {
      getAllowedList()
    }
  }, [allTokens]);

  const getAllowedList = async () => {
    const allowedList = await fetchNFTAllowedList(lpAddress, allTokens.map(nft => nft.token_id))
    setAllowedNfts(allowedList.map(item => item.id))
  }

  const getBalance = async () => {
    const b = await balance()

    if(b) {
      const formatB = parseFloat(formatBigNumber(b.amountStaked))
      setBalanceStaked(formatB * 1000000000000000000)
    }
  }

  const getUserEarned = async () => {
    const e = await earned()

    if(e) {
      const eBigNumber = new BigNumber(e._hex)
      const formatBN = parseFloat(eBigNumber.toFixed(0, BigNumber.ROUND_DOWN))
      const numberBN = formatBN / 1000000000000000000
      setUserEarned(numberBN.toFixed(3))
    }
  }

  const getStakedList = async () => {
    const stakeds = await stakedList()
    setAllTokens( tokens.concat(stakeds) || [] )
  }

  const { onApprove } = useApproveNFTFarm(lpContract)

  const handleApprove = useCallback(async (amount: string[]) => {
    /*
    This is for testing: click a NFT
    to highlight it, click it again to
    deselect it
    Finally, click approve. You will never 
    see the moose
    */
    if (amount.length > 0) {
      for (const tokenNft of amount) {
        const receipt = await fetchWithCatchTxError(() => {
          return onApprove(tokenNft)
        })
    
        if (receipt?.status) {
          toastSuccess(('Pulsar is enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
          dispatch(fetchNFTFarmUserDataAsync({ account, pids: [pid] }))
        }
        else {
          break;
        }
      }
    }
  }, [onApprove, dispatch, account, pid, toastSuccess, fetchWithCatchTxError])


  const handleDismiss = () => {
    if (onBeforeDismiss) {
      onBeforeDismiss()
    }

    onDismiss?.()
  }

  const handleStake = async (amount: string[]) => {
    const receipt = await fetchWithCatchTxError(() => {
      return onStake(amount)
    })
    if (receipt?.status) {
      toastSuccess(
        `Staked!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your NFTs have been staked in the farm
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchNFTFarmUserDataAsync({ account, pids: [pid] }))
    }
  }

  const handleUnstake = async (amount: string[]) => {
    const receipt = await fetchWithCatchTxError(() => {
      return onUnstake(amount)
    })
    if (receipt?.status) {
      toastSuccess(
        `Unstaked!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your earnings have also been harvested to your wallet
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchNFTFarmUserDataAsync({ account, pids: [pid] }))
    }
  }

  const handleHarvest = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onHarvest()
    })
    if (receipt?.status) {
      toastSuccess(
        `Harvested!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your earnings have also been harvested to your wallet
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchNFTFarmUserDataAsync({ account, pids: [pid] }))
    }
  }

  const singleStake = (id) => {
    handleStake([id])
  }

  const singleUnstake = (id) => {
    handleUnstake([id])
  }

  const singleApprove = (id) => {
    handleApprove([id])
  }

  const approve = () => {
    handleApprove(tokensNftsIds)
  }

  const stake = () => {
    handleStake(tokensNftsIds)
  }

  const unstake = () => {
    handleUnstake(tokensNftsIds)
  }

  const harvest = () => {
    handleHarvest()
  }


  const checkCard = (id) => {
    if( tokensNftsIds.includes(id) ) {
      setTokensNftsIds( tokensNftsIds.filter((tokenId) => (tokenId !== id)) )
    }
    else {
      const newtokensNftsIds = JSON.parse(JSON.stringify(tokensNftsIds))
      newtokensNftsIds.push(id)
      setTokensNftsIds(newtokensNftsIds)
    }
  }

  return (
    <StyledModalContainer minWidth="840px">
      <StyledModalHeader background={theme.colors.gradients.bubblegum}>
        <ModalHeaderInfo>
          <h2>{ name } <span>{ balanceStaked ?  ('Staked: ' + balanceStaked) : '0' }</span></h2>
          <h3>QSR EARNED <label>{ userEarned }</label></h3>
        </ModalHeaderInfo>

        <IconButton variant="text" onClick={handleDismiss} aria-label="Close the dialog">
          <CloseIcon color="text" width="24px" />
        </IconButton>
      </StyledModalHeader>

      <ModalActions>
        <ModalHeaderButtons $disabled={tokensNftsIds.length === 0} onClick={ ()=> approve() }>Approve NFTS</ModalHeaderButtons>
        <ModalHeaderButtons $disabled={tokensNftsIds.length === 0} onClick={ ()=> stake() }>Stake</ModalHeaderButtons>
        <ModalHeaderButtons $disabled={tokensNftsIds.length === 0} onClick={ ()=> unstake() }>Unstake</ModalHeaderButtons>
        <ModalHeaderButtons $disabled={tokensNftsIds.length === 0} onClick={ ()=> harvest() }>Harvest</ModalHeaderButtons>
      </ModalActions>

      <ModalList>
        {
          allTokens && allTokens.length>0 && allTokens.map((nft) => (
            <NFTCard 
              key={nft.id}
              checkCard={checkCard} 
              singleUnstake={singleUnstake} 
              singleStake={singleStake} 
              singleApprove={singleApprove}
              allowedNfts={allowedNfts}
              { ...nft }/>
          ))
        }

        {
          allTokens && allTokens.length===0 && <NotFoundTitle>Oops! You have no NFTs to stake. Maybe you could get some <a target="_blank" href={currentFarm.collection.projectLink}>here</a></NotFoundTitle>
        }
      </ModalList>
    </StyledModalContainer>
  )
}

export default ModalNFT
