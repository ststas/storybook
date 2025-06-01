import type { StorybookConfig } from '@storybook/react-vite';
// import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // viteFinal: async (config) => {
  //   return mergeConfig(config, {
  //     base: '/storybook/',
  //   });
  // },
};

export default config;
