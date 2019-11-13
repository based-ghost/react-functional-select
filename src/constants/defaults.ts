import { SelectedOption, FocusedOption, OptionData } from '../types';

export const MENU_ITEM_SIZE_DEFAULT = 35;
export const MENU_MAX_HEIGHT_DEFAULT = 300;
export const NO_OPTIONS_MSG_DEFAULT = 'No options';
export const PLACEHOLDER_DEFAULT = 'Select option..';

export const OPTIONS_DEFAULT: OptionData[] = [];
export const NO_SELECTED_OPTION = Object.freeze<SelectedOption>({});

export const FOCUSED_OPTION_DEFAULT = Object.freeze<FocusedOption>({
  index: -1,
});

export const SELECTED_OPTION_DEFAULT = Object.freeze<SelectedOption>({
  initFlag: true,
});