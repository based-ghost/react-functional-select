import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.@(js|tsx|mdx)'],
  addons: ['@storybook/addon-storysource'],
  reactOptions: {
    fastRefresh: true,
  },
  core: {
    builder: 'webpack4'
  },
  features: {
    modernInlineRender: true
  },
  staticDirs: ['../public'],
  framework: '@storybook/react'
};

module.exports = config;