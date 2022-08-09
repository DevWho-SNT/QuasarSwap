import { useEffect, useState } from "react"
import { isMobile } from 'react-device-detect'

import { NextLinkFromReactRouter } from 'components/NextLink'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const ParallaxPageWr = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    z-index: 1;
    position: relative;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
    line-height: 1.1;
    color: #00024F;
    text-align: center;
    margin-bottom: 22px;
    font-family: 'Azonix';

    span {
        color: #004382;
        font-family: 'Azonix';
    }
`

const SubTitle = styled.h4`
    font-size: 18px;
    font-weight: 400;
    color: #aaa;
    text-align: center;
    margin-bottom: 36px;
`

const BgSection = styled.div`
    background: #fff;
    width: 100%;
    height: 55%;
    position: absolute;
    top: 70%;
    left: 0;
    z-index: -1;

    @media only screen and (max-width: 768px) {
        top: auto;
    }
`

const SolidButton = styled(Button)`
    border-radius: 2px;
    border: 1px solid;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 16px;
`

const CTASection = () => {
    const { t } = useTranslation()
    const [offset, setOffset] = useState(0);

    const handleScroll = () => {
        setOffset(window.pageYOffset);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [offset]);

    return(  
        <ParallaxPageWr>
            <BgSection style={{ transform: isMobile ? 'none' : `translateY(-${offset * 0.15}px)` }}></BgSection>

            <Fade bottom>
                <Title>
                    <span>Trade</span> without problems. <br />
                </Title>
                <SubTitle>
                    Connect and forget. Swap any asset on  <br /> the Nova Network for less than a penny
                </SubTitle>

                <NextLinkFromReactRouter to="/swap">
                    <SolidButton variant={'secondary'} style={{ borderColor: '#004382', backgroundColor: '#004382' , color: '#fff' }}>
                        {t('Trade Now')}
                    </SolidButton>
                </NextLinkFromReactRouter>
            </Fade>
        </ParallaxPageWr>
    )
}

export default CTASection