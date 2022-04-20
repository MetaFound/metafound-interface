import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { testnetTokens } from 'config/constants/tokens'
import axios from 'axios'
import Link from 'next/link'
import { useCurrentBlock } from 'state/block/hooks'
import { API_ENDPOINT } from 'config/constants/api'
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
  ${({ theme }) => theme.mediaQueries.custom} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
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
  ${({ theme }) => theme.mediaQueries.custom} {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
  }
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
  cursor: pointer;
`

const DivTablePoint = styled.div`
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

const Diamond = styled.div`
  width: 80px;
  text-align: center;
`
const Gold = styled.div`
  width: 100px;
  text-align: center;
`
const Silver = styled.div`
  width: 100px;
  text-align: center;
`

const DivBorder = styled.div`
  border: 1px solid #fdb81480;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  margin-top: 16px;
`

const Text1 = styled(Text)`
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.custom} {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
  }
`

const MyTier = ({ accessToken }) => {
  const [tab, setTab] = useState('Reputation Point')
  const [myPoint, setMyPoint] = useState('')
  const [tier, setTier] = useState(null)
  const [pointToRankUp, setPointToRankUp] = useState('')

  const blockNumber = useCurrentBlock()

  useEffect(() => {
    async function getTier() {
      const result = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/api/v1/users/my-tier`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const decimals = new BigNumber(10).pow(testnetTokens.mtf.decimals)
      const convertedMyPoint = new BigNumber(result.data.data.myPoint).div(decimals)
      setMyPoint(`${convertedMyPoint}`)
      const silver = new BigNumber(result.data.data.tier.silver).div(decimals)
      const gold = new BigNumber(result.data.data.tier.gold).div(decimals)
      const diamond = new BigNumber(result.data.data.tier.diamond).div(decimals)
      const convertedTier = {
        silver: `${silver}`,
        gold: `${gold}`,
        diamond: `${diamond}`,
      }
      setTier(convertedTier)
      if (convertedMyPoint < silver) {
        setPointToRankUp(`${new BigNumber(silver).minus(convertedMyPoint)}`)
      } else if (convertedMyPoint < gold) {
        setPointToRankUp(`${new BigNumber(gold).minus(convertedMyPoint)}`)
      } else if (convertedMyPoint < diamond) {
        setPointToRankUp(`${new BigNumber(diamond).minus(convertedMyPoint)}`)
      }
    }

    if (accessToken) {
      getTier()
    }
  }, [accessToken, blockNumber])

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
      {tab === 'Reputation Point' ? (
        <>
          {!myPoint ? (
            <>
              <TextSpan color="#868686">
                You currently have <TextSpan color="#FDB814">0 points</TextSpan> earned. You must stake to earn
                Reputation points.
              </TextSpan>
              <Link href="/my-account/my-profile">
                <BtnStake>Stake Now </BtnStake>
              </Link>
            </>
          ) : (
            <>
              <Flex mb="10px">
                <Text1 width="100px">My Tier</Text1>
                <Text1
                  color={
                    tier &&
                    (myPoint >= tier.diamond
                      ? '#1FAEFF'
                      : myPoint >= tier.gold
                      ? '#FDB814'
                      : myPoint >= tier.silver
                      ? '#fff'
                      : '#fff')
                  }
                >
                  {tier &&
                    (myPoint >= tier.diamond
                      ? 'Diamond'
                      : myPoint >= tier.gold
                      ? 'Gold'
                      : myPoint >= tier.silver
                      ? 'Silver'
                      : 'N/A')}
                </Text1>
              </Flex>
              <Flex>
                <Text1 width="100px">My Point</Text1>
                <Text1>{myPoint}</Text1>
              </Flex>
              {parseFloat(pointToRankUp) >= 0 && (
                <TextSpan color="#868686" fontSize="13px" mt="4px">
                  you need to get <TextSpan color="#fff" fontSize="13px">{`${pointToRankUp} points`}</TextSpan> to be
                  able to rank up
                </TextSpan>
              )}

              <Link href="/my-account/my-profile">
                <BtnStake>Stake Now </BtnStake>
              </Link>
              <DivTablePoint>
                <TablePoint>
                  <tr>
                    <td>
                      <Text color="#868686" fontSize="14px">
                        Tier
                      </Text>
                    </td>
                    <td>
                      <Text color="#fff" fontSize="14px">
                        Silver
                      </Text>
                    </td>
                    <td>
                      <Text color="#FDB814" fontSize="14px">
                        Gold
                      </Text>
                    </td>
                    <td>
                      <Text color="#1FAEFF" fontSize="14px">
                        Diamond
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Text color="#868686" fontSize="14px">
                        Point
                      </Text>
                    </td>
                    <td>
                      <Text color="#fff" fontSize="14px">
                        {tier ? tier.silver : ''}
                      </Text>
                    </td>
                    <td>
                      <Text color="#fff" fontSize="14px">
                        {tier ? tier.gold : ''}
                      </Text>
                    </td>
                    <td>
                      <Text color="#fff" fontSize="14px">
                        {tier ? tier.diamond : ''}
                      </Text>
                    </td>
                  </tr>
                </TablePoint>
              </DivTablePoint>
            </>
          )}
        </>
      ) : (
        <>
          <Flex justifyContent="space-between" pr="16px" pl="16px">
            <Text color="#868686">Tier Benefits</Text>
            <Flex>
              <Silver>
                <Text color="#fff">Silver</Text>
              </Silver>
              <Gold>
                <Text color="#FDB814">Gold</Text>
              </Gold>
              <Diamond>
                <Text color="#1FAEFF">Diamond</Text>
              </Diamond>
            </Flex>
          </Flex>
          <DivBorder>
            <Flex justifyContent="space-between">
              <Text color="#fff" fontSize="14px">
                transaction costs on the platform
              </Text>
              <Flex>
                <Silver>
                  <Text color="#fff" fontSize="14px">
                    Fee Lost
                  </Text>
                </Silver>
                <Gold>
                  <Text color="#fff" fontSize="14px">
                    Sale 50%
                  </Text>
                </Gold>
                <Diamond>
                  <Text color="#fff" fontSize="14px">
                    Free
                  </Text>
                </Diamond>
              </Flex>
            </Flex>
          </DivBorder>
          <DivBorder>
            <Flex justifyContent="space-between">
              <Text color="#fff" fontSize="14px">
                Participate in voting for projects that are about to be listed
              </Text>
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
              <Text color="#fff" fontSize="14px">
                support direct viewing of contributed products
              </Text>
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
      )}
    </MyProfileWrapper>
  )
}

export default MyTier
