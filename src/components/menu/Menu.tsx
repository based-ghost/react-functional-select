import React, { FunctionComponent } from 'react';
import { createPortal } from 'react-dom';
import MenuList from './MenuList';
import { MenuProps } from '../../types';
import styled, { css } from 'styled-components';

import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  MENU_CONTAINER_CLS,
  MENU_CONTAINER_TESTID
} from '../../constants';

const MenuWrapper = styled.div<Pick<MenuProps, 'menuOpen' | 'menuTop'>>`
  z-index: 999;
  cursor: default;
  position: absolute;

  ${({ menuTop, menuOpen, theme: { menu } }) => css`
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    animation: ${menu.animation};
    box-shadow: ${menu.boxShadow};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    ${!menuOpen ? 'display: none;' : ''}
    ${menuTop ? `top: ${menuTop};` : ''}
  `}

  ${({ theme }) => theme.menu.css}

  .${OPTION_CLS} {
    display: block;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-tap-highlight-color: transparent;

    ${({ theme: { menu: { option } } }) => css`
      padding: ${option.padding};
      text-align: ${option.textAlign};

      &.${OPTION_FOCUSED_CLS},
      &:hover:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
        background-color: ${option.focusedBgColor};
      }

      &.${OPTION_SELECTED_CLS} {
        color: ${option.selectedColor};
        background-color: ${option.selectedBgColor};
      }

      &.${OPTION_DISABLED_CLS} {
        opacity: 0.35;
      }
    `}
  }
`;

const Menu: FunctionComponent<MenuProps> = ({
  menuRef,
  menuTop,
  menuOpen,
  onMenuMouseDown,
  menuPortalTarget,
  ...menuListProps
}) => {
  const menuNode = (
    <MenuWrapper
      ref={menuRef}
      menuTop={menuTop}
      menuOpen={menuOpen}
      onMouseDown={onMenuMouseDown}
      className={MENU_CONTAINER_CLS}
      data-testid={MENU_CONTAINER_TESTID}
    >
      <MenuList {...menuListProps} />
    </MenuWrapper>
  );

  return menuPortalTarget
    ? createPortal(menuNode, menuPortalTarget)
    : menuNode;
};

export default Menu;