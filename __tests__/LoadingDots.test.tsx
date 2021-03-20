import { ThemeTestHOC } from './helpers';
import { render } from '@testing-library/react';
import LoadingDots from '../src/components/indicators/LoadingDots';

import type { RenderResult } from '@testing-library/react';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = (): RenderResult => {
  return render(
    <ThemeTestHOC>
      <LoadingDots />
    </ThemeTestHOC>
  );
};

// ============================================
// Test cases
// ============================================

test('LoadingDots component mounts and renders without error', async () => {
  const { container } = renderAriaLiveRegion();
  expect(container.hasChildNodes()).toBeTruthy();
});