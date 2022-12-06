import type { TestableElement } from '../types';
import type { InputHTMLAttributes } from 'react';

// id attributes for AriaLiveRegion.tsx innerHTML content
export const ARIA_LIVE_CONTEXT_ID = 'aria-context';
export const ARIA_LIVE_SELECTION_ID = 'aria-selection';

// classNames (menu options)
export const OPTION_CLS = 'rfs-option';
export const OPTION_FOCUSED_CLS = `${OPTION_CLS}-focused`;
export const OPTION_SELECTED_CLS = `${OPTION_CLS}-selected`;
export const OPTION_DISABLED_CLS = `${OPTION_CLS}-disabled`;

// classNames (containers & icons)
export const CARET_ICON_CLS = 'rfs-caret-icon';
export const CLEAR_ICON_CLS = 'rfs-clear-icon';
export const LOADING_DOTS_CLS = 'rfs-loading-dots';
export const AUTOSIZE_INPUT_CLS = 'rfs-autosize-input';
export const MENU_CONTAINER_CLS = 'rfs-menu-container';
export const SELECT_CONTAINER_CLS = 'rfs-select-container';
export const CONTROL_CONTAINER_CLS = 'rfs-control-container';

// data-testid attributes used for DOM element querying in unit test cases
// ...this attribute gets rendered in development and test environments (removed in production)
const isTest = process.env.NODE_ENV === 'test';
export const CLEAR_ICON_TESTID = isTest ? CLEAR_ICON_CLS : undefined;
export const CARET_ICON_TESTID = isTest ? CARET_ICON_CLS : undefined;
export const AUTOSIZE_INPUT_TESTID = isTest ? AUTOSIZE_INPUT_CLS : undefined;
export const MENU_CONTAINER_TESTID = isTest ? MENU_CONTAINER_CLS : undefined;
export const CLEAR_ICON_MV_TESTID = isTest ? `${CLEAR_ICON_CLS}-mv` : undefined;
export const SELECT_CONTAINER_TESTID = isTest ? SELECT_CONTAINER_CLS : undefined;
export const CONTROL_CONTAINER_TESTID = isTest ? CONTROL_CONTAINER_CLS : undefined;

/**
 * Static attributes for 'AutosizeInput' input element
 */
export const AUTOSIZE_INPUT_ATTRS: InputHTMLAttributes<HTMLInputElement> & TestableElement = {
  tabIndex: 0,
  type: 'text',
  role: 'combobox',
  spellCheck: false,
  autoCorrect: 'off',
  autoComplete: 'off',
  'aria-haspopup': true,
  autoCapitalize: 'none',
  'aria-autocomplete': 'list',
  className: AUTOSIZE_INPUT_CLS,
  'data-testid': AUTOSIZE_INPUT_TESTID
} as const;