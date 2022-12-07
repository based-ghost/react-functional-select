import React, { type ComponentProps } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLEAR_ICON_MV_TESTID } from '../src/constants';
import MultiValue from '../src/components/Value/MultiValue';
import { renderOptionLabelMock, getOptionSingle, ThemeTestHOC, type Option } from './helpers';

type MultiValueProps = ComponentProps<typeof MultiValue>;

// ============================================
// Helper functions for MultiValue component
// ============================================

const renderMultiValue = (props: MultiValueProps) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeTestHOC>
        <MultiValue {...props} />
      </ThemeTestHOC>
    )
  };
};

const removeSelectedOptionSpy = jest.fn();
const renderOptionLabelSpy = renderOptionLabelMock;

const data: Option = getOptionSingle();

const BASE_PROPS: MultiValueProps = {
  data,
  isFocused: false,
  value: data.value,
  renderOptionLabel: renderOptionLabelSpy,
  removeSelectedOption: removeSelectedOptionSpy
} as const;

// ============================================
// Test cases
// ============================================

test('"renderOptionLabel" callback should be executed and should render the selected option label text', () => {
  const { getByText } = renderMultiValue(BASE_PROPS);
  expect(renderOptionLabelSpy).toBeCalled();
  expect(getByText(BASE_PROPS.data.label)).toBeInTheDocument();
});

test('clear indicator has functioning "click" user events', async () => {
  const { user, getAllByTestId } = renderMultiValue(BASE_PROPS);
  const firstClearIconEl = getAllByTestId(CLEAR_ICON_MV_TESTID!)[0];
  await user.click(firstClearIconEl);
  expect(removeSelectedOptionSpy).toBeCalled();
});