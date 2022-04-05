import React from "react";
import styled from 'styled-components'
import Link from 'next/link'
import { Box } from "../Box";
import MenuItem from "../MenuItem/MenuItem";
import IconComponent from "../Svg/IconComponent";
import StyledSubMenuItems from "./styles";
import { SubMenuItemsProps } from "./types";

const DivStyledMenuItem = styled.div``

const SubMenuItem = styled.div<{ isActive: boolean }>`
width: 125px;
height: 37px;
// background: #FDB814;
border-radius: 10px;
border: none;
justify-content: center;
align-items: center;
display: flex;
font-weight: 600;
font-size: 18px;
// color: #FFFFFF;
cursor: pointer;
${({ isActive }) => isActive && 'background: #FDB814;'}
`

const SubMenuItems: React.FC<SubMenuItemsProps> = ({ items = [], activeItem, isMobileOnly = false, ...props }) => {
  return (
    <DivStyledMenuItem>
    <StyledSubMenuItems
      justifyContent={[isMobileOnly ? "flex-end" : "start", null, "center"]}
      {...props}
      pl={["12px", null, "0px"]}
      $isMobileOnly={isMobileOnly}
    >
      {items.map(
        ({ label, href, iconName, itemProps }) =>
          label && (
            <Box key={label}>
              <SubMenuItem isActive={href === activeItem} variant="subMenu" {...itemProps}>
                <Link href={href} >
                <span style={{color: href === activeItem ? '#000' : "#fff" }}>
                {label}
                </span>
                </Link>
              </SubMenuItem>
            </Box>
          )
      )}
    </StyledSubMenuItems>
    </DivStyledMenuItem>
  );
};

export default SubMenuItems;
