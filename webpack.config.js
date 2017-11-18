/* eslint-disable */
process.env.NODE_ENV = 'production';
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
  filename: "./css/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
const webpack = require('webpack');

module.exports = env => {
  return {
    context: path.resolve('public'),
    entry: {
      react: './js/react/components/Main.js',
      // this will find module in node_modules
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
        'react-redux',
        'redux',
      ]
    },
    devtool: 'source-map',
    output: {
      path: path.resolve('public/.build'),
      filename: './js/[name].js', // this will output entry name
    },
    module: {
      noParse: /node_modules\/dist/,
      rules: [
        {
          test: /\.js$/,
          exclude: /vendor|node_modules|bower_components/,
          loader: 'babel-loader',
          query: {
            presets: ['react',
              ['es2015', { module: false }],
            ],
          },
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "less-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
          })
        },
      ],
    },
    plugins: process.env.NODE_ENV === 'production' ?
      [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
        }),
        new webpack.optimize.UglifyJsPlugin(),
        extractLess
      ] :
      [],
    resolve: {
      alias: {

      },
      modules: [path.resolve(__dirname, 'public'), 'node_modules'],
      // this will tell the entry to look for public instead of node_moduels
    },
  };
};
