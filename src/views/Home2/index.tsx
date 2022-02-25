import React from 'react'
import { Box, Button, Flex, Text } from '@uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { variants } from '@uikit/components/Button/types'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 60vw, 1300px);
  padding: 0 16px;
  margin: 0 auto;
`

const Text1 = styled(Text)`
  font-weight: 800;
  font-size: clamp(32px, 5vw, 65px);
  text-transform: uppercase;
`

const Text2 = styled(Text)`
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;
`

const Text3 = styled(Text)`
  font-weight: 300;
  font-size: clamp(20px, 2vw, 30px);
`

const Text4 = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  line-height: 35px;
`

const Section = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Page2Icon = styled.img`
  width: 80px;
`

const Page2IconShadow = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 280px;
  min-height: 280px;
  z-index: 1;
`

const Page2Text = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  margin-top: 32px;
  max-width: 25ch;
`

const RegisterBox = styled(Flex)`
  width: 100%;
  border: ${({ theme }) => `0.5px solid ${theme.colors.primary}`};
  padding: 32px;
  justify-content: space-between;
  gap: 32px;
  align-items: center;
  border-radius: 16px;
`

const RegisterText = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  max-width: 70ch;
  text-align: left;
`

const Section4Text = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  padding: 32px 0;
  background: linear-gradient(270deg, #443000 0%, #855e00 34.68%, #ba8300 68.12%, #fdb814 100%);
  border-radius: 15px;
`

const Section4Text2 = styled(Text)`
  flex: 1;
  font-weight: 400;
  font-size: 20px;
  width: 100%;
  padding: 32px;
  background: #ecd08f33;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Section4RowCol = styled(Flex)`
  width: 100%;
  margin-top: 24px;
  gap: 24px;
`

const MetaFound = () => {
  const { theme } = useTheme()
  return (
    <>
      <span style={{ color: theme.colors.primary }}>Meta</span>Found
    </>
  )
}

const Home2 = () => {
  const { theme } = useTheme()
  return (
    <PageWrapper>
      {/* SECTION 1 */}
      <Section marginTop="22vh">
        <Text1>
          <MetaFound />
        </Text1>
        <Text3 marginTop="16px">
          <Trans>The real estate industry&apos;s digital and sharing platform for investment</Trans>
        </Text3>
        <Flex justifyContent="center" marginTop="64px" style={{ gap: '32px' }}>
          <ConnectWalletButton
            style={{
              borderRadius: '10px',
              color: theme.colors.background,
              height: '75px',
              width: '300px',
              fontSize: '25px',
              fontWeight: 600,
            }}
          />
          <Button
            variant={variants.TEXT}
            style={{
              border: `1px solid ${theme.colors.primary}`,
              borderRadius: '10px',
              height: '75px',
              width: '300px',
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            <Trans>Invest Now</Trans>
          </Button>
        </Flex>
      </Section>
      {/* SECTION 2 */}
      <Section marginTop="300px">
        <Box background={theme.colors.primary} width="100px" height="4px" />
        <Text2 marginTop="48px">
          <Trans>What is</Trans> <MetaFound />?
        </Text2>
        <Text4 marginTop="24px" maxWidth="75ch">
          <Trans>
            MetaFound (MTF) is a real estate technology platform. MTF utilizes the Blockchain platform to tokenize and
            split real estate as well as investments, allowing individuals to invest in all or a portion of publicly
            traded &quot;REAL&quot; real estate.
          </Trans>
        </Text4>
        <Flex width="100%" justifyContent="space-between" marginTop="120px">
          <Flex flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon1.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>A little capital investment</Trans>
            </Page2Text>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon2.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Profit from renting real estate</Trans>
            </Page2Text>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon3.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Clear appraisal of real estate before encryption</Trans>
            </Page2Text>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon4.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Quick liquidity 24/7</Trans>
            </Page2Text>
          </Flex>
        </Flex>
      </Section>
      {/* SECTION 3 */}
      <Section marginTop="150px">
        <RegisterBox>
          <RegisterText>
            <Trans>
              Allows project owners to launch validated products to gain access to finance and profit from the investor
              community
            </Trans>
          </RegisterText>
          <Button
            style={{
              minWidth: 'max-content',
              borderRadius: '15px',
              height: '70px',
              width: '255px',
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            <Flex alignItems="center" style={{ gap: '16px' }}>
              <RegisterText style={{ color: theme.colors.background, fontWeight: 600, wordBreak: 'keep-all' }}>
                <Trans>Register Now</Trans>
              </RegisterText>
              <img src="/images/metafound/arrow.svg" width="28px" />
            </Flex>
          </Button>
        </RegisterBox>
      </Section>
      {/* SECTION 4 */}
      <Section marginTop="150px">
        <Section4Text>
          <Trans>When owning MetaFound utility tokens (MTF), the following benefits accrue to the community</Trans>
        </Section4Text>
        <Section4RowCol>
          <Section4Text2>
            <Trans>Participate in investment activities and utilize MetaFound&apos;s ecosystem</Trans>
          </Section4Text2>
          <Section4Text2>
            <Trans>Profit from staking and farming</Trans>
          </Section4Text2>
        </Section4RowCol>
      </Section>
      {/* SECTION 5 */}
      <Section marginTop="150px">
        <Text
          style={{
            fontSize: '30px',
            lineHeight: '24px',
            fontWeight: 600,
            paddingLeft: '16px',
            borderLeft: `4px solid ${theme.colors.primary}`,
            alignSelf: 'flex-start',
          }}
        >
          <Trans>MetaFound&apos;s Operation</Trans>
        </Text>
        <img src="/images/metafound/operation.svg" style={{ width: '100%', userSelect: 'none', marginTop: '64px' }} />
      </Section>

      <Section marginTop="150px" />
    </PageWrapper>
  )
}

export default Home2
