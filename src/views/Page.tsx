import styled from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'

import ParticlesStarts from '../components/ParticlesStarts'

const StyledPage = styled.div<{ $removePadding: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #00024F 31.25%, #FE5917 96.87%);
  position: relative;

  &::before {
    content: "";
    background: linear-gradient(180deg, rgba(0, 2, 79, 0) 0%, rgba(5, 1, 0, 0.28) 96.87%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: calc(100vh - 100px);
  }
`

const ParticleBg = styled.div`
  position: relative;
  z-index: 1;

  div {
    background-image: url("/images/farms-bg-mobile.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { removePadding?: boolean; hideFooterOnDesktop?: boolean }
> = ({ children, removePadding = false, hideFooterOnDesktop = false, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} {...props}>
        <ParticlesStarts />
        <ParticleBg><div></div></ParticleBg>

        {children}

        <Flex flexGrow={1} />
        {/*<Box display={['block', null, null, hideFooterOnDesktop ? 'none' : 'block']} width="100%">
                <Footer />
        </Box>*/}
      </StyledPage>
    </>
  )
}

export default Page
