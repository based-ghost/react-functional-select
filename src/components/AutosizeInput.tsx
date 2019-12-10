import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import { isEdgeOrIE } from '../utils';
import styled, { css } from 'styled-components';
import { AutosizeInputProps, AutosizeInputHTMLAttributes } from '../types';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../constants/dom';

const INPUT_MIN_WIDTH_PX = 2;

const WRAPPER_DIV_STYLE = Object.freeze<CSSProperties>({
  display: 'inline-block'
});

const _inputStaticAttributes = Object.freeze<AutosizeInputHTMLAttributes>({
  type: 'text',
  spellCheck: false,
  autoCorrect: 'off',
  autoComplete: 'off',
  autoCapitalize: 'none',
  'aria-autocomplete': 'list',
  'data-testid': AUTOSIZE_INPUT_TESTID
});

const StyledSizer = styled.div`
  top: 0;
  left: 0;
  height: 0;
  overflow: scroll;
  white-space: pre;
  position: absolute;
  visibility: hidden;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
`;

const StyledAutosizeInput = styled.input`
  border: 0;
  outline: 0;
  padding: 0;
  cursor: text;
  background: 0;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  box-sizing: content-box;

  :read-only {
    opacity: 0;
    cursor: default;
  }

  ${() =>
    isEdgeOrIE() &&
    css`
      ::-ms-clear {
        display: none;
      }
    `}
`;

const AutosizeInput = React.memo(React.forwardRef<HTMLInputElement, AutosizeInputProps>((
  {
    id,
    onBlur,
    onFocus,
    onChange,
    disabled,
    ariaLabel,
    inputValue,
    isSearchable,
    addClassNames,
    ariaLabelledBy,
  },
  ref: React.Ref<HTMLInputElement>,
) => {
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const [inputWidth, setInputWidth] = useState<number>(INPUT_MIN_WIDTH_PX);

  useEffect(() => {
    if (sizerRef.current) {
      setInputWidth(sizerRef.current.scrollWidth + INPUT_MIN_WIDTH_PX);
    }
  }, [inputValue]);

  const inputAttributes: AutosizeInputHTMLAttributes = {
    ..._inputStaticAttributes,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    style: {
      width: inputWidth
    }
  };

  return (
    <div style={WRAPPER_DIV_STYLE}>
      <StyledAutosizeInput
        id={id}
        ref={ref}
        onBlur={onBlur}
        onFocus={onFocus}
        value={inputValue}
        disabled={disabled}
        {...inputAttributes}
        readOnly={!isSearchable}
        onChange={isSearchable ? onChange : undefined}
        className={addClassNames ? AUTOSIZE_INPUT_CLS : undefined}
      />
      <StyledSizer ref={sizerRef}>{inputValue}</StyledSizer>
    </div>
  );
}));

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;