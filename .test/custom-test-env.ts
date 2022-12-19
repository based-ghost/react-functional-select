import Environment from 'jest-environment-jsdom';

/**
 * A custom environment to set the TextEncoder that is required by react-dom/server
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = await import('util');
      this.global.TextEncoder = TextEncoder;
    }
  }
}