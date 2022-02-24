const CopyWebpackPlugin = require('copy-webpack-plugin')
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

    // ES5(IE11等)向けの指定
    target: ["web", "es5"],
};