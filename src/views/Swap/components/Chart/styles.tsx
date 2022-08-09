import { Box } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{ $isDark: boolean; $isExpanded: boolean }>`
  border: none;
  border-radius: 2px;
  width: 100%;
  padding-top: 36px;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
    // background: ${({ $isDark }) => ($isDark ? 'rgba(39, 38, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    background-color: #fff;
    border: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
    border-radius: ${({ $isExpanded }) => ($isExpanded ? '0' : '2px')};
    width: ${({ $isExpanded }) => ($isExpanded ? '100%' : '650px')};
    height: ${({ $isExpanded }) => ($isExpanded ? 'calc(100vh - 100px)' : '450px')};
  }

  margin: 22px auto 0;
`

StyledPriceChart.defaultProps = {
  height: '70%',
}
