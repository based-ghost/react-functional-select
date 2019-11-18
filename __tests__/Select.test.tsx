import React from 'react';
import { Select } from '../src';
import { SelectProps } from '../src/types';
import DefaultThemeObj from '../src/theme';
import { render, fireEvent, wait } from '@testing-library/react';
import {
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
  MENU_CONTAINER_TESTID,
  AUTOSIZE_INPUT_TESTID,
  SELECT_CONTAINER_TESTID,
  CONTROL_CONTAINER_TESTID,
} from '../src/constants/attributes';

// ============================================
// Helper functions for Select component
// ============================================

const renderSelect = (props?: SelectProps) => {
  return render(
    <Select 
      {...props} 
      themeConfig={DefaultThemeObj} 
    />
  );
};

// ============================================
// Test cases
// ============================================

test('container elements have static className value (enables styling via classic CSS) when "addClassNames" = true', async () => {
  const props = { addClassNames: true };
  const { getByTestId } = renderSelect(props);
  expect(getByTestId(SELECT_CONTAINER_TESTID!)).toHaveClass(SELECT_CONTAINER_CLS);
  expect(getByTestId(CONTROL_CONTAINER_TESTID!)).toHaveClass(CONTROL_CONTAINER_CLS);
  expect(getByTestId(MENU_CONTAINER_TESTID!)).toHaveClass(MENU_CONTAINER_CLS);
});

test('id attributes are added to DOM if defined ("selectId", "inputId" props with "idSuffix" appended)', async () => {
  const idSuffix = 'suffix-test';
  const inputId = 'test-input-id';
  const selectId = 'test-select-id';

  const props = {
    inputId,
    selectId,
    idSuffix,
  };

  const { getByTestId } = renderSelect(props);
  expect(getByTestId(SELECT_CONTAINER_TESTID!)).toHaveAttribute('id', `${selectId}-${idSuffix}`);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute('id', `${inputId}-${idSuffix}`);
});

test('menu is not visible by default', async () => {
  const { getByTestId } = renderSelect();
  expect(getByTestId(MENU_CONTAINER_TESTID!)).not.toBeVisible();
});

test('menu is visible after the "mouseDown" event is fired on the control container', async () => {
  const { getByTestId } = renderSelect();
  fireEvent.mouseDown(getByTestId(CONTROL_CONTAINER_TESTID!));
  await wait(() => expect(getByTestId(MENU_CONTAINER_TESTID!)).toBeVisible());
});

test('"onInputFocus" callback should be fired when input is focused (if a defined function)', async () => {
  const onFocusSpy = jest.fn();
  const props = {
    onInputFocus: onFocusSpy,
  };
  const { getByTestId } = renderSelect(props);
  fireEvent.focus(getByTestId(AUTOSIZE_INPUT_TESTID!));
  expect(onFocusSpy).toHaveBeenCalledTimes(1);
});

test('when "openMenuOnFocus" = true (the default value), then onFocus of input should open the menu', async () => {
  const props = {
    openMenuOnFocus: true,
  };
  const { getByTestId } = renderSelect(props);
  fireEvent.focus(getByTestId(AUTOSIZE_INPUT_TESTID!));
  await wait(() => expect(getByTestId(MENU_CONTAINER_TESTID!)).toBeVisible());
});

test('"onInputBlur" callback should be fired on blur (if a defined function)', async () => {
  const onBlurSpy = jest.fn();
  const props = {
    onInputBlur: onBlurSpy,
  };
  const { getByTestId } = renderSelect(props);
  fireEvent.blur(getByTestId(AUTOSIZE_INPUT_TESTID!));
  expect(onBlurSpy).toHaveBeenCalledTimes(1);
});

test('when "isDisabled" = true, the DOM elements render as expected to prevent user interaction', async () => {
  const onFocusSpy = jest.fn();
  const props = {
    isDisabled: true,
    onInputFocus: onFocusSpy,
  };
  
  const { getByTestId } = renderSelect(props);

  // input has disabled attribute
  // mouseDown event should exit function when disabled (should not open the menu/focus input - which it normally would)
  // onFocus callback should not run with mouseDown on control
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toBeDisabled();
  fireEvent.mouseDown(getByTestId(CONTROL_CONTAINER_TESTID!));
  expect(getByTestId(MENU_CONTAINER_TESTID!)).not.toBeVisible();
  expect(onFocusSpy).not.toBeCalled();
});

test('toggling the menu to open/close fires corresponding callbacks "onMenuOpen" and "onMenuClose" (if they are defined functions)', async () => {
  const onMenuOpenSpy = jest.fn();
  const onMenuCloseSpy = jest.fn();
  
  const props = {
    onMenuOpen: onMenuOpenSpy,
    onMenuClose: onMenuCloseSpy,
  };

  const { getByTestId } = renderSelect(props);
  fireEvent.mouseDown(getByTestId(CONTROL_CONTAINER_TESTID!));
  fireEvent.mouseDown(getByTestId(CONTROL_CONTAINER_TESTID!));
  
  expect(onMenuOpenSpy).toBeCalled();
  expect(onMenuCloseSpy).toBeCalled();
});