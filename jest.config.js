/* eslint-disable prettier/prettier */
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/.test/setupTests.ts'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
};
