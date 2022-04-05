import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import BigNumber from 'bignumber.js'
import unserializedTokens from 'config/constants/tokens'
import { TransactionResponse } from '@ethersproject/providers'
import { useMetafoundContract } from 'hooks/useContract'
import { useWalletModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getMetafoundAddress } from 'utils/addressHelpers'
import { TokenAmount } from '@pancakeswap/sdk'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'

const MyProfileWrapper = styled.div``

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 24px;
`

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 24px;
`

const MainWallet = styled.div`
  margin-top: 15px;
  background: #4a4a4a;
  border-radius: 8px;
  padding: 12px 24px;
  margin-bottom: 32px;
`

const TextWallet = styled.div`
  margin-right: 24px;
`

const IconMetamask = styled.img`
  width: 36px;
  height: 36px;
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const TextSpan = styled(Text)`
  display: inline-block;
`

const StepCont = styled.div`
  margin-top: 24px;
`

const StepItem = styled.div`
  border: 0.5px solid #fdb81480;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 14px 24px;
`

const StepButton = styled.div<{ active: boolean }>`
  border: 0.5px solid #fdb81480;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 16px;
  font-weight: 500;
  font-size: 14px;
  color: #fdb814;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;
  ${({ active }) => active && 'background: #FDB814; color: #000000;'}
`
const StepCircle = styled.div`
  width: 28px;
  height: 28px;
  background: #fdb814;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: 500;
`

const BtnChange = styled(Text)`
  cursor: pointer;
`

const InputStake = styled(Input)``

const MyProfile = () => {
  const decimals = new BigNumber(10).pow(unserializedTokens.mtf.decimals)
  const { account } = useActiveWeb3React()
  const [addressWallet, setAddressWallet] = useState('')
  const [stakeInput, setStakeInput] = useState('')
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const contract = useMetafoundContract()
  const [approval, approveCallback] = useApproveCallback(
    !stakeInput
      ? undefined
      : new TokenAmount(unserializedTokens.mtf, new BigNumber(stakeInput).times(decimals).toString()),
    getMetafoundAddress(),
  )

  useEffect(() => {
    if (account) {
      setAddressWallet(account)
    }
  }, [account])

  const stakeMtf = async () => {
    const value = new BigNumber(stakeInput).times(decimals)
    if (approval === ApprovalState.APPROVED) {
      console.log(1)
      const stake = await contract.stakeMtf(value.toString())
      console.log(1, stake)
    } else if (approval !== ApprovalState.PENDING) {
      console.log(2)
      await approveCallback()
    }
  }

  const onChange = (e) => {
    setStakeInput(e.target.value)
  }

  return (
    <MyProfileWrapper>
      <Title>My Profile</Title>
      <SubTitle>Wallet Addresses</SubTitle>
      <MainWallet>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <TextWallet>
              <Text color="#9C9C9C" fontSize="15px">
                Main Wallet Address
              </Text>
              <Text color="#fff" fontSize="16px">
                {`${addressWallet.slice(0, 8)}*********${addressWallet.slice(
                  addressWallet.length - 8,
                  addressWallet.length,
                )}`}
              </Text>
            </TextWallet>
            <IconMetamask src="/images/myAccount/metamark1.svg" />
          </Flex>
          {/* <BtnChange color="#FDB814" fontSize="16px" onClick={onPresentConnectModal}>
            Change
          </BtnChange> */}
        </Flex>
      </MainWallet>
      <Text color="#fff" fontSize="20px">
        Getting Started
      </Text>
      <TextSpan color="#868686">
        Here are <TextSpan color="#FDB814">3 steps</TextSpan> for you to start on MetaFound.
      </TextSpan>
      <StepCont>
        <StepItem>
          <Text color="#959595" fontSize="14px">
            Stake to achive MetaFound Tier
          </Text>
          <Text color="#fff" fontSize="16px">
            Stake MTF to achieve tier (Silver, Gold, Dimond)
          </Text>
          <Flex mt="20px" justifyContent="space-between" alignItems="center">
            <Flex>
              <InputStake onChange={onChange} value={stakeInput} />
              <StepButton active onClick={stakeMtf}>
                {(() => {
                  console.log(approval, ApprovalState.UNKNOWN)
                })()}
              {approval === ApprovalState.APPROVED ? 'Stake now' : approval === ApprovalState.PENDING ? 'Approving...' : approval === ApprovalState.NOT_APPROVED ? 'Approve' : null}
              </StepButton>
            </Flex>
            <StepCircle>1</StepCircle>
          </Flex>
        </StepItem>
      </StepCont>
      {/* <StepCont>
        <StepItem>
          <Text color="#959595" fontSize="14px">
            Complete KYC
          </Text>
          <Text color="#fff" fontSize="16px">
            You must complete KYC on Blockpass to be eligible to join IDO
          </Text>
          <Flex mt="20px" justifyContent="space-between" alignItems="center">
            <StepButton active={false}>How to KYC</StepButton>
            <StepCircle>2</StepCircle>
          </Flex>
        </StepItem>
      </StepCont>
      <StepCont>
        <StepItem>
          <Text color="#959595" fontSize="14px">
            Apply Whitelist / Join Competition
          </Text>
          <Text color="#fff" fontSize="16px">
            Register for the IDO pool whitelist or join the Gleam Community Pool Competition to win an allocation.
          </Text>
          <Flex mt="20px" justifyContent="space-between" alignItems="center">
            <StepButton active={false}>How to join</StepButton>
            <StepCircle>3</StepCircle>
          </Flex>
        </StepItem>
      </StepCont> */}
    </MyProfileWrapper>
  )
}

export default MyProfile
