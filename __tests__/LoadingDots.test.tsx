import { ThemeTestHOC } from './helpers';
import { render, RenderResult } from '@testing-library/react';
import LoadingDots from '../src/components/indicators/LoadingDots';

// ============================================
// Helper functions for LoadingDots component
// ============================================

const renderLoadingDots = (): RenderResult => {
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
  const { container } = renderLoadingDots();
  expect(container.hasChildNodes()).toBeTruthy();
});