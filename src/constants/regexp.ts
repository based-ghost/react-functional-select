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

export {
  TRIM_REGEXP,
  OVERFLOW_REGEXP,
  DIACRITICS_REGEXP
};