import { useMemo } from 'react';
import useCallbackRef from './useCallbackRef';
import { FilterMatchEnum, FUNCTIONS } from '../constants';
import { isBoolean, trimAndFormatFilterStr } from '../utils';
import type {
  MenuOption,
  OptionData,
  SelectedOption,
  OptionValueCallback,
  OptionLabelCallback,
  OptionFilterCallback,
  OptionDisabledCallback
} from '../types';

/**
 * Parse options to array of MenuOptions and perform filtering (if applicable).
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
  const getFilterOptionStringRef = useCallbackRef(getFilterOptionString || FUNCTIONS.optionFilter);
  const getIsOptionDisabledRef = useCallbackRef(getIsOptionDisabled || FUNCTIONS.isOptionDisabled);

  const searchValue = !async ? debouncedInputValue : ''; // Prevent recomputing/filtering on input mutations in async mode
  const isFilterMatchAny = filterMatchFrom === FilterMatchEnum.ANY;
  const hideSelectedOptionsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : isMulti;

  const menuOptions = useMemo<MenuOption[]>(() => {
    const selectedValues = selectedOption.map((x) => x.value);
    const matchVal = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      if (!matchVal) return true;
      const filterVal = getFilterOptionStringRef(option);
      const normalFilterVal = trimAndFormatFilterStr(filterVal, filterIgnoreCase, filterIgnoreAccents);
      return isFilterMatchAny ? normalFilterVal.includes(matchVal) : normalFilterVal.startsWith(matchVal);
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value = getOptionValue(data);
      const label = getOptionLabel(data);
      const isDisabled = getIsOptionDisabledRef(data);
      const isSelected = selectedValues.includes(value);
      const menuOption: MenuOption = { data, value, label, isDisabled, isSelected };
      const filterOut = !isOptionFilterMatch(menuOption) || (hideSelectedOptionsOrDefault && isSelected);
      return filterOut ? undefined : menuOption;
    };

    return options.reduce((acc: MenuOption[], option: OptionData) => {
      const menuOption = parseMenuOption(option);
      menuOption && acc.push(menuOption);
      return acc;
    }, []);
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