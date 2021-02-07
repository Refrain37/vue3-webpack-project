const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        contentBase: '../dist'
    },
    module: {
        rules: [
            // 处理css/scss/sass样式文件
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // babel && 使用core-js处理兼容
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', // 兼容性处理
                                {
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3 },
                                    targets: { chrome: "58", ie: "9" }
                                }
                            ]
                        ],
                        cacheDirectory: true
                    }
                }
            },
            // 处理静态资源
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'Vue3-webpack5-ts'
        })
    ]
}