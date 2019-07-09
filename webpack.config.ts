import { Configuration } from 'webpack';
import { resolve as pathResolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: pathResolve(__dirname, 'dist'),
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, include: pathResolve(__dirname, 'src'), loader: 'ts-loader' },
      { test: /(?<!\.important)\.s?css$/, use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.important\.s?css$/, use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'cssimportant-loader', 'sass-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
};

export default config;