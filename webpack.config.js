// node syntax
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // supports code-splitting
    chunkFilename: '[id].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  }
};
