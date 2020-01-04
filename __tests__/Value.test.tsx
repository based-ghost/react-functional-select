import React from 'react';
import { Value } from '../src/components';
import DefaultThemeObj from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { ValueProps, SelectedOption } from '../src/types';
import { render, RenderResult } from '@testing-library/react';
import { RENDER_OPTION_LABEL_MOCK, getSelectedOptionSingle } from './helpers/utils';
import { PLACEHOLDER_DEFAULT, SELECTED_OPTION_DEFAULT, FOCUSED_MULTI_DEFAULT } from '../src/constants/defaults';

// ============================================
// Helper functions for Value component
// ============================================

const renderValue = (props: ValueProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <Value {...props} />
    </ThemeProvider>
  );
};

const rerenderValue = (props: ValueProps, rerender: (...args: any[]) => void): void => {
  rerender(
    <ThemeProvider theme={DefaultThemeObj}>
      <Value {...props} />
    </ThemeProvider>
  );
};

const createValueProps = () => {
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;

  const props: ValueProps = {
    isMulti: false,
    inputValue: '',
    placeholder: PLACEHOLDER_DEFAULT,
    selectedOption: SELECTED_OPTION_DEFAULT,
    renderOptionLabel: renderOptionLabelSpy,
    focusedMultiValue: FOCUSED_MULTI_DEFAULT,
    removeSelectedOption: removeSelectedOptionSpy
  };

  return {
    props,
    renderOptionLabelSpy
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

test('component renders NULL if "inputValue" is truthy AND ("isMulti" != true OR ("isMulti" = true AND selectedOptions is empty))', async () => {
  const { props } = createValueProps();

  // Render with truthy "inputValue" and "isMulti" = false
  const singleProps = {
    ...props,
    inputValue: 'test search',
  };
  const { container, rerender } = renderValue(singleProps);
  expect(container.hasChildNodes()).toBeFalsy();

  // Re-render with truthy "inputValue" and "isMulti" = true
  const multiProps = {
    ...singleProps,
    isMulti: true,
  };
  rerenderValue(multiProps, rerender);
  expect(container.hasChildNodes()).toBeFalsy();
});

test('"renderOptionLabel" callback should be executed when an option is selected and should render the selected option label text', async () => {
  const selectedOption = getSelectedOptionSingle();
  const { props, renderOptionLabelSpy } = createValueProps();

  const propsWithSelectedOption = {
    ...props,
    selectedOption
  };

  const { getByText } = renderValue(propsWithSelectedOption);
  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);

  selectedOption.forEach((option: SelectedOption): void => {
    const { label } = option;
    expect(getByText(String(label))).toBeInTheDocument();
  });
});