import { Flex } from '@uikit/components/Box'
import { Link } from '@uikit/components/Link'
import Trans from 'components/Trans'
import SocialLinks from '@uikit/components/Footer/Components/SocialLinks'
import React from 'react'
import styled from 'styled-components'
import { Text } from '@uikit/components/Text'

const FooterText = styled(Text)`
  font-size: 14px;
`

const Footer2 = () => {
  return (
    <Flex justifyContent="space-between" maxWidth="1300px" margin="0 auto" padding="16px">
      <Flex style={{ gap: '12px', alignItems: 'center' }}>
        <Link
          href="https://www.google.com"
          target="_blank"
          rel="noreferrer noopener"
          bold={false}
          color="text"
          fontSize="14px"
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
        >
          <Trans>supportmtf@gmail.com</Trans>
        </Link>
      </Flex>
      <SocialLinks order={[2]} />
    </Flex>
  )
}

export default Footer2
