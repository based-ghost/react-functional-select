import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// Polyfill EventSource for Edge and IE browsers
global.EventSource = NativeEventSource || EventSourcePolyfill;

// Polyfill string.prototype.normalize() for IE only
// Dynamic imports via @babel/plugin-syntax-dynamic-import
// If for whatever reason window or window.navigator isn't available, error one side of caution and load polyfill
const isWindowAvailable = Boolean(window && window.navigator);
const isBrowserIE = (isWindowAvailable && /MSIE|Trident/.test(window.navigator.userAgent));

if (!isWindowAvailable || isBrowserIE) {
  import('unorm').catch(e => console.error(e));
}