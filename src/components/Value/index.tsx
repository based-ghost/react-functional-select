import React, { memo, Fragment, type ReactNode } from 'react';
import MultiValue from './MultiValue';
import styled from 'styled-components';
import type { MultiParams, SelectedOption, RenderLabelCallback } from '../../types';

type ValueProps = Readonly<{
  isMulti?: boolean;
  hasInput: boolean;
  placeholder: string;
  selectedOption: SelectedOption[];
  focusedMultiValue: string | number | null;
  renderOptionLabel: RenderLabelCallback;
  removeSelectedOption: (value?: string | number) => void;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
}>;

const SingleValue = styled.div`
  margin: 0 2px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  grid-area: 1 / 1 / 2 / 3;
`;

const Placeholder = styled(SingleValue)`
  color: ${({ theme }) => theme.color.placeholder};
`;

const Value = memo<ValueProps>(({
  isMulti,
  hasInput,
  placeholder,
  selectedOption,
  focusedMultiValue,
  renderOptionLabel,
  renderMultiOptions,
  removeSelectedOption
}) => {
  if (hasInput && (!isMulti || (isMulti && (!selectedOption.length || renderMultiOptions)))) {
    return null;
  }

  if (!selectedOption.length) {
    return <Placeholder>{placeholder}</Placeholder>;
  }

  if (!isMulti) {
    const label = renderOptionLabel(selectedOption[0].data);
    return <SingleValue>{label}</SingleValue>;
  }

  return (
    <Fragment>
      {renderMultiOptions
        ? renderMultiOptions({ renderOptionLabel, selected: selectedOption })
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
