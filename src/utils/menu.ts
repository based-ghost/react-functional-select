import type { CallbackFn } from '../types';

/**
 * @private
 *
 * @param t: time (elapsed)
 * @param b: initial value
 * @param c: amount of change
 * @param d: duration
 */
function easeOutCubic(t: number, b: number, c: number, d: number): number {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

/**
 * @private
 */
function getScrollTop(el: Element): number {
  return isDocumentElement(el) ? window.pageYOffset : el.scrollTop;
}

/**
 * @private
 */
function scrollTo(el: Element, top: number): void {
  isDocumentElement(el) ? window.scrollTo(0, top) : (el.scrollTop = top);
}

/**
 * @private
 */
function isDocumentElement(el: Element | typeof window): boolean {
  return el === document.body || el === document.documentElement || el === window;
}

/**
 * @private
 */
function getScrollParent(el: Element): Element {
  let style = getComputedStyle(el);
  const isParentAbs = style.position === 'absolute';
  const overflowRegExp = /(auto|scroll)/;

  if (style.position === 'fixed') {
    return document.documentElement;
  }

  for (let parent: Element | null = el; (parent = parent?.parentElement); ) {
    style = getComputedStyle(parent);
    if (
      !(isParentAbs && style.position === 'static') &&
      overflowRegExp.test(`${style.overflow}${style.overflowX}${style.overflowY}`)
    ) {
      return parent;
    }
  }

  return document.documentElement;
}

/**
 * @private
 */
function smoothScrollTo(
  el: Element,
  to: number,
  duration: number = 300,
  callback?: CallbackFn
): void {
  let currentTime = 0;
  const start = getScrollTop(el);
  const change = to - start;

  function scrollFn() {
    currentTime += 5;
    const calcScrollTop = easeOutCubic(currentTime, start, change, duration);
    scrollTo(el, calcScrollTop);
    (currentTime < duration) ? requestAnimationFrame(scrollFn) : callback?.();
  }

  requestAnimationFrame(scrollFn);
}

/**
 * Calculates the top property value for the MenuWrapper <div />.
 * This property is only generated when the position of the menu is above the control.
 */
export const calculateMenuTop = (
  menuHeight: number,
  menuEl: Element | null,
  controlEl: Element | null
): string => {
  const menuElStyle = menuEl && getComputedStyle(menuEl);
  const marginBottom = menuElStyle ? parseInt(menuElStyle.marginBottom, 10) : 0;
  const marginTop = menuElStyle ? parseInt(menuElStyle.marginTop, 10) : 0;
  const controlHeight = controlEl?.getBoundingClientRect().height ?? 0;
  const menuHeightCalc = menuHeight > 0 ? menuHeight : (menuEl?.getBoundingClientRect().height ?? 0);
  const basePx = -Math.abs(menuHeightCalc + controlHeight);
  const adjustPx = marginBottom + marginTop;

  return `calc(${basePx}px + ${adjustPx}px)`;
};

export const menuFitsBelowControl = (el: Element | null): boolean => {
  if (!el) return true;

  const scrollParent = getScrollParent(el);
  const { top, height } = el.getBoundingClientRect();
  const { height: scrollParentHeight } = scrollParent.getBoundingClientRect();
  const spaceBelow = scrollParentHeight - getScrollTop(scrollParent) - top;

  return spaceBelow >= height;
};

/**
 * Calculate space around the control and menu to determine if an animated
 * scroll can performed to show the menu in full view. Also, execute a callback if defined.
 */
export const scrollMenuIntoViewOnOpen = (
  menuEl: Element | null,
  menuScrollDuration: number | undefined,
  scrollMenuIntoView: boolean | undefined,
  handleOnMenuOpen: (availableSpace?: number) => void
): void => {
  if (!menuEl) {
    handleOnMenuOpen();
    return;
  }

  const { top, height, bottom } = menuEl.getBoundingClientRect();
  const viewInner = window.innerHeight;
  const viewSpaceBelow = viewInner - top;

  // Menu will fit in available space - no need to do scroll
  if (viewSpaceBelow >= height) {
    handleOnMenuOpen();
    return;
  }

  const scrollParent = getScrollParent(menuEl);
  const scrollTop = getScrollTop(scrollParent);
  const spaceBelow = scrollParent.getBoundingClientRect().height - scrollTop - top;
  const notEnoughSpaceBelow = spaceBelow < height;

  // Sufficient space does not exist to scroll menu fully into view
  // ...Calculate available space and use that as the the new menuHeight (use scrollSpaceBelow for now).
  // OR scrollMenuIntoView = false
  if (notEnoughSpaceBelow || !scrollMenuIntoView) {
    const condensedMenuHeight = notEnoughSpaceBelow ? spaceBelow : undefined;
    handleOnMenuOpen(condensedMenuHeight);
    return;
  }

  // Do scroll and upon scroll animation completion, execute the callback if defined
  const marginBottomStyle = getComputedStyle(menuEl).marginBottom;
  const marginBottom = parseInt(marginBottomStyle, 10);
  const scrollDown = bottom - viewInner + scrollTop + marginBottom;

  smoothScrollTo(scrollParent, scrollDown, menuScrollDuration, handleOnMenuOpen);
};
