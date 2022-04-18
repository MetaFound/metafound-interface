import React from 'react'
import { Box, Button, Flex, Text } from '@uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { variants } from '@uikit/components/Button/types'
import { useRouter } from 'next/router'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Link from 'next/link'
import style from 'style/HomeStyle'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 60vw, 1300px);
  padding: 0 16px;
  margin: 0 auto;
`

const Text1 = styled(Text)`
  font-weight: 800;
  text-transform: uppercase;
  font-size: 40px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: clamp(32px, 5vw, 65px);
  }
`

const Text2 = styled(Text)`
  font-weight: 700;
  line-height: 45px;
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 35px;
  }
`

const Text3 = styled(Text)`
  font-weight: 300;
  margin-top: 16px;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    margin-top: 32px;
    font-size: clamp(20px, 2vw, 30px);
  }
`

const Text4 = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 35px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
`

const Section = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 14vw;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    margin-top: 22vh;
  }
`

const Section2 = styled(Section)`
  margin-top: 22vw;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    margin-top: 300px;
  }
`

const Section3 = styled(Section)`
  margin-top: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 150px;
  }
`

const ButtonBlock = styled(Flex)`
  justify-content: center;
  gap: 32px;
  margin-top: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 48px;
  }

  ${({ theme }) => theme.mediaQueries.xxxl} {
    margin-top: 64px;
  }
`

const ConnectWalletButtonStyled = styled(ConnectWalletButton)`
  color: ${({ theme }) => `${theme.colors.background}`};
  border-radius: 10px;
  font-weight: 600;
  padding: 9px 20px;
  max-width: 100%;
  height: 50px;
  font-size: 12px;

  height: 36px;
  font-size: 14px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 9px 20px;
  }

  ${({ theme }) => theme.mediaQueries.xxxl} {
    height: 75px;
    font-size: 25px;
    width: 300px;
  }
`

const MyAccountButtonStyled = styled(Button)`
  color: ${({ theme }) => `${theme.colors.background}`};
  border-radius: 10px;
  font-weight: 600;
  padding: 9px 20px;
  max-width: 100%;
  height: 50px;
  font-size: 12px;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   height: 60px;
  //   font-size: 18px;
  //   width: 200px;
  // }
  height: 36px;
  font-size: 14px;
  // width: 144px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    height: 75px;
    font-size: 25px;
    width: 300px;
  }
`

const InvestButtonStyled = styled(Button)`
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  border-radius: 10px;
  font-weight: 600;
  padding: 9px 20px;

  max-width: 100%;
  height: 50px;
  font-size: 12px;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   height: 60px;
  //   font-size: 18px;
  //   width: 200px;
  // }
  height: 36px;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    height: 75px;
    font-size: 25px;
    width: 300px;
  }
`

const BenefitBlock = styled(Flex)`
  width: 100%;
  justify-content: center;
  margin-top: 48px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: unset;
    justify-content: space-between;
    margin-top: 120px;
  }
`

const BenefitBox = styled(Flex)`
  margin-bottom: 36px;
  flex: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 50%;
    gap: 12px;
  }
`

const Page2Icon = styled.img`
  width: 80px;
`

const Page2IconShadow = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 120px;
  min-height: 120px;
  z-index: 1;
`

const Page2Text = styled(Text)`
  font-size: 16px;
  margin-top: 32px;
  max-width: 25ch;
  font-weight: 500;
  padding: 0 10px;
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 18px;
    font-weight: 600;
  }
`

const RegisterBox = styled(Flex)`
  width: 100%;
  border: ${({ theme }) => `0.5px solid ${theme.colors.primary}`};
  padding: 32px;
  justify-content: space-between;
  gap: 32px;
  align-items: center;
  border-radius: 16px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: unset;
  }
`

const RegisterText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  max-width: 70ch;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
  }
`

const RegisterButton = styled(Button)`
  min-width: max-content;
  border-radius: 15px;
  height: 60px;
  width: 255px;
  font-size: 22px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 25px;
    height: 70px;
  }
`

const Section4Text = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(270deg, #443000 0%, #855e00 34.68%, #ba8300 68.12%, #fdb814 100%);
  border-radius: 15px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    padding: 32px 0;
    font-size: 18px;
  }
`

const Section4Text2 = styled(Text)`
  flex: 1;
  font-weight: 400;
  width: 100%;
  background: #ecd08f33;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 20px;
    padding: 32px 58px;
  }

  @media screen and (min-width: 1800px) {
    padding: 32px 68px;
  }

  @media screen and (min-width: 1920px) {
    padding: 32px 98px;
  }
`

const Section4RowCol = styled(Flex)`
  display: grid;
  grid-auto-rows: 1fr;
  margin-top: 24px;
  gap: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    width: 100%;
  }
`

const Section3Text5 = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  padding-left: 16px;
  border-left: 4px solid rgb(253, 184, 20);
  align-self: flex-start;

  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 30px;
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

const Home2 = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const { account } = useActiveWeb3React()

  return (
    <PageWrapper>
      {/* SECTION 1 */}
      <Section>
        <Text1>
          <MetaFound />
        </Text1>
        <Text3>
          <Trans>The real estate industry&apos;s digital and sharing platform for investment</Trans>
        </Text3>
        <ButtonBlock>
          {
            account ?
            <MyAccountButtonStyled>
              <Link href="/my-account">My Account</Link>
            </MyAccountButtonStyled> 
              :
            <ConnectWalletButtonStyled />
          }
          <InvestButtonStyled variant={variants.TEXT} onClick={() => router.push('/invest')}>
            <Trans>Invest Now</Trans>
          </InvestButtonStyled>
        </ButtonBlock>
      </Section>
      {/* SECTION 2 */}
      <Section2>
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
        <BenefitBlock>
          <BenefitBox flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon1.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>A little capital investment</Trans>
            </Page2Text>
          </BenefitBox>
          <BenefitBox flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon2.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Profit from renting real estate</Trans>
            </Page2Text>
          </BenefitBox>
          <BenefitBox flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon3.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Clear appraisal of real estate before encryption</Trans>
            </Page2Text>
          </BenefitBox>
          <BenefitBox flexDirection="column" alignItems="center">
            <Box position="relative">
              <Page2Icon src="/images/metafound/page2-icon4.png" />
              <Page2IconShadow src="/images/metafound/page2-icon-shadow.svg" />
            </Box>
            <Page2Text>
              <Trans>Quick liquidity 24/7</Trans>
            </Page2Text>
          </BenefitBox>
        </BenefitBlock>
      </Section2>
      {/* SECTION 3 */}
      <Section3>
        <RegisterBox>
          <RegisterText>
            <Trans>
              Allows project owners to launch validated products to gain access to finance and profit from the investor
              community
            </Trans>
          </RegisterText>
          <RegisterButton>
            <Flex alignItems="center" style={{ gap: '16px' }}>
              <RegisterText style={{ color: theme.colors.background, fontWeight: 600, wordBreak: 'keep-all' }}>
                <Trans>Register Now</Trans>
              </RegisterText>
              <img src="/images/metafound/arrow.svg" alt="arrow" width="28px" />
            </Flex>
          </RegisterButton>
        </RegisterBox>
      </Section3>
      {/* SECTION 4 */}
      <Section3>
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
      </Section3>
      {/* SECTION 5 */}
      <Section3>
        <Section3Text5>
          <Trans>MetaFound&apos;s Operation</Trans>
        </Section3Text5>
        <img src="/images/metafound/operation.svg" alt="operation" style={{ width: '100%', userSelect: 'none', marginTop: '64px' }} />
      </Section3>

      <Section marginTop="150px" />
      <style jsx global>{style}</style>
    </PageWrapper>
  )
}

export default Home2
