import { RFS_DEFAULT_THEME } from '../src/theme';
import { ThemeProvider } from 'styled-components';
import MenuList from '../src/components/menu/MenuList';
import { MenuListProps, MenuOption } from '../src/types';
import { render, RenderResult } from '@testing-library/react';
import { MENU_OPTIONS, RENDER_OPTION_LABEL_MOCK } from './helpers/utils';
import { MENU_ITEM_SIZE_DEFAULT, MENU_MAX_HEIGHT_DEFAULT, LOADING_MSG_DEFAULT, NO_OPTIONS_MSG_DEFAULT, FOCUSED_OPTION_DEFAULT } from '../src/constants';

// ============================================
// Helper functions for Menu component
// ============================================

const renderMenuList = (props: MenuListProps): RenderResult => {
  return render(
    <ThemeProvider theme={RFS_DEFAULT_THEME}>
      <MenuList {...props} />
    </ThemeProvider>
  );
};

const createMenuListProps = (menuOptions: MenuOption[] = []): MenuListProps => {
  const selectOption = jest.fn();
  const renderOptionLabel = RENDER_OPTION_LABEL_MOCK;
  const { index: focusedOptionIndex } = FOCUSED_OPTION_DEFAULT;

  return {
    menuOptions,
    selectOption,
    width: '100%',
    renderOptionLabel,
    focusedOptionIndex,
    fixedSizeListRef: null,
    itemKeySelector: undefined,
    height: MENU_MAX_HEIGHT_DEFAULT,
    loadingMsg: LOADING_MSG_DEFAULT,
    itemSize: MENU_ITEM_SIZE_DEFAULT,
    noOptionsMsg: NO_OPTIONS_MSG_DEFAULT
  };
};

// ============================================
// Test cases
// ============================================

test('MenuList component mounts and renders successfully when "menuOptions" array has items', async () => {
  const props = createMenuListProps(MENU_OPTIONS);
  const { getByText } = renderMenuList(props);

  // Assert react-window + Option.tsx renders each menuOption correctly
  MENU_OPTIONS.forEach((option: MenuOption) => {
    const { label } = option;
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('The "itemKeySelector" property is used in "react-window" function property "itemKey" to select unqiue key based on property value rather than using default index for each option', async () => {
  const props = {
    ...createMenuListProps(MENU_OPTIONS),
    itemKeySelector: 'value'
  };

  const { getByText } = renderMenuList(props);

  // Assert react-window + Option.tsx renders each menuOption correctly
  MENU_OPTIONS.forEach((option: MenuOption) => {
    const { label } = option;
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('The "No Options" message element is NOT rendered when "menuOptions" length > 0', async () => {
  const props = createMenuListProps(MENU_OPTIONS);
  const { queryByText } = renderMenuList(props);

  expect(queryByText(props.noOptionsMsg)).toBeNull();
});

test('The "No Options" message element is rendered when "menuOptions" length = 0', async () => {
  const props = createMenuListProps();
  const { getByText } = renderMenuList(props);

  expect(getByText(props.noOptionsMsg)).toBeInTheDocument();
});

test('The "Loading" message element is NOT rendered when "isLoading" != true', async () => {
  const props = createMenuListProps();
  const { queryByText } = renderMenuList(props);

  expect(queryByText(props.loadingMsg)).toBeNull();
});

test('The "Loading" message element is rendered when "isLoading" = true', async () => {
  const props = { isLoading: true, ...createMenuListProps() };
  const { getByText } = renderMenuList(props);

  expect(getByText(props.loadingMsg)).toBeInTheDocument();
});