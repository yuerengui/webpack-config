const webpack=require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
//  npm install --save-dev extract-text-webpack-plugin

module.exports = {
    devtool: 'sourcemap',
    entry: './entry.js',
    output: {
        filename: './dist/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test:/\.css$/,
                //loader:'style-loader!css-loader'
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                      {
                        loader: 'css-loader',
                        options:{
                          minimize: false
                          // 是否压缩 css
                        }
                      }
                    ]
                })
            },
            { 
                //  LESS 的.less 文件使用 style-loader、css-loader 和 less-loader 来编译处理
                //  npm install --save-dev less-loader less
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize: false
                                // 是否压缩 less
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
                //  loader: 'style-loader!css-loader!less-loader'
                //  不使用 ExtractTextPlugin 默认会将 less 文件压缩至 bundle.js 中
            },
            { 
                //  SASS的.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
                //  npm install sass-loader node-sass webpack --save-dev
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize: false
                                // 是否压缩 scss
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
                //  loader: 'style-loader!css-loader!sass-loader'
                //  不使用 ExtractTextPlugin 默认会将 sass 文件压缩至 bundle.js 中
            },
            {
                //  编译es6
                test: /\.js$/,
                use:"babel-loader",
                exclude:['node_moudles']
                //  根目录创建.babelrc,将 presets:['es2015','stage-0'] 放入对应文件中
            },
            {
                // test: require.resolve('jquery'),
                // use: [{
                //     loader: 'expose-loader',
                //     options: 'jQuery'
                // },{
                //     loader: 'expose-loader',
                //     options: '$'
                // }]
                //  把模块暴露给全局变量,需要注意的是,这种方式需要在 entry.js 中 require('jquery') 之后才会 expose 给全局
                //  这种方式也会将 jquery 压缩进 bundle.js 中
                //  所以需要使用 expose-loader 将库的模块暴露给全局变量
                //  The expose loader adds modules to the global object. 
                //  This is useful for debugging, or supporting libraries that depend on libraries in globals.
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 8192,
                        //这个限制以下的图片转换成 dataURL
                        outputPath: '/dist/img/', //最后一个/一定要加,不然就变成字符串拼接了
                        name: '[hash].[ext]' 
                  }
                }
                //  npm i url-loader --save-dev && npm i file-loader --save-dev
                //  把 只要涉及到处理的文件中 less,scss,js,html 涉及到图片文件的,就会根据规则处理并替换路径
                //  url-loader 是在 file-loader 的基础上进行的封装,所以所有的 file-loader 方法都是可用的。
            },
            {
                test:/\.(woff|woff2|eot|ttf|svg)$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 100000,
                        outputPath: '/dist/fonts/',
                        name: '[hash].[ext]'
                  }
                }
            }
        ]
    },
    plugins: [
        //  css抽离
        new ExtractTextPlugin({
            // filename:'./dist/css/app_[hash].css',
            // filename:'./dist/css/app_[chunkhash].css',
            filename:'./dist/css/style.css', //输出文件名
            disable:false,
            allChunks:false
        }),
        //  代码优化：合并以及压缩JS代码
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     //  输出不显示警告
        //     compress:{
        //         warnings:false
        //     },
        //     //  输出去掉注释
        //     output:{
        //         comments:false
        //     }
        // }),
    ],
    externals:{
       jquery222:'window.$'
    }
    //  功能：script 引入之后可以使用 require 的方式读取模块
    //  直接从全局变量中读取对应的组件,然后通过 var $ = require('jquery') 来使用
    //  需要注意的是,如果不添加这个选项,无法使用 require 包含对应的组件,会报错
    //  因为是模块化开发，所以使用 require 方式,来避免全局变量的产生
}


//  webpack 热替换
//  npm i webpack --save-dev && npm i webpack -g --save-dev
//  npm i webpack-dev-server --save-dev && npm i webpack-dev-server -g --save-dev
//  执行热替换
//  webpack-dev-server --hot