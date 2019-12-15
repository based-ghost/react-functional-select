import { useEffect, useState, ReactText } from 'react';
import { trimAndFormatFilterStr } from '../utils';
import { OPTIONS_DEFAULT } from '../constants/defaults';
import { OptionData, MenuOption, SelectedOption } from '../types';

/**
 * Custom Hook.
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
export const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  hideSelectedOptions: boolean,
  selectedOption: SelectedOption[],
  getOptionValueCB: (data: OptionData) => ReactText,
  getOptionLabelCB: (data: OptionData) => ReactText,
  getIsOptionDisabled?: (data: OptionData) => boolean,
  getFilterOptionString?: (option: MenuOption) => string,
  filterIgnoreCase?: boolean,
  filterIgnoreAccents?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  useEffect(() => {
    const normalizedSearchValue: string = trimAndFormatFilterStr(debouncedInputValue, filterIgnoreCase, filterIgnoreCase);
    const getIsOptionDisabled2: (data: OptionData) => boolean = getIsOptionDisabled || ((data) => !!data.isDisabled);
    const getFilterOptionString2: (option: MenuOption) => string = getFilterOptionString || ((option) => String(option.label));
    
    const selectedValues: Array<ReactText | undefined> | undefined = selectedOption.length
      ? selectedOption.map(x => x.value)
      : undefined;

    const isOptionSearchFilterMatch = (menuOption: MenuOption): boolean => {
      const normalizedOptionLabel = trimAndFormatFilterStr(getFilterOptionString2(menuOption), filterIgnoreCase, filterIgnoreCase);
      return normalizedOptionLabel.indexOf(normalizedSearchValue) > -1;
    };

    const createMenuOptions = (): MenuOption[] => {
      const parseMenuOption = (data: OptionData): MenuOption | undefined => {
        const value: ReactText = getOptionValueCB(data);
        const menuOption: MenuOption = {
          data,
          value,
          label: getOptionLabelCB(data),
          ...((selectedValues && selectedValues.includes(value)) && { isSelected: true }),
        };

        if (
          (normalizedSearchValue && !isOptionSearchFilterMatch(menuOption)) ||
          (hideSelectedOptions && menuOption.isSelected)
        ) {
          return;
        }

        return {
          ...menuOption,
          ...(getIsOptionDisabled2(data) && { isDisabled: true }),
        };
      };

      return options.reduce((accumulator: MenuOption[], data: OptionData) => {
        const option = parseMenuOption(data);
        option && accumulator.push(option);
        return accumulator;
      }, []);
    };

    setMenuOptions(createMenuOptions() || OPTIONS_DEFAULT);
  }, [options, selectedOption, hideSelectedOptions, filterIgnoreCase, filterIgnoreAccents, debouncedInputValue, getFilterOptionString, getIsOptionDisabled, getOptionValueCB, getOptionLabelCB]);

  return menuOptions;
};