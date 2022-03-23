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
  margin-bottom: 12px;
`

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 24px;
`
const TableInvest = styled.table`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 80px;
  th {
    font-weight: 600;
    font-size: 16px;
    color: #868686;
    text-align: left;
  }
`

const MyInvest = () => {
  const { theme } = useTheme()
  return (
    <MyProfileWrapper>
      <Title>My Invest</Title>
      <SubTitle>Here are all Invest that you have participated in.</SubTitle>
      <TableInvest>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>total investment</th>
            <th>Profit</th>
          </tr>
        </thead>
      </TableInvest>
      <Text fontSize="16px" fontWeight={600} color="#FDB814" textAlign="center">You have not participated in any invest.</Text>
    </MyProfileWrapper>
  )
}

export default MyInvest
