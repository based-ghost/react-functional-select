import React from 'react';
import styled from 'styled-components';
import { MultiValueProps } from '../types';
import { fadeInAnimationCss } from '../constants/styled';

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;
  margin: ${({ theme }) => theme.multiValue.margin};
  border-radius: ${({ theme }) => theme.multiValue.borderRadius};
  background-color: ${({ theme }) => theme.multiValue.backgroundColor};
  ${fadeInAnimationCss}
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${({ theme }) => theme.multiValue.label.padding};
  font-size: ${({ theme }) => theme.multiValue.label.fontSize};
  border-radius: ${({ theme }) => theme.multiValue.label.borderRadius};
`;

const Clear = styled.div`
  display: flex;
  opacity: ${({ theme }) => theme.multiValue.clear.opacity};
  padding: ${({ theme }) => theme.multiValue.clear.padding};
  font-size: ${({ theme }) => theme.multiValue.clear.fontSize};
  transition: ${({ theme }) => theme.multiValue.clear.transition};
  align-items: ${({ theme }) => theme.multiValue.clear.alignItems};
  font-weight: ${({ theme }) => theme.multiValue.clear.fontWeight};
  border-radius: ${({ theme }) => theme.multiValue.clear.borderRadius};

  :hover {
    opacity: 1;
    color: ${({ theme }) => theme.color.danger};
    background-color: ${({ theme }) => theme.color.dangerLight};
  }
`;

const MultiValue = React.memo<MultiValueProps>(({
  data,
  value,
  renderOptionLabel,
  removeSelectedOption,
}) => (
  <MultiValueWrapper>
    <Label>{renderOptionLabel(data)}</Label>
    <Clear
      aria-hidden='true'
      onTouchEnd={(e) => removeSelectedOption(value, e)}
      onMouseDown={(e) => removeSelectedOption(value, e)}
    >X</Clear>
  </MultiValueWrapper>
));

MultiValue.displayName = 'MultiValue';

export default MultiValue;
