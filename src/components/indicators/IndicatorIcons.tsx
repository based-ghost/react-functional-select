import React, { memo } from 'react';
import LoadingDots from './LoadingDots';
import { isFunction } from '../../utils';
import ClearSvgIcon from './ClearSvgIcon';
import styled, { css } from 'styled-components';
import { CARET_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../../constants';

import type { ReactNode } from 'react';
import type { IconRenderer, CustomRendererCallback, MouseOrTouchEventHandler } from '../../types';

export type IndicatorIconsProps = Readonly<{
  menuOpen: boolean;
  showClear: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  loadingNode?: ReactNode;
  clearIcon?: IconRenderer;
  caretIcon?: IconRenderer;
  onClearMouseDown: MouseOrTouchEventHandler;
  onCaretMouseDown?: MouseOrTouchEventHandler;
}>;

const IndicatorIconsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`;

const IndicatorIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.icon.color};
  padding: ${({ theme }) => theme.icon.padding};

  :hover {
    color: ${({ theme }) => theme.icon.hoverColor};
  }

  ${({ theme }) => theme.icon.css}
`;

const Caret = styled.div<Pick<IndicatorIconsProps, 'menuOpen' | 'isInvalid'>>`
  transition: ${({ theme }) => theme.icon.caret.transition};
  border-top: ${({ theme }) => theme.icon.caret.size} dashed;
  border-left: ${({ theme }) => theme.icon.caret.size} solid transparent;
  border-right: ${({ theme }) => theme.icon.caret.size} solid transparent;
  will-change: transform, color;

  ${({ theme, menuOpen, isInvalid }) =>
    menuOpen &&
    css`
      transform: rotate(180deg);
      color: ${isInvalid ? theme.color.danger : theme.color.caretActive || theme.color.primary};
    `}
`;

const Separator = styled.div`
  width: 1px;
  margin: 0.5rem 0;
  align-self: stretch;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.iconSeparator || theme.color.border};
`;

const IndicatorIcons = memo<IndicatorIconsProps>(({
  menuOpen,
  clearIcon,
  caretIcon,
  isInvalid,
  showClear,
  isLoading,
  isDisabled,
  loadingNode,
  onCaretMouseDown,
  onClearMouseDown
}) => {
  const renderIconCallback = (renderer: IconRenderer) => {
    return isFunction(renderer)
      ? (renderer as CustomRendererCallback)({ menuOpen, isLoading, isInvalid, isDisabled })
      : renderer;
  };

  return (
    <IndicatorIconsWrapper>
      {showClear && !isLoading && (
        <IndicatorIcon
          onTouchEnd={onClearMouseDown}
          onMouseDown={onClearMouseDown}
          data-testid={CLEAR_ICON_TESTID}
        >
          {renderIconCallback(clearIcon) || <ClearSvgIcon />}
        </IndicatorIcon>
      )}
      {isLoading && (loadingNode || <LoadingDots />)}
      <Separator />
      <IndicatorIcon
        onTouchEnd={onCaretMouseDown}
        onMouseDown={onCaretMouseDown}
        data-testid={CARET_ICON_TESTID}
      >
        {renderIconCallback(caretIcon) || (
          <Caret
            aria-hidden
            menuOpen={menuOpen}
            isInvalid={isInvalid}
            className={CARET_ICON_CLS}
          />
        )}
      </IndicatorIcon>
    </IndicatorIconsWrapper>
  );
});

IndicatorIcons.displayName = 'IndicatorIcons';

export default IndicatorIcons;
