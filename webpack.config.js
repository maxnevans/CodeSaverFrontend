const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = (env) => {
    const devMode = !env.production;

    return {
        devServer: {
            port: 3000,
            proxy: {
                "/": "http://localhost:8080"
            },
            watchOptions: {
                watch: true,
            },
            stats: {
                children: false,
                maxModules: 0,
            }
        },
        stats: {
            children: false
        },
        devtool: devMode ? 'eval-cheap-module-source-map' : false,
        mode: devMode ? "development" : "production",
        entry: {
            polyfill: '@babel/polyfill',
            app: "./src/bootstrap.jsx",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: devMode ? "[name].js" : "[name].[hash].js"
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: () => [
                                        require('autoprefixer')
                                    ],
                                },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(devMode ? "development" : "production"),
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : "[name].[hash].css",
                chunkFilename: '[id].css'
            }),
        ]
    };
};