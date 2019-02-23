import { Configuration } from 'webpack';
import { resolve as pathResolve } from 'path';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: pathResolve(__dirname, 'dist'),
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      { test: /.tsx?$/, include: pathResolve(__dirname, 'src'), loader: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};

export default config;