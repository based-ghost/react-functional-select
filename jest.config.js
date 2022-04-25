const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: '<rootDir>/.test/custom-test-env.ts',
  setupFilesAfterEnv: ['<rootDir>/.test/setup-tests.ts'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
};
