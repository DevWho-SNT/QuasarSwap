import styled from 'styled-components'
import { Button, useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const SolidButton = styled(Button)`
    border-radius: 2px;
    border: 1px solid;
    font-size: 14px;
    font-weight: 400;
    padding: 12px 16px;
    box-shadow: none;

    &:hover {
      opacity: 0.65;
  }
  `

  return (
    <SolidButton onClick={onPresentConnectModal} {...props}>
      <Trans>Connect Wallet</Trans>
    </SolidButton>
  )
}

export default ConnectWalletButton
