const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        port: 3000,
        hot: true, // HMR
        open: true,
        contentBase: '../dist'
    },
    resolve: {
        extensions: [".ts", ".js", ".vue"],
        alias: {
            "@": path.resolve("src")
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(), // 压缩js
            new CssMinimizerPlugin(), // 压缩css
        ]
    },
    module: {
        rules: [
            // 处理css/scss/sass样式文件
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // babel
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

            // 支持vue
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            // 支持ts
            {
                test: /\.ts$/,
                use: [{
                    loader: "ts-loader",
                    options: { appendTsSuffixTo: [/\.vue$/] } // 识别vue文件中的ts
                }]
            },
            // 处理静态资源
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[hash:8].[ext]'
                                }
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader', // 压缩图片
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'Vue3-webpack5-ts',
            // 压缩html
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true
            }
        }),
        new CleanWebpackPlugin(), // 打包前清除dist
        new MiniCssExtractPlugin({ // 生成css文件
            filename: 'css/[name].css'
        }),
        new VueLoaderPlugin(),
        new BundleAnalyzerPlugin() // 包体积分析
    ]
}