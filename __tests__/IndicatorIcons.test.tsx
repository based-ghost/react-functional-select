import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { defaultTheme } from '../src/theme';
import { IndicatorIcons } from '../src/components';
import { IndicatorIconsProps } from '../src/types';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import { CLEAR_ICON_CLS, CLEAR_ICON_TESTID } from '../src/constants/attributes';

// ============================================
// Helper functions for IndicatorIcons component
// ============================================

const renderIndicatorIcons = (props: IndicatorIconsProps) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <IndicatorIcons {...props} />
    </ThemeProvider>
  );
};

const createIndicatorIconsProps = () => {
  const onClearMouseDownSpy = jest.fn();

  const props: IndicatorIconsProps = {
    menuOpen: false,
    showClear: true,
    onClearMouseDown: onClearMouseDownSpy,
  };

  return {
    props,
    onClearMouseDownSpy,
  };
};

// ============================================
// Test cases
// ============================================

test('clear icon is rendered correctly', async () => {
  const { props } = createIndicatorIconsProps();
  const { getByTestId } = renderIndicatorIcons(props);
  expect(getByTestId(CLEAR_ICON_TESTID!)).toBeInTheDocument();
});

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

test('clear icon has functioning mouseDown and touchEnd events', async () => {
  const { props, onClearMouseDownSpy } = createIndicatorIconsProps();
  const { getByTestId } = renderIndicatorIcons(props);
  const clearIconElement = getByTestId(CLEAR_ICON_TESTID!);
  fireEvent.touchEnd(clearIconElement);
  fireEvent.mouseDown(clearIconElement);
  expect(onClearMouseDownSpy).toHaveBeenCalledTimes(2);
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

test('clear and caret icons can render custom nodes', async () => {
  const clearIconText = 'clear-icon-node';
  const caretIconText = 'caret-icon-node';
  const clearIcon = (<span>{clearIconText}</span>);
  const caretIcon = (<span>{caretIconText}</span>);

  const { props } = createIndicatorIconsProps();
  
  const mergedProps = {
    ...props,
    clearIcon,
    caretIcon,
  };

  const { getByText } = renderIndicatorIcons(mergedProps);
  expect(getByText(clearIconText)).toBeInTheDocument();
  expect(getByText(caretIconText)).toBeInTheDocument();
});