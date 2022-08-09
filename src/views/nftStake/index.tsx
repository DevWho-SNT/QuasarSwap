import { FC } from 'react'
import NFTFarms, { NFTFarmsContext } from './NFTFarms'

export const NFTFarmsPageLayout: FC = ({ children }) => {
  return <NFTFarms>{children}</NFTFarms>
}

export { NFTFarmsContext }
