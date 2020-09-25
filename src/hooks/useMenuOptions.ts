import { useEffect, useState, ReactText } from 'react';
import { trimAndFormatFilterStr } from '../utils';
import { FilterMatchEnum } from '../constants/enums';
import { OPTIONS_DEFAULT } from '../constants/defaults';
import { OptionData, MenuOption, SelectedOption } from '../types';

/**
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
export const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  filterMatchFrom: 'any' | 'start',
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
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const hideSelectedOptionsOrDefault = (typeof hideSelectedOptions !== 'boolean') ? !!isMulti : hideSelectedOptions;

  useEffect(() => {
    const normalizedInput = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedHash = new Set(selectedOption.map(({ value }) => value));

    const getIsOptionDisabledOrDefault: (data: OptionData) => boolean = getIsOptionDisabled || ((data) => !!data.isDisabled);
    const getFilterOptionStringOrDefault: (option: MenuOption) => string = getFilterOptionString || ((option) => (typeof option.label === 'string') ? option.label : `${option.label}`);

    const isOptionFilterMatch = (menuOption: MenuOption): boolean => {
      const optionStr = getFilterOptionStringOrDefault(menuOption);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionStr, filterIgnoreCase, filterIgnoreAccents);

      return (filterMatchFrom === FilterMatchEnum.ANY)
        ? normalizedOptionLabel.indexOf(normalizedInput) > -1
        : normalizedOptionLabel.substr(0, normalizedInput.length) === normalizedInput;
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value = getOptionValue(data);
      const label = getOptionLabel(data);

      const menuOption: MenuOption = {
        data,
        value,
        label,
        ...(getIsOptionDisabledOrDefault(data) && { isDisabled: true }),
        ...(selectedHash.has(value) && { isSelected: true })
      };

      if (
        (normalizedInput && !isOptionFilterMatch(menuOption)) ||
        (hideSelectedOptionsOrDefault && menuOption.isSelected)
      ) {
        return;
      }

      return menuOption;
    };

    const menuOptionsOrDefault = options.reduce((acc, data) => {
      const option = parseMenuOption(data);
      option && acc.push(option);
      return acc;
    }, [] as MenuOption[]);

    setMenuOptions(menuOptionsOrDefault);
  }, [options, selectedOption, searchValue, hideSelectedOptionsOrDefault, filterMatchFrom, filterIgnoreCase, filterIgnoreAccents, getFilterOptionString, getIsOptionDisabled, getOptionValue, getOptionLabel]);

  return menuOptions;
};