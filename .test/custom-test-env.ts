import Environment from 'jest-environment-jsdom';

/**
 * A custom environment to set the TextEncoder that is
 * required by react-dom/server (renderToString function).
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = require('util');
      this.global.TextEncoder = TextEncoder;
    }
  }
}