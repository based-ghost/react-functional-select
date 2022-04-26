import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  appBg: '#E6E6E6',
  barBg: '#E0E0E0',
  barTextColor: '#7F7F7F',
  colorSecondary: '#1ea7fd',
  appBorderColor: '#D3D3D3',
  brandUrl: 'https://master--625676b6922472003af898b4.chromatic.com'
});

addons.setConfig({
  theme,
  showNav: true,
  showPanel: true
});
