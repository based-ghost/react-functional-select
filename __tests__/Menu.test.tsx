import React from 'react';
import { Menu } from '../src/components';
import DefaultThemeObj from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { MenuProps, MenuOption } from '../src/types';
import { render, RenderResult } from '@testing-library/react';
import { MENU_OPTIONS, RENDER_OPTION_LABEL_MOCK } from './helpers/utils';
import { MENU_ITEM_SIZE_DEFAULT, MENU_MAX_HEIGHT_DEFAULT, NO_OPTIONS_MSG_DEFAULT, FOCUSED_OPTION_DEFAULT } from '../src/constants/defaults';

// ============================================
// Helper functions for Menu component
// ============================================

const renderMenu = (props: MenuProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <Menu {...props} />
    </ThemeProvider>
  );
};

const createMenuProps = (menuOptions = []): MenuProps => {
  const selectOption = jest.fn();
  const renderOptionLabel = RENDER_OPTION_LABEL_MOCK;
  const { index: focusedOptionIndex } = FOCUSED_OPTION_DEFAULT;

  return {
    width: '100%',
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex,
    itemSize: MENU_ITEM_SIZE_DEFAULT,
    maxHeight: MENU_MAX_HEIGHT_DEFAULT,
    noOptionsMsg: NO_OPTIONS_MSG_DEFAULT
  };
};

// ============================================
// Test cases
// ============================================

test('Menu component mounts and renders successfully when "menuOptions" array has items', async () => {
  const props = createMenuProps(MENU_OPTIONS);
  const { getByText } = renderMenu(props);

  // Assert react-window + Option.tsx renders each menuOption correctly
  props.menuOptions.forEach((option: MenuOption): void => {
    const { label } = option;
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('The "No Options" message element is NOT rendered when "menuOptions" length > 0', async () => {
  const props = createMenuProps(MENU_OPTIONS);
  const { queryByText } = renderMenu(props);
  expect(queryByText(props.noOptionsMsg)).toBeNull();
});

test('The "No Options" message element is rendered when "menuOptions" length = 0', async () => {
  const props = createMenuProps();
  const { getByText } = renderMenu(props);
  expect(getByText(props.noOptionsMsg)).toBeInTheDocument();
});