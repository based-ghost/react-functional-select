import React, { Fragment, type ReactNode, type FunctionComponent } from 'react';
import MultiValue from './MultiValue';
import { isArrayWithLength } from '../../utils';
import styled, { css } from 'styled-components';
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

const SINGLE_VALUE_BASE_STYLE = css`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`;

const SingleValue = styled.div`
  ${SINGLE_VALUE_BASE_STYLE}
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div`
  ${SINGLE_VALUE_BASE_STYLE}
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
