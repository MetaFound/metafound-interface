import React from 'react'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text, Button } from '../../@uikit'

const MyProfileWrapper = styled.div``

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 16px;
`

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #959595  ;
  margin-bottom: 20px;
`

const BtnKYC = styled(Button)`
  color: #000000;
  font-weight: 500;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 35px;
  background: #fdb814;
  border-radius: 5px;
  margin-top: 18px;
  padding: 0;
  margin-top: 16px;
`

const KYC = () => {
  const { theme } = useTheme()
  return (
    <MyProfileWrapper>
      <Title>KYC</Title>
      <SubTitle>KYC Verify</SubTitle>
      <Flex mt="20px">
        <Text color="#fff" mr="60px">KYC Status</Text>
        <Text color="#FDB814">Unverified</Text>
      </Flex>
      <Text color="#fff" mt="16px">You must stake to achieve MetaFound Tier before KYC.</Text>
      <Flex justifyContent="center">
      <BtnKYC>KYC Verify Now</BtnKYC>
      </Flex>
    </MyProfileWrapper>
  )
}

export default KYC
