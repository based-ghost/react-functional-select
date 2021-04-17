import type {
  FocusedOption,
  OptionValueCallback,
  OptionLabelCallback,
  OptionFilterCallback,
  OptionDisabledCallback
} from '../types';

export const MENU_ITEM_SIZE_DEFAULT = 35;
export const MENU_MAX_HEIGHT_DEFAULT = 300;

export const LOADING_MSG_DEFAULT = 'Loading..';
export const NO_OPTIONS_MSG_DEFAULT = 'No options';
export const PLACEHOLDER_DEFAULT = 'Select option..';
export const FOCUSED_OPTION_DEFAULT: FocusedOption = { index: -1 };

export const GET_OPTION_LABEL_DEFAULT: OptionLabelCallback = (data) => data.label;
export const GET_OPTION_VALUE_DEFAULT: OptionValueCallback = (data) => data.value;
export const GET_OPTION_DISABLED_DEFAULT: OptionDisabledCallback = (data) => !!data.isDisabled;
export const GET_OPTION_FILTER_DEFAULT: OptionFilterCallback = ({ label }) => (typeof label === 'string') ? label : `${label}`;

// Default for options and selectedOption props
export const EMPTY_ARRAY: any[] = [];