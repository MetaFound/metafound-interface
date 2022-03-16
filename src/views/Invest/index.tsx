import React from 'react'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
`

const Section = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const BlockTitle = styled.div`
  display: inline-block;
`

const Text1 = styled.span`
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const Text2 = styled(Text)`
  font-weight: 300;
  font-size: 25.9px;
  line-height: 45px;
  margin-top: 48px;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const Text1Title = styled(Text1)`
  color: ${({ theme }) => `${theme.colors.primary}`};
`

const BlockCommunity = styled(Flex)`
  width: 815px;
  max-width: 70%;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}`};
  border-radius: 11px;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  padding: 10px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
    height: 105px;
    max-width: 100%;
    gap: unset;
    padding: unset;
  }
`

const CommunityItem = styled(Text)`
  padding: 8px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: unset;
  }
`

const CommunityText = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 45px;
  color: ${({ theme }) => `${theme.colors.primary}`};
`

const CommunityContent = styled.div`
  font-weight: 300;
  font-size: 22px;
  line-height: 45px;
`

const LineBreak = styled.div`
  width: 85px;
  height: 6px;
  background: ${({ theme }) => `${theme.colors.primary}`};
  align-self: flex-start;
`

const ProjectListText = styled(Text)`
  font-size: 30px;
  font-weight: 700;
  line-height: 45px;
  margin-top: 20px;
  align-self: flex-start;
`

const ControlSection = styled(Flex)`
  margin-top: 30px;
  justify-content: space-between;
`

const BlockFilterButton = styled.div`
  height: 50px;
  border-radius: 10px;
  padding: 6px;
  margin-right: 22px;
  display: inline-block;
  background: #fdb81426;
`

const FilterButton = styled.div`
  height: 37px;
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: inline-block;
  color: ${({ theme }) => `${theme.colors.text}`};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => `${theme.colors.primary}`};
  }
`

const BlockSearch = styled.div`
  width: 303px;
  height: 50px;
  max-width: 100%;
  position: relative;
`

const SearchInput = styled(Input)`
  width: 100%;
  height: 100%;
  background: #fdb81426;
  padding-right: 48px;
  font-size: 18px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fdb81426;
  }
`

const SearchIcon = styled.img`
  width: 25px;
  position: absolute;
  top: 13px;
  right: 13px;
`

const InvestItemBlock = styled(Flex)`
  width: 1228px;
  max-width: 100%;
  padding: 30px;
  background: #fdb81426;
  border: 2px solid #000000;
  border-radius: 25px;
  gap: 68px;
  margin-bottom: 86px;
  flex-wrap: wrap;

  :last-child {
    margin-bottom: 0px;
  }
`

const InvestItemImg = styled.img`
  width: 366px;
  max-width: 100%;
  border-radius: 20px;
`
const InvestItemInfomation = styled.div`
  text-align: left;
  max-width: 100%;
  flex: 1;
`

const InvestItemText1 = styled(Text)`
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const InvestItemText2 = styled(Text)`
  font-size: 16px;
  line-height: 30px;
  color: #828282;
  margin-top: 5px;
`
const InvestItemText3 = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const ProjectInformationBlock = styled.div`
  margin: 10px 0;
  border-top: 1px solid #686868;
  border-bottom: 1px solid #686868;
  padding: 15px 0;
`

const ProjectInformationText1 = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 3px;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const ProjectInformationContent = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
`

const ProjectInformationItem = styled.div`
  width: 280px;
  font-size: 16px;
  line-height: 30px;
  height: 30px;
`

const ProjectInformationItemKey = styled.div`
  width: 156px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  font-weight: 400;
  color: #959595;
`

const ProjectInformationItemValue = styled.div`
  width: 124px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  font-weight: 500;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const TotalBlock = styled(Flex)`
  justify-content: space-between;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`

const TotalText1 = styled(Text)`
  display: inline-block;
  color: #959595;
  font-weight: 400;
`

const TotalText2 = styled(Text)`
  display: inline-block;
  font-weight: 600;
  color: ${({ theme }) => `${theme.colors.text}`};
`

const PercentBlock = styled.div`
  background: #101010;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  position: relative;
`

const ActivePercent = styled.div`
  background: #101010;
  height: 20px;
  width: 68%;
  border-radius: 10px;
  position: absolute;
  background: ${({ theme }) => `${theme.colors.primary}`};
`

const NumberPercent = styled.div`
  position: absolute;
  line-height: 20px;
  border-radius: 10px;
  position: absolute;
  right: 8px;
  font-weight: 600;
  font-size: 13px;
`

const MetaFound = () => {
  const { theme } = useTheme()
  return (
    <>
      <span style={{ color: theme.colors.primary }}>Meta</span>Found
    </>
  )
}

const Invest = () => {
  const { theme } = useTheme()
  return (
    <PageWrapper>
      <Section marginTop="12vh">
        <BlockTitle>
          <Text1Title>Meta</Text1Title>
          <Text1>Found - Capital Contribution to Real Estate</Text1>
        </BlockTitle>
        <Text2>
          The properties on MetaFound are carefully critically appraised by a team of Real Estate industry specialists
          with extensive experience.
        </Text2>
      </Section>
      <Section marginTop="60px">
        <BlockCommunity>
          <CommunityItem>
            <CommunityText>68</CommunityText>
            <CommunityContent>IDO Project</CommunityContent>
          </CommunityItem>
          <CommunityItem>
            <CommunityText>6.868+</CommunityText>
            <CommunityContent>Community</CommunityContent>
          </CommunityItem>
          <CommunityItem>
            <CommunityText>68%</CommunityText>
            <CommunityContent>APY</CommunityContent>
          </CommunityItem>
        </BlockCommunity>
      </Section>
      <Section marginTop="12vh">
        <LineBreak />
        <ProjectListText>Project List</ProjectListText>
      </Section>
      <ControlSection>
        <div>
          <BlockFilterButton>
            <FilterButton>Real Estate for Sale</FilterButton>
            <FilterButton>Rental Real Estate</FilterButton>
          </BlockFilterButton>
          <BlockFilterButton>
            <FilterButton>Live</FilterButton>
            <FilterButton>Completed</FilterButton>
          </BlockFilterButton>
        </div>

        <BlockSearch>
          <SearchInput placeholder="Search project’s name" />
          <SearchIcon src="/images/metafound/icon_search.svg" />
        </BlockSearch>
      </ControlSection>
      <Section margin="86px 0">
        <InvestItemBlock>
          <InvestItemImg src="/images/metafound/invest2_img.png" />
          <InvestItemInfomation>
            <InvestItemText1>Vinhomes</InvestItemText1>
            <InvestItemText2>Location:</InvestItemText2>
            <InvestItemText3>105 Nguyen Van Linh. district 8, Hồ Chí Minh City</InvestItemText3>
            <ProjectInformationBlock>
              <ProjectInformationText1>Project Information:</ProjectInformationText1>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 68 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Time Invested</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 2 Years</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Construction Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 86 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Expected profit</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 15%</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Uses</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Urban land</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Ownership period </ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Until 2024</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Legal</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Owner&apos;s book</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land-use Pattern</ProjectInformationItemKey>
                  <ProjectInformationItemValue> : personal use</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
            </ProjectInformationBlock>
            <TotalBlock>
              <div>
                <TotalText1>Total capital to be mobilized: </TotalText1>
                <TotalText2 marginLeft="6px"> 100 MTF</TotalText2>
              </div>
              <div>
                <TotalText1>Total:</TotalText1>
                <TotalText2 marginLeft="6px"> 68</TotalText2>
                <TotalText1>/100 MTF</TotalText1>
              </div>
            </TotalBlock>
            <PercentBlock>
              <ActivePercent>
                <NumberPercent>68%</NumberPercent>
              </ActivePercent>
            </PercentBlock>
          </InvestItemInfomation>
        </InvestItemBlock>

        <InvestItemBlock>
          <InvestItemImg src="/images/metafound/invest2_img.png" />
          <InvestItemInfomation>
            <InvestItemText1>Vinhomes</InvestItemText1>
            <InvestItemText2>Location:</InvestItemText2>
            <InvestItemText3>105 Nguyen Van Linh. district 8, Hồ Chí Minh City</InvestItemText3>
            <ProjectInformationBlock>
              <ProjectInformationText1>Project Information:</ProjectInformationText1>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 68 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Time Invested</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 2 Years</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Construction Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 86 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Expected profit</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 15%</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Uses</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Urban land</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Ownership period </ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Until 2024</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Legal</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Owner&apos;s book</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land-use Pattern</ProjectInformationItemKey>
                  <ProjectInformationItemValue> : personal use</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
            </ProjectInformationBlock>
            <TotalBlock>
              <div>
                <TotalText1>Total capital to be mobilized: </TotalText1>
                <TotalText2 marginLeft="6px"> 100 MTF</TotalText2>
              </div>
              <div>
                <TotalText1>Total:</TotalText1>
                <TotalText2 marginLeft="6px"> 68</TotalText2>
                <TotalText1>/100 MTF</TotalText1>
              </div>
            </TotalBlock>
            <PercentBlock>
              <ActivePercent>
                <NumberPercent>68%</NumberPercent>
              </ActivePercent>
            </PercentBlock>
          </InvestItemInfomation>
        </InvestItemBlock>
        <InvestItemBlock>
          <InvestItemImg src="/images/metafound/invest2_img.png" />
          <InvestItemInfomation>
            <InvestItemText1>Vinhomes</InvestItemText1>
            <InvestItemText2>Location:</InvestItemText2>
            <InvestItemText3>105 Nguyen Van Linh. district 8, Hồ Chí Minh City</InvestItemText3>
            <ProjectInformationBlock>
              <ProjectInformationText1>Project Information:</ProjectInformationText1>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 68 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Time Invested</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 2 Years</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Construction Area</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 86 m2</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Expected profit</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: 15%</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Uses</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Urban land</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Ownership period </ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Until 2024</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
              <ProjectInformationContent>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Legal</ProjectInformationItemKey>
                  <ProjectInformationItemValue>: Owner&apos;s book</ProjectInformationItemValue>
                </ProjectInformationItem>
                <ProjectInformationItem>
                  <ProjectInformationItemKey>Land-use Pattern</ProjectInformationItemKey>
                  <ProjectInformationItemValue> : personal use</ProjectInformationItemValue>
                </ProjectInformationItem>
              </ProjectInformationContent>
            </ProjectInformationBlock>
            <TotalBlock>
              <div>
                <TotalText1>Total capital to be mobilized: </TotalText1>
                <TotalText2 marginLeft="6px"> 100 MTF</TotalText2>
              </div>
              <div>
                <TotalText1>Total:</TotalText1>
                <TotalText2 marginLeft="6px"> 68</TotalText2>
                <TotalText1>/100 MTF</TotalText1>
              </div>
            </TotalBlock>
            <PercentBlock>
              <ActivePercent>
                <NumberPercent>68%</NumberPercent>
              </ActivePercent>
            </PercentBlock>
          </InvestItemInfomation>
        </InvestItemBlock>
      </Section>
    </PageWrapper>
  )
}

export default Invest
