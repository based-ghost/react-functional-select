import React, { memo, useRef, useState, Fragment, forwardRef, type Ref, type FormEventHandler, type FocusEventHandler } from 'react';
import { useUpdateEffect } from '../../hooks';
import styled, { css } from 'styled-components';
import { AUTOSIZE_INPUT_ATTRS } from '../../constants';

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

const INPUT_MIN_WIDTH_PX = 15;

const INPUT_FONT_STYLE = css`
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
`;

const SizerDiv = styled.div`
  top: 0;
  left: 0;
  height: 0;
  overflow: scroll;
  white-space: pre;
  position: absolute;
  visibility: hidden;
  ${INPUT_FONT_STYLE}
  ${({ theme }) => theme.input.css}
`;

const Input = styled.input.attrs(AUTOSIZE_INPUT_ATTRS)<{ isInvalid: boolean }>`
  border: 0;
  outline: 0;
  padding: 0;
  cursor: text;
  background: 0;
  color: inherit;
  box-sizing: content-box;
  ${INPUT_FONT_STYLE}

  :read-only {
    opacity: 0;
    cursor: default;
  }

  :required {
    ${({ theme, isInvalid }) => isInvalid && theme.input.cssRequired}
  }

  ${({ theme }) => theme.input.css}
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
    const isInvalid = !!required && !hasSelectedOptions;
    const sizerRef = useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = useState<number>(INPUT_MIN_WIDTH_PX);

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
