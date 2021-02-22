import {
  ReactNode,
  ReactText,
  MouseEvent,
  TouchEvent,
  EventHandler,
  CSSProperties,
  FormEventHandler,
  FocusEventHandler
} from 'react';

import { FixedSizeList } from 'react-window';
import { FocusedOption, MultiParams } from '../Select';

// ============================================
// Shared / Object / Param / Misc types
// ============================================

export type OptionData = any;
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;

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
  removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLElement>) => void;
}>;

export type MultiValueProps = SelectedOption & Readonly<{
  isFocused: boolean;
  renderOptionLabel: (data: OptionData) => ReactNode;
  removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLElement>) => void;
}>;

export type MenuListProps = Readonly<{
  height: number;
  itemSize: number;
  loadingMsg: string;
  isLoading?: boolean;
  overscanCount?: number;
  width: string | number;
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  noOptionsMsg: string | null;
  itemKeySelector?: ReactText;
  renderOptionLabel: (data: OptionData) => ReactNode;
  fixedSizeListRef: MutableRefObject<FixedSizeList | null>;
  selectOption: (option: SelectedOption, isSelected?: boolean) => void;
}>;

export interface MenuProps extends MenuListProps {
  menuTop?: string;
  menuOpen: boolean;
  menuPortalTarget?: Element;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  onMenuMouseDown: (e: MouseOrTouchEvent<HTMLDivElement>) => void;
}

export type MenuWrapperProps = Pick<MenuProps, 'menuOpen' | 'menuTop'> & {
  hideNoOptionsMsg: boolean;
};

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
  clearIcon?: IconRenderer;
  caretIcon?: IconRenderer;
  onClearMouseDown: EventHandler<MouseOrTouchEvent<HTMLElement>>;
  onCaretMouseDown?: EventHandler<MouseOrTouchEvent<HTMLElement>>;
}>;