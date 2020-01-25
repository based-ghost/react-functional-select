/**
 * Test overflowX, overflowY, and overflow styles.
 */
const OVERFLOW_REGEXP = /(auto|scroll)/;

/**
 * Test for Microsoft browser (IE or Edge).
 */
const IE_BROWSER_REGEXP = /MSIE|Trident/;

/**
 * Replace all diacritics in a string.
 */
const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

export {
  OVERFLOW_REGEXP,
  DIACRITICS_REGEXP,
  IE_BROWSER_REGEXP
};