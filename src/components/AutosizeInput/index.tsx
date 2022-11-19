import styled, { css } from 'styled-components';
import { AUTOSIZE_INPUT_ATTRS } from '../../constants';
import React, { forwardRef, type Ref, type FormEventHandler, type FocusEventHandler } from 'react';

type InputProps = Readonly<{
  isInvalid: boolean;
}>;

type AutosizeInputProps = Readonly<{
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

const INPUT_BASE_STYLE = css`
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  font: inherit;
  min-width: 2px;
  grid-area: 1 / 2 / auto / auto;
`;

const InputWrapper = styled.div`
  margin: 2px;
  flex: 1 1 auto;
  display: inline-grid;
  box-sizing: border-box;
  grid-area: 1 / 1 / 2 / 3;
  grid-template-columns: 0px min-content;

  :after {
    white-space: pre;
    visibility: hidden;
    content: attr(data-value) " ";
    ${INPUT_BASE_STYLE}
  }
`;

const Input = styled.input.attrs(AUTOSIZE_INPUT_ATTRS) <InputProps>`
  width: 100%;
  background: 0;
  color: inherit;
  ${INPUT_BASE_STYLE}

  :read-only {
    opacity: 0;
    cursor: default;
  }

  :required {
    ${({ theme, isInvalid }) => isInvalid && theme.input.cssRequired}
  }

  ${({ theme }) => theme.input.css}
`;

const AutosizeInput = forwardRef<HTMLInputElement, AutosizeInputProps>(
  (
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

    return (
      <InputWrapper data-value={inputValue}>
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
          aria-labelledby={ariaLabelledBy}
          onChange={!readOnly ? onChange : undefined}
        />
      </InputWrapper>
    );
  }
);

AutosizeInput.displayName = 'AutosizeInput';

export default AutosizeInput;
