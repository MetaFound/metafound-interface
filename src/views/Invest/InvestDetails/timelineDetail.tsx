import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Flex } from '../../../@uikit'

interface TimelineDetailProps {
  step: number
  detailItem: any
  visible: boolean
  title: string
}

const TimelineContent = styled.div`
  padding-bottom: 20px;
  line-height: 30px;
  width: 100%;
`

const TimelineContentTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`

const TimelineContentBody = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => `${visible ? 'unset' : 'none'}`};
`

const TimelineContentFromTo = styled(Flex)<{ visible: boolean }>`
  justify-content: space-between;
  display: ${({ visible }) => `${visible ? 'flex' : 'none'}`};
`

const TextStyle1 = styled.div`
  justify-content: space-between;
  font-size: 16px;
  line-height: 30px;
  font-weight: 400;
`

const TimelineContentFromToTitle = styled(TextStyle1)`
  color: #868686;
`

const TimelineContentStartIn = styled(TextStyle1)<{ visible: boolean }>`
  margin-top: 10px;
  display: ${({ visible }) => `${visible ? 'block' : 'none'}`};
`

const TimelineContentStartInBlock = styled(Flex)<{ visible: boolean }>`
  justify-content: space-between;
  margin-top: 6px;
  display: ${({ visible }) => `${visible ? 'flex' : 'none'}`};
`

const TimelineContentStartInTime = styled(Flex)`
  flex-direction: column;
`

const TimelineContentStartInColon = styled(Flex)`
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  height: 40px;
`

const TimelineContentStartInTimeBox = styled(Flex)`
  background: #4a4a4a;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
`

const TimelineContentStartInTimeText = styled(Flex)`
  font-size: 11px;
  color: #868686;
  justify-content: center;
`

const TimelineDetail = (props: TimelineDetailProps) => {
  const { step, detailItem, visible, title } = props
  const [countDay, setCountDay] = useState('00')
  const [countHour, setCountHour] = useState('00')
  const [countMinute, setCountMinute] = useState('00')
  const [countSecond, setCountSecond] = useState('00')

  useEffect(() => {
    const countdownToCurrent = () => {
      let diffTime = null
      switch (step) {
        case 1:
          if (moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.startTime)) {
            console.log('current before startTime')
            diffTime = moment(+detailItem?.stage?.startTime).diff(moment().unix() * 1000)
          }
          if (
            moment(+detailItem?.stage?.startTime).isBefore(moment().unix() * 1000) &&
            moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.endCtb)
          ) {
            console.log('1 case 2')
            diffTime = moment(+detailItem?.stage?.endCtb).diff(moment(moment().unix() * 1000))
          }
          break
        case 2:
          diffTime = moment(+detailItem?.stage?.closeTime).diff(moment().unix() * 1000)
          console.log(' 2 dsa ')
          break
        default:
          diffTime = null
      }
      if (diffTime) {
        const duration = moment.duration(diffTime)
        if (moment.duration(duration).days() > 99) {
          setCloseTime('99', '99', '99', '99')
          return
        }
        setCloseTime(
          moment.duration(duration).days(),
          moment.duration(duration).hours(),
          moment.duration(duration).minutes(),
          moment.duration(duration).seconds(),
        )
      } else {
        setCloseTime('00', '00', '00', '00')
      }
    }

    const itv = setInterval(countdownToCurrent, 1000)

    return () => {
      clearInterval(itv)
    }
  }, [detailItem])

  const setCloseTime = (day, hour, minute, second) => {
    setCountDay(day)
    setCountHour(hour)
    setCountMinute(minute)
    setCountSecond(second)
  }

  return (
    <TimelineContent>
      <TimelineContentTitle>{title}</TimelineContentTitle>
      <TimelineContentBody visible={visible}>
        <TimelineContentFromTo visible>
          <TimelineContentFromToTitle>From</TimelineContentFromToTitle>
          <TextStyle1>{moment(+detailItem?.stage?.startTime).format('h:mm, D MMM  YYYY')}</TextStyle1>
        </TimelineContentFromTo>
        <TimelineContentFromTo visible={step !== 3}>
          <TimelineContentFromToTitle>To</TimelineContentFromToTitle>
          <TextStyle1>{moment(+detailItem?.stage?.endCtb).format('h:mm, D MMM  YYYY')}</TextStyle1>
        </TimelineContentFromTo>
        <TimelineContentStartIn visible={step !== 3}>
          {step === 2 ||
          (step === 1 &&
            moment(+detailItem?.stage?.startTime).isBefore(moment().unix() * 1000) &&
            moment(moment().unix() * 1000).isBefore(+detailItem?.stage?.endCtb))
            ? 'End in'
            : 'Start in'}
        </TimelineContentStartIn>
        <TimelineContentStartInBlock visible={step !== 3}>
          <TimelineContentStartInTime>
            <TimelineContentStartInTimeBox>{countDay}</TimelineContentStartInTimeBox>
            <TimelineContentStartInTimeText>Day</TimelineContentStartInTimeText>
          </TimelineContentStartInTime>
          <TimelineContentStartInColon>:</TimelineContentStartInColon>
          <TimelineContentStartInTime>
            <TimelineContentStartInTimeBox>{countHour}</TimelineContentStartInTimeBox>
            <TimelineContentStartInTimeText>Hours</TimelineContentStartInTimeText>
          </TimelineContentStartInTime>
          <TimelineContentStartInColon>:</TimelineContentStartInColon>
          <TimelineContentStartInTime>
            <TimelineContentStartInTimeBox>{countMinute}</TimelineContentStartInTimeBox>
            <TimelineContentStartInTimeText>Minutes</TimelineContentStartInTimeText>
          </TimelineContentStartInTime>
          <TimelineContentStartInColon>:</TimelineContentStartInColon>
          <TimelineContentStartInTime>
            <TimelineContentStartInTimeBox>{countSecond}</TimelineContentStartInTimeBox>
            <TimelineContentStartInTimeText>Second</TimelineContentStartInTimeText>
          </TimelineContentStartInTime>
        </TimelineContentStartInBlock>
      </TimelineContentBody>
    </TimelineContent>
  )
}
export default TimelineDetail
