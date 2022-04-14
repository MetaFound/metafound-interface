import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import axios from 'axios'
import Link from 'next/link'
import { API_ENDPOINT } from 'config/constants/api'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'
import MyProfile from './MyProfile'
import MyInvest from './MyInvest'
import MyTier from './MyTier'
import KYC from './KYC'
import NeedHelp from './NeedHelp'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
`

const PageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  width: fit-content;
  display: block;
  margin-bottom: 10vh;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const LeftPanel = styled.div`
  margin-right: 12px;
  // display: flex;
  // ${({ theme }) => theme.mediaQueries.sm} {
  //   display: block;
  // }
`

const MyAccountItem = styled.div<{ active: boolean }>`
  background: transparent;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  width: 155px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  ${({ active }) => active && 'background: #333333; border: 0.5px solid #fdb81480; color: #FDB814;'}
`

const RightPanel = styled.div`
  background: #333333;
  border: 0.5px solid #fdb81480;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 622px;
    padding: 38px 48px;
  }
`

const MyAccount = ({ tab }) => {
  const { account } = useActiveWeb3React()
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/api/v1/login`,
        data: {
          walletAddress: account,
        },
      })
      setAccessToken(result.data.data.accessToken)
    }
    if (account) {
      getAccessToken()
    }
  }, [account])

  return (
    <PageWrapper>
      <PageContainer>
        <LeftPanel>
          <Link href="/my-account/my-profile">
            <MyAccountItem active={tab === 'my-profile'}>My Profile</MyAccountItem>
          </Link>
          <Link href="/my-account/my-invest">
            <MyAccountItem active={tab === 'my-invest'}>My Invest </MyAccountItem>
          </Link>
          <Link href="/my-account/my-tier">
            <MyAccountItem active={tab === 'my-tier'}>My Tier </MyAccountItem>
          </Link>
          <Link href="/my-account/need-help">
            <MyAccountItem active={tab === 'need-help'}>Need Help </MyAccountItem>
          </Link>
        </LeftPanel>
        <RightPanel>
          {tab === 'my-profile' ? (
            <MyProfile />
          ) : tab === 'my-invest' ? (
            <MyInvest accessToken={accessToken} />
          ) : tab === 'my-tier' ? (
            <MyTier accessToken={accessToken} />
          ) : (
            <NeedHelp />
          )}
        </RightPanel>
      </PageContainer>
    </PageWrapper>
  )
}

export default MyAccount
