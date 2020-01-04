import React from 'react';
import DefaultThemeObj from '../src/theme';
import { MultiValueProps } from '../src/types';
import { ThemeProvider } from 'styled-components';
import MultiValue from '../src/components/MultiValue';
import { CLEAR_ICON_MV_TESTID } from '../src/constants/dom';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Option, OPTIONS, RENDER_OPTION_LABEL_MOCK } from './helpers/utils';

// ============================================
// Helper functions for MultiValue component
// ============================================

const renderMultiValue = (props: MultiValueProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <MultiValue {...props} />
    </ThemeProvider>
  );
};

const createMultiValueProps = (option: Option = OPTIONS[0]) => {
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;

  const props: MultiValueProps = {
    data: option,
    isFocused: false,
    value: option.value,
    renderOptionLabel: renderOptionLabelSpy,
    removeSelectedOption: removeSelectedOptionSpy
  };

  return {
    props,
    renderOptionLabelSpy,
    removeSelectedOptionSpy
  };
};

// ============================================
// Test cases
// ============================================

test('"renderOptionLabel" callback should be executed and should render the selected option label text', async () => {
  const { props, renderOptionLabelSpy } = createMultiValueProps();
  const { getByText } = renderMultiValue(props);
  const { label } = props.data;

  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);
  expect(getByText(label)).toBeInTheDocument();
});

test('clear indicator has functioning "mouseDown" and "touchEnd" events', async () => {
  const { props, removeSelectedOptionSpy } = createMultiValueProps();
  const { getByTestId } = renderMultiValue(props);
  const clearIndicatorEl = getByTestId(CLEAR_ICON_MV_TESTID!);

  fireEvent.touchEnd(clearIndicatorEl);
  fireEvent.mouseDown(clearIndicatorEl);

  expect(removeSelectedOptionSpy).toHaveBeenCalledTimes(2);
});