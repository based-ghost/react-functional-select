/**
 * Test overflowX, overflowY, and overflow styles.
 */
const OVERFLOW_REGEXP = /(auto|scroll)/;

/**
 * Replace all diacritics in a string.
 */
const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

/**
 * Test for Microsoft browser (IE or Edge).
 */
const MS_BROWSER_REGEXP = /MSIE |Trident\/|Edge\//;

export {
  OVERFLOW_REGEXP,
  DIACRITICS_REGEXP,
  MS_BROWSER_REGEXP
};