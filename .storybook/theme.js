import { create, color, themes } from '@storybook/theming';

const COLOR_DARKER = '#282c34';
const COLOR_DARKEST = '#1B1E25';
const COLOR_PRIMARY = '#fc929e'; //pinkish-red-salmon
const COLOR_DOES_NOTHING = '#f5b83d'; // golden-yellow
const COLOR_SECONDARY = '#ED838F'; // 6% darker than COLOR_PRIMARY

export default create({
  base: 'dark',

  // Base theme colors
  colorPrimary: COLOR_DOES_NOTHING,
  colorSecondary: COLOR_SECONDARY,

  // UI
  appBorderRadius: 0,
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
  inputBg: themes.light.inputBg,
  inputBorder: themes.light.inputBorder,
  inputTextColor: '#fff',

  brandUrl: 'https://based-ghost.github.io/react-functional-select/',
});