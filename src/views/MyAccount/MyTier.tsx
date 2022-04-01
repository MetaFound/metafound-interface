import React, { useState } from 'react'
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

const Tab = styled.div<{ active: boolean }>`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  margin-right: 16px;
  padding: 8px 9px;
  border-radius: 6px;
  cursor: pointer;
  ${({ active }) => active && 'background: #4A4A4A; color: #FDB814;'}
`
const TextSpan = styled(Text)`
  display: inline-block;
`

const BtnStake = styled(Button)`
  color: #000000;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 31px;
  background: #fdb814;
  border-radius: 5px;
  margin-top: 18px;
  padding: 0;
`

const DivTablePoint =  styled.div`
margin-top: 26px;
border: 1px solid #fdb81480;
width: 351px;
box-sizing: border-box;
border-radius: 6px;
padding: 12px 28px;
`
const TablePoint = styled.table`
  width: 100%;
  tr {
    height: 28px;
  }
`

const Diamond =  styled.div`
  width: 80px;
  text-align: center;
`
const Gold =  styled.div`
  width: 100px;
  text-align: center;
`
const Silver =  styled.div`
  width: 100px;
  text-align: center;
`

const DivBorder =  styled.div`
border: 1px solid #fdb81480;
box-sizing: border-box;
border-radius: 5px;
padding: 16px;
margin-top: 16px;
`


const MyTier = () => {
  const { theme } = useTheme()
  const [tab, setTab] = useState('Reputation Point')

  return (
    <MyProfileWrapper>
      <Title>My Tier</Title>
      <Flex mb="28px">
        <Tab active={tab === 'Reputation Point'} onClick={() => setTab('Reputation Point')}>
          Reputation Point
        </Tab>
        <Tab active={tab === 'Tier Benefits'} onClick={() => setTab('Tier Benefits')}>
          Tier Benefits
        </Tab>
      </Flex>
      {
        tab === 'Reputation Point' ?
        <>
{false ? (
        <>
          <TextSpan color="#868686">
            You currently have <TextSpan color="#FDB814">0 points</TextSpan> earned. You must stake to earn Reputation
            points.
          </TextSpan>
          <BtnStake>Stake Now</BtnStake>
        </>
      ) : (
        <>
          <Flex mb="10px">
            <Text width="100px">My Tier</Text>
            <Text color="#FDB814">Gold</Text>
          </Flex>
          <Flex>
            <Text width="100px">My Point</Text>
            <Text>3000</Text>
          </Flex>
          <TextSpan color="#868686" fontSize='13px' mt="4px">
            you need to get <TextSpan color="#fff" fontSize='13px'>2000 points</TextSpan> to be able to rank up
          </TextSpan>
          <BtnStake>Stake Now</BtnStake>
          <DivTablePoint>
          <TablePoint>
            <tr>
              <td><Text color="#868686" fontSize="14px">Tier</Text></td>
              <td><Text color="#fff" fontSize="14px" >Silver</Text></td>
              <td><Text color="#FDB814" fontSize="14px" >Gold</Text></td>
              <td><Text color="#1FAEFF" fontSize="14px" >Diamond</Text></td>
            </tr>
            <tr>
              <td><Text color="#868686" fontSize="14px">Point</Text></td>
              <td><Text color="#fff" fontSize="14px" >1000</Text></td>
              <td><Text color="#fff" fontSize="14px" >2000</Text></td>
              <td><Text color="#fff" fontSize="14px" >5000</Text></td>
            </tr>
          </TablePoint>
          </DivTablePoint>
          
        </>
      )}
        </>
        :
        <>
        <Flex justifyContent="space-between" pr="16px" pl="16px">
          <Text color="#868686">Tier Benefits</Text>
          <Flex>
            <Silver><Text color="#fff">Silver</Text></Silver>
            <Gold><Text color="#FDB814">Gold</Text></Gold>
            <Diamond><Text color="#1FAEFF">Diamond</Text></Diamond>
          </Flex>
        </Flex>
        <DivBorder>
        <Flex justifyContent="space-between">
          <Text color="#fff" fontSize="14px">transaction costs on the platform</Text>
          <Flex>
            <Silver><Text color="#fff" fontSize="14px">Fee Lost</Text></Silver>
            <Gold><Text color="#fff" fontSize="14px">Sale 50%</Text></Gold>
            <Diamond><Text color="#fff" fontSize="14px">Free</Text></Diamond>
          </Flex>
        </Flex>
        </DivBorder>
        <DivBorder>
        <Flex justifyContent="space-between">
          <Text color="#fff" fontSize="14px">Participate in voting for projects that are about to be listed</Text>
          <Flex>
          <Silver>
              <img src="/images/myAccount/untick.svg" alt="untick icon" />
            </Silver>
            <Gold>
            <img src="/images/myAccount/ticked.svg" alt="ticked icon" />
            </Gold>
            <Diamond>
            <img src="/images/myAccount/ticked.svg" alt="untick icon" />
            </Diamond>
          </Flex>
        </Flex>
        </DivBorder>
        <DivBorder>
        <Flex justifyContent="space-between">
          <Text color="#fff" fontSize="14px">support direct viewing of contributed products</Text>
          <Flex>
          <Silver>
              <img src="/images/myAccount/untick.svg" alt="untick icon" />
            </Silver>
            <Gold>
            <img src="/images/myAccount/ticked.svg" alt="ticked icon" />
            </Gold>
            <Diamond>
            <img src="/images/myAccount/ticked.svg" alt="untick icon" />
            </Diamond>
          </Flex>
        </Flex>
        </DivBorder>
        </>
      }
      
    </MyProfileWrapper>
  )
}

export default MyTier
