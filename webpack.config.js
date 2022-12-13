const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            // favicon: './src/assets/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({ extensions: ['ts', 'js'] }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'assets', 'news_placeholder.jpg'),
        //             to: path.resolve(__dirname, 'dist', 'img', 'news_placeholder.jpg'),
        //         },
        //     ],
        // }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
