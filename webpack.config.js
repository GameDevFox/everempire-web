'use strict';

const path = require('path');

const FlowWebpackPlugin = require('flow-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
console.log(`Webpack ENV: ${env}`);

// default production config
const config = {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },

  resolve: {
    alias: {
      Env: path.resolve(__dirname, 'src/env/prod')
    }
  },

  plugins: [
    new FlowWebpackPlugin({
      flowArgs: ['--color=never', '--quiet']
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};

if(env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 4000,
      overlay: true
    },

    resolve: {
      alias: {
        Env: path.resolve(__dirname, 'src/env/dev')
      }
    }
  });
}

if(env === 'test') {
  Object.assign(config, {
    mode: 'development',
    target: 'node',

    entry: './src/index.spec',
    output: {
      filename: 'spec.js'
    },

    devtool: 'source-map'
  });
}

module.exports = config;
