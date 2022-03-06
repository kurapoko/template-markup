const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  // ファイルの出力設定
  output: {
    path: `${__dirname}/dist/assets/js`,
    // 出力ファイル名
    filename: 'script.js'
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
      }
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
  ],
};
