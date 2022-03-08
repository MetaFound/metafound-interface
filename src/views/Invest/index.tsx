import useTheme from '../../hooks/useTheme'
import Trans from '../../components/Trans'
import { variants } from '../../@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '../../@uikit'
import React from 'react'
import styled from 'styled-components'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1300px);
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
  height: 105px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}`};
  border-radius: 11px;
  justify-content: space-between;
`

const CommunityItem = styled(Text)`
  padding: 8px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background: ${({ theme }) => `${theme.colors.primary}`};
  color: ${({ theme }) => `${theme.colors.text}`};
`

const BlockSearch = styled(Input)`
  width: 303px;
  background: #fdb81426;
  height: 50px;
  position: relative;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fdb81426;
  }
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
        <LineBreak></LineBreak>
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
        <BlockSearch placeholder={'Search project’s name'} />
      </ControlSection>
    </PageWrapper>
  )
}

export default Invest
