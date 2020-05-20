import React, { ReactNode } from 'react';
import LoadingDots from './LoadingDots';
import styled, { css } from 'styled-components';
import { CaretProps, IndicatorIconsProps } from '../types';
import { CLEAR_ICON_CLS, CARET_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../constants/dom';

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
  ${({ theme: { icon }}) => `
    color: ${icon.color};
    padding: ${icon.padding};
    :hover {
      color: ${icon.hoverColor};
    }
  `}
  ${({ theme }) => theme.icon.css}
`;

const ClearSVG = styled.svg`
  fill: currentColor;
  animation: ${({ theme }) => css`${theme.icon.clear.animation}`};
  ${({ theme: { icon: { clear }}}) => `
    width: ${clear.width};
    height: ${clear.height};
    transition: ${clear.transition};
  `}
`;

const Caret = styled.div<CaretProps>`
  ${({ theme: { icon: { caret }}}) => `
    transition: ${caret.transition};
    border-top: ${caret.size} dashed;
    border-left: ${caret.size} solid transparent;
    border-right: ${caret.size} solid transparent;
  `}

  ${({ menuOpen, isInvalid, theme: { color }}) =>
    menuOpen
    && `
      transform: rotate(180deg);
      color: ${(isInvalid ? color.danger : (color.caretActive || color.primary))};
    `}
`;

const Separator = styled.div`
  width: 1px;
  margin: 0.5rem 0;
  align-self: stretch;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.iconSeparator || theme.color.border};
`;

const IndicatorIcons = React.memo<IndicatorIconsProps>(({
  menuOpen,
  clearIcon,
  caretIcon,
  isInvalid,
  showClear,
  isLoading,
  isDisabled,
  loadingNode,
  isTouchDevice,
  addClassNames,
  onCaretMouseDown,
  onClearMouseDown
}) => {
  const forwardState =
    (typeof caretIcon === 'function' || typeof clearIcon === 'function')
      ? { menuOpen, isLoading: !!isLoading, isInvalid: !!isInvalid, isDisabled: !!isDisabled }
      : undefined;

  const renderCustomIcon = (iconProp: IndicatorIconsProps['caretIcon']): ReactNode => {
    return (typeof iconProp === 'function')
      ? iconProp(forwardState)
      : iconProp;
  };

  return (
    <IndicatorIconsWrapper>
      {(showClear && !isLoading) && (
        <IndicatorIcon
          onMouseDown={onClearMouseDown}
          data-testid={CLEAR_ICON_TESTID}
          onTouchEnd={isTouchDevice ? onClearMouseDown : undefined}
        >
          {renderCustomIcon(clearIcon) || (
            <ClearSVG
              aria-hidden='true'
              viewBox='0 0 14 16'
              className={addClassNames ? CLEAR_ICON_CLS : undefined}
            >
              <path
                fillRule='evenodd'
                d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'
              />
            </ClearSVG>
          )}
        </IndicatorIcon>
      )}
      {isLoading && (loadingNode || <LoadingDots addClassNames={addClassNames} />)}
      <Separator />
      <IndicatorIcon
        onMouseDown={onCaretMouseDown}
        data-testid={CARET_ICON_TESTID}
        onTouchEnd={isTouchDevice ? onCaretMouseDown : undefined}
      >
        {renderCustomIcon(caretIcon) || (
          <Caret
            aria-hidden='true'
            menuOpen={menuOpen}
            isInvalid={isInvalid}
            className={addClassNames ? CARET_ICON_CLS : undefined}
          />
        )}
      </IndicatorIcon>
    </IndicatorIconsWrapper>
  );
});

IndicatorIcons.displayName = 'IndicatorIcons';

export default IndicatorIcons;
