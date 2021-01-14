import { MultiParams } from '../../src';
import { ReactNode, ReactText, CSSProperties } from 'react';
import { MenuOption, OptionData, SelectedOption } from '../../src/types';

// ============================================
// Basic "options" & "selectedOption" data
// ============================================

export type Option = Readonly<{
  label: ReactText;
  value: ReactText;
}>;

export const OPTIONS: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' }
];

export const getSelectedOptionSingle = (): SelectedOption[] => {
  const data = { ...OPTIONS[0] };

  const selectedOption: SelectedOption = {
    data,
    value: data.value,
    label: data.label
  };

  return [selectedOption];
};

export const getOptionSingle = (): Option => ({ ...OPTIONS[0] });
export const getSelectedOptionMulti = (): SelectedOption[] => [...OPTIONS];

// ============================================
// "menuOptions" data
// ============================================

export const MENU_OPTION_SELECTED: MenuOption = {
  isSelected: true,
  value: 1,
  label: 'Option 1',
  data: {
    value: 1,
    label: 'Option 1'
  }
};

export const MENU_OPTION_DISABLED: MenuOption = {
  isDisabled: true,
  value: 2,
  label: 'Option 2',
  data: {
    value: 2,
    label: 'Option 2'
  }
};

export const MENU_OPTIONS: MenuOption[] = [MENU_OPTION_SELECTED, MENU_OPTION_DISABLED];

// ============================================
// Generic utils & data
// ============================================

export const stringifyCSSProperties = (obj: CSSProperties = {}): string => {
  const cssProps = Object.keys(obj).map((key) => `${key}: ${obj[key]};`);
  return cssProps.join(' ');
};

export const RENDER_OPTION_LABEL_MOCK = jest.fn((data: OptionData): ReactNode => data.label);
export const RENDER_MULTI_OPTIONS_MOCK = jest.fn(({ selected, renderOptionLabel }: MultiParams): ReactNode => selected.map((option) => renderOptionLabel(option.data)).join(', '));