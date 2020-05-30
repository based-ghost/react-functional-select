import React, { Fragment } from 'react';
import { ValueProps } from '../types';
import MultiValue from './MultiValue';
import styled from 'styled-components';
import { isArrayWithLength } from '../utils';

const SingleValue = styled.div`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.color.placeholder};
`;

const Value = React.memo<ValueProps>(({
  isMulti,
  inputValue,
  placeholder,
  isTouchDevice,
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
    const optionLabel = renderOptionLabel(selectedOption[0].data);
    return <SingleValue>{optionLabel}</SingleValue>;
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
              isTouchDevice={isTouchDevice}
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
