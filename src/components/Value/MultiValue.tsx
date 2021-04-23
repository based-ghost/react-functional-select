import React, { memo } from 'react';
import { suppressEvent } from '../../utils';
import styled, { css } from 'styled-components';
import { CLEAR_ICON_MV_TESTID } from '../../constants';

import type { ReactText } from 'react';
import type { RenderLabelCallback, SelectedOption } from '../../types';

export type MultiValueProps = SelectedOption & Readonly<{
  isFocused: boolean;
  renderOptionLabel: RenderLabelCallback;
  removeSelectedOption: (value?: ReactText) => void;
}>;

const CLEAR_ICON_FOCUS_STYLE  = css`
  z-index: 5000;
  transform: scale(1.26);
  color: ${({ theme }) => theme.multiValue.clear.focusColor};
`;

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;
  ${({ theme: { multiValue } }) => css`
    margin: ${multiValue.margin};
    animation: ${multiValue.animation};
    border-radius: ${multiValue.borderRadius};
    background-color: ${multiValue.backgroundColor};
  `}
  ${({ theme }) => theme.multiValue.css}
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${({ theme }) => theme.multiValue.label.padding};
  font-size: ${({ theme }) => theme.multiValue.label.fontSize};
  border-radius: ${({ theme }) => theme.multiValue.label.borderRadius};
`;

const Clear = styled.i<Pick<MultiValueProps, 'isFocused'>>`
  display: flex;
  font-style: inherit;
  ${({ theme: { multiValue: { clear } } }) => css`
    color: ${clear.color};
    padding: ${clear.padding};
    font-size: ${clear.fontSize};
    align-self: ${clear.alignSelf};
    transition: ${clear.transition};
    font-weight: ${clear.fontWeight};

    :hover {
      ${CLEAR_ICON_FOCUS_STYLE}
    }
  `}
   ${({ isFocused }) => isFocused && CLEAR_ICON_FOCUS_STYLE}
`;

const MultiValue = memo<MultiValueProps>(({
  data,
  value,
  isFocused,
  renderOptionLabel,
  removeSelectedOption
}) => {
  const onClearEvent = () => removeSelectedOption(value);

  return (
    <MultiValueWrapper>
      <Label>
        {renderOptionLabel(data)}
      </Label>
      <Clear
        isFocused={isFocused}
        onClick={onClearEvent}
        onTouchEnd={onClearEvent}
        onMouseDown={suppressEvent}
        data-testid={CLEAR_ICON_MV_TESTID}
      >
        ✖
      </Clear>
    </MultiValueWrapper>
  );
});

MultiValue.displayName = 'MultiValue';

export default MultiValue;
