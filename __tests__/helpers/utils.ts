import { ReactNode, ReactText } from 'react';
import { MenuOption, OptionData } from '../../src/types';

type Option = {
  readonly label: ReactText;
  readonly value: ReactText;
};

const OPTIONS: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' }
];

const MENU_OPTION_SELECTED: MenuOption = {
  isSelected: true,
  value: 1,
  label: 'Option 1',
  data: {
    value: 1,
    label: 'Option 1'
  }
};

const MENU_OPTION_DISABLED: MenuOption = {
  isDisabled: true,
  value: 2,
  label: 'Option 2',
  data: {
    value: 2,
    label: 'Option 2'
  }
};

const MENU_OPTIONS: MenuOption[] = [
  MENU_OPTION_SELECTED,
  MENU_OPTION_DISABLED
];

const RENDER_OPTION_LABEL_MOCK = jest.fn((data: OptionData): ReactNode => data.label);

export {
  Option,
  OPTIONS,
  MENU_OPTIONS,
  MENU_OPTION_SELECTED,
  MENU_OPTION_DISABLED,
  RENDER_OPTION_LABEL_MOCK
};