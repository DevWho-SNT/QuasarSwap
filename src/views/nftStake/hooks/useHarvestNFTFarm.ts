import { useCallback } from 'react'
import { harvestNFTFarm } from 'utils/calls'
import { usePulsar } from 'hooks/useContract'

const useHarvestNFTFarm = (farmPid: number) => {
  const pulsarContract = usePulsar()

  const handleHarvest = useCallback(async () => {
    return null
  }, [farmPid, pulsarContract])

  return { onReward: handleHarvest }
}

export default useHarvestNFTFarm
