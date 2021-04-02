import type { MenuOption, MultiParams } from '../Select';
import type { ReactNode, ReactText, MouseEvent, TouchEvent, EventHandler } from 'react';

export type OptionData = any;
export type AriaLiveAttribute = 'off' | 'polite' | 'assertive';

export type CustomRendererFn = (...args: any[]) => ReactNode;
export type IconRenderer = ReactNode | CustomRendererFn;

export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler = EventHandler<MouseOrTouchEvent<Element>>;

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