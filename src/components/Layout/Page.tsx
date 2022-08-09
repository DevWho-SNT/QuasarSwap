import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import Container from './Container'

import ParticlesStarts from '../ParticlesStarts'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  background: linear-gradient(180deg, #00024F 31.25%, #FE5917 96.87%);
  position: relative;
  max-width: 100%;

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

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

const ParticleBg = styled.div`
  position: relative;
  z-index: 1;

  div {
    background-image: url("/images/farms-bg.png");
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

export const PageMeta: React.FC<{ symbol?: string }> = ({ symbol }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  const cakePriceUsd = useCakeBusdPrice()
  const cakePriceUsdDisplay = cakePriceUsd ? `$${cakePriceUsd.toFixed(3)}` : '...'

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  let pageTitle = cakePriceUsdDisplay ? [title, cakePriceUsdDisplay].join(' - ') : title
  if (symbol) {
    pageTitle = [symbol, title].join(' - ')
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
}

const Page: React.FC<PageProps> = ({ children, symbol, ...props }) => {
  return (
    <>
      <PageMeta symbol={symbol} />
      <StyledPage {...props}>
        <ParticlesStarts />
        <ParticleBg><div></div></ParticleBg>
        {children}
      </StyledPage>
    </>
  )
}

export default Page
