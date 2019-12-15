// Replace leading and trailing ' ' with '' in input value
export const trimPattern = /^\s+|\s+$/g;

// Replace all diacritics in a string
export const diacriticsPattern = /[\u0300-\u036f]/g;

// Test overflowX, overflowY, and overflow styles
export const overflowPattern = /(auto|scroll)/;

// Test window.navigator.userAgent for Edge or IE browser
export const msBrowserPattern = /MSIE |Trident\/|Edge\//;