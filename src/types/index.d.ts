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

import { MultiParams } from '../Select';

// ============================================
// Shared / Object / Param / Misc types
// ============================================

export type OptionData = any;
export type ValueIndex = 0 | 1;
export type OptionIndex = 0 | 1 | 2 | 3;
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>;
export type AutosizeInputHTMLAttributes = InputHTMLAttributes<HTMLElement> & { 'data-testid'?: string };

export type SelectedOption = {
  data?: OptionData;
  value?: ReactText;
  label?: ReactText;
};

export type FocusedOption = SelectedOption & {
  index: number;
  isDisabled?: boolean;
  isSelected?: boolean;
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
// styled-component property types
// ============================================

export type CaretProps = {
  readonly menuOpen: boolean;
  readonly isInvalid?: boolean;
};

export type MenuWrapperProps = {
  readonly menuTop?: string;
  readonly hideMenu: boolean;
};

export type ControlWrapperProps = {
  readonly isFocused: boolean;
  readonly isInvalid?: boolean;
  readonly isDisabled?: boolean;
};

// ============================================
// FunctionalComponent property types
// ============================================

export type LoadingDotsProps = {
  readonly addClassNames?: boolean;
}

export type OptionProps = {
  readonly index: number;
  readonly data: ItemData;
  readonly style: CSSProperties;
};

export type ValueProps = {
  readonly isMulti?: boolean;
  readonly inputValue: string;
  readonly placeholder: string;
  readonly isTouchDevice: boolean;
  readonly selectedOption: SelectedOption[];
  readonly focusedMultiValue: ReactText | null;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly renderMultiOptions?: (params: MultiParams) => ReactNode;
  readonly removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
};

export type MultiValueProps = SelectedOption & {
  readonly isFocused: boolean;
  readonly isTouchDevice: boolean;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
};

export type MenuProps = {
  readonly height: number;
  readonly itemSize: number;
  readonly loadingMsg: string;
  readonly isLoading?: boolean;
  readonly noOptionsMsg: string;
  readonly overscanCount?: number;
  readonly width: string | number;
  readonly menuOptions: MenuOption[];
  readonly focusedOptionIndex: number;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly selectOption: (option: SelectedOption, isSelected?: boolean) => void;
};

export type AriaLiveRegionProps = {
  readonly menuOpen: boolean;
  readonly isFocused: boolean;
  readonly ariaLabel?: string;
  readonly inputValue: string;
  readonly optionCount: number;
  readonly isSearchable: boolean;
  readonly focusedOption: FocusedOption;
  readonly selectedOption: SelectedOption[];
};

export type AutosizeInputProps = {
  readonly id?: string;
  readonly readOnly: boolean;
  readonly ariaLabel?: string;
  readonly inputValue: string;
  readonly addClassNames?: boolean;
  readonly ariaLabelledBy?: string;
  readonly onBlur: FocusEventHandler<HTMLInputElement>;
  readonly onFocus: FocusEventHandler<HTMLInputElement>;
  readonly onChange: FormEventHandler<HTMLInputElement>;
};

export type IndicatorIconsProps = {
  readonly menuOpen: boolean;
  readonly showClear: boolean;
  readonly isLoading?: boolean;
  readonly isInvalid?: boolean;
  readonly isDisabled?: boolean;
  readonly isTouchDevice: boolean;
  readonly loadingNode?: ReactNode;
  readonly addClassNames?: boolean;
  readonly clearIcon?: ReactNode | ((...args: any[]) => ReactNode);
  readonly caretIcon?: ReactNode | ((...args: any[]) => ReactNode);
  readonly onClearMouseDown: MouseOrTouchEventHandler<HTMLDivElement>;
  readonly onCaretMouseDown?: MouseOrTouchEventHandler<HTMLDivElement>;
};