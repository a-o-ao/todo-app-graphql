import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/experimental-nextjs-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(tsconfigPaths());
    return config;
  },
  "staticDirs": [
    "..\\public"
  ]
};
export default config;