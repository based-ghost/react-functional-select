import { ReactText } from 'react';
import { SELECTED_OPTION_DEFAULT } from './constants/defaults';
import { MenuOption, OptionData, SelectedOption } from './types';
import { TRIM_REGEXP, OVERFLOW_REGEXP, MS_BROWSER_REGEXP, DIACRITICS_REGEXP } from './constants/regexp';

// ============================================
// Private utility functions
// ============================================

/**
 * Strips all diacritics from a string. May not be supported by all legacy browsers (IE11 >=).
 */
function stripDiacritics(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS_REGEXP, '');
}

function isDocumentElement(el: HTMLElement | Window): boolean {
  return (el === document.documentElement || el === document.body || el === window);
}

function easeOutCubic(t: number, s: number, c: number, d: number): number {
  return c * ((t = t / d - 1) * t * t + 1) + s;
}

function getScrollTop(el: HTMLElement): number {
  return isDocumentElement(el) ? window.pageYOffset : el.scrollTop;
}

function scrollTo(el: HTMLElement, top: number): void {
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
  } else {
    el.scrollTop = top;
  }
}

function getScrollParent(el: HTMLElement): HTMLElement {
  let style = getComputedStyle(el);
  const excludeStaticParent = (style.position === 'absolute');

  if (style.position === 'fixed') {
    return document.documentElement;
  }

  for (let parent = el as HTMLElement | null; (parent = parent ? parent.parentElement : null);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    } else if (OVERFLOW_REGEXP.test(`${style.overflow}${style.overflowY}${style.overflowX}`)) {
      return parent;
    }
  }

  return document.documentElement;
}

function smoothScrollTo(
  element: HTMLElement,
  to: number,
  duration: number,
  callback?: (...args: any[]) => void
): void {
  let currentTime = 0;
  const start = getScrollTop(element);
  const change = (to - start);

  function smoothScroller(): void {
    currentTime += 5;
    scrollTo(element, easeOutCubic(currentTime, start, change, duration));
    if (currentTime < duration) {
      window.requestAnimationFrame(smoothScroller);
    } else {
      callback && callback();
    }
  }

  window.requestAnimationFrame(smoothScroller);
}

// ============================================
// Exported utility functions
// ============================================

/**
 * Tests object for type of array with a length of at least 1.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Tests for a non-array object - 'a plain object'.
 */
export function isPlainObject(test: any): boolean {
  return test && (typeof test === 'object') && !Array.isArray(test);
}

/**
 * Determines if the current device is touch-enabled.
 * Prefer (pointer: coarse) over (any-pointer: coarse) since we are likely only targeting the primary input
 */
export const isTouchDevice = (): boolean => window.matchMedia('(pointer: coarse)').matches;

/**
 * Determines if browser is Edge or IE.
 */
export const isEdgeOrIE = (): boolean => MS_BROWSER_REGEXP.test(window.navigator.userAgent);

/**
 * Apply regex to string, and if the value is NOT case sensitive, call .toLowerCase() and return result.
 */
export function trimAndFormatFilterStr(
  value: string,
  filterIgnoreCase?: boolean,
  filterIgnoreAccents?: boolean
): string {
  let formatVal = value.replace(TRIM_REGEXP, '');
  if (filterIgnoreCase) {
    formatVal = formatVal.toLowerCase();
  }
  return !filterIgnoreAccents ? formatVal : stripDiacritics(formatVal);
}

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 */
export function mergeDeep(target: any, source: any): any {
  const output = { ...target };

  Object.keys(source).forEach((key: string): void => {
    if (isPlainObject(source[key])) {
      output[key] = !(key in target)
        ? (source[key] || '')
        : mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });

  return output;
}

/**
 * Calculate space around the control and menu to determine if an animated 
 * scroll can performed to show the menu in full view. Also, execute a callback if defined.
 */
export function scrollMenuIntoViewOnOpen(
  menuEl: HTMLElement | null,
  scrollMenuIntoView: boolean | undefined,
  handleOnMenuOpen: (availableSpace?: number) => void
): void {
  // Scroll is disabled with flag or issue retrieving dom element
  if (!scrollMenuIntoView || !menuEl || !menuEl.getBoundingClientRect) {
    handleOnMenuOpen();
    return;
  }
  
  const {
    top: menuTop,
    bottom: menuBottom,
    height: menuHeight,
  } = menuEl.getBoundingClientRect();
  
  const viewHeight = window.innerHeight;
  const viewSpaceBelow = viewHeight - menuTop;

  // Menu will fit in available space - no need to do scroll
  if (viewSpaceBelow >= menuHeight) {
    handleOnMenuOpen();
    return;
  }

  const scrollParent = getScrollParent(menuEl);
  const scrollTop = getScrollTop(scrollParent);
  const scrollSpaceBelow = (scrollParent.getBoundingClientRect().height - scrollTop - menuTop);

  // Sufficient space does not exist to scroll menu fully into view
  // Calculate available space and use that as the the new menuHeight (use scrollSpaceBelow for now)
  if (scrollSpaceBelow < menuHeight) {
    handleOnMenuOpen(scrollSpaceBelow);
    return;
  }

  // Do scroll and upon scroll animation completion, execute the callback if defined
  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom || '0', 10);
  const scrollDown = (menuBottom - viewHeight + scrollTop + marginBottom);
  smoothScrollTo(scrollParent, scrollDown, 300, handleOnMenuOpen);
}

/**
 * Validates the 'option' parameter passed to the public instance method 'setValue' that is exposed
 * ...to wrapping parent components.
 */
export function validateSetValueParam(
  values: any,
  menuOptions: MenuOption[],
  getOptionValueCB: (data: OptionData) => ReactText
): SelectedOption[] {
  if (values === null || values === undefined) {
    return SELECTED_OPTION_DEFAULT;
  }

  // Get unique array of MenuOption values (ReactText[]) and use to check against menuOptions
  const results = [];
  const normalizedValuesArr = normalizeValue(values);

  const validValuesArr = normalizedValuesArr
    .filter((x) => isPlainObject(x))
    .map((x) => getOptionValueCB(x))
    .filter((item, index, self) => self.indexOf(item) === index);

  if (!isArrayWithLength(validValuesArr)) {
    return SELECTED_OPTION_DEFAULT;
  }

  for (const option of menuOptions) {
    if (validValuesArr.includes(getOptionValueCB(option))) {
      results.push(option);
      if (validValuesArr.length === results.length) {
        break;
      }
    }
  }

  return results;
}

/**
 * Ensures that the value is returned as an array type (with fallback default of []).
 */
export function normalizeValue(
  value: any,
  getOptionValueCB?: (data: OptionData) => ReactText,
  getOptionLabelCB?: (data: OptionData) => ReactText
): SelectedOption[] {
  // Cast to array of type SelectedOption[]
  const initialValues = Array.isArray(value)
    ? value.filter(Boolean)
    : (typeof value === 'object' && value !== null)
      ? [value]
      : SELECTED_OPTION_DEFAULT;
  
  // Return default of []
  if (!getOptionValueCB || !getOptionLabelCB || !isArrayWithLength(initialValues)) {
    return initialValues;
  }

  // Array has initial values - cast to typeof SelectedOption and return SelectedOption[]
  return initialValues.map((val) => ({
    data: val,
    value: getOptionValueCB(val),
    label: getOptionLabelCB(val)
  }));
}