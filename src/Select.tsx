import React, { useEffect, useMemo, useState, useCallback, useRef, useImperativeHandle, FocusEvent, FormEvent, KeyboardEvent, ReactNode, ReactText } from 'react';
import DefaultThemeObj from './theme';
import { FixedSizeList } from 'react-window';
import { fadeInAnimationCss } from './constants/styled';
import { useDebounce, useMenuHeight, useMenuOptions } from './hooks';
import styled, { css, DefaultTheme, ThemeProvider } from 'styled-components';
import { Menu, Value, AutosizeInput, IndicatorIcons, AriaLiveRegion } from './components';
import {
  createID,
  mergeDeep,
  isTouchDevice,
  isPlainObject,
  isArrayWithLength,
  validateSetValueOption,
} from './utils';
import {
  OptionData,
  MenuOption,
  SelectProps,
  SelectHandle,
  IndexPosition,
  FocusedOption,
  SelectedOption,
  MenuWrapperProps,
  MouseOrTouchEvent,
  IndexPositionEnum,
  ControlWrapperProps,
} from './types';
import {
  OPTIONS_DEFAULT,
  PLACEHOLDER_DEFAULT,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  SELECTED_OPTION_DEFAULT,
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
  CONTROL_CONTAINER_TESTID,
} from './constants/attributes';

const _indexPositionEnum = Object.freeze<IndexPositionEnum>({
  UP: 0,
  DOWN: 1,
  FIRST: 2,
  LAST: 3,
});

const SelectWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  ${({ theme }) => theme.color.textColor && css`color: ${theme.color.textColor};`}
  ${({ theme }) => theme.select.fontSize && css`font-size: ${theme.select.fontSize};`}
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
    height: ${control.height};
    transition: ${control.transition};
    border-style: ${control.borderStyle};
    border-width: ${control.borderWidth};
    border-radius: ${control.borderRadius};

    border-color: ${
      isInvalid 
        ? color.invalid 
        : isFocused 
          ? control.focusedBorderColor 
          : color.border};

    ${isDisabled && `pointer-events: none;`}
    ${(control.backgroundColor || isDisabled) && `background-color: ${isDisabled ? color.disabled : control.backgroundColor};`}
    ${isFocused && `box-shadow: ${control.boxShadow} ${isInvalid ? color.invalidFocus : control.boxShadowColor};`}
  `}
`;

const MenuWrapper = styled.div<MenuWrapperProps>`
  z-index: 999;
  position: absolute;
  ${fadeInAnimationCss}
  
  ${({ hideMenu, theme: { menu } }) => css`
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    box-shadow: ${menu.boxShadow};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    ${hideMenu && 'display: none;'}
  `}

  .${OPTION_CLS} {
    display: block;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-tap-highlight-color: transparent;
    padding: ${({ theme }) => theme.menu.option.padding};
    text-align: ${({ theme }) => theme.menu.option.textAlign};

    &.${OPTION_FOCUSED_CLS},
    &:hover:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
      background-color: ${({ theme }) => theme.menu.option.focusedBgColor};
    }

    &.${OPTION_SELECTED_CLS} {
      color: ${({ theme }) => theme.menu.option.selectedColor};
      background-color: ${({ theme }) => theme.menu.option.selectedBgColor};
    }

    &.${OPTION_DISABLED_CLS} {
      opacity: 0.35;
    }
  }
`;

const Select = React.forwardRef<SelectHandle, SelectProps>((
  {
    inputId,
    selectId,
    idSuffix,
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
    onInputFocus,
    initialValue,
    addClassNames,
    ariaLabelledBy,
    onOptionChange,
    getOptionLabel,
    getOptionValue,
    openMenuOnFocus,
    isAriaLiveEnabled,
    menuOverscanCount,
    blurInputOnSelect,
    renderOptionLabel,
    getIsOptionDisabled,
    filterIsCaseSensitive,
    getFilterOptionString,
    isSearchable = true,
    tabSelectsOption = true,
    closeMenuOnSelect = true,
    scrollMenuIntoView = true,
    backspaceClearsValue = true,
    options = OPTIONS_DEFAULT,
    placeholder = PLACEHOLDER_DEFAULT,
    noOptionsMsg = NO_OPTIONS_MSG_DEFAULT,
    menuItemSize = MENU_ITEM_SIZE_DEFAULT,
    menuMaxHeight = MENU_MAX_HEIGHT_DEFAULT,
  }, 
  ref: React.Ref<SelectHandle>,
) => {
  // Instance prop & DOM node refs
  const prevMenuOptionsCount = useRef<number>();
  const initValueAttempted = useRef<boolean>(false);
  const listRef = useRef<FixedSizeList | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Stateful values
  const [inputValue, setInputValue] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [focusedOption, setFocusedOption] = useState<FocusedOption>(FOCUSED_OPTION_DEFAULT);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>(SELECTED_OPTION_DEFAULT);

  const {
    data: focusedOptionData,
    value: focusedOptionValue,
    label: focusedOptionLabel,
    index: focusedOptionIndex,
    isDisabled: isFocusedOptionDisabled,
  } = focusedOption;

  // Theme for styled-components ThemeProvider
  const theme = useMemo<DefaultTheme>(() => {
    return !isPlainObject(themeConfig)
      ? { ...DefaultThemeObj }
      : mergeDeep(DefaultThemeObj, themeConfig);
  }, [themeConfig]);

  // Memoized callback functions referencing optional function properties on Select.tsx
  const getOptionLabelCB = useCallback((data: OptionData): ReactText => {
    return getOptionLabel ? getOptionLabel(data) : data.label;
  }, [getOptionLabel]);

  const getOptionValueCB = useCallback((data: OptionData): ReactText => {
    return getOptionValue ? getOptionValue(data) : data.value;
  }, [getOptionValue]);

  const renderOptionLabelCB = useCallback((data: OptionData): ReactNode => {
    return renderOptionLabel ? renderOptionLabel(data) : getOptionLabelCB(data);
  }, [renderOptionLabel, getOptionLabelCB]);

  // Custom hook abstraction that debounces search input value (opt-in)
  const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

  // Custom hook abstraction that handles calculating menuHeight (defaults to menuMaxHeight)
  // ...and handles executing callbacks/logic on menuOpen state change.
  const menuHeight: number = useMenuHeight(
    menuRef,
    menuOpen,
    menuMaxHeight,
    scrollMenuIntoView,
    onMenuOpen,
    onMenuClose,
  );

  // Custom hook abstraction that handles the creation of menuOptions
  const menuOptions: MenuOption[] = useMenuOptions(
    options,
    debouncedInputValue,
    getOptionValueCB,
    getOptionLabelCB,
    getIsOptionDisabled,
    getFilterOptionString,
    filterIsCaseSensitive,
  );

  const blurInput = (): void => {
    inputRef.current && inputRef.current.blur();
  };

  const focusInput = (): void => {
    inputRef.current && inputRef.current.focus();
  };

  const scrollToItemIndex = (index: number): void => {
    listRef.current && listRef.current.scrollToItem(index);
  };

  const selectOption = useCallback((option?: SelectedOption, isSelected?: boolean): void => {
    if (isSelected) {
      setMenuOpen(false);
    } else {
      setSelectedOption(option || SELECTED_OPTION_DEFAULT);
    }
  }, []);

  const openMenuAndFocusOption = useCallback((position: IndexPosition): void => {
    if (!isArrayWithLength(menuOptions)) {
      setMenuOpen(true);
      return;
    }

    const selectedIndex = selectedOption.value
      ? menuOptions.findIndex((option) => option.value === selectedOption.value)
      : -1;

    const index = (selectedIndex > -1)
      ? selectedIndex 
      : (position === _indexPositionEnum.FIRST) ? 0 : menuOptions.length - 1;

    setMenuOpen(true);
    setFocusedOption({ index, ...menuOptions[index] });
    scrollToItemIndex(index);
  }, [menuOptions, selectedOption]);

  /*** useImperativeHandle ***/
  // Public instance methods exposed to parent component - accessed via 'ref' attribute
  useImperativeHandle(ref, () => ({
    blur: blurInput,
    focus: focusInput,
    clearValue: () => {
      selectOption();
      setFocusedOption(FOCUSED_OPTION_DEFAULT);
    },
    setValue: (option?: OptionData) => {
      const validOptionOrUndefined = validateSetValueOption(option, menuOptions, getOptionValueCB);
      selectOption(validOptionOrUndefined);
    },
  }));

  /*** useEffect ***/
  // 1: if control recieves focus & openMenuOnFocus = true, open menu
  // 2: assign the initialValue after first render (if passed) - set initValueAttempted ref flag to true to ensure attempted just once
  // 3: handle changes to selected option value
  // 4: handle menuOptions changes - conditionally focus first option and do scroll to first option;
  //    ...also, handle resetting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)

  useEffect(() => {
    if (isFocused && openMenuOnFocus) {
      openMenuAndFocusOption(_indexPositionEnum.FIRST);
    }
  }, [isFocused, openMenuOnFocus, openMenuAndFocusOption]);

  useEffect(() => {
    if (!initValueAttempted.current && isPlainObject(initialValue)) {
      initValueAttempted.current = true;
      selectOption({
        data: initialValue,
        value: getOptionValueCB(initialValue),
        label: getOptionLabelCB(initialValue),
      });
    }
  }, [selectOption, initialValue, getOptionValueCB, getOptionLabelCB]);

  useEffect(() => {
    const { data } = selectedOption;
    onOptionChange && onOptionChange(data || null);
    !data && setFocusedOption(FOCUSED_OPTION_DEFAULT);

    const blurInputOnSelectOrDefault = (typeof blurInputOnSelect === 'boolean')
      ? blurInputOnSelect
      : isTouchDevice();
 
    if (blurInputOnSelectOrDefault && data) {
      blurInput();
    } else if (closeMenuOnSelect) {
      setMenuOpen(false);
      setInputValue('');
    }
  }, [selectedOption, onOptionChange, closeMenuOnSelect, blurInputOnSelect]);

  useEffect(() => {
    if (menuOptions.length === 1 || (!!menuOptions.length && (menuOptions.length !== options.length || prevMenuOptionsCount.current === 0))) {
      setFocusedOption({
        index: 0,
        ...menuOptions[0],
      });
      scrollToItemIndex(0);
    }
    // Track the previous value of menuOptions.length (used above)
    prevMenuOptionsCount.current = menuOptions.length;
  }, [options, menuOptions]);

  const selectOptionFromFocused = (): void => {
    if (!focusedOptionData || isFocusedOptionDisabled) {
      return;
    }
    
    if (closeMenuOnSelect && (selectedOption.value === focusedOptionValue)) {
      setMenuOpen(false);
    } else {
      selectOption({
        data: focusedOptionData,
        value: focusedOptionValue,
        label: focusedOptionLabel,
      });
    }
  };

  const focusOptionOnArrowKey = (position: IndexPosition): void => {
    if (!isArrayWithLength(menuOptions)) {
      return;
    }

    const index = (position === _indexPositionEnum.DOWN)
      ? (focusedOptionIndex + 1) % menuOptions.length
      : (focusedOptionIndex > 0)
        ? (focusedOptionIndex - 1)
        : (menuOptions.length - 1);
        
    setFocusedOption({ index, ...menuOptions[index] });
    scrollToItemIndex(index);  
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled) {
      return;
    }

    if (onKeyDown) {
      onKeyDown(e);
      if (e.defaultPrevented) {
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        if (menuOpen) {
          focusOptionOnArrowKey(_indexPositionEnum.DOWN);
        } else {
          openMenuAndFocusOption(_indexPositionEnum.FIRST);
        }
        break;
      case 'ArrowUp':
        if (menuOpen) {
          focusOptionOnArrowKey(_indexPositionEnum.UP);
        } else {
          openMenuAndFocusOption(_indexPositionEnum.LAST);
        }
        break;
      case ' ': // Handle spacebar keydown events
        if (inputValue) {
          return;
        } else if (!menuOpen) {
          openMenuAndFocusOption(_indexPositionEnum.FIRST);
        } else {
          selectOptionFromFocused();
        }
        break;
      case 'Enter': // Ignore enter keydown event from an Input Method Editor (IME) - keyCode 229
        if (e.keyCode !== 229) {
          selectOptionFromFocused();
        }
        break;
      case 'Escape':
        setMenuOpen(false);
        setInputValue('');
        break;
      case 'Tab':
        if (e.shiftKey || !menuOpen || !focusedOptionData) {
          return;
        } else if (tabSelectsOption) {
          selectOptionFromFocused();
        } else {
          setMenuOpen(false);
          setInputValue('');
        }
        break;
      case 'Delete':
      case 'Backspace':
        if (inputValue || !backspaceClearsValue || !isClearable) {
          return;
        }
        selectOption();
        break;
      default:
        return;
    }

    e.preventDefault();
  };

  const handleOnControlMouseDown = (e: MouseOrTouchEvent<HTMLDivElement>): void => {
    if (isDisabled) { return; }
    if (!isFocused) { focusInput(); }

    if (!menuOpen) {
      openMenuAndFocusOption(_indexPositionEnum.FIRST);
    } else if (e.currentTarget.tagName !== 'INPUT') {
      setMenuOpen(false);
      inputValue && setInputValue('');
    }

    if (e.currentTarget.tagName !== 'INPUT') {
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
    setMenuOpen(true);
    setInputValue(e.currentTarget.value || '');
  }, []);

  const handleOnClearMouseDown = useCallback((e: MouseOrTouchEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    (e.type === 'mousedown') && e.preventDefault();
    setSelectedOption(SELECTED_OPTION_DEFAULT);
    focusInput();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SelectWrapper
        onKeyDown={handleOnKeyDown}
        id={createID(selectId, idSuffix)}
        data-testid={SELECT_CONTAINER_TESTID}
        className={addClassNames ? SELECT_CONTAINER_CLS : undefined}
      >
        <ControlWrapper
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
              inputValue={inputValue}
              placeholder={placeholder}
              selectedOption={selectedOption}
              renderOptionLabel={renderOptionLabelCB}
            />
            <AutosizeInput
              ref={inputRef}
              disabled={isDisabled}
              ariaLabel={ariaLabel}
              inputValue={inputValue}
              onBlur={handleOnInputBlur}
              isSearchable={isSearchable}
              onFocus={handleOnInputFocus}
              addClassNames={addClassNames}
              onChange={handleOnInputChange}
              ariaLabelledBy={ariaLabelledBy}
              id={createID(inputId, idSuffix)}
            />
          </ValueWrapper>
          <IndicatorIcons
            menuOpen={menuOpen}
            clearIcon={clearIcon}
            caretIcon={caretIcon}
            isInvalid={isInvalid}
            isLoading={isLoading}
            addClassNames={addClassNames}
            onClearMouseDown={handleOnClearMouseDown}
            showClear={!!(isClearable && !isDisabled && selectedOption.data)}
          />
        </ControlWrapper>
        <MenuWrapper
          ref={menuRef}
          hideMenu={!menuOpen}
          onMouseDown={handleOnMenuMouseDown}
          data-testid={MENU_CONTAINER_TESTID}
          className={addClassNames ? MENU_CONTAINER_CLS : undefined}
        >
          <Menu
            ref={listRef}
            idSuffix={idSuffix}
            maxHeight={menuHeight}
            itemSize={menuItemSize}
            menuOptions={menuOptions}
            noOptionsMsg={noOptionsMsg}
            selectOption={selectOption}
            selectedOption={selectedOption}
            overscanCount={menuOverscanCount}
            width={menuWidth || theme.menu.width}
            focusedOptionIndex={focusedOptionIndex}
            renderOptionLabel={renderOptionLabelCB}
          />
        </MenuWrapper>
        {(isAriaLiveEnabled && isFocused) && (
          <AriaLiveRegion
            menuOpen={menuOpen}
            ariaLabel={ariaLabel}
            inputValue={inputValue}
            isSearchable={isSearchable}
            optionCount={menuOptions.length}
            focusedOptionLabel={focusedOptionLabel}
            focusedOptionIndex={focusedOptionIndex}
            selectedOptionLabel={selectedOption.label}
            isFocusedOptionDisabled={isFocusedOptionDisabled}
          />
        )}
      </SelectWrapper>
    </ThemeProvider>
  );
});

Select.displayName = 'Select';

export default Select;