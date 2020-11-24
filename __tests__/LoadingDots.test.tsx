import { RfsTheme } from '../src/theme';
import { ThemeProvider } from 'styled-components';
import LoadingDots from '../src/components/LoadingDots';
import { render, RenderResult } from '@testing-library/react';

// ============================================
// Helper functions for LoadingDots component
// ============================================

const renderLoadingDots = (): RenderResult => {
  return render(
    <ThemeProvider theme={RfsTheme}>
      <LoadingDots />
    </ThemeProvider>
  );
};

// ============================================
// Test cases
// ============================================

test('LoadingDots component mounts and renders without error', async () => {
  const { container } = renderLoadingDots();
  expect(container.hasChildNodes()).toBeTruthy();
});