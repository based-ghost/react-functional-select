import { useEffect, useState, ReactText } from 'react';
import { MenuOption } from '../Select';
import { trimAndFormatFilterStr } from '../utils';
import { OptionData, SelectedOption } from '../types';
import { EMPTY_ARRAY, FilterMatchEnum } from '../constants';

/**
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
export const useMenuOptions = (
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
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(EMPTY_ARRAY);

  // Prevent effect from executing on search input mutations in 'async' mode (also prevents filtering from executing)
  const searchValue = !async ? debouncedInputValue : '';
  const hideSelectedOptionsOrDefault = (typeof hideSelectedOptions !== 'boolean') ? !!isMulti : hideSelectedOptions;

  useEffect(() => {
    const normalizedInput = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedHash = selectedOption.length ? new Set(selectedOption.map((x) => x.value)) : undefined;

    const getIsOptionDisabledOrDefault: (data: OptionData) => boolean = getIsOptionDisabled || ((data) => !!data.isDisabled);
    const getFilterOptionStringOrDefault: (option: MenuOption) => string = getFilterOptionString || ((option) => (typeof option.label === 'string') ? option.label : `${option.label}`);

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      const optionStr = getFilterOptionStringOrDefault(option);
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
        ...(selectedHash?.has(value) && { isSelected: true })
      };

      if (
        (normalizedInput && !isOptionFilterMatch(menuOption)) ||
        (hideSelectedOptionsOrDefault && menuOption.isSelected)
      ) {
        return;
      }

      return menuOption;
    };

    const nextMenuOptions: MenuOption[] = [];
    for (let i = 0; i < options.length; i++) {
      const option = parseMenuOption(options[i]);
      option && nextMenuOptions.push(option);
    }

    setMenuOptions(nextMenuOptions);
  }, [options, selectedOption, searchValue, hideSelectedOptionsOrDefault, filterMatchFrom, filterIgnoreCase, filterIgnoreAccents, getFilterOptionString, getIsOptionDisabled, getOptionValue, getOptionLabel]);

  return menuOptions;
};