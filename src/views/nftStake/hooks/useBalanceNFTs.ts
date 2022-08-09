import { useCallback } from 'react'
import { usePulsar } from 'hooks/useContract'
import { getAddress, getPulsarAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import erc721ABI from 'config/abi/erc721.json'
import { FarmWithAvailableValue } from 'views/nftStake/components/ModalNFT'


export const getUserInfo = async (pulsarContract, account, pid) => {
    return pulsarContract.userInfo(pid, account)
}

export const getUserEarned = async (pulsarContract, account, pid) => {
    return pulsarContract.pendingQsr(pid, account)
}

export const useBalanceNFTs = (account: string, pid: number): {
    balance: any
} => {
    const pulsarContract = usePulsar()

    const handleGetBalance = useCallback(async () => {
        return getUserInfo(pulsarContract, account, pid)
    }, [pid, account])

    return { balance:handleGetBalance }
}

export const useFarmsEarned = (account: string, pid: number): {
    earned: any
} => {
    const pulsarContract = usePulsar()

    const handleGetEarned = useCallback(async () => {
        return getUserEarned(pulsarContract, account, pid)
    }, [pid, account])

    return { earned:handleGetEarned }
}

export const fetchNFTAllowedList = async (collectionAddress: string, nftIDs: number[]) => {
    const pulsarAddress = getPulsarAddress()
  
    const calls = nftIDs.map((iD) => {
        const colContractAddress = collectionAddress
        return { 
            address: colContractAddress,
            name: 'getApproved',
            params: [iD] 
        }
    })
  
    const nftAllowedList = await multicall(erc721ABI, calls)
    const nftAllowedListSerialized = []
    
    for(let i=0;i<nftIDs.length;i++) {
        nftAllowedListSerialized.push(
            {
                id: nftIDs[i],
                _approved: nftAllowedList[i]._approved
            }
        )
    }
    

    const nftAllowedListFilter = nftAllowedListSerialized.filter(item => item._approved === pulsarAddress)
    return nftAllowedListFilter
  }