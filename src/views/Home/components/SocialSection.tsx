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
    color: #fff;
    text-align: center;
    margin-bottom: 22px;

    span {
        color: #004382;
    }

    @media only screen and (max-width: 768px) {
        font-size: 28px;
    }
`
const DiscordLink = styled.a`
    color: #fff;
    border-radius: 2px;
    padding: 12px 16px;
    background-color: rgb(0, 67, 130);
    display: flex;
    transition: background-color 0.2s,opacity 0.2s;

    &:hover {
        cursor: pointer;
        opacity: 0.65;
    }
`
const Meteor = styled.img`
    position: absolute;
    opacity: 1;
    z-index: 0;
`
const SocialSection = () => {
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
            <Meteor
                style={{ 
                    top: isMobile ? '-155%' : '-142%', 
                    left: isMobile ? '-170%' : '-28%', 
                    width: '260px', 
                    height: '260px', 
                    transform: `rotate(120deg) scaleY(-1) translate(${offset * 0.25}px, ${offset * 0.35}px)` }} 
                src="/images/meteor.svg" alt={'meteor'} />

            <Meteor
                style={{ 
                    top: isMobile ? '-45%' : '-40%', 
                    right: isMobile ? '-312%' : '-50%', 
                    width: '210px', 
                    height: '210px', 
                    transform: `rotate(230deg) scaleY(-1) scaleX(-1) translate(-${offset * 0.2}px, ${offset * 0.35}px)` }} 
                src="/images/meteor.svg" alt={'meteor'} />

            <Meteor
                style={{ 
                    top: isMobile ? '15%' : '24%', 
                    right: isMobile ? '-450%' : '-90%', 
                    width: '180px', 
                    height: '180px', 
                    transform: `rotate(228deg) scaleY(-1) scaleX(-1) translate(-${offset * 0.4}px, ${offset * 0.45}px)` }} 
                src="/images/meteor.svg" alt={'meteor'} />

            <Fade bottom>
                <Title>
                    Want to participate in this project? <br /> Join our community!
                </Title>

                <DiscordLink target="_blank" href={'https://discord.gg/jznAjdtvTn'}>Join our Discord</DiscordLink>
            </Fade>
        </ParallaxPageWr>
    )
}

export default SocialSection