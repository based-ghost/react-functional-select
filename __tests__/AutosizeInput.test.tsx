import React, { type ComponentProps } from 'react';
import { ThemeTestHOC } from './helpers';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import AutosizeInput from '../src/components/AutosizeInput';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../src/constants';

type AutosizeInputProps = ComponentProps<typeof AutosizeInput>;

// ============================================
// Helper functions for AutosizeInput component
// ============================================

const renderAutosizeInput = (props: AutosizeInputProps) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeTestHOC>
        <AutosizeInput {...props} />
      </ThemeTestHOC>
    )
  };
};

const onBlurSpy = jest.fn();
const onFocusSpy = jest.fn();
const onChangeSpy = jest.fn();

const BASE_PROPS: AutosizeInputProps = {
  inputValue: '',
  readOnly: false,
  menuOpen: false,
  onBlur: onBlurSpy,
  onFocus: onFocusSpy,
  onChange: onChangeSpy,
  hasSelectedOptions: false
} as const;

// ============================================
// Test cases
// ============================================

test('input element has a static className (enables styling via classic CSS)', async () => {
  const { getByTestId } = renderAutosizeInput(BASE_PROPS);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveClass(AUTOSIZE_INPUT_CLS);
});

test('input has functional, optional ARIA attributes', async () => {
  const props = {
    ...BASE_PROPS,
    ariaLabel: 'test-label',
    ariaLabelledBy: 'test-labelledby',
  };

  const { getByTestId } = renderAutosizeInput(props);
  const verifyAriaAttrs = ['aria-label', 'aria-labelledby', 'aria-autocomplete'];

  verifyAriaAttrs.forEach((attr: string) => {
    expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute(attr);
  });
});

test('when "id" has a non-empty string value, input element should get an "id" attribute reflecting that value', async () => {
  const inputId = 'test-input-id';
  const props = { ...BASE_PROPS, id: inputId };
  const { getByTestId } = renderAutosizeInput(props);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute('id', inputId);
});

test('when "readOnly" = true, the onChange event handler should not be attached to input and the "readonly" attribute is added', async () => {
  const props = { ...BASE_PROPS, readOnly: true };
  const { user, getByTestId } = renderAutosizeInput(props);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);
  await user.type(inputElement, 'no change');
  expect(onChangeSpy).not.toBeCalled();
  expect(inputElement).toHaveAttribute('readonly');
});

test('"blur" and "focus" events with callback handlers are attached to the input element', async () => {
  const { getByTestId } = renderAutosizeInput(BASE_PROPS);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);
  fireEvent.blur(inputElement);
  fireEvent.focus(inputElement);
  expect(onBlurSpy).toBeCalled();
  expect(onFocusSpy).toBeCalled();
});