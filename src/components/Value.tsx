import React from 'react';
import { ValueProps } from '../types';
import styled from 'styled-components';

const StyledValue = styled.div`
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div`
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.color.placeholder};
`;

const Value = React.memo<ValueProps>(({
  inputValue,
  placeholder,
  selectedOption,
  renderOptionLabel,
}) => {
  if (inputValue) {
    return null;
  }

  if (!selectedOption.data) {
    return (
      <Placeholder>{placeholder}</Placeholder>
    );
  }
    
  return (
    <StyledValue>
      {renderOptionLabel(selectedOption.data)}
    </StyledValue>
  );
});

Value.displayName = 'Value';

export default Value;
