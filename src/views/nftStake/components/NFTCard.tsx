import { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { DeserializedNFTFarm } from 'state/types'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'

const Card = styled.div<{ $active: boolean }>`
  width: 30%;
  padding: 24px;
  background-color: #EFF4F5;
  border-radius: 2px;
  border: 2px solid ${({ $active }) => $active ? '#004382' : '#E7E3EB' };
  margin: 0 12px 32px;

  h3 {
    color: #0b71d1;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.5;
    transition: all 1s ease;
  }

  span {
    font-size: 12px;
    border-radius: 8px;
    background-color: #fe5917;
    color: #fff;
    padding: 4px;
  }

  img {
    transition: all 1s ease;
  }

  &:hover {
    cursor: pointer;

    h3 {
      color: #004382;
    }

    img {
      transform: scale(1.05);
    }
  }
`

const CardName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const CardWrapper = styled.div``

const CardImage = styled.div`
  margin-bottom: 16px;
  overflow: hidden;
`

const ModalHeaderButtons = styled.button`
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
  padding: 8px;
  background-color: #fe5917;
  color: white;
  width: 100%;
`

interface NFTCardProps {
  id: number
  image: string
  name: string
  token_address: string
  token_id: number
  token_URI?: string
  checkCard: Function
  singleUnstake: Function
  singleStake: Function
  singleApprove: Function
  staked?: boolean
  allowedNfts: number[]
}

const NFTCard: React.FC<NFTCardProps> = ({ singleStake, singleUnstake, staked, checkCard, id, image, name, token_address, token_id, token_URI, allowedNfts, singleApprove }) => {
  const [checked, setChecked] = useState(false)

  return (
    <Card onClick={()=> {checkCard(token_id); setChecked(!checked)}} $active={checked}>
        <CardWrapper>
            <CardImage>
              <img src={image} />
            </CardImage>

            <CardName>
              <h3>{name}</h3>
              { staked && <span>Staked</span> }
            </CardName>

            {
              staked ? 
              <ModalHeaderButtons onClick={ ()=> singleUnstake(token_id) }>Unstake</ModalHeaderButtons> :
              (allowedNfts.includes(token_id) ? <ModalHeaderButtons onClick={ ()=> singleStake(token_id) }>Stake</ModalHeaderButtons> : <ModalHeaderButtons onClick={ ()=> singleApprove(token_id) }>Approve</ModalHeaderButtons>)
            }
        </CardWrapper>
    </Card>
  )
}

export default NFTCard
