import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  framework: '@storybook/react',
  addons: ['@storybook/addon-storysource'],
  stories: ['../__stories__/**/*.stories.@(js|tsx|mdx)'],
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
    enableCrashReports: false
  }
};

export default config;