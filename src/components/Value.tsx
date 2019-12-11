import React, { Fragment } from 'react';
import { ValueProps } from '../types';
import MultiValue from './MultiValue';
import styled from 'styled-components';
import { isArrayWithLength } from '../utils';

const SingleValue = styled.div`
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
  isMulti,
  inputValue,
  placeholder,
  selectedOption,
  focusedMultiValue,
  renderOptionLabel,
  removeSelectedOption,
}) => {
  if (inputValue && (!isMulti || (isMulti && !isArrayWithLength(selectedOption)))) {
    return null;
  }

  if (!isArrayWithLength(selectedOption)) {
    return (
      <Placeholder>{placeholder}</Placeholder>
    );
  }

  if (!isMulti) {
    return (
      <SingleValue>
        {renderOptionLabel(selectedOption[0].data)}
      </SingleValue>
    );
  }
    
  return (
    <Fragment>
      {selectedOption.map(({ data, value }) => (
        <MultiValue
          key={value}
          data={data}
          value={value}
          renderOptionLabel={renderOptionLabel}
          isFocused={(value === focusedMultiValue)}
          removeSelectedOption={removeSelectedOption}
        />
      ))}
    </Fragment>
  );
});

Value.displayName = 'Value';

export default Value;
