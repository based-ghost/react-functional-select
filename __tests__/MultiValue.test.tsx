import React, { type ComponentProps } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLEAR_ICON_MV_TESTID } from '../src/constants';
import MultiValue from '../src/components/Value/MultiValue';
import { RENDER_OPTION_LABEL_MOCK, getOptionSingle, ThemeTestHOC, type Option } from './helpers';

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

const createMultiValueProps = () => {
  const data: Option = getOptionSingle();
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;

  const props: MultiValueProps = {
    data,
    isFocused: false,
    value: data.value,
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
  expect(renderOptionLabelSpy).toBeCalled();
  expect(getByText(label)).toBeInTheDocument();
});

test('clear indicator has functioning "click" user events', async () => {
  const { props, removeSelectedOptionSpy } = createMultiValueProps();
  const { user, getAllByTestId } = renderMultiValue(props);
  const firstClearIconEl = getAllByTestId(CLEAR_ICON_MV_TESTID!)[0];

  await user.click(firstClearIconEl);

  expect(removeSelectedOptionSpy).toBeCalled();
});