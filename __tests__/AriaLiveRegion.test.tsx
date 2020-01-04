import React from 'react';
import DefaultThemeObj from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { AriaLiveRegion } from '../src/components';
import { getSelectedOptionMulti } from './helpers/utils';
import { render, RenderResult } from '@testing-library/react';
import { AriaLiveRegionProps, SelectedOption, FocusedOption } from '../src/types';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = (props: AriaLiveRegionProps): RenderResult => {
  return render(
    <ThemeProvider theme={DefaultThemeObj}>
      <AriaLiveRegion {...props} />
    </ThemeProvider>
  );
};

const createAriaLiveRegionProps = (): AriaLiveRegionProps => {
  const selectedOption: SelectedOption[] = getSelectedOptionMulti();
  const focusedOption: FocusedOption = { index: 0, ...selectedOption[0] };

  return {
    focusedOption,
    selectedOption,
    menuOpen: true,
    isFocused: true,
    isSearchable: true,
    inputValue: 'search query',
    optionCount: selectedOption.length
  };
};

// ============================================
// Test cases
// ============================================

test('AriaLiveRegion component mounts and renders without error', async () => {
  const props = createAriaLiveRegionProps();
  const { container } = renderAriaLiveRegion(props);
  expect(container.hasChildNodes()).toBeTruthy();
});