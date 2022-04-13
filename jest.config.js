const { defaults } = require('jest-config');
const { moduleFileExtensions } = defaults;

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.test/setupTests.ts'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  moduleFileExtensions: [...moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest'
  }
};
