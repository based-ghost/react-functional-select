import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  appBg: '#20232a',
  barBg: '#20232a',
  brandUrl: 'https://625676b6922472003af898b4-bpkekyoyyc.chromatic.com/?path=/story/react-functional-select'
});

addons.setConfig({
  theme,
  isFullscreen: false,
  showAddonsPanel: true,
  panelPosition: 'bottom'
});
