/* eslint-disable prettier/prettier */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/.test/setupTests.ts'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
};
