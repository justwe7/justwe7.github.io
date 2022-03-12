# 初始化一个webpack工程

```
npm init -y 快速创建package.json
npm install webpack webpack-cli --save-dev
```

**下饭菜：**

webpack4之后的0配置原则，遵循默认的项目结构可以不用编写webpack的配置文件：

1. 创建 `src/index.js` 文件，随便写写 `console.log(9527)` 之类的就行
2. 运行 `$ npx webpack` 指令就会在项目目录下生成一个 dist 目录，会以 `index.js` 为入口生成一个 `main.js` 文件

**创建配置文件**

1. 创建 `build/webpack.config.js` 文件:

   ```js
   const path = require('path');
   
   module.exports = {
   
     entry: './src/main.js',
   
     output: {
   
   ​    filename: 'bundle.js',
   
   ​    path: path.resolve(__dirname, '../dist')
   
     }
   
   };
   
   
   ```

2. 修改package.json，增加npm script: `"build": "webpack --config build/webpack.config.js"`
3. 执行 `npm run build`，效果是一样的，只不过配置由自己掌控。看，dist目录生成的js文件已经叫bundle.js了

## 完成一份支持html+css+js的配置

### 支持html模板

引入 `npm i --save-dev html-webpack-plugin` [插件](https://github.com/jantimon/html-webpack-plugin)，然后再修改webpack配置：

```js
output: {...},
plugins: [
  new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.spa.html')
  }),
]
```

 在src下创建一个index.spa.html作为项目模板

**多页应用**，可以实例多个插件: 

```js
  entry: {
    'main': './src/index.js',
    'beitai': './src/index2.js',
  },
  output: {
    filename: 'js/[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.spa.html')
    }),
    new HtmlWebpackPlugin({
      multihtmlCatch: true, // 开启多入口缓存
      inject: 'body',
      filename: 'beitai.html',
      chunks: ["beitai", "vendor", "manifest"], // 每个html引用的js模块
      template: path.resolve(__dirname, '../src/index.spa.html')
    }),
  ]
}
```

此时会以index.spa.html输出两个html页面，index页面因没有指定chunks，会引入两个js，引入顺序是entry定义的顺序。beitai.html则只会引入beitai.js

### 支持css预处理器的配置

处理文件内容是需要loader的，即使原生css都不可以，毕竟js不认识css语法。一次性都装上 `npm install --save-dev style-loader css-loader sass sass-loader` ，如果不用预处理器，去掉后面sass的就可以

编写loader:

```js
  output: {...},
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ]
  },
```

创建一个style.scss文件:

```css
div {
  display: flex;
}
```

js文件引入该css

```js
import './style.scss'
console.log(111)
```

打包 `npm run build`

发现并不会多出一个css文件出来，其实没有那么智能~。从打包出来的main.js文件搜一下“flex”，css被打包进js的内容了！看页面，样式也是生效的。这个我知道！vue spa模式就这么插入的内容，但是有两个问题

不利于资源复用，flex并没有添加浏览器前缀处理兼容性问题。接下来一一解决

**添加浏览器前缀：**

- 添加 [postcss](https://webpack.js.org/loaders/postcss-loader/) `npm install -D postcss-loader postcss`。它的功能是：

> 把css解析为一个抽象语法树
> 调用插件处理抽象语法树并添加功能

- 再添加我们的老朋友 autoprefixer  `npm i -D autoprefixer` 

修改配置cssloader

```
          { loader: 'css-loader' },
          { 
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  autoprefixer: {
                    browsers: ['Android >= 4.0', 'iOS >= 7', "last 2 versions"]
                  },
                }
              }
            }
          },
```

重新打包可以看到css已经添加浏览器前缀

> 因为后续postcss需要引入的插件可能越来越多，提取一下postcss的配置到单独的文件中：`touch postcss.config.js` :
>
> ```js
> module.exports = {
>   plugins: {
>     autoprefixer: {
>       browsers: ['Android >= 4.0', 'iOS >= 7', "last 2 versions"]
>     },
>   }
> }
> 
> 修改webpack的配置，只定义postcss即可
> { loader: 'postcss-loader' },
> ```
>
> 效果是一样的

**提取css**

要用到 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) ，注意，这个loader与style-loader是冲突的，修改配置：

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取css文件,不与style-loader共存
          // 'style-loader',
          { loader: 'css-loader' },
          { 
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    })
  ]
}
```

打包后发现会提取一个main.css，且js文件也暂时干净多了

### 资源相关

修改js，引入一个图片资源进行打包:

```js
import './assets/img/avatar.jpg'
```

会发现打包失败，webpack默认只会处理js文件，像css需要css相关loader，其他文件也一样。需要用到 [file-loader](https://www.webpackjs.com/loaders/file-loader/) [url-loader](https://www.webpackjs.com/loaders/url-loader/) 这两个loader: `npm install --save-dev file-loader url-loader`

> `file-loader`  生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
>
> `url-loader` 功能类似于 [`file-loader`](https://github.com/webpack-contrib/file-loader)，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL

修改webpack配置，增加loader配置：

```js
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 限制转base64的图片为1k(1024b)，超过1k的输出文件, 设置此项需要安装依赖：file-loader
              name: 'images/[name]-[hash:8].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10k
              name: 'fonts/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
```

打包测试查看js可以正常打包静态资源。但是发现**css引入的背景图并不正常**，发现一张图会生成两个文件，图片文件和一个内容是 `export default __webpack_public_path__...` 的文件，最终发现，需要在 `css-loader` 处设置esModule为false:

```js
{ loader: 'css-loader', options: { esModule: false } },
```



### 支持js相关

js如果自己用理论上不处理都行~ 但是毕竟还是会写一些新的es语法，这时就用到 [babel](https://babeljs.io/)

先改js用来看效果:

```js
import './style.scss'
console.log(111)

document.addEventListener('click', () => {
  console.log(12580)
})

const waitTime = (delay = 300) => new Promise((resolve) => setTimeout(resolve, delay))

waitTime(4396).then(async () => {
  await waitTime(7777)
  console.log(9527)
})
```

再改webpack配置，module.rules增加一项配置：

```js
      { test: test: /\.(sa|sc|c)ss$/, ...},
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
```

打包之后搜一下 `12580`，箭头函数已经被编译为ES5语法。Promise还直愣愣在结果中，还是要单独处理。

**@babel/polyfill方式(不建议)**

`npm install --save @babel/polyfill`

修改配置:

```js
module.exports = {
  entry: {
    'main': ['@babel/polyfill', './src/index.js'],
  },
```

然后执行 `npm run build`。缺点是编译后文件会很大（300b的文件被编译成了87k!)，不管是否用到了新的语法都会添加语法垫片导致文件变大

>它的初衷是模拟（emulate）一整套 ES2015+ 运行时环境，所以它的确会以全局变量的形式 polyfill Map、Set、Promise 之类的类型，也的确会以类似 Array.prototype.includes() 的方式去注入污染原型，这也是官网中提到最适合应用级开发的 polyfill，再次提醒如果你在开发 library 的话，不推荐使用（或者说绝对不要使用）
>
>不同于插件，你所要做的事情很简单，就是将 babel-polyfill 一次性的引入到你的工程中，通常是和其他的第三方类库（如 jQuery、React 等）一同打包在 vendor.js 中即可。在你写程序的时候，你完全不会感知 babel-polyfill 的存在，如果你的浏览器已经支持 Promise，它会优先使用 native 的 Promise，如果没有的话，则会采用 polyfill 的版本（这个行为与 babel-plugin-transform-runtime 一致），在使用 babel-polyfill 后，你不需要引入 babel-plugin-transform-runtime 插件和其他依赖的类库。它的缺点也显而易见，那就是占文件空间并且无法按需定制。
>
>作者：Henry
>链接：https://www.zhihu.com/question/49382420/answer/223915243

**[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)**

polyfill很强**大**，我选择 `npm install --save-dev @babel/plugin-transform-runtime` 

> 这个插件让 Babel 发现代码中使用到 Symbol、Promise、Map 等新类型时，自动且按需进行 polyfill，因为是“自动”所以非常受大家的欢迎。

然后结合 `npm install --save @babel/runtime-corejs3 ` 。

创建babel.config.js，修改webpack配置，将babel-loader提取到该文件中:

`build/webpack.config.js`

```js
/* js */
{
  test: /\.js$/,
  use: {
  	loader: 'babel-loader'
  },
  exclude: /node_modules/
},
```

`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {}
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          'absoluteRuntime': false,
          'corejs': 3,
          'helpers': true,
          'regenerator': true
        }
      ]
    ]
  }
}
```

> 因为后续babel要做更多的事情（比如lodash）配置太多提取到单文件更容易维护

打包代码，main.js从87k精简到39k

扩展：

- [99% 开发者没弄明白的 babel 知识](https://developer.aliyun.com/article/783477)
- [Babel polyfill 常见配置对比](https://juejin.cn/post/6975556168752037919)

[**clean-webpack-plugin**](https://www.npmjs.com/package/clean-webpack-plugin)

每次代码变更，打包都会在dist生成新的文件，次数多了旧的文件会越来越多，可以用 `npm install --save-dev clean-webpack-plugin` 来清空无关文件:

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
{
    plugins: [
        ...,
        new CleanWebpackPlugin(),
    ],
}
```

