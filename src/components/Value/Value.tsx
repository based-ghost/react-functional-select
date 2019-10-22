import React from 'react';
import { ValueProps } from '../../types/index.';
import styled, { css } from 'styled-components';

const _valueDivCss = css`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`;

const StyledValue = styled.div`
  ${_valueDivCss}
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div`
  ${_valueDivCss}
  color: ${({ theme }) => theme.color.placeholder};
`;

const Value = React.memo<ValueProps>(({
  inputValue,
  placeholder,
  renderOptionLabel,
  selectedOptionData,
}) => {
  if (inputValue) {
    return null;
  }

  if (!selectedOptionData) {
    return (
      <Placeholder>{placeholder}</Placeholder>
    );
  }
    
  return (
    <StyledValue>
      {renderOptionLabel(selectedOptionData)}
    </StyledValue>
  );
});

Value.displayName = 'Value';

export default Value;
