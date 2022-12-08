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
  FUNCTIONS,
  EMPTY_ARRAY,
  DEFAULT_THEME,
  PAGE_SIZE_DEFAULT,
  PLACEHOLDER_DEFAULT,
  LOADING_MSG_DEFAULT,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  SELECT_CONTAINER_TESTID,
  CONTROL_CONTAINER_TESTID
} from './constants';
import type {
  Theme,
  SelectRef,
  OptionData,
  MenuOption,
  MultiParams,
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
import type { FixedSizeList } from 'react-window';
import styled, { css, ThemeProvider, type DefaultTheme } from 'styled-components';
import { Menu, Value, AriaLiveRegion, AutosizeInput, IndicatorIcons } from './components';
import { useDebounce, useLatestRef, useCallbackRef, useMenuOptions, useMountEffect, useUpdateEffect, useMenuPosition } from './hooks';
import { isBoolean, isFunction, isPlainObject, mergeDeep, suppressEvent, normalizeValue, isTouchDevice, isArrayWithLength } from './utils';

type SelectProps = Readonly<{
  async?: boolean;
  menuId?: string;
  inputId?: string;
  selectId?: string;
  pageSize?: number;
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

type ValueWrapperProps = Readonly<{
  flex: boolean;
}>;

interface ControlWrapperProps extends Pick<SelectProps, 'isInvalid' | 'isDisabled'> {
  readonly isFocused: boolean;
}

const SelectWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  ${({ theme }) => theme.select.css}
`;

const ValueWrapper = styled.div<ValueWrapperProps>`
  flex: 1 1 0%;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  display: ${({ flex }) => flex ? 'flex' : 'grid'};
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
    menuId,
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
    pageSize = PAGE_SIZE_DEFAULT,
    loadingMsg = LOADING_MSG_DEFAULT,
    placeholder = PLACEHOLDER_DEFAULT,
    noOptionsMsg = NO_OPTIONS_MSG_DEFAULT,
    menuItemSize = MENU_ITEM_SIZE_DEFAULT,
    menuMaxHeight = MENU_MAX_HEIGHT_DEFAULT
  },
  ref: Ref<SelectRef>
) => {
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
  const theme = useMemo<DefaultTheme>(() => {
    return isPlainObject(themeConfig)
      ? mergeDeep(DEFAULT_THEME, themeConfig)
      : DEFAULT_THEME;
  }, [themeConfig]);

  // Memoized callback functions referencing optional function properties on Select.tsx
  const getOptionLabelFn = useMemo<OptionLabelCallback>(() => getOptionLabel || FUNCTIONS.optionLabel, [getOptionLabel]);
  const getOptionValueFn = useMemo<OptionValueCallback>(() => getOptionValue || FUNCTIONS.optionValue, [getOptionValue]);
  const renderOptionLabelFn = useMemo<RenderLabelCallback>(() => renderOptionLabel || getOptionLabelFn, [renderOptionLabel, getOptionLabelFn]);

  // Custom hook abstraction that debounces search input value (opt-in)
  const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

  // Custom ref objects
  const onSearchChangeFn = useCallbackRef(onSearchChange);
  const onOptionChangeFn = useCallbackRef(onOptionChange);
  const onSearchChangeIsFn = useLatestRef<boolean>(isFunction(onSearchChange));
  const onOptionChangeIsFn = useLatestRef<boolean>(isFunction(onOptionChange));
  const menuOpenRef = useLatestRef<boolean>(menuOpen);
  const onChangeEvtValue = useRef<boolean>(false);
  const prevMenuOptionsLength = useRef<number>();

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
  const { menuStyleTop, menuHeightCalc } = useMenuPosition(
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
    scrollMenuIntoView
  );

  const blurInput = (): void => inputRef.current?.blur();
  const focusInput = (): void => inputRef.current?.focus();
  const scrollToItemIndex = (idx: number): void => listRef.current?.scrollToItem(idx);
  const hasSelectedOptions = isArrayWithLength(selectedOption);

  const openMenuAndFocusOption = useCallback((position: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) {
      setMenuOpen(true);
      return;
    }

    const selectedIdx = !isMulti
      ? menuOptions.findIndex((x) => x.isSelected)
      : -1;

    const index = selectedIdx > -1
      ? selectedIdx
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

  const selectOption = useCallback((option: MenuOption): void => {
    if (option.isDisabled) return;

    if (option.isSelected) {
      isMulti && removeSelectedOption(option.value);
    } else {
      const { isSelected, isDisabled, ...selectedOpt } = option;
      setSelectedOption((prev) => !isMulti ? [selectedOpt] : [...prev, selectedOpt]);
    }

    const blurOrDefault = isBoolean(blurInputOnSelect) ? blurInputOnSelect : isTouchDevice();
    if (blurOrDefault) {
      blurInput();
    } else if (closeMenuOnSelect) {
      setInputValue('');
      setMenuOpen(false);
    }
  }, [isMulti, closeMenuOnSelect, blurInputOnSelect, removeSelectedOption]);

  /**
   * `React.useImperativeHandle`
   *
   * Exposed API methods/properties available on a ref instance of this Select.tsx component.
   * Dependency list passed as the third param to re-create the handle when one of them updates.
   */
  useImperativeHandle(
    ref,
    () => ({
      menuOpen: menuOpenRef.current,
      blur: blurInput,
      focus: focusInput,
      clearValue: () => {
        setSelectedOption(EMPTY_ARRAY);
        setFocusedOption(FOCUSED_OPTION_DEFAULT);
      },
      setValue: (option?: OptionData) => {
        setSelectedOption(
          normalizeValue(option, getOptionValueFn, getOptionLabelFn)
        );
      },
      toggleMenu: (state?: boolean) => {
        if (state || (state === undefined && !menuOpenRef.current)) {
          focusInput();
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
        } else {
          blurInput();
        }
      }
    }),
    [menuOpenRef, getOptionValueFn, getOptionLabelFn, openMenuAndFocusOption]
  );

  /**
   * `useMountEffect`
   *
   * If 'autoFocus' true, focus the control following initial mount
   */
  useMountEffect(() => {
    if (autoFocus) {
      focusInput();
    }
  });

  /**
   * `React.useEffect`
   *
   * If 'onSearchChange' function is defined, run as callback when the stateful debouncedInputValue
   * updates check if onChangeEvtValue ref is set true, which indicates the inputValue change was triggered by input change event
   */
  useEffect(() => {
    if (onSearchChangeIsFn.current && onChangeEvtValue.current) {
      onChangeEvtValue.current = false;
      onSearchChangeFn(debouncedInputValue);
    }
  }, [onSearchChangeFn, onSearchChangeIsFn, debouncedInputValue]);

  /**
   * `useUpdateEffect`
   *
   * Handle passing 'selectedOption' value(s) to onOptionChange callback function prop (if defined)
   */
  useUpdateEffect(() => {
    if (onOptionChangeIsFn.current) {
      const normalSelectedOpts = isMulti
        ? selectedOption.map((x) => x.data)
        : isArrayWithLength(selectedOption)
          ? selectedOption[0].data
          : null;

      onOptionChangeFn(normalSelectedOpts);
    }
  }, [onOptionChangeFn, onOptionChangeIsFn, isMulti, selectedOption]);

  /**
   * `useUpdateEffect`
   *
   * Handle clearing focused option if menuOptions array has 0 length;
   * Handle menuOptions changes - conditionally focus first option and do scroll to first option;
   * Handle reseting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)
   * ...or if there is a selected item and menuOptions is restored to include it, give it focus
   */
  useUpdateEffect(() => {
    const curLength = menuOptions.length;
    const { current: prevLength } = prevMenuOptionsLength;
    const inputChanged = curLength > 0 && (async || curLength !== options.length || prevLength === 0);
    const menuOpenAndOptionsGrew = menuOpenRef.current && prevLength !== undefined && prevLength < curLength;

    if (curLength === 0) {
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    } else if (curLength === 1 || inputChanged || menuOpenAndOptionsGrew) {
      const index = Math.max(0, menuOptions.findIndex((x) => x.isSelected));
      scrollToItemIndex(index);
      setFocusedOption({ index, ...menuOptions[index] });
    }

    prevMenuOptionsLength.current = curLength;
  }, [async, options, menuOpenRef, menuOptions]);

  const selectOptionFromFocused = (): void => {
    const { index, ...menuOpt } = focusedOption;
    if (menuOpt.data) {
      selectOption(menuOpt as MenuOption);
    }
  };

  // only Multiselect mode supports value focusing (ArrowRight || ArrowLeft)
  const focusValueOnArrowKey = (key: string): void => {
    if (!hasSelectedOptions) return;

    let focusedIdx = -1;
    const lastValueIdx = selectedOption.length - 1;
    const curFocusedIdx = focusedMultiValue ? selectedOption.findIndex((x) => x.value === focusedMultiValue) : -1;

    if (key === 'ArrowRight') {
      focusedIdx = (curFocusedIdx > -1 && curFocusedIdx < lastValueIdx)
        ? curFocusedIdx + 1
        : -1;
    } else {
      focusedIdx = curFocusedIdx !== 0
        ? curFocusedIdx === -1
          ? lastValueIdx
          : curFocusedIdx - 1
        : 0;
    }

    const nextFocusedVal = focusedIdx > -1
      ? selectedOption[focusedIdx].value!
      : null;

    if (focusedOption.data)
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    if (nextFocusedVal !== focusedMultiValue)
      setFocusedMultiValue(nextFocusedVal);
  };

  const focusOptionOnArrowKey = (direction: OptionIndexEnum): void => {
    if (!isArrayWithLength(menuOptions)) return;

    let index = focusedOption.index;
    switch (direction) {
      case OptionIndexEnum.UP: {
        index = (focusedOption.index > 0) ? focusedOption.index - 1 : menuOptions.length - 1;
        break;
      }
      case OptionIndexEnum.DOWN: {
        index = (focusedOption.index + 1) % menuOptions.length;
        break;
      }
      case OptionIndexEnum.PAGEUP: {
        const pageIdx = focusedOption.index - pageSize;
        index = (pageIdx < 0) ? 0 : pageIdx;
        break;
      }
      case OptionIndexEnum.PAGEDOWN: {
        const pageIdx = focusedOption.index + pageSize;
        index = (pageIdx > menuOptions.length - 1) ? menuOptions.length - 1 : pageIdx;
        break;
      }
    }

    scrollToItemIndex(index);
    focusedMultiValue && setFocusedMultiValue(null);
    setFocusedOption({ index, ...menuOptions[index] });
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (isDisabled) return;

    if (onKeyDown) {
      onKeyDown(e, inputValue, focusedOption);
      if (e.defaultPrevented) return;
    }

    switch (e.key) {
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
        if (!isMulti || inputValue || renderMultiOptions) return;
        focusValueOnArrowKey(e.key);
        break;
      }
      case 'PageUp': {
        if (!menuOpen) return;
        focusOptionOnArrowKey(OptionIndexEnum.PAGEUP);
        break;
      }
      case 'PageDown': {
        if (!menuOpen) return;
        focusOptionOnArrowKey(OptionIndexEnum.PAGEDOWN);
        break;
      }
      // handle spacebar keydown events
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
        if (!menuOpen) return;
        selectOptionFromFocused();
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
        if (e.shiftKey || !menuOpen || !tabSelectsOption || !focusedOption.data) {
          return;
        }
        selectOptionFromFocused();
        break;
      }
      case 'Delete':
      case 'Backspace': {
        if (inputValue) return;

        if (focusedMultiValue) {
          const focusedIdx = selectedOption.findIndex((x) => x.value === focusedMultiValue);
          const nextFocusedMultiValue = (focusedIdx > -1 && (focusedIdx < (selectedOption.length - 1)))
            ? selectedOption[focusedIdx + 1].value!
            : null;

          removeSelectedOption(focusedMultiValue);
          setFocusedMultiValue(nextFocusedMultiValue);
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

  const handleOnInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    onInputBlur?.(e);
    setIsFocused(false);
    setMenuOpen(false);
    setInputValue('');
  };

  const handleOnInputFocus = (e: FocusEvent<HTMLInputElement>): void => {
    onInputFocus?.(e);
    setIsFocused(true);
    if (openMenuOnFocus) {
      openMenuAndFocusOption(OptionIndexEnum.FIRST);
    }
  };

  const handleOnInputChange = (e: FormEvent<HTMLInputElement>): void => {
    onChangeEvtValue.current = true;
    onInputChange?.(e.currentTarget.value);
    setInputValue(e.currentTarget.value);
    setMenuOpen(true);
  };

  // React Hooks linter rules require that this function be memoized in
  // ...order to be referenced in deps array of callback functions below
  const handleOnMouseDown = useCallback((e: SyntheticEvent<HTMLElement>): void => {
    suppressEvent(e);
    focusInput();
  }, []);

  const handleOnClearMouseDown = useCallback((e: MouseOrTouchEvent<HTMLElement>): void => {
    handleOnMouseDown(e);
    setSelectedOption(EMPTY_ARRAY);
  }, [handleOnMouseDown]);

  const handleOnCaretMouseDown = useCallback((e: MouseOrTouchEvent<HTMLElement>): void => {
    if (!isDisabled && !openMenuOnClick) {
      handleOnMouseDown(e);
      menuOpenRef.current ? setMenuOpen(false) : openMenuAndFocusOption(OptionIndexEnum.FIRST);
    }
  }, [isDisabled, menuOpenRef, openMenuOnClick, handleOnMouseDown, openMenuAndFocusOption]);

  const flexValueWrapper = !!isMulti && hasSelectedOptions;
  const showClear = !!isClearable && !isDisabled && hasSelectedOptions;

  return (
    <ThemeProvider theme={theme}>
      <SelectWrapper
        id={selectId}
        onKeyDown={handleOnKeyDown}
        className={SELECT_CONTAINER_CLS}
        data-testid={SELECT_CONTAINER_TESTID}
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
          <ValueWrapper flex={flexValueWrapper}>
            <Value
              isMulti={isMulti}
              hasInput={!!inputValue}
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
              menuId={menuId}
              menuOpen={menuOpen}
              required={required}
              ariaLabel={ariaLabel}
              isInvalid={isInvalid}
              inputValue={inputValue}
              onBlur={handleOnInputBlur}
              onFocus={handleOnInputFocus}
              onChange={handleOnInputChange}
              ariaLabelledBy={ariaLabelledBy}
              hasSelectedOptions={hasSelectedOptions}
              readOnly={!isSearchable || !!focusedMultiValue}
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
            onCaretMouseDown={handleOnCaretMouseDown}
          />
        </ControlWrapper>
        <Menu
          id={menuId}
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
          lazyLoadMenu={lazyLoadMenu}
          noOptionsMsg={noOptionsMsg}
          selectOption={selectOption}
          direction={menuItemDirection}
          itemKeySelector={itemKeySelector}
          overscanCount={menuOverscanCount}
          menuPortalTarget={menuPortalTarget}
          onMenuMouseDown={handleOnMouseDown}
          width={menuWidth || theme.menu.width}
          renderOptionLabel={renderOptionLabelFn}
          focusedOptionIndex={focusedOption.index}
        />
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