import React from 'react';
import { RfsTheme } from '../src/theme';
import { AutosizeInputProps } from '../src/types';
import { ThemeProvider } from 'styled-components';
import { AutosizeInput } from '../src/components';
import { SELECTED_OPTION_DEFAULT } from '../src/constants/defaults';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../src/constants/dom';

// ============================================
// Helper functions for AutosizeInput component
// ============================================

const renderAutosizeInput = (props: AutosizeInputProps): RenderResult => {
  return render(
    <ThemeProvider theme={RfsTheme}>
      <AutosizeInput {...props} />
    </ThemeProvider>
  );
};

const createAutosizeInputProps = () => {
  const onBlurSpy = jest.fn();
  const onFocusSpy = jest.fn();
  const onChangeSpy = jest.fn();

  const props: AutosizeInputProps = {
    inputValue: '',
    readOnly: false,
    onBlur: onBlurSpy,
    onFocus: onFocusSpy,
    onChange: onChangeSpy,
    selectedOption: SELECTED_OPTION_DEFAULT
  };

  return {
    props,
    onBlurSpy,
    onFocusSpy,
    onChangeSpy
  };
};

// ============================================
// Test cases
// ============================================

test('input element has a static className (enables styling via classic CSS) when "addClassNames" = true', async () => {
  const { props } = createAutosizeInputProps();
  const mergedProps = {
    ...props,
    addClassNames: true,
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);

  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveClass(AUTOSIZE_INPUT_CLS);
});

test('input has functional, optional ARIA attributes', async () => {
  const { props } = createAutosizeInputProps();

  const mergedProps = {
    ...props,
    ariaLabel: 'test-label',
    ariaLabelledBy: 'test-labelledby',
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);
  const verifyAriaAttributes = ['aria-label', 'aria-labelledby', 'aria-autocomplete'];

  verifyAriaAttributes.forEach((attr: string) => {
    expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute(attr);
  });
});

test('when "id" has a non-empty string value, input element should get an "id" attribute reflecting that value', async () => {
  const inputId = 'test-input-id';
  const { props } = createAutosizeInputProps();

  const mergedProps = {
    ...props,
    id: inputId,
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);

  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute('id', inputId);
});

test('when "readOnly" = true, the onChange event handler should not be attached to input and the "readonly" attribute is added', async () => {
  const { props, onChangeSpy } = createAutosizeInputProps();

  const mergedProps = {
    ...props,
    readOnly: true,
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);

  fireEvent.change(inputElement);
  expect(onChangeSpy).not.toBeCalled();
  expect(inputElement).toHaveAttribute('readonly');
});

test('"blur" and "focus" events with callback handlers are attached to the input element', async () => {
  const { props, onBlurSpy, onFocusSpy } = createAutosizeInputProps();
  const { getByTestId } = renderAutosizeInput(props);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);

  fireEvent.blur(inputElement);
  fireEvent.focus(inputElement);

  expect(onBlurSpy).toBeCalledTimes(1);
  expect(onFocusSpy).toBeCalledTimes(1);
});