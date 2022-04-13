import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.@(js|ts|tsx|mdx)'],
  addons: ['@storybook/addon-storysource'],
  staticDirs: ['../public'],
  core: {
    builder: 'webpack4'
  },
  reactOptions: {
    fastRefresh: true,
  },
  features: {
    modernInlineRender: true,
    // interactionsDebugger: true
  },
  framework: '@storybook/react'
  // logLevel: 'debug'
};

module.exports = config;