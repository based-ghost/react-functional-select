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

// Default for options and selectedOption props
export const EMPTY_ARRAY: any[] = [];

export const FunctionDefaults = {
  OPTION_LABEL: (({ label }) => label) as OptionLabelCallback,
  OPTION_VALUE: (({ value }) => value) as OptionValueCallback,
  OPTION_IS_DISABLED: (({ isDisabled }) => !!isDisabled) as OptionDisabledCallback,
  OPTION_FILTER: (({ label }) => typeof label === 'string' ? label : '' + label) as OptionFilterCallback
};