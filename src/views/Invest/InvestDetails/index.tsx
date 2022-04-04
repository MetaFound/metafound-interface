import styled from 'styled-components'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import useTheme from '../../../hooks/useTheme'
import { Box, Flex, Heading, Input, Skeleton, Text } from '../../../@uikit'
import TimelineDetail from './timelineDetail'

const Page = styled(Box)``

const CarouselSection = styled.div`
  height: 100%;
`

const CarouselBlock = styled.div`
  outline: none;
`

const CarouselImg = styled.img`
  width: 100%;
  max-width: clamp(1000px, 70vw, 1238px);
  margin: 0 auto;
  padding: 0 16px;
  border-radius: 20px;
  max-height: 500px;
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
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 22px;
  }
`

const LocationInfoText = styled.div`
  color: #868686;
  font-size: 14px;
  font-weight: 400;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const LocationInfoAddress = styled.div`
  font-weight: 500;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
  }
`

const TimelineProgressSection = styled(Flex)`
  margin-top: 36px;
  gap: 41px;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 86px;
  }
`
const ProgressPercentBlock = styled(Flex)`
  justify-content: flex-end;
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
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 26px;
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
  font-size: 18px;
  line-height: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
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
  order: 2;
  @media screen and (min-width: 1477px) {
    order: unset;
  }
`

const ProgressBlockTitle = styled(Flex)`
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.sm} {
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
  font-size: 12px;
  line-height: 20px;
  gap: 5px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 0 5px;
  text-align: center;
  background: ${({ active }) => `${active ? '#fdb814' : 'unset'}`};
  color: ${({ active }) => `${active ? '#000' : 'unset'}`};

  ${({ theme }) => theme.mediaQueries.sm} {
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

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 28px 35px;
    margin-top: 46px;
  }
`

const TextStyle2 = styled.div`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const ProgressBlockStepInfoText1 = styled(TextStyle2)`
  color: #868686;
  font-weight: 500;
`

const ProgressBlockStepInfoText2 = styled(TextStyle2)`
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 15px;
`

const ProgressBlockStepInfoTier = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: unset;
  }
`

const ProgressBlockStepInfoTier1 = styled(Flex)`
  padding: 0 15px;
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
  }
`

const ProgressBlockStepInfoTier1Text1 = styled(TextStyle2)`
  font-weight: 400;
`

const ProgressBlockStepInfoTier1Text2 = styled(TextStyle2)`
  color: #fdb814;
  font-weight: 600;
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
`

const ProgressBlockStepInfoText3Block = styled(Flex)`
  justify-content: space-between;
  gap: 10px;
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
  font-size: 25px;
  line-height: 30px;
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
  ${({ theme }) => theme.mediaQueries.sm} {
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

  ${({ theme }) => theme.mediaQueries.sm} {
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
  font-size: 22px;
  color: ${({ theme }) => `${theme.colors.primary}`};
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
  min-width: 35px;
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

const ButtonInvestSearch = styled.button`
  background: #fdb814;
  border-radius: 8px;
  outline: none;
  border-color: transparent;
  color: black;
  padding: 0 15px;
  height: 32px;
  font-weight: 600;
  font-size: 16px;
`

const CurrencyIcon = styled.img`
  width: 25px;
  position: absolute;
  top: 0;
  left: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 25px;
  }
`

const BlockSearchInvest = styled.div`
  height: 40px;
  width: 250px;
  max-width: 100%;
  position: relative;
`

const SearchInput = styled(Input)`
  width: 100%;
  height: 100%;
  padding: 0 48px;
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
`

const InvestDetail = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const { investId } = router.query

  const [detailItem, setDetailItem] = useState(null)

  const [progressStep, setProgressStep] = useState(1)
  const [timelineStep, setTimelineStep] = useState(1)
  const [transactionPageNumber, setTransactionPageNumber] = useState(1)
  const [transactionTotalPage, setTransactionTotalPage] = useState(0)
  const [listTransaction, setListTransaction] = useState([])

  useEffect(() => {
    if (investId) {
      getData()
    }
  }, [investId])

  useEffect(() => {
    if (detailItem?.stage) {
      switch (true) {
        case moment(+detailItem?.stage?.endCtb).isBefore(moment().unix() * 1000) &&
          moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.closeTime):
          setTimelineStep(2)
          break
        case moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.startTime) ||
          (moment(+detailItem?.stage?.startTime).isBefore(moment().unix() * 1000) &&
            moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.endCtb)):
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

  const getData = () => {
    axios
      .get(`http://116.118.49.31:8003/api/v1/invest-pools/${investId}`)
      .then(function (response) {
        setDetailItem(response?.data?.data ?? {})
      })
      .catch(function (error) {
        throw error
      })
  }

  useEffect(() => {
    if (investId) {
      getTransactions()
    }
  }, [transactionPageNumber, investId])

  const getTransactions = () => {
    axios
      .get(`http://116.118.49.31:8003/api/v1/my-invest/${investId}/history`, {
        params: {
          limit: 10,
          page: transactionPageNumber,
        },
        headers: {
          // Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHg3ZWQwODU1MmE3OTdiNThjY2MyZDI5N2ZiNjQzOTEwM2IzYTczZGI1IiwiaWF0IjoxNjQ5MDg1NTU0LCJleHAiOjE2NDkxNzE5NTR9.LY6BC4g1P_oRCiwRJG1Y5d6o_zFujvrIALOg4xA-qZU`,
        },
      })
      .then(function (response) {
        setListTransaction(response?.data?.data?.transactions ?? [])
        setTransactionTotalPage(response?.data?.data?.totalCount ? Math.ceil(response?.data?.data?.totalCount / 10) : 0)
      })
      .catch((error) => {
        console.error('error:', error.response)
      })
  }

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

  // @ts-ignore
  return (
    <Page>
      <CarouselSection>
        <Slider {...settings}>
          <CarouselBlock>
            <CarouselImg src={detailItem?.thumbnail} />
          </CarouselBlock>
          <CarouselBlock>
            <CarouselImg src={detailItem?.thumbnail} />
          </CarouselBlock>
          <CarouselBlock>
            <CarouselImg src={detailItem?.thumbnail} />
          </CarouselBlock>
        </Slider>
      </CarouselSection>
      <PageWrapper>
        <LocationBlock>
          <LocationImg src={detailItem?.imgUrl} />
          <LocationInfo>
            <LocationInfoCity>{detailItem?.name}</LocationInfoCity>
            <LocationInfoText>Location: </LocationInfoText>
            <LocationInfoAddress>{detailItem?.location}</LocationInfoAddress>
          </LocationInfo>
        </LocationBlock>
        <TimelineProgressSection>
          <ProgressPercentBlock>
            <ProgressPercent>
              <TotalContributedCapital>Total Contributed Capital</TotalContributedCapital>
              <PercentBlock>
                <ActivePercent width={68}>
                  <NumberPercent>68%</NumberPercent>
                </ActivePercent>
              </PercentBlock>

              <TotalBlock>
                <TotalLayout>
                  <TotalText1>Total:</TotalText1>
                  <TotalText2 marginLeft="6px">123</TotalText2>
                  <TotalText1>/123 MTF</TotalText1>
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
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber active={progressStep === 1}>1</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 1}>Stake MTF</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber active={progressStep === 2}>2</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 2}>Invest</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber active={progressStep === 3}>3</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 3}>Investing</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber active={progressStep === 4}>4</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText active={progressStep === 4}>Withdraw Profit</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
            </ProgressBlockStep>
            {/* <ProgressBlockStepInfo> */}
            {/*   <ProgressBlockStepInfoText1>Stake to achive MetaFound Tier</ProgressBlockStepInfoText1> */}
            {/*   <ProgressBlockStepInfoText2>Stake MTF to achieve tier (Silver, Gold, Dimond)</ProgressBlockStepInfoText2> */}
            {/*   <ProgressBlockStepInfoTier> */}
            {/*     <ProgressBlockStepInfoTier1> */}
            {/*       <ProgressBlockStepInfoTier1Text1>My Tier</ProgressBlockStepInfoTier1Text1> */}
            {/*       <ProgressBlockStepInfoTier1Text2>Gold</ProgressBlockStepInfoTier1Text2> */}
            {/*     </ProgressBlockStepInfoTier1> */}
            {/*     <ProgressBlockStepInfoTier2>Stake now</ProgressBlockStepInfoTier2> */}
            {/*   </ProgressBlockStepInfoTier> */}
            {/*   <ProgressBlockStepInfoText3Block> */}
            {/*     <ProgressBlockStepInfoText3>You have staked, you can invest now</ProgressBlockStepInfoText3> */}
            {/*     <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question> */}
            {/*   </ProgressBlockStepInfoText3Block> */}
            {/* </ProgressBlockStepInfo> */}

            <ProgressBlockStepInfo>
              <ProgressBlockStepInfoText1>Invest</ProgressBlockStepInfoText1>
              <ProgressBlockStepInfoText2>Enter the amount of tokens you want to invest</ProgressBlockStepInfoText2>
              <ProgressBlockStepInfoText3>Balance: 0.000 USDT</ProgressBlockStepInfoText3>
              <BlockSearchWithButton>
                <BlockSearchInvest>
                  <SearchInput placeholder="0.00" />
                  <SearchIcon>Max</SearchIcon>
                  <CurrencyIcon src="./images/" />
                </BlockSearchInvest>
                <ButtonInvestSearch>Invest</ButtonInvestSearch>
              </BlockSearchWithButton>
            </ProgressBlockStepInfo>
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
                    <ProjectInfoContentDetailContentItem key={i}>
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
                <ProjectInfoContentGeneralContent>{detailItem?.generalDescription}</ProjectInfoContentGeneralContent>
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
                    <ProjectInfoContentTransactionsItem key={index}>
                      <ProjectInfoContentTransactionsItemText1>{item?.type}</ProjectInfoContentTransactionsItemText1>
                      {/* <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2> */}
                      <ProjectInfoContentTransactionsItemText3>
                        {moment().diff(item?.created_at, 'days')} Day ago
                      </ProjectInfoContentTransactionsItemText3>
                      <ProjectInfoContentTransactionsItemText4>
                        {item?.value} $MTF
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
