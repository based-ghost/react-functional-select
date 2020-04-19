import React, { useEffect, useState, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { isBrowserIE } from '../utils';
import { AutosizeInputProps, AutosizeInputHTMLAttributes } from '../types';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../constants/dom';

const INPUT_MIN_WIDTH_PX = 2;

const STATIC_ATTRIBUTES: AutosizeInputHTMLAttributes = {
  type: 'text',
  spellCheck: false,
  autoCorrect: 'off',
  autoComplete: 'off',
  autoCapitalize: 'none',
  'aria-autocomplete': 'list',
  'data-testid': AUTOSIZE_INPUT_TESTID
};

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
  ${({ theme }) => theme.input.css}
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

  ${({ theme }) => theme.input.css}
  ${() => isBrowserIE() && '::-ms-clear { display: none; }'}
`;

const AutosizeInput = React.memo(
  React.forwardRef<HTMLInputElement, AutosizeInputProps>(
    (
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
      ref: React.Ref<HTMLInputElement>
    ) => {
      const sizerRef = useRef<HTMLDivElement | null>(null);
      const [inputWidth, setInputWidth] = useState<number>(INPUT_MIN_WIDTH_PX);

      const autosizeInputAttrs: AutosizeInputHTMLAttributes = {
        ...STATIC_ATTRIBUTES,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      };

      useEffect(() => {
        if (sizerRef.current) {
          setInputWidth(sizerRef.current.scrollWidth + INPUT_MIN_WIDTH_PX);
        }
      }, [inputValue]);

      return (
        <Fragment>
          <Input
            id={id}
            ref={ref}
            onBlur={onBlur}
            onFocus={onFocus}
            value={inputValue}
            readOnly={readOnly}
            {...autosizeInputAttrs}
            style={{ width: inputWidth }}
            onChange={!readOnly ? onChange : undefined}
            className={addClassNames ? AUTOSIZE_INPUT_CLS : undefined}
          />
          <SizerDiv ref={sizerRef}>{inputValue}</SizerDiv>
        </Fragment>
      );
    }
  )
);

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;