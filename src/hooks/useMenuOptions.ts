import { useEffect, useState } from 'react';
import type { MenuOption } from '../Select';
import useCallbackRef from './useCallbackRef';
import { isBoolean, trimAndFormatFilterStr } from '../utils';
import { EMPTY_ARRAY, FilterMatchEnum, FunctionDefaults } from '../constants';
import type {
  OptionData,
  SelectedOption,
  OptionValueCallback,
  OptionLabelCallback,
  OptionFilterCallback,
  OptionDisabledCallback
} from '../types';

/**
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

  const getFilterOptionStringRef = useCallbackRef(getFilterOptionString || FunctionDefaults.OPTION_FILTER);
  const getIsOptionDisabledRef = useCallbackRef(getIsOptionDisabled || FunctionDefaults.OPTION_IS_DISABLED);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const isFilterMatchAny = filterMatchFrom === FilterMatchEnum.ANY;
  const hideSelectedOptionsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : isMulti;

  useEffect(() => {
    const selectedHash = selectedOption.length ? new Set(selectedOption.map((x) => x.value)) : null;
    const normalizedSearch = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      if (!normalizedSearch) return true;

      const normalizedOptionLabel = trimAndFormatFilterStr(
        getFilterOptionStringRef(option),
        filterIgnoreCase,
        filterIgnoreAccents
      );

      return isFilterMatchAny
        ? normalizedOptionLabel.indexOf(normalizedSearch) > -1
        : normalizedOptionLabel.substr(0, normalizedSearch.length) === normalizedSearch;
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value = getOptionValue(data);
      const label = getOptionLabel(data);
      const isDisabled = getIsOptionDisabledRef(data);
      const isSelected = selectedHash?.has(value) ?? false;
      const menuOption: MenuOption = { data, value, label, isDisabled, isSelected };

      if (!isOptionFilterMatch(menuOption) || (hideSelectedOptionsOrDefault && isSelected)) {
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
    isFilterMatchAny,
    filterIgnoreCase,
    filterIgnoreAccents,
    getIsOptionDisabledRef,
    getFilterOptionStringRef,
    hideSelectedOptionsOrDefault
  ]);

  return menuOptions;
};

export default useMenuOptions;