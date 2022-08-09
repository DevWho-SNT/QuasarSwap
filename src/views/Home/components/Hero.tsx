import styled, { keyframes } from 'styled-components'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Flex, Heading, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './CompositeImage'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  &:nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  &:nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const HeroWrapper = styled.div`
  height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #000000 34.63%, #00024F 100%);
`

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translateY(-50%);

  @media only screen and (max-width: 768px) {
    top: 60vh;
    left: 20px;
    transform: none;

    h1 {
      color: #fff;
    }
  }
`

const SubTitle = styled.h2`
  font-size: 44px;
  font-weight: 600;
  line-height: 1.1;
  color: #fe5917;
  text-align: left;
`

const Title = styled.h1`
  font-size: 45px;
  font-weight: 600;
  line-height: 1.1;
  color: #004382;
  text-align: left;
  margin-bottom: 42px;
  font-family: 'Azonix';
`

const OutlineButton = styled(Button)`
  border-radius: 2px;
  border: 1px solid;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 26px;

  &:hover {
    opacity: 1 !important;
    background-color: #fe5917;
    color: #fff;
  }
`

const HeroImage = styled.div`
  @keyframes levitate {
    0% {transform: translateY(5%);}
    50% {transform: translateY(-10%);}
    100% {transform: translateY(5%);}
  }

  position: absolute;
  top: 130px;
  right: 90px;
  z-index: 1;
  animation-name: levitate;
  animation-duration: 4.5s;
  animation-iteration-count: infinite;
  width: 32%;

  img {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    animation: none;
    width: 50%;
  }
`

const HeroImgText = styled.img`
  width: 50%;
  max-width: 1070px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const imagePath = '/images/home/lunar-bunny/'
const imageSrc = 'bunny'

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()

  return (
    <>
      <HeroWrapper>
        <HeroContent>
          <HeroImgText src="/images/banner-bg.png" />

          <HeroText>
            <SubTitle>Enjoy the</SubTitle>
            <SubTitle>beauty of</SubTitle>
            <Title>Quasars!</Title>

            <NextLinkFromReactRouter to="/swap">
              <OutlineButton variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</OutlineButton>
            </NextLinkFromReactRouter>
          </HeroText>
        </HeroContent>
        <HeroImage>
          <img src="/images/home-banner.png" alt={'home banner'} />
        </HeroImage>
      </HeroWrapper>

      {/* <BgWrapper>
        <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading justifyContent="center" scale="xxl" color="secondary" mb="24px">
            {t('The moon is made of Quasars.')}
          </Heading>
          <Heading justifyContent="center" scale="md" mb="24px">
            {t('Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.')}
          </Heading>
          <Flex justifyContent="center">
            {!account && <ConnectWalletButton mr="8px" />}
            <NextLinkFromReactRouter to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
    </Flex> */}
    </>
  )
}

export default Hero
