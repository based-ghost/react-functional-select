/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom/extend-expect';
import MutationObserver from 'mutation-observer';

// Global MutationObserver Mocks
window.MutationObserver = MutationObserver;

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