import { theme } from './config';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme,
  showAddonsPanel: true,
  panelPosition: 'bottom'
});
