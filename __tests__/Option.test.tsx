import React, { type ComponentProps } from 'react';
import type { CSSProperties } from 'react';
import { render } from '@testing-library/react';
import Option from '../src/components/Menu/Option';
import userEvent from '@testing-library/user-event';
import { OPTION_DISABLED_CLS } from '../src/constants';
import { MENU_OPTIONS, RENDER_OPTION_LABEL_MOCK, stringifyCSSProperties, ThemeTestHOC } from './helpers';

type OptionProps = ComponentProps<typeof Option>;

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

const renderOption = (props: OptionProps) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeTestHOC>
        <Option {...props} />
      </ThemeTestHOC>
    )
  };
};

const createOptionProps = (
  index = 0,
  focusedOptionIndex = 0,
  memoOptions = false
) => {
  const onClickSelectOptionSpy = jest.fn();
  const renderOptionLabelSpy = RENDER_OPTION_LABEL_MOCK;

  const props: OptionProps = {
    index,
    style: OPTION_STYLE,
    data: {
      memoOptions,
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
  const optionCssProps = stringifyCSSProperties(OPTION_STYLE);
  expect(optionParentEl).toHaveAttribute('style', optionCssProps);
});

test('"renderOptionLabel" callback should be executed and the result rendered to DOM', async () => {
  const { props, renderOptionLabelSpy } = createOptionProps();
  const { label } = props.data.menuOptions[props.index];
  const { getByText } = renderOption(props);
  expect(renderOptionLabelSpy).toHaveBeenCalled();
  expect(getByText(String(label))).toBeInTheDocument();
});

test(`option with "isDisabled" = TRUE should have an onClick handler and the ${OPTION_DISABLED_CLS} class added to its classList`, async () => {
  const firstDisabledMenuOptionIndex = MENU_OPTIONS.findIndex((option) => !!option.isDisabled);
  const { props, onClickSelectOptionSpy } = createOptionProps(firstDisabledMenuOptionIndex);
  const { user, container } = renderOption(props);
  const optionParentEl = container.querySelector('div') as HTMLDivElement;

  await user.click(optionParentEl);

  expect(onClickSelectOptionSpy).toBeCalled();
  expect(optionParentEl).toHaveClass(OPTION_DISABLED_CLS);
});