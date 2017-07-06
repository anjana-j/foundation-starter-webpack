const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

const config = {

    devtool: "nosources-source-map", //eval-source-map
    
    entry: {
        vendor: ['jquery','foundation-sites','./src/assets/js/vendor.js'],
        app   : './src/assets/js/app.js'
    },

    output: {
        path: PATHS.dist,
        filename: './assets/js/[name].min.js'
    },

    resolve: {
        modules: ['node_modules'],
        extensions: [".js", ".json", ".jsx", ".css"],
        alias: {
            'images' : path.resolve(__dirname, 'src/assets/images'),
            'plugins': path.resolve(__dirname, 'src/plugins'),
            jquery: 'jquery/src/jquery',
            
        },
    },

    module: {
        rules: [

            /* styles loader */
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options : {
                                sourceMap: true
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer', {
                                            browsers: ['last 2 versions', 'ie >= 9']
                                        })
                                    ];
                                },
                                sourceMap: true
                            }
                        },

                        {
                            loader: "resolve-url-loader"
                        },

                        {
                            loader: "sass-loader",
                            options : {
                                sourceMap: true,
                                includePaths : ["./node_modules/foundation-sites/scss"]
                            }
                        }

                        
                    ],
                    fallback: "style-loader",
                    publicPath: '../../'
                })
            },


            /* fonts loader */
            {
                test: /\.svg$/,
                exclude: [path.resolve(__dirname, "./src/assets/images")],
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            },
            {
                test: /\.ttf$/,
                use: 'url-loader?limit=10000&mimetype=application/x-font-ttf&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            }, 
            {
                test: /\.otf$/,
                use: 'url-loader?limit=10000&mimetype=application/x-font-opentype&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            }, 
            {
                test: /\.woff$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            }, 
            {
                test: /\.woff2$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            }, 
            {
                test: /\.eot$/,
                use: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            }, 
            {
                test: /\.sfnt$/,
                use: 'url-loader?limit=10000&mimetype=application/font-sfnt&name=[name].[ext]&outputPath=./assets/fonts/&publicPath=../fonts/'
            },

            /* img loader */
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: [
                    path.resolve(__dirname, "./src/assets/fonts")
                ],
                use: "file-loader?name=./assets/images/[name].[ext]"
            },

            /* js loader */
            {
                test: /\.js$/,
                exclude: ["node_modules"],
                use: ['imports-loader']
            },

            /* jquery loader */
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }


        ]
    },

    plugins: [

        //new webpack.optimize.UglifyJsPlugin(),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        // HTML TEMPLATES

        new HtmlWebpackPlugin({
            title: 'Pilot Project',
            chunks: ['vendor', 'app'],
            template: './src/index.html'
        }),

        // new HtmlWebpackPlugin({
        //     filename: 'about.html',
        //     title: 'Pilot Project - About',
        //     chunks: ['vendor', 'about'],
        //     template: './src/about.html'
        // }),
        
        new ExtractTextPlugin({
            filename: './assets/css/[name].min.css',
            disable: false,
            allChunks: true
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        }, { reload: false })

    ]
};


module.exports = config;
