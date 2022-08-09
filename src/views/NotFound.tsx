import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  position: relative;
  z-index: 1;
`

const StyledHeading = styled(Heading)`
  color: #fff;
  font-size: 72px;
  margin-top: 24px;
  position: relative;
`

const StyledText = styled(Text)`
  color: #fff;
  font-size: 31px;
  position: relative;
`

const Logo404 = styled.img`
  width: 180px;
  position: relative;
`

const Icon = styled.img`
  position: absolute;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
      <Icon
          src="/images/404-erro-icon-1.svg"
          alt="icon 1"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            left: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-2.svg"
          alt="icon 2"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            left: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-3.svg"
          alt="icon 3"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            left: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-4.svg"
          alt="icon 4"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            left: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-5.svg"
          alt="icon 5"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            right: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-6.svg"
          alt="icon 6"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            right: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-7.svg"
          alt="icon 7"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            right: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Icon
          src="/images/404-erro-icon-8.svg"
          alt="icon 8"
          style={{ 
            top: ((Math.random() * 90) + 5) + '%', 
            right: (Math.random() * 30) + '%',
            width: ((Math.random() * 30) + 20) + 'px'
          }}
        />

        <Logo404
          src="/images/404-erro-logo.png"
          alt="404 not found"
        />

        <StyledHeading scale="xxl">404</StyledHeading>
        <StyledText mb="16px">{t('Oops! Page not found.')}</StyledText>

        <Link href="/" passHref>
          <Button as="a" scale="sm">
            {t('Go Back Home')}
          </Button>
        </Link>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
