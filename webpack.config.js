const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  // ファイルの出力設定
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 出力ファイル名
    filename: 'assets/js/script.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'glob-import-loader'],
      },
      {
        test: /\.ejs$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false, // 追加
            },
          },
          {
            loader: 'template-ejs-loader'
          }
        ],
      },
    ]
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-jpegtran",
              "imagemin-optipng",
              "imagemin-svgo",
            ],
          },
        },
        // generator: [
        //   {
        //     // Apply generator for copied assets
        //     type: "asset",
        //     implementation: ImageMinimizerPlugin.squooshGenerate,
        //     options: {
        //       plugins: ["imagemin-webp"],
        //       encodeOptions: {
        //         webp: {
        //           quality: 100,
        //         },
        //       },
        //     },
        //   },
        // ],
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/assets/images')
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.ejs',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'sample/index.html',
      template: './src/html/sample/index.ejs',
      minify: false,
    }),
  ],
};
