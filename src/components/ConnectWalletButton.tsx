import { Button, useWalletModal } from '@uikit'
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

  return (
    <ButtonConnenctWallet onClick={onPresentConnectModal} {...props}>
      <Trans>Connect Wallet</Trans>
    </ButtonConnenctWallet>
  )
}

export default ConnectWalletButton
