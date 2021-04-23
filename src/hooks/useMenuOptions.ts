import { useEffect, useState } from 'react';
import useCallbackRef from './useCallbackRef';
import { isBoolean, trimAndFormatFilterStr } from '../utils';
import { EMPTY_ARRAY, FilterMatchEnum, GET_OPTION_DISABLED_DEFAULT, GET_OPTION_FILTER_DEFAULT } from '../constants';

import type { MenuOption } from '../Select';
import type {
  OptionData,
  SelectedOption,
  OptionValueCallback,
  OptionLabelCallback,
  OptionFilterCallback,
  OptionDisabledCallback
} from '../types';

/**
 * useMenuOptions hook
 *
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  filterMatchFrom: FilterMatchEnum,
  selectedOption: SelectedOption[],
  getOptionValue: OptionValueCallback,
  getOptionLabel: OptionLabelCallback,
  getIsOptionDisabled?: OptionDisabledCallback,
  getFilterOptionString?: OptionFilterCallback,
  filterIgnoreCase: boolean = false,
  filterIgnoreAccents: boolean = false,
  isMulti: boolean = false,
  async: boolean = false,
  hideSelectedOptions?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(EMPTY_ARRAY);
  const getIsOptionDisabledRef = useCallbackRef(getIsOptionDisabled || GET_OPTION_DISABLED_DEFAULT);
  const getFilterOptionStringRef = useCallbackRef(getFilterOptionString || GET_OPTION_FILTER_DEFAULT);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const hideSelectedOptionsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : isMulti;

  useEffect(() => {
    const isFilterMatchAny = filterMatchFrom === FilterMatchEnum.ANY;
    const normalizedSearch = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedHash = selectedOption.length ? new Set(selectedOption.map((x) => x.value)) : undefined;

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      const optionStr = getFilterOptionStringRef(option);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionStr, filterIgnoreCase, filterIgnoreAccents);

      return isFilterMatchAny
        ? normalizedOptionLabel.indexOf(normalizedSearch) > -1
        : normalizedOptionLabel.substr(0, normalizedSearch.length) === normalizedSearch;
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value = getOptionValue(data);
      const label = getOptionLabel(data);

      const menuOption: MenuOption = {
        data,
        value,
        label,
        ...(getIsOptionDisabledRef(data) && { isDisabled: true }),
        ...(selectedHash?.has(value) && { isSelected: true })
      };

      if (
        (normalizedSearch && !isOptionFilterMatch(menuOption)) ||
        (hideSelectedOptionsOrDefault && menuOption.isSelected)
      ) {
        return;
      }

      return menuOption;
    };

    const nextMenuOptions = options.reduce(
      (acc: MenuOption[], option: OptionData) => {
        const menuOption = parseMenuOption(option);
        menuOption && acc.push(menuOption);
        return acc;
      },
      []
    );

    setMenuOptions(nextMenuOptions);
  }, [
    options,
    searchValue,
    getOptionValue,
    getOptionLabel,
    selectedOption,
    filterMatchFrom,
    filterIgnoreCase,
    filterIgnoreAccents,
    getIsOptionDisabledRef,
    getFilterOptionStringRef,
    hideSelectedOptionsOrDefault
  ]);

  return menuOptions;
};

export default useMenuOptions;