import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  KeyboardEventHandler,
  FocusEventHandler,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  ReactText,
} from 'react';
import DefaultThemeObj from './theme';
import { FixedSizeList } from 'react-window';
import styled, { css, DefaultTheme, ThemeProvider } from 'styled-components';
import {
  FilterMatchEnum,
  ValueIndexEnum,
  OptionIndexEnum,
} from './constants/enums';
import {
  useDebounce,
  useMenuHeight,
  useMenuOptions,
  useUpdateEffect,
} from './hooks';
import {
  Menu,
  Value,
  AutosizeInput,
  IndicatorIcons,
  AriaLiveRegion,
} from './components';
import {
  mergeDeep,
  isTouchDevice,
  isPlainObject,
  normalizeValue,
  isArrayWithLength,
  validateSetValueParam,
} from './utils';
import {
  FocusedOption,
  SelectedOption,
  MouseOrTouchEvent,
  OptionIndex,
  ValueIndex,
  MenuWrapperProps,
  ControlWrapperProps,
} from './types';
import {
  OPTIONS_DEFAULT,
  PLACEHOLDER_DEFAULT,
  FOCUSED_MULTI_DEFAULT,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  SELECTED_OPTION_DEFAULT,
  ON_CHANGE_SINGLE_VALUE_DEFAULT,
} from './constants/defaults';
import {
  OPTION_CLS,
  IME_KEY_CODE,
  INPUT_TAG_NAME,
  OPTION_FOCUSED_CLS,
  MENU_CONTAINER_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
  MENU_CONTAINER_TESTID,
  MOUSE_DOWN_EVENT_TYPE,
  SELECT_CONTAINER_TESTID,
  CONTROL_CONTAINER_TESTID,
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

export type SelectProps = {
  readonly inputId?: string;
  readonly selectId?: string;
  readonly isMulti?: boolean;
  readonly ariaLabel?: string;
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
  readonly clearIcon?: ReactNode;
  readonly caretIcon?: ReactNode;
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

  ${({ isDisabled, isFocused, isInvalid, theme: { control, color }}) => `
    min-height: ${control.minHeight};
    transition: ${control.transition};
    border-style: ${control.borderStyle};
    border-width: ${control.borderWidth};
    border-radius: ${control.borderRadius};
    border-color: ${
      isInvalid
        ? color.danger
        : isFocused
        ? control.focusedBorderColor
        : color.border
    };
    ${isDisabled ? 'pointer-events: none;' : ''}
    ${control.height ? `height: ${control.height};` : ''}
    ${
      control.backgroundColor || isDisabled
        ? `background-color: ${
            isDisabled ? color.disabled : control.backgroundColor
          };`
        : ''
    }
    ${
      isFocused
        ? `box-shadow: ${control.boxShadow} ${
            isInvalid ? color.dangerLight : control.boxShadowColor
          };`
        : ''
    }
    ${control.css || ''}
  `}
`;

const MenuWrapper = styled.div<MenuWrapperProps>`
  z-index: 999;
  cursor: default;
  position: absolute;

  ${({ hideMenu, theme: { menu }}) => `
    width: ${menu.width};
    margin: ${menu.margin};
    padding: ${menu.padding};
    box-shadow: ${menu.boxShadow};
    border-radius: ${menu.borderRadius};
    background-color: ${menu.backgroundColor};
    ${hideMenu ? 'display: none;' : ''}
  `}

  animation: ${({ theme }) =>
    css`
      ${theme.menu.animation}
    `};
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

const Select = React.forwardRef<SelectRef, SelectProps>(
  (
    {
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
      options = OPTIONS_DEFAULT,
      placeholder = PLACEHOLDER_DEFAULT,
      filterMatchFrom = FilterMatchEnum.ANY,
      noOptionsMsg = NO_OPTIONS_MSG_DEFAULT,
      menuItemSize = MENU_ITEM_SIZE_DEFAULT,
      menuMaxHeight = MENU_MAX_HEIGHT_DEFAULT,
    },
    ref: React.Ref<SelectRef>
  ) => {
    // Instance prop & DOM node refs
    const prevMenuOptionsLength = useRef<number>();
    const listRef = useRef<FixedSizeList | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Stateful values
    const [inputValue, setInputValue] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [focusedOption, setFocusedOption] = useState<FocusedOption>(
      FOCUSED_OPTION_DEFAULT
    );
    const [
      focusedMultiValue,
      setFocusedMultiValue,
    ] = useState<ReactText | null>(FOCUSED_MULTI_DEFAULT);

    // Memoized callback functions referencing optional function properties on Select.tsx
    const getOptionLabelCB = useMemo<(data: OptionData) => ReactText>(() => {
      return getOptionLabel || (data => data.label);
    }, [getOptionLabel]);

    const getOptionValueCB = useMemo<(data: OptionData) => ReactText>(() => {
      return getOptionValue || (data => data.value);
    }, [getOptionValue]);

    const renderOptionLabelCB = useMemo<(data: OptionData) => ReactNode>(() => {
      return renderOptionLabel || getOptionLabelCB;
    }, [renderOptionLabel, getOptionLabelCB]);

    // Custom hook abstraction that debounces search input value (opt-in)
    const debouncedInputValue = useDebounce<string>(inputValue, inputDelay);

    // SelectedOption[] - if initialValue is specified attempt to initialize, otherwise default to []
    const [selectedOption, setSelectedOption] = useState<SelectedOption[]>(() =>
      normalizeValue(initialValue, getOptionValueCB, getOptionLabelCB)
    );

    // Custom hook abstraction that handles calculating menuHeight (defaults to menuMaxHeight)
    // ...and handles executing callbacks/logic on menuOpen state change.
    const menuHeight: number = useMenuHeight(
      menuRef,
      menuOpen,
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
      getOptionValueCB,
      getOptionLabelCB,
      getIsOptionDisabled,
      getFilterOptionString,
      filterIgnoreCase,
      filterIgnoreAccents,
      isMulti,
      hideSelectedOptions
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

    const removeSelectedOption = useCallback(
      (value?: ReactText, e?: MouseOrTouchEvent<HTMLDivElement>): void => {
        if (e) {
          e.stopPropagation();
          e.type === MOUSE_DOWN_EVENT_TYPE && e.preventDefault();
        }
        setSelectedOption(prevSelectedOption =>
          prevSelectedOption.filter(x => x.value !== value)
        );
      },
      []
    );

    const openMenuAndFocusOption = useCallback(
      (position: OptionIndex): void => {
        if (!isArrayWithLength(menuOptions)) {
          setMenuOpen(true);
          return;
        }

        const selectedIndex = !isMulti
          ? menuOptions.findIndex(option => option.isSelected)
          : -1;

        const index =
          selectedIndex > -1
            ? selectedIndex
            : position === OptionIndexEnum.FIRST
            ? 0
            : menuOptions.length - 1;

        setMenuOpen(true);
        setFocusedOption({ index, ...menuOptions[index] });
        scrollToItemIndex(index);
      },
      [isMulti, menuOptions]
    );

    const selectOption = useCallback(
      (option: SelectedOption, isSelected?: boolean): void => {
        if (isSelected) {
          isMulti && removeSelectedOption(option.value);
        } else {
          setSelectedOption(prevSelectedOption =>
            !isMulti ? [option] : [...prevSelectedOption, option]
          );
        }

        const blurInputOnSelectOrDefault: boolean =
          typeof blurInputOnSelect === 'boolean'
            ? blurInputOnSelect
            : isTouchDevice();

        if (blurInputOnSelectOrDefault) {
          blurInput();
        } else if (closeMenuOnSelect) {
          setMenuOpen(false);
          setInputValue('');
        }
      },
      [isMulti, closeMenuOnSelect, blurInputOnSelect, removeSelectedOption]
    );

    /*** useImperativeHandle ***/
    // Publicly exposed methods accessed via ref

    useImperativeHandle(ref, () => ({
      blur: blurInput,
      focus: focusInput,
      clearValue: () => {
        setSelectedOption(SELECTED_OPTION_DEFAULT);
        setFocusedOption(FOCUSED_OPTION_DEFAULT);
      },
      setValue: (option?: OptionData) => {
        const validatedSelectedOption: SelectedOption[] = validateSetValueParam(
          option,
          menuOptions,
          getOptionValueCB
        );
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

    /*** useEffect/useUpdateEffect ***/
    // 1: If autoFocus = true, focus the control following initial mount
    // 2: If control recieves focus & openMenuOnFocus = true, open menu
    // 3: (useUpdateEffect) Handle passing 'selec = tedOption' value(s) to onOptionChange callback function prop (if defined)
    // 4: (useUpdateEffect) Handle clearing focused option if menuOptions array has 0 length;
    //    Handle menuOptions changes - conditionally focus first option and do scroll to first option;
    //    Handle resetting scroll pos to first item after the previous search returned zero results (use prevMenuOptionsLen)

    useEffect(() => {
      autoFocus && focusInput();
    }, [autoFocus]);

    useEffect(() => {
      if (isFocused && openMenuOnFocus) {
        openMenuAndFocusOption(OptionIndexEnum.FIRST);
      }
    }, [isFocused, openMenuOnFocus, openMenuAndFocusOption]);

    useUpdateEffect(() => {
      if (onOptionChange) {
        const normalizedOptionValue = isMulti
          ? selectedOption.map(x => x.data)
          : isArrayWithLength(selectedOption)
          ? selectedOption[0].data
          : ON_CHANGE_SINGLE_VALUE_DEFAULT;

        onOptionChange(normalizedOptionValue);
      }
    }, [isMulti, selectedOption, onOptionChange]);

    useUpdateEffect(() => {
      const inputChanged: boolean =
        !!menuOptions.length &&
        (menuOptions.length !== options.length ||
          prevMenuOptionsLength.current === 0);

      if (!isArrayWithLength(menuOptions)) {
        setFocusedOption(FOCUSED_OPTION_DEFAULT);
      } else if (menuOptions.length === 1 || inputChanged) {
        setFocusedOption({ index: 0, ...menuOptions[0] });
        scrollToItemIndex(0);
      }

      // Track the previous value of menuOptions.length (used above)
      prevMenuOptionsLength.current = menuOptions.length;
    }, [options, menuOptions]);

    const selectOptionFromFocused = (): void => {
      const {
        data,
        value,
        label,
        isSelected,
        isDisabled: focusedOptionDisabled,
      } = focusedOption;

      if (data && !focusedOptionDisabled) {
        selectOption({ data, value, label }, isSelected);
      }
    };

    // Only Multiselect mode supports value focusing
    const focusValueOnArrowKey = (direction: ValueIndex): void => {
      if (!isArrayWithLength(selectedOption)) {
        return;
      }

      let nextFocusedIndex = -1;
      const lastValuesIndex = selectedOption.length - 1;
      const curFocusedIndex = focusedMultiValue
        ? selectedOption.findIndex(option => option.value === focusedMultiValue)
        : -1;

      if (direction === ValueIndexEnum.NEXT) {
        nextFocusedIndex =
          curFocusedIndex > -1 && curFocusedIndex < lastValuesIndex
            ? curFocusedIndex + 1
            : -1;
      } else {
        nextFocusedIndex =
          curFocusedIndex !== 0
            ? curFocusedIndex === -1
              ? lastValuesIndex
              : curFocusedIndex - 1
            : 0;
      }

      const nextFocusedVal: ReactText | null =
        nextFocusedIndex === -1
          ? FOCUSED_MULTI_DEFAULT
          : selectedOption[nextFocusedIndex].value!;

      focusedOption.data && setFocusedOption(FOCUSED_OPTION_DEFAULT);
      nextFocusedVal !== focusedMultiValue &&
        setFocusedMultiValue(nextFocusedVal);
    };

    const focusOptionOnArrowKey = (direction: OptionIndex): void => {
      if (!isArrayWithLength(menuOptions)) {
        return;
      }

      const index =
        direction === OptionIndexEnum.DOWN
          ? (focusedOption.index + 1) % menuOptions.length
          : focusedOption.index > 0
          ? focusedOption.index - 1
          : menuOptions.length - 1;

      focusedMultiValue && setFocusedMultiValue(FOCUSED_MULTI_DEFAULT);
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
            focusOptionOnArrowKey(OptionIndexEnum.DOWN);
          } else {
            openMenuAndFocusOption(OptionIndexEnum.FIRST);
          }
          break;
        case 'ArrowUp':
          if (menuOpen) {
            focusOptionOnArrowKey(OptionIndexEnum.UP);
          } else {
            openMenuAndFocusOption(OptionIndexEnum.LAST);
          }
          break;
        case 'ArrowLeft':
          if (!isMulti || inputValue) {
            return;
          }
          focusValueOnArrowKey(ValueIndexEnum.PREVIOUS);
          break;
        case 'ArrowRight':
          if (!isMulti || inputValue) {
            return;
          }
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
        case 'Enter':
          if (menuOpen && e.keyCode !== IME_KEY_CODE) {
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
          if (
            !menuOpen ||
            !tabSelectsOption ||
            !focusedOption.data ||
            e.shiftKey
          ) {
            return;
          }
          selectOptionFromFocused();
          break;
        case 'Delete':
        case 'Backspace':
          if (inputValue) {
            return;
          }

          if (focusedMultiValue) {
            const clearFocusedIndex: number = selectedOption.findIndex(
              option => option.value === focusedMultiValue
            );
            const nexFocusedMultiValue: ReactText | null =
              clearFocusedIndex > -1 &&
              clearFocusedIndex < selectedOption.length - 1
                ? selectedOption[clearFocusedIndex + 1].value!
                : FOCUSED_MULTI_DEFAULT;

            removeSelectedOption(focusedMultiValue);
            setFocusedMultiValue(nexFocusedMultiValue);
          } else {
            if (!backspaceClearsValue) {
              return;
            }
            if (isArrayWithLength(selectedOption)) {
              if (isMulti) {
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

    const handleOnControlMouseDown = (
      e: MouseOrTouchEvent<HTMLDivElement>
    ): void => {
      if (isDisabled) {
        return;
      }
      if (!isFocused) {
        focusInput();
      }

      if (!menuOpen) {
        openMenuOnClick && openMenuAndFocusOption(OptionIndexEnum.FIRST);
      } else if (e.currentTarget.tagName !== INPUT_TAG_NAME) {
        setMenuOpen(false);
        inputValue && setInputValue('');
      }

      if (e.currentTarget.tagName !== INPUT_TAG_NAME) {
        e.preventDefault();
      }
    };

    const handleOnMenuMouseDown = (
      e: MouseOrTouchEvent<HTMLDivElement>
    ): void => {
      e.stopPropagation();
      e.preventDefault();
      focusInput();
    };

    const handleOnInputBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>): void => {
        onInputBlur && onInputBlur(e);
        setIsFocused(false);
        setMenuOpen(false);
        setInputValue('');
      },
      [onInputBlur]
    );

    const handleOnInputFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>): void => {
        onInputFocus && onInputFocus(e);
        setIsFocused(true);
      },
      [onInputFocus]
    );

    const handleOnInputChange = useCallback(
      (e: FormEvent<HTMLInputElement>): void => {
        setMenuOpen(true);
        setInputValue(e.currentTarget.value || '');
      },
      []
    );

    const handleOnClearMouseDown = useCallback(
      (e: MouseOrTouchEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        e.type === MOUSE_DOWN_EVENT_TYPE && e.preventDefault();
        setSelectedOption(SELECTED_OPTION_DEFAULT);
        focusInput();
      },
      []
    );

    const handleOnCaretMouseDown = useCallback(
      (e: MouseOrTouchEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        e.type === MOUSE_DOWN_EVENT_TYPE && e.preventDefault();
        focusInput();

        if (menuOpen) {
          setMenuOpen(false);
        } else {
          openMenuAndFocusOption(OptionIndexEnum.FIRST);
        }
      },
      [menuOpen, openMenuAndFocusOption]
    );

    // Memoized DefaultTheme object for styled-components ThemeProvider
    const theme = useMemo<DefaultTheme>(() => {
      return isPlainObject(themeConfig)
        ? mergeDeep(DefaultThemeObj, themeConfig)
        : DefaultThemeObj;
    }, [themeConfig]);

    return (
      <ThemeProvider theme={theme}>
        <SelectWrapper
          id={selectId}
          onKeyDown={handleOnKeyDown}
          data-testid={SELECT_CONTAINER_TESTID}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls={inputId}
          aria-expanded={menuOpen ? 'false' : 'true'}
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
                isMulti={isMulti}
                inputValue={inputValue}
                placeholder={placeholder}
                selectedOption={selectedOption}
                focusedMultiValue={focusedMultiValue}
                renderOptionLabel={renderOptionLabelCB}
                removeSelectedOption={removeSelectedOption}
              />
              <AutosizeInput
                id={inputId}
                ref={inputRef}
                ariaLabel={ariaLabel}
                aria-autocomplete="list"
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
              loadingNode={loadingNode}
              addClassNames={addClassNames}
              onClearMouseDown={handleOnClearMouseDown}
              showClear={
                !!(
                  isClearable &&
                  !isDisabled &&
                  isArrayWithLength(selectedOption)
                )
              }
              onCaretMouseDown={
                !isDisabled && !openMenuOnClick
                  ? handleOnCaretMouseDown
                  : undefined
              }
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
              maxHeight={menuHeight}
              itemSize={menuItemSize}
              menuOptions={menuOptions}
              noOptionsMsg={noOptionsMsg}
              selectOption={selectOption}
              overscanCount={menuOverscanCount}
              width={menuWidth || theme.menu.width}
              renderOptionLabel={renderOptionLabelCB}
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
  }
);

Select.displayName = 'Select';

export default Select;
