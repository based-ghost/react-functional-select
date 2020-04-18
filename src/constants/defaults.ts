import { SelectedOption, FocusedOption, OptionData } from '../types';

export const MENU_ITEM_SIZE_DEFAULT = 35;
export const MENU_MAX_HEIGHT_DEFAULT = 300;

export const FOCUSED_MULTI_DEFAULT = null;
export const ON_CHANGE_SINGLE_VALUE_DEFAULT = null;

export const LOADING_MSG_DEFAULT = 'Loading...';
export const NO_OPTIONS_MSG_DEFAULT = 'No options';
export const PLACEHOLDER_DEFAULT = 'Select option...';

export const OPTIONS_DEFAULT: OptionData[] = [];
export const SELECTED_OPTION_DEFAULT: SelectedOption[] = [];
export const FOCUSED_OPTION_DEFAULT: FocusedOption = { index: -1 };