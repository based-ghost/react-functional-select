import React, { Fragment, type ReactNode, type FunctionComponent } from 'react';
import MultiValue from './MultiValue';
import styled from 'styled-components';
import { isArrayWithLength } from '../../utils';
import type { MultiParams, SelectedOption, RenderLabelCallback } from '../../types';

type ValueProps = Readonly<{
  isMulti?: boolean;
  inputValue: string;
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

const Value: FunctionComponent<ValueProps> = ({
  isMulti,
  inputValue,
  placeholder,
  selectedOption,
  focusedMultiValue,
  renderOptionLabel,
  renderMultiOptions,
  removeSelectedOption
}) => {
  const noSelectedOpts = !isArrayWithLength(selectedOption);
  if (inputValue && (!isMulti || (isMulti && (noSelectedOpts || renderMultiOptions)))) {
    return null;
  }

  if (noSelectedOpts) {
    return <Placeholder>{placeholder}</Placeholder>;
  }

  if (!isMulti) {
    const labelNode = renderOptionLabel(selectedOption[0].data);
    return <SingleValue>{labelNode}</SingleValue>;
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
};

export default Value;
