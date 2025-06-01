import type { StorybookConfig } from '@storybook/react-vite';
// import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: undefined,
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    console.log('viteFinal is running');
    return {
      ...config,
      base: '/storybook/',
      build: {
        ...config.build,
        assetsDir: 'storybook-static',
      },
    };
  },
  core: {
    builder: '@storybook/builder-vite',
  },
};

export default config;
