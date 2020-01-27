const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// const BUILD_TYPE = process.env.QS_BUILD_TYPE || 'PRODUCTION';
// console.log(`client-portal: process.env.QS_BUILD_TYPE=${process.env.QS_BUILD_TYPE}`);
// const mode = () => {
//   switch (BUILD_TYPE) {
//     case 'DEVELOPMENT':
//       return 'development';
//     case 'PRODUCTION':
//     default:
//       return 'production';
//   }
// };
// const config = require('./client/config');

module.exports = {
  mode: 'production',

//   devtool: 'source-map',

  entry: './src/app/app.js',

  output: {
    filename: path.join('.', '/js', '/app.js'),
    path: path.resolve('./public'),
  },

//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           test: /node_modules/,
//           name: 'vendors',
//           chunks: 'all',
//         },
//       },
//     },
//   },

  resolve: {
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
      },

      {
        test: /\.html$/,
        use: [
          'html-loader?exportAsEs6Default',
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
          fallback: 'style-loader'
        }),
        exclude: /node_modules/,
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          `file-loader?name=/${path.join('fonts', '/[hash].[ext]')}`,
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          `file-loader?name=/${path.join('images', '/[name].[ext]')}`,
        ],
        exclude: /node_modules/,
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    
    new ExtractTextPlugin(path.join('css', '/[name].css')),

    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(config.root.src, config.tasks.webpack.branding.src, '/modules/_wysiwyg-editor.scss'),
    //     to: path.join(config.tasks.webpack.css.dist, '/_wysiwyg-editor.scss'),
    //   },

    //   {
    //     from: path.resolve('./core/scss/_variables.scss'),
    //     to: path.join(config.tasks.webpack.css.dist, '/_variables.scss'),
    //   },

    //   {
    //     from: path.join(config.root.src, config.tasks.webpack.branding.src, '/theme.template.scss'),
    //     to: path.join(config.tasks.webpack.css.dist, '/theme.template.scss'),
    //   },
    // ]),

    // new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/),
  ]
};
