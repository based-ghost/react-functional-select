import { ThemeTestHOC } from './helpers';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import AutosizeInput, { AutosizeInputProps } from '../src/components/input/AutosizeInput';
import { EMPTY_ARRAY, AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../src/constants';

// ============================================
// Helper functions for AutosizeInput component
// ============================================

const renderAutosizeInput = (props: AutosizeInputProps): RenderResult => {
  return render(
    <ThemeTestHOC>
      <AutosizeInput {...props} />
    </ThemeTestHOC>
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
    selectedOption: EMPTY_ARRAY
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

test('input element has a static className (enables styling via classic CSS)', async () => {
  const { props } = createAutosizeInputProps();
  const { getByTestId } = renderAutosizeInput(props);
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
  const verifyAriaAttrs = ['aria-label', 'aria-labelledby', 'aria-autocomplete'];

  verifyAriaAttrs.forEach((attr) => {
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