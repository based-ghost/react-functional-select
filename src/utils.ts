import { ReactText } from 'react';
import { MenuOption, OptionData, SelectedOption } from './types';

// ============================================
// Private utility functions
// ============================================

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
  let style: CSSStyleDeclaration = getComputedStyle(el);
  const excludeStaticParent: boolean = (style.position === 'absolute');

  if (style.position === 'fixed') {
    return document.documentElement;
  }

  for (let parent = el as HTMLElement | null; (parent = parent ? parent.parentElement : null);) {
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
  callback?: (...args: any[]) => void
): void {
  let currentTime = 0;
  const start: number = getScrollTop(element);
  const change: number = (to - start);

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
 * Takes a string prefix and suffix and combines them to create a GUID.
 * If the prefix is null or underfined or '', then undefined is returned.
 */
export function createID(idPrefix?: string, idSuffix?: string): string | undefined {
  if (!idPrefix) { 
    return undefined; 
  }
  return (!idSuffix) ? idPrefix : `${idPrefix}-${idSuffix}`;
}

/**
 * Determines if the current device is touch-enabled.
 * Prefer (pointer: coarse) over (any-pointer: coarse) since we are likely only targeting the primary input
 */
export const isTouchDevice = (): boolean => window.matchMedia('(pointer: coarse)').matches;

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

  Object.keys(source).forEach((key: string): void => {
    if (isPlainObject(source[key])) {
      output[key] = !(key in target) 
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
 * If option is null/undefined/or an invalid type (array), return undefined
 * If option is a primitive type (excluding null or undefined) then assume it is the option value and try to use it as is
 * ...otherwise, if option is an object, extract the optionValue using method and search for first match on option value in menuOptions.
 */
export function validateSetValueOption(
  option: any,
  menuOptions: MenuOption[],
  getOptionValueCB: (data: OptionData) => ReactText
): SelectedOption | undefined {
  if (option === null || option === undefined || Array.isArray(option)) {
    return;
  }
  const optionValue = (option && (option !== Object(option))) ? option : getOptionValueCB(option);
  return menuOptions.find((mOption) => mOption.value === optionValue);
}