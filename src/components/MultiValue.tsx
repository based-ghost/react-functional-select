import React, { FunctionComponent } from 'react';
import { MultiValueProps } from '../types';
import styled, { css } from 'styled-components';
import { CLEAR_ICON_MV_TESTID } from '../constants/dom';

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;

  ${({ theme: { multiValue } }) => css`
    margin: ${multiValue.margin};
    animation: ${multiValue.animation};
    border-radius: ${multiValue.borderRadius};
    background-color: ${multiValue.backgroundColor};
  `}

  ${({ theme }) => theme.multiValue.css}
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${({ theme }) => theme.multiValue.label.padding};
  font-size: ${({ theme }) => theme.multiValue.label.fontSize};
  border-radius: ${({ theme }) => theme.multiValue.label.borderRadius};
`;

const Clear = styled.div<Pick<MultiValueProps, 'isFocused'>>`
  display: flex;

  ${({
    isFocused,
    theme: {
      color,
      multiValue: { clear }
    }
  }) => css`
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
