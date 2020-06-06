import { ReactText } from 'react';
import { SELECTED_OPTION_DEFAULT } from './constants/defaults';
import { MenuOption, OptionData, SelectedOption } from './types';
import { OVERFLOW_REGEXP, DIACRITICS_REGEXP, IE_EDGE_BROWSER_REGEXP } from './constants/regexp';
import { OPTION_CLS, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from './constants/dom';

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
  isDocumentElement(el)
    ? window.scrollTo(0, top)
    : el.scrollTop = top;
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
  duration: number = 300,
  callback?: (...args: any[]) => void
): void {
  let currentTime = 0;
  const start = getScrollTop(element);
  const change = (to - start);

  function smoothScroller(): void {
    currentTime += 5;
    const top = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, top);
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
 * Determines if the current browser is IE or Edge (standard/chromium).
 */
export const isEdgeOrIE = (): boolean => (typeof navigator !== 'undefined') && IE_EDGE_BROWSER_REGEXP.test(navigator.userAgent);

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
 * Builds the className property in Option.tsx component.
 */
export function optionClassName(
  isDisabled?: boolean,
  isSelected?: boolean,
  isFocused?: boolean
): string {
  let className = OPTION_CLS;

  if (isDisabled)
    className += ` ${OPTION_DISABLED_CLS}`;
  if (isSelected)
    className += ` ${OPTION_SELECTED_CLS}`;
  if (isFocused)
    className += ` ${OPTION_FOCUSED_CLS}`;

  return className;
}

/**
 * Apply regex to string, and if the value is NOT case sensitive, call .toLowerCase() and return result.
 */
export function trimAndFormatFilterStr(
  value: string,
  filterIgnoreCase?: boolean,
  filterIgnoreAccents?: boolean
): string {
  let trimVal = value.trim();
  if (filterIgnoreCase) {
    trimVal = trimVal.toLowerCase();
  }
  return !filterIgnoreAccents ? trimVal : stripDiacritics(trimVal);
}

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 * In first condition of if/else block - check that property is no 'animation', since we never want to merge that complex styled-component object.
 */
export function mergeDeep(target: any, source: any): any {
  const output = { ...target };

  Object.keys(source).forEach(key => {
    output[key] =
      (isPlainObject(source[key]) && key !== 'animation')
        ? (key in target)
          ? mergeDeep(target[key], source[key])
          : source[key]
        : source[key] || '';
  });

  return output;
}

/**
 * Calculates the top property value for the MenuWrapper <div />.
 * This property is only generated when the position of the menu is above the control.
 */
export const calculateMenuTop = (
  menuHeight: number,
  menuEl: HTMLElement | null,
  controlEl: HTMLElement | null
): string => {
  const menuHeightOrDefault = (menuHeight > 0 || !menuEl) ? menuHeight : menuEl.getBoundingClientRect().height;
  const controlHeight = controlEl ? controlEl.getBoundingClientRect().height : 0;

  const menuElStyle = menuEl && getComputedStyle(menuEl);
  const marginBottom = menuElStyle ? parseInt(menuElStyle.marginBottom || '0', 10) : 0;
  const marginTop = menuElStyle ? parseInt(menuElStyle.marginTop || '0', 10) : 0;

  return `calc(${-Math.abs(menuHeightOrDefault + controlHeight)}px + ${marginBottom + marginTop}px)`;
};

export function menuFitsBelowControl(menuEl: HTMLElement | null): boolean {
  if (!menuEl) return true;

  const menuRect = menuEl.getBoundingClientRect();
  const scrollParent = getScrollParent(menuEl);
  const scrollTop = getScrollTop(scrollParent);
  const scrollSpaceBelow = (scrollParent.getBoundingClientRect().height - scrollTop - menuRect.top);

  return (scrollSpaceBelow >= menuRect.height);
}

/**
 * Calculate space around the control and menu to determine if an animated
 * scroll can performed to show the menu in full view. Also, execute a callback if defined.
 */
export function scrollMenuIntoViewOnOpen(
  menuEl: HTMLElement | null,
  menuScrollDuration: number | undefined,
  scrollMenuIntoView: boolean | undefined,
  handleOnMenuOpen: (availableSpace?: number) => void
): void {
  if (!menuEl) {
    handleOnMenuOpen();
    return;
  }

  const viewInner = window.innerHeight;
  const menuRect = menuEl.getBoundingClientRect();
  const viewSpaceBelow = viewInner - menuRect.top;

  // Menu will fit in available space - no need to do scroll
  if (viewSpaceBelow >= menuRect.height) {
    handleOnMenuOpen();
    return;
  }

  const scrollParent = getScrollParent(menuEl);
  const scrollTop = getScrollTop(scrollParent);
  const scrollSpaceBelow = (scrollParent.getBoundingClientRect().height - scrollTop - menuRect.top);
  const notEnoughSpaceBelow = scrollSpaceBelow < menuRect.height;

  // Sufficient space does not exist to scroll menu fully into view
  // ...Calculate available space and use that as the the new menuHeight (use scrollSpaceBelow for now).
  // OR scrollMenuIntoView = false
  if (notEnoughSpaceBelow || !scrollMenuIntoView) {
    const condensedMenuHeight = notEnoughSpaceBelow ? scrollSpaceBelow : undefined;
    handleOnMenuOpen(condensedMenuHeight);
    return;
  }

  // Do scroll and upon scroll animation completion, execute the callback if defined
  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom || '0', 10);
  const scrollDown = (menuRect.bottom - viewInner + scrollTop + marginBottom);
  smoothScrollTo(scrollParent, scrollDown, menuScrollDuration, handleOnMenuOpen);
}

/**
 * Validates the 'option' parameter passed to the public instance method 'setValue' that is exposed
 * ...to wrapping parent components.
 */
export function validateSetValueParam(
  values: any,
  menuOptions: MenuOption[],
  getOptionValue: (data: OptionData) => ReactText
): SelectedOption[] {
  if (values === null || values === undefined) {
    return SELECTED_OPTION_DEFAULT;
  }

  // Get array of valid MenuOption values (ReactText[]) and use to check against menuOptions
  const normalizedVal = normalizeValue(values);
  const validValues = normalizedVal.reduce((acc: ReactText[], x: SelectedOption) => {
    isPlainObject(x) && acc.push(getOptionValue(x));
    return acc;
  }, []);

  if (!isArrayWithLength(validValues)) {
    return SELECTED_OPTION_DEFAULT;
  }

  // Get uniq validValues and verify against menuOptions provided
  const results = [];
  const validValuesUniq = [...new Set(validValues)];

  for (const option of menuOptions) {
    if (validValuesUniq.includes(getOptionValue(option))) {
      results.push(option);
      if (validValuesUniq.length === results.length) {
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
  getOptionValue?: (data: OptionData) => ReactText,
  getOptionLabel?: (data: OptionData) => ReactText
): SelectedOption[] {
  // Cast to array of type SelectedOption[]
  const initialValues = Array.isArray(value)
    ? value.filter(Boolean)
    : isPlainObject(value)
      ? [value]
      : SELECTED_OPTION_DEFAULT;

  // Return default of []
  if (!getOptionValue || !getOptionLabel || !isArrayWithLength(initialValues)) {
    return initialValues;
  }

  // Array has initial values - cast to typeof SelectedOption and return SelectedOption[]
  return initialValues.map((initVal: any) => ({
    data: initVal,
    value: getOptionValue(initVal),
    label: getOptionLabel(initVal)
  }));
}