/* eslint-disable prettier/prettier */
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/.test', '<rootDir>/__tests__'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
};
