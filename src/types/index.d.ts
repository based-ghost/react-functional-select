import {
  ReactNode,
  ReactText,
  MouseEvent,
  TouchEvent,
  EventHandler,
  CSSProperties,
  FormEventHandler,
  FocusEventHandler,
  InputHTMLAttributes
} from 'react';

import { FocusedOption, MultiParams } from '../Select';

// ============================================
// Shared / Object / Param / Misc types
// ============================================

export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

export type OptionData = any;
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>;

export interface AutosizeInputHTMLAttributes extends InputHTMLAttributes<HTMLElement> {
  isInvalid?: boolean;
  'data-testid'?: string;
};

export type SelectedOption = {
  data?: OptionData;
  value?: ReactText;
  label?: ReactText;
};

export type MenuOption = {
  label: ReactText;
  value: ReactText;
  data: OptionData;
  isDisabled?: boolean;
  isSelected?: boolean;
};

export type ItemData = {
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  renderOptionLabel: (data: OptionData) => ReactNode;
  selectOption: (option: SelectedOption, isSelected?: boolean) => void;
};

// ============================================
// FunctionalComponent property types
// ============================================

export type LoadingDotsProps = Readonly<{
  addClassNames?: boolean;
}>;

export type OptionProps = Readonly<{
  index: number;
  data: ItemData;
  style: CSSProperties;
}>;

export type ValueProps = Readonly<{
  isMulti?: boolean;
  inputValue: string;
  placeholder: string;
  selectedOption: SelectedOption[];
  focusedMultiValue: ReactText | null;
  renderOptionLabel: (data: OptionData) => ReactNode;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
  removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
}>;

export type MultiValueProps = SelectedOption & Readonly<{
  isFocused: boolean;
  renderOptionLabel: (data: OptionData) => ReactNode;
  removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
}>;

export type MenuProps = Readonly<{
  height: number;
  itemSize: number;
  loadingMsg: string;
  isLoading?: boolean;
  noOptionsMsg: string;
  overscanCount?: number;
  width: string | number;
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  itemKeySelector?: ReactText;
  renderOptionLabel: (data: OptionData) => ReactNode;
  selectOption: (option: SelectedOption, isSelected?: boolean) => void;
}>;

export type AriaLiveRegionProps = Readonly<{
  menuOpen: boolean;
  isFocused: boolean;
  ariaLabel?: string;
  inputValue: string;
  optionCount: number;
  isSearchable: boolean;
  focusedOption: FocusedOption;
  selectedOption: SelectedOption[];
}>;

export type AutosizeInputProps = Readonly<{
  id?: string;
  readOnly: boolean;
  ariaLabel?: string;
  inputValue: string;
  required?: boolean;
  addClassNames?: boolean;
  ariaLabelledBy?: string;
  selectedOption: SelectedOption[];
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange: FormEventHandler<HTMLInputElement>;
}>;

export type IconRenderer = ReactNode | ((...args: any[]) => ReactNode);

export type IndicatorIconsProps = Readonly<{
  menuOpen: boolean;
  showClear: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  loadingNode?: ReactNode;
  addClassNames?: boolean;
  clearIcon?: IconRenderer;
  caretIcon?: IconRenderer;
  onClearMouseDown: MouseOrTouchEventHandler<HTMLDivElement>;
  onCaretMouseDown?: MouseOrTouchEventHandler<HTMLDivElement>;
}>;