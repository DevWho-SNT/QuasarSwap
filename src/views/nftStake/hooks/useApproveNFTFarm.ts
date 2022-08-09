import { useCallback } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { usePulsar } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useApproveFarm = (lpContract: Contract) => {
  const pulsarContract = usePulsar()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleApprove = useCallback(async (nftId) => {
    return callWithGasPrice(lpContract, 'approve', [pulsarContract.address, nftId])
  }, [lpContract, pulsarContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveFarm
