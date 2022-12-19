module.exports = {
  transform: {'\\.[jt]sx?$': 'babel-jest'},
  testEnvironment: '<rootDir>/.test/custom-test-env.ts',
  setupFilesAfterEnv: ['<rootDir>/.test/setup-tests.ts'],
  testMatch: ['<rootDir>/__tests__/*?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
};