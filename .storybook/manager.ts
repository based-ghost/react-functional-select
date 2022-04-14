import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  appBg: '#F0F0F0',
  barBg: '#EAEAEA',
  colorSecondary: '#1ea7fd',
  appBorderColor: '#E5E5E5',
  brandUrl: 'https://625676b6922472003af898b4-bpkekyoyyc.chromatic.com/'
});

addons.setConfig({
  theme,
  showNav: true,
  showPanel: true
});
