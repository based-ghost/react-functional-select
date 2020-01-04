import { ReactNode, ReactText, CSSProperties } from 'react';
import { MenuOption, OptionData, SelectedOption } from '../../src/types';

// ============================================
// Basic "options" & "selectedOption" data
// ============================================

type Option = {
  readonly label: ReactText;
  readonly value: ReactText;
};

const OPTIONS: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' }
];

const getSelectedOptionSingle = (): SelectedOption[] => {
  const data = { ...OPTIONS[0] };
  const selectedOption: SelectedOption = {
    data,
    value: data.value,
    label: data.label
  };
  return [selectedOption];
};

const getOptionSingle = (): Option => ({ ...OPTIONS[0] });
const getSelectedOptionMulti = (): SelectedOption[] => [...OPTIONS];

// ============================================
// "menuOptions" data
// ============================================

const MENU_OPTION_SELECTED: MenuOption = {
  isSelected: true,
  value: 1,
  label: 'Option 1',
  data: {
    value: 1,
    label: 'Option 1'
  }
};

const MENU_OPTION_DISABLED: MenuOption = {
  isDisabled: true,
  value: 2,
  label: 'Option 2',
  data: {
    value: 2,
    label: 'Option 2'
  }
};

const MENU_OPTIONS: MenuOption[] = [
  MENU_OPTION_SELECTED,
  MENU_OPTION_DISABLED
];

// ============================================
// Generic utils & data
// ============================================

const stringifyCSSProperties = (obj: CSSProperties): string => {
  let value = '';
  Object.keys(obj).forEach((key: string): void => {
    value += `${key}: ${obj[key]}; `;
  });
  return value.trim();
};

const RENDER_OPTION_LABEL_MOCK = jest.fn((data: OptionData): ReactNode => data.label);

export {
  Option,
  OPTIONS,
  MENU_OPTIONS,
  getOptionSingle,
  MENU_OPTION_SELECTED,
  MENU_OPTION_DISABLED,
  stringifyCSSProperties,
  getSelectedOptionMulti,
  getSelectedOptionSingle,
  RENDER_OPTION_LABEL_MOCK
};