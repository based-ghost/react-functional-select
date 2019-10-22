import { ReactText } from 'react';
import { MenuOption, OptionData, SelectedOption } from './types';
import { css, FlattenSimpleInterpolation } from 'styled-components';

// ============================================
// Private utility functions
// ============================================

function isDocumentElement(el: HTMLElement | Window): boolean {
  return (el === document.documentElement || el === document.body || el === window);
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

  for (let parent = el; (parent = (parent.parentElement as HTMLElement));) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    } else if (/(auto|scroll)/.test(`${style.overflow}${style.overflowY}${style.overflowX}`)) {
      return parent;
    }
  }

  return document.documentElement;
}

function smoothScrollTo(
  element: HTMLElement,
  to: number,
  duration: number,
  callback?: (el: HTMLElement) => void
): void {
  const start = getScrollTop(element);
  const change = to - start;
  let currentTime = 0;

  function easeOutCubic(t: number, s: number, c: number, d: number): number {
    return c * ((t = t / d - 1) * t * t + 1) + s;
  }

  function smoothScroller(): void {
    currentTime += 5;
    scrollTo(element, easeOutCubic(currentTime, start, change, duration));
    if (currentTime < duration) {
      requestAnimationFrame(smoothScroller);
    } else {
      callback && callback(element);
    }
  }

  requestAnimationFrame(smoothScroller);
}

// ============================================
// Exported utility functions
// ============================================

/**
 * Tests for the six primitive types: 
 * boolean, null, undefined, string, number, symbol
 */
export function isPrimitive(test: any): boolean {
  return (test !== Object(test));
}

/**
 * Tests object for type of array with a length of at least 1.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Determines if the current device is touch-enabled.
 * Prefer (pointer: coarse) over (any-pointer: coarse) since we are likely only targeting the primary input
 */
export function isTouchDevice(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Takes array of strings or short-circuit conditions that evaluate to a string and 
 * joins them as a single string, seperated by a single space.
 */
export function createClassName(classNames: any[]): string {
  return classNames.filter(x => x).join(' ');
}

/**
 * Tests for a non-array object - 'a plain object'.
 */
export function isPlainObject(test: any): boolean {
  return test && (typeof test === 'object') && !Array.isArray(test);
}

/**
 * Takes a string prefix and suffix and combines them to create a GUID.
 * If the prefix is null or underfined or '', then undefined is returned.
 */
export function createID(idPrefix?: string, idSuffix?: string): string | undefined {
  if (!idPrefix) { 
    return undefined; 
  }
  if (!idSuffix) { 
    return idPrefix; 
  }
  return `${idPrefix}-${idSuffix}`;
}

/**
 * Apply regex to string, and if the value is NOT case sensitive, call .toLowerCase() and return result.
 */
export function trimAndFormatFilterStr(value: string, filterIsCaseSensitive?: boolean): string {
  const formatVal = value.replace(/^\s+|\s+$/g, '');
  return !filterIsCaseSensitive ? formatVal.toLowerCase() : formatVal;
}

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 */
export function mergeDeep(target: any, source: any): any {
  const output = { ...target };

  Object.keys(source).forEach((key: string) => {
    if (isPlainObject(source[key])) {
      output[key] = (!(key in target))
        ? source[key]
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
  scrollMenuIntoView?: boolean,
  onMenuOpen?: (...args: any[]) => void
): void {
  // Scroll is disabled with flag or issue retrieving dom element (execute callback if defined)
  if (!scrollMenuIntoView || !menuEl || !menuEl.getBoundingClientRect) {
    onMenuOpen && onMenuOpen();
    return;
  }
  
  const menuRect = menuEl.getBoundingClientRect();
  const viewHeight = window.innerHeight;

  // Menu will fit in available space - no need to do scroll (execute callback if defined)
  if ((viewHeight - menuRect.top) >= menuRect.height) {
    onMenuOpen && onMenuOpen();
    return;
  }

  const scrollParent = getScrollParent(menuEl);
  const scrollTop = getScrollTop(scrollParent);
  const scrollSpaceBelow = (scrollParent.getBoundingClientRect().height - scrollTop - menuRect.top);

  // Sufficient space does not exist to scroll menu fully into view (execute callback if defined)
  if (scrollSpaceBelow < menuRect.height) {
    onMenuOpen && onMenuOpen();
    return;
  }

  // Do scroll and upon scroll animation completion, execute the callback if defined
  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom || '0');
  const scrollDown = (menuRect.bottom - viewHeight + scrollTop + marginBottom);
  smoothScrollTo(scrollParent, scrollDown, 300, onMenuOpen);
}

/**
 * If option is null/undefined/or an invalid type (array), return undefined
 * If option is a primitive type (excluding null or undefined) then assume it is the option value and try to use it as is
 * ...otherwise, if option is an object, extract the optionValue using method and search for first match on option value in menuOptions.
 */
export function validateSetValueOption(
  option: any,
  menuOptions: MenuOption[],
  getOptionValue_CB: (data: OptionData) => ReactText
): SelectedOption | undefined {
  if (option === null || option === undefined || Array.isArray(option)) {
    return undefined;
  }
  const optionValue = (option && isPrimitive(option)) ? option : getOptionValue_CB(option);
  return menuOptions.find((mOption) => mOption.value === optionValue) || undefined;
}

/**
 * Used exclusively by the ControlWrapper styled-component.
 */
export const renderControlEmphasis = (
  boxShadow: string,
  borderColor: string,
  invalidColor: string,
  invalidFocus: string,
  boxShadowColor: string,
  focusedBorderColor: string,
  isFocused: boolean,
  isInvalid?: boolean
): FlattenSimpleInterpolation => {
  if (isFocused) {
    return css`
      border-color: ${isInvalid ? invalidColor : focusedBorderColor};
      box-shadow: ${boxShadow} ${isInvalid ? invalidFocus : boxShadowColor};
    `;
  }
  return css`
    border-color: ${isInvalid ? invalidColor : borderColor};
  `;
};