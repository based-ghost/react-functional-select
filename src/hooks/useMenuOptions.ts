import { useEffect, useState, ReactText } from 'react';
import { trimAndFormatFilterStr } from '../utils';
import { OptionData, MenuOption } from '../types';
import { OPTIONS_DEFAULT } from '../constants/defaults';

/**
 * Custom Hook.
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
    const normalizedSearchInputValue: string = trimAndFormatFilterStr(debouncedInputValue, filterIsCaseSensitive);
    const isOptionDisabled = (data: OptionData): boolean => (getIsOptionDisabled ? getIsOptionDisabled(data) : !!data.isDisabled);

    const isOptionSearchFilterMatch = (menuOption: MenuOption): boolean => {
      const optionLabelString = getFilterOptionString ? getFilterOptionString(menuOption) : String(menuOption.label);
      const normalizedOptionLabel = trimAndFormatFilterStr(optionLabelString, filterIsCaseSensitive);
      return normalizedOptionLabel.indexOf(normalizedSearchInputValue) > -1;
    };

    const createMenuOptions = (): MenuOption[] => {
      const parseMenuOption = (data: OptionData): MenuOption | undefined => {
        const menuOption = {
          data,
          label: getOptionLabelCB(data),
          value: getOptionValueCB(data),
        };

        if (normalizedSearchInputValue && !isOptionSearchFilterMatch(menuOption)) {
          return;
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