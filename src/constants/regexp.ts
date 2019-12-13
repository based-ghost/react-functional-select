// Replace leading and trailing ' ' with '' in input value
export const trimPattern = /^\s+|\s+$/g;

// Test overflowX, overflowY, and overflow styles
export const overflowPattern = /(auto|scroll)/;

// Test window.navigator.userAgent for Edge or IE browser
export const msBrowserPattern = /MSIE |Trident\/|Edge\//;