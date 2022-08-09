import { useCallback } from 'react'
import { unstakeNFT } from 'utils/calls'
import { usePulsar } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useUnstakeNFTFarms = (pid: number, harvestingFee: number) => {
  const pulsarContract = usePulsar()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleUnstake = useCallback(
    async (amount: any[]) => {
      return unstakeNFT(callWithGasPrice, pulsarContract, pid, amount, harvestingFee)
    },
    [pulsarContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeNFTFarms
