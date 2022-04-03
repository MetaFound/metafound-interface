import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import axios from 'axios';
import { Box, Flex } from "../../../../components/Box";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 40px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/login',
        data: {
          walletAddress: account
        }
      })
      if (result.data) {
        localStorage.setItem('ACCESS_TOKEN', result.data.data.accessToken)
        localStorage.setItem('FETCH_TIME_ACCESS_TOKEN', `${new Date(result.data.time).getTime()}`)
      }
    }
    if (account) {
        if (!localStorage.getItem('FETCH_TIME_ACCESS_TOKEN') || (new Date().getTime() - parseFloat(localStorage.getItem('FETCH_TIME_ACCESS_TOKEN')) > 1000 * 60 * 60 *24)) {
          getAccessToken()
        }
    }
  }, [account])

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true)
    }

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false)
        evt.stopPropagation()
      }
    }

    targetRef?.addEventListener('mouseenter', showDropdownMenu)
    targetRef?.addEventListener('mouseleave', hideDropdownMenu)

    return () => {
      targetRef?.removeEventListener('mouseenter', showDropdownMenu)
      targetRef?.removeEventListener('mouseleave', hideDropdownMenu)
    }
  }, [targetRef, tooltipRef, setIsOpen])

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s)
        }}
      >
        <MenuIcon avatarSrc={avatarSrc} variant={variant} />
        <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
        <ChevronDownIcon color="text" width="24px" />
      </StyledUserMenu>
      <Menu
        style={{ ...styles.popper, transform: 'translate3d(-16px, 98px, 0)' }}
        ref={setTooltipRef}
        {...attributes.popper}
        isOpen={isOpen}
      >
        <Box onClick={() => setIsOpen(false)}>{children}</Box>
      </Menu>
    </Flex>
  )
}

export default UserMenu
