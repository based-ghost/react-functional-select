import React from 'react';
import { ThemeTestHOC } from './helpers';
import { render } from '@testing-library/react';
import LoadingDots from '../src/components/IndicatorIcons/LoadingDots';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = () => {
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