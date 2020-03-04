const attrPrefix = 'rfs';
const isTest = (process.env.NODE_ENV === 'test');

// Keydown event from an Input Method Editor (IME) - event.keyCode === 229
export const IME_KEY_CODE = 229;

// mousedown event.type
export const MOUSE_DOWN_EVENT_TYPE = 'mousedown';

// classNames (menu options)
export const OPTION_CLS = `${attrPrefix}-option`;
export const OPTION_FOCUSED_CLS = `${OPTION_CLS}-focused`;
export const OPTION_SELECTED_CLS = `${OPTION_CLS}-selected`;
export const OPTION_DISABLED_CLS = `${OPTION_CLS}-disabled`;

// classNames (containers & icons)
export const CARET_ICON_CLS = `${attrPrefix}-caret-icon`;
export const CLEAR_ICON_CLS = `${attrPrefix}-clear-icon`;
export const LOADING_DOTS_CLS = `${attrPrefix}-loading-dots`;
export const AUTOSIZE_INPUT_CLS = `${attrPrefix}-autosize-input`;
export const MENU_CONTAINER_CLS = `${attrPrefix}-menu-container`;
export const SELECT_CONTAINER_CLS = `${attrPrefix}-select-container`;
export const CONTROL_CONTAINER_CLS = `${attrPrefix}-control-container`;

// data-testid attributes used for DOM element querying in unit test cases
// ...this attribute gets rendered in development and test environments (removed in production)
export const CLEAR_ICON_TESTID = isTest ? CLEAR_ICON_CLS : undefined;
export const CARET_ICON_TESTID = isTest ? CARET_ICON_CLS : undefined;
export const AUTOSIZE_INPUT_TESTID = isTest ? AUTOSIZE_INPUT_CLS : undefined;
export const MENU_CONTAINER_TESTID = isTest ? MENU_CONTAINER_CLS : undefined;
export const ARIA_LIVE_TESTID = isTest ? `${attrPrefix}-aria-live` : undefined;
export const CLEAR_ICON_MV_TESTID = isTest ? `${CLEAR_ICON_CLS}-mv` : undefined;
export const SELECT_CONTAINER_TESTID = isTest ? SELECT_CONTAINER_CLS : undefined;
export const CONTROL_CONTAINER_TESTID = isTest ? CONTROL_CONTAINER_CLS : undefined;