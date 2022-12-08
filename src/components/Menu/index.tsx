import React, { type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import type { MouseOrTouchEvent } from '../../types';
import MenuList, { type MenuListProps } from './MenuList';
import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  MENU_CONTAINER_CLS,
  MENU_CONTAINER_TESTID
} from '../../constants';

interface MenuProps extends MenuListProps {
  readonly id?: string;
  readonly menuTop?: string;
  readonly menuOpen: boolean;
  readonly lazyLoadMenu: boolean;
  readonly menuPortalTarget?: Element;
  readonly menuRef: MutableRefObject<HTMLDivElement | null>;
  readonly onMenuMouseDown: (e: MouseOrTouchEvent<HTMLDivElement>) => void;
}

interface MenuWrapperProps extends Pick<MenuProps, 'menuOpen' | 'menuTop'> {
  readonly hideNoOptionsMsg: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  z-index: 999;
  cursor: default;
  position: absolute;

  ${({ menuTop, menuOpen, hideNoOptionsMsg, theme: { menu } }) => css`
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    animation: ${menu.animation};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    box-shadow: ${hideNoOptionsMsg ? 'none' : menu.boxShadow};
    ${!menuOpen && 'display: none;'}
    ${menuTop && `top: ${menuTop};`}
  `}

  ${({ theme }) => theme.menu.css}

  .${OPTION_CLS} {
    display: block;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-tap-highlight-color: transparent;
	  padding: ${({ theme }) => theme.menu.option.padding};
	  text-align: ${({ theme }) => theme.menu.option.textAlign};

    &.${OPTION_FOCUSED_CLS},
    &:hover:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
      background-color: ${({ theme }) => theme.menu.option.focusedBgColor};
    }

    &.${OPTION_SELECTED_CLS} {
      color: ${({ theme }) => theme.menu.option.selectedColor};
      background-color: ${({ theme }) => theme.menu.option.selectedBgColor};
    }

    &.${OPTION_DISABLED_CLS} {
      opacity: 0.35;
    }
  }
`;

const Menu: React.FC<MenuProps> = ({
  id,
  menuRef,
  menuTop,
  menuOpen,
  lazyLoadMenu,
  onMenuMouseDown,
  menuPortalTarget,
  ...menuListProps
}) => {
  if (lazyLoadMenu && !menuOpen) {
    return null;
  }

  const { menuOptions, noOptionsMsg } = menuListProps;
  const hideNoOptionsMsg = menuOpen && !noOptionsMsg && !menuOptions.length;

  const menuNode = (
    <MenuWrapper
      id={id}
      ref={menuRef}
      menuTop={menuTop}
      menuOpen={menuOpen}
      onMouseDown={onMenuMouseDown}
      className={MENU_CONTAINER_CLS}
      data-testid={MENU_CONTAINER_TESTID}
      hideNoOptionsMsg={hideNoOptionsMsg}
    >
      <MenuList {...menuListProps} />
    </MenuWrapper>
  );

  return menuPortalTarget
    ? createPortal(menuNode, menuPortalTarget)
    : menuNode;
};

export default Menu;
