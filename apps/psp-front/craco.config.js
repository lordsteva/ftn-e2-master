/* eslint-disable @typescript-eslint/no-var-requires */
const CracoEslintWebpackPlugin = require('craco-eslint-webpack-plugin');
const path = require("path");

const packages = [];
packages.push(path.join(__dirname, "../components"));


module.exports = {
  
  eslint: {
		enable: true,
	},
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoEslintWebpackPlugin,
      options: {
        // See the options description below
        skipPreflightCheck: true,
        eslintOptions: {
          files: 'src/**/*.{js,jsx,ts,tsx}',
          lintDirtyModulesOnly: true,
          // ...
        },
      },
    },
  ],
};
