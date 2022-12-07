import React, { type ReactNode, type ComponentProps } from 'react';
import { ThemeTestHOC } from './helpers';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IndicatorIcons from '../src/components/IndicatorIcons';
import { CLEAR_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../src/constants';

type IndicatorIconsProps = ComponentProps<typeof IndicatorIcons>;

// ============================================
// Helper functions for IndicatorIcons component
// ============================================

const renderIndicatorIcons = (props: IndicatorIconsProps) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeTestHOC>
        <IndicatorIcons {...props} />
      </ThemeTestHOC>
    )
  };
};

const onClearMouseDownSpy = jest.fn();
const onCaretMouseDownSpy = jest.fn();

const BASE_PROPS: IndicatorIconsProps = {
  menuOpen: false,
  showClear: true,
  onClearMouseDown: onClearMouseDownSpy,
  onCaretMouseDown: onCaretMouseDownSpy
} as const;

const customIconFn = (props: Partial<IndicatorIconsProps>): ReactNode => {
  const { menuOpen, isLoading, isInvalid, isDisabled } = props;
  const testIdText = `${menuOpen}-${isLoading}-${isInvalid}-${isDisabled}`;

  return (
    <span data-testid={testIdText}>
      custom_icon
    </span>
  );
};

// ============================================
// Test cases
// ============================================

test('clear icon has a static className (enables styling via classic CSS)', async () => {
  const { getByTestId } = renderIndicatorIcons(BASE_PROPS);
  const firstChildOfClearIconElement = getByTestId(CLEAR_ICON_TESTID!).firstChild;
  expect(firstChildOfClearIconElement).toHaveClass(CLEAR_ICON_CLS);
});

test('clear indicator has functioning "click" user interactions', async () => {
  const { user, getByTestId } = renderIndicatorIcons(BASE_PROPS);
  const clearIndicatorEl = getByTestId(CLEAR_ICON_TESTID!);
  await user.click(clearIndicatorEl);
  expect(onClearMouseDownSpy).toBeCalled();
});

test('caret indicator has functioning "click" user interactions', async () => {
  const { user, getByTestId } = renderIndicatorIcons(BASE_PROPS);
  const caretIndicatorEl = getByTestId(CARET_ICON_TESTID!);
  await user.click(caretIndicatorEl);
  expect(onCaretMouseDownSpy).toBeCalled();
});

test('clear icon is not rendered and loading animation is rendered when "isLoading" = true', async () => {
  const props = { ...BASE_PROPS, isLoading: true };
  const { queryByTestId } = renderIndicatorIcons(props);
  expect(queryByTestId(CLEAR_ICON_TESTID!)).toBeNull();
});

test('loading can render as a custom node (instead of default LoadingDots.tsx component)', async () => {
  const loadingNodeText = 'loading-node';
  const loadingNode = <span>{loadingNodeText}</span>;

  const props = {
    ...BASE_PROPS,
    loadingNode,
    isLoading: true,
  };

  const { getByText } = renderIndicatorIcons(props);
  expect(getByText(loadingNodeText)).toBeInTheDocument();
});

test('clear icon can render as a ReactNode', async () => {
  const clearIconText = 'clear-icon-node';
  const clearIcon = <span>{clearIconText}</span>;
  const props = { ...BASE_PROPS, clearIcon };
  const { getByText } = renderIndicatorIcons(props);
  expect(getByText(clearIconText)).toBeInTheDocument();
});

test('clear icon can render as a callback function with return type of ReactNode - callback accepts forwarded state props from wrapping component.', async () => {
  const props = {
    ...BASE_PROPS,
    menuOpen: true,
    clearIcon: customIconFn
  };

  const { getByTestId } = renderIndicatorIcons(props);

  // Build test-id from forwarded state javascript object payload
  const { menuOpen, isLoading, isInvalid, isDisabled } = props;
  const forwardedStateId = `${menuOpen}-${isLoading}-${isInvalid}-${isDisabled}`
  expect(getByTestId(forwardedStateId)).toBeInTheDocument();
});

test('caret icon can render as a ReactNode', async () => {
  const caretIconText = 'caret-icon-node';
  const caretIcon = <span>{caretIconText}</span>;
  const props = { ...BASE_PROPS, caretIcon };
  const { getByText } = renderIndicatorIcons(props);
  expect(getByText(caretIconText)).toBeInTheDocument();
});

test('caret icon can render as a callback function with return type of ReactNode - callback accepts forwarded state props from wrapping component.', async () => {
  const props = { ...BASE_PROPS, menuOpen: true, caretIcon: customIconFn };
  const { getByTestId } = renderIndicatorIcons(props);

  // Build test-id from forwarded state javascript object payload
  const { menuOpen, isLoading, isInvalid, isDisabled } = props;
  const forwardedStateId = `${menuOpen}-${isLoading}-${isInvalid}-${isDisabled}`
  expect(getByTestId(forwardedStateId)).toBeInTheDocument();
});