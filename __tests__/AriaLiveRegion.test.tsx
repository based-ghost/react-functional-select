import { FocusedOption } from '../src';
import { RFS_DEFAULT_THEME } from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { AriaLiveRegion } from '../src/components';
import { ARIA_LIVE_TESTID } from '../src/constants';
import { getSelectedOptionMulti } from './helpers/utils';
import { render, RenderResult } from '@testing-library/react';
import { AriaLiveRegionProps, SelectedOption } from '../src/types';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = (props: AriaLiveRegionProps): RenderResult => {
  return render(
    <ThemeProvider theme={RFS_DEFAULT_THEME}>
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
  const { getByTestId } = renderAriaLiveRegion(props);
  const ariaLiveEl = getByTestId(ARIA_LIVE_TESTID!);

  expect(ariaLiveEl).toBeInTheDocument();
  expect(ariaLiveEl.hasChildNodes()).toBeTruthy();
});