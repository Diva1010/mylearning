const path = require('path');
const SRC_DIR = path.join(__dirname, 'app');
const DIST_DIR = path.join(__dirname, 'dist');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:  [`${SRC_DIR}/index.jsx`,`${SRC_DIR}/styles.css`],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module : {
    rules : [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&minetype=image/png'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: [{
          loader: 'url-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          } 
      }]
      },
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        use: [
          {loader: 'babel-loader'},
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin(
                 {template: `${SRC_DIR}/index.html`}
       )
  ]
};