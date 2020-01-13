import { create, color, themes } from '@storybook/theming';

export default create({
  base: 'dark',
  // UI
  appBorderRadius: 4,
  appBg: '#1B1E25',
  appBorderColor: '#535353',
  appContentBg: '#282c34',
  // Text colors
  textColor: '#fff',
  textInverseColor: '#000',
  // Toolbar default and active colors
  barBg: '#1B1E25',
  barTextColor: color.medium,
  // Form colors
  inputBorderRadius: 4,
  inputTextColor: '#fff',
  inputBg: themes.light.inputBg,
  inputBorder: themes.light.inputBorder,
  brandUrl: 'https://based-ghost.github.io/react-functional-select/',
});