import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.@(js|tsx|mdx)'],
  addons: ['@storybook/addon-storysource'],
  framework: '@storybook/react',
  reactOptions: {
    fastRefresh: true
  },
  core: {
    builder: 'webpack5',
    disableTelemetry: true
  }
};

module.exports = config;