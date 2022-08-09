import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { parseUnits } from '@ethersproject/units'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeNFT = async (callWithGasPrice, pulsarContract, pid, tokenIDs, stakingFee) => {
  const gasPrice = getGasPrice()
  const weiString = stakingFee * tokenIDs.length
  const nftPriceWei = parseUnits( weiString.toString(), 'ether')

  if (tokenIDs.length < 2) {
    return callWithGasPrice(pulsarContract, 'stake', [pid, tokenIDs[0]], {
      value: nftPriceWei
    })
  }

  return callWithGasPrice(pulsarContract, 'batchStake', [pid, tokenIDs], {
    value: nftPriceWei
  })
}

export const unstakeNFT = async (callWithGasPrice, pulsarContract, pid, tokenIDs, harvestingFee) => {
  const gasPrice = getGasPrice()
  const weiString = harvestingFee * tokenIDs.length
  const nftPriceWei = parseUnits( weiString.toString(), 'ether')

  if (tokenIDs.length < 2) {
    return callWithGasPrice(pulsarContract, 'unstake', [pid, tokenIDs[0]], {
      value: nftPriceWei
    })
  }

  return callWithGasPrice(pulsarContract, 'batchUnstake', [pid, tokenIDs], {
    value: nftPriceWei
  })
}

export const harvestNFTFarm = async (callWithGasPrice, pulsarContract, pid, harvestingFee) => {
  const gasPrice = getGasPrice()
  const weiString = harvestingFee
  const nftPriceWei = parseUnits( weiString.toString(), 'ether')

  return callWithGasPrice(pulsarContract, 'harvest', [pid], {
    value: nftPriceWei
  })
}
