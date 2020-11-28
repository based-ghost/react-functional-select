import React, { FunctionComponent } from 'react';
import { MultiValueProps } from '../types';
import styled, { css } from 'styled-components';
import { CLEAR_ICON_MV_TESTID } from '../constants/dom';

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;
  animation: ${({ theme }) => css`${theme.multiValue.animation}`};
  ${({ theme: { multiValue }}) => `
    margin: ${multiValue.margin};
    border-radius: ${multiValue.borderRadius};
    background-color: ${multiValue.backgroundColor};
  `}
  ${({ theme }) => theme.multiValue.css}
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme: { multiValue: { label }}}) => `
    padding: ${label.padding};
    font-size: ${label.fontSize};
    border-radius: ${label.borderRadius};
  `}
`;

const Clear = styled.div<{ isFocused: boolean }>`
  display: flex;
  ${({ isFocused, theme: { color, multiValue: { clear }}}) => `
    padding: ${clear.padding};
    font-size: ${clear.fontSize};
    transition: ${clear.transition};
    align-items: ${clear.alignItems};
    font-weight: ${clear.fontWeight};
    border-radius: ${clear.borderRadius};
    background-color: ${isFocused ? color.dangerLight : 'transparent'};
    :hover {
      color: ${color.danger};
      background-color: ${color.dangerLight};
    }
  `}
`;

const MultiValue: FunctionComponent<MultiValueProps> = ({
  data,
  value,
  isFocused,
  renderOptionLabel,
  removeSelectedOption
}) => (
  <MultiValueWrapper>
    <Label>{renderOptionLabel(data)}</Label>
    <Clear
      isFocused={isFocused}
      data-testid={CLEAR_ICON_MV_TESTID}
      onTouchEnd={(e) => removeSelectedOption(value, e)}
      onMouseDown={(e) => removeSelectedOption(value, e)}
    >X</Clear>
  </MultiValueWrapper>
);

export default MultiValue;
