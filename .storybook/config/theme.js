import { create, color, themes } from '@storybook/theming';

const BRAND_URL = 'https://based-ghost.github.io/react-functional-select/';

const COLOR_DARKER = '#282c34';
const COLOR_DARKEST = '#1B1E25';
const COLOR_PRIMARY = '#fc929e';
const COLOR_SECONDARY = '#E77D89'; // 8% darker than COLOR_PRIMARY

export default create({
  base: 'dark',

  // Base theme colors
  colorSecondary: COLOR_SECONDARY,

  // UI
  appBorderRadius: 4,
  appBg: COLOR_DARKEST,
  appBorderColor: '#535353',
  appContentBg: COLOR_DARKER,

  // Text colors
  textColor: '#fff',
  textInverseColor: '#000',

  // Toolbar default and active colors
  barBg: COLOR_DARKEST,
  barTextColor: color.medium,
  barSelectedColor: COLOR_PRIMARY,

  // Form colors
  inputBorderRadius: 4,
  inputTextColor: '#fff',
  inputBg: themes.light.inputBg,
  inputBorder: themes.light.inputBorder,

  brandUrl: BRAND_URL
});