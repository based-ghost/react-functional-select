import React, { memo, useRef, useState, Fragment, forwardRef } from 'react';
import styled from 'styled-components';
import { useUpdateEffect } from '../../hooks';
import { IS_MICROSOFT_BROWSER } from '../../utils';
import { AUTOSIZE_INPUT_ATTRS } from '../../constants';

import type { Ref, FormEventHandler, FocusEventHandler } from 'react';

export type AutosizeInputProps = Readonly<{
  id?: string;
  readOnly: boolean;
  ariaLabel?: string;
  inputValue: string;
  required?: boolean;
  ariaLabelledBy?: string;
  hasSelectedOptions: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange: FormEventHandler<HTMLInputElement>;
}>;

const INPUT_MIN_WIDTH_PX = 2;

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

const Input = styled.input.attrs(AUTOSIZE_INPUT_ATTRS)<{ isInvalid: boolean }>`
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
  ${IS_MICROSOFT_BROWSER && '::-ms-clear{display:none;}'}
`;

const AutosizeInput = memo(
  forwardRef<HTMLInputElement, AutosizeInputProps>((
    {
      id,
      onBlur,
      onFocus,
      readOnly,
      required,
      onChange,
      ariaLabel,
      inputValue,
      ariaLabelledBy,
      hasSelectedOptions
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const sizerRef = useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = useState<number>(INPUT_MIN_WIDTH_PX);
    const isInvalid = !!required && !hasSelectedOptions;

    useUpdateEffect(() => {
      if (sizerRef.current) {
        setInputWidth(sizerRef.current.scrollWidth + INPUT_MIN_WIDTH_PX);
      }
    }, [inputValue]);

    return (
      <Fragment>
        <Input
          id={id}
          ref={ref}
          isInvalid
          onBlur={onBlur}
          onFocus={onFocus}
          value={inputValue}
          readOnly={readOnly}
          required={isInvalid}
          aria-label={ariaLabel}
          style={{ width: inputWidth }}
          aria-labelledby={ariaLabelledBy}
          onChange={!readOnly ? onChange : undefined}
        />
        <SizerDiv ref={sizerRef}>
          {inputValue}
        </SizerDiv>
      </Fragment>
    );
  })
);

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;