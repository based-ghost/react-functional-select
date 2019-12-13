import { DefaultTheme } from 'styled-components';
import {
  ReactNode,
  ReactText,
  MouseEvent,
  TouchEvent,
  EventHandler,
  CSSProperties,
  FormEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
} from 'react';

// Create a consumable Theme type to be exported (Partial<T> of our DefaultTheme)
export type Theme = Partial<DefaultTheme>;

// ============================================
// Shared / Object / Param / Misc types
// ============================================

export type ValueIndex = 0 | 1;
export type OptionIndex = 0 | 1 | 2 | 3;

export type OptionData = any;
export type MouseOrTouchEvent<T = Element> = MouseEvent<T> | TouchEvent<T>;
export type MouseOrTouchEventHandler<T = Element> = EventHandler<MouseOrTouchEvent<T>>;
export type AutosizeInputHTMLAttributes = InputHTMLAttributes<HTMLElement> & { readonly 'data-testid'?: string };

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
// styled-component prop types
// ============================================

export type CaretProps = {
  readonly menuOpen: boolean;
  readonly isInvalid?: boolean;
};

export type MenuWrapperProps = {
  readonly hideMenu: boolean;
};

export type ControlWrapperProps = {
  readonly isFocused: boolean;
  readonly isInvalid?: boolean;
  readonly isDisabled?: boolean;
};

// ============================================
// Exposed instance handle types (via useImperativeHandle)
// ...Select component
// ============================================

export type SelectHandle = {
  readonly blur: () => void;
  readonly focus: () => void;
  readonly clearValue: () => void;
  readonly setValue: (option?: OptionData) => void;
};

// ============================================
// FunctionalComponent Prop types
// ============================================

export type OptionProps = {
  readonly index: number;
  readonly data: ItemData;
  readonly style: CSSProperties;
};

export type ValueProps = {
  readonly isMulti?: boolean;
  readonly inputValue: string;
  readonly placeholder: string;
  readonly selectedOption: SelectedOption[];
  readonly focusedMultiValue: ReactText | null;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
};

export type MultiValueProps = SelectedOption & {
  readonly isFocused: boolean;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly removeSelectedOption: (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>) => void;
};

export type MenuProps = {
  readonly itemSize: number;
  readonly maxHeight: number;
  readonly noOptionsMsg: string;
  readonly overscanCount?: number;
  readonly width: string | number;
  readonly menuOptions: MenuOption[];
  readonly focusedOptionIndex: number;
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
  readonly selectOption: (option: SelectedOption, isSelected?: boolean) => void;
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

export type AriaLiveRegionProps = {
  readonly menuOpen: boolean;
  readonly ariaLabel?: string;
  readonly inputValue: string;
  readonly optionCount: number;
  readonly isSearchable: boolean;
  readonly focusedOption: FocusedOption;
  readonly selectedOption: SelectedOption[];
};

export type IndicatorIconsProps = {
  readonly menuOpen: boolean;
  readonly showClear: boolean;
  readonly isLoading?: boolean;
  readonly isInvalid?: boolean;
  readonly clearIcon?: ReactNode;
  readonly caretIcon?: ReactNode;
  readonly addClassNames?: boolean;
  readonly onCaretMouseDown?: MouseOrTouchEventHandler<HTMLDivElement>;
  readonly onClearMouseDown: MouseOrTouchEventHandler<HTMLDivElement>;
};

export type SelectProps = {
  readonly inputId?: string;
  readonly selectId?: string;
  readonly isMulti?: boolean;
  readonly ariaLabel?: string;
  readonly autoFocus?: boolean;
  readonly isLoading?: boolean;
  readonly isInvalid?: boolean;
  readonly inputDelay?: number;
  readonly isDisabled?: boolean;
  readonly placeholder?: string;
  readonly menuWidth?: ReactText;
  readonly menuItemSize?: number;
  readonly isClearable?: boolean;
  readonly noOptionsMsg?: string;
  readonly clearIcon?: ReactNode;
  readonly caretIcon?: ReactNode;
  readonly options?: OptionData[];
  readonly isSearchable?: boolean;
  readonly menuMaxHeight?: number;
  readonly addClassNames?: boolean;
  readonly ariaLabelledBy?: string;
  readonly openMenuOnClick?: boolean;
  readonly openMenuOnFocus?: boolean;
  readonly menuOverscanCount?: number;
  readonly tabSelectsOption?: boolean;
  readonly blurInputOnSelect?: boolean;
  readonly closeMenuOnSelect?: boolean;
  readonly isAriaLiveEnabled?: boolean;
  readonly scrollMenuIntoView?: boolean;
  readonly hideSelectedOptions?: boolean;
  readonly backspaceClearsValue?: boolean;
  readonly filterIsCaseSensitive?: boolean;
  readonly themeConfig?: Partial<DefaultTheme>;
  readonly onMenuOpen?: (...args: any[]) => void;
  readonly onMenuClose?: (...args: any[]) => void;
  readonly initialValue?: OptionData | OptionData[];
  readonly onOptionChange?: (data: OptionData) => void;
  readonly onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  readonly getOptionLabel?: (data: OptionData) => ReactText;
  readonly getOptionValue?: (data: OptionData) => ReactText;
  readonly onInputBlur?: FocusEventHandler<HTMLInputElement>;
  readonly onInputFocus?: FocusEventHandler<HTMLInputElement>;
  readonly renderOptionLabel?: (data: OptionData) => ReactNode;
  readonly getIsOptionDisabled?: (data: OptionData) => boolean;
  readonly getFilterOptionString?: (option: MenuOption) => string;
};