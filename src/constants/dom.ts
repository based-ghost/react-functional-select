import type { HTMLAttributes, InputHTMLAttributes } from 'react';

// id attributes for AriaLiveRegion.tsx innerHTML content
export const ARIA_LIVE_CONTEXT_ID = 'aria-selection';
export const ARIA_LIVE_SELECTION_ID = 'aria-context';

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
export const CLEAR_ICON_TESTID = process.env.NODE_ENV === 'test' ? CLEAR_ICON_CLS : undefined;
export const CARET_ICON_TESTID = process.env.NODE_ENV === 'test' ? CARET_ICON_CLS : undefined;
export const AUTOSIZE_INPUT_TESTID = process.env.NODE_ENV === 'test' ? AUTOSIZE_INPUT_CLS : undefined;
export const MENU_CONTAINER_TESTID = process.env.NODE_ENV === 'test' ? MENU_CONTAINER_CLS : undefined;
export const CLEAR_ICON_MV_TESTID = process.env.NODE_ENV === 'test' ? `${CLEAR_ICON_CLS}-mv` : undefined;
export const SELECT_CONTAINER_TESTID = process.env.NODE_ENV === 'test' ? SELECT_CONTAINER_CLS : undefined;
export const CONTROL_CONTAINER_TESTID = process.env.NODE_ENV === 'test' ? CONTROL_CONTAINER_CLS : undefined;

/**
 * Static attributes for 'SelectWrapper' div element.
 */
export const SELECT_WRAPPER_ATTRIBUTES: HTMLAttributes<HTMLDivElement> & {
  'data-testid'?: string,
} = {
  role: 'combobox',
  'aria-haspopup': 'listbox',
  className: SELECT_CONTAINER_CLS,
  'data-testid': SELECT_CONTAINER_TESTID
};

/**
 * Static attributes for 'AutosizeInput' input element.
 */
export const AUTOSIZE_INPUT_ATTRIBUTES: InputHTMLAttributes<HTMLInputElement> & {
  'data-testid'?: string,
} = {
  tabIndex: 0,
  type: 'text',
  spellCheck: false,
  autoCorrect: 'off',
  autoComplete: 'off',
  autoCapitalize: 'none',
  'aria-autocomplete': 'list',
  className: AUTOSIZE_INPUT_CLS,
  'data-testid': AUTOSIZE_INPUT_TESTID
};