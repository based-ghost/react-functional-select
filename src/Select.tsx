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
import { MenuPositionEnum, FilterMatchEnum, ValueIndexEnum, OptionIndexEnum } from './constants/enums';
import { useDebounce, useMenuPositioner, useMenuOptions, useIsTouchDevice, useUpdateEffect } from './hooks';
import { calculateMenuTop, mergeDeep, isPlainObject, normalizeValue, isArrayWithLength, validateSetValueParam } from './utils';
import { FocusedOption, SelectedOption, MouseOrTouchEvent, OptionIndex, IndicatorIconsProps, ValueIndex, MenuWrapperProps, ControlWrapperProps } from './types';
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

type OptionData = any;

export type Theme = Partial<DefaultTheme>;

export type MenuOption = {
  readonly label: ReactText;
  readonly value: ReactText;
  readonly data: OptionData;
  readonly isDisabled?: boolean;
  readonly isSelected?: boolean;
};

export type SelectRef = {
  readonly blur: () => void;
  readonly focus: () => void;
  readonly clearValue: () => void;
  readonly toggleMenu: (state?: boolean) => void;
  readonly setValue: (option?: OptionData) => void;
};

export type MultiParams = {
  readonly selected: SelectedOption[];
  readonly renderOptionLabel: (data: OptionData) => ReactNode;
};

export type SelectProps = {
  readonly async?: boolean;
  readonly inputId?: string;
  readonly selectId?: string;
  readonly isMulti?: boolean;
  readonly ariaLabel?: string;
  readonly loadingMsg?: string;
  readonly autoFocus?: boolean;
  readonly isLoading?: boolean;
  readonly isInvalid?: boolean;
  readonly inputDelay?: number;
  readonly themeConfig?: Theme;
  readonly isDisabled?: boolean;
  readonly placeholder?: string;
  readonly menuWidth?: ReactText;
  readonly menuItemSize?: number;
  readonly isClearable?: boolean;
  readonly noOptionsMsg?: string;
  readonly options?: OptionData[];
  readonly isSearchable?: boolean;
  readonly menuMaxHeight?: number;
  readonly loadingNode?: ReactNode;
  readonly addClassNames?: boolean;
  readonly ariaLabelledBy?: string;
  readonly openMenuOnClick?: boolean;
  readonly openMenuOnFocus?: boolean;
  readonly menuOverscanCount?: number;
  readonly tabSelectsOption?: boolean;
  readonly filterIgnoreCase?: boolean;
  readonly menuScrollDuration?: number;
  readonly blurInputOnSelect?: boolean;
  readonly closeMenuOnSelect?: boolean;
  readonly isAriaLiveEnabled?: boolean;
  readonly scrollMenuIntoView?: boolean;
  readonly hideSelectedOptions?: boolean;
  readonly filterIgnoreAccents?: boolean;
  readonly backspaceClearsValue?: boolean;
  readonly filterMatchFrom?: 'any' | 'start';
  readonly onMenuOpen?: (...args: any[]) => void;
  readonly onMenuClose?: (...args: any[]) => void;
  readonly onInputChange?: (value?: string) => void;
  readonly menuPosition?: 'top' | 'auto' | 'bottom';
  readonly initialValue?: OptionData | OptionData[];
  readonly onSearchChange?: (value?: string) => void;
  readonly onOptionChange?: (data: OptionData) => void;
  readonly getOptionLabel?: (data: OptionData) => ReactText;
  readonly getOptionValue?: (data: OptionData) => ReactText;
  readonly onInputBlur?: FocusEventHandler<HTMLInputElement>;
  readonly onInputFocus?: FocusEventHandler<HTMLInputElement>;
  readonly renderOptionLabel?: (data: OptionData) => ReactNode;
  readonly getIsOptionDisabled?: (data: OptionData) => boolean;
  readonly getFilterOptionString?: (option: MenuOption) => string;
  readonly renderMultiOptions?: (params: MultiParams) => ReactNode;
  readonly clearIcon?: ReactNode | ((state: Partial<IndicatorIconsProps>) => ReactNode);
  readonly caretIcon?: ReactNode | ((state: Partial<IndicatorIconsProps>) => ReactNode);
  readonly onKeyDown?: (e: KeyboardEvent<HTMLDivElement>, input?: string, focusedOption?: FocusedOption) => void;
};

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
  const prevMenuOptionsLength = useRef<number>();
  const onChangeEventValue = useRef<boolean>(false);

  const listRef = useRef<FixedSizeList | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  // Is current device touch-enabled? Adds various touch events to elements if true.
  const isTouchDevice = useIsTouchDevice();
  const blurInputOnSelectOrTouch = (typeof blurInputOnSelect === 'boolean') ? blurInputOnSelect : isTouchDevice;

  // Stateful values
  const [inputValue, setInputValue] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [focusedOption, setFocusedOption] = useState<FocusedOption>(FOCUSED_OPTION_DEFAULT);
  const [focusedMultiValue, setFocusedMultiValue] = useState<ReactText | null>(FOCUSED_MULTI_DEFAULT);

  // Memoized DefaultTheme object for styled-components ThemeProvider
  const theme = useMemo<DefaultTheme>(() => isPlainObject(themeConfig) ? mergeDeep(RfsTheme, themeConfig) : RfsTheme, [themeConfig]);

  // Memoized callback functions referencing optional function properties on Select.tsx
  const getOptionLabelFn = useMemo<((data: OptionData) => ReactText)>(() => getOptionLabel || ((data) => data.label), [getOptionLabel]);
  const getOptionValueFn = useMemo<((data: OptionData) => ReactText)>(() => getOptionValue || ((data) => data.value), [getOptionValue]);
  const renderOptionLabelFn = useMemo<((data: OptionData) => ReactNode)>(() => renderOptionLabel || getOptionLabelFn, [renderOptionLabel, getOptionLabelFn]);

  // Custom hook abstraction that debounces search input value (opt-in)
  const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

  // If initialValue is specified attempt to initialize, otherwise default to []
  const [selectedOption, setSelectedOption] = useState<SelectedOption[]>(() => normalizeValue(initialValue, getOptionValueFn, getOptionLabelFn));

  // Custom hook abstraction that handles calculating menuHeight (defaults to menuMaxHeight)
  // ...and handles executing callbacks/logic on menuOpen state change.
  const [menuHeight, isMenuTopPosition]: [number, boolean] = useMenuPositioner(
    menuRef,
    menuOpen,
    menuPosition,
    menuMaxHeight,
    menuScrollDuration,
    scrollMenuIntoView,
    onMenuOpen,
    onMenuClose
  );

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

  const blurInput = (): void => {
    inputRef.current!.blur();
  };

  const focusInput = (): void => {
    inputRef.current!.focus();
  };

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

  const openMenuAndFocusOption = useCallback((position: OptionIndex): void => {
    if (!isArrayWithLength(menuOptions)) {
      setMenuOpen(true);
      return;
    }

    const selectedIndex = !isMulti
      ? menuOptions.findIndex(({ isSelected }) => isSelected)
      : -1;

    const index = (selectedIndex > -1)
      ? selectedIndex
      : ((position === OptionIndexEnum.FIRST) ? 0 : (menuOptions.length - 1));

    setMenuOpen(true);
    setFocusedOption({ index, ...menuOptions[index] });
    scrollToItemIndex(index);
  }, [isMulti, menuOptions]);

  const selectOption = useCallback((option: SelectedOption, isSelected?: boolean): void => {
    if (isSelected) {
      isMulti && removeSelectedOption(option.value);
    } else {
      setSelectedOption((prevSelectedOption) => (!isMulti ? [option] : [...prevSelectedOption, option]));
    }

    if (blurInputOnSelectOrTouch) {
      blurInput();
    } else if (closeMenuOnSelect) {
      setMenuOpen(false);
      setInputValue('');
    }
  }, [isMulti, closeMenuOnSelect, removeSelectedOption, blurInputOnSelectOrTouch]);

  useImperativeHandle(ref, () => ({
    blur: blurInput,
    focus: focusInput,
    clearValue: () => {
      setSelectedOption(SELECTED_OPTION_DEFAULT);
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    },
    setValue: (option?: OptionData) => {
      const validatedSelectedOption = validateSetValueParam(option, menuOptions, getOptionValueFn);
      setSelectedOption(validatedSelectedOption);
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
   * useEffects/useUpdateEffects
   *
   * 1: If autoFocus = true, focus the control following initial mount
   * 2: If control recieves focus & openMenuOnFocus = true, open menu
   * 3: If 'onSearchChange' function is defined, run as callback when the stateful debouncedInputValue updates
   *    check if onChangeEventValue ref is set true, which indicates the inputValue change was triggered by input change event
   * 4: (useUpdateEffect) Handle passing 'selectedOption' value(s) to onOptionChange callback function prop (if defined)
   * 5: (useUpdateEffect) Handle clearing focused option if menuOptions array has 0 length;
   *    Handle menuOptions changes - conditionally focus first option and do scroll to first option;
   *    Handle reseting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)
   */

  useEffect(() => {
    autoFocus && focusInput();
  }, [autoFocus]);

  useEffect(() => {
    if (isFocused && openMenuOnFocus) {
      openMenuAndFocusOption(OptionIndexEnum.FIRST);
    }
  }, [isFocused, openMenuOnFocus, openMenuAndFocusOption]);

  useEffect(() => {
    if (onSearchChange && onChangeEventValue.current) {
      onChangeEventValue.current = false;
      onSearchChange(debouncedInputValue);
    }
  }, [onSearchChange, debouncedInputValue]);

  useUpdateEffect(() => {
    if (!onOptionChange) return;

    const normalizedOptionValue = isMulti
      ? selectedOption.map(({ data }) => data)
      : isArrayWithLength(selectedOption)
        ? selectedOption[0].data
        : ON_CHANGE_SINGLE_VALUE_DEFAULT;

    onOptionChange(normalizedOptionValue);
  }, [isMulti, selectedOption, onOptionChange]);

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
    const { data, value, label, isSelected, isDisabled: focOptionDisabled } = focusedOption;

    if (data && !focOptionDisabled) {
      selectOption({ data, value, label }, isSelected);
    }
  };

  // Only Multiselect mode supports value focusing
  const focusValueOnArrowKey = (direction: ValueIndex): void => {
    if (!isArrayWithLength(selectedOption)) return;

    let nextFocusedIndex = -1;
    const lastValueIndex = (selectedOption.length - 1);
    const curFocusedIndex = focusedMultiValue ? selectedOption.findIndex(({ value }) => value === focusedMultiValue) : -1;

    switch (direction) {
      case ValueIndexEnum.NEXT: {
        nextFocusedIndex = (curFocusedIndex > -1 && curFocusedIndex < lastValueIndex)
          ? (curFocusedIndex + 1)
          : -1;

        break;
      }
      case ValueIndexEnum.PREVIOUS: {
        nextFocusedIndex = (curFocusedIndex !== 0)
          ? (curFocusedIndex === -1) ? lastValueIndex : (curFocusedIndex - 1)
          : 0;

        break;
      }
    }

    const nextFocusedVal: ReactText | null = (nextFocusedIndex >= 0)
      ? selectedOption[nextFocusedIndex].value!
      : FOCUSED_MULTI_DEFAULT;

    if (focusedOption.data)
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    if (nextFocusedVal !== focusedMultiValue)
      setFocusedMultiValue(nextFocusedVal);
  };

  const focusOptionOnArrowKey = (direction: OptionIndex): void => {
    if (!isArrayWithLength(menuOptions)) return;

    const index = (direction === OptionIndexEnum.DOWN)
      ? ((focusedOption.index + 1) % menuOptions.length)
      : (focusedOption.index > 0)
        ? (focusedOption.index - 1)
        : (menuOptions.length - 1);

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
        menuOpen
          ? focusOptionOnArrowKey(OptionIndexEnum.DOWN)
          : openMenuAndFocusOption(OptionIndexEnum.FIRST);

        break;
      case 'ArrowUp':
        menuOpen
          ? focusOptionOnArrowKey(OptionIndexEnum.UP)
          : openMenuAndFocusOption(OptionIndexEnum.LAST);

        break;
      case 'ArrowLeft':
        if (!isMulti || inputValue || renderMultiOptions) return;
        focusValueOnArrowKey(ValueIndexEnum.PREVIOUS);

        break;
      case 'ArrowRight':
        if (!isMulti || inputValue || renderMultiOptions) return;
        focusValueOnArrowKey(ValueIndexEnum.NEXT);

        break;
      case ' ': // Handle spacebar keydown events
        if (inputValue) {
          return;
        } else if (!menuOpen) {
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
          break;
        } else if (!focusedOption.data) {
          return;
        }
        selectOptionFromFocused();
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
        if (!menuOpen || !tabSelectsOption || !focusedOption.data || e.shiftKey) {
          return;
        }
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

    const tagNameNotInput = (e.currentTarget.tagName !== 'INPUT');

    if (!menuOpen) {
      openMenuOnClick && openMenuAndFocusOption(OptionIndexEnum.FIRST);
    } else if (tagNameNotInput) {
      setMenuOpen(false);
      inputValue && setInputValue('');
    }

    if (tagNameNotInput) {
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
    setMenuOpen(true);
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
    menuOpen ? setMenuOpen(false) : openMenuAndFocusOption(OptionIndexEnum.FIRST);
  }, [menuOpen, openMenuAndFocusOption]);

  /**
   * Calculated menu height passed react-window.
   * Also used to calculate MenuWrapper <div /> 'top' style prop if menu is positioned above control.
   */
  const calcMenuHeight = Math.min(menuHeight, menuOptions.length * menuItemSize);
  const menuStyleTop = isMenuTopPosition
    ? calculateMenuTop(calcMenuHeight, menuRef.current, controlRef.current)
    : undefined;

  return (
    <ThemeProvider theme={theme}>
      <SelectWrapper
        id={selectId}
        role='combobox'
        aria-haspopup='listbox'
        aria-controls={inputId}
        onKeyDown={handleOnKeyDown}
        data-testid={SELECT_CONTAINER_TESTID}
        aria-expanded={menuOpen ? 'true' : 'false'}
        className={addClassNames ? SELECT_CONTAINER_CLS : undefined}
      >
        <ControlWrapper
          ref={controlRef}
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          onMouseDown={handleOnControlMouseDown}
          data-testid={CONTROL_CONTAINER_TESTID}
          className={addClassNames ? CONTROL_CONTAINER_CLS : undefined}
          onTouchEnd={isTouchDevice ? handleOnControlMouseDown : undefined}
        >
          <ValueWrapper>
            <Value
              isMulti={isMulti}
              inputValue={inputValue}
              placeholder={placeholder}
              isTouchDevice={isTouchDevice}
              selectedOption={selectedOption}
              focusedMultiValue={focusedMultiValue}
              renderOptionLabel={renderOptionLabelFn}
              renderMultiOptions={renderMultiOptions}
              removeSelectedOption={removeSelectedOption}
            />
            <AutosizeInput
              id={inputId}
              ref={inputRef}
              ariaLabel={ariaLabel}
              inputValue={inputValue}
              onBlur={handleOnInputBlur}
              onFocus={handleOnInputFocus}
              addClassNames={addClassNames}
              onChange={handleOnInputChange}
              ariaLabelledBy={ariaLabelledBy}
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
            isTouchDevice={isTouchDevice}
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
            height={calcMenuHeight}
            itemSize={menuItemSize}
            loadingMsg={loadingMsg}
            menuOptions={menuOptions}
            noOptionsMsg={noOptionsMsg}
            selectOption={selectOption}
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

export default Select;