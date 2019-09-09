const prod = process.env.NODE_ENV;
module.exports = {
  mode: prod || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  optimization: prod ? {
    splitChunks: {
      chunks: 'all',
    },
  } : {},
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader', options: { emitWarning: true } },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
