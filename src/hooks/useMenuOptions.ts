import { trimAndFormatFilterStr } from '../utils';
import { OptionData, MenuOption } from '../types';
import { useEffect, useState, ReactText } from 'react';
import { OPTIONS_DEFAULT } from '../constants/defaults';

/**
 * Hook: useMenuOptions.
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 * Set menuOptions state (ensure array returned).
 */
export const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  getOptionValueCB: (data: OptionData) => ReactText,
  getOptionLabelCB: (data: OptionData) => ReactText,
  getIsOptionDisabled?: (data: OptionData) => boolean,
  getFilterOptionString?: (option: MenuOption) => string,
  filterIsCaseSensitive?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  useEffect(() => {
    const createMenuOptions = (): MenuOption[] => {
      const cleanSearchInputValue: string = trimAndFormatFilterStr(debouncedInputValue, filterIsCaseSensitive);
      const isOptionDisabled = (data: OptionData): boolean => (getIsOptionDisabled ? getIsOptionDisabled(data) : !!data.isDisabled);

      const optionSatisfiesFilter = (menuOption: MenuOption): boolean => {
        const cleanOptionLabel = getFilterOptionString ? getFilterOptionString(menuOption) : String(menuOption.label);
        const cleanStringifiedOption = trimAndFormatFilterStr(cleanOptionLabel, filterIsCaseSensitive);
        return cleanStringifiedOption.indexOf(cleanSearchInputValue) > -1;
      };

      const parseMenuOption = (data: OptionData): MenuOption | undefined => {
        const menuOption = {
          data,
          label: getOptionLabelCB(data),
          value: getOptionValueCB(data),
        };

        if (cleanSearchInputValue && !optionSatisfiesFilter(menuOption)) {
          return undefined;
        } 

        return {
          ...menuOption,
          ...(isOptionDisabled(data) && { isDisabled: true }),
        };
      };

      return options.reduce((accumulator: MenuOption[], data: OptionData) => {
        const option = parseMenuOption(data);
        option && accumulator.push(option);
        return accumulator;
      }, []);
    };

    setMenuOptions(createMenuOptions() || OPTIONS_DEFAULT);
  }, [options, filterIsCaseSensitive, debouncedInputValue, getFilterOptionString, getIsOptionDisabled, getOptionValueCB, getOptionLabelCB]);

  return menuOptions;
};