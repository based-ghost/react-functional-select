import React, { ReactNode } from 'react';
import { Value } from '../src/components';
import DefaultThemeObj from '../src/theme';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ValueProps, OptionData } from '../src/types';
import { PLACEHOLDER_DEFAULT, SELECTED_OPTION_DEFAULT, FOCUSED_MULTI_DEFAULT } from '../src/constants/defaults';

// ============================================
// Helper functions for Value component
// ============================================

const renderValue = (props: ValueProps) => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <Value {...props} />
    </ThemeProvider>
  );
};

const createValueProps = () => {
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = jest.fn((data: OptionData): ReactNode => data.label);

  const props: ValueProps = {
    isMulti: false,
    inputValue: '',
    placeholder: PLACEHOLDER_DEFAULT,
    selectedOption: SELECTED_OPTION_DEFAULT,
    renderOptionLabel: renderOptionLabelSpy,
    focusedMultiValue: FOCUSED_MULTI_DEFAULT,
    removeSelectedOption: removeSelectedOptionSpy,
  };

  return {
    props,
    renderOptionLabelSpy,
  };
};

// ============================================
// Test cases
// ============================================

test('"placeholder" text displays when no option is selected', async () => {
  const { props } = createValueProps();
  const { getByText } = renderValue(props);
  expect(getByText(PLACEHOLDER_DEFAULT)).toBeInTheDocument();
});

test('component renders NULL if "inputValue" is a non-empty string and "isMulti" !== true', async () => {
  const { props } = createValueProps();
  const propsWithInputValue = {
    ...props,
    inputValue: 'test search',
  };
  const { container } = renderValue(propsWithInputValue);
  expect(container.hasChildNodes()).toBeFalsy();
});

test('"renderOptionLabel" callback should be executed when an option is selected and should render the selected option label text', async () => {
  const selectedOptionLabel = 'Option 1';
  const { props, renderOptionLabelSpy } = createValueProps();

  const data = {
    value: 1,
    label: selectedOptionLabel,
  };

  const propsWithSelectedOption = {
    ...props,
    selectedOption: [{
      data,
      value: data.value,
      label: data.label,
    }],
  };

  const { getByText } = renderValue(propsWithSelectedOption);
  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);
  expect(getByText(selectedOptionLabel)).toBeInTheDocument();
});