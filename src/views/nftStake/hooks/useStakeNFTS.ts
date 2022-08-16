import { useEffect, useReducer } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useIPFS } from './useIPFS'

function asyncArrayReducer(state: { data: any }, action: { type: string; data: any; error: string | null }) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'update': {
      const { id } = action.data
      const { data } = state
      const newData = data?.map((nft: any) => {
        if (id === nft.id) {
          return { ...nft, ...action.data }
        } else {
          return nft
        }
      })
      return { status: 'resolved', data: newData, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useStakeNFTs = (): {
  ERC721tokens: any
  status: string
} => {
  const { account } = useActiveWeb3React()
  const [state, dispatch] = useReducer(asyncArrayReducer, {
    status: 'idle',
    data: null,
    error: null
  })
  const { resolveLink } = useIPFS()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_INDEXER_API_NFT}/api/owned_nfts/${account}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Error fetching data')
        } else {
          return response.json()
        }
      })
      .then(response => {
        if (response && response.result) {
          const ERC721tokens = response.data.map(function(token) {
            let metadata
            try {
              metadata = JSON.parse(token.metadata)
            } catch {}
            return { ...token, ...metadata };
          })

          dispatch({ type: 'resolved', data: ERC721tokens, error: null })
          ;(async () => {
            if (ERC721tokens?.length) {
              const getMetaData = async (nft: any) => {
                try {
                  const { id, image, name } = nft
                  dispatch({ type: 'update', data: { id, image: resolveLink(image), name }, error: null })
                } catch (err) {}
              }
              Promise.all(ERC721tokens?.map((nft: any) => getMetaData(nft)))
            }
          })()
        }
      })
      .catch(() => null)
  }, [resolveLink, account])

  const { data, status } = state

  return {
    status,
    ERC721tokens: data
  }
}

export default useStakeNFTs
