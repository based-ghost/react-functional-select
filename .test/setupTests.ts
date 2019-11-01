/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom/extend-expect';

// Global definitions
window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  media: query,
  onchange: null,
  matches: false,
  dispatchEvent: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));