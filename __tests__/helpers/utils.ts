import type { ReactNode, CSSProperties } from 'react';
import type { MultiParams, MenuOption } from '../../src';
import type { OptionData, SelectedOption } from '../../src/types';

// ============================================
// Basic "options" & "selectedOption" data
// ============================================

export type Option = Readonly<{
  label: string | number;
  value: string | number;
}>;

export const OPTIONS: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' }
];

export const getSelectedOptionMulti = (): SelectedOption[] => [...OPTIONS];
export const getOptionSingle = (index: number = 0): Option => ({ ...OPTIONS[index] });

export const getSelectedOptionSingle = (): SelectedOption[] => {
  const data = getOptionSingle();
  const { value, label } = data;
  return [{ data, value, label }];
};

// ============================================
// "menuOptions" data
// ============================================

export const MENU_OPTION_SELECTED: MenuOption = {
  isSelected: true,
  isDisabled: false,
  value: 1,
  label: 'Option 1',
  data: {
    value: 1,
    label: 'Option 1'
  }
};

export const MENU_OPTION_DISABLED: MenuOption = {
  isDisabled: true,
  isSelected: false,
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
  return Object.keys(obj)
    .map((key) => `${key}: ${obj[key]};`)
    .join(' ');
};

export const RENDER_OPTION_LABEL_MOCK = jest.fn(({ label }: OptionData): ReactNode => label);

export const RENDER_MULTI_OPTIONS_MOCK = jest.fn(
  ({selected, renderOptionLabel}: MultiParams): ReactNode => {
    return selected.map((option) => renderOptionLabel(option.data)).join(', ');
  }
);