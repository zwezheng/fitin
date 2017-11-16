const path = require('path');

module.exports = env => {
  return {
    context: path.resolve('public/js'),
    entry: {
      react: 'react/components/Main.js',
      // this will find module in node_modules
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
        'react-redux',
        'redux',
      ],
    },
    devtool: 'source-map',
    output: {
      path: path.resolve('public/.build/apps'),
      filename: '[name].js', // this will output entry name
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
      ],
    },
    resolve: {
      alias: {

      },
      modules: [path.resolve(__dirname, 'public/js'), 'node_modules'],
      // this will tell the entry to look for public/js instead of node_moduels
    },
  };
};
