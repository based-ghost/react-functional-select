import { trimAndFormatFilterStr } from '../utils';
import { OptionData, MenuOption } from '../types';
import { useEffect, useState, ReactText } from 'react';
import { OPTIONS_DEFAULT } from '../constants/defaults';

export const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  getOptionValue_CB: (data: OptionData) => ReactText,
  getOptionLabel_CB: (data: OptionData) => ReactText,
  getIsOptionDisabled_CB: (data: OptionData) => boolean,
  getFilterOptionString_CB: (option: MenuOption) => string,
  filterIsCaseSensitive?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  useEffect(() => {
    // Parse options to array of MenuOptions and perform filtering (if applicable)
    const createMenuOptions = (): MenuOption[] => {
      const cleanSearchInputValue = trimAndFormatFilterStr(debouncedInputValue, filterIsCaseSensitive);

      const optionSatisfiesFilter = (menuOption: MenuOption): boolean => {
        const cleanStringifiedOption = trimAndFormatFilterStr(getFilterOptionString_CB(menuOption), filterIsCaseSensitive);
        return cleanStringifiedOption.indexOf(cleanSearchInputValue) > -1;
      };

      const parseMenuOption = (data: OptionData): MenuOption | undefined => {
        const menuOption = {
          data,
          label: getOptionLabel_CB(data),
          value: getOptionValue_CB(data),
        };

        if (cleanSearchInputValue && !optionSatisfiesFilter(menuOption)) {
          return;
        } 

        return {
          ...menuOption,
          ...(getIsOptionDisabled_CB(data) && { isDisabled: true }),
        };
      };

      return options.reduce((accumulator: MenuOption[], data: OptionData) => {
        const option = parseMenuOption(data);
        option && accumulator.push(option);
        return accumulator;
      }, []);
    };

    // Set menuOptions state (ensure array returned)
    setMenuOptions(createMenuOptions() || OPTIONS_DEFAULT);
  }, [options, filterIsCaseSensitive, debouncedInputValue, getFilterOptionString_CB, getOptionValue_CB, getOptionLabel_CB, getIsOptionDisabled_CB]);

  return menuOptions;
};