import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 8px;
  max-width: 100%;
  width: 100%;
  z-index: 1;
  margin: 136px 0;

  & > div {
    border-radius: 8px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
