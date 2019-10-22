import React from 'react';
import LoadingDots from './LoadingDots';
import styled, { css } from 'styled-components';
import { fadeInAnimationCss } from '../constants/styled';
import { CaretProps, IndicatorIconsProps } from '../types';
import { CLEAR_ICON_CLS, CARET_ICON_CLS, CLEAR_ICON_TESTID } from '../constants/attributes';

const IndicatorIconsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`;

const IndicatorIcon = styled.div`
  display: flex;
  box-sizing: border-box;
  color: ${({ theme }) => theme.icon.color};
  padding: ${({ theme }) => theme.icon.padding};

  :hover {
    color: ${({ theme }) => theme.icon.hoverColor};
  }
`;

const Clear = styled.div`
  overflow: hidden;
  ${fadeInAnimationCss}
  font-size: ${({ theme }) => theme.icon.clear.fontSize};
  transition: ${({ theme }) => theme.icon.clear.transition};
  font-weight: ${({ theme }) => theme.icon.clear.fontWeight};
  font-family: ${({ theme }) => theme.icon.clear.fontFamily};
`;

const Caret = styled.div<CaretProps>`
  transition: ${({ theme }) => theme.icon.caret.transition};
  border-top: ${({ theme }) => theme.icon.caret.size} dashed;
  border-left: ${({ theme }) => theme.icon.caret.size} solid transparent;
  border-right: ${({ theme }) => theme.icon.caret.size} solid transparent;

  ${({ menuOpen, isInvalid, theme: { color } }) => 
    menuOpen && 
    css`
      transform: rotate(180deg);
      color: ${isInvalid ? color.invalid : (color.caretActive || color.accent)};
    `}
`;

const Separator = styled.div`
  width: 1px;
  margin: 0.5rem 0;
  align-self: stretch;
  box-sizing: border-box;
  background-color: ${({ theme: { color } }) => color.iconSeparator || color.border};
`;

const IndicatorIcons = React.memo<IndicatorIconsProps>(({
  menuOpen,
  clearIcon,
  caretIcon,
  isInvalid,
  showClear,
  isLoading,
  addClassNames,
  onClearMouseDown,
}) => {
  const clearClassName = (addClassNames && !clearIcon) ? CLEAR_ICON_CLS : undefined;
  const caretClassName = (addClassNames && !caretIcon) ? CARET_ICON_CLS : undefined;

  return (
    <IndicatorIconsWrapper>
      {(showClear && !isLoading) && (
        <IndicatorIcon
          aria-hidden='true'
          onTouchEnd={onClearMouseDown}
          onMouseDown={onClearMouseDown}
          data-testid={CLEAR_ICON_TESTID}
        >
          {clearIcon ? clearIcon : <Clear className={clearClassName}>X</Clear>}
        </IndicatorIcon>
      )}
      {isLoading && <LoadingDots />}
      <Separator />
      <IndicatorIcon aria-hidden='true'>
        {caretIcon ? (
          caretIcon
        ) : (
          <Caret
            menuOpen={menuOpen}
            isInvalid={isInvalid}
            className={caretClassName}
          />
        )}
      </IndicatorIcon>
    </IndicatorIconsWrapper>
  );
});

IndicatorIcons.displayName = 'IndicatorIcons';

export default IndicatorIcons;
