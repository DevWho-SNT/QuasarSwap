import { useEffect, useState } from "react"
import { isMobile } from 'react-device-detect'

import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const ParallaxPageWr = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;
    z-index: 1;
    position: relative;
`

const Title = styled.h2`
    font-size: 32px;
    font-weight: 600;
    line-height: 1.1;
    color: #fff;
    text-align: center;
    margin-bottom: 36px;
`

const ListCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const Card = styled.div`
    border-radius: 8px;
    background: #fff;
    margin: 0 12px;
    padding: 20px 12px;
    text-align: left;
    max-width: 250px;

    h3 {
        font-size: 36px;
        font-weight: 600;
        line-height: 1.1;
        color: #00294f;
        margin-bottom: 22px;

        label {
            color: #fe5917;
        }
    }

    p {
        font-size: 16px;
        font-weight: 400;
        color: #aaa;
    }

    @media only screen and (max-width: 768px) {
        max-width: 100%;
        width: 100%;
        margin: 0;
        margin-bottom: 20px;
    }
`

const ShootingStar = styled.img`
    position: absolute;
    opacity: 0.55;
    z-index: 1;
`

const Ship = styled(ShootingStar)`
    opacity: 1;
`

const NumberSection = () => {
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
        <>
            <ShootingStar
                style={{ 
                    top: isMobile ? '180px' : '-39px', 
                    right: isMobile ? '100px' : '60px', 
                    width: '100px', 
                    height: '100px', 
                    transform: `translate(-${offset * 0.15}px, ${offset * 0.25}px)` }} 
                src="/images/shooting-star.svg" alt={'shooting star'} />

            <ShootingStar
                style={{ 
                    top: isMobile ? '280px' : '180px', 
                    right: isMobile ? '-180px' : '-140px', 
                    width: '140px', 
                    height: '140px', 
                    transform: `translate(-${offset * 0.3}px, ${offset * 0.1}px)` }} 
                src="/images/shooting-star.svg" alt={'shooting star'} />

            <ShootingStar
                style={{ 
                    top: isMobile ? '240px' : '148px', 
                    right: isMobile ? '-180px' : '113px',
                     width: '120px', 
                     height: '120px', 
                     transform: `translate(-${offset * 0.4}px, ${offset * 0.25}px)` }} 
                src="/images/shooting-star.svg" alt={'shooting star'} />

            <Ship 
                style={{ 
                    top: isMobile ? '150px' : '110px', 
                    left: isMobile ? '-150px' : '120px', 
                    width: isMobile ? '130px' : '290px', 
                    height:  isMobile ? '130px' : '290px', 
                    transform: `translate(${offset * 0.5}px, -${offset * 0.19}px)` }} 
                src="/images/ship.svg" alt={'ship'} />

            
            <ParallaxPageWr>
                <Fade bottom>
                    <Title>
                        Guided by our Core Concepts <h1>we strive for a product that's:</h1>
                    </Title>

                    <ListCard>
                        <Card>
                            <h3> Simple <label> Transparent</label></h3>
                        </Card>
                        <Card>
                            <h3> <label>Useful </label> Innovative </h3>
                        </Card>
                    </ListCard>
                </Fade>
            </ParallaxPageWr>
        </>
    )
}

export default NumberSection