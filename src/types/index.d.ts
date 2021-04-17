import type { MenuOption, MultiParams } from '../Select';
import type {
  ReactNode,
  ReactText,
  MouseEvent,
  TouchEvent,
  EventHandler,
  KeyboardEvent
} from 'react';

export type OptionData = any;
export type CallbackFunction = (...args: any[]) => any;
export type AriaLiveAttribute = 'off' | 'polite' | 'assertive';

export type CustomRendererCallback = (...args: any[]) => ReactNode;
export type IconRenderer = ReactNode | CustomRendererCallback;

export type OptionValueCallback = (data: OptionData) => ReactText;
export type OptionLabelCallback = (data: OptionData) => ReactText;
export type RenderLabelCallback = (data: OptionData) => ReactNode;
export type OptionFilterCallback = (option: MenuOption) => string;
export type OptionDisabledCallback = (data: OptionData) => boolean;

export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler = EventHandler<MouseOrTouchEvent<Element>>;

export type IndicatorIconEvent<T = Element> = MouseOrTouchEvent<T> | KeyboardEvent<T>;
export type IndicatorIconEventHandler = EventHandler<IndicatorIconEvent<Element>>;

export type TestableElement = {
  'data-testid'?: string;
};

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