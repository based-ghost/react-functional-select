import { trimAndFormatFilterStr } from '../utils';
import { OptionData, MenuOption } from '../types';
import { useEffect, useState, ReactText } from 'react';
import { OPTIONS_DEFAULT } from '../constants/defaults';

export const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  getOptionValueCB: (data: OptionData) => ReactText,
  getOptionLabelCB: (data: OptionData) => ReactText,
  getIsOptionDisabledCB: (data: OptionData) => boolean,
  getFilterOptionStringCB: (option: MenuOption) => string,
  filterIsCaseSensitive?: boolean
): MenuOption[] => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(OPTIONS_DEFAULT);

  useEffect(() => {
    // Parse options to array of MenuOptions and perform filtering (if applicable)
    const createMenuOptions = (): MenuOption[] => {
      const cleanSearchInputValue = trimAndFormatFilterStr(debouncedInputValue, filterIsCaseSensitive);

      const optionSatisfiesFilter = (menuOption: MenuOption): boolean => {
        const cleanStringifiedOption = trimAndFormatFilterStr(getFilterOptionStringCB(menuOption), filterIsCaseSensitive);
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
          ...(getIsOptionDisabledCB(data) && { isDisabled: true }),
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
  }, [options, filterIsCaseSensitive, debouncedInputValue, getFilterOptionStringCB, getOptionValueCB, getOptionLabelCB, getIsOptionDisabledCB]);

  return menuOptions;
};