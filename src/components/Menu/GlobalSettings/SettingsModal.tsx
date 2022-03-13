import {useState} from 'react'
import styled from 'styled-components'
import {Flex, InjectedModalProps, Modal} from '@uikit'
import {useUserExpertModeAcknowledgementShow,} from 'state/user/hooks'
import {useTranslation} from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const SettingWrapper = styled(Flex)`
  padding: 0 12px;
`


const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()

  const { t } = useTranslation()
  const { theme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  return (
    <Modal
      title={t('Advanced Settings')}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: '420px' }}
    >
      <ScrollableContainer>
        <SettingWrapper flexDirection="column" borderTop={`1px ${theme.colors.cardBorder} solid`}>
          <TransactionSettings />
        </SettingWrapper>
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
