import useTheme from '../../../hooks/useTheme'
import styled from 'styled-components'
import { Box, Flex } from '../../../@uikit'

const Page = styled(Box)``

const CarouselSection = styled.div`
  height: 640px;
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
  color: ${({ theme }) => `${theme.colors.text}`};
`

const LocationImg = styled.div`
  width: 120px;
  height: 120px;
  background: #333333;
  border-radius: 10px;
`

const LocationInfo = styled.div``

const LocationInfoCity = styled.div`
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 700;
`

const LocationInfoText = styled.div`
  color: #868686;
  font-size: 16px;
  font-weight: 400;
`

const LocationInfoAddress = styled.div`
  font-weight: 500;
  font-size: 18px;
`

const TimelineProgressSection = styled(Flex)`
  margin-top: 86px;
  gap: 41px;
`

const TimelineBlock = styled(Flex)`
  flex: 4;
  background: #333333;
  border: 0.5px solid #fdb814;
  border-radius: 10px;
  padding: 30px 65px;
  flex-direction: column;
`
const TimelineBlockTitle = styled(Flex)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 26px;
`

const TimelineItem = styled(Flex)`
  gap: 15px;
`
const TimelineStep = styled.div`
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    top: 24px;
    left: 11px;
    position: absolute;
    width: 2px;
    height: 100%;
    background: #4a4a4a;
  }

  &:last-child {
    background: red;
    &::after {
      content: '';
      width: 0;
      height: 0;
    }
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
  font-size: 20px;
  line-height: 30px;
`

const TimelineContentFromTo = styled(Flex)`
  justify-content: space-between;
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

const TimelineContentStartIn = styled(TextStyle1)`
  margin-top: 10px;
`

const TimelineContentStartInBlock = styled(Flex)`
  justify-content: space-between;
  margin-top: 6px;
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

const TimelineTimeBlock = styled.div``

const ProgressBlock = styled(Flex)`
  flex: 7;
  background: #333333;
  border: 0.5px solid #fdb814;
  border-radius: 10px;
  padding: 60px 100px;
  flex-direction: column;
`

const ProgressBlockTitle = styled(Flex)`
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
`

const ProgressBlockStep = styled(Flex)`
  margin-top: 35px;
  justify-content: space-between;
`

const ProgressBlockStepItem = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProgressBlockStepItemNumber = styled(Flex)`
  font-weight: 600;
  font-size: 20px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background: #4a4a4a;
  color: #868686;
  :hover {
    background: #fdb814;
    color: #000;
  }
`

const ProgressBlockStepItemText = styled(Flex)`
  font-weight: 500;
  font-size: 16px;
  line-height: 35px;
  padding: 0 15px;
  margin-top: 14px;
  border-radius: 5px;
  :hover {
    background: #fdb814;
    color: #000;
  }
`

const ProgressBlockStepInfo = styled.div`
  border: 1px solid #fdb814;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 46px;
  padding: 28px 35px;
`

const TextStyle2 = styled.div`
  font-size: 16px;
`

const ProgressBlockStepInfoText1 = styled(TextStyle2)`
  color: #868686;
  font-weight: 500;
`

const ProgressBlockStepInfoText2 = styled(TextStyle2)`
  font-weight: 300;
  margin-top: 8px;
`

const ProgressBlockStepInfoTier = styled(Flex)`
  margin-top: 30px;
`

const ProgressBlockStepInfoTier1 = styled(Flex)`
  height: 40px;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #fdb814;
  min-width: 150px;
  margin-right: 120px;
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
`

const ProgressBlockStepInfoText3 = styled(TextStyle2)`
  color: #868686;
  font-weight: 400;
  margin-top: 7px;
`

const ProgressBlockStepInfoText3Question = styled(Flex)`
  width: 27px;
  height: 27px;
  color: #000;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  background: #fdb814;
  border-radius: 50%;
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
`

const ProjectInfoContentDetailGeneral = styled(Flex)`
  flex-direction: column;
  gap: 40px;
  width: 100%;
  flex: 3;
`

const ProjectInfoContentDetailGeneralContent = styled(Flex)`
  padding: 20px 56px;
  background: #333333;
  border: 1px solid #fdb814;
  border-radius: 10px;
  flex-direction: column;
  text-align: left;
`

const ProjectInfoContentDetailGeneralContentTitle = styled.div`
  text-align: start;
  font-weight: 600;
  font-size: 20px;
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
`

const ProjectInfoContentDetailContent = styled(Flex)`
  line-height: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
`

const ProjectInfoContentDetailContentItem = styled.div`
  flex: 0 0 50%;
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
  font-size: 16px;
  line-height: 30px;
  font-weight: 400;
  margin: 20px 0;
`

const ProjectInfoContentTransactions = styled.div`
  flex: 1;
  background: #333333;
  border: 1px solid #fdb814;
  border-radius: 10px;
  padding: 30px 34px;
  text-align: start;
`

const ProjectInfoContentTransactionsTitle = styled.span`
  font-weight: 600;
  font-size: 22px;
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
  flex: 0 0 50%;
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
`
const ProjectInfoContentTransactionsItemPaging = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: 18px;
  :before {
    content: '< \\00a0 ';
  }
  :after {
    content: '\\00a0 >';
  }
`

const ProjectInfoContentTransactionsItemPagingText1 = styled.span`
  color: #868686;
`

const InvestDetail = () => {
  const { theme } = useTheme()
  return (
    <Page>
      <CarouselSection></CarouselSection>
      <PageWrapper>
        <LocationBlock>
          <LocationImg></LocationImg>
          <LocationInfo>
            <LocationInfoCity>Hồ Chí Minh City</LocationInfoCity>
            <LocationInfoText>Location: </LocationInfoText>
            <LocationInfoAddress>105 Nguyen Van Linh. district 8, Hồ Chí Minh City</LocationInfoAddress>
          </LocationInfo>
        </LocationBlock>
        <TimelineProgressSection>
          <TimelineBlock>
            <TimelineBlockTitle>Timeline</TimelineBlockTitle>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon></TimelineIcon>
              </TimelineStep>
              <TimelineContent>
                <TimelineContentTitle>Capital mobilization time</TimelineContentTitle>
                <TimelineContentFromTo>
                  <TimelineContentFromToTitle>From</TimelineContentFromToTitle>
                  <TextStyle1>8:00, 13 May 2022</TextStyle1>
                </TimelineContentFromTo>
                <TimelineContentFromTo>
                  <TimelineContentFromToTitle>To</TimelineContentFromToTitle>
                  <TextStyle1>8:00, 13 May 2022</TextStyle1>
                </TimelineContentFromTo>
                <TimelineContentStartIn>Start in</TimelineContentStartIn>
                <TimelineContentStartInBlock>
                  <TimelineContentStartInTime>
                    <TimelineContentStartInTimeBox>00</TimelineContentStartInTimeBox>
                    <TimelineContentStartInTimeText>Day</TimelineContentStartInTimeText>
                  </TimelineContentStartInTime>
                  <TimelineContentStartInColon>:</TimelineContentStartInColon>
                  <TimelineContentStartInTime>
                    <TimelineContentStartInTimeBox>00</TimelineContentStartInTimeBox>
                    <TimelineContentStartInTimeText>Hours</TimelineContentStartInTimeText>
                  </TimelineContentStartInTime>
                  <TimelineContentStartInColon>:</TimelineContentStartInColon>
                  <TimelineContentStartInTime>
                    <TimelineContentStartInTimeBox>00</TimelineContentStartInTimeBox>
                    <TimelineContentStartInTimeText>Minutes</TimelineContentStartInTimeText>
                  </TimelineContentStartInTime>
                  <TimelineContentStartInColon>:</TimelineContentStartInColon>
                  <TimelineContentStartInTime>
                    <TimelineContentStartInTimeBox>00</TimelineContentStartInTimeBox>
                    <TimelineContentStartInTimeText>Second</TimelineContentStartInTimeText>
                  </TimelineContentStartInTime>
                </TimelineContentStartInBlock>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon></TimelineIcon>
              </TimelineStep>
              <TimelineContent>
                <TimelineContentTitle>Investment Time</TimelineContentTitle>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon></TimelineIcon>
              </TimelineStep>
              <TimelineContent>
                <TimelineContentTitle>Withdraw Profit</TimelineContentTitle>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>
                <TimelineIcon></TimelineIcon>
              </TimelineStep>
              <TimelineContent>
                <TimelineContentTitle>End</TimelineContentTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineBlock>
          <ProgressBlock>
            <ProgressBlockTitle>Investment Progress</ProgressBlockTitle>
            <ProgressBlockStep>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber>1</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText>Stake MTF</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber>2</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText>Invest</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber>3</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText>Investing</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
              <ProgressBlockStepItem>
                <ProgressBlockStepItemNumber>4</ProgressBlockStepItemNumber>
                <ProgressBlockStepItemText>Withdraw Profit</ProgressBlockStepItemText>
              </ProgressBlockStepItem>
            </ProgressBlockStep>
            <ProgressBlockStepInfo>
              <ProgressBlockStepInfoText1>Stake to achive MetaFound Tier</ProgressBlockStepInfoText1>
              <ProgressBlockStepInfoText2>Stake MTF to achieve tier (Silver, Gold, Dimond)</ProgressBlockStepInfoText2>
              <ProgressBlockStepInfoTier>
                <ProgressBlockStepInfoTier1>
                  <ProgressBlockStepInfoTier1Text1>My Tier</ProgressBlockStepInfoTier1Text1>
                  <ProgressBlockStepInfoTier1Text2>Gold</ProgressBlockStepInfoTier1Text2>
                </ProgressBlockStepInfoTier1>
                <ProgressBlockStepInfoTier2>Stake now</ProgressBlockStepInfoTier2>
              </ProgressBlockStepInfoTier>
              <ProgressBlockStepInfoText3Block>
                <ProgressBlockStepInfoText3>You have staked, you can invest now</ProgressBlockStepInfoText3>
                <ProgressBlockStepInfoText3Question>?</ProgressBlockStepInfoText3Question>
              </ProgressBlockStepInfoText3Block>
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
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Land acreage</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : 68 m2</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Investment time </ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : 2 Years</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>construction area</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : 86 m2</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Expected profit</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : 15%</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Uses</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : Urban land</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Ownership period</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : Until 2024</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Juridical</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : Owner's book</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                  <ProjectInfoContentDetailContentItem>
                    <ProjectInfoContentDetailContentText1>Formality use</ProjectInfoContentDetailContentText1>
                    <ProjectInfoContentDetailContentText2> : personal use</ProjectInfoContentDetailContentText2>
                  </ProjectInfoContentDetailContentItem>
                </ProjectInfoContentDetailContent>
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>
                  General Description
                </ProjectInfoContentDetailGeneralContentTitle>
                <ProjectInfoContentGeneralContent>
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                  ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                  ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                  ipsum lorem ipsum lorem ipsum{' '}
                </ProjectInfoContentGeneralContent>
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>Video</ProjectInfoContentDetailGeneralContentTitle>
              </ProjectInfoContentDetailGeneralContent>
              <ProjectInfoContentDetailGeneralContent>
                <ProjectInfoContentDetailGeneralContentTitle>Map</ProjectInfoContentDetailGeneralContentTitle>
              </ProjectInfoContentDetailGeneralContent>
            </ProjectInfoContentDetailGeneral>
            <ProjectInfoContentTransactions>
              <ProjectInfoContentTransactionsTitle>Transactions</ProjectInfoContentTransactionsTitle>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItem>
                <ProjectInfoContentTransactionsItemText1>Quoc Bao</ProjectInfoContentTransactionsItemText1>
                <ProjectInfoContentTransactionsItemText2>8 Parts</ProjectInfoContentTransactionsItemText2>
                <ProjectInfoContentTransactionsItemText3>1 Day ago</ProjectInfoContentTransactionsItemText3>
                <ProjectInfoContentTransactionsItemText4>800 $MTF</ProjectInfoContentTransactionsItemText4>
              </ProjectInfoContentTransactionsItem>
              <ProjectInfoContentTransactionsItemPaging>
                1<ProjectInfoContentTransactionsItemPagingText1>/3</ProjectInfoContentTransactionsItemPagingText1>
              </ProjectInfoContentTransactionsItemPaging>
            </ProjectInfoContentTransactions>
          </ProjectInfoSectionContent>
        </ProjectInfoSection>
      </PageWrapper>
    </Page>
  )
}

export default InvestDetail
