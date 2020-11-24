import { CSSProperties } from 'react';
import { RfsTheme } from '../src/theme';
import { OptionProps } from '../src/types';
import Option from '../src/components/Option';
import { ThemeProvider } from 'styled-components';
import { OPTION_DISABLED_CLS } from '../src/constants/dom';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { MENU_OPTIONS, RENDER_OPTION_LABEL_MOCK, stringifyCSSProperties } from './helpers/utils';

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
    <ThemeProvider theme={RfsTheme}>
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

  expect(optionParentEl).toHaveAttribute('style', stringifyCSSProperties(OPTION_STYLE));
});

test('"renderOptionLabel" callback should be executed and the result rendered to DOM', async () => {
  const { props, renderOptionLabelSpy } = createOptionProps();
  const { label } = props.data.menuOptions[props.index];
  const { getByText } = renderOption(props);

  expect(renderOptionLabelSpy).toHaveBeenCalled();
  expect(getByText(String(label))).toBeInTheDocument();
});

test('option with "isDisabled" = FALSE should have a functioning onClick handler attached', async () => {
  const firstEnabledMenuOptionIndex = MENU_OPTIONS.findIndex((option) => !option.isDisabled);
  const { props, onClickSelectOptionSpy } = createOptionProps(firstEnabledMenuOptionIndex);

  const { container } = renderOption(props);
  const optionParentEl = container.querySelector('div');

  fireEvent.click(optionParentEl!);
  expect(onClickSelectOptionSpy).toBeCalled();
});

test(`option with "isDisabled" = TRUE should not have an onClick handler attached and should have class - ${OPTION_DISABLED_CLS} - added to its classList`, async () => {
  const firstDisabledMenuOptionIndex = MENU_OPTIONS.findIndex((option) => !!option.isDisabled);
  const { props, onClickSelectOptionSpy } = createOptionProps(firstDisabledMenuOptionIndex);

  const { container } = renderOption(props);
  const optionParentEl = container.querySelector('div');

  fireEvent.click(optionParentEl!);

  expect(onClickSelectOptionSpy).not.toBeCalled();
  expect(optionParentEl).toHaveClass(OPTION_DISABLED_CLS);
});