/**
 * Test String.normalize('NFD') for diacritics
 */
export const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

/**
 * Test navigator.userAgent for IE/Edge browser
 */
export const IE_EDGE_BROWSER_REGEXP = /(MSIE|Trident\/|Edge\/|Edg\/)/i;