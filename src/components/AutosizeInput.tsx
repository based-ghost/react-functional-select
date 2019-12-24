import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import { isEdgeOrIE } from '../utils';
import styled from 'styled-components';
import { AutosizeInputProps, AutosizeInputHTMLAttributes } from '../types';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../constants/dom';

const INPUT_MIN_WIDTH_PX = 2;
const WRAPPER_DIV_STYLE: CSSProperties = {
  display: 'inline-block'
};

const STATIC_ATTRIBUTES = Object.freeze<AutosizeInputHTMLAttributes>({
  type: 'text',
  spellCheck: false,
  autoCorrect: 'off',
  autoComplete: 'off',
  autoCapitalize: 'none',
  'aria-autocomplete': 'list',
  'data-testid': AUTOSIZE_INPUT_TESTID
});

const SizerDiv = styled.div`
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

const Input = styled.input`
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
    isEdgeOrIE()
    && (`
      ::-ms-clear {
        display: none;
      }
    `)}
`;

const AutosizeInput = React.memo(React.forwardRef<HTMLInputElement, AutosizeInputProps>((
  {
    id,
    onBlur,
    onFocus,
    readOnly,
    onChange,
    ariaLabel,
    inputValue,
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
    ...STATIC_ATTRIBUTES,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    style: {
      width: inputWidth
    }
  };

  return (
    <div style={WRAPPER_DIV_STYLE}>
      <Input
        id={id}
        ref={ref}
        onBlur={onBlur}
        onFocus={onFocus}
        value={inputValue}
        readOnly={readOnly}
        {...inputAttributes}
        onChange={!readOnly ? onChange : undefined}
        className={addClassNames ? AUTOSIZE_INPUT_CLS : undefined}
      />
      <SizerDiv ref={sizerRef}>{inputValue}</SizerDiv>
    </div>
  );
}));

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;