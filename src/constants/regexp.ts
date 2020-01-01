/**
 * Replace leading and trailing ' ' with '' in input value.
 */
const TRIM_REGEXP = /^\s+|\s+$/g;

/**
 * Test overflowX, overflowY, and overflow styles.
 */
const OVERFLOW_REGEXP = /(auto|scroll)/;

/**
 * Replace all diacritics in a string.
 */
const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

/**
 * Test window.navigator.userAgent for Edge or IE browser.
 */
const MS_BROWSER_REGEXP = /MSIE |Trident\/|Edge\//;

export {
  TRIM_REGEXP,
  OVERFLOW_REGEXP,
  DIACRITICS_REGEXP,
  MS_BROWSER_REGEXP
};