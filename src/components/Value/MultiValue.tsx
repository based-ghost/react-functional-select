import React, { type FunctionComponent } from 'react';
import { suppressEvent } from '../../utils';
import styled, { css } from 'styled-components';
import { CLEAR_ICON_MV_TESTID } from '../../constants';
import type { RenderLabelCallback, SelectedOption } from '../../types';

type MultiValueProps = SelectedOption & Readonly<{
  isFocused: boolean;
  renderOptionLabel: RenderLabelCallback;
  removeSelectedOption: (value?: string | number) => void;
}>;

type ClearProps = Pick<MultiValueProps, 'isFocused'>;

const CLEAR_ICON_FOCUS_STYLE  = css`
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

const Clear = styled.i<ClearProps>`
  display: flex;
  font-style: inherit;
  ${({ theme: { multiValue: { clear } } }) => css`
    color: ${clear.color};
    padding: ${clear.padding};
    font-size: ${clear.fontSize};
    align-self: ${clear.alignSelf};
    transition: ${clear.transition};
    font-weight: ${clear.fontWeight};

    &:hover {
      ${CLEAR_ICON_FOCUS_STYLE}
    }
  `}
   ${({ isFocused }) => isFocused && CLEAR_ICON_FOCUS_STYLE}
`;

const MultiValue: FunctionComponent<MultiValueProps> = ({
  data,
  value,
  isFocused,
  renderOptionLabel,
  removeSelectedOption
}) => {
  const onClear = () => removeSelectedOption(value);

  return (
    <MultiValueWrapper>
      <Label>
        {renderOptionLabel(data)}
      </Label>
      <Clear
        onClick={onClear}
        onTouchEnd={onClear}
        isFocused={isFocused}
        onMouseDown={suppressEvent}
        data-testid={CLEAR_ICON_MV_TESTID}
      >
        &#10006;
      </Clear>
    </MultiValueWrapper>
  );
};

export default MultiValue;
