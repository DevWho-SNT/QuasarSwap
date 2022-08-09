import { PancakeCollectionKey, PancakeCollections } from './types'

const pancakeCollections: PancakeCollections = {
  [PancakeCollectionKey.PANCAKE]: {
    name: 'Pancake Bunnies',
    slug: 'pancake-bunnies',
    address: {
      107: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
      87: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
    },
  },
  [PancakeCollectionKey.SQUAD]: {
    name: 'Pancake Squad',
    description: "PancakeSwap's first official generative NFT collection.. Join the squad.",
    slug: 'pancake-squad',
    address: {
      107: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
      87: '0x5167252AE366fD6E7dEEDa43C5e76387BC25aa57',
    },
  },
}

export default pancakeCollections
