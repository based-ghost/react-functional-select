import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.@(js|tsx|mdx)'],
  addons: ['@storybook/addon-storysource'],
  framework: '@storybook/react',
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
    builder: {
      name: 'webpack5',
      options: {
        lazyCompilation: false // applies to dev mode only
      }
    }
  }
};

module.exports = config;