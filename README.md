## webpack.config.js


```
# install
git clone git@github.com:yuerengui/webpack-config.git 
cd webpack
npm i --save-dev extract-text-webpack-plugin
npm i --save-dev css-loader
npm i --save-dev less-loader less
npm i --save-dev sass-loader node-sass webpack 
npm i --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-stage-0
npm i --save-dev url-loader file-loader 
npm i expose-loader --save

# run server
webpack-dev-server --hot
```

> 主要配置项

1. css,less,sass 压缩处理并导出为 style.css
2. css 中的图片 URL 处理,字体处理,按照配置决定是否转换成 BASE64格式
3. JS 合并压缩代码
4. 第三方 JS 库不压缩到 bundle.js 中的处理
5. JS ES2015 代码转换
