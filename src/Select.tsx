import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
  type Ref,
  type ReactNode,
  type FormEvent,
  type FocusEvent,
  type KeyboardEvent,
  type SyntheticEvent,
  type FocusEventHandler
} from 'react';
import {
  FilterMatchEnum,
  OptionIndexEnum,
  MenuPositionEnum,
  FunctionDefaults,
  EMPTY_ARRAY,
  SELECT_WRAPPER_ATTRS,
  PLACEHOLDER_DEFAULT,
  LOADING_MSG_DEFAULT,
  CONTROL_CONTAINER_CLS,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  CONTROL_CONTAINER_TESTID
} from './constants';
import type { FixedSizeList } from 'react-window';
import styled, { css, ThemeProvider, type DefaultTheme } from 'styled-components';
import { Menu, Value, AriaLiveRegion, AutosizeInput, IndicatorIcons } from './components';
import { useDebounce, useCallbackRef, useMenuOptions, useMountEffect, useUpdateEffect, useMenuPositioner } from './hooks';
import { isBoolean, isFunction, mergeThemes, suppressEvent, normalizeValue, IS_TOUCH_DEVICE, isArrayWithLength } from './utils';
import type {
  OptionData,
  PartialDeep,
  IconRenderer,
  FocusedOption,
  SelectedOption,
  CallbackFn,
  MouseOrTouchEvent,
  AriaLiveAttribute,
  OptionLabelCallback,
  OptionValueCallback,
  RenderLabelCallback
} from './types';

export type Theme = PartialDeep<DefaultTheme>;

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
  empty: boolean;
  menuOpen: boolean;
  blur: () => void;
  focus: () => void;
  clearValue: () => void;
  toggleMenu: (state?: boolean) => void;
  setValue: (option?: OptionData) => void;
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
  menuItemSize?: number;
  isClearable?: boolean;
  memoOptions?: boolean;
  lazyLoadMenu?: boolean;
  options?: OptionData[];
  isSearchable?: boolean;
  menuMaxHeight?: number;
  loadingNode?: ReactNode;
  ariaLabelledBy?: string;
  clearIcon?: IconRenderer;
  caretIcon?: IconRenderer;
  openMenuOnClick?: boolean;
  openMenuOnFocus?: boolean;
  menuPortalTarget?: Element;
  menuOverscanCount?: number;
  tabSelectsOption?: boolean;
  filterIgnoreCase?: boolean;
  menuScrollDuration?: number;
  blurInputOnSelect?: boolean;
  closeMenuOnSelect?: boolean;
  isAriaLiveEnabled?: boolean;
  menuWidth?: string | number;
  scrollMenuIntoView?: boolean;
  noOptionsMsg?: string | null;
  ariaLive?: AriaLiveAttribute;
  hideSelectedOptions?: boolean;
  filterIgnoreAccents?: boolean;
  onMenuOpen?: CallbackFn;
  onMenuClose?: CallbackFn;
  backspaceClearsValue?: boolean;
  menuPosition?: MenuPositionEnum;
  filterMatchFrom?: FilterMatchEnum;
  menuItemDirection?: 'ltr' | 'rtl';
  itemKeySelector?: string | number;
  getOptionLabel?: OptionLabelCallback;
  getOptionValue?: OptionValueCallback;
  initialValue?: OptionData | OptionData[];
  onInputChange?: (value?: string) => unknown;
  onSearchChange?: (value?: string) => unknown;
  onOptionChange?: (data: OptionData) => unknown;
  onInputBlur?: FocusEventHandler<HTMLInputElement>;
  onInputFocus?: FocusEventHandler<HTMLInputElement>;
  renderOptionLabel?: (data: OptionData) => ReactNode;
  getIsOptionDisabled?: (data: OptionData) => boolean;
  getFilterOptionString?: (option: MenuOption) => string;
  renderMultiOptions?: (params: MultiParams) => ReactNode;
  onKeyDown?: (e: KeyboardEvent<Element>, input?: string, focusedOption?: FocusedOption) => unknown;
}>;

interface ControlWrapperProps extends Pick<SelectProps, 'isInvalid' | 'isDisabled'> {
  isFocused: boolean;
}

const SelectWrapper = styled.div.attrs(SELECT_WRAPPER_ATTRS)`
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

  ${({ isDisabled, isFocused, isInvalid, theme: { control, color } }) => css`
    transition: ${control.transition};
    border-style: ${control.borderStyle};
    border-width: ${control.borderWidth};
    border-radius: ${control.borderRadius};
    min-height: ${control.height || control.minHeight};

    border-color: ${isInvalid
      ? color.danger
      : isFocused
      ? control.focusedBorderColor
      : color.border};

    ${control.height && `height: ${control.height};`}
    ${isDisabled && 'pointer-events:none;user-select:none;'}
    ${(control.backgroundColor || isDisabled) && `background-color: ${isDisabled ? color.disabled : control.backgroundColor};`}
    ${isFocused && `box-shadow: ${control.boxShadow} ${isInvalid ? color.dangerLight : control.boxShadowColor};`}
  `}

  ${({ theme }) => theme.control.css}
  ${({ isFocused, theme }) => isFocused && theme.control.focusedCss}
`;

const Select = forwardRef<SelectRef, SelectProps>((
  {
    async,
    isMulti,
    inputId,
    selectId,
    required,
    ariaLive,
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
    ariaLabelledBy,
    onOptionChange,
    onSearchChange,
    getOptionLabel,
    getOptionValue,
    itemKeySelector,
    openMenuOnFocus,
    menuPortalTarget,
    isAriaLiveEnabled,
    menuOverscanCount,
    blurInputOnSelect,
    menuItemDirection,
    renderOptionLabel,
    renderMultiOptions,
    menuScrollDuration,
    filterIgnoreAccents,
    hideSelectedOptions,
    getIsOptionDisabled,
    getFilterOptionString,
    isSearchable = true,
    memoOptions = false,
    lazyLoadMenu = false,
    openMenuOnClick = true,
    filterIgnoreCase = true,
    tabSelectsOption = true,
    closeMenuOnSelect = true,
    scrollMenuIntoView = true,
    backspaceClearsValue = true,
    filterMatchFrom = FilterMatchEnum.ANY,
    menuPosition = MenuPositionEnum.BOTTOM,
    options = EMPTY_ARRAY,
    loadingMsg = LOADING_MSG_DEFAULT,
    placeholder = PLACEHOLDER_DEFAULT,
    noOptionsMsg = NO_OPTIONS_MSG_DEFAULT,
    menuItemSize = MENU_ITEM_SIZE_DEFAULT,
    menuMaxHeight = MENU_MAX_HEIGHT_DEFAULT
  },
  ref: Ref<SelectRef>
) => {
  // Instance prop refs (primitive/function type)
  const menuOpenRef = useRef<boolean>(false);
  const prevMenuOptionsLength = useRef<number>();
  const onChangeEvtValue = useRef<boolean>(false);
  const onSearchChangeIsFunc = useRef<boolean>(isFunction(onSearchChange));
  const onOptionChangeIsFunc = useRef<boolean>(isFunction(onOptionChange));

  // DOM element refs
  const listRef = useRef<FixedSizeList | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  // Local state values
  const [inputValue, setInputValue] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [focusedMultiValue, setFocusedMultiValue] = useState<string | number | null>(null);
  const [focusedOption, setFocusedOption] = useState<FocusedOption>(FOCUSED_OPTION_DEFAULT);

  // Memoized DefaultTheme object for styled-components ThemeProvider
  const theme = useMemo<DefaultTheme>(() => mergeThemes(themeConfig), [themeConfig]);

  // Memoized callback functions referencing optional function properties on Select.tsx
  const getOptionLabelFn = useMemo<OptionLabelCallback>(() => getOptionLabel || FunctionDefaults.OPTION_LABEL, [getOptionLabel]);
  const getOptionValueFn = useMemo<OptionValueCallback>(() => getOptionValue || FunctionDefaults.OPTION_VALUE, [getOptionValue]);
  const renderOptionLabelFn = useMemo<RenderLabelCallback>(() => renderOptionLabel || getOptionLabelFn, [renderOptionLabel, getOptionLabelFn]);

  // Custom hook abstraction that debounces search input value (opt-in)
  const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

  // If initialValue is specified attempt to initialize, otherwise default to []
  const [selectedOption, setSelectedOption] = useState<SelectedOption[]>(
    () => normalizeValue(
      initialValue,
      getOptionValueFn,
      getOptionLabelFn
    )
  );

  // Custom hook abstraction that handles the creation of menuOptions
  const menuOptions = useMenuOptions(
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
    async,
    hideSelectedOptions
  );

  // Custom hook abstraction that handles calculating menuHeightCalc (defaults to menuMaxHeight) / handles executing callbacks/logic on menuOpen state change.
  const [menuStyleTop, menuHeightCalc] = useMenuPositioner(
    menuRef,
    controlRef,
    menuOpen,
    menuPosition,
    menuItemSize,
    menuMaxHeight,
    menuOptions.length,
    !!menuPortalTarget,
    onMenuOpen,
    onMenuClose,
    menuScrollDuration,
    scrollMenuIntoView,
  );

  const onSearchChangeRef = useCallbackRef(onSearchChange);
  const onOptionChangeRef = useCallbackRef(onOptionChange);

  const blurInput = (): void => inputRef.current?.blur();
  const focusInput = (): void => inputRef.current?.focus();
  const scrollToItemIndex = (idx: number): void => listRef.current?.scrollToItem(idx);

  // Local boolean flags based on component props
  const hasSelectedOptions = isArrayWithLength(selectedOption);
  const blurInputOnSelectOrDefault = isBoolean(blurInputOnSelect) ? blurInputOnSelect : IS_TOUCH_DEVICE;

  const openMenuAndFocusOption = useCallback((position: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) {
      setMenuOpen(true);
      return;
    }

    const selectedIndex = !isMulti
      ? menuOptions.findIndex((x) => x.isSelected)
      : -1;

    const index = selectedIndex > -1
      ? selectedIndex
      : position === OptionIndexEnum.FIRST
        ? 0
        : menuOptions.length - 1;

    scrollToItemIndex(index);
    setMenuOpen(true);
    setFocusedMultiValue(null);
    setFocusedOption({ index, ...menuOptions[index] });
  }, [isMulti, menuOptions]);

  const removeSelectedOption = useCallback((value?: string | number): void => {
    setSelectedOption((prev) => prev.filter((x) => x.value !== value));
  }, []);

  const selectOption = useCallback((option: SelectedOption, isSelected?: boolean): void => {
    if (isSelected) {
      isMulti && removeSelectedOption(option.value);
    } else {
      setSelectedOption((prev) => !isMulti ? [option] : [...prev, option]);
    }

    if (blurInputOnSelectOrDefault) {
      blurInput();
    } else if (closeMenuOnSelect) {
      setInputValue('');
      setMenuOpen(false);
    }
  }, [isMulti, closeMenuOnSelect, removeSelectedOption, blurInputOnSelectOrDefault]);

  /**
   * useImperativeHandle.
   * Exposed API methods/properties available on a ref instance of this Select.tsx component.
   * Dependency list passed as the third param to re-create the handle when one of them updates.
   */
  useImperativeHandle(
    ref,
    () => ({
      empty: !hasSelectedOptions,
      menuOpen: menuOpenRef.current,
      blur: blurInput,
      focus: focusInput,
      clearValue: () => {
        setSelectedOption(EMPTY_ARRAY);
        setFocusedOption(FOCUSED_OPTION_DEFAULT);
      },
      setValue: (option?: OptionData) => {
        const normalizedOptions = normalizeValue(option, getOptionValueFn, getOptionLabelFn);
        setSelectedOption(normalizedOptions);
      },
      toggleMenu: (state?: boolean) => {
        if (state === true || (state === undefined && !menuOpenRef.current)) {
          focusInput();
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
        } else {
          blurInput();
        }
      }
    }),
    [hasSelectedOptions, getOptionValueFn, getOptionLabelFn, openMenuAndFocusOption]
  );

  /**
   * useMountEffect:
   * If autoFocus = true, focus the control following initial mount.
   */
  useMountEffect(() => {
    autoFocus && focusInput();
  });

  /**
   * Write value of 'menuOpen' to ref object.
   * Prevent extraneous state update calls/rerenders.
   */
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  /**
   * Execute every render - these ref boolean flags are used to determine if functions
   * ..are defined inside of a callback wrapper returned from 'useCallbackRef' custom hook
   */
  useEffect(() => {
    onSearchChangeIsFunc.current = isFunction(onSearchChange);
    onOptionChangeIsFunc.current = isFunction(onOptionChange);
  });

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
   * updates check if onChangeEvtValue ref is set true, which indicates the inputValue change was triggered by input change event
   */
  useEffect(() => {
    const { current: isFunc } = onSearchChangeIsFunc;

    if (isFunc && onChangeEvtValue.current) {
      onChangeEvtValue.current = false;
      onSearchChangeRef(debouncedInputValue);
    }
  }, [onSearchChangeRef, debouncedInputValue]);

  /**
   * useUpdateEffect:
   * Handle passing 'selectedOption' value(s) to onOptionChange callback function prop (if defined)
   */
  useUpdateEffect(() => {
    const { current: isFunc } = onOptionChangeIsFunc;

    if (isFunc) {
      const normalizedOptionValue = isMulti
        ? selectedOption.map((x) => x.data)
        : isArrayWithLength(selectedOption)
          ? selectedOption[0].data
          : null;

      onOptionChangeRef(normalizedOptionValue);
    }
  }, [onOptionChangeRef, isMulti, selectedOption]);

  /**
   * useUpdateEffect:
   * Handle clearing focused option if menuOptions array has 0 length;
   * Handle menuOptions changes - conditionally focus first option and do scroll to first option;
   * Handle reseting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)
   */
  useUpdateEffect(() => {
    const { length } = menuOptions;
    const inputChanged = length > 0 && (async || length !== options.length || prevMenuOptionsLength.current === 0);

    if (length === 0) {
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    } else if (length === 1 || inputChanged) {
      scrollToItemIndex(0);
      setFocusedOption({ index: 0, ...menuOptions[0] });
    }

    prevMenuOptionsLength.current = length;
  }, [async, options, menuOptions]);

  const selectOptionFromFocused = (): void => {
    const {
      data,
      value,
      label,
      isSelected,
      isDisabled: disabled
    } = focusedOption;

    if (data && !disabled) {
      selectOption({ data, value, label }, isSelected);
    }
  };

  // Only Multiselect mode supports value focusing (ArrowRight || ArrowLeft)
  const focusValueOnArrowKey = (key: string): void => {
    if (!hasSelectedOptions) return;

    let nextFocusedIdx = -1;
    const lastValueIdx = selectedOption.length - 1;
    const curFocusedIdx = focusedMultiValue ? selectedOption.findIndex((x) => x.value === focusedMultiValue) : -1;

    if (key === 'ArrowRight') {
      nextFocusedIdx = (curFocusedIdx > -1 && curFocusedIdx < lastValueIdx)
        ? curFocusedIdx + 1
        : -1;
    } else {
      nextFocusedIdx = curFocusedIdx !== 0
        ? curFocusedIdx === -1
          ? lastValueIdx
          : curFocusedIdx - 1
        : 0;
    }

    const nextFocusedVal = nextFocusedIdx >= 0
      ? selectedOption[nextFocusedIdx].value!
      : null;

    if (focusedOption.data)
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    if (nextFocusedVal !== focusedMultiValue)
      setFocusedMultiValue(nextFocusedVal);
  };

  const focusOptionOnArrowKey = (direction: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) return;

    const index =
      direction === OptionIndexEnum.DOWN
        ? (focusedOption.index + 1) % menuOptions.length
        : focusedOption.index > 0
          ? focusedOption.index - 1
          : menuOptions.length - 1;

    scrollToItemIndex(index);
    setFocusedMultiValue(null);
    setFocusedOption({ index, ...menuOptions[index] });
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (isDisabled) return;

    const { key, shiftKey, defaultPrevented } = e;

    if (onKeyDown) {
      onKeyDown(e, inputValue, focusedOption);
      if (defaultPrevented) return;
    }

    switch (key) {
      case 'ArrowDown': {
        menuOpen ? focusOptionOnArrowKey(OptionIndexEnum.DOWN) : openMenuAndFocusOption(OptionIndexEnum.FIRST);
        break;
      }
      case 'ArrowUp': {
        menuOpen ? focusOptionOnArrowKey(OptionIndexEnum.UP) : openMenuAndFocusOption(OptionIndexEnum.LAST);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowRight': {
        if (!isMulti || inputValue || renderMultiOptions) {
          return;
        }
        focusValueOnArrowKey(key);
        break;
      }
      // Handle spacebar keydown events
      case ' ': {
        if (inputValue) return;

        if (!menuOpen) {
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
        } else if (!focusedOption.data) {
          return;
        } else {
          selectOptionFromFocused();
        }

        break;
      }
      case 'Enter': {
        if (menuOpen) {
          selectOptionFromFocused();
        }
        break;
      }
      case 'Escape': {
        if (menuOpen) {
          setMenuOpen(false);
          setInputValue('');
        }
        break;
      }
      case 'Tab': {
        if (!menuOpen || !tabSelectsOption || !focusedOption.data || shiftKey) {
          return;
        }
        selectOptionFromFocused();
        break;
      }
      case 'Delete':
      case 'Backspace': {
        if (inputValue) return;

        if (focusedMultiValue) {
          const clearFocusedIndex = selectedOption.findIndex((x) => x.value === focusedMultiValue);

          const nexFocusedMultiValue =
            (clearFocusedIndex > -1 && (clearFocusedIndex < (selectedOption.length - 1)))
              ? selectedOption[clearFocusedIndex + 1].value!
              : null;

          removeSelectedOption(focusedMultiValue);
          setFocusedMultiValue(nexFocusedMultiValue);
        } else {
          if (!backspaceClearsValue) return;
          if (!hasSelectedOptions) break;

          if (isMulti && !renderMultiOptions) {
            const { value } = selectedOption[selectedOption.length - 1];
            removeSelectedOption(value);
          } else if (isClearable) {
            setSelectedOption(EMPTY_ARRAY);
          }
        }

        break;
      }
      default:
        return;
    }

    e.preventDefault();
  };

  const handleOnMouseDownEvent = (e: SyntheticEvent<Element>): void => {
    suppressEvent(e);
    focusInput();
  };

  const handleOnControlMouseDown = (e: MouseOrTouchEvent<HTMLElement>): void => {
    if (isDisabled) return;
    if (!isFocused) focusInput();

    const isNotInput = (e.target as HTMLElement).nodeName !== 'INPUT';

    if (!menuOpen) {
      openMenuOnClick && openMenuAndFocusOption(OptionIndexEnum.FIRST);
    } else if (isNotInput) {
      setMenuOpen(false);
      setInputValue('');
    }

    if (isNotInput) e.preventDefault();
  };

  const handleOnInputBlur = useCallback((e: FocusEvent<HTMLInputElement>): void => {
    onInputBlur?.(e);
    setIsFocused(false);
    setMenuOpen(false);
    setInputValue('');
  }, [onInputBlur]);

  const handleOnInputFocus = useCallback((e: FocusEvent<HTMLInputElement>): void => {
    onInputFocus?.(e);
    setIsFocused(true);
  }, [onInputFocus]);

  const handleOnInputChange = useCallback((e: FormEvent<HTMLInputElement>): void => {
    onChangeEvtValue.current = true;
    onInputChange?.(e.currentTarget.value);
    setInputValue(e.currentTarget.value);
    setMenuOpen(true);
  }, [onInputChange]);

  const handleOnCaretMouseDown = useCallback((e: MouseOrTouchEvent<HTMLElement>): void => {
    handleOnMouseDownEvent(e);
    menuOpenRef.current ? setMenuOpen(false) : openMenuAndFocusOption(OptionIndexEnum.FIRST);
  }, [openMenuAndFocusOption]);

  const handleOnClearMouseDown = useCallback((e: MouseOrTouchEvent<HTMLElement>): void => {
    handleOnMouseDownEvent(e);
    setSelectedOption(EMPTY_ARRAY);
  }, []);

  const renderMenu = !lazyLoadMenu || (lazyLoadMenu && menuOpen);
  const showClear = !!(isClearable && !isDisabled && hasSelectedOptions);
  const inputReadOnly = isDisabled || !isSearchable || !!focusedMultiValue;
  const handleOnCaretMouseDownOrNoop = (!isDisabled && !openMenuOnClick) ? handleOnCaretMouseDown : undefined;

  return (
    <ThemeProvider theme={theme}>
      <SelectWrapper
        id={selectId}
        aria-controls={inputId}
        aria-expanded={menuOpen}
        onKeyDown={handleOnKeyDown}
      >
        <ControlWrapper
          ref={controlRef}
          isInvalid={isInvalid}
          isFocused={isFocused}
          isDisabled={isDisabled}
          className={CONTROL_CONTAINER_CLS}
          onTouchEnd={handleOnControlMouseDown}
          onMouseDown={handleOnControlMouseDown}
          data-testid={CONTROL_CONTAINER_TESTID}
        >
          <ValueWrapper>
            <Value
              isMulti={isMulti}
              inputValue={inputValue}
              placeholder={placeholder}
              selectedOption={selectedOption}
              focusedMultiValue={focusedMultiValue}
              renderMultiOptions={renderMultiOptions}
              renderOptionLabel={renderOptionLabelFn}
              removeSelectedOption={removeSelectedOption}
            />
            <AutosizeInput
              id={inputId}
              ref={inputRef}
              required={required}
              ariaLabel={ariaLabel}
              inputValue={inputValue}
              readOnly={inputReadOnly}
              onBlur={handleOnInputBlur}
              onFocus={handleOnInputFocus}
              onChange={handleOnInputChange}
              ariaLabelledBy={ariaLabelledBy}
              hasSelectedOptions={hasSelectedOptions}
            />
          </ValueWrapper>
          <IndicatorIcons
            menuOpen={menuOpen}
            clearIcon={clearIcon}
            caretIcon={caretIcon}
            isInvalid={isInvalid}
            isLoading={isLoading}
            showClear={showClear}
            isDisabled={isDisabled}
            loadingNode={loadingNode}
            onClearMouseDown={handleOnClearMouseDown}
            onCaretMouseDown={handleOnCaretMouseDownOrNoop}
          />
        </ControlWrapper>
        {renderMenu && (
          <Menu
            menuRef={menuRef}
            menuOpen={menuOpen}
            isLoading={isLoading}
            menuTop={menuStyleTop}
            height={menuHeightCalc}
            itemSize={menuItemSize}
            loadingMsg={loadingMsg}
            menuOptions={menuOptions}
            memoOptions={memoOptions}
            fixedSizeListRef={listRef}
            noOptionsMsg={noOptionsMsg}
            selectOption={selectOption}
            direction={menuItemDirection}
            itemKeySelector={itemKeySelector}
            overscanCount={menuOverscanCount}
            menuPortalTarget={menuPortalTarget}
            width={menuWidth || theme.menu.width}
            renderOptionLabel={renderOptionLabelFn}
            focusedOptionIndex={focusedOption.index}
            onMenuMouseDown={handleOnMouseDownEvent}
          />
        )}
        {isAriaLiveEnabled && (
          <AriaLiveRegion
            ariaLive={ariaLive}
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