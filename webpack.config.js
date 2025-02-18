const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                type: 'asset', // Updated to use asset modules
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192 // Inline files smaller than 8kb
                    }
                },
                generator: {
                    filename: 'assets/images/[name].[hash:6][ext][query]' // Keeps hashed filenames for caching
                }
            },
        ]
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        historyApiFallback: true,
        open: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/assets/images',
                to: 'assets/images',
                toType: "dir",
                globOptions: {
                  ignore: ["*.DS_Store", "Thumbs.db", "*.hbs"],
                },
              },
            ],
        }),
    ],
    mode: 'development'
};
