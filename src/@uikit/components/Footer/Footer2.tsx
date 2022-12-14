import { Box, Flex } from '@uikit/components/Box'
import { Link } from '@uikit/components/Link'
import Trans from 'components/Trans'
import SocialLinks from '@uikit/components/Footer/Components/SocialLinks'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '@uikit/components/Text'

const FooterText = styled(Text)`
  font-size: 14px;
`
const Footer = styled(Flex)`
display: none;
${({ theme }) => theme.mediaQueries.sm} {
  display: flex;
}
`

const Footer2 = () => {
  return (
    <Box borderTop="0.5px solid #ffffff">
      <Footer justifyContent="space-between" maxWidth="1300px" margin="0 auto" padding="16px" >
        <Flex style={{ gap: '12px', alignItems: 'center' }}>
          <Link
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
            bold={false}
            color="text"
            fontSize="14px"
            fontWeight={300}
          >
            <Trans>Terms of Use</Trans>
          </Link>
          <FooterText>|</FooterText>
          <Link
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
            bold={false}
            color="text"
            fontSize="14px"
            fontWeight={300}
          >
            <Trans>Privacy Policy</Trans>
          </Link>
          <FooterText>|</FooterText>
          <Link
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
            bold={false}
            color="text"
            fontSize="14px"
            fontWeight={300}
          >
            <Trans>Help Center</Trans>
          </Link>
          <FooterText>|</FooterText>
          <Link
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer noopener"
            bold={false}
            color="text"
            fontSize="14px"
            fontWeight={300}
          >
            <Trans>supportmtf@gmail.com</Trans>
          </Link>
        </Flex>
        <SocialLinks order={[2]} />
      </Footer>
    </Box>
  )
}

export default Footer2
