import React, { ReactNode, ReactText } from 'react';
import DefaultThemeObj from '../src/theme';
import { ThemeProvider } from 'styled-components';
import MultiValue from '../src/components/MultiValue';
import { MultiValueProps, OptionData } from '../src/types';
import { CLEAR_ICON_MV_TESTID } from '../src/constants/dom';
import { render, fireEvent, RenderResult } from '@testing-library/react';

// ============================================
// Helper functions & test data for MultiValue component
// ============================================

type Option = {
  readonly label: ReactText;
  readonly value: ReactText;
};

const OPTIONS: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
];

const renderMultiValue = (props: MultiValueProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <MultiValue {...props} />
    </ThemeProvider>
  );
};

const createMultiValueProps = (option: Option = OPTIONS[0]) => {
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = jest.fn((data: OptionData): ReactNode => data.label);

  const props: MultiValueProps = {
    data: option,
    isFocused: false,
    value: option.value,
    renderOptionLabel: renderOptionLabelSpy,
    removeSelectedOption: removeSelectedOptionSpy,
  };

  return {
    props,
    renderOptionLabelSpy,
    removeSelectedOptionSpy,
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