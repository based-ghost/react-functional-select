import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.@(j|t)sx?'],
  addons: ['@storybook/addon-storysource'],
  core: {
    builder: 'webpack4'
  },
  reactOptions: {
    fastRefresh: true,
  },
  features: {
    postcss: false,
    modernInlineRender: true
  },
  staticDirs: ['../public'],
  framework: '@storybook/react'
};

module.exports = config;