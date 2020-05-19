/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom/extend-expect';

// React SSR when environment is not js-dom
if (global.window !== undefined) {

  // Global MutationObserver Mocks
  window.MutationObserver = require('mutation-observer');

  // Global Test Environment Mocks
  window.matchMedia = jest.fn((query: string): MediaQueryList => ({
    media: query,
    onchange: null,
    matches: false,
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }));
}
