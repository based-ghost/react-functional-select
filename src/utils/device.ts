// Test for IE or legacy Edge (exclude "Edg" check for chromium-based Edge browser)
const MS_BROWSER_REG_EXP = /(MSIE|Trident\/|Edge\/)/i;

/**
 * Determines if the current device is touch-enabled.
 */
export const IS_TOUCH_DEVICE =
  (typeof window !== 'undefined' && 'ontouchstart' in window) ||
  (typeof navigator !== 'undefined' && !!navigator.maxTouchPoints);

/**
 * Determines if the current browser is IE or Edge (standard/chromium).
 */
export const IS_MICROSOFT_BROWSER =
  typeof navigator !== 'undefined' && MS_BROWSER_REG_EXP.test(navigator.userAgent);