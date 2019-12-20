import React from 'react';
import styled from 'styled-components';
import { MultiValueProps } from '../types';
import { FADE_IN_ANIMATION_CSS } from '../constants/styled';

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;
  ${FADE_IN_ANIMATION_CSS}
  margin: ${({ theme }) => theme.multiValue.margin};
  border-radius: ${({ theme }) => theme.multiValue.borderRadius};
  background-color: ${({ theme }) => theme.multiValue.backgroundColor};
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${({ theme }) => theme.multiValue.label.padding};
  font-size: ${({ theme }) => theme.multiValue.label.fontSize};
  border-radius: ${({ theme }) => theme.multiValue.label.borderRadius};
`;

const Clear = styled.div<{ isFocused: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.multiValue.clear.padding};
  font-size: ${({ theme }) => theme.multiValue.clear.fontSize};
  transition: ${({ theme }) => theme.multiValue.clear.transition};
  align-items: ${({ theme }) => theme.multiValue.clear.alignItems};
  font-weight: ${({ theme }) => theme.multiValue.clear.fontWeight};
  border-radius: ${({ theme }) => theme.multiValue.clear.borderRadius};
  background-color: ${({ theme, isFocused }) => isFocused ? theme.color.dangerLight : 'transparent'};
  
  :hover {
    color: ${({ theme }) => theme.color.danger};
    background-color: ${({ theme }) => theme.color.dangerLight};
  }
`;

const MultiValue: React.FC<MultiValueProps> = ({
  data,
  value,
  isFocused,
  renderOptionLabel,
  removeSelectedOption,
}) => (
  <MultiValueWrapper>
    <Label>{renderOptionLabel(data)}</Label>
    <Clear
      aria-hidden='true'
      isFocused={isFocused}
      onTouchEnd={(e) => removeSelectedOption(value, e)}
      onMouseDown={(e) => removeSelectedOption(value, e)}
    >X</Clear>
  </MultiValueWrapper>
);

export default MultiValue;
