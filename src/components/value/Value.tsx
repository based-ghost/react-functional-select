import React, { Fragment } from 'react';
import MultiValue from './MultiValue';
import { isArrayWithLength } from '../../utils';
import styled, { css } from 'styled-components';

import type { MultiParams } from '../../Select';
import type { ReactNode, ReactText, FunctionComponent } from 'react';
import type { OptionData, MouseOrTouchEvent, SelectedOption } from '../../types';

export type ValueProps = Readonly<{
  isMulti?: boolean;
  inputValue: string;
  placeholder: string;
  selectedOption: SelectedOption[];
  focusedMultiValue: ReactText | null;
  renderOptionLabel: (data: OptionData) => ReactNode;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
  removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLElement>) => void;
}>;

const _singleValueBaseStyle = css`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`;

const SingleValue = styled.div`
  ${_singleValueBaseStyle}
  max-width: calc(100% - 0.5rem);
`;

const Placeholder = styled.div<Pick<ValueProps, 'isMulti'>>`
  ${_singleValueBaseStyle}
  color: ${({ theme }) => theme.color.placeholder};
  ${({ theme, isMulti }) => isMulti && css`animation: ${theme.multiValue.animation};`}
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
  if (
    inputValue &&
    (!isMulti || (isMulti && (!isArrayWithLength(selectedOption) || renderMultiOptions)))
  ) {
    return null;
  }

  if (!isArrayWithLength(selectedOption)) {
    return (
      <Placeholder isMulti={isMulti}>
        {placeholder}
      </Placeholder>
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
