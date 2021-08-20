const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

configOverrieds = {
  local: {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      port: 3000,
      historyApiFallback: true,
    },
  },
  development: {},
  production: {}
}

module.exports = (env) => {
  const config = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
    },
    module: {
      rules: [
        {
          /** https://github.com/graphql/graphql-js/issues/2721 */
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.[s]css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: env.NODE_ENV === 'local'
                    ? '[local]--[hash:base64]'
                    : '[hash:base64]'
                },
              }
            },
            'sass-loader'
          ],
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.tsx',
        '.ts'
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        appMountId: 'app',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      minimizer: [
        new CssMinimizerPlugin(),
      ]
    },
  };


  return merge(config, configOverrieds[env.NODE_ENV]);
};