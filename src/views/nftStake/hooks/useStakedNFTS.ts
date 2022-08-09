import { useCallback } from 'react'
import { usePulsar } from 'hooks/useContract'
import { useEffect, useReducer } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useIPFS } from './useIPFS'
import { Contract } from '@ethersproject/contracts'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

export const getIds = async (pulsarContract, account, pid) => {
    return pulsarContract.getStakedId(account, pid)
}

const useStakedNFTS = (contract: Contract, account: string, pid: number): {
    stakedList: any
} => {
    const pulsarContract = usePulsar()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { resolveLink } = useIPFS()

    const handleGetStakedIds = useCallback(async () => {
        return getIds(pulsarContract, account, pid)
    }, [account, pid])

    const handleGetStakedUri = useCallback(async (id) => {
        return callWithGasPrice(contract, 'tokenURI', [id])
    }, [account, pid])

    const handleGetStakedMeta = useCallback(async () => {
        const ids = await handleGetStakedIds()
        const uris = []
        const nftStaked = [];

        for (const id of ids) {
            uris.push({
                uri: resolveLink(await handleGetStakedUri(id.toNumber())),
                id: id.toNumber()
            })
        }

        for (const u of uris) {
            const nftItem = await fetch(u.uri, {
                method: 'GET'
            })
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Error fetching data')
                } else {
                    return response.json()
                }
            })
            .then(response => {
                if(response) {
                    return ({
                        id: u.id,
                        name: response.name,
                        image: resolveLink(response.image),
                        token_address: contract.address,
                        token_id: u.id,
                        token_URI: u.uri,
                        staked: true
                    });
                }
            })
            .catch(() => null)

            if(nftItem) {
                nftStaked.push(nftItem)
            }
        }
        
        return nftStaked        
    }, [resolveLink, account, pid, callWithGasPrice])

    return { stakedList:handleGetStakedMeta }
}

export default useStakedNFTS