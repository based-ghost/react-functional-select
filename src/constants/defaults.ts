import type {
  FocusedOption,
  OptionValueCallback,
  OptionLabelCallback,
  OptionFilterCallback,
  OptionDisabledCallback
} from '../types';

export const PAGE_SIZE_DEFAULT = 5;
export const MENU_ITEM_SIZE_DEFAULT = 35;
export const MENU_MAX_HEIGHT_DEFAULT = 300;
export const LOADING_MSG_DEFAULT = 'Loading..';
export const NO_OPTIONS_MSG_DEFAULT = 'No options';
export const PLACEHOLDER_DEFAULT = 'Select option..';

export const EMPTY_ARRAY: any[] = []; // Default for options and selectedOption props
export const FOCUSED_OPTION_DEFAULT: FocusedOption = { index: -1 };

export const FUNCTIONS = {
  optionLabel: ((x) => x.label) as OptionLabelCallback,
  optionValue: ((x) => x.value) as OptionValueCallback,
  isOptionDisabled: ((x) => !!x.isDisabled) as OptionDisabledCallback,
  optionFilter: ((x) => typeof x.label === 'string' ? x.label : '' + x.label) as OptionFilterCallback
};