const _isTest = process.env.NODE_ENV === 'test';

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
export const ARIA_LIVE_TESTID = _isTest ? 'rfs-aria-live' : undefined;
export const CLEAR_ICON_TESTID = _isTest ? CLEAR_ICON_CLS : undefined;
export const CARET_ICON_TESTID = _isTest ? CARET_ICON_CLS : undefined;
export const AUTOSIZE_INPUT_TESTID = _isTest ? AUTOSIZE_INPUT_CLS : undefined;
export const MENU_CONTAINER_TESTID = _isTest ? MENU_CONTAINER_CLS : undefined;
export const CLEAR_ICON_MV_TESTID = _isTest ? `${CLEAR_ICON_CLS}-mv` : undefined;
export const SELECT_CONTAINER_TESTID = _isTest ? SELECT_CONTAINER_CLS : undefined;
export const CONTROL_CONTAINER_TESTID = _isTest ? CONTROL_CONTAINER_CLS : undefined;