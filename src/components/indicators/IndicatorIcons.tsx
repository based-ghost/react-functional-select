import React, { memo } from 'react';
import LoadingDots from './LoadingDots';
import ClearSvgIcon from './ClearSvgIcon';
import styled, { css } from 'styled-components';
import { IconRenderer, IndicatorIconsProps } from '../../types';
import { CARET_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../../constants';

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
  const customIconContext =
    (typeof caretIcon === 'function' || typeof clearIcon === 'function')
      ? { menuOpen, isLoading: !!isLoading, isInvalid: !!isInvalid, isDisabled: !!isDisabled }
      : undefined;

  const renderIconFn = (renderer: IconRenderer) => {
    return typeof renderer === 'function'
      ? renderer(customIconContext)
      : renderer;
  };

  return (
    <IndicatorIconsWrapper>
      {(showClear && !isLoading) && (
        <IndicatorIcon
          onTouchEnd={onClearMouseDown}
          onMouseDown={onClearMouseDown}
          data-testid={CLEAR_ICON_TESTID}
        >
          {renderIconFn(clearIcon) || <ClearSvgIcon />}
        </IndicatorIcon>
      )}
      {isLoading && (loadingNode || <LoadingDots />)}
      <Separator />
      <IndicatorIcon
        onTouchEnd={onCaretMouseDown}
        onMouseDown={onCaretMouseDown}
        data-testid={CARET_ICON_TESTID}
      >
        {renderIconFn(caretIcon) || (
          <Caret
            aria-hidden='true'
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