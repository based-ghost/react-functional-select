import React from 'react';
import { RfsTheme } from '../src/theme';
import { Menu } from '../src/components';
import { ThemeProvider } from 'styled-components';
import { MenuProps, MenuOption } from '../src/types';
import { render, RenderResult } from '@testing-library/react';
import { MENU_OPTIONS, RENDER_OPTION_LABEL_MOCK } from './helpers/utils';
import { MENU_ITEM_SIZE_DEFAULT, MENU_MAX_HEIGHT_DEFAULT, LOADING_MSG_DEFAULT, NO_OPTIONS_MSG_DEFAULT, FOCUSED_OPTION_DEFAULT } from '../src/constants/defaults';

// ============================================
// Helper functions for Menu component
// ============================================

const renderMenu = (props: MenuProps): RenderResult => {
  return render(
    <ThemeProvider theme={RfsTheme}>
      <Menu {...props} />
    </ThemeProvider>
  );
};

const createMenuProps = (menuOptions: MenuOption[] = []): MenuProps => {
  const selectOption = jest.fn();
  const renderOptionLabel = RENDER_OPTION_LABEL_MOCK;
  const { index: focusedOptionIndex } = FOCUSED_OPTION_DEFAULT;

  return {
    menuOptions,
    selectOption,
    width: '100%',
    renderOptionLabel,
    focusedOptionIndex,
    height: MENU_MAX_HEIGHT_DEFAULT,
    loadingMsg: LOADING_MSG_DEFAULT,
    itemSize: MENU_ITEM_SIZE_DEFAULT,
    noOptionsMsg: NO_OPTIONS_MSG_DEFAULT
  };
};

// ============================================
// Test cases
// ============================================

test('Menu component mounts and renders successfully when "menuOptions" array has items', async () => {
  const props = createMenuProps(MENU_OPTIONS);
  const { getByText } = renderMenu(props);
  const { menuOptions } = props;

  // Assert react-window + Option.tsx renders each menuOption correctly
  menuOptions.forEach((option: MenuOption) => {
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

test('The "Loading" message element is NOT rendered when "isLoading" != true', async () => {
  const props = createMenuProps();
  const { queryByText } = renderMenu(props);

  expect(queryByText(props.loadingMsg)).toBeNull();
});

test('The "Loading" message element is rendered when "isLoading" = true', async () => {
  const props = {
    isLoading: true,
    ...createMenuProps(),
  };

  const { getByText } = renderMenu(props);

  expect(getByText(props.loadingMsg)).toBeInTheDocument();
});