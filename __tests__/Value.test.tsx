import React, { ReactNode } from 'react';
import { Value } from '../src/components';
import { defaultTheme } from '../src/theme';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ValueProps, OptionData } from '../src/types';
import { PLACEHOLDER_DEFAULT } from '../src/constants/defaults';

// ============================================
// Helper functions for Value component
// ============================================

const renderValue = (props: ValueProps) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <Value {...props} />
    </ThemeProvider>
  );
};

const createValueProps = () => {
  const renderOptionLabelSpy = jest.fn((data: OptionData): ReactNode => data.label);

  const props: ValueProps = {
    inputValue: '',
    placeholder: PLACEHOLDER_DEFAULT,
    renderOptionLabel: renderOptionLabelSpy,
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

test('component renders NULL if "inputValue" is a non-empty string', async () => {
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

  const propsWithSelectedOption = {
    ...props,
    selectedOptionData: {
      value: 1,
      label: selectedOptionLabel,
    },
  };

  const { getByText } = renderValue(propsWithSelectedOption);
  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);
  expect(getByText(selectedOptionLabel)).toBeInTheDocument();
});