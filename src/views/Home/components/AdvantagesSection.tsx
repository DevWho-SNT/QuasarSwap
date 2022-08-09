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
    z-index: 1;
    position: relative;
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
    margin: 0 12px;
    padding: 20px 12px;
    text-align: center;
    max-width: 250px;

    div {
        width: 120px;
        height: 120px;
        margin: 0 auto 22px;

        svg {
            width: 100%;
        }
    }

    h3 {
        font-size: 22px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 12px;
        font-family: 'Azonix';
    }

    p {
        font-size: 14px;
        font-weight: 400;
        color: #fff;
    }

    @media only screen and (max-width: 768px) {
        margin: 0;
        padding: 20px;
        margin-bottom: 22px;
        max-width: max-content;

        div {
            width: 80px;
            height: 80px;
        }
    }
`

const IconDuck = styled.img`
    width: 100%;
`

const AdvantagesSection = () => {
    return(  
        <ParallaxPageWr>
            <ListCard>
                <Fade left>
                    <Card>
                        <div>
                            <IconDuck src="/images/item-1.svg" />
                        </div>

                        <h3>Fast</h3>
                        <p>Almost-zero fees for almost instant swaps. You have to try to understand.</p>
                    </Card>
                </Fade>

                <Fade bottom>
                    <Card style={{marginTop: isMobile ? '0px' : '-80px'}}>
                        <div>
                            <IconDuck src="/images/item-2.svg" />
                        </div>
                        
                        <h3>Farms</h3>
                        <p>Supply liquidity and farm our governance token. Help the DAO by voting!</p>
                    </Card>
                </Fade>

                <Fade right>
                    <Card>
                        <div>
                            <IconDuck src="/images/item-3.svg" />
                        </div>

                        <h3>User</h3>
                        <p>You are the protocol's motif. Enjoy a non-KYC, utility-focused service for free.</p>
                    </Card>
                </Fade>
            </ListCard>
        </ParallaxPageWr>
    )
}

export default AdvantagesSection