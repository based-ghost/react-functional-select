import React from 'react';
import styled from 'styled-components';
import LoadingDots from './LoadingDots';
import { CaretProps, IndicatorIconsProps } from '../types';
import { FADE_IN_ANIMATION_CSS } from '../constants/styled';
import { CLEAR_ICON_CLS, CARET_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../constants/dom';

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
  ${({ theme: { icon }}) => (`
    color: ${icon.color};
    padding: ${icon.padding};
    :hover {
      color: ${icon.hoverColor};
    }
  `)}
`;

const Clear = styled.div`
  overflow: hidden;
  ${FADE_IN_ANIMATION_CSS}
  ${({ theme: { icon: { clear }}}) => (`
    font-size: ${clear.fontSize};
    transition: ${clear.transition};
    font-weight: ${clear.fontWeight};
    font-family: ${clear.fontFamily};
  `)}
`;

const Caret = styled.div<CaretProps>`
  ${({ theme: { icon: { caret }}}) => (`
    transition: ${caret.transition};
    border-top: ${caret.size} dashed;
    border-left: ${caret.size} solid transparent;
    border-right: ${caret.size} solid transparent;
  `)}

  ${({ menuOpen, isInvalid, theme: { color }}) =>
    menuOpen
    && (`
      transform: rotate(180deg);
      color: ${(isInvalid ? color.danger : (color.caretActive || color.primary))};
    `)}
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
  loadingNode,
  addClassNames,
  onCaretMouseDown,
  onClearMouseDown
}) => (
  <IndicatorIconsWrapper>
    {(showClear && !isLoading) && (
      <IndicatorIcon
        aria-hidden='true'
        onTouchEnd={onClearMouseDown}
        onMouseDown={onClearMouseDown}
        data-testid={CLEAR_ICON_TESTID}
      >
        {clearIcon || <Clear className={addClassNames ? CLEAR_ICON_CLS : undefined}>X</Clear>}
      </IndicatorIcon>
    )}
    {isLoading && (loadingNode || <LoadingDots />)}
    <Separator />
    <IndicatorIcon
      aria-hidden='true'
      onTouchEnd={onCaretMouseDown}
      onMouseDown={onCaretMouseDown}
      data-testid={CARET_ICON_TESTID}
    >
      {caretIcon || (
        <Caret
          menuOpen={menuOpen}
          isInvalid={isInvalid}
          className={addClassNames ? CARET_ICON_CLS : undefined}
        />
      )}
    </IndicatorIcon>
  </IndicatorIconsWrapper>
));

IndicatorIcons.displayName = 'IndicatorIcons';

export default IndicatorIcons;
