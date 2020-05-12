import React from 'react';
import DefaultThemeObj from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { IndicatorIcons } from '../src/components';
import { IndicatorIconsProps } from '../src/types';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { CLEAR_ICON_CLS, CLEAR_ICON_TESTID, CARET_ICON_TESTID } from '../src/constants/dom';

// ============================================
// Helper functions for IndicatorIcons component
// ============================================

const renderIndicatorIcons = (props: IndicatorIconsProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <IndicatorIcons {...props} />
    </ThemeProvider>
  );
};

const createIndicatorIconsProps = () => {
  const onClearMouseDownSpy = jest.fn();
  const onCaretMouseDownSpy = jest.fn();

  const props: IndicatorIconsProps = {
    menuOpen: false,
    showClear: true,
    isTouchDevice: true,
    onClearMouseDown: onClearMouseDownSpy,
    onCaretMouseDown: onCaretMouseDownSpy
  };

  return {
    props,
    onClearMouseDownSpy,
    onCaretMouseDownSpy
  };
};

// ============================================
// Test cases
// ============================================

test('clear icon has a static className (enables styling via classic CSS) when "addClassNames" = true', async () => {
  const { props } = createIndicatorIconsProps();
  const mergedProps = {
    ...props,
    addClassNames: true,
  };
  const { getByTestId } = renderIndicatorIcons(mergedProps);
  const firstChildOfClearIconElement = getByTestId(CLEAR_ICON_TESTID!).firstChild;
  expect(firstChildOfClearIconElement).toHaveClass(CLEAR_ICON_CLS);
});

test('clear indicator has functioning "mouseDown" and "touchEnd" events', async () => {
  const { props, onClearMouseDownSpy } = createIndicatorIconsProps();
  const { getByTestId } = renderIndicatorIcons(props);
  const clearIndicatorEl = getByTestId(CLEAR_ICON_TESTID!);

  fireEvent.touchEnd(clearIndicatorEl);
  fireEvent.mouseDown(clearIndicatorEl);

  expect(onClearMouseDownSpy).toHaveBeenCalledTimes(2);
});

test('caret indicator has functioning "mouseDown" and "touchEnd" events', async () => {
  const { props, onCaretMouseDownSpy } = createIndicatorIconsProps();
  const { getByTestId } = renderIndicatorIcons(props);
  const caretIndicatorEl = getByTestId(CARET_ICON_TESTID!);

  fireEvent.touchEnd(caretIndicatorEl);
  fireEvent.mouseDown(caretIndicatorEl);

  expect(onCaretMouseDownSpy).toHaveBeenCalledTimes(2);
});

test('clear icon is not rendered and loading animation is rendered when "isLoading" = true', async () => {
  const { props } = createIndicatorIconsProps();
  const mergedProps = {
    ...props,
    isLoading: true,
  };
  const { queryByTestId } = renderIndicatorIcons(mergedProps);
  expect(queryByTestId(CLEAR_ICON_TESTID!)).toBeNull();
});

test('loading can render as a custom node (instead of default LoadingDots.tsx component)', async () => {
  const loadingNodeText = 'loading-node';
  const loadingNode = (<span>{loadingNodeText}</span>);
  const { props } = createIndicatorIconsProps();

  const mergedProps = {
    ...props,
    loadingNode,
    isLoading: true,
  };

  const { getByText } = renderIndicatorIcons(mergedProps);
  expect(getByText(loadingNodeText)).toBeInTheDocument();
});

test('clear icon can render as a custom node', async () => {
  const clearIconText = 'clear-icon-node';
  const clearIcon = (<span>{clearIconText}</span>);
  const { props } = createIndicatorIconsProps();

  const mergedProps = {
    ...props,
    clearIcon,
  };

  const { getByText } = renderIndicatorIcons(mergedProps);
  expect(getByText(clearIconText)).toBeInTheDocument();
});

test('caret icon can render as a custom node', async () => {
  const caretIconText = 'caret-icon-node';
  const caretIcon = (<span>{caretIconText}</span>);
  const { props } = createIndicatorIconsProps();

  const mergedProps = {
    ...props,
    caretIcon,
  };

  const { getByText } = renderIndicatorIcons(mergedProps);
  expect(getByText(caretIconText)).toBeInTheDocument();
});