module.exports = {
  entry: './src/lambda/index.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
		libraryTarget: 'commonjs2'
  },
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
	experiments: {
		topLevelAwait: true
	}
};
