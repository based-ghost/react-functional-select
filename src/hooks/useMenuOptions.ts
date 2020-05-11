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
  getOptionValueCB: (data: OptionData) => ReactText,
  getOptionLabelCB: (data: OptionData) => ReactText,
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
    const matchAny = (filterMatchFrom === FilterMatchEnum.ANY);
    const normalizedInput = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents);
    const selectedValues = selectedOption.length ? selectedOption.map(({ value }) => value) : undefined;

    const getIsOptionDisabledOrDefault: (data: OptionData) => boolean = getIsOptionDisabled || ((data) => !!data.isDisabled);
    const getFilterOptionStringOrDefault: (option: MenuOption) => string = getFilterOptionString || ((option) => (typeof option.label === 'string') ? option.label : `${option.label}`);

    const isOptionFilterMatch = (menuOption: MenuOption): boolean => {
      const optionStr = getFilterOptionStringOrDefault(menuOption);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionStr, filterIgnoreCase, filterIgnoreAccents);
      return matchAny
        ? normalizedOptionLabel.indexOf(normalizedInput) > -1
        : normalizedOptionLabel.substr(0, normalizedInput.length) === normalizedInput;
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value: ReactText = getOptionValueCB(data);

      const menuOption: MenuOption = {
        data,
        value,
        label: getOptionLabelCB(data),
        ...(getIsOptionDisabledOrDefault(data) && { isDisabled: true }),
        ...(selectedValues && selectedValues.includes(value) && { isSelected: true })
      };

      if ((normalizedInput && !isOptionFilterMatch(menuOption)) || (hideSelectedOptionsOrDefault && menuOption.isSelected)) {
        return;
      }

      return menuOption;
    };

    const menuOptionsOrDefault = options.reduce((acc: MenuOption[], data: OptionData) => {
      const option = parseMenuOption(data);
      option && acc.push(option);
      return acc;
    }, []);

    setMenuOptions(menuOptionsOrDefault);
  }, [options, selectedOption, searchValue, hideSelectedOptionsOrDefault, filterMatchFrom, filterIgnoreCase, filterIgnoreAccents, getFilterOptionString, getIsOptionDisabled, getOptionValueCB, getOptionLabelCB]);

  return menuOptions;
};