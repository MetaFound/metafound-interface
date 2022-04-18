/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { testnetTokens } from 'config/constants/tokens'
import axios from 'axios'
import {API_ENDPOINT} from 'config/constants/api'
import useAxiosCallback from 'hooks/useAxiosCallback'
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
  td {
    padding: 12px 0;
    color: #fff;
  }
`

const MyInvest = ({ accessToken }) => {
  const [invest, setInvest] = useState([])
  const api = useAxiosCallback()

  useEffect(() => {
    async function getInvest() {
      const result: any = await api({
        endpoint: `api/v1/users/my-invest`
      })
      if (result.data) {
        const convertedInvest = result.data.data
        const decimals = new BigNumber(10).pow(testnetTokens.mtf.decimals)
        convertedInvest.forEach((item) => {
          item.totalInvest = `${new BigNumber(item.totalInvest).div(decimals)}`
        })
        setInvest(convertedInvest)
      }
    }

    if (accessToken) {
      getInvest()
    }
  }, [accessToken, api])

  return (
    <MyProfileWrapper>
      <Title>My Invest</Title>
      <SubTitle>Here are all Invest that you have participated in.</SubTitle>
      <TableInvest>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Total investment</th>
            {/* <th>Profit</th> */}
          </tr>
        </thead>
        <tbody>
          {invest.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.totalInvest}</td>
              {/* <td /> */}
            </tr>
          ))}
        </tbody>
      </TableInvest>
      {!invest && (
        <Text fontSize="16px" fontWeight={600} color="#FDB814" textAlign="center">
          You have not participated in any invest.
        </Text>
      )}
    </MyProfileWrapper>
  )
}

export default MyInvest
