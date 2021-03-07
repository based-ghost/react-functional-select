import { FocusedOption, SelectedOption } from '../src/types';
import { render, RenderResult } from '@testing-library/react';
import { getSelectedOptionMulti, ThemeTestHOC } from './helpers';
import { ARIA_LIVE_CONTEXT_ID, ARIA_LIVE_SELECTION_ID } from '../src/constants';
import AriaLiveRegion, { AriaLiveRegionProps } from '../src/components/aria/AriaLiveRegion';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = (props: AriaLiveRegionProps): RenderResult => {
  return render(
    <ThemeTestHOC>
      <AriaLiveRegion {...props} />
    </ThemeTestHOC>
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

test('AriaLiveRegion component mounts and renders without error & can query childNodes by id attributes', async () => {
  const props = createAriaLiveRegionProps();
  const { container } = renderAriaLiveRegion(props);
  const childNodeIds = [ARIA_LIVE_CONTEXT_ID, ARIA_LIVE_SELECTION_ID];

  childNodeIds.forEach((id) => {
    const childNode = container.querySelector(`#${id}`);
    expect(childNode).toBeInTheDocument();
  });
});