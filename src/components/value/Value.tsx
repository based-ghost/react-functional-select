import React, { memo, Fragment } from 'react';
import MultiValue from './MultiValue';
import { isArrayWithLength } from '../../utils';
import styled, { css } from 'styled-components';
import { useFirstRenderState } from '../../hooks';

import type { MultiParams } from '../../Select';
import type { ReactNode, ReactText } from 'react';
import type { SelectedOption, RenderLabelCallback } from '../../types';

type PlaceholderProps = Readonly<{
  isFirstRender: boolean;
}>;

export type ValueProps = Readonly<{
  isMulti?: boolean;
  inputValue: string;
  placeholder: string;
  selectedOption: SelectedOption[];
  focusedMultiValue: ReactText | null;
  renderOptionLabel: RenderLabelCallback;
  removeSelectedOption: (value?: ReactText) => void;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
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

const Placeholder = styled.div<PlaceholderProps>`
  ${_singleValueBaseStyle}
  color: ${({ theme }) => theme.color.placeholder};
  ${({ theme, isFirstRender }) => !isFirstRender && css`animation: ${theme.placeholder.animation};`}
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
  // Do not apply Placeholder animation on initial render/mount of component
  const isFirstRender = useFirstRenderState();

  if (
    inputValue &&
    (!isMulti || (isMulti && (!isArrayWithLength(selectedOption) || renderMultiOptions)))
  ) {
    return null;
  }

  if (!isArrayWithLength(selectedOption)) {
    return (
      <Placeholder isFirstRender={isFirstRender}>
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
});

Value.displayName = 'Value';

export default Value;
