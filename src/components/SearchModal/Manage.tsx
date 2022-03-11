import { useState } from 'react'
import { Token } from '@pancakeswap/sdk'
import { ButtonMenu, ButtonMenuItem, ModalBody } from '@uikit'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from 'contexts/Localization'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'
import { CurrencyModalView } from './types'

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
  background: #454545;
  border-radius: 15px;
  height: 57px;
  padding: 8px;
  align-items: center;
  color: #DCDCDC;
`

const CustomButtonMenuItem = styled(ButtonMenuItem)`
  height: 40px
`

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [showLists, setShowLists] = useState(true)

  const { t } = useTranslation()

  return (
    <ModalBody>
      <StyledButtonMenu
        activeIndex={showLists ? 0 : 1}
        onItemClick={() => setShowLists((prev) => !prev)}
        scale="sm"
        variant="metafound"
        mb="32px"
      >
        <CustomButtonMenuItem width="50%">{t('Lists')}</CustomButtonMenuItem>
        <CustomButtonMenuItem width="50%">{t('Tokens')}</CustomButtonMenuItem>
      </StyledButtonMenu>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </ModalBody>
  )
}
