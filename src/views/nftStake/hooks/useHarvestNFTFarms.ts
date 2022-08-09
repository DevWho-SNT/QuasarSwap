import { useCallback } from 'react'
import { harvestNFTFarm } from 'utils/calls'
import { usePulsar } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useHarvestNFTFarms = (pid: number, harvestingFee: number) => {
  const pulsarContract = usePulsar()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleHarvest = useCallback(
    async () => {
      return harvestNFTFarm(callWithGasPrice, pulsarContract, pid, harvestingFee)
    },
    [pulsarContract, pid],
  )

  return { onHarvest: handleHarvest }
}

export default useHarvestNFTFarms
