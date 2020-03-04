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
  hideSelectedOptions?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  const hideSelectedOptionsOrDefault: boolean = (typeof hideSelectedOptions !== 'boolean')
    ? !!isMulti
    : hideSelectedOptions;

  useEffect(() => {
    const isFilterMatchAny = (filterMatchFrom === FilterMatchEnum.ANY);
    const selectedValues = selectedOption.length ? selectedOption.map(x => x.value) : undefined;
    const normalizedInput = trimAndFormatFilterStr(debouncedInputValue, filterIgnoreCase, filterIgnoreCase);

    const getIsOptionDisabled2: (data: OptionData) => boolean = getIsOptionDisabled || ((data) => !!data.isDisabled);
    const getFilterOptionString2: (option: MenuOption) => string = getFilterOptionString || ((option) => (typeof option.label === 'string') ? option.label : `${option.label}`);

    const isOptionFilterMatch = (menuOption: MenuOption): boolean => {
      const normalizedOptionLabel = trimAndFormatFilterStr(getFilterOptionString2(menuOption), filterIgnoreCase, filterIgnoreCase);
      return isFilterMatchAny
        ? normalizedOptionLabel.indexOf(normalizedInput) > -1
        : normalizedOptionLabel.substr(0, normalizedInput.length) === normalizedInput;
    };

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value: ReactText = getOptionValueCB(data);

      const menuOption: MenuOption = {
        data,
        value,
        label: getOptionLabelCB(data),
        ...(getIsOptionDisabled2(data) && { isDisabled: true }),
        ...((selectedValues && selectedValues.includes(value)) && { isSelected: true })
      };

      if (
        (normalizedInput && !isOptionFilterMatch(menuOption)) ||
        (hideSelectedOptionsOrDefault && menuOption.isSelected)
      ) {
        return;
      }

      return menuOption;
    };

    const menuOptionsOrDefault = options.reduce((acc: MenuOption[], data: OptionData) => {
      const option = parseMenuOption(data);
      option && acc.push(option);
      return acc;
    }, []);

    setMenuOptions(menuOptionsOrDefault || OPTIONS_DEFAULT);
  }, [options, selectedOption, hideSelectedOptionsOrDefault, filterMatchFrom, filterIgnoreCase, filterIgnoreAccents, debouncedInputValue, getFilterOptionString, getIsOptionDisabled, getOptionValueCB, getOptionLabelCB]);

  return menuOptions;
};