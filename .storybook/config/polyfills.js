import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

/**
 * 1). Polyfill EventSource for Edge and IE browsers.
 * 2). If IE, polyfill string.prototype.normalize().
 * Function 'normalizePolyfill' checks for IE or if window object is not intialized.
 */
export function polyfillBrowserMS() {
  function normalizePolyfill() {
    const isWindowAvailable = Boolean(window && window.navigator);
    const isBrowserIE = (isWindowAvailable && /MSIE|Trident/.test(window.navigator.userAgent));
    return !isWindowAvailable || isBrowserIE;
  }

  global.EventSource = NativeEventSource || EventSourcePolyfill;

  if (normalizePolyfill()) {
    import('unorm')
      .then(() => {})
      .catch((e) => console.error(e));
  }
}