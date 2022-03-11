import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import MoreHorizontal from '../../components/Svg/Icons/MoreHorizontal'
import { ButtonProps } from '../../components/Button'
import { connectorLocalStorageKey, walletLocalStorageKey } from './config'
import { Login, Config, ConnectorNames } from './types'

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
}

const WalletButton = styled(Button).attrs({ width: '100%', variant: 'text', py: '16px' })`
  align-items: center;
  display: flex;
  // flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 45px;
`

const DivIcon = styled.div`
  display: flex;
  background: #282828;
  border-radius: 10px 0px 0px 10px;
  height: 66px;
  width: 90px;
  justify-content: center;
  align-items: center;
`

const WalletButtonText = styled(Text)`
  display: flex;
  flex-grow: 1;
  height: 66px;
  background: #454545;
  border-radius: 0px 10px 10px 0px;
  align-items: center;
  padding-left: 20px
`


interface MoreWalletCardProps extends ButtonProps {
  t: (key: string) => string
}

export const MoreWalletCard: React.FC<MoreWalletCardProps> = ({ t, ...props }) => {
  return (
    <WalletButton variant="tertiary" {...props}>
      <MoreHorizontal width="40px" color="textSubtle" />
      <Text fontSize="14px">{t('More')}</Text>
    </WalletButton>
  )
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig

  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        if (walletConfig.title === 'Trust Wallet' && isIOS) {
          login(ConnectorNames.WalletConnect)
        } else {
          login(walletConfig.connectorId)
        }

        localStorage.setItem(walletLocalStorageKey, walletConfig.title)
        localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId)
        onDismiss()
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <DivIcon><Icon width="36px" /></DivIcon>
      <WalletButtonText fontSize="14px">{title}</WalletButtonText>
    </WalletButton>
  )
}

export default WalletCard
