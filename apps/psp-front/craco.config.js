/* eslint-disable @typescript-eslint/no-var-requires */
const CracoEslintWebpackPlugin = require('craco-eslint-webpack-plugin');
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../../packages"));

const absolutePath = path.join(__dirname, '../../packages');
module.exports = {
  webpack: { configure: (webpackConfig, { env, paths }) => {
    const { isFound, match } = getLoader(
      webpackConfig,
      loaderByName('babel-loader'),
    );
    if (isFound) {
      const include = Array.isArray(match.loader.include)
        ? match.loader.include
        : [match.loader.include];
      match.loader.include = include.concat(absolutePath);
    }
    return {
      ...webpackConfig,
    };
  },
    entry: ['babel-polyfill', './src/index.js'],
    module: {
      rules: [{
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, '../../packages'),
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      }]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      alias: {
        "@team21": path.resolve(__dirname, '../../packages')
      }
    }
  
  },
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
        skipPreflightCheck: true,
        eslintOptions: {
          files: 'src/**/*.{js,jsx,ts,tsx}',
          lintDirtyModulesOnly: true,
        },
      },
    },
  ],
};
