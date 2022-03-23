import React from 'react'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'

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

const MyProfile = () => {
  const { theme } = useTheme()
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
                4he3f34t********8f7cf93B
              </Text>
            </TextWallet>
            <IconMetamask src="/images/myAccount/metamark1.svg" />
          </Flex>
          <Text color="#FDB814" fontSize="16px">
            Change
          </Text>
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
            <StepButton active>Stake now</StepButton>
            <StepCircle>1</StepCircle>
          </Flex>
        </StepItem>
      </StepCont>
      <StepCont>
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
      </StepCont>
    </MyProfileWrapper>
  )
}

export default MyProfile
