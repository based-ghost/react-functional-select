import { IE_EDGE_BROWSER_REGEXP } from '../constants/regexp';

/**
 * Determines if the current browser is IE or Edge (standard/chromium).
 */
export const isMicrosoftBrowser = (): boolean => {
  return (
    typeof navigator !== 'undefined' &&
    IE_EDGE_BROWSER_REGEXP.test(navigator.userAgent)
  );
};

/**
 * Determines if the current device is touch-enabled.
 */
export const isTouchDevice = (): boolean => {
  return (
    (typeof window !== 'undefined' && 'ontouchstart' in window) ||
    (typeof navigator !== 'undefined' && !!navigator.maxTouchPoints)
  );
};