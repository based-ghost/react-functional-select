import React, { type ComponentProps } from 'react';
import { ThemeTestHOC } from './helpers';
import type { MenuOption } from '../src';
import { render } from '@testing-library/react';
import MenuList from '../src/components/Menu/MenuList';
import { MENU_OPTIONS, renderOptionLabelMock } from './helpers/utils';
import {
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  LOADING_MSG_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  FOCUSED_OPTION_DEFAULT
} from '../src/constants';

type MenuListProps = ComponentProps<typeof MenuList>;

// ============================================
// Helper functions for Menu component
// ============================================

const renderMenuList = (props: MenuListProps) => {
  return render(
    <ThemeTestHOC>
      <MenuList {...props} />
    </ThemeTestHOC>
  );
};

const BASE_PROPS: MenuListProps = {
  width: '100%',
  memoOptions: false,
  menuOptions: MENU_OPTIONS,
  itemKeySelector: undefined,
  fixedSizeListRef: undefined,
  height: MENU_MAX_HEIGHT_DEFAULT,
  loadingMsg: LOADING_MSG_DEFAULT,
  itemSize: MENU_ITEM_SIZE_DEFAULT,
  noOptionsMsg: NO_OPTIONS_MSG_DEFAULT,
  selectOption: jest.fn(),
  renderOptionLabel: renderOptionLabelMock,
  focusedOptionIndex: FOCUSED_OPTION_DEFAULT.index
} as const;

// ============================================
// Test cases
// ============================================

test('MenuList component mounts and renders successfully when "menuOptions" array has items', async () => {
  const { getByText } = renderMenuList(BASE_PROPS);

  // Assert react-window + Option.tsx renders each menuOption correctly
  BASE_PROPS.menuOptions.forEach(({ label }: MenuOption) => {
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('The "itemKeySelector" property is used in "react-window" function property "itemKey" to select unqiue key based on property value rather than using default index for each option', async () => {
  const props = { ...BASE_PROPS, itemKeySelector: 'value' };
  const { getByText } = renderMenuList(props);

  // Assert react-window + Option.tsx renders each menuOption correctly
  props.menuOptions.forEach(({ label }: MenuOption) => {
    expect(getByText(String(label))).toBeInTheDocument();
  });
});

test('The "No Options" message element is NOT rendered when "menuOptions" length > 0', async () => {
  const { queryByText } = renderMenuList(BASE_PROPS);
  expect(queryByText(BASE_PROPS.noOptionsMsg!)).toBeNull();
});

test('The "No Options" message element is rendered when "menuOptions" length === 0', async () => {
  const props = { ...BASE_PROPS, menuOptions: [] };
  const { getByText } = renderMenuList(props);
  expect(getByText(props.noOptionsMsg!)).toBeInTheDocument();
});

test('The "Loading" message element is NOT rendered when "isLoading" !== true', async () => {
  const { queryByText } = renderMenuList(BASE_PROPS);
  expect(queryByText(BASE_PROPS.loadingMsg)).toBeNull();
});

test('The "Loading" message element is rendered when "isLoading" === true', async () => {
  const props = { ...BASE_PROPS, isLoading: true };
  const { getByText } = renderMenuList(props);
  expect(getByText(props.loadingMsg)).toBeInTheDocument();
});