import React, { type ComponentProps } from 'react';
import { render } from '@testing-library/react';
import AriaLiveRegion from '../src/components/AriaLiveRegion';
import { getSelectedOptionMulti, ThemeWrapper } from './helpers';
import { ARIA_LIVE_CONTEXT_ID, ARIA_LIVE_SELECTION_ID } from '../src/constants';
import type { AriaLiveAttribute, FocusedOption, SelectedOption } from '../src/types';

type AriaLiveRegionProps = ComponentProps<typeof AriaLiveRegion>;

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = (props: AriaLiveRegionProps) => {
  return render(
    <ThemeWrapper>
      <AriaLiveRegion {...props} />
    </ThemeWrapper>
  );
};

const selectedOption: SelectedOption[] = getSelectedOptionMulti();
const focusedOption: FocusedOption = { index: 0, ...selectedOption[0] };

const BASE_PROPS: AriaLiveRegionProps = {
  focusedOption,
  selectedOption,
  menuOpen: true,
  isFocused: true,
  isSearchable: true,
  ariaLive: 'polite',
  inputValue: 'search query',
  optionCount: selectedOption.length
} as const;

// ============================================
// Test cases
// ============================================

test('AriaLiveRegion component mounts and renders without error & can query childNodes by id attributes', () => {
  const { container } = renderAriaLiveRegion(BASE_PROPS);
  const childNodeIds = [ARIA_LIVE_CONTEXT_ID, ARIA_LIVE_SELECTION_ID];

  childNodeIds.forEach((id) => {
    const childNode = container.querySelector(`#${id}`);
    expect(childNode).toBeInTheDocument();
  });
});

test('"ariaLive" prop can be passed as one of the accepted aria-live values and the root A11yText span element reflects it accordingly', () => {
  const ariaLive: AriaLiveAttribute = 'assertive';
  const props = { ...BASE_PROPS, ariaLive };
  const { container } = renderAriaLiveRegion(props);
  const a11yTextRootSpanEl = container.firstChild;
  expect(a11yTextRootSpanEl).toHaveAttribute('aria-live', ariaLive);
});