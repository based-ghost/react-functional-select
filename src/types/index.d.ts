import { ReactNode, ReactText, MouseEvent, TouchEvent } from 'react';
import { MenuOption, MultiParams } from '../Select';

export type OptionData = any;
export type AriaLiveAttribute = 'off' | 'polite' | 'assertive';
export type IconRenderer = ReactNode | ((...args: any[]) => ReactNode);
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;

export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

export type SelectedOption = {
  data?: OptionData;
  value?: ReactText;
  label?: ReactText;
};

export interface FocusedOption extends SelectedOption {
  index: number;
  isDisabled?: boolean;
  isSelected?: boolean;
}

export type ItemData = {
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  renderOptionLabel: (data: OptionData) => ReactNode;
  selectOption: (option: SelectedOption, isSelected?: boolean) => void;
};