import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  appBg: '#20232a',
  barBg: '#20232a',
  brandUrl: 'https://based-ghost.github.io/react-functional-select/'
});

addons.setConfig({
  theme,
  showAddonsPanel: true,
  panelPosition: 'bottom'
});
