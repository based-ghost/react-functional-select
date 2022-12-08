import React, { type ComponentProps } from 'react';
import Value from '../src/components/Value';
import { render } from '@testing-library/react';
import type { CallbackFn, SelectedOption } from '../src/types';
import { PLACEHOLDER_DEFAULT, EMPTY_ARRAY } from '../src/constants';
import { renderOptionLabelMock, renderMultiOptionsMock, getSelectedOptionSingle, ThemeWrapper } from './helpers';

type ValueProps = ComponentProps<typeof Value>;

// ============================================
// Helper functions for Value component
// ============================================

const renderValue = (props: ValueProps) => {
  return render(
    <ThemeWrapper>
      <Value {...props} />
    </ThemeWrapper>
  );
};

const rerenderValue = (props: ValueProps, rerender: CallbackFn): void => {
  rerender(
    <ThemeWrapper>
      <Value {...props} />
    </ThemeWrapper>
  );
};

const removeSelectedOptionSpy = jest.fn();
const renderOptionLabelSpy = renderOptionLabelMock;
const renderMultiOptionsSpy = renderMultiOptionsMock;

const BASE_PROPS: ValueProps = {
  isMulti: false,
  hasInput: false,
  focusedMultiValue: null,
  selectedOption: EMPTY_ARRAY,
  renderMultiOptions: undefined,
  placeholder: PLACEHOLDER_DEFAULT,
  renderOptionLabel: renderOptionLabelSpy,
  removeSelectedOption: removeSelectedOptionSpy
} as const;

// ============================================
// Test cases
// ============================================

test('"placeholder" text displays when no option is selected', () => {
  const { getByText } = renderValue(BASE_PROPS);
  expect(getByText(PLACEHOLDER_DEFAULT)).toBeInTheDocument();
});

test('component renders NULL if "hasInput" is true AND ("isMulti" !== true OR ("isMulti" === true AND "selectedOptions" is empty))', () => {
  // Render with truthy "inputValue" and "isMulti" = false
  const singleProps = { ...BASE_PROPS, hasInput: true };
  const { container, rerender } = renderValue(singleProps);
  expect(container.hasChildNodes()).toBeFalsy();

  // Re-render with truthy "inputValue" and "isMulti" = true
  const multiProps = { ...singleProps, isMulti: true };
  rerenderValue(multiProps, rerender);
  expect(container.hasChildNodes()).toBeFalsy();
});

test('"renderOptionLabel" callback should be executed when an option is selected and should render the selected option label text', () => {
  const selectedOption = getSelectedOptionSingle();
  const props = { ...BASE_PROPS, selectedOption };
  const { getByText } = renderValue(props);

  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);

  selectedOption.forEach(({ label }: SelectedOption) => {
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('"renderMultiOptions" callback should be executed when "isMulti" = true and "renderMultiOptions" is a function and at least one option is selected', () => {
  const props = {
    ...BASE_PROPS,
    isMulti: true,
    selectedOption: getSelectedOptionSingle(),
    renderMultiOptions: renderMultiOptionsSpy
  };
  renderValue(props);
  expect(renderMultiOptionsSpy).toHaveBeenCalledTimes(1);
});