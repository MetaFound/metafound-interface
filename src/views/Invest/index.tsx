import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'
import { Token } from '@pancakeswap/sdk'
import { log } from 'util'
const axios = require('axios')

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

const ProjectListTextSection = styled(Section)`
  margin-top: 8vh;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 12vh;
  }
`

const BlockTitle = styled.div`
  display: inline-block;
`

const Text1 = styled.span`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.5;
  color: ${({ theme }) => `${theme.colors.text}`};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 50px;
    line-height: 70px;
  }
`

const Text2 = styled(Text)`
  font-weight: 300;
  font-size: 22px;
  line-height: 2;
  margin-top: 48px;
  color: ${({ theme }) => `${theme.colors.text}`};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25.9px;
    line-height: 45px;
  }
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
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
  align-self: flex-start;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
  }
`

const ControlSection = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 30px;
  }
`

const BlockFilterButton = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: unset;
  }
`

const FilterButton = styled.div`
  height: 40px;
  border-radius: 10px;
  padding: 6px;
  width: 100%;
  background: #fdb81426;
  display: flex;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-block;
    height: 50px;
    margin-right: 22px;
    width: unset;
    margin-bottom: unset;
  }
`

const FilterButtonItem = styled.div<{ status: boolean }>`
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 600;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => `${theme.colors.text}`};
  cursor: pointer;
  text-align: center;
  background: ${({ status }) => `${status ? '#FDB814' : 'none'}`};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: unset;
    font-size: 18px;
  }
`

const BlockSearch = styled.div`
  height: 40px;
  max-width: 100%;
  position: relative;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 303px;
    height: 50px;
  }
`

const SearchInput = styled(Input)`
  width: 100%;
  height: 100%;
  background: #fdb81426;
  padding-right: 48px;
  font-size: 14px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fdb81426;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
`

const SearchIcon = styled.img`
  width: 17px;
  position: absolute;
  top: 13px;
  right: 13px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 25px;
  }
`

const SectionInvest = styled(Section)`
  margin: 24px 0 66px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 86px 0;
  }
`

const InvestItemBlock = styled(Flex)`
  width: 1228px;
  max-width: 100%;
  padding: 24px;
  background: #fdb81426;
  border: 2px solid #000000;
  border-radius: 25px;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  :last-child {
    margin-bottom: 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 86px;
    gap: 68px;
    padding: 30px;
  }
`

const InvestItemImg = styled.img`
  max-width: 100%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 366px;
  }
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
  font-size: 14px;
  line-height: 30px;
  color: #828282;
  margin-top: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`
const InvestItemText3 = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: ${({ theme }) => `${theme.colors.text}`};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
  }
`

const ProjectInformationBlock = styled.div`
  margin: 10px 0;
  border-top: 1px solid #686868;
  border-bottom: 1px solid #686868;
  padding: 15px 0;
`

const ProjectInformationText1 = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
  color: ${({ theme }) => `${theme.colors.text}`};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    margin-bottom: 3px;
  }
`

const ProjectInformationContent = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
`

const ProjectInformationItem = styled.div`
  width: 280px;
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const ProjectInformationItemKey = styled.div`
  width: 155px;
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
  background: #101010;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  position: relative;
`

const ActivePercent = styled.div<{ width: number }>`
  background: #101010;
  height: 20px;
  width: ${({ width }) => `${width <= 8 ? 8 : width}%`};
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
  const [listDetail, setDataDetail] = useState([])
  const [status, setStatus] = useState(1)
  const [searchParam, setSearchParam] = useState('')

  const handleStatus = (status: 1 | 0) => {
    setStatus(status)
    getData()
  }

  const onSearch = () => {
    getData()
  }

  const handleChangeSearch = (event) => {
    setSearchParam(event.target.value)
  }

  const onEnterKeySearch = (event) => {
    if (event.charCode === 13) {
      getData()
    }
  }
  const getData = () => {
    axios
      .get('http://116.118.49.31:8003/api/v1/invest-pools', {
        params: {
          limit: 10,
          page: 1,
          status: status.toString(),
          name: searchParam ?? '',
        },
      })
      .then(function (response) {
        setDataDetail(response?.data?.data?.investPools)
      })
      .catch(function (error) {
        throw error
      })
  }

  useEffect(() => {
    getData()
  }, [])

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
      <ProjectListTextSection>
        <LineBreak />
        <ProjectListText>Project List</ProjectListText>
      </ProjectListTextSection>
      <ControlSection>
        <BlockFilterButton>
          {/* <FilterButton> */}
          {/*   <FilterButtonItem>Real Estate for Sale</FilterButtonItem> */}
          {/*   <FilterButtonItem>Rental Real Estate</FilterButtonItem> */}
          {/* </FilterButton> */}
          <FilterButton>
            <FilterButtonItem status={status === 1} onClick={() => handleStatus(1)}>
              Live
            </FilterButtonItem>
            <FilterButtonItem status={status === 0} onClick={() => handleStatus(0)}>
              Completed
            </FilterButtonItem>
          </FilterButton>
        </BlockFilterButton>
        <BlockSearch>
          <SearchInput
            onChange={handleChangeSearch}
            onKeyPress={onEnterKeySearch}
            value={searchParam}
            placeholder="Search project’s name"
          />
          <SearchIcon src="/images/metafound/icon_search.svg" onClick={() => onSearch()} />
        </BlockSearch>
      </ControlSection>
      <SectionInvest>
        {listDetail.length > 0 &&
          listDetail.map((item) => {
            return (
              <InvestItemBlock key={item?.id}>
                <InvestItemImg src={item?.imgUrl} />
                <InvestItemInfomation>
                  <InvestItemText1>{item.name}</InvestItemText1>
                  <InvestItemText2>Location:</InvestItemText2>
                  <InvestItemText3>105 Nguyen Van Linh. district 8, Hồ Chí Minh City</InvestItemText3>
                  <ProjectInformationBlock>
                    <ProjectInformationText1>Project Information:</ProjectInformationText1>
                    <ProjectInformationContent>
                      {Object.entries(item?.detail ?? {}).map(([key, value], i) => (
                        <ProjectInformationItem key={i}>
                          <ProjectInformationItemKey>{key}</ProjectInformationItemKey>
                          <ProjectInformationItemValue>: {value}</ProjectInformationItemValue>
                        </ProjectInformationItem>
                      ))}
                    </ProjectInformationContent>
                  </ProjectInformationBlock>
                  <TotalBlock>
                    <div>
                      <TotalText1>Total capital to be mobilized: </TotalText1>
                      <TotalText2 marginLeft="6px"> {item?.totalCtbMax} MTF</TotalText2>
                    </div>
                    <div>
                      <TotalText1>Total:</TotalText1>
                      <TotalText2 marginLeft="6px"> {item?.totalCtb}</TotalText2>
                      <TotalText1>/{item?.totalCtbMax} MTF</TotalText1>
                    </div>
                  </TotalBlock>
                  <PercentBlock>
                    <ActivePercent width={+Math.round(+item?.totalCtb / +item?.totalCtbMax).toFixed(2)}>
                      <NumberPercent>{+Math.round(+item?.totalCtb / +item?.totalCtbMax).toFixed(2)}%</NumberPercent>
                    </ActivePercent>
                  </PercentBlock>
                </InvestItemInfomation>
              </InvestItemBlock>
            )
          })}
      </SectionInvest>
    </PageWrapper>
  )
}

export default Invest
