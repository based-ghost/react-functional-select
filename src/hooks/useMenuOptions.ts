import { useEffect, useState } from 'react';
import { EMPTY_ARRAY, FilterMatchEnum } from '../constants';
import { isBoolean, trimAndFormatFilterStr } from '../utils';

import type { MenuOption } from '../Select';
import type { MutableRefObject } from 'react';
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
  getIsOptionDisabledRef: MutableRefObject<OptionDisabledCallback>,
  getFilterOptionStringRef: MutableRefObject<OptionFilterCallback>,
  filterIgnoreCase: boolean = false,
  filterIgnoreAccents: boolean = false,
  isMulti: boolean = false,
  async: boolean = false,
  hideSelectedOptions?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(EMPTY_ARRAY);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const hideSelectedOptionsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : isMulti;

  useEffect(() => {
    const { current: getIsOptionDisabled } = getIsOptionDisabledRef;
    const { current: getFilterOptionStr } = getFilterOptionStringRef;
    const normalizedSearch = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedHash = selectedOption.length ? new Set(selectedOption.map((x) => x.value)) : undefined;

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      const optionStr = getFilterOptionStr(option);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionStr, filterIgnoreCase, filterIgnoreAccents);

      return filterMatchFrom === FilterMatchEnum.ANY
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
        ...(getIsOptionDisabled(data) && { isDisabled: true }),
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

    const nextMenuOptions = options.reduce((acc: MenuOption[], option: OptionData) => {
      const menuOption = parseMenuOption(option);
      menuOption && acc.push(menuOption);
      return acc;
    }, []);

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