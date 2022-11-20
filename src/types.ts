import type { DefaultTheme } from 'styled-components';
import type { ReactNode, MouseEvent, TouchEvent, EventHandler } from 'react';

export type OptionData = any;
export type CallbackFn = (...args: any[]) => any;
export type AriaLiveAttribute = 'off' | 'polite' | 'assertive';

export type CustomRendererCallback = (...args: any[]) => ReactNode;
export type IconRenderer = ReactNode | CustomRendererCallback;

export type OptionValueCallback = (data: OptionData) => string | number;
export type OptionLabelCallback = OptionValueCallback;

export type RenderLabelCallback = (data: OptionData) => ReactNode;
export type OptionFilterCallback = (option: MenuOption) => string;
export type OptionDisabledCallback = (data: OptionData) => boolean;

export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>;

export type TestableElement = {
  'data-testid'?: string;
};

export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

export type SelectedOption = {
  data?: OptionData;
  value?: string | number;
  label?: string | number;
};

export interface FocusedOption extends SelectedOption {
  index: number;
  isDisabled?: boolean;
  isSelected?: boolean;
}

export type ItemData = {
  memoOptions: boolean;
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  selectOption: (option: MenuOption) => void;
  renderOptionLabel: (data: OptionData) => ReactNode;
};

export type MultiParams = Readonly<{
  selected: SelectedOption[];
  renderOptionLabel: (data: OptionData) => ReactNode;
}>;

export type MenuOption = Readonly<{
  label: string | number;
  value: string | number;
  data: OptionData;
  isDisabled: boolean;
  isSelected: boolean;
}>;

export type SelectRef = Readonly<{
  menuOpen: boolean;
  blur: () => void;
  focus: () => void;
  clearValue: () => void;
  toggleMenu: (state?: boolean) => void;
  setValue: (option?: OptionData) => void;
}>;

export type Theme = PartialDeep<DefaultTheme>;