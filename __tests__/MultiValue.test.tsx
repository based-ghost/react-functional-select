import { CLEAR_ICON_MV_TESTID } from '../src/constants';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import MultiValue, { MultiValueProps } from '../src/components/value/MultiValue';
import { Option, RENDER_OPTION_LABEL_MOCK, getOptionSingle, ThemeTestHOC } from './helpers';

// ============================================
// Helper functions for MultiValue component
// ============================================

const renderMultiValue = (props: MultiValueProps): RenderResult => {
  return render(
    <ThemeTestHOC>
      <MultiValue {...props} />
    </ThemeTestHOC>
  );
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

  expect(renderOptionLabelSpy).toHaveBeenCalledTimes(1);
  expect(getByText(label)).toBeInTheDocument();
});

test('clear indicator has functioning "mouseDown" and "touchEnd" events', async () => {
  const { props, removeSelectedOptionSpy } = createMultiValueProps();
  const { getAllByTestId } = renderMultiValue(props);
  const firstClearIconEl = getAllByTestId(CLEAR_ICON_MV_TESTID!)[0];

  fireEvent.touchEnd(firstClearIconEl);
  fireEvent.mouseDown(firstClearIconEl);

  expect(removeSelectedOptionSpy).toHaveBeenCalledTimes(2);
});