## 导读

本文章配合[官方Vue-SSR指南](https://v2.ssr.vuejs.org/zh/)食用更香~

官方指南有详细的SSR应用介绍及搭建教程，但按其搭建下来的应用在实际开发过程中还是有很多不完善的地方。在此文章记录一下从0开始改造SPA应用为SSR应用的过程，并期望在官方指南的基础上要完善的功能：

- 本地开发环境热更新支持
- 根据配置，支持SPA模式的渲染（便于开发调试接口）
- 服务端渲染能够兼容原本选项式API的data钩子
- SSR渲染失败自动降级为SPA渲染（优雅降级）
- 浏览器历史前进后退页面缓存的灵活控制

本文基于该 [文章](https://justwe7.github.io/blog/docs/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack5) 搭建的项目 [模板](https://github.com/justwe7/Vue-SSR/tree/vue2) 作为基础进行开发，开始前，先记录一下当前代码结构

![image.png](https://s2.loli.net/2022/08/31/yFtESxpKioYzqbZ.png)

## 基础版本实现

基础的实现代码可以参考🦑大写的demo https://github.com/vuejs/vue-hackernews-2.0 （本文是基于webpack5的，hackernews是基于webpack3的，部分api有出入的~）

### （一）vue-server-renderer 的基本用法

#### 安装依赖

```bash
npm i vue-server-renderer -S
npm i koa koa-router@7 -D
```

> vue-server-renderer 和 vue 必须匹配版本
>
> vue-server-renderer 依赖一些 Node.js 原生模块，因此只能在 Node.js 中使用

#### demo实现

创建 server/index.js:

```js
const Koa = require('koa')
const app = new Koa()
const router = new Router()
const { createBundleRenderer } = require('vue-server-renderer')

// 创建一个 renderer
const renderer = createBundleRenderer()

router.get('*', async (ctx, next) => {
  const render = async (ctx) => {
    // 创建一个 Vue 实例
    const vm = new Vue({
      data: {
        url: ctx.req.url
      },
      template: `<div>访问的 URL 是： {{ url }}</div>`
    })
    return new Promise((resolve, reject) => {
      // 将 Vue 实例渲染为 HTML
      renderer.renderToString(vm, (err, html) => {
        console.log(html)
        if (err) {
          reject(err)
          return
        }
        resolve(`
            <!DOCTYPE html>
            <html lang="en">
              <head><title>Hello</title></head>
              <body>${html}</body>
            </html>
          `)
      })
    })
  }

  try {
    const html = await render(ctx)
    ctx.type = 'html'
    ctx.body = html
  } catch (err) {
    ctx.status = 500
    ctx.body = 'Internal Server Error'
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, '127.0.0.1', () => {
  console.log('server started')
})
```

执行 `node server` 指令，然后访问 `http://localhost:3000/hello` 查看渲染后的页面，查看源码也是vue编译后直出的html页面：

![image.png](https://s2.loli.net/2022/08/31/okWBNtVm9C16EX4.png)

此时一个最简单的demo已经完成，接下来正式开始

### （二）改造webpack打包环境

#### Bundle Renderer 指引

在改造webpack之前，我们先需要知道，SSR改造成功后，前端的页面并不只是单纯的静态文件了，需要使用诸如`express`之类的服务输出前端内容，第一章的 demo 中可以看到需要使用如下方式输出页面内容：

```js
const renderer = require('vue-server-renderer').createRenderer()
renderer.renderToString({
  //...
})
```

改造后，webpack的打包产物会有两个json文件 `vue-ssr-server-bundle.json` 和 `vue-ssr-client-manifest.json`：

![image.png](https://s2.loli.net/2022/08/31/Ef3cYSbe6V2vDJq.png)

[浅谈Vue SSR中的Bundle](https://juejin.cn/post/6844904001285144589#heading-0)，有了它们，可以让服务端和客户端更好的融合，[Bundle Renderer](https://v2.ssr.vuejs.org/zh/guide/bundle-renderer.html)：

- 内置的 source map 支持（在 webpack 配置中使用 `devtool: 'source-map'`）
- 在开发环境甚至部署过程中热重载（通过读取更新后的 bundle，然后重新创建 renderer 实例）
- 关键 CSS(critical CSS) 注入（在使用 `*.vue` 文件时）：自动内联在渲染过程中用到的组件所需的CSS。更多细节请查看 [CSS](https://v2.ssr.vuejs.org/zh/guide/css.html) 章节。
- 使用 [clientManifest](https://v2.ssr.vuejs.org/zh/api/#clientmanifest) 进行资源注入：自动推断出最佳的预加载(preload)和预取(prefetch)指令，以及初始渲染所需的代码分割 chunk

最重要的是有了它，在开发环境可以支持热更新，提高工作效率

#### 根据渲染模式区分打包入口

根据官方指南的描述：

> 当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享

简单来说，平时写vue项目的时候，main.js初始化vue的时候是立即执行的，即: `new Vue({...})`，这样每个用户都是独立的环境，执行在浏览器中也不会有问题。但是如果是服务端渲染，如果还是要立即执行，因为页面内容是服务器渲染后输出到客户端的，所有访问者都共用服务端的同一个`new Vue({...})`实例，这样肯定会造成交叉请求状态污染 (cross-request state pollution)，所以要**为每个请求创建一个新的根 Vue 实例**，即改造为`function render () { new Vue({...}) }`，每位用户请求都会调用render：

![image.png](https://s2.loli.net/2022/08/31/ReyS9HmBbsIEgfx.png)

所以改造第一步要将 `src/index.js` 拆分为三个文件

```js
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```

具体实现查阅 [源码结构/使用-webpack-的源码结构](https://v2.ssr.vuejs.org/zh/guide/structure.html#%E4%BD%BF%E7%94%A8-webpack-%E7%9A%84%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84) 即可，就不再CV增加文章篇幅了

#### 根据环境区分webpack构建配置

既然打包入口已经拆分为浏览器和服务器两个不同入口，webpack也需要进行拆分打包。需要改造核心点有：

- 修改webpack.entry，服务端和浏览器分别使用 `entry-server.js` 和 `entry-client.js`，配置文件也暂时不区分dev和prod，改为 **webpack.server.js** 和 **webpack.client.js** 还有通用配置 **webpack.config.js**
- 服务端和浏览器的webpack配置分别需要添加生成ssr-bundle.json的插件  `vue-server-renderer/server-plugin`和`vue-server-renderer/client-plugin`
- 服务端和客户端也需要区分不同的[html模板](https://v2.ssr.vuejs.org/zh/guide/#%E4%BD%BF%E7%94%A8%E4%B8%80%E4%B8%AA%E9%A1%B5%E9%9D%A2%E6%A8%A1%E6%9D%BF)，`index.ssr.html` 和 `index.spa.html`

改造后的配置如下（仅保留了关键代码，全部代码查看项目文件）：

```js
// webpack.config.js 
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('./utils')

const isProd = process.env.NODE_ENV === 'production'
const IN_SERVER = process.env.APP_RENDER === 'server'

const config = {
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': resolve('../src')
    },
    extensions: ['.js', '.vue'],
    symlinks: false, // 项目不使用 symlinks（例如 npm link ）减少解析工作量
  },
  module: {
    rules: [
      /* css */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
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
      /* js */
      // 其他配置...
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}

module.exports = config

```

```js
// webpack.server.js
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const { resolve } = require('./utils')

const isProd = process.env.NODE_ENV === 'production'
const baseConfig = require('./webpack.config.js')

// 【css使用 vue-style-loader】
baseConfig.module.rules[0].use[0] = 'vue-style-loader'

module.exports = merge(baseConfig, {
  target: 'node',
  node: undefined, // mock数据 保证使用 node 中全局变量 是否要处理
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // 外部化依赖
  entry: {
    app: resolve('../src/entry-server.js') // 【修改entry】
  },
  output: {
    path: resolve('../dist'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2' // 使用 node 模块化机制导出
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TARGET_ENV': '"server"',
    }),
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: resolve('../public/index.ssr.html')
    })
    // 其他配置...
  ]
})

```

```js
// webpack.client.js
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { resolve } = require('./utils')

const isProd = process.env.NODE_ENV === 'production'
const baseConfig = require('./webpack.config.js')

module.exports = merge(baseConfig, {
  entry: {
    app: resolve('../src/entry-client.js'),
  },
  output: {
    publicPath: '/',
    filename: 'js/[name]-[fullhash:8].js',
    path: resolve('../dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TARGET_ENV': '"client"',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[fullhash:8].css',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.spa.html',
      template: resolve('../public/index.spa.html')
    }),
    new VueSSRClientPlugin(),
    // 其他配置...
  ],
})

```

代码主要的改动在上方的代码片段已经体现，其中需要额外说明的几个点：

- **webpack.server.js** 有一个 `webpack-node-externals` 的引用，需要额外安装。它的作用是外部化node_moudules的依赖，不将其代码打包入最终产物，[webpack-node-externals深入理解](https://segmentfault.com/a/1190000012113011)有比较详细的介绍。
- css-loader部分，因为浏览器端最好能将css提取出单独的文件方便上CDN，所以使用 `mini-css-extract-plugin`，而服务端仅需要将内容整体输出即可，所以单独处理使用 `vue-style-loader`
- 使用`webpack.DefinePlugin`在服务端和浏览器端分别诸如不同的`process.env.TARGET_ENV`环境变量，方便在后面编写工具方法时候区分运行环境

#### 新增npm script进行打包

安装 `concurrently` 和 `cross-env`

```js
    "build": "concurrently \"npm run build:client\" \"npm run build:server\"",
    "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.js",
    "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.js",
```

**下一章-Vue代码改造完后**，执行 `npm run build` 会看到打包后的产物（现在还不能打包）

![image.png](https://s2.loli.net/2022/08/31/Ef3cYSbe6V2vDJq.png)

### （三）改造Vue代码

改造前，Vue源码结构应该时指南所介绍的  [源码结构/使用-webpack-的源码结构](https://v2.ssr.vuejs.org/zh/guide/structure.html#%E4%BD%BF%E7%94%A8-webpack-%E7%9A%84%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84) 

#### 路由处理

第一章koa服务路由匹配规则使用的是`*`，说明路由交由前端控制，这个时候我们用到`vue-router`

```js
router.get('*', async (ctx, next) => { ... })
```

第二章说过vue要区分服务端和浏览器端入口进行打包，所以router需要改造为工厂模式，服务端渲染时才进行调用，浏览器端立即调用，详细介绍还是参看 [路由与代码分割](https://v2.ssr.vuejs.org/zh/guide/routing.html#%E4%BD%BF%E7%94%A8-vue-router-%E7%9A%84%E8%B7%AF%E7%94%B1)

#### 数据处理

##### 数据融合

所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程

1. 数据传递

   假如用户请求了 /home， 服务端渲染输出html给到浏览器，用户在页面上进行数据操作，其实还是需要用到数据，所以数据应该在视图层之外：

>在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，**那么在开始渲染过程之前，需要先预取和解析好这些数据**。

>  另一个需要关注的问题是在客户端，在挂载 (mount) 到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败。

​       官方建议使用vuex进行数据存储与融合，改造方式大体和router差不多，不赘述了~ 看[数据预取和状态/数据预取存储容器](https://v2.ssr.vuejs.org/zh/guide/data.html#%E6%95%B0%E6%8D%AE%E9%A2%84%E5%8F%96%E5%AD%98%E5%82%A8%E5%AE%B9%E5%99%A8-data-store)

2. 将已渲染的html与数据融合

   由于服务器已经渲染好了 HTML，我们显然无需将其丢弃再重新创建所有的 DOM 元素。相反，我们需要"激活"这些静态的 HTML，然后使他们成为动态的（能够响应后续的数据变化）

   >  服务端返回的html标签挂载的根节点会添加一个`data-server-rendered`属性，让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载

   ```html
   <div id="app" data-server-rendered="true">
   ```

   >  在没有 `data-server-rendered` 属性的元素上，还可以向 `$mount` 函数的 `hydrating` 参数位置传入 `true`，来强制使用激活模式(hydration)：

   ```js
   // 强制使用应用程序的激活模式
   app.$mount('#app', true)
   ```

   > 在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树 (virtual DOM tree)，是否与从服务器渲染的 DOM 结构 (DOM structure) 匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。**在生产模式下，此检测会被跳过，以避免性能损耗**

##### asyncData

动态页面肯定会调用接口，SSR的应用应该如何进行接口调用？

指南为我们提供了一个思路，[带有逻辑配置的组件](https://v2.ssr.vuejs.org/zh/guide/data.html#%E5%B8%A6%E6%9C%89%E9%80%BB%E8%BE%91%E9%85%8D%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6-logic-collocation-with-components)内新增钩子asyncData。

在[服务端](https://v2.ssr.vuejs.org/zh/guide/data.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%95%B0%E6%8D%AE%E9%A2%84%E5%8F%96-server-data-fetching)和[浏览器端](https://v2.ssr.vuejs.org/zh/guide/data.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%95%B0%E6%8D%AE%E9%A2%84%E5%8F%96-client-data-fetching)的vue-router的路由守卫中分别处理并执行钩子函数，最终将产生的数据通过store进行数据融合。

>  本章描述的比较粗略，仅说明了用意，主要原因是官方指南已经介绍很清楚了~

此时执行 `npm run build`打包，会看到产物：

![image.png](https://s2.loli.net/2022/08/31/Ef3cYSbe6V2vDJq.png)

### （四）启动SSR应用

webpack打包改造完成后，针对生产环境部署打包已经“能用”了，接下来写一下基于 koa 的后台服务，将打包产物进行服务端部署

修改 `server/index.js`:

```js
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()
const router = new Router()
const serve = path => koaStatic(path, {
  maxAge: 1000 * 60 * 60 * 24 * 30
})
const resolve = file => require('path').resolve(__dirname, file)
const bundle = require('../dist/vue-ssr-server-bundle.json') // 用于服务端渲染的渲染数据
const clientManifest = require('../dist/vue-ssr-client-manifest.json') // 用于客户端的渲染数据

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync('./public/index.ssr.html', 'utf-8'),
  clientManifest
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
        return
      }
      resolve(html)
    })
  })
}

/* 定义静态目录，否则会导致所有文件都通过vue-router来查找 */
app.use(serve(resolve(__dirname, '../dist')))

router.get('*', async (ctx, next) => {
  const context = {
    url: ctx.req.url,
    title: '上下文title',
    tag: `<div>SSR插入的标签</div>`
  }

  try {
    const html = await renderToString(context)
    ctx.type = 'html'
    ctx.body = html
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = 'Internal Server Error'
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)

```

之后执行 `node server` 访问 `http://127.0.0.1:3000` 可以看到打包后的效果了

指南还介绍了如何[使用缓存](https://v2.ssr.vuejs.org/zh/guide/caching.html#%E9%A1%B5%E9%9D%A2%E7%BA%A7%E5%88%AB%E7%BC%93%E5%AD%98-page-level-caching)，减少服务端渲染的响应时间（使用LRU模块）

## 针对基础版进行优化

### 搭建开发环境

#### 实现思路

前面已经实现生产环境的打包，但是开发环境应该如何处理？

按之前项目的webpack配置，区分为 `webpack.dev.js` 和 `webpack.prod.js`。现在是按打包目标区分 `webpack.sever.js`和 `webpack.client.js`，难道要再拆一下环境，分四个 `server.dev.js、server.prod.js、client.dev.js、client.prod.js`?😂 并不是，webpack的配置还按之前的做区分，只不过开发环境的服务要用到前面启动的`Koa`，在其生产环境的基础上，衍生出一套开发环境

**`webpack-dev-server` VS `webpack-hot-middleware & webpack-dev-middleware`**

想要实现的功能:

- 运行http服务，能够在浏览器中访问

- 热更新

  > `Hot Module Replacement`，简称`HMR`，无需完全刷新整个页面的同时，更新模块。`HMR`的好处，在日常开发工作中体会颇深：**节省宝贵的开发时间、提升开发体验**。

启动http服务用`Koa`就好了，如何实现热更新呢

之前的项目开发环境大多都是使用 `webpack-dev-server` 一把梭的，但是如何将其与 `Koa` 服务结合起来？这个时候就用到 webpack-hot-middleware 和 webpack-dev-middleware 这两个中间件了

`webpack-dev-middleware`:

- 让webpack以watch模式编译
- 并将文件系统改为内存文件系统，不会把打包后的资源写入磁盘而是在内存中处理
- 中间件负责将编译的文件返回

`webpack-hot-middleware`：

- 提供浏览器和 Webpack 服务器之间的通信机制、且在浏览器端订阅并接收 Webpack 服务器端的更新变化，然后使用webpack的HMR API执行这些更改

首先需要了解热更新的原理。可以简单看下这篇 [轻松理解webpack热更新原理](https://juejin.cn/post/6844904008432222215)，然后咱们需要自行实现一套热更新的系统（[从零实现webpack热更新HMR](https://juejin.cn/post/6844904020528594957))，现在可以大概有个思路了，借用下图片: 

![image.png](https://s2.loli.net/2022/09/01/cDH2jvrMVlFOf4L.png)

直接开始吧~

#### 热更新模块

新增 npm script: `"dev": "cross-env NODE_ENV=development node server"`用于开发环境的启动

创建 `build/setup-dev-server.js`，用于编译系统文件处理及热更新:

```js
const Webpack = require('webpack')
const fs = require('fs')
const MFS = require('memory-fs') // 从内存读取文件
const chokidar = require('chokidar')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const serverConfig = require('./webpack.server')
const clientConfig = require('./webpack.client')
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}
const middleware = (doIt, req, res) => {
  const { end: originalEnd } = res
  return new Promise(resolve => {
    res.end = function end () {
      originalEnd.apply(this, arguments)
      resolve(0)
    }
    doIt(req, res, () => {
      resolve(1)
    })
  })
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware 客户端注入热更新模块
  // https://github.com/webpack-contrib/webpack-hot-middleware/tree/master/example
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    // new ErrorOverlayPlugin()
  )

  // dev middleware
  const clientCompiler = Webpack(clientConfig)
  const koaWebpackDevMiddleware = (compiler, option) => {
    const doIt = webpackDevMiddleware(compiler, option)

    async function koaMiddleware(ctx, next) {
      const { req } = ctx
      const locals = ctx.locals || ctx.state

      ctx.webpack = doIt

      const runNext = await middleware(doIt, req, {
        end(content) {
          ctx.body = content
        },
        locals,
        setHeader() {
          ctx.set.apply(ctx, arguments)
        }
      })

      if (runNext) {
        await next()
      }
    }

    Object.keys(doIt).forEach(p => {
      koaMiddleware[p] = doIt[p]
    })

    return koaMiddleware
  }
  const devMiddleware = koaWebpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: 'errors-only'
  })
  app.use(devMiddleware)
  clientCompiler.hooks.done.tap('done', stats => {
    stats = stats.toJson()
    if (stats.errors.length) {
      // stats.errors.forEach(err => console.error(err))
      // stats.warnings.forEach(err => console.warn(err))
      return
    }

    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json',
      clientConfig.output.path
    ))
    update()
  })

  const koaWebpackHotMiddleware = (compiler, option) => {
    const doIt = webpackHotMiddleware(compiler, option)
    return async function (ctx, next) {
      const { req, res } = ctx
      const runNext = await middleware(doIt, req, res)
      if (runNext) {
        await next()
      }
    }
  }
  // hot middleware
  app.use(koaWebpackHotMiddleware(clientCompiler, { heartbeat: 5000/* , log: false */ }))

  // watch and update server renderer
  const serverCompiler = Webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    // stats为编译过的文件
    if (stats.errors.length) return
    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json', clientConfig.output.path))
    update()
  })

  return { readyPromise, fs: devMiddleware.fileSystem }
}

```

- 函数内部定义了`update`方法，代码更新后会调用该方法。update内部又接收了cb回调函数，用于与稍后要改造的`server/index.js`创建的http服务进行通信，通知其状态变更(没错，又是`vue-server-renderer`)
- 56行开始，修改 `webpack.client` 的 entry，添加 `webpack-hot-middleware/client` 用于建立浏览器热更新的通道；修改output的name，避免使用hash
- 与浏览器端的热更新不同，服务端的热更新其实修改的是 `vue-ssr-server-bundle.json`。`135行`服务端编译，文件系统使用了 `memory-fs` 模块，使用内存中进行文件读写，同时也在webpack的钩子中进行文件变更的监听来调用`update`

#### 热更新与服务端的结合

`server/index.js`:

```js
const fs = require('fs')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const Koa = require('koa')
const resolve = file => require('path').resolve(__dirname, file)

const app = new Koa()
const router = new Router()
const isProd = process.env.NODE_ENV === 'production'

/* --- SSR --- */
let templatePath // 渲染的html模板
let renderer // createBundleRenderer() 创建的实例
let readyPromise // 开发环境，等待服务启动的异步标识
let devFs // 开发环境，虚拟内存系统
const HTML_404 = fs.readFileSync(resolve('../public/404.html'), 'utf-8') // 404页面模板
// const HTML_ERROR = fs.readFileSync(resolve('../public/error.html'), 'utf-8') // 服务端异常模板

/* 通用-用于创建 vue-server-renderer/createBundleRenderer 的实例 */
const createRenderer = (serverBundle, options) => {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(serverBundle, Object.assign(options, {
    basedir: resolve('../dist'),
    runInNewContext: false
  }))
}

/* 使用 renderer 生成页面string */
const renderHandler = async (ctx) => {
  ctx.tag = `<div>SSR插入: ${ctx.request.header.host}${ctx.request.url}</div>`
  // ctx.foo = 111 // 可以将变量挂载至ctx上下文供vue相关代码获取
  const siteConfig = {
    enableCache: !true // 启用SSR缓存（期望将静态页缓存直接返回）
  }
  ctx.siteConfig = siteConfig
  // 使用 server-render 生成页面
  return renderer.renderToString(ctx)
}

/* ssr渲染错误处理 */
const errorHandler = async (err, ctx) => {
  // renderCSRHtml(ctx, devFs)
  const code = err && err.code
  switch (code) {
    // 处理页面返回的重定向
    case 301:
    case 302:
      if (!err.url) {
        ctx.status = 404
        ctx.type = 'html'
        ctx.body = HTML_404
      } else {
        ctx.status = code || 302
        ctx.redirect(err.url)
      }
      break
    case 304:
      ctx.status = 200 // entry-server.js 返回的http状态码304，仅用来标识用于处理LRU缓存，并非真实的缓存
      ctx.set({
        'ssr-cache': '1'
      })
      ctx.type = 'html'
      if (err.body) {
        ctx.body = err.body
      } else {
        renderCSRHtml(ctx, devFs)
      }
      break
    case 404:
      ctx.status = 404
      ctx.type = 'html'
      ctx.body = HTML_404
      break
    default:
      // TODO 渲染异常返回客户端spa模板
      // ctx.status = code || 500
      // ctx.body = HTML_ERROR
      renderCSRHtml(ctx, devFs)
      break
  }
}

/* 输出spa页面模板（区分开发/生产） */
const renderCSRHtml = (ctx, devFs) => {
  ctx.type = 'html'
  if (isProd) {
    ctx.body = fs.readFileSync(resolve('../dist/index.spa.html'), 'utf-8')
  } else {
    const spaHtmlBuffer = devFs.readFileSync(resolve('../dist/index.spa.html'))
    ctx.body = spaHtmlBuffer
  }
}

if (isProd) {
  templatePath = resolve('../public/index.ssr.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  const serverBundle = require(resolve('../dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'))
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  renderer = createRenderer(serverBundle, {
    template,
    clientManifest,
    inject: false // 手动资源注入(css、js..) https://ssr.vuejs.org/zh/guide/build-config.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE-client-config
  })
/* 开发 */
} else {
  templatePath = resolve('../public/index.ssr.html')
  const setupDevServer = require(resolve('../build/setup-dev-server'))(
    app,
    templatePath,
    (bundle, options) => {
      options.inject = false
      renderer = createRenderer(bundle, options)
    }
  )
  readyPromise = setupDevServer.readyPromise
  devFs = setupDevServer.fs
}

router.get('*', async (ctx, next) => {
  try {
    /* 主动降级为SPA渲染 */
    if (ctx._downgrade) {
      ctx.status = 200
      renderCSRHtml(ctx, devFs)
      return
    }
    if (!isProd) {
      await readyPromise
    }
    const html = await renderHandler(ctx)
    ctx.type = 'html'
    ctx.body = html
  } catch (err) {
    // console.log('render-error:', err)
    errorHandler(err, ctx)
  }
})

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, '127.0.0.1', () => {
  console.log('server started')
})

```

有了前面热更新模块的铺垫，这块改造也没有太多需要说的。主要改造点：区分开发生产环境、开发环境服务端使用`setup-dev-server.js`定义的虚拟内存

修改完成后，`npm run dev`即可访问SSR服务，修改代码，浏览器热更新及刷新页面重新请求服务端bundle也是实时更新的，并不需要重新启动服务。开发环境的基础搭建也算是完成了

### 如何强制SPA模式渲染

SSR虽好，但是开发环境与后端接口联调的时候接口总不能在node的console中查看吧，这个时候就可以用到`webpack.client.js`的打包产物了（其实就是返回spa的静态资源）

思路大概就是假如请求的query中携带指定的参数，我用到的是 `downgrade=1`，`Koa`服务中即响应`index.spa.html`模板及打包后的静态资源。

在`server`目录下编写一个`Koa`的中间件，在上下文中添加一个变量标记：

```js
module.exports = function () {
  return async function (ctx, next) {
    // query 中携带 ?downgrade=1 主动降级为客户端渲染
    if (ctx.query.downgrade === '1') {
      ctx._downgrade = true
    }
    await next()
  }
}
```

然后在 `server/index.js`路由解析中获取到该标记，即返回`client`产物:

```js
/* 输出spa页面模板（区分开发/生产） */
const renderCSRHtml = (ctx, devFs) => {
  ctx.type = 'html'
  if (isProd) {
    ctx.body = fs.readFileSync(resolve('../dist/index.spa.html'), 'utf-8')
  } else {
    const spaHtmlBuffer = devFs.readFileSync(resolve('../dist/index.spa.html'))
    ctx.body = spaHtmlBuffer
  }
}

router.get('*', async (ctx, next) => {
  /* 主动降级为SPA渲染 */
  if (ctx._downgrade) {
    ctx.status = 200
    renderCSRHtml(ctx, devFs)
    return
  }
  // ...
}
```

这个时候访问`http://localhost:3000/home?downgrade=1`在浏览器端可以看到请求的接口，看页面源码:

![image.png](https://s2.loli.net/2022/09/01/8F3fpalt9wZhgNu.png)

### 更好用的asyncData

在官方指南中，异步数据的获取依赖vuex：在vue实例中注册静态方法asyncData，提供给服务器端进行调用，该方法的作用即调用store中的action方法，调取接口获得数据。那代码都这样写，感觉挺不舒服的。

如果在asyncData中可以定义响应式的data，且可以自行编写异步接口请求并处理响应数据输出到页面中那就方便多了：

```js
async asyncData ({ store, myAddData, errorHandler, urlRedirect }) {
  const res = await axios.get('https://api-puce-rho.vercel.app/api/mp-data')
  return {
    foo: 1,
    list: get(res, 'data', [])
  }
},
```

可以在钩子守卫中将`asyncData`promise化，然后将其返回的结果与data钩子定义的数据进行合并，注入到页面的data中，封装以下方法：

```js
/**
 * 组件data函数重写，数据混合
 * @param {Function} Component | 组件构造函数
 * @param {Object} asyncData | 需要混合的数据对象
 */
export function applyAsyncData (Component, asyncData) {
  const ComponentData = Component.options.data || noopData
  // Prevent calling this method for each request on SSR context
  if (!asyncData && Component.options.hasAsyncData) {
    return
  }
  Component.options.hasAsyncData = true
  Component.options.data = function () {
    const data = ComponentData.call(this)
    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid]
    }
    return { ...data, ...asyncData }
  }
  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data
  }
}

/**
 * 执行匹配组件中的asyncData函数，并且和组件的data函数融合
 * @param {Object} Components 路由记录(非组件构造函数)
 * @param {Object} store
 * @param {Object} router
 * @param {Function} errorHandler
 */
export function asyncComponents ({
  Components,
  store,
  route,
  errorHandler,
  urlLocation,
  ...restParams
}) {
  return Promise.all(
    Components.map((Component) => {
      Component = sanitizeComponent(Component)
      if (
        Component.options.asyncData &&
        typeof Component.options.asyncData === 'function'
      ) {
        return promisify(Component.options.asyncData, {
          store,
          route,
          urlLocation,
          errorHandler,
          ...restParams
        }).then((asyncDataResult = {}) => {
          applyAsyncData(Component, asyncDataResult)
          return asyncDataResult
        })
      }
      return null
    })
  )
}
```

改造服务端的路由守卫`entry-server.js`:

```js
export default (context) => {
  // ...
  return new Promise((resolve, reject) => {
    // ...
    router.onReady(() => {
      // ...
      Promise.all(
        matchedComponents.map((Component) => {
          Component = sanitizeComponent(Component) // 净化组件options

          if (
            Component.options.asyncData &&
            typeof Component.options.asyncData === 'function'
          ) {
            context.cacheAsyncDataHook = true // asyncData 标记，用于区分缓存
            /* 将组件定义的asyncData promise化 */
            return promisify(Component.options.asyncData, {
              store,
              route: router.currentRoute,
              context,
              urlRedirect: urlRedirect(context),
              errorHandler,
              myAddData: 'server-add'
            }).then((asyncDataResult = {}) => {
              context.asyncData[Component.cid] = asyncDataResult
              applyAsyncData(Component) // 将asyncData结果与data混合
              return asyncDataResult
            })
          }
          return null
        })
      )
        .then((asyncDataList) => {
          // 通过renderState()注入到window中，通过window.__SSR__获取
          context.SSR_KEY = {
            ssr: true, // 将ssr标记为true，客户端融合判断
            state: store.state,
            asyncDataList // 将asyncData的结果注入到上下文中供客户端融合时获取
          }
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
```

改造浏览器端的路由守卫`entry-client.js`：

```js
// ...
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        urlRedirect: urlRedirect(),
        errorHandler
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态：
if (window.__SSR__) {
  // 通过renderState方法将__INITIAL_STATE__替换为了__SSR__
  // store.replaceState(window.__SSR__)
  const { state } = window.__SSR__
  state && store.replaceState(state)
  // state.route = store.state.route // hack实现，否则在replaceState时候会进行pushState操作从而丢弃掉hash值
}

router.onReady(async () => {
  /* SPA与SSR数据融合操作 */
  if (window.__SSR__ && window.__SSR__.ssr) {
    const path = getLocation(router.options.base, router.options.mode)
    const Components = router.getMatchedComponents(router.match(path))
    Components.forEach((c, index) => {
      const asyncDataResult =
        window.__SSR__.asyncDataList && window.__SSR__.asyncDataList[index]
      applyAsyncData(sanitizeComponent(c), asyncDataResult)
    })
    /* 如果是客户端渲染 */
  } else {
    console.warn('客户端渲染')
    const path = getLocation(router.options.base, router.options.mode)
    const Components = router.getMatchedComponents(router.match(path))
    await asyncComponents({
      Components,
      store,
      myAddData: 'client-add-downgrade',
      urlRedirect: urlRedirect(),
      route: router.currentRoute,
      errorHandler
    })
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {})
  }

  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    /* 同path且页面组件已被缓存则直接跳出 */
    if (location.pathname === to.path && checkAsyncDoneAndCached(to)) {
      next()
      return
    }

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    if (!activated.length) {
      return next()
    }

    // 如果是页面参数变化，则activated匹配为空数组，该情况下移步beforeRouterUpdate钩子处理混合
    // 客户端接管状态下asyncData混合
    asyncComponents({
      Components: activated,
      store,
      route: to,
      myAddData: 'client-add',
      urlRedirect: urlRedirect(),
      errorHandler
    })
      .then(() => {
        next()
      })
      .catch((e) => {
        console.error(e)
        next(e)
      })
  })

  app.$mount('#app')
})

```

在浏览器的钩子守卫中要做两件事。除了做服务端同样的数据混合处理，还需要将服务端渲染的asyncData结果混入到客户端中，服务端渲染时会通过*renderState*注入到window数据，然后浏览器端获取并进行处理，就可以避免服务端的asyncData处理过的数据，到浏览器渲染时再去处理一遍了（*SPA与SSR数据融合操作*）

> 服务端 context 包含了 req, res, userInfo 等信息，客户端的 asyncData 中的 context 为 undefined，若要在 created 钩子中访问 context，可使用 this.$ssrContext（这是 vue 自动注入的对象）

### SSR渲染失败自动降级为SPA渲染

1. 假如有粗心的同事在asyncData钩子中使用了`window`，在服务端渲染时一定是异常代码，如果能遇到这种错误时自动降级为SPA模式就能保证用户至少不会访问异常

2. 假如在asyncData接口请求失败，服务端渲染会失败，如果能自动降级为客户端渲染，至少可以保证用户访问到接口请求之外的页面内容

第一个问题可以在`Koa`服务路由处理时，在catch中直接返回SPA的打包成果:

```js
// server/index.js

/* ssr渲染错误处理 */
const errorHandler = async (err, ctx) => {
  const code = err && err.code // code在vue代码中可以控制
  switch (code) {
    // 处理页面返回的重定向
    case 301:
    case 302:
      if (!err.url) {
        ctx.status = 404
        ctx.type = 'html'
        ctx.body = HTML_404
      } else {
        ctx.status = code || 302
        ctx.redirect(err.url)
      }
      break
    case 304:
      ctx.status = 200 // entry-server.js 返回的http状态码304，仅用来标识用于处理LRU缓存，并非真实的缓存
      ctx.set({
        'ssr-cache': '1'
      })
      ctx.type = 'html'
      if (err.body) {
        ctx.body = err.body
      } else {
        renderCSRHtml(ctx, devFs)
      }
      break
    case 404:
      ctx.status = 404
      ctx.type = 'html'
      ctx.body = HTML_404
      break
    default:
      renderCSRHtml(ctx, devFs)
      break
  }
}

router.get('*', async (ctx, next) => {
  try {
    /* 主动降级为SPA渲染 */
    if (ctx._downgrade) {
      ctx.status = 200
      renderCSRHtml(ctx, devFs)
      return
    }
    if (!isProd) {
      await readyPromise
    }
    const html = await renderHandler(ctx)
    ctx.type = 'html'
    ctx.body = html
  } catch (err) {
    // console.log('render-error:', err)
    errorHandler(err, ctx)
  }
})

```

第二个问题可以在`entry-server.js`和`entry-client.js`的路由守卫中注入方法，假如接口请求报错则调用该方法:

```js
/**
 * 供 asyncData 使用的异常捕获函数
 * @param {Error} err asyncData 钩子抛出的异常
 */
export function errorHandler (err) {
  // 服务端抛出异常并中断后续流程，直接降级为客户端渲染
  if (isServer) {
    throw err
  } else {
    console.error(err)
  }
}
```



