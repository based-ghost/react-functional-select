import React, { CSSProperties } from 'react';
import DefaultThemeObj from '../src/theme';
import { OptionProps } from '../src/types';
import Option from '../src/components/Option';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS } from '../src/constants/dom';
import { MENU_OPTIONS, MENU_OPTION_SELECTED, MENU_OPTION_DISABLED, RENDER_OPTION_LABEL_MOCK } from './helpers/utils';

// ============================================
// Helper functions & test data for Option.tsx component
// ============================================

const OPTION_STYLE: CSSProperties = {
  top: '0px',
  left: '0px',
  width: '100%',
  height: '35px',
  position: 'absolute'
};

const renderOption = (props: OptionProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <Option {...props} />
    </ThemeProvider>
  );
};

const createOptionProps = (index = 0, focusedOptionIndex = 0) => {
  const onClickSelectOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;

  const props: OptionProps = {
    index,
    style: OPTION_STYLE,
    data: {
      focusedOptionIndex,
      menuOptions: MENU_OPTIONS,
      selectOption: onClickSelectOptionSpy,
      renderOptionLabel: renderOptionLabelSpy
    }
  };

  return {
    props,
    renderOptionLabelSpy,
    onClickSelectOptionSpy
  };
};

// ============================================
// Test cases
// ============================================

test('option parent element renders dynamic style attribute correctly', async () => {
  const { props } = createOptionProps();
  const { container } = renderOption(props);
  const optionParentEl = container.querySelector('div');

  const stringifyCSSProperties = (): string => {
    let value = '';
    Object.keys(OPTION_STYLE).forEach((key) => {
      value += `${key}: ${OPTION_STYLE[key]}; `;
    });
    return value.trim();
  };

  expect(optionParentEl).toHaveAttribute('style', stringifyCSSProperties());
});

test('"renderOptionLabel" callback should be executed and the result rendered to DOM', async () => {
  const { props, renderOptionLabelSpy } = createOptionProps();
  const { data: { label } } = props.data.menuOptions[props.index];

  const { getByText } = renderOption(props);

  expect(renderOptionLabelSpy).toHaveBeenCalled();
  expect(getByText(label)).toBeInTheDocument();
});