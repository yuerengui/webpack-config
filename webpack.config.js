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
                          minimize: true
                          // 压缩CSS
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
                        use: ['css-loader', 'less-loader']
                })
                //  loader: 'style-loader!css-loader!less-loader'
                //  将 less 文件压缩至 bundle.js 中
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
                                minimize: true
                                // 压缩CSS
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
                //  loader: 'style-loader!css-loader!sass-loader'
                //  抽离 css 文件到一个 css 文件中,而后再 html 中引入
                //  webpack 的 loader 默认将 css 都打包到 bundle.js 中
            },
            {
                test: /\.js$/,
                use:"babel-loader",
                exclude:['node_moudles']
                //  根目录创建.babelrc,将 presets:['es2015','stage-0'] 放入对应文件中
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
                //  把模块暴露给全局变量,需要注意的是,即使你外部引入 js 库,webpack 也不会将库中的对外模块暴露给全局
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
            }
           

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            // filename:'./dist/css/app_[hash].css',
            // filename:'./dist/css/app_[chunkhash].css',
            filename:'./dist/css/style.css', //输出文件名
            disable:false,
            allChunks:false
        })
        //css抽离
    ],
    externals:{
       jquery:'window.$'
    }
    //  直接从全局变量中读取对应的组件,然后通过 var $ = require('jquery')来使用
}


//  webpack 热替换
//  npm i webpack --save-dev && npm i webpack -g --save-dev
//  npm i webpack-dev-server --save-dev && npm i webpack-dev-server -g --save-dev
//  执行热替换
//  webpack-dev-server --hot