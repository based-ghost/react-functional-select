/* tslint:disable: strict-type-predicates */
const IE_EDGE_BROWSER_REGEXP = /(MSIE|Trident\/|Edge\/|Edg\/)/i;

/**
 * Determines if the current browser is IE or Edge (standard/chromium).
 */
export const isEdgeOrIE = (): boolean => {
  return (
    (typeof navigator !== 'undefined') &&
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