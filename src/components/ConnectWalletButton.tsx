import { Button, useMatchBreakpoints, useWalletModal } from '@uikit'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'

const ButtonConnenctWallet = styled(Button)`
  color: #000;
  padding: 14px 19px;
  height: 48px;
  border-radius: 5px;
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { isMobile } = useMatchBreakpoints();


  return (
    <ButtonConnenctWallet onClick={onPresentConnectModal} {...props}>
      <Trans>{isMobile ? "Connect":"Connect Wallet"}</Trans>
    </ButtonConnenctWallet>
  )
}

export default ConnectWalletButton
