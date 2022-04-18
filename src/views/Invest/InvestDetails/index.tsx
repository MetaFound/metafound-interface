import styled from 'styled-components'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import io from 'socket.io-client'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Token, TokenAmount } from '@pancakeswap/sdk'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { getMetafoundAddress } from 'utils/addressHelpers'
import { useMetafoundContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrentBlock } from 'state/block/hooks'
import {API_ENDPOINT} from 'config/constants/api'
import useTheme from '../../../hooks/useTheme'
import { Box, Flex, Input, Text } from '../../../@uikit'
import TimelineDetail from './timelineDetail'
import unserializedTokens, { serializeTokens, testnetTokens } from '../../../config/constants/tokens'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const Page = styled(Box)``

const WS_URL = API_ENDPOINT
const CarouselSection = styled.div`
  height: 100%;
`

const CarouselBlock = styled.div`
  outline: none;
  padding: 0 54px;
`

const CarouselImg = styled.img`
  border-radius: 20px;
  width: 100%;
  object-fit: cover;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 54px;
    height: 500px;
  }
`

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const Section = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const LocationBlock = styled(Section)`
  justify-content: flex-start;
  align-items: unset;
  text-align: left;
  gap: 18px;
  flex-direction: row;
  line-height: 1.5;
  margin-top: 36px;
  color: ${({ theme }) => `${theme.colors.text}`};

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 66px;
  }
`

const LocationImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 120px;
    height: 120px;
  }
`

const LocationInfo = styled.div`
  flex: 1;
`

const LocationInfoCity = styled.div`
  margin-bottom: 6px;
  font-size: 18px;
  font-weight: 700;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 22px;
  }
`

const LocationInfoText = styled.div`
  color: #868686;
  font-size: 14px;
  font-weight: 400;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
  }
`

const LocationInfoAddress = styled.div`
  font-weight: 500;
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 18px;
  }
`

const TimelineProgressSection = styled(Flex)`
  margin-top: 36px;
  gap: 41px;
  flex-wrap: wrap;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin-top: 86px;
  // }
`
const ProgressPercentBlock = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  flex: 0 0 100%;
  order: 1;
  @media screen and (min-width: 1477px) {
    order: unset;
  }
`

const TimelineBlock = styled(Flex)`
  flex: 4;
  background: #333333;
  border: 0.5px solid #fdb814;
  border-radius: 10px;
  padding: 30px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 65px;
  }
`
const TimelineBlockTitle = styled(Flex)`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 26px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  line-height: 30px;
  }
`

const TimelineItem = styled(Flex)`
  gap: 15px;

  .last {
    &:after {
      content: '';
      width: 0;
      height: 0;
    }
  }
`

const TimelineStep = styled.div`
  position: relative;
  //overflow: hidden;

  &:after {
    content: '';
    top: 24px;
    left: 11px;
    position: absolute;
    width: 2px;
    height: 100%;
    background: #4a4a4a;
  }
`

const TimelineIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.primary}`};
`

const TimelineContent = styled.div`
  padding-bottom: 20px;
  line-height: 30px;
`

const TimelineContentTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
`

const ProgressBlock = styled(Flex)`
  flex: 7;
  background: #333333;
  border: 0.5px solid #fdb814;
  border-radius: 10px;
  flex-direction: column;
  padding: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 60px 100px;
  }

  @media screen and (max-width: 1620px)
  {
      padding: 30px;
  }

  order: 2;
  @media screen and (min-width: 1477px) {
    order: unset;
  }
`

const ProgressBlockTitle = styled(Flex)`
  justify-content: center;
  font-weight: 600;
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
`

const ProgressBlockStep = styled(Flex)`
  margin-top: 35px;
  justify-content: space-between;
`

const ProgressBlockStepItem = styled(Flex)`
  flex-direction: column;
  align-items: center;
  flex: 0 0 25%;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: unset;
  }
`

const ProgressBlockStepItemNumber = styled(Flex)<{ active: boolean }>`
  font-weight: 600;
  height: 25px;
  width: 25px;
  font-size: 16px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background: ${({ active }) => `${active ? '#fdb814' : '#4a4a4a'}`};
  color: ${({ active }) => `${active ? '#000' : '#868686'}`};

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 35px;
    width: 35px;
    font-size: 20px;
  }
`

const ProgressBlockStepItemText = styled(Flex)<{ active: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  gap: 5px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 0 15px;
  text-align: center;
  background: ${({ active }) => `${active ? '#fdb814' : 'unset'}`};
  color: ${({ active }) => `${active ? '#000' : 'unset'}`};

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
    padding: 0 15px;
    gap: unset;
    margin-top: 14px;
    line-height: 25px;
  }
`

const ProgressBlockStepInfo = styled.div`
  border: 1px solid #fdb814;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-top: 26px;
  min-height: 215px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 28px 35px;
    margin-top: 46px;
  }
`

const TextStyle2 = styled.div`
  font-size: 14px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
  }
`

const ProgressBlockStepInfoText1 = styled(TextStyle2)`
  color: #868686;
  font-weight: 500;
  cursor: pointer;
`

const ProgressBlockText1Step3 = styled(ProgressBlockStepInfoText1)`
  line-height: 30px;
`

const ProgressBlockText2Step3 = styled.span`
  line-height: 30px;
  font-weight: 500;
  font-size: 16px;
  color: white;
`
const ProgressBlockText2PrimaryStep3 = styled(ProgressBlockText2Step3)`
  color: #fdb814;
`

const ProgressBlockStepInfoText2 = styled(TextStyle2)`
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 15px;
`

const ProgressBlockStepInfoTier = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 15px;
  // align-items: center:
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: unset;
    align-items: center;
  }
`

const ProgressBlockStepInfoTier1 = styled(Flex)`
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #fdb814;
  min-width: 125px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 40px;
    margin-right: 120px;
    min-width: 150px;
    padding: 0 15px;
  }

`

const ProgressBlockStepInfoTier1Text1 = styled(TextStyle2)`
  font-weight: 400;
`

const ProgressBlockStepInfoTier1Text2 = styled(TextStyle2)`
  font-weight: 600;
  padding-left: 5px;
`

const ProgressBlockStepInfoTier2 = styled(Flex)`
  background: #fdb814;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  align-items: center;
  padding: 0 15px;
  height: 30px;
  outline: none;
  cursor: pointer;
`

const ProgressBlockStepInfoText3Block = styled(Flex)`
  justify-content: space-between;
  gap: 10px;
`
const ProgressBlockStep3ImgArrow = styled.img`
  margin-left: 10px;
`

const ProgressBlockStepInfoText3 = styled(TextStyle2)`
  color: #868686;
  font-weight: 400;
  line-height: 30px;
  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin-top: 7px;
  // }
`

const ProgressBlockStepInfoText3Question = styled(Flex)`
  width: 25px;
  height: 25px;
  color: #000;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  background: #fdb814;
  border-radius: 50%;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 27px;
    width: 27px;
  }
`

const ProjectInfoSection = styled(Section)`
  margin-top: 73px;
  align-items: flex-start;
  width: 100%;
`

const ProjectInfoSectionTitle = styled.div`
  font-weight: 600;
  font-size: 20px;

  padding-bottom: 20px;
  position: relative;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    background: #fdb814;
  }
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 25px;
    line-height: 30px;
  }
`

const ProjectInfoSectionContent = styled(Flex)`
  gap: 48px;
  width: 100%;
  margin: 44px 0;
  flex-wrap: wrap;
  padding-bottom: 30px;
`

const ProjectInfoContentDetailGeneral = styled(Flex)`
  flex-direction: column;
  gap: 40px;
  width: 100%;
  flex: 0 0 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 3;
  }
`

const ProjectInfoContentDetailGeneralContent = styled(Flex)`
  background: #333333;
  border: 1px solid #fdb814;
  border-radius: 10px;
  flex-direction: column;
  text-align: left;
  padding: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 56px;
  }
`

const ProjectInfoContentDetailGeneralContentTitle = styled.div`
  text-align: start;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 15px;
  position: relative;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background: #fdb814;
  }

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
`

const ProjectInfoContentDetailContent = styled(Flex)`
  line-height: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
`

const ProjectInfoContentDetailContentItem = styled.div`
  flex: 0 0 100%;

  ${({ theme }) => theme.mediaQueries.xxl} {
    flex: 0 0 50%;
  }
`

const ProjectInfoContentDetailContentText1 = styled(TextStyle2)`
  color: #959595;
  width: 160px;
  font-weight: 500;
  display: inline-block;
`

const ProjectInfoContentDetailContentText2 = styled(TextStyle2)`
  font-weight: 600;
  display: inline-block;
`

const ProjectInfoContentGeneralContent = styled.div`
  font-size: 14px;
  line-height: 30px;
  font-weight: 400;
  margin: 20px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const ProjectInfoContentTransactions = styled.div`
  flex: 1;
  background: #333333;
  border: 1px solid #fdb814;
  border-radius: 10px;
  padding: 30px;
  text-align: start;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 34px;
  }
`

const ProjectInfoContentTransactionsTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 12px;
  position: relative;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fdb814;
  }

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 22px;
  }
`

const ProjectInfoContentTransactionsItem = styled(Flex)`
  margin-top: 22px;
  padding-bottom: 15px;
  line-height: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #959595;
  }
`

const ProjectInfoContentTransactionsItemText1 = styled(TextStyle2)`
  font-weight: 500;
  flex: 0 0 100%;
`
const ProjectInfoContentTransactionsItemText2 = styled(TextStyle2)`
  font-weight: 600;
  flex: 0 0 50%;
  text-align: right;
`
const ProjectInfoContentTransactionsItemText3 = styled.div`
  color: #868686;
  font-size: 14px;
  flex: 0 0 50%;
`
const ProjectInfoContentTransactionsItemText4 = styled(TextStyle2)`
  font-weight: 600;
  color: #fdb814;
  flex: 0 0 50%;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ProjectInfoContentTransactionsItemPaging = styled(Flex)`
  margin-top: 32px;
  text-align: center;
  font-size: 18px;
  justify-content: center;
  align-items: center;
`

const ProjectInfoContentTransactionsItemPagingButton = styled.button`
  background: transparent;
  outline: none;
  border-color: transparent;
  font-size: 18px;
  color: white;
`

const ProjectInfoContentTransactionsItemPagingText1 = styled.span`
  color: #868686;
`

const NoData = styled(Flex)`
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => `${theme.colors.primary}`};
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 18px;
  }
`
const ProgressPercent = styled(Flex)`
  justify-content: flex-end;
  text-align: center;
  flex: 0 0 100%;
  flex-wrap: wrap;
  @media screen and (min-width: 1477px) {
    flex: 0 0 60%;
    order: unset;
  }
`
const TotalContributedCapital = styled.div`
  flex: 0 0 100%;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 20px;
`

const TotalBlock = styled.div`
  text-align: right;
  flex: 0 0 100%;
`
const TotalLayout = styled.div`
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 1477px) {
    width: 80%;
  }
`

const TotalText1 = styled(Text)`
  font-size: 14px;
  display: inline-block;
  color: #959595;
  font-weight: 400;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const TotalText2 = styled(Text)`
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => `${theme.colors.text}`};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const PercentBlock = styled.div`
  background: #4a4a4a;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  position: relative;
  margin: 0 auto 8px;
  @media screen and (min-width: 1477px) {
    width: 80%;
  }
`

const ActivePercent = styled.div<{ width: number }>`
  background: #101010;
  height: 20px;
  width: ${({ width }) => `${width}%`};
  min-width: 55px;
  max-width: 100%;
  border-radius: 10px;
  position: absolute;
  background: ${({ theme }) => `${theme.colors.primary}`};
`

const NumberPercent = styled.div`
  line-height: 20px;
  border-radius: 10px;
  position: absolute;
  right: 8px;
  font-weight: 600;
  font-size: 13px;
`

const BlockSearchWithButton = styled(Flex)`
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`

const ButtonInvestSearch = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#8d702a' : '#fdb814')};
  border-radius: 8px;
  outline: none;
  border-color: transparent;
  color: black;
  padding: 0 15px;
  height: 32px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`

const GoAccountBtnStep3 = styled(ButtonInvestSearch)`
  font-weight: 500;
  font-size: 15px;
`

const ButtonInvestSearchStep4 = styled(ButtonInvestSearch)`
  font-weight: 500;
  font-size: 14px;
  padding: 0 8px;
`

const BlockWithdrawnStep4 = styled(Flex)`
  justify-content: flex-start;
  flex-wrap: wrap;
`

const TextWithdrawnStep4 = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 30px;
`

const TextBlackWithdrawnStep4 = styled(TextWithdrawnStep4)`
  color: #868686;
  padding-right: 10px;
`

const CurrencyIcon = styled.img`
  width: 25px;
  position: absolute;
  top: 7px;
  left: 7px;
`

const BlockSearchInvest = styled.div`
  height: 40px;
  max-width: 100%;
  position: relative;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 270px;
  }
`

const SearchInput = styled(Input)`
  width: 100%;
  height: 100%;
  padding: 0 59px 0 40px;
  font-size: 14px;
  background: #4a4a4a;
  border-radius: 8px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #868686;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
`

const SearchIcon = styled.button`
  position: absolute;
  background: #fdb814;
  border-radius: 8px;
  outline: none;
  border-color: transparent;
  color: black;
  padding: 0 8px;
  height: 25px;
  right: 8px;
  top: 8px;
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`

const APY = styled.div`
  background: #fdb814;
  color: #000;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  display: none;
  @media screen and (min-width: 1480px) {
    display: flex;
  }
`

const WarningMessageWithdraw = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #868686;
  margin-top: 16px;
`

const socket = io(WS_URL, { transports: ['websocket'] })
socket.on('connect', () => {
  console.log('Connected')
})

const InvestDetail = () => {
  const blockNumber = useCurrentBlock()
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { investId } = router.query

  const [detailItem, setDetailItem] = useState(null)
  const [investData, setInvestData] = useState(null)
  const [ownerAccount, setOwner] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const [ctbToken, setCtbToken] = useState(null)

  const [progressStep, setProgressStep] = useState(1)
  const [timelineStep, setTimelineStep] = useState(1)
  const [transactionPageNumber, setTransactionPageNumber] = useState(1)
  const [transactionTotalPage, setTransactionTotalPage] = useState(0)
  const [listTransaction, setListTransaction] = useState([])
  const [withdrawFeeAndDiscount, setWithdrawFeeAndDiscount] = useState(null)

  const getOwner = async () => {
    const getOwnerRes = await axios({
      method: 'get',
      url: `${API_ENDPOINT}/api/v1/invest-pools/get-owner`,
    })
    const owner = getOwnerRes.data.data
    return owner
  }

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

  const getData = useCallback(() => {
    axios
      .get(`${API_ENDPOINT}/api/v1/invest-pools/${investId}`)
      .then(function (response) {
        setDetailItem(response?.data?.data ?? {})
      })
      .catch(function (error) {
        throw error
      })
  }, [investId])

  const getInvest = useCallback(async () => {
    const result = await axios.get(`${API_ENDPOINT}/api/v1/invest-pools?page=1&limit=9999`)
    if (result.data?.data?.investPools) {
      const _investData = result.data.data.investPools.find((pool) => pool.id.toString() === investId)
      setInvestData(_investData)
      setCtbToken(_investData.token)
    }
  }, [investId, blockNumber])

  useEffect(() => {
    if (investId) {
      getData()
      getInvest()
    }
  }, [investId, getData, getInvest])

  useEffect(() => {
    if (detailItem?.stage) {
      switch (true) {
        case moment(+detailItem?.stage?.endCtb).isBefore(moment().unix() * 1000) &&
          moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.closeTime):
          setTimelineStep(2)
          break
        case moment(+detailItem?.stage?.startTime).isBefore(moment().unix() * 1000) &&
          moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.endCtb):
          setTimelineStep(1)
          break
        case moment(+detailItem?.stage?.closeTime).isBefore(moment().unix() * 1000):
          setTimelineStep(3)
          break
        default:
          setTimelineStep(1)
      }
    }
  }, [detailItem])

  const [myTier, setMyTier] = useState('')

  useEffect(() => {
    async function getTier() {
      const result = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/api/v1/users/my-tier`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(result)
      const decimals = new BigNumber(10).pow(testnetTokens.mtf.decimals)
      const convertedMyPoint = new BigNumber(result.data.data.myPoint).div(decimals)
      const silver = new BigNumber(result.data.data.tier.silver).div(decimals)
      const gold = new BigNumber(result.data.data.tier.gold).div(decimals)
      const diamond = new BigNumber(result.data.data.tier.diamond).div(decimals)
      setMyTier(
        convertedMyPoint.gte(diamond)
          ? 'Diamond'
          : convertedMyPoint.gte(gold)
          ? 'Gold'
          : convertedMyPoint.gte(silver)
          ? 'Silver'
          : 'N/A',
      )
    }

    if (accessToken) {
      getTier()
    }
  }, [accessToken])

  const getTransactions = useCallback(async () => {
    if (!account || !investId) {
      return
    }
    const result = await axios({
      method: 'post',
      url: `${API_ENDPOINT}/api/v1/login`,
      data: {
        walletAddress: account,
      },
    })
    if (result.data.data.accessToken) {
      console.log('ok', transactionPageNumber)
      axios
        .get(`${API_ENDPOINT}/api/v1/my-invest/${investId}/history`, {
          params: {
            limit: 10,
            page: transactionPageNumber,
          },
          headers: {
            Authorization: `Bearer ${result.data.data.accessToken}`,
          },
        })
        .then((response) => {
          setListTransaction(response?.data?.data?.transactions ?? [])
          console.log('data transaction: ', response?.data?.data?.transactions)
          setTransactionTotalPage(
            response?.data?.data?.totalCount ? Math.ceil(response?.data?.data?.totalCount / 10) : 0,
          )
        })
        .catch((error) => {
          console.error('error:', error.response)
        })
    }
  }, [account, investId, transactionPageNumber])

  useEffect(() => {
    let owner = ''

    function handleTransaction(data) {
      if (data) {
        getTransactions()
        getData()
        getInvest()
        // console.log('data', data)
      }
    }

    async function initData() {
      owner = await getOwner()
      setOwner(owner)
      socket.on(`Client-${owner.toLowerCase()}`, handleTransaction)
    }

    initData()

    return () => {
      if (socket) {
        socket.off(`Client-${owner.toLowerCase()}`)
      }
    }
  }, [router, account, investId, getTransactions, getData, getInvest])

  useEffect(() => {
    if (investId) {
      getTransactions()
    }
  }, [investId, getTransactions])

  const snakeToPascal = (string) => {
    return string
      .split('/')
      .map((snake) =>
        snake
          .split('_')
          .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
          .join(' '),
      )
      .join('/')
  }

  const prevPageTransaction = () => {
    if (transactionPageNumber > 1) {
      setTransactionPageNumber(+transactionPageNumber - 1)
    }
  }

  const nextPageTransaction = () => {
    if (transactionPageNumber < transactionTotalPage) {
      setTransactionPageNumber(+transactionPageNumber + 1)
    }
  }

  const renderTransactionsPaging = () => {
    if (listTransaction.length > 0) {
      return (
        <ProjectInfoContentTransactionsItemPaging>
          <ProjectInfoContentTransactionsItemPagingButton onClick={() => prevPageTransaction()}>
            &lt;
          </ProjectInfoContentTransactionsItemPagingButton>
          {transactionPageNumber}
          <ProjectInfoContentTransactionsItemPagingText1>
            /{transactionTotalPage}
          </ProjectInfoContentTransactionsItemPagingText1>
          <ProjectInfoContentTransactionsItemPagingButton onClick={() => nextPageTransaction()}>
            &gt;
          </ProjectInfoContentTransactionsItemPagingButton>
        </ProjectInfoContentTransactionsItemPaging>
      )
    }
    return <></>
  }

  const handleInvestingProgress = (step) => {
    setProgressStep(step)
  }

  const [depositTypedValue, setDepositTypedValue] = useState('')
  const [withdrawTypedValue, setWithdrawTypedValue] = useState('')

  const getTokenFromAddress = (address: string | undefined): Token | undefined => {
    if (address === undefined) return undefined
    const tokenKeyAddress = Object.values(unserializedTokens).reduce(
      (acc, token) => ({ ...acc, [token.address]: token }),
      {},
    )
    return tokenKeyAddress[address]
  }

  const contributeToken = getTokenFromAddress(ctbToken)

  const _10 = new BigNumber(10)

  const [approvalAttempt, setApprovalAttempt] = useState(false)
  const [approval, approveCallback] = useApproveCallback(
    contributeToken
      ? new TokenAmount(
          contributeToken,
          depositTypedValue
            ? new BigNumber(depositTypedValue).times(_10.pow(contributeToken.decimals)).toString()
            : '0',
        )
      : undefined,
    getMetafoundAddress(),
  )

  const contract = useMetafoundContract()

  const addTransaction = useTransactionAdder()

  const onDeposit = async () => {
    if (!depositTypedValue) return
    const value = new BigNumber(depositTypedValue).times(_10.pow(contributeToken.decimals)).toString()
    if (approval === ApprovalState.APPROVED) {
      const response = await contract.deposit(detailItem.pid, value)
      addTransaction(response)
    } else if (approval !== ApprovalState.PENDING) {
      setApprovalAttempt(true)
      try {
        await approveCallback()
      } finally {
        setApprovalAttempt(false)
      }
    } else {
      console.log(`PENDING...`)
    }
  }

  const onWithdraw = async () => {
    if (!withdrawTypedValue) return
    const value = new BigNumber(withdrawTypedValue).times(_10.pow(contributeToken.decimals)).toString()
    const response = await contract.withdraw(detailItem.pid, value)
    addTransaction(response)
  }

  const [myInvest, setMyInvest] = useState('0')

  useEffect(() => {
    const getInvestData = async () => {
      try {
        const myInvestData = await axios({
          method: 'get',
          url: `${API_ENDPOINT}/api/v1/my-invest/${investId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const myInvestBn = new BigNumber(myInvestData.data.data.myInvest).div(
          new BigNumber(10).pow(contributeToken.decimals),
        )
        setWithdrawFeeAndDiscount({
          withdrawFee: myInvestData.data.data.withdrawFee,
          discountWithdrawFee: myInvestData.data.data.discountWithdrawFee
        })
        setMyInvest(myInvestBn.toString())
      } catch (err) {
        console.log(`err`, err)
      }
    }
    if (investId && accessToken) {
      getInvestData()
    }
  }, [accessToken, contributeToken, investId, blockNumber])

  const [claimableProfit, setClaimableProfit] = useState('0')

  useEffect(() => {
    const getClaimableProfit = async () => {
      try {
        const result = await contract.getPendingProfit(detailItem.pid, account)
        setClaimableProfit(result.toString())
      } catch (err) {
        console.log(`err`, err)
      }
    }
    if (detailItem && contract && account) {
      getClaimableProfit()
    }
  }, [contract, detailItem, account])

  const renderInvestingProgress = () => {
    let investProgress = <></>
    switch (progressStep) {
      case 1:
        investProgress = (
          <ProgressBlockStepInfo>
            <ProgressBlockStepInfoText1>Stake to achieve MetaFound Tier</ProgressBlockStepInfoText1>
            <ProgressBlockStepInfoText2>Stake MTF to achieve tier (Silver, Gold, Diamond)</ProgressBlockStepInfoText2>
            <ProgressBlockStepInfoTier>
              <ProgressBlockStepInfoTier1>
                <ProgressBlockStepInfoTier1Text1>My Tier</ProgressBlockStepInfoTier1Text1>
                <ProgressBlockStepInfoTier1Text2
                  style={{ color: myTier === 'Diamond' ? '#1FAEFF' : myTier === 'Gold' ? '#fdb814' : '#fff' }}
                >
                  {myTier}
                </ProgressBlockStepInfoTier1Text2>
              </ProgressBlockStepInfoTier1>
              <ProgressBlockStepInfoTier2 onClick={() => router.push('/my-account')}>
                Stake now
              </ProgressBlockStepInfoTier2>
            </ProgressBlockStepInfoTier>
            <ProgressBlockStepInfoText3Block>
              <ProgressBlockStepInfoText3>You need to stake for investing.</ProgressBlockStepInfoText3>
              <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question>
            </ProgressBlockStepInfoText3Block>
          </ProgressBlockStepInfo>
        )
        break
      case 2:
        investProgress = (
          <ProgressBlockStepInfo>
            <ProgressBlockStepInfoText1>Invest</ProgressBlockStepInfoText1>
            <ProgressBlockStepInfoText2>Enter the amount of tokens you want to invest</ProgressBlockStepInfoText2>
            <ProgressBlockStepInfoText3>
              Balance: {balance ? balance.toSignificant(6) : '--'} {findInfoToken()}
            </ProgressBlockStepInfoText3>
            <BlockSearchWithButton>
              <BlockSearchInvest>
                <SearchInput
                  type="number"
                  placeholder="0.00"
                  value={depositTypedValue}
                  onChange={(e) => setDepositTypedValue(e.currentTarget.value)}
                />
                <SearchIcon onClick={() => setDepositTypedValue(balance ? balance.toExact() : '')}>Max</SearchIcon>
                <CurrencyIcon src="/images/metafound/USDT.svg" />
              </BlockSearchInvest>
              <ButtonInvestSearch disabled={approval === ApprovalState.PENDING || approvalAttempt} onClick={onDeposit}>
                {approval === ApprovalState.APPROVED
                  ? 'Invest'
                  : approval === ApprovalState.PENDING || approvalAttempt
                  ? 'Approving...'
                  : 'Approve'}
              </ButtonInvestSearch>
            </BlockSearchWithButton>
            {/* <ProgressBlockStepInfoText3Block> */}
            {/*   <ProgressBlockStepInfoText3>1 USDT = 0.0001 VND</ProgressBlockStepInfoText3> */}
            {/*   <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question> */}
            {/* </ProgressBlockStepInfoText3Block> */}
          </ProgressBlockStepInfo>
        )
        break
      case 3:
        investProgress = (
          <ProgressBlockStepInfo>
            <ProgressBlockText1Step3>Total tokens you have contributed</ProgressBlockText1Step3>
            <BlockWithdrawnStep4 style={{ paddingBottom: '15px' }}>
              <ProgressBlockText2PrimaryStep3 style={{ paddingRight: '5px' }}>
                My Invest{' '}
              </ProgressBlockText2PrimaryStep3>
              <ProgressBlockText2Step3>
                : {myInvest} {findInfoToken()}
              </ProgressBlockText2Step3>
            </BlockWithdrawnStep4>
            <ProgressBlockText1Step3>Transactions history</ProgressBlockText1Step3>

            <ProgressBlockStepInfoText3Block>
              <GoAccountBtnStep3>
                Go to my account <ProgressBlockStep3ImgArrow src="/images/metafound/arrow1.svg" />
              </GoAccountBtnStep3>
              <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question>
            </ProgressBlockStepInfoText3Block>
          </ProgressBlockStepInfo>
        )
        break
      default:
        investProgress = (
          <ProgressBlockStepInfo>
            <ProgressBlockStepInfoText2>Enter the amount of tokens you want to withdraw</ProgressBlockStepInfoText2>
            <BlockWithdrawnStep4>
              <TextBlackWithdrawnStep4>Claimable profit</TextBlackWithdrawnStep4>
              <TextWithdrawnStep4>
                {' '}
                : {claimableProfit} {findInfoToken()}
              </TextWithdrawnStep4>
              {/* <TextWithdrawnStep4 style={{ padding: '0 10px' }}> | </TextWithdrawnStep4> */}
              {/* <TextBlackWithdrawnStep4>Profit withdrawn</TextBlackWithdrawnStep4> */}
              {/* <TextWithdrawnStep4> : 0.000 {findInfoToken()}</TextWithdrawnStep4> */}
            </BlockWithdrawnStep4>
            <BlockSearchWithButton>
              <BlockSearchInvest>
                <SearchInput
                  type="number"
                  placeholder="0.00"
                  value={withdrawTypedValue}
                  onChange={(e) => setWithdrawTypedValue(e.currentTarget.value)}
                />
                <SearchIcon onClick={() => setWithdrawTypedValue(myInvest || '')}>Max</SearchIcon>
                <CurrencyIcon src="/images/metafound/USDT.svg" />
              </BlockSearchInvest>
              <ButtonInvestSearchStep4 onClick={onWithdraw}>Withdraw</ButtonInvestSearchStep4>
            </BlockSearchWithButton>
            {/* <ProgressBlockStepInfoText3Block> */}
            {/*   <ProgressBlockStepInfoText3>1USDT = 0.0001 VND</ProgressBlockStepInfoText3> */}
            {/*   <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question> */}
            {/* </ProgressBlockStepInfoText3Block> */}
            {
              timelineStep === 2 &&
              <WarningMessageWithdraw>*You will be charged a fee: 15% if you withdraw now</WarningMessageWithdraw>
            }
            {
              timelineStep === 3 && withdrawFeeAndDiscount &&
              <WarningMessageWithdraw>{`*You will be charged a fee: ${
                withdrawFeeAndDiscount.withdrawFee * 
                (1 - (myTier === 'Diamond' ? withdrawFeeAndDiscount.discountWithdrawFee.diamond
                :myTier === 'Gold' ? withdrawFeeAndDiscount.discountWithdrawFee.gold
                :withdrawFeeAndDiscount.discountWithdrawFee.silver)) * 100
              }%`}</WarningMessageWithdraw>
            }
          </ProgressBlockStepInfo>
        )
    }
    return investProgress
  }

  const findInfoToken = (takeSymbol = true) => {
    if (ctbToken) {
      let token = null
      switch (true) {
        case Object.entries(unserializedTokens).some(([, value]) => value.address === ctbToken):
          token = Object.entries(unserializedTokens).find(([, value]) => value.address === ctbToken)[1]
          break
        case Object.entries(testnetTokens).some(([, value]) => value.address === ctbToken):
          token = Object.entries(testnetTokens).find(([, value]) => value.address === ctbToken)[1]
          break
        default:
          token = null
      }
      return takeSymbol ? token.symbol : token.decimals
    }
    return null
  }

  const balance = useCurrencyBalance(account, getTokenFromAddress(ctbToken))

  const calculateCtb = (number, decimal) => {
    if (number === '0') {
      return number
    }
    return new BigNumber(number).dividedBy(new BigNumber(10).pow(decimal)).toString()
  }

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '340px',
    slidesToShow: 1,
    speed: 600,
    adaptiveHeight: true,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 1,
          centerPadding: '200px',
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          centerPadding: '160px',
        },
      },
      {
        breakpoint: 1338,
        settings: {
          slidesToShow: 1,
          centerPadding: '120px',
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          centerPadding: '100px',
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          centerPadding: '80px',
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  }

  const contributedPercent = new BigNumber(investData?.totalCtb ?? '0')
    .times(100)
    .div(investData?.totalCtbMax ?? '1')
    .toFixed(2)

  // @ts-ignore
  return (
    <Page>
      <CarouselSection>
        <Slider {...settings}>
          {detailItem?.imgUrl &&
            Object.values(detailItem.imgUrl).map((img, index) => (
              <CarouselBlock key={index.toString()}>
                <CarouselImg src={img as any} />
              </CarouselBlock>
            ))}
        </Slider>
      </CarouselSection>
      <PageWrapper>
        <LocationBlock>
          <LocationImg src={detailItem?.thumbnail} />
          <LocationInfo>
            <LocationInfoCity>{detailItem?.name}</LocationInfoCity>
            <LocationInfoText>Location: </LocationInfoText>
            <LocationInfoAddress>{detailItem?.location}</LocationInfoAddress>
          </LocationInfo>
        </LocationBlock>
        <TimelineProgressSection>
          <ProgressPercentBlock>
            {
              detailItem?.detail?.expected_profit ?
              <APY>{`APY: ${detailItem.detail.expected_profit}`}</APY>
              :<div />
            }
            <ProgressPercent>
              <TotalContributedCapital>Total Contributed Capital</TotalContributedCapital>
              <PercentBlock>
                <ActivePercent width={+contributedPercent}>
                  <NumberPercent>{contributedPercent}%</NumberPercent>
                </ActivePercent>
              </PercentBlock>

              <TotalBlock>
                <TotalLayout>
                  <TotalText1>Total:</TotalText1>
                  <TotalText2 marginLeft="6px">{calculateCtb(investData?.totalCtb, findInfoToken(false))} </TotalText2>
                  <TotalText1>
                    /{calculateCtb(investData?.totalCtbMax, findInfoToken(false))} {findInfoToken()}{' '}
                  </TotalText1>
                </TotalLayout>
              </TotalBlock>
            </ProgressPercent>
          </ProgressPercentBlock>
          <TimelineBlock>
            <TimelineBlockTitle>Timeline</TimelineBlockTitle>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon />
              </TimelineStep>
              <TimelineDetail
                visible={timelineStep === 1}
                step={timelineStep}
                detailItem={detailItem}
                title="Capital mobilization time"
              />
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon />
              </TimelineStep>
              <TimelineDetail
                visible={timelineStep === 2}
                step={timelineStep}
                detailItem={detailItem}
                title="Investment Time"
              />
            </TimelineItem>
            <TimelineItem>
              <TimelineStep className="last">
                <TimelineIcon />
              </TimelineStep>
              <TimelineDetail
                visible={timelineStep === 3}
                step={timelineStep}
                detailItem={detailItem}
                title="Withdraw Profit"
              />
            </TimelineItem>
            {/* <TimelineItem> */}
            {/*   <TimelineStep className="last"> */}
            {/*     <TimelineIcon /> */}
            {/*   </TimelineStep> */}
            {/*   <TimelineContent> */}
            {/*     <TimelineContentTitle>End</TimelineContentTitle> */}
            {/*   </TimelineContent> */}
            {/* </TimelineItem> */}
          </TimelineBlock>
          <ProgressBlock>
            <ProgressBlockTitle>Investment Progress</ProgressBlockTitle>
            <ProgressBlockStep>
              <ProgressBlockStepItem onClick={() => handleInvestingProgress(1)}>
                <ProgressBlockStepItemNumber active={progressStep === 1}>1</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 1}>Stake MTF</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem onClick={() => handleInvestingProgress(2)}>
                <ProgressBlockStepItemNumber active={progressStep === 2}>2</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 2}>Invest</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem onClick={() => handleInvestingProgress(3)}>
                <ProgressBlockStepItemNumber active={progressStep === 3}>3</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 3}>Investing</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem onClick={() => handleInvestingProgress(4)}>
                <ProgressBlockStepItemNumber active={progressStep === 4}>4</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 4}>Withdraw Profit</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
            </ProgressBlockStep>
            {renderInvestingProgress()}
          </ProgressBlock>
        </TimelineProgressSection>
        <ProjectInfoSection>
          <ProjectInfoSectionTitle>Project Info</ProjectInfoSectionTitle>
          <ProjectInfoSectionContent>
            <ProjectInfoContentDetailGeneral>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>Detail</ProjectInfoContentDetailGeneralContentTitle>
                <ProjectInfoContentDetailContent>
                  {Object.entries(detailItem?.detail ?? {}).map(([key, value], i) => (
                    <ProjectInfoContentDetailContentItem key={i.toString()}>
                      <ProjectInfoContentDetailContentText1>{snakeToPascal(key)}</ProjectInfoContentDetailContentText1>
                      <ProjectInfoContentDetailContentText2> : {value}</ProjectInfoContentDetailContentText2>
                    </ProjectInfoContentDetailContentItem>
                  ))}
                </ProjectInfoContentDetailContent>
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>
                  General Description
                </ProjectInfoContentDetailGeneralContentTitle>
                <ProjectInfoContentGeneralContent
                  dangerouslySetInnerHTML={{
                    __html: detailItem?.generalDescription,
                  }}
                />
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>Video</ProjectInfoContentDetailGeneralContentTitle>
                <iframe
                  width="560"
                  height="450px"
                  style={{ width: '100%', border: '0', padding: '35px 0', borderRadius: '10px' }}
                  src={detailItem?.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>Map</ProjectInfoContentDetailGeneralContentTitle>
                <iframe
                  width="600"
                  height="450"
                  style={{ width: '100%', border: '0', padding: '35px 0', borderRadius: '10px' }}
                  loading="lazy"
                  allowFullScreen
                  title="map"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={detailItem?.map}
                />
              </ProjectInfoContentDetailGeneralContent>
            </ProjectInfoContentDetailGeneral>
            <ProjectInfoContentTransactions>
              <ProjectInfoContentTransactionsTitle>Transactions</ProjectInfoContentTransactionsTitle>
              {listTransaction.length > 0 &&
                listTransaction.map((item, index) => {
                  return (
                    <ProjectInfoContentTransactionsItem key={index.toString()}>
                      <ProjectInfoContentTransactionsItemText1>{item?.type}</ProjectInfoContentTransactionsItemText1>
                      {/* <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2> */}
                      <ProjectInfoContentTransactionsItemText3>
                        {moment().diff(item?.created_at, 'days')} Day ago
                      </ProjectInfoContentTransactionsItemText3>
                      <ProjectInfoContentTransactionsItemText4>
                        {calculateCtb(+item?.value, findInfoToken(false))} {findInfoToken()}
                      </ProjectInfoContentTransactionsItemText4>
                    </ProjectInfoContentTransactionsItem>
                  )
                })}
              {listTransaction.length <= 0 && <NoData paddingTop="20px">No data</NoData>}
              {renderTransactionsPaging()}
            </ProjectInfoContentTransactions>
          </ProjectInfoSectionContent>
        </ProjectInfoSection>
      </PageWrapper>
    </Page>
  )
}

export default InvestDetail
