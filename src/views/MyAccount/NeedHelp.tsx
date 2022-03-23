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
  margin-bottom: 20px;
`

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
  line-height: 30px;
  color: #868686;
  margin-bottom: 4px;
`

const TextSpan = styled(Text)`
  display: inline-block;
`
const ULGuide = styled.div`
  li {
    list-style-type: none;
    dispaly: flex;
    align-items: center;
    color: #fff;
    margin-top: 25px;
  }
`


const NeedHelp = () => {
  const { theme } = useTheme()
  return (
    <MyProfileWrapper>
      <Title>Need Some Help? </Title>
      <SubTitle>Support Email</SubTitle>
      <TextSpan color="#fff">
        If you have any questions, please contact us at any moment via{' '}
        <TextSpan color="#FDB814">supportmetafound@gmail.com</TextSpan>{' '}
      </TextSpan>
      <Text color="#868686" mt="16px" mb="4px">Guide</Text>
      <ULGuide>
        <li>• How to connect wallet</li>
        <li>• How to join Community Pool</li>
        <li>• How to swap tokens?</li>
        <li>• How to claim tokens?</li>
      </ULGuide>
    </MyProfileWrapper>
  )
}

export default NeedHelp
