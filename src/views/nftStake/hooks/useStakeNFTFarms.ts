import { useCallback } from 'react'
import { stakeNFT } from 'utils/calls'
import { usePulsar } from 'hooks/useContract'
import { Contract } from '@ethersproject/contracts'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useStakeNFTFarms = (pid: number, stakingFee: number) => {
  const pulsarContract = usePulsar()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleStake = useCallback(
    async (amount: any[]) => {
      return stakeNFT(callWithGasPrice, pulsarContract, pid, amount, stakingFee)
    },
    [pulsarContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeNFTFarms
