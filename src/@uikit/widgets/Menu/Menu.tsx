import throttle from 'lodash/throttle'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Footer2 from '@uikit/components/Footer/Footer2'
import { DropdownMenu } from '@uikit/components/DropdownMenu'
import MenuItem from '@uikit/components/MenuItem'
import BottomNav from '../../components/BottomNav'
import { Box } from '../../components/Box'
import Flex from '../../components/Box/Flex'
import MenuItems from '../../components/MenuItems/MenuItems'
import { SubMenuItems } from '../../components/SubMenuItems'
import { useMatchBreakpoints } from '../../hooks'
import CakePrice from '../../components/CakePrice/CakePrice'
import Logo from './components/Logo'
import { MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from './config'
import { NavProps } from './types'
import LangSelector from '../../components/LangSelector/LangSelector'
import { MenuContext } from './context'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const SubItemMyAccount = [
  {
    label: 'My Profile',
    href: '/my-account/my-profile',
  },
  {
    label: 'My Invest',
    href: '/my-account/my-invest',
  },
  {
    label: 'My Tier',
    href: '/my-account/my-tier',
  },
  {
    label: 'Need Help',
    href: '/my-account/need-help',
  },
]

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  transform: translate3d(0, 0, 0);

  max-width: 1300px;
  padding: 0 16px;
  margin: 0 auto;
`

const FixedContainer = styled.div<{ showMenu: boolean; height: number; isOpacity: boolean }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  background: ${({ isOpacity }) => (isOpacity ? `rgba(0, 0, 0, 0.7)` : `none`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`

const MyAccountItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? '#FDB814' : '#fff')};
`

const Menu: React.FC<NavProps> = ({
  linkComponent = 'a',
  userMenu,
  banner,
  globalMenu,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
}) => {
  const { isMobile } = useMatchBreakpoints()
  const [showMenu, setShowMenu] = useState(true)
  const [isOpacity, setOpacity] = useState(true)
  const { pathname } = useRouter()
  const { account } = useActiveWeb3React()
  const refPrevOffset = useRef(typeof window === 'undefined' ? 0 : window.pageYOffset)

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
        setOpacity(false)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          setOpacity(true)
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [totalTopMenuHeight])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly)
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly)

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer showMenu={showMenu} height={totalTopMenuHeight} isOpacity={isOpacity}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <StyledNav>
            <Flex>
              <Logo isDark={isDark} href={homeLink?.href ?? '/'} />
              {!isMobile && <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />}
            </Flex>
            <Flex alignItems="center" height="100%">
              {/* {!isMobile && (
                <Box mr="12px">
                  <CakePrice cakePriceUsd={cakePriceUsd} />
                </Box>
              )} */}
              {account && (
                <DropdownMenu items={SubItemMyAccount} activeItem="/my-account" mr="20px">
                  <MyAccountItem isActive={pathname.includes('/my-account')}>My Account</MyAccountItem>
                </DropdownMenu>
              )}

              {userMenu}

              <Box mt="8px" ml="12px">
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  setLang={setLang}
                  buttonScale="xs"
                  color="white"
                  hideLanguage
                />
              </Box>
              {/* {globalMenu}  */}
            </Flex>
          </StyledNav>
        </FixedContainer>
        {subLinks && (
          <Flex justifyContent="space-around">
            <SubMenuItems items={subLinksWithoutMobile} mt={`${totalTopMenuHeight + 1}px`} activeItem={activeSubItem} />

            {subLinksMobileOnly?.length > 0 && (
              <SubMenuItems
                items={subLinksMobileOnly}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
                isMobileOnly
              />
            )}
          </Flex>
        )}
        <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : '0'}>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
            {/*
            <Footer
              items={footerLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              buyCakeLabel={buyCakeLabel}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, '0px']}
            />
            */}
            <Footer2 />
          </Inner>
        </BodyWrapper>
        {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />}
      </Wrapper>
    </MenuContext.Provider>
  )
}

export default Menu
