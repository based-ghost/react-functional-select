import React, { memo, Fragment } from 'react';
import { ValueProps } from '../types';
import MultiValue from './MultiValue';
import styled from 'styled-components';
import { isArrayWithLength } from '../utils';
import { SINGLE_VALUE_BASE_STYLE } from '../constants/styled';

const SingleValue = styled.div`
  ${SINGLE_VALUE_BASE_STYLE}
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div`
  ${SINGLE_VALUE_BASE_STYLE}
  color: ${({ theme }) => theme.color.placeholder};
`;

const Value = memo<ValueProps>(({
  isMulti,
  inputValue,
  placeholder,
  selectedOption,
  focusedMultiValue,
  renderOptionLabel,
  renderMultiOptions,
  removeSelectedOption
}) => {
  if (
    inputValue &&
    (!isMulti || (isMulti && (!isArrayWithLength(selectedOption) || renderMultiOptions)))
  ) {
    return null;
  }

  if (!isArrayWithLength(selectedOption)) {
    return <Placeholder>{placeholder}</Placeholder>;
  }

  if (!isMulti) {
    return <SingleValue>{renderOptionLabel(selectedOption[0].data)}</SingleValue>;
  }

  return (
    <Fragment>
      {renderMultiOptions
        ? renderMultiOptions({ selected: selectedOption, renderOptionLabel })
        : selectedOption.map(({ data, value }) => (
            <MultiValue
              key={value}
              data={data}
              value={value}
              renderOptionLabel={renderOptionLabel}
              isFocused={value === focusedMultiValue}
              removeSelectedOption={removeSelectedOption}
            />
          ))}
    </Fragment>
  );
});

Value.displayName = 'Value';

export default Value;
