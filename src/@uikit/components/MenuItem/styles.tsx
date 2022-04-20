import styled from 'styled-components'
import { StyledMenuItemProps } from './types'

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === 'subMenu' &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  // color: ${({ theme, $isActive }) => ($isActive ? theme.colors.secondary : theme.colors.textSubtle)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.text : theme.colors.text)};
  font-size: 16px;
  // font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '600')};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === 'default'
      ? `
    padding: 0 16px;
    height: 64px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}
  
  &:hover {
    // background: ${({ theme }) => theme.colors.tertiary};
    // ${({ $variant }) => $variant === 'default' && 'border-radius: 16px;'};

    color: ${({ theme }) => theme.colors.yellow};
  }

  ${({ $isActive, theme }) =>
    $isActive
      ? `
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 3px solid ${theme.colors.primary};
    }
  `
      : ``}
  font-weight: 400;    
  ${({ theme }) => theme.mediaQueries.custom} {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.xxxl} {
    font-size: 16px;
  }
`

export default StyledMenuItem
