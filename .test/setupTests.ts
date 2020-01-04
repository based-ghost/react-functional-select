/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom/extend-expect';

// Global Test Environment Mocks
window.matchMedia = jest.fn((query: string): MediaQueryList => ({
  media: query,
  onchange: null,
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
}));