import { SelectedOption } from '../src/types';
import { render } from '@testing-library/react';
import Value from '../src/components/Value';
import { PLACEHOLDER_DEFAULT, EMPTY_ARRAY } from '../src/constants';
import { RENDER_OPTION_LABEL_MOCK, RENDER_MULTI_OPTIONS_MOCK, getSelectedOptionSingle, ThemeTestHOC } from './helpers';

import type { ValueProps } from '../src/components/Value';
import type { RenderResult } from '@testing-library/react';

// ============================================
// Helper functions for Value component
// ============================================

const renderValue = (props: ValueProps): RenderResult => {
  return render(
    <ThemeTestHOC>
      <Value {...props} />
    </ThemeTestHOC>
  );
};

const rerenderValue = (
  props: ValueProps,
  rerender: (...args: any[]) => void
): void => {
  rerender(
    <ThemeTestHOC>
      <Value {...props} />
    </ThemeTestHOC>
  );
};

const createValueProps = () => {
  const removeSelectedOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;
  const renderMultiOptionsSpy = RENDER_MULTI_OPTIONS_MOCK;

  const props: ValueProps = {
    isMulti: false,
    inputValue: '',
    focusedMultiValue: null,
    selectedOption: EMPTY_ARRAY,
    renderMultiOptions: undefined,
    placeholder: PLACEHOLDER_DEFAULT,
    renderOptionLabel: renderOptionLabelSpy,
    removeSelectedOption: removeSelectedOptionSpy
  };

  return {
    props,
    renderOptionLabelSpy,
    renderMultiOptionsSpy
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

  selectedOption.forEach((option: SelectedOption) => {
    const { label } = option;
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('"renderMultiOptions" callback should be executed when "isMulti" = true and "renderMultiOptions" is a function and at least one option is selected', async () => {
  const selectedOption = getSelectedOptionSingle();
  const { props, renderMultiOptionsSpy } = createValueProps();

  const mergedProps = {
    ...props,
    isMulti: true,
    selectedOption,
    renderMultiOptions: renderMultiOptionsSpy
  };

  renderValue(mergedProps);
  expect(renderMultiOptionsSpy).toHaveBeenCalledTimes(1);
});