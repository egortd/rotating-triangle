const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' для webpack 1
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  devServer: {
    stats: 'errors-only',
    watchOptions: {
      poll: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
    new VueLoaderPlugin(),
  ],
};
