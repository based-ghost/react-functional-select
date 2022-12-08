import React from 'react';
import { ThemeWrapper } from './helpers';
import { render } from '@testing-library/react';
import LoadingDots from '../src/components/IndicatorIcons/LoadingDots';

// ============================================
// Helper functions for AriaLiveRegion component
// ============================================

const renderAriaLiveRegion = () => {
  return render(
    <ThemeWrapper>
      <LoadingDots />
    </ThemeWrapper>
  );
};

// ============================================
// Test cases
// ============================================

test('LoadingDots component mounts and renders without error', () => {
  const { container } = renderAriaLiveRegion();
  expect(container.hasChildNodes()).toBeTruthy();
});