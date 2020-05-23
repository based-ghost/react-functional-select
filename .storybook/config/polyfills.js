import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

/**
 * 1). Polyfill EventSource for Edge/IE browser.
 */
export const polyfillManager = {
  polyfillEventSource() {
    global.EventSource = NativeEventSource || EventSourcePolyfill;
  },

  polyfill() {
    this.polyfillEventSource();
  }
};