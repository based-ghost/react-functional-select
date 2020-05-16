import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

/**
 * 1). Polyfill EventSource for Edge/IE browser.
 * 2). If IE, polyfill string.prototype.normalize().
 */
export const polyfillManager = {
  isIE() {
    const isWindowAvailable = !!(window && window.navigator);
    return isWindowAvailable && /MSIE|Trident/.test(window.navigator.userAgent);
  },

  polyfillEventSource() {
    global.EventSource = NativeEventSource || EventSourcePolyfill;
  },

  polyfillNormalizeLib() {
    if (this.isIE()) {
      import('unorm').catch(e => console.error(e));
    }
  },

  polyfill() {
    this.polyfillEventSource();
    return this;
  }
};