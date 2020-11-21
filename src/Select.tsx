import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  FocusEventHandler,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  ReactText
} from 'react';

import { RfsTheme } from './theme';
import { FixedSizeList } from 'react-window';
import styled, { css, DefaultTheme, ThemeProvider } from 'styled-components';
import { Menu, Value, AutosizeInput, IndicatorIcons, AriaLiveRegion } from './components';
import { useDebounce, useMenuPositioner, useMenuOptions, useUpdateEffect } from './hooks';
import { mergeDeep, isTouchDevice, isPlainObject, normalizeValue, isArrayWithLength } from './utils';
import { MenuPositionEnum, FilterMatchEnum, ValueIndexEnum, OptionIndexEnum } from './constants/enums';

import {
  OptionData,
  PartialDeep,
  SelectedOption,
  MenuWrapperProps,
  MouseOrTouchEvent,
  IndicatorIconsProps,
  ControlWrapperProps
} from './types';

import {
  OPTIONS_DEFAULT,
  LOADING_MSG_DEFAULT,
  PLACEHOLDER_DEFAULT,
  FOCUSED_MULTI_DEFAULT,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  SELECTED_OPTION_DEFAULT,
  ON_CHANGE_SINGLE_VALUE_DEFAULT
} from './constants/defaults';

import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  MENU_CONTAINER_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
  MENU_CONTAINER_TESTID,
  SELECT_CONTAINER_TESTID,
  CONTROL_CONTAINER_TESTID
} from './constants/dom';

export type Theme = PartialDeep<DefaultTheme>;

export type FocusedOption = SelectedOption & {
  index: number;
  isDisabled?: boolean;
  isSelected?: boolean;
};

export type MenuOption = Readonly<{
  label: ReactText;
  value: ReactText;
  data: OptionData;
  isDisabled?: boolean;
  isSelected?: boolean;
}>;

export type SelectRef = Readonly<{
  blur: () => void;
  focus: () => void;
  clearValue: () => void;
  toggleMenu: (state?: boolean) => void;
  setValue: (option?: OptionData) => void;
}>;

export type MultiParams = Readonly<{
  selected: SelectedOption[];
  renderOptionLabel: (data: OptionData) => ReactNode;
}>;

export type SelectProps = Readonly<{
  async?: boolean;
  inputId?: string;
  selectId?: string;
  isMulti?: boolean;
  ariaLabel?: string;
  required?: boolean;
  loadingMsg?: string;
  autoFocus?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  inputDelay?: number;
  themeConfig?: Theme;
  isDisabled?: boolean;
  placeholder?: string;
  menuWidth?: ReactText;
  menuItemSize?: number;
  isClearable?: boolean;
  noOptionsMsg?: string;
  options?: OptionData[];
  isSearchable?: boolean;
  menuMaxHeight?: number;
  loadingNode?: ReactNode;
  addClassNames?: boolean;
  ariaLabelledBy?: string;
  openMenuOnClick?: boolean;
  openMenuOnFocus?: boolean;
  menuOverscanCount?: number;
  tabSelectsOption?: boolean;
  filterIgnoreCase?: boolean;
  itemKeySelector?: ReactText;
  menuScrollDuration?: number;
  blurInputOnSelect?: boolean;
  closeMenuOnSelect?: boolean;
  isAriaLiveEnabled?: boolean;
  scrollMenuIntoView?: boolean;
  hideSelectedOptions?: boolean;
  filterIgnoreAccents?: boolean;
  backspaceClearsValue?: boolean;
  filterMatchFrom?: 'any' | 'start';
  onMenuOpen?: (...args: any[]) => any;
  onMenuClose?: (...args: any[]) => any;
  onInputChange?: (value?: string) => any;
  menuPosition?: 'top' | 'auto' | 'bottom';
  initialValue?: OptionData | OptionData[];
  onSearchChange?: (value?: string) => any;
  onOptionChange?: (data: OptionData) => any;
  getOptionLabel?: (data: OptionData) => ReactText;
  getOptionValue?: (data: OptionData) => ReactText;
  onInputBlur?: FocusEventHandler<HTMLInputElement>;
  onInputFocus?: FocusEventHandler<HTMLInputElement>;
  renderOptionLabel?: (data: OptionData) => ReactNode;
  getIsOptionDisabled?: (data: OptionData) => boolean;
  getFilterOptionString?: (option: MenuOption) => string;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
  clearIcon?: ReactNode | ((state: Partial<IndicatorIconsProps>) => ReactNode);
  caretIcon?: ReactNode | ((state: Partial<IndicatorIconsProps>) => ReactNode);
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>, input?: string, focusedOption?: FocusedOption) => any;
}>;

const SelectWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  ${({ theme }) => theme.select.css}
`;

const ValueWrapper = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.control.padding};
`;

const ControlWrapper = styled.div<ControlWrapperProps>`
  outline: 0;
  display: flex;
  flex-wrap: wrap;
  cursor: default;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  ${({ isDisabled, isFocused, isInvalid, theme: { control, color } }) => `
    transition: ${control.transition};
    border-style: ${control.borderStyle};
    border-width: ${control.borderWidth};
    border-radius: ${control.borderRadius};
    min-height: ${control.height || control.minHeight};
    border-color: ${(isInvalid ? color.danger : (isFocused ? control.focusedBorderColor : color.border))};
    ${isDisabled ? 'pointer-events: none;' : ''}
    ${control.height ? `height: ${control.height};` : ''}
    ${(control.backgroundColor || isDisabled) ? `background-color: ${isDisabled ? color.disabled : control.backgroundColor};` : ''}
    ${isFocused ? `box-shadow: ${control.boxShadow} ${isInvalid ? color.dangerLight : control.boxShadowColor};` : ''}
  `}
  ${({ theme }) => theme.control.css}
  ${({ isFocused, theme }) => isFocused && theme.control.focusedCss}
`;

const MenuWrapper = styled.div<MenuWrapperProps>`
  z-index: 999;
  cursor: default;
  position: absolute;
  ${({ menuTop, hideMenu, theme: { menu } }) => `
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    box-shadow: ${menu.boxShadow};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    ${hideMenu ? 'display: none;' : ''}
    ${menuTop ? `top: ${menuTop};` : ''}
  `}

  animation: ${({ theme }) => css`${theme.menu.animation}`};
  ${({ theme }) => theme.menu.css}

  .${OPTION_CLS} {
    display: block;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-tap-highlight-color: transparent;
    ${({ theme: { menu: { option } } }) => `
      padding: ${option.padding};
      text-align: ${option.textAlign};

      &.${OPTION_FOCUSED_CLS},
      &:hover:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
        background-color: ${option.focusedBgColor};
      }

      &.${OPTION_SELECTED_CLS} {
        color: ${option.selectedColor};
        background-color: ${option.selectedBgColor};
      }

      &.${OPTION_DISABLED_CLS} {
        opacity: 0.35;
      }
    `}
  }
`;

const Select = React.forwardRef<SelectRef, SelectProps>((
  {
    async,
    isMulti,
    inputId,
    selectId,
    required,
    autoFocus,
    isLoading,
    onKeyDown,
    clearIcon,
    caretIcon,
    isInvalid,
    ariaLabel,
    menuWidth,
    isDisabled,
    inputDelay,
    onMenuOpen,
    onMenuClose,
    onInputBlur,
    isClearable,
    themeConfig,
    loadingNode,
    initialValue,
    onInputFocus,
    onInputChange,
    addClassNames,
    ariaLabelledBy,
    onOptionChange,
    onSearchChange,
    getOptionLabel,
    getOptionValue,
    itemKeySelector,
    openMenuOnFocus,
    isAriaLiveEnabled,
    menuOverscanCount,
    blurInputOnSelect,
    renderOptionLabel,
    renderMultiOptions,
    menuScrollDuration,
    filterIgnoreAccents,
    hideSelectedOptions,
    getIsOptionDisabled,
    getFilterOptionString,
    isSearchable = true,
    openMenuOnClick = true,
    filterIgnoreCase = true,
    tabSelectsOption = true,
    closeMenuOnSelect = true,
    scrollMenuIntoView = true,
    backspaceClearsValue = true,
    filterMatchFrom = FilterMatchEnum.ANY,
    menuPosition = MenuPositionEnum.BOTTOM,
    options = OPTIONS_DEFAULT,
    loadingMsg = LOADING_MSG_DEFAULT,
    placeholder = PLACEHOLDER_DEFAULT,
    noOptionsMsg = NO_OPTIONS_MSG_DEFAULT,
    menuItemSize = MENU_ITEM_SIZE_DEFAULT,
    menuMaxHeight = MENU_MAX_HEIGHT_DEFAULT
  },
  ref: React.Ref<SelectRef>
) => {
  // Instance prop & DOM node refs
  const menuOpenRef = useRef<boolean>(false);
  const prevMenuOptionsLength = useRef<number>();
  const onChangeEventValue = useRef<boolean>(false);

  const listRef = useRef<FixedSizeList | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  // Stateful values
  const [inputValue, setInputValue] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [focusedOption, setFocusedOption] = useState<FocusedOption>(FOCUSED_OPTION_DEFAULT);
  const [focusedMultiValue, setFocusedMultiValue] = useState<ReactText | null>(FOCUSED_MULTI_DEFAULT);

  // Memoized DefaultTheme object for styled-components ThemeProvider
  const theme = useMemo<DefaultTheme>(() => {
    return isPlainObject(themeConfig)
      ? mergeDeep(RfsTheme, themeConfig)
      : RfsTheme;
  }, [themeConfig]);

  // Memoized callback functions referencing optional function properties on Select.tsx
  const getOptionLabelFn = useMemo<((data: OptionData) => ReactText)>(() => getOptionLabel || ((data) => data.label), [getOptionLabel]);
  const getOptionValueFn = useMemo<((data: OptionData) => ReactText)>(() => getOptionValue || ((data) => data.value), [getOptionValue]);
  const renderOptionLabelFn = useMemo<((data: OptionData) => ReactNode)>(() => renderOptionLabel || getOptionLabelFn, [renderOptionLabel, getOptionLabelFn]);

  // Custom hook abstraction that debounces search input value (opt-in)
  const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

  // If initialValue is specified attempt to initialize, otherwise default to []
  const [selectedOption, setSelectedOption] = useState<SelectedOption[]>(() => normalizeValue(initialValue, getOptionValueFn, getOptionLabelFn));

  // Custom hook abstraction that handles the creation of menuOptions
  const menuOptions: MenuOption[] = useMenuOptions(
    options,
    debouncedInputValue,
    filterMatchFrom,
    selectedOption,
    getOptionValueFn,
    getOptionLabelFn,
    getIsOptionDisabled,
    getFilterOptionString,
    filterIgnoreCase,
    filterIgnoreAccents,
    isMulti,
    hideSelectedOptions,
    async
  );

  // Custom hook abstraction that handles calculating menuHeightCalc (defaults to menuMaxHeight) / handles executing callbacks/logic on menuOpen state change.
  const { menuStyleTop, menuHeightCalc } = useMenuPositioner(
    menuRef,
    controlRef,
    menuOpen,
    menuPosition,
    menuItemSize,
    menuMaxHeight,
    menuOptions.length,
    menuScrollDuration,
    scrollMenuIntoView,
    onMenuOpen,
    onMenuClose
  );

  const blurInput = (): void => inputRef.current!.blur();
  const focusInput = (): void => inputRef.current!.focus();

  const scrollToItemIndex = (index: number): void => {
    listRef.current && listRef.current.scrollToItem(index);
  };

  const removeSelectedOption = useCallback((removeValue?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>): void => {
    if (e) {
      e.stopPropagation();
      (e.type === 'mousedown') && e.preventDefault();
    }

    setSelectedOption((prevSelectedOption) => prevSelectedOption.filter(({ value }) => value !== removeValue));
  }, []);

  const openMenuAndFocusOption = useCallback((position: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) {
      !menuOpenRef.current && setMenuOpen(true);
      return;
    }

    const selectedIndex = !isMulti
      ? menuOptions.findIndex(({ isSelected }) => isSelected)
      : -1;

    const index =
      (selectedIndex > -1)
        ? selectedIndex
        : (position === OptionIndexEnum.FIRST)
        ? 0
        : menuOptions.length - 1;

    !menuOpenRef.current && setMenuOpen(true);
    setFocusedOption({ index, ...menuOptions[index] });
    scrollToItemIndex(index);
  }, [isMulti, menuOptions]);

  const selectOption = useCallback((option: SelectedOption, isSelected?: boolean): void => {
    if (isSelected) {
      isMulti && removeSelectedOption(option.value);
    } else {
      setSelectedOption((prevSelectedOption) => !isMulti ? [option] : [...prevSelectedOption, option]);
    }

    // Use 'blurInputOnSelect' if defined, otherwise evaluate to true if current device is touch-device
    const blurControl = (typeof blurInputOnSelect === 'boolean')
      ? blurInputOnSelect
      : isTouchDevice();

    if (blurControl) {
      blurInput();
    } else if (closeMenuOnSelect) {
      setMenuOpen(false);
      setInputValue('');
    }
  }, [isMulti, closeMenuOnSelect, removeSelectedOption, blurInputOnSelect]);

  /**
   * useImperativeHandle
   * Exposed API methods available on a ref instance of this Select.tsx component
   */
  useImperativeHandle(ref, () => ({
    blur: blurInput,
    focus: focusInput,
    clearValue: () => {
      setSelectedOption(SELECTED_OPTION_DEFAULT);
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    },
    setValue: (option?: OptionData) => {
      const normalizedOptions = normalizeValue(option, getOptionValueFn, getOptionLabelFn);
      setSelectedOption(normalizedOptions);
    },
    toggleMenu: (state?: boolean) => {
      if (state === true || (state === undefined && !menuOpen)) {
        !isFocused && focusInput();
        openMenuAndFocusOption(OptionIndexEnum.FIRST);
      } else {
        blurInput();
      }
    },
  }));

  /**
   * If autoFocus = true, focus the control following initial mount
   */
  useEffect(() => {
    autoFocus && focusInput();
  }, [autoFocus]);

  /**
   * Write current value of 'menuOpen' to ref object (use to prevent extraneous state update calls)
   */
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  /**
   * If control recieves focus & openMenuOnFocus = true, open menu
   */
  useEffect(() => {
    if (isFocused && openMenuOnFocus) {
      openMenuAndFocusOption(OptionIndexEnum.FIRST);
    }
  }, [isFocused, openMenuOnFocus, openMenuAndFocusOption]);

  /**
   * If 'onSearchChange' function is defined, run as callback when the stateful debouncedInputValue
   * updates check if onChangeEventValue ref is set true, which indicates the inputValue change was triggered by input change event
   */
  useEffect(() => {
    if (onSearchChange && onChangeEventValue.current) {
      onChangeEventValue.current = false;
      onSearchChange(debouncedInputValue);
    }
  }, [onSearchChange, debouncedInputValue]);

  /**
   * (useUpdateEffect) Handle passing 'selectedOption' value(s) to onOptionChange callback function prop (if defined)
   */
  useUpdateEffect(() => {
    if (!onOptionChange) return;

    const normalizedOptionValue = isMulti
      ? selectedOption.map(({ data }) => data)
      : isArrayWithLength(selectedOption)
      ? selectedOption[0].data
      : ON_CHANGE_SINGLE_VALUE_DEFAULT;

    onOptionChange(normalizedOptionValue);
  }, [isMulti, selectedOption, onOptionChange]);

  /**
   * (useUpdateEffect) Handle clearing focused option if menuOptions array has 0 length;
   * Handle menuOptions changes - conditionally focus first option and do scroll to first option;
   * Handle reseting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)
   */
  useUpdateEffect(() => {
    const { length } = menuOptions;
    const inputChanged = length > 0 && (async || (length !== options.length || prevMenuOptionsLength.current === 0));

    if (length === 0) {
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    } else if (length === 1 || inputChanged) {
      setFocusedOption({ index: 0, ...menuOptions[0] });
      scrollToItemIndex(0);
    }

    prevMenuOptionsLength.current = length;
  }, [async, options, menuOptions]);

  const selectOptionFromFocused = (): void => {
    const { data, value, label, isSelected, isDisabled: isOptionDisabled } = focusedOption;

    if (data && !isOptionDisabled) {
      selectOption({ data, value, label }, isSelected);
    }
  };

  // Only Multiselect mode supports value focusing
  const focusValueOnArrowKey = (direction: ValueIndexEnum): void => {
    if (!isArrayWithLength(selectedOption)) return;

    let nextFocusedIdx = -1;
    const lastValueIdx = (selectedOption.length - 1);
    const curFocusedIdx = focusedMultiValue ? selectedOption.findIndex(({ value }) => value === focusedMultiValue) : -1;

    switch (direction) {
      case ValueIndexEnum.NEXT:
        nextFocusedIdx = (curFocusedIdx > -1 && curFocusedIdx < lastValueIdx) ? (curFocusedIdx + 1) : -1;
        break;
      case ValueIndexEnum.PREVIOUS:
        nextFocusedIdx =
          curFocusedIdx !== 0
            ? curFocusedIdx === -1
              ? lastValueIdx
              : curFocusedIdx - 1
            : 0;
        break;
    }

    const nextFocusedVal: ReactText | null = (nextFocusedIdx >= 0)
      ? selectedOption[nextFocusedIdx].value!
      : FOCUSED_MULTI_DEFAULT;

    if (focusedOption.data) setFocusedOption(FOCUSED_OPTION_DEFAULT);
    if (nextFocusedVal !== focusedMultiValue) setFocusedMultiValue(nextFocusedVal);
  };

  const focusOptionOnArrowKey = (direction: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) return;

    const index =
      direction === OptionIndexEnum.DOWN
        ? ((focusedOption.index + 1) % menuOptions.length)
        : focusedOption.index > 0
        ? focusedOption.index - 1
        : menuOptions.length - 1;

    focusedMultiValue && setFocusedMultiValue(FOCUSED_MULTI_DEFAULT);
    setFocusedOption({ index, ...menuOptions[index] });
    scrollToItemIndex(index);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled) return;

    if (onKeyDown) {
      onKeyDown(e, inputValue, focusedOption);
      if (e.defaultPrevented) return;
    }

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        menuOpen
          ? focusOptionOnArrowKey((e.key === 'ArrowDown') ? OptionIndexEnum.DOWN : OptionIndexEnum.UP)
          : openMenuAndFocusOption((e.key === 'ArrowDown') ? OptionIndexEnum.FIRST : OptionIndexEnum.LAST);

        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        if (!isMulti || inputValue || renderMultiOptions) return;
        focusValueOnArrowKey((e.key === 'ArrowLeft') ? ValueIndexEnum.PREVIOUS : ValueIndexEnum.NEXT);

        break;
      case ' ': // Handle spacebar keydown events
        if (inputValue) {
          return;
        } else if (!menuOpen) {
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
        } else if (!focusedOption.data) {
          return;
        } else {
          selectOptionFromFocused();
        }

        break;
      case 'Enter': // Check e.keyCode !== 229 (Input Method Editor)
        if (menuOpen && e.keyCode !== 229) {
          selectOptionFromFocused();
        }

        break;
      case 'Escape':
        if (menuOpen) {
          setMenuOpen(false);
          setInputValue('');
        }

        break;
      case 'Tab':
        if (!menuOpen || !tabSelectsOption || !focusedOption.data || e.shiftKey) return;
        selectOptionFromFocused();

        break;
      case 'Delete':
      case 'Backspace':
        if (inputValue) return;

        if (focusedMultiValue) {
          const clearFocusedIndex = selectedOption.findIndex(({ value }) => value === focusedMultiValue);

          const nexFocusedMultiValue = (clearFocusedIndex > -1 && (clearFocusedIndex < (selectedOption.length - 1)))
            ? selectedOption[clearFocusedIndex + 1].value!
            : FOCUSED_MULTI_DEFAULT;

          removeSelectedOption(focusedMultiValue);
          setFocusedMultiValue(nexFocusedMultiValue);
        } else {
          if (!backspaceClearsValue) return;

          if (isArrayWithLength(selectedOption)) {
            if (isMulti && !renderMultiOptions) {
              const { value } = selectedOption[selectedOption.length - 1];
              removeSelectedOption(value);
            } else if (isClearable) {
              setSelectedOption(SELECTED_OPTION_DEFAULT);
            }
          }
        }

        break;
      default:
        return;
    }

    e.preventDefault();
  };

  const handleOnControlMouseDown = (e: MouseOrTouchEvent<HTMLDivElement>): void => {
    if (isDisabled) return;
    if (!isFocused) focusInput();

    const tagIsNotInput = (e.currentTarget.tagName !== 'INPUT');

    if (!menuOpen) {
      openMenuOnClick && openMenuAndFocusOption(OptionIndexEnum.FIRST);
    } else if (tagIsNotInput) {
      setMenuOpen(false);
      inputValue && setInputValue('');
    }

    if (tagIsNotInput) {
      e.preventDefault();
    }
  };

  const handleOnMenuMouseDown = (e: MouseOrTouchEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    focusInput();
  };

  const handleOnInputBlur = useCallback((e: FocusEvent<HTMLInputElement>): void => {
    onInputBlur && onInputBlur(e);
    setIsFocused(false);
    setMenuOpen(false);
    setInputValue('');
  }, [onInputBlur]);

  const handleOnInputFocus = useCallback((e: FocusEvent<HTMLInputElement>): void => {
    onInputFocus && onInputFocus(e);
    setIsFocused(true);
  }, [onInputFocus]);

  const handleOnInputChange = useCallback((e: FormEvent<HTMLInputElement>): void => {
    onChangeEventValue.current = true;
    onInputChange && onInputChange(e.currentTarget.value || '');
    !menuOpenRef.current && setMenuOpen(true);
    setInputValue(e.currentTarget.value || '');
  }, [onInputChange]);

  const handleOnClearMouseDown = useCallback((e: MouseOrTouchEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    (e.type === 'mousedown') && e.preventDefault();
    setSelectedOption(SELECTED_OPTION_DEFAULT);
    focusInput();
  }, []);

  const handleOnCaretMouseDown = useCallback((e: MouseOrTouchEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    (e.type === 'mousedown') && e.preventDefault();
    focusInput();
    menuOpenRef.current ? setMenuOpen(false) : openMenuAndFocusOption(OptionIndexEnum.FIRST);
  }, [openMenuAndFocusOption]);

  return (
    <ThemeProvider theme={theme}>
      <SelectWrapper
        id={selectId}
        role='combobox'
        aria-haspopup='listbox'
        aria-controls={inputId}
        aria-expanded={menuOpen}
        onKeyDown={handleOnKeyDown}
        data-testid={SELECT_CONTAINER_TESTID}
        className={addClassNames ? SELECT_CONTAINER_CLS : undefined}
      >
        <ControlWrapper
          ref={controlRef}
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          onTouchEnd={handleOnControlMouseDown}
          onMouseDown={handleOnControlMouseDown}
          data-testid={CONTROL_CONTAINER_TESTID}
          className={addClassNames ? CONTROL_CONTAINER_CLS : undefined}
        >
          <ValueWrapper>
            <Value
              isMulti={isMulti}
              inputValue={inputValue}
              placeholder={placeholder}
              selectedOption={selectedOption}
              focusedMultiValue={focusedMultiValue}
              renderOptionLabel={renderOptionLabelFn}
              renderMultiOptions={renderMultiOptions}
              removeSelectedOption={removeSelectedOption}
            />
            <AutosizeInput
              id={inputId}
              ref={inputRef}
              required={required}
              ariaLabel={ariaLabel}
              inputValue={inputValue}
              onBlur={handleOnInputBlur}
              onFocus={handleOnInputFocus}
              addClassNames={addClassNames}
              onChange={handleOnInputChange}
              ariaLabelledBy={ariaLabelledBy}
              selectedOption={selectedOption}
              readOnly={isDisabled || !isSearchable || !!focusedMultiValue}
            />
          </ValueWrapper>
          <IndicatorIcons
            menuOpen={menuOpen}
            clearIcon={clearIcon}
            caretIcon={caretIcon}
            isInvalid={isInvalid}
            isLoading={isLoading}
            isDisabled={isDisabled}
            loadingNode={loadingNode}
            addClassNames={addClassNames}
            onClearMouseDown={handleOnClearMouseDown}
            showClear={!!(isClearable && !isDisabled && isArrayWithLength(selectedOption))}
            onCaretMouseDown={(!isDisabled && !openMenuOnClick) ? handleOnCaretMouseDown : undefined}
          />
        </ControlWrapper>
        <MenuWrapper
          ref={menuRef}
          hideMenu={!menuOpen}
          menuTop={menuStyleTop}
          onMouseDown={handleOnMenuMouseDown}
          data-testid={MENU_CONTAINER_TESTID}
          className={addClassNames ? MENU_CONTAINER_CLS : undefined}
        >
          <Menu
            ref={listRef}
            isLoading={isLoading}
            height={menuHeightCalc}
            itemSize={menuItemSize}
            loadingMsg={loadingMsg}
            menuOptions={menuOptions}
            noOptionsMsg={noOptionsMsg}
            selectOption={selectOption}
            itemKeySelector={itemKeySelector}
            overscanCount={menuOverscanCount}
            width={menuWidth || theme.menu.width}
            renderOptionLabel={renderOptionLabelFn}
            focusedOptionIndex={focusedOption.index}
          />
        </MenuWrapper>
        {isAriaLiveEnabled && (
          <AriaLiveRegion
            menuOpen={menuOpen}
            isFocused={isFocused}
            ariaLabel={ariaLabel}
            inputValue={inputValue}
            isSearchable={isSearchable}
            focusedOption={focusedOption}
            selectedOption={selectedOption}
            optionCount={menuOptions.length}
          />
        )}
      </SelectWrapper>
    </ThemeProvider>
  );
});

Select.displayName = 'Select';

export { Select };