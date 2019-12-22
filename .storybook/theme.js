import { create, color, themes } from '@storybook/theming';

const COLOR_DARKER = '#282c34';
const COLOR_DARKEST = '#1D2027';
const COLOR_PRIMARY = '#fc929e'; //pinkish-red-salmon
const COLOR_SECONDARY = '#f5b83d'; // golden-yellow
const COLOR_PRIMARY_OPACITY = 'rgba(252, 146, 158, 0.675)';

export default create({
  base: 'dark',

  // Base theme colors
  colorPrimary: COLOR_SECONDARY,
  colorSecondary: COLOR_PRIMARY_OPACITY,

  // UI
  appBorderRadius: 0,
  appBg: COLOR_DARKEST,
  appBorderColor: '#535353',
  appContentBg: COLOR_DARKER,

  // Text colors
  textColor: '#fff',
  textInverseColor: 'rgba(255, 255, 255, 0.95)',

  // Toolbar default and active colors
  barBg: COLOR_DARKEST,
  barTextColor: color.medium,
  barSelectedColor: COLOR_PRIMARY,

  // Form colors
  inputBorderRadius: 4,
  inputBg: themes.light.inputBg,
  inputBorder: themes.light.inputBorder,
  inputTextColor: themes.light.inputTextColor,

  brandUrl: 'https://based-ghost.github.io/react-functional-select/',
});