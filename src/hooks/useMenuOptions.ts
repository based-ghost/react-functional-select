import { useEffect, useRef, useState } from 'react';
import { EMPTY_ARRAY, FilterMatchEnum } from '../constants';
import { isBoolean, trimAndFormatFilterStr } from '../utils';

import type { ReactText } from 'react';
import type { MenuOption } from '../Select';
import type { OptionData, SelectedOption } from '../types';

/**
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  filterMatchFrom: FilterMatchEnum,
  selectedOption: SelectedOption[],
  getOptionValue: (data: OptionData) => ReactText,
  getOptionLabel: (data: OptionData) => ReactText,
  getIsOptionDisabled?: (data: OptionData) => boolean,
  getFilterOptionString?: (option: MenuOption) => string,
  filterIgnoreCase?: boolean,
  filterIgnoreAccents?: boolean,
  isMulti?: boolean,
  hideSelectedOptions?: boolean,
  async?: boolean
): MenuOption[] => {
  const getIsOptionDisabledRef = useRef<(data: OptionData) => boolean>();
  const getFilterOptionStringRef = useRef<(option: MenuOption) => string>();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(EMPTY_ARRAY);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const hideSelectedOptionsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : !!isMulti;

  useEffect(() => {
    getIsOptionDisabledRef.current = getIsOptionDisabled || ((data) => !!data.isDisabled);
    getFilterOptionStringRef.current = getFilterOptionString || (({ label }) => (typeof label === 'string') ? label : `${label}`);
  }, [getIsOptionDisabled, getFilterOptionString]);

  useEffect(() => {
    const isMatchFilter = filterMatchFrom === FilterMatchEnum.ANY;
    const normalizedSearch = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedHash = selectedOption.length ? new Set(selectedOption.map((x) => x.value)) : undefined;

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      const optionStr = getFilterOptionStringRef.current!(option);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionStr, filterIgnoreCase, filterIgnoreAccents);

      return isMatchFilter
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
        ...(getIsOptionDisabledRef.current!(data) && { isDisabled: true }),
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

    const { length } = options;
    const nextMenuOptions: MenuOption[] = [];

    for (let i = 0; i < length; i++) {
      const option = parseMenuOption(options[i]);
      option && nextMenuOptions.push(option);
    }

    setMenuOptions(nextMenuOptions);
  }, [options, selectedOption, searchValue, hideSelectedOptionsOrDefault, filterMatchFrom, filterIgnoreCase, filterIgnoreAccents, getOptionValue, getOptionLabel]);

  return menuOptions;
};

export default useMenuOptions;