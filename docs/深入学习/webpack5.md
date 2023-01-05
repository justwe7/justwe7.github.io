# webpack5工程化

```bash
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
    filename: 'js/[name]-[fullhash:8].js',
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
              name: 'images/[name]-[fullhash:8].[ext]',
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
              name: 'fonts/[name]-[fullhash:8].[ext]'
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

**基础版：**
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
1. 首先安装babel: `npm install --save-dev @babel/core @babel/cli @babel/preset-env`
2. 在项目的根目录下创建一个命名为 babel.config.json 的配置文件（需要 v7.8.0 或更高版本）： 
  ```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1"
          },
          "useBuiltIns": "usage",
          "corejs": "3.6.5"
        }
      ]
    ]
  }
  ```
3. `npm install --save-dev babel-loader` 再改webpack配置，`build/webpack.config.js` module.rules增加一项配置：

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

打包之后搜一下 `12580`，箭头函数已经被编译为ES5语法。Promise还直愣愣在结果中，还是要单独处理，接下来要解决：

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

polyfill很强(庞)大，我选择 `npm install --save-dev @babel/plugin-transform-runtime` 

> 这个插件让 Babel 发现代码中使用到 Symbol、Promise、Map 等新类型时，自动且按需进行 polyfill，因为是“自动”所以非常受大家的欢迎。

然后结合 `npm install --save @babel/runtime-corejs3 ` 。

创建`babel.config.js`

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

**使用[polyfill-service](https://www.npmjs.com/package/polyfill-service)**

通过cdn方式引入polyfill的cdn资源，该服务会根据ua返回需要添加语法垫片的内容，缺点是webview的ua可能会误导该服务导致代码执行失败

>  使用不同的浏览器访问 https://polyfill.io/v3/polyfill.min.js 查看返回的内容

使用代码示例：

```html
<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js"></script>
```

[Polyfill.io](https://polyfill.io/v3/) 通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfill。

高级用法

[Polyfill.io](https://polyfill.io/v3/) 有一份默认捆绑列表，包括了最常见的 HTML5 中的 `document.querySelector`、`Element.classList`、ES5、ES6、ES7 中的 `Promise`、`fetch`、`Array.from` 等等。

可以通过传递 `features` 参数来自定义功能列表：

```html
<!-- 加载 Promise&fetch --><script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=Promise,fetch"></script>
<!-- 加载所有 ES5&ES6 新特性 --><script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=es5,es6,es7"></script>
```

Polyfill.io 还提供了其他 API，具体请查阅官方文档：

```html
<!-- 异步加载 -->
<script src="https://cdn.polyfill.io/v3/polyfill.min.js?callback=main" async defer></script>
<!-- 无视 UA，始终加载 -->
<script src="https://cdn.polyfill.io/v3/polyfill.js?features=modernizr:es5array|always"></script>
```

阿里提供的动态 Polyfill 服务：

```html
<script src="https://polyfill.alicdn.com/polyfill.min.js?features=Promise%2CArray.prototype.includes"></script>
```

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

## 完成对vue支持

首先安装vue，`npm i vue@2 -S` (不要问我为什么还装v2版本的，v3我想用vite)

然后安装 `npm i vue-loader@15 vue-template-compiler vue-style-loader` 

> [Vue Loader](https://vue-loader.vuejs.org/) 是一个 [webpack](https://webpack.js.org/) 的 loader，它允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件

修改html模板:

```html
<body>
  <div id="app"></div>
</body>
```

新增app.vue:

```vue
<template>
  <div id="app">
    vue app
    <button @click="handleClick">bar</button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      foo: 'vue app'
    }
  },
  methods: {
    handleClick () {
      alert(8)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#app {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
</style>

```

修改main.js:

```js
import Vue from 'vue'
import App from './app.vue'
import './style.scss'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

新增webpack配置:

```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      /* vue */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
}
```

此时vue可以正常编译，并将css、js提取。接下来引入vue-router: `npm i vue-router@3 -S`

新增&修改若干文件：

```js
// src/app.vue
<template>
  <div id="app">
    vue app
    <router-link to="/">首页</router-link>
    <router-link to="/detail">详情</router-link>
    <button @click="handleClick">bar</button>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      foo: 'vue app'
    }
  },
  methods: {
    handleClick () {
      alert(8)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#app {
  color: peru;
}
</style>

// src/index.js
import Vue from 'vue'
import App from './app.vue'
import './style.scss'
import router from './router'

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// src/views/home.vue
<template>
  <div class="home">
    页面 home
  </div>
</template>
<script type="text/ecmascript-6">
export default {}
</script>
<style lang="scss" rel="stylesheet/scss">
.home {
  height: 300px;
  background-color: yellowgreen;
}
</style>

// src/views/detail.vue
<template>
  <div class="detail">
    页面 detail
  </div>
</template>
<script type="text/ecmascript-6">
export default {}
</script>
<style lang="scss" rel="stylesheet/scss">
.detail {
  height: 300px;
  background-color: burlywood;
}
</style>

// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: () => import(/* webpackChunkName: "home" */ '../views/home.vue') },
    { path: '/detail', component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue') }
  ]
})
```

打包可以看到路由可以正常匹配了，但是会多一个类似 `bundle.js.LICENSE.txt`开源协议声明的文件，可以用 [terser](https://webpack.docschina.org/plugins/terser-webpack-plugin/) 压缩:

```js
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  ...
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          }
        }
       }),
    ]
  }
}
```

## 区分打包环境

### 配置dev环境

首先安装 [webpack-dev-server](https://webpack.js.org/api/webpack-dev-server/): `npm install --save-dev webpack-dev-server`

因为要区分开发环境和生成环境，所以单独创建一份dev需要的配置并继承之前编写的基础配置：

```js
// build/webpack.dev.js
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

module.exports = merge(baseConfig, {
  // Set the mode to development or production
  mode: 'development',
  // Control how source maps are generated
  devtool: 'inline-source-map',
  // Spin up a server for quick development
  devServer: {
    host: '127.0.0.1',
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {
    }
  },
  plugins: [
    // [webpack-dev-server] "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration. 
    //new webpack.HotModuleReplacementPlugin(), // 从 v4.0.0 开始，热模块更换默认处于启用状态，如果手动调用需要设置(devServer.hot: false)
  ],
})

/*  */
```

然后通过dev-server启动项目，有两种方式：

1. 通过指令调用，修改package.json:

   ```json
   "scripts": {
     "dev": "node build/dev-server.js",
     "dev2": "webpack serve --config build/webpack.dev.js"
   },
   ```

2. 单独创建一个启动服务的文件 `build/dev-server.js`:

   ```js
   const Webpack = require('webpack')
   const WebpackDevServer = require('webpack-dev-server')
   const webpackConfig = require('./webpack.dev.js')
   
   const compiler = Webpack(webpackConfig)
   const devServerOptions = { ...webpackConfig.devServer }
   const server = new WebpackDevServer(devServerOptions, compiler)
   
   const runServer = async () => {
     console.log('Starting server...')
     await server.start();
   };
   
   runServer()
   ```

执行 `npm run dev 或者 npm run dev2` 都可以

哦对了，如果想实现css的热更新有两种方式：

1. 在开发环境将 `mini-css-extract-plugin` 禁用:

```js
// webpack.config.js
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  plugins: [
  //  new MiniCssExtractPlugin({
  //    filename: "[name]-[fullhash:8].css",
  //  })
  ],
  module: {
    rules: [
      /* css */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // MiniCssExtractPlugin.loader, // 提取css文件,不与style-loader共存
          isProd ?
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  return path.relative(path.dirname(resourcePath), context) + "/";
                },
              },
            } :
            'style-loader', // 打包css到style标签
          { loader: 'css-loader', options: { esModule: false } },
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
      },
      ...
```

2. 将

### 顺便提取一下prod的配置

与dev环境一样，创建用于生产环境配置的 `webpack.prod.js`，把 `wepack.config.js` 中相关配置提取到prod中：

```js
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[fullhash:8].css",
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ]
  }
})
```

修改package.json: ` "build": "cross-env NODE_ENV=production webpack --config build/webpack.prod.js"`

# 优化打包
### 代码规范

#### eslint
> “保证代码的一致性和避免错误” 

团队成员的代码风格肯定会有不同，假如每个人都按自己的风格写代码。有人写分号有人不写；有人喜欢单引号有人喜欢双引号……代码可读性差。最重要的是eslint还能帮助我们检查代码，提前发现语法错误，避免到浏览器调试时才能发现

1. 安装 [eslint](https://cn.eslint.org/docs/user-guide/getting-started)及初始化

```bash
> npm i eslint
> npx eslint --init 或 npm init @eslint/config

eslint 配置问答,以下是我的选项:
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript

回车后在项目根目录会生成一个 .eslintrc.js 配置文件
```

2. 定制代码风格

   经过第一步的配置，项目会有一套基本的eslint规则。但是不太符合自己的代码习惯，接下来进行一些规则的定制：

   - 个人不喜欢 `eslint:recommended`预设的规则，[standard](*https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md*) YYDS！`npm install standard --save-dev`

   - eslint不支持最新的实验性ECMAScript标准需要 `@babel/eslint-parser`

     > ESLint的**默认解析器**和**核心规则**仅支持最新的最终 ECMAScript 标准，不支持 Babel 提供的实验性（例如新功能）和非标准（例如Flow或TypeScript类型）语法。@ babel / eslint-parser 是允许 ESLint 在由 Babel 转换的源代码上运行的解析器。

   - 自己添加一些配置,以下为个人配完之后的.eslintrc.js(遇到的一些坑，写在注释上了):

   ```js
   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true
     },
     extends: [
       'plugin:vue/essential',
       'standard' // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md#javascript-standard-style
     ],
     // parser: '@babel/eslint-parser', // vue-eslint和babel-parser二者有冲突。编译器配置在根节点会导致vue sfc模式eslint报错
     parserOptions: {
       parser: '@babel/eslint-parser',
       ecmaVersion: 12,
       sourceType: 'module',
       ecmaFeatures: {
         modules: true
       }
     },
     plugins: [
       'vue'
     ],
     rules: {
       // promise强制要求reject()抛出error【禁止】
       'prefer-promise-reject-errors': 'off',
       // vue 组件要求定义name【禁止】
       'vue/multi-word-component-names': ['off', {}],
       // 箭头函数保护符() 【作为回调必要时】https://eslint.org/docs/rules/arrow-parens#arrow-parens
       'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }]
     }
   }
   
   ```

   这篇[eslint文章](https://xieyufei.com/2021/04/25/Front-Eslint.html)介绍的挺全的 

3. 接入到webpack

   经过1.2步的配置，eslint是加入到项目中了，npm script添加一条 `"lint": "eslint --ext .js,.vue src"`，`npm run lint`校验，或者通过`"lint:fix": "eslint --ext .js,.vue src server --fix"`进行语法修复，但是对开发时不方便。这时就用到了[`eslint-webpack-plugin]`(https://www.npmjs.com/package/eslint-webpack-plugin) :

   ```js
   const ESLintPlugin = require('eslint-webpack-plugin') // 优化编译时eslint展示
   
   plugins: [
     new ESLintPlugin({
       cache: true,
       emitWarning: true,
       extensions: ['js', 'vue'],
       failOnError: false,
       fix: true
     }),
   ]
   ```
   
   个人喜欢打开fix选项，这样自动修复就不受限于编辑器的配置，且协同工作的时候，可以帮助自己去“纠正”代码习惯。同时也代替了`prettier`的强制修复功能。

#### stylelint

1. 安装

   ```bash
   // 安装stylelint
   npm install --save-dev stylelint stylelint-config-standard  // 核心功能
   
   // 添加vue，scss的插件 （使用高版本stylelint遇到了一些坑导致vue+scss校验有问题，经尝试，以下组合可用【stylelint-config-recommended-scss】）
   npm i stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard-scss -D
   
   // 添加css样式表属性排序规则（如果使用@justwe7/stylelint-order-standard可以不装，包中有依赖）
   npm install stylelint-order --save-dev
   ```

2. 创建配置文件 `touch .stylelintrc.js`（篇幅原因，节选了一部分关键代码）: 

   > stylelint-order的排序配置， [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)个人更喜欢这份配置表，但是我将配置复制到本地，方便调整。用在项目中最好自己发包(下面有写），保证规则复用

   ```js
   module.exports = {
     extends: [
       'stylelint-config-standard-scss',
       'stylelint-config-recommended-vue/scss',
       'stylelint-config-standard',
     ],
     plugins: ['stylelint-order'],
     rules: {
       // ...
       'order/properties-order': [
         [
           // 影响元素展示且一般与设计稿样式无关联
           'opacity',
           'visibility',
           'box-sizing',
           'overflow',
           'overflow-x',
           'overflow-y',
           'overflow-scrolling',
   
           'content',
           'position',
           'top',
         ],
         {
           unspecified: 'bottom',
           severity: 'warning',
         },
       ],
     },
   }
   
   ```

   以上排序规则我封装到了 [stylelint-order-standard](https://www.npmjs.com/package/@justwe7/stylelint-order-standard) ，可以直接使用以下配置：`npm i @justwe7/stylelint-order-standard -D`

   .stylelintrc.js:

   ```js
   module.exports = {
     extends: [
       'stylelint-config-standard-scss',
       'stylelint-config-recommended-vue/scss',
       'stylelint-config-standard',
       '@justwe7/stylelint-order-standard'
     ],
   }
   
   ```

   

3. webpack中配置

   和eslint一样，其实到1.2步完成已经可以进行校验了。npm script添加一条 `"lint:css": "stylelint \"src/**/*.(vue|scss|css)\""`，同样不适用开发环境，需要新增webpack插件：[stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin)

   ```js
   const StylelintPlugin = require('stylelint-webpack-plugin')
   
   plugins: [
     new StylelintPlugin({
       cache: true,
       fix: true,
       // failOnError: false,
       extensions: ['scss', 'vue', 'css']
     }),
   ]
   ```

   两个插件配置的参数挺一致的，点赞~

#### hysky

约定了代码规范，假如不遵守不如不约定，加一个precommit的校验，可以保证规范的执行。使用[husky](https://www.npmjs.com/package/husky)可以更方便的定义Git Hooks：

```bash
npm install husky --save-dev

npm set-script prepare "husky install"
npm run prepare
```

添加hook:

- Eslint的pre commit校验

  ```bash
  npx husky add .husky/pre-commit "npm run lint" 
  git add .husky/pre-commit
  ```

- stylelint的pre commit校验

  ```bash
  npx husky add .husky/pre-commit "npm run lint:css" 
  git add .husky/pre-commit
  ```

会将校验指令写入到 .husky/pre-commit 的内容中

之后进行git commit提交版本库时，会依次进行eslint和stylint的校验，假如不符合规则，流程会终止

### 美化输出

#### FriendlyErrorsPlugin

使用[friendly-errors-webpack-plugin](https://www.npmjs.com/package/@soda/friendly-errors-webpack-plugin): `npm install @soda/friendly-errors-webpack-plugin --save-dev`

新增配置

```js
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

plugins: [
  new FriendlyErrorsWebpackPlugin(), // 输出美化
]
```

效果：![imagec3641.png](https://image.littl.cn/images/2022/05/31/imagec3641.png)

配合 node-notifier 实现编译报错通知：

```js
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const notifier = require('node-notifier')

plugins: [
  new FriendlyErrorsWebpackPlugin({
    onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'webpackError - ' + error.name,
          message: error.file,
          // message: error.message
        });
      }
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additional notes to be displayed upon successful compilation']
      },
  }), // 输出美化
]
```



![image.png](https://image.littl.cn/images/2022/05/31/image.png)

#### webpackbar

这个是nuxt团队做的美化插件，个人更喜欢它的样式（虽然感觉实用性不如上一个插件）

安装 `npm i webpackbar` 

如果要同时编译多个webpack入口，可以更明显的区分样式：

```js
const WebpackBar = require('webpackbar')

plugins: [
  new WebpackBar({ name: 'client', color: 'green' }),
]
```

![imagef9362.png](https://image.littl.cn/images/2022/05/31/imagef9362.png)

### 优化打包速度

核心思路：

> 加缓存，搞并行，提前做，少执行   https://juejin.cn/post/6844903952140468232

#### thread-loader

`npm install thread-loader -D` 可以将比较耗时的loader放在一个单独的worker池中运行：

> 多进程打包，把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行

在 worker 池(worker pool)中运行的 loader 是受到限制的。例如：

- 这些 loader 不能产生新的文件。
- 这些 loader 不能使用定制的 loader API（也就是说，通过插件）。
- 这些 loader 无法获取 webpack 的选项设置。

```js
rules: [	
		{
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            // 有同样配置的 loader 会共享一个 worker 池
            options: {
              // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，. 在 require('os').cpus() 是 undefined 时回退至 1
              workers: 2,
              // 一个 worker 进程中并行执行工作的数量.默认为 20
              workerParallelJobs: 50,
              // 额外的 node.js 参数
              workerNodeArgs: ['--max-old-space-size=2048'],
              // 允许重新生成一个僵死的 work 池。这个过程会降低整体编译速度.并且开发环境应该设置为 false
              poolRespawn: false,
              // 闲置时定时删除 worker 进程。默认为 500（ms）.可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,
              // 池分配给 worker 的工作数量。默认为 200 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,
              // 池的名称.可以修改名称来创建其余选项都一样的池
              name: 'ssr-pool'
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // default cache directory in node_modules/.cache/babel-loader
            }
          }
        ],
        exclude: /node_modules/
      },
  ]
```



#### babel

- 使用编译缓存
- 使用**[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)**，抛弃polyfill，优化公共包大小，在【js相关】章节有配置方式

```js
module.exports = function (api) {
  api.cache(true) // 使用缓存
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
          absoluteRuntime: false,
          corejs: 3,
          helpers: true,
          regenerator: true
        }
      ]
    ]
  }
}

```

项目打包会在 node_modules/.cache/babel-loader 生成缓存文件

#### webpack5-cache

其实使用webpack5自带的缓存机制完全可以替代`AutoDllPlugin `和`HardSourceWebpackPlugin`且比它们更快。更重要的是比他们配置简单：

```js
module.exports = {
  cache: {
    type: 'filesystem', // 默认使用的是memory，空间换时间~使用磁盘缓存
    name: 'clientCache-'
  },
};
```

之后打包会在 node_modules/.cache/webpack 生成缓存文件

**对比**

- 未配置缓存，项目三次打包时间依次为10.73、9.34、9.4
- 配置缓存，三次打包时间分别为10.08、2.4、2.66

![](https://s2.loli.net/2022/06/25/CaLdkVjXgmucAUM.png)

![image-20220601181935175](https://s2.loli.net/2022/06/01/Pt6w4VYLgGMAqrb.png)

针对这个演示项目，使用缓存在打包速度上提升了400%

#### 其他缓存

- eslint-plugin、stylelint-plugin配置缓存

  ```js
      new ESLintPlugin({
        cache: true,
        ...
      }),
      new StylelintPlugin({
        cache: true,
        ...
      }),
  ```

  



