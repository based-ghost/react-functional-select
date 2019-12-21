// Replace leading and trailing ' ' with '' in input value
export const TRIM_REGEXP = /^\s+|\s+$/g;

// Test overflowX, overflowY, and overflow styles
export const OVERFLOW_REGEXP = /(auto|scroll)/;

// Replace all diacritics in a string
export const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

// Test window.navigator.userAgent for Edge or IE browser
export const MS_BROWSER_REGEXP = /MSIE |Trident\/|Edge\//;