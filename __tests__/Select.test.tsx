import { Select } from '../src';
import React, { type ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import {
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
  MENU_CONTAINER_TESTID,
  AUTOSIZE_INPUT_TESTID,
  SELECT_CONTAINER_TESTID,
  CONTROL_CONTAINER_TESTID
} from '../src/constants';

type SelectProps = ComponentProps<typeof Select>;

// ============================================
// Helper functions for Select component
// ============================================

const renderSelect = (props?: SelectProps) => ({
  user: userEvent.setup(),
  ...render(<Select {...props} />)
});

// ============================================
// Test cases
// ============================================

test('container elements have static className value (enables styling via classic CSS)', async () => {
  const { getByTestId } = renderSelect();
  expect(getByTestId(SELECT_CONTAINER_TESTID!)).toHaveClass(SELECT_CONTAINER_CLS);
  expect(getByTestId(CONTROL_CONTAINER_TESTID!)).toHaveClass(CONTROL_CONTAINER_CLS);
  expect(getByTestId(MENU_CONTAINER_TESTID!)).toHaveClass(MENU_CONTAINER_CLS);
});

test('id attributes are added to DOM if defined ("menuId", "selectId", "inputId" props)', async () => {
  const props = {
    menuId: 'test-menu-id',
    inputId: 'test-input-id',
    selectId: 'test-select-id'
  };
  const { getByTestId } = renderSelect(props);
  expect(getByTestId(MENU_CONTAINER_TESTID!)).toHaveAttribute('id', props.menuId);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute('id', props.inputId);
  expect(getByTestId(SELECT_CONTAINER_TESTID!)).toHaveAttribute('id', props.selectId);
});

test('"onInputFocus" callback should be fired when input is focused (if a defined function)', async () => {
  const onFocusSpy = jest.fn();
  const props = { onInputFocus: onFocusSpy };
  const { getByTestId } = renderSelect(props);
  fireEvent.focus(getByTestId(AUTOSIZE_INPUT_TESTID!));
  expect(onFocusSpy).toBeCalled();
});

test('"onInputBlur" callback should be fired on blur (if a defined function)', async () => {
  const onBlurSpy = jest.fn();
  const props = { onInputBlur: onBlurSpy };
  const { getByTestId } = renderSelect(props);
  fireEvent.blur(getByTestId(AUTOSIZE_INPUT_TESTID!));
  expect(onBlurSpy).toBeCalled();
});

test('toggling the menu to open/close fires corresponding callbacks "onMenuOpen" and "onMenuClose" (if they are defined functions)', async () => {
  const onMenuOpenSpy = jest.fn();
  const onMenuCloseSpy = jest.fn();

  const props = {
    onMenuOpen: onMenuOpenSpy,
    onMenuClose: onMenuCloseSpy,
  };

  const { user, getByTestId } = renderSelect(props);
  const controlWrapperEl = getByTestId(CONTROL_CONTAINER_TESTID!);
  await user.click(controlWrapperEl);
  await user.click(controlWrapperEl);
  expect(onMenuOpenSpy).toBeCalled();
  expect(onMenuCloseSpy).toBeCalled();
});

test('When "lazyLoadMenu" property = true, then menu components are only rendered in DOM when "menuOpen" state = true', async () => {
  const { queryByTestId } = renderSelect({ lazyLoadMenu: true });
  expect(queryByTestId(MENU_CONTAINER_TESTID!)).toBeNull();
});