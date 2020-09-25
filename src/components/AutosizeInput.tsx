import React, { useState, useRef, Fragment } from 'react';
import { isArrayWithLength, isEdgeOrIE } from '../utils';
import styled from 'styled-components';
import { useUpdateEffect } from '../hooks';
import { AutosizeInputProps, AutosizeInputHTMLAttributes } from '../types';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../constants/dom';

const INPUT_MIN_WIDTH = 2;

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

const Input = styled.input<{ isInvalid?: boolean }>`
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

  :required {
    ${({ theme, isInvalid }) => isInvalid && theme.input.cssRequired}
  }

  ${({ theme }) => theme.input.css}
  ${isEdgeOrIE() && '::-ms-clear{display:none;}'}
`;

const AutosizeInput = React.memo(
  React.forwardRef<HTMLInputElement, AutosizeInputProps>((
    {
      id,
      onBlur,
      onFocus,
      readOnly,
      required,
      onChange,
      ariaLabel,
      inputValue,
      addClassNames,
      ariaLabelledBy,
      selectedOption
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const sizerRef = useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = useState<number>(INPUT_MIN_WIDTH);
    const isInvalid = required && !isArrayWithLength(selectedOption);

    const autosizeInputAttrs: AutosizeInputHTMLAttributes = {
      isInvalid,
      tabIndex: -1,
      type: 'text',
      spellCheck: false,
      autoCorrect: 'off',
      autoComplete: 'off',
      autoCapitalize: 'none',
      'aria-label': ariaLabel,
      'aria-autocomplete': 'list',
      'aria-labelledby': ariaLabelledBy,
      'data-testid': AUTOSIZE_INPUT_TESTID,
      style: { width: inputWidth }
    };

    useUpdateEffect(() => {
      if (sizerRef.current) {
        setInputWidth(sizerRef.current.scrollWidth + INPUT_MIN_WIDTH);
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
          required={isInvalid}
          {...autosizeInputAttrs}
          onChange={!readOnly ? onChange : undefined}
          className={addClassNames ? AUTOSIZE_INPUT_CLS : undefined}
        />
        <SizerDiv ref={sizerRef}>{inputValue}</SizerDiv>
      </Fragment>
    );
  })
);

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;