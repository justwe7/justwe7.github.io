# Webpack 面试知识整理

> 本文按知识依赖关系重新组织：先讲 Webpack 要解决什么问题，再讲构建流程本身，然后是 Loader/Plugin 如何在这条流程上扩展能力，最后是速度与产物优化。配置项不追求列全，只记典型场景和它在构建生命周期里生效的位置——面试时说清楚"这个配置解决什么问题、在哪个阶段生效"，比背参数列表更经得起追问。

## 复习建议

- 先掌握"模块为什么需要打包 → Webpack 如何构建 → Loader/Plugin 如何扩展"这条主线，再复习 HMR 与性能优化。
- 面试回答避免只背配置，说清楚配置在构建生命周期的哪个阶段生效、解决什么问题。
- 优先复习五星和四星模块；配置项只记典型场景，不必死记全部参数。

## 一、Webpack 是什么：模块打包器解决的问题

早期页面通过多个 `<script>` 标签加载脚本，脚本之间没有天然的模块边界：变量容易互相污染全局作用域，脚本的加载顺序要手动保证，CSS 预处理器、图片这类非 JavaScript 资源也没有统一的方式接入这套加载体系。

> 面试回答：
>
> Webpack 是一个模块打包器（module bundler）。它以模块依赖图为核心：从一个或多个入口出发，递归分析 `import`、`export`、`require` 等依赖关系，把 CSS、图片等非 JavaScript 资源也转换成模块纳入同一张依赖图，再按规则做转换、拆分、优化，最终输出浏览器可以直接加载的 JavaScript、CSS、静态资源和 HTML。

### 核心术语

| 术语 | 含义 | 面试要点 |
| --- | --- | --- |
| `entry` | 构建依赖图的起点 | 可以是单入口、多入口，也可以写成对象形式分别命名 |
| `module` | 依赖图中的一个资源 | 不只是 `.js`，CSS、图片等经过 Loader 转换后同样是模块 |
| `chunk` | Webpack 构建过程中的代码块 | 入口、动态导入、代码分割都可能各自生成 chunk |
| `asset` | 最终输出到磁盘的文件 | 如 `.js`、`.css`、图片等 |
| `bundle` | 通常指打包后的 JS 文件 | 日常语境里常泛指最终构建产物，不严格区分 |

### 最小化 Webpack 5 配置

```js
const path = require('node:path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
}
```

`mode` 会提供一套合理的默认优化策略（比如 `production` 下自动开启压缩），但它不能替代业务实际需要的 Loader、Plugin 与 `optimization` 精细配置。

## 二、构建生命周期：Compiler、Compilation 与依赖图

### 一句话理解

Webpack 先根据配置创建一个全局的 `Compiler`，每次触发构建时再创建一次对应的 `Compilation`；它从入口开始递归构建模块依赖图，完成代码生成、分 chunk、生成 assets，最后写入输出目录。

### 构建主流程

1. 读取 `webpack.config.js` 与命令行参数，创建全局唯一的 `Compiler`。
2. `Compiler` 触发 `run`、`compile` 等生命周期钩子，并在每次构建时创建一个新的 `Compilation`。
3. 从 `entry` 开始解析模块请求，`NormalModuleFactory` 创建对应的模块实例。
4. 读取资源内容，按从右到左的顺序执行匹配到的 Loader 链，把内容转换成 Webpack 可以继续分析的 JavaScript 模块。
5. 解析这个模块声明的依赖，递归重复上面的过程，逐步形成完整的模块依赖图。
6. `seal` 阶段根据入口、动态导入和优化策略生成 chunks，进行模块 ID 分配、代码分割、压缩等处理。
7. 生成 assets，触发 `emit` 钩子，把文件写入 `output.path`；监听模式下会继续等待下一次文件变更，重复这个流程。

### Compiler 与 Compilation 的区别

| 对象 | 生命周期 | 职责 |
| --- | --- | --- |
| `Compiler` | 一次 Webpack 启动期间通常只有一个 | 保存全局配置、注册各类钩子、发起或监听构建 |
| `Compilation` | 每次构建都会新建一个 | 保存本轮构建的模块、依赖、chunks、assets 与错误信息 |

一个实用的记忆方式：写 Plugin 时，如果想监听"整个构建器"级别的事件（比如构建开始、构建完成），从 `compiler.hooks` 入手；如果想读取或修改"这一次打包的具体产物"（比如往某个 chunk 里插入代码），通常要先拿到 `compilation` 对象再操作。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** high
> **标题：** Webpack 从入口到产物的构建流程
> **目的：** 展示 `Compiler`、每轮 `Compilation`、模块递归构建、chunk 生成和 emit 的先后关系。
> **必须表达：** Loader 在模块构建阶段转换资源；Plugin 通过生命周期钩子介入；`Compilation` 每次构建重新创建。
> **避免表达：** 不要画成所有文件同时、无依赖关系地直接输出。

![](../../static/docs/aiRender/前端面试/webpack-01-build-pipeline.webp)

### 高频追问：为什么说 Webpack 基于依赖图

入口并不是简单的"第一个被拼接进产物的文件"。Webpack 会完整记录每个模块依赖了谁、又被谁依赖，正是靠着这张图，它才能做到：识别出被多处引用的重复依赖、支持运行时才决定要不要加载的动态 `import()`、按入口边界或异步边界拆分出多个 chunk，以及在生产构建里分析出哪些导出根本没被用到（Tree Shaking 的基础，见第十章）。

## 三、热模块替换（HMR）

### HMR 与整页刷新的区别

HMR（Hot Module Replacement）在文件发生变化后，只替换真正变化的模块及其"可接受更新"的边界，不会主动刷新整个页面。CSS 通常可以直接替换生效；JS 模块必须显式声明一个可以接受更新的边界，否则会回退成整页刷新（在开发服务器允许降级的前提下）。

> 面试回答：
>
> 开发服务器会监听文件变化，变更后 Webpack 重新编译，并把这次更新的 hash、manifest 和 hot-update chunk 通知给浏览器。浏览器端的 HMR runtime 收到通知后请求这份更新清单，找到能够 `accept` 这个模块的边界，用新模块替换旧模块并执行相应回调；如果一路往上找不到任何可以接受更新的边界，就会回退为整页刷新。它的目标是尽量保留那些没有受到本次改动影响的模块的运行状态，从而提高开发时的反馈速度。

### 核心链路

1. `webpack-dev-server`（或其他开发服务器）持续监听源文件变化。
2. 文件变更触发增量编译，服务端产出这次更新对应的清单与 hot-update chunk。
3. 服务端通过 WebSocket 通知客户端：出现了新的构建 hash。
4. HMR runtime 请求 manifest，确认这次具体变更了哪些 chunk、哪些模块。
5. runtime 下载 hot-update chunk，调用模块的 dispose/accept 逻辑完成替换。
6. 如果这次更新无法被任何边界接受，就执行整页刷新作为降级方案。

```js
// 仅用于原生模块场景；框架项目通常已经由对应的开发插件处理好了 HMR 边界
if (module.hot) {
  module.hot.accept('./util.js', () => {
    console.log('util.js 已热更新')
  })
}
```

Webpack 5 开发模式下启用 `devServer.hot` 会自动注入 HMR 所需的运行时代码，一般不再需要手动添加旧版本的 `HotModuleReplacementPlugin`。框架项目（Vue/React 等）应该优先使用框架脚手架或对应插件（如 `vue-loader`、`react-refresh-webpack-plugin`）提供的 HMR 集成，而不是自己手写 `module.hot.accept`。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** high
> **标题：** HMR 更新链路
> **目的：** 展示文件变更、重新编译、WebSocket 通知、manifest 与 hot-update chunk 拉取、模块替换/刷新降级。
> **必须表达：** HMR 是客户端 runtime 和开发服务器协作完成的；`accept` 边界决定能否局部更新。
> **避免表达：** 不要把 HMR 描述成"只重新运行某个文件"或保证永不刷新。

![](../../static/docs/aiRender/前端面试/webpack-02-hmr-chain.webp)

## 四、开发服务器与代理

浏览器的同源策略会拦截前端开发服务器直接调用不同源的后端接口。代理的做法是让开发服务器代替浏览器去请求真正的目标 API，浏览器全程只和本地的开发服务器（同源）通信，因此可以绕开开发阶段的跨域限制——但它只解决"开发时怎么方便调用后端接口"这个问题，不是后端 CORS 配置的替代品，线上环境该做的跨域配置一样不能少。

```js
module.exports = {
  devServer: {
    static: './dist',
    port: 9000,
    proxy: [
      {
        context: ['/api'],
        target: 'https://api.example.com',
        changeOrigin: true,
      },
    ],
  },
}
```

常用配置项：`target` 是被代理的目标服务地址；`changeOrigin` 用于目标服务需要校验请求 `Host` 头的场景；`pathRewrite` 用于重写转发时的路径；`secure: false` 仅用于本地调试自签名证书的 HTTPS 服务，不应该带到生产相关配置里。

需要注意 `contentBase` 是 Webpack Dev Server 4 之前版本的配置项，Webpack 5 配套的 dev server 应该使用 `devServer.static`；代理功能底层通常基于 `http-proxy-middleware` 实现，具体配置项应以当前使用的 `webpack-dev-server` 版本文档为准，字段名在大版本之间发生过变化。

## 五、Loader：让非 JavaScript 资源进入依赖图

### Loader 是什么

Loader 本质上是模块源码的转换器。Webpack 原生只理解 JavaScript 和 JSON；遇到 CSS、Sass、图片、TypeScript 这类资源时，需要靠 Loader 把它们的内容处理成 Webpack 可以继续分析的模块结果。

### 执行顺序与常见 CSS 处理链

`use` 数组里的 Loader 默认按从右到左（或者说从下到上，取决于书写格式）的顺序依次执行：

```js
{
  test: /\.s?css$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
  ],
}
```

这条链的执行顺序是：`sass-loader` 先把 Sass 语法编译成普通 CSS；`css-loader` 接着解析 CSS 里的 `@import`、`url()`，把 CSS 转换成 Webpack 模块；最后 `style-loader` 在开发环境下把这些样式注入页面的 `<style>` 标签。生产环境通常改用 `MiniCssExtractPlugin.loader` 替代 `style-loader`，把样式抽成独立的 CSS 文件，而不是内联注入。

### 常见 Loader 与现代替代方案

| 需求 | 优先方案 | 说明 |
| --- | --- | --- |
| JS/TS 转译 | `babel-loader`、`ts-loader`，或基于 SWC/esbuild 的 Loader | 只处理业务目录，避免把整个 `node_modules` 也编译一遍 |
| CSS Modules | `css-loader` 的 `modules` 选项 | 处理局部作用域类名 |
| Sass/Less | `sass-loader` / `less-loader` | 需要配合对应的预处理器编译器一起安装 |
| 导入文本 | Webpack 5 内置的 `asset/source` | 替代早期的 `raw-loader` |
| 图片、字体等文件 | Webpack 5 内置的 Asset Modules | 替代早期的 `file-loader`、`url-loader` |

```js
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset',
  parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
  generator: { filename: 'images/[name].[contenthash:8][ext]' },
}
```

`type: 'asset'` 会根据文件大小自动决定处理方式：小文件内联成 Data URL 减少一次网络请求，大文件则输出成独立文件；也可以按需明确指定为 `asset/resource`（总是输出独立文件）或 `asset/inline`（总是内联）。

### 手写 Loader 的关键点

一个 Loader 函数接收原始源码（`string` 或 `Buffer`），返回转换后的源码；需要异步处理时应该用 `this.async()` 拿到回调函数再异步调用，而不是既声明了回调又直接 `return` 结果（两者混用会导致 Webpack 无法正确识别这个 Loader 是同步还是异步）。

```js
module.exports = function bannerLoader(source) {
  const options = this.getOptions()
  return `/* ${options.banner} */\n${source}`
}
```

`this.query` 是旧版本读取 Loader 配置项的写法，现代 Loader 应该优先使用 `this.getOptions()`。如果 Loader 处理过程中生成了 Source Map 或 AST，应该按照 Loader API 规定的方式通过返回值或回调参数传递出去，不能在转换过程中随意丢弃这些映射信息，否则会导致下游的调试定位失真。

## 六、Plugin：在生命周期中扩展构建能力

### Plugin 是什么

Plugin 是一个具有 `apply(compiler)` 方法的对象或类。它通过 Tapable 提供的 hooks 机制订阅 Webpack 各个生命周期节点，因此可以影响多个模块、chunks、assets，甚至整个构建过程本身——这正是 Loader 做不到的：Loader 的视野被限制在"把当前这一个模块转换成另一个模块"，而 Plugin 能看到、也能修改跨模块、跨 chunk 的整体产物。

```js
class BuildLogPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildLogPlugin', (stats) => {
      console.log(`构建完成，耗时：${stats.endTime - stats.startTime}ms`)
    })
  }
}

module.exports = BuildLogPlugin
```

不同钩子有同步、异步串行、异步并行等不同类型，应该选用对应的 `tap`、`tapAsync` 或 `tapPromise`，不要把异步操作硬塞进只支持同步执行的钩子里。

### Tapable 的核心思想：手写一个简化版本

Webpack 的整套插件机制建立在一个叫 Tapable 的发布订阅库上。理解它的核心思路，有助于理解"为什么 Plugin 长这个样子"：

```js
class SimpleHook {
  constructor() {
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push({ name, fn });
  }
  call(...args) {
    this.taps.forEach(({ fn }) => fn(...args));
  }
}

class SimpleCompiler {
  constructor() {
    this.hooks = {
      beforeRun: new SimpleHook(),
      done: new SimpleHook(),
    };
  }
  run() {
    this.hooks.beforeRun.call(this);
    // ... 真正的构建逻辑在这里执行 ...
    const stats = { endTime: Date.now(), startTime: Date.now() - 100 };
    this.hooks.done.call(stats);
  }
}

// 一个插件本质上就是往某个 hook 里注册一个回调
class BuildLogPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildLogPlugin', (stats) => {
      console.log(`构建完成，耗时：${stats.endTime - stats.startTime}ms`);
    });
  }
}

const compiler = new SimpleCompiler();
new BuildLogPlugin().apply(compiler);
compiler.run();
```

这段代码省略了真实 Tapable 支持的 `tapAsync`/`tapPromise`、拦截器（`intercept`）、以及针对不同钩子类型（`SyncHook`、`AsyncSeriesHook`、`AsyncParallelHook` 等）的具体调度逻辑，但保留了主干思路：**`Compiler`/`Compilation` 内部维护一批命名好的 hook；插件在 `apply` 里往感兴趣的 hook 上注册回调；Webpack 在构建流程跑到对应节点时，依次调用这些回调**。理解了这一点，就能理解为什么写插件永远是"找到对的 hook，注册一个函数"这个固定套路。

### 高频 Plugin 场景

| 场景 | 典型工具 | 作用 |
| --- | --- | --- |
| 生成 HTML | `HtmlWebpackPlugin` | 以模板生成 HTML，并自动注入本次构建的资源链接 |
| 清理输出 | `output.clean: true` | Webpack 5 内置，通常不再需要额外的 `clean-webpack-plugin` |
| 抽离 CSS | `mini-css-extract-plugin` | 把样式输出成独立的 CSS 文件，而不是内联注入 |
| 编译时常量 | `DefinePlugin` | 替换源码中的标识符 |
| 复制静态文件 | `copy-webpack-plugin` | 复制那些不需要经过模块依赖图处理的文件 |
| 压缩 | Terser、CSS Minimizer | 分别压缩 JS 和 CSS |

`DefinePlugin` 做的是文本级别的常量替换，而不是提供一个可以在运行时读取的环境变量对象——传入字符串值时通常需要用 `JSON.stringify` 包一层，否则会被当作一段可执行的 JS 表达式直接替换进代码：

```js
new webpack.DefinePlugin({
  __API_BASE__: JSON.stringify(process.env.API_BASE ?? '/api'),
})
```

### Loader 与 Plugin 的区别

| 维度 | Loader | Plugin |
| --- | --- | --- |
| 作用对象 | 单个模块的源代码 | 整个构建生命周期与产物 |
| 调用方式 | 匹配 `module.rules` 后按链式顺序执行 | 在配置中实例化，Webpack 调用其 `apply` 方法 |
| 适合解决 | 语法/资源转换，例如把 Sass 转成 CSS | 生成 HTML、压缩、注入常量、改写 assets 等跨模块任务 |
| 能力边界 | 主要是"把这个模块变成另一个模块" | 可以观察和修改 modules、chunks、assets、构建流程本身 |

## 七、构建速度优化

优化之前应该先用 `--profile --json`、`webpack-bundle-analyzer` 或者构建日志定位真正的瓶颈在哪里。大多数项目里第一收益来自"少构建、少解析、命中缓存"，而不是不断堆叠新插件。

### 高收益策略

1. **缩小处理范围**：给 `babel-loader` 这类耗时较高的 Loader 设置 `include: path.resolve(__dirname, 'src')`，避免无差别地处理 `node_modules`；必要时精确设置 `exclude`。
2. **优化模块解析**：`resolve.extensions` 只保留项目实际用到的扩展名；用 `resolve.alias` 缩短常用路径或者锁定某个依赖只使用单一版本；`resolve.modules` 这类会扩大文件系统搜索范围的配置要谨慎添加。
3. **启用持久化缓存**：Webpack 5 可以配置 `cache: { type: 'filesystem' }`，让没有发生变化的模块直接复用磁盘上的缓存结果，跳过重新解析和转换。
4. **减少昂贵的转换**：现代项目可以评估用 SWC、esbuild 这类原生实现的转译器替代纯 JS 实现的 Babel；对确实耗时的任务开启合理的 Worker 并行，但要注意如果机器核数本身就不多，过度并行反而会造成资源争抢，效果适得其反。
5. **开发环境选用合适的 Source Map**：追求重建速度可以用 `eval-cheap-module-source-map`；生产环境要根据"是否愿意公开源码映射"和"排错需求有多强"来选择 `source-map`、`hidden-source-map` 等不同选项。

```js
module.exports = {
  cache: { type: 'filesystem' },
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      include: path.resolve(__dirname, 'src'),
      use: 'babel-loader',
    }],
  },
}
```

DLL 这类方案曾经被用来把稳定的第三方依赖提前编译好，减少重复构建的开销，但配置和维护成本都比较高。Webpack 5 自带的持久化缓存加上更成熟的代码分割方案，通常已经能满足大部分项目的需求，DLL 应该只在有明确的基准测试证明确实收益显著时才考虑引入；`cache-loader` 同样不再是 Webpack 5 项目的首选，应该优先使用内置的文件系统缓存。

## 八、生产构建：Tree Shaking、代码分割与长期缓存

### 代码压缩与资源压缩

生产模式默认会启用 JavaScript 的最小化处理；需要自定义压缩策略时用 `TerserPlugin`。CSS 用 `css-minimizer-webpack-plugin` 压缩，图片一般在构建时压缩或者干脆交给 CDN/图片服务动态处理。Gzip/Brotli 属于传输压缩，必须由服务器或 CDN 正确设置响应头 `Content-Encoding` 才会真正生效，不能只在构建产物里生成了 `.gz` 文件就误以为线上已经启用。

### Tree Shaking 的前提

Tree Shaking 是对"哪些导出实际没有被用到"做静态分析，进而删除这些死代码。它最可靠的前提是代码使用 ES Modules 的静态 `import`/`export` 语法——因为只有静态结构才能在不执行代码的情况下确定性地分析出依赖关系（这一点和 Vue3 笔记里 Tree Shaking 的原理完全一致）。Webpack 会先在构建阶段标记出 `usedExports`，真正的删除动作则交给后续的压缩器完成。

`package.json` 里的 `sideEffects` 字段用来声明"这个包的哪些模块在被导入时可能产生副作用"（比如只是 `import './polyfill'` 就会执行一段初始化逻辑，即使没有用到它的任何导出）：

```json
{
  "sideEffects": ["*.css", "./src/polyfills.js"]
}
```

如果一个库错误地把这个字段整体声明成 `false`，构建工具会认为库里所有模块都可以在"没有导出被用到"时安全删除，进而可能错误地删掉本该保留的 CSS 导入、polyfill，或者其他单纯靠"被执行"而不是"导出被使用"来生效的模块。所以 `sideEffects` 不是一个"打开就能提速"的性能开关，而是对包本身行为的如实声明，写错了会导致运行时缺失某些效果，而且往往不容易第一时间联想到是这里的问题。

### 代码分割与长期缓存

```js
module.exports = {
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all' },
  },
}
```

- 动态 `import()` 是按路由或按交互拆包最自然的边界，只有真正需要时才会触发对应 chunk 的网络请求。
- `splitChunks` 可以把多个入口共用的模块、第三方依赖提取成独立 chunk，减少重复下载。
- 文件名使用 `[contenthash]`，能让内容没有变化的文件继续保持相同的 URL，从而命中浏览器的长期缓存——只有内容真正变了，文件名（也就是 URL）才会跟着变。
- 把 runtime（Webpack 自身的模块加载逻辑）单独抽成一个 chunk，能避免业务代码的变更连带引起入口文件的 hash 跟着变化，进一步提高缓存命中率。

### 三个容易混淆的概念

| 概念 | 目标 | 典型手段 |
| --- | --- | --- |
| Tree Shaking | 删除代码里确认未被使用的部分 | ESM 静态结构、`usedExports`、压缩器配合完成删除 |
| 代码分割 | 把代码拆分成按需加载或者可共享的多个 chunk | 动态 `import()`、`splitChunks` |
| 代码压缩 | 缩短仍然需要被执行、被保留下来的那部分代码 | Terser、CSS Minimizer |

这三者经常被放在一起讨论、也确实能协同工作，但解决的是三个不同维度的问题：一个是"删掉不需要的"，一个是"把需要的拆成合适的加载单元"，一个是"把留下来的变得更小"。

> [!VISUALIZATION]
> **类型：** relationship
> **优先级：** medium
> **标题：** 生产构建中代码分割、缓存与 Tree Shaking 的关系
> **目的：** 区分"删除无用代码""拆分可加载代码""为稳定文件名命中缓存"三类优化。
> **必须表达：** 三者可协作但解决的问题不同；动态导入产生异步 chunk，`contenthash` 服务于缓存。
> **避免表达：** 不要把 Tree Shaking 画成网络层的按需加载。

![](../../static/docs/aiRender/前端面试/webpack-03-prod-optimizations.webp)

## 九、与其他构建工具的关键差异速览

| 工具 | 开发期核心思路 | 更适合 |
| --- | --- | --- |
| Webpack | 完整构建依赖图后统一打包，生态和可定制性强 | 复杂应用、遗留配置、需要深度定制的工程 |
| Rollup | 以 ESM 库打包和 Tree Shaking 见长 | 组件库、工具库等发布型项目 |
| Parcel | 约定优于配置，自动处理常见资源类型 | 希望快速开始、较少定制需求的中小型项目 |
| Vite | 开发期基于原生 ESM 按需提供模块、预构建依赖；生产构建默认使用 Rolldown | 追求开发体验的现代前端应用，详见另一篇《Vite 面试知识整理》 |

面试回答不应该把两者绝对对立：Vite 并不是"完全不打包"，它在生产构建阶段依然会打包优化，只是开发阶段不需要提前打出一个完整 bundle；Webpack 也并非天生就慢，配合合理的缓存策略、增量构建和处理范围控制，同样能在大型工程里保持可接受的构建速度。选择哪个工具，更多取决于现有生态、构建定制的深度需求、迁移成本和团队已有经验，而不是简单的"新的一定更好"。Vite 相关的原生 ESM 开发服务器、依赖预构建、HMR 实现等细节，见另一篇《Vite 面试知识整理》。

> [!VISUALIZATION]
> **类型：** comparison
> **优先级：** medium
> **标题：** Webpack 打包开发与 Vite 原生 ESM 开发的请求差异
> **目的：** 对比开发阶段"预先构建 bundle"和"浏览器按需请求模块、服务端按需转换"的差异。
> **必须表达：** Vite 仍会对依赖做预构建，并在生产阶段打包；两者都是构建工具链而非简单快慢对立。
> **避免表达：** 不要画成 Vite 完全不转换或不产出 bundle。

![](../../static/docs/aiRender/前端面试/webpack-04-webpack-vite-dev.webp)

## 十、模块联邦（Module Federation）

### 要解决的问题

微前端场景下，多个独立构建、独立部署的应用经常需要共享一部分代码——比如把某个团队维护的组件库、业务模块，实时提供给另一个完全独立部署的应用使用。传统做法要么把公共代码发布成 npm 包（更新后所有消费方需要重新安装、重新构建才能拿到最新版本，链路长）,要么用 iframe 隔离（体验割裂，通信成本高）。

> 面试回答：
>
> 模块联邦（Module Federation）是 Webpack 5 内置的能力，允许多个独立构建、独立部署的 Webpack 应用在**运行时**动态加载彼此暴露出来的模块，而不需要先把这些模块发布成 npm 包再重新安装构建。一个应用可以把自己的某个模块声明为"可以被外部消费"，另一个应用在运行时按需去请求这个模块，两者各自独立开发、独立部署，只在运行时通过约定的地址完成模块级别的共享。

### 基本概念与最小配置

Module Federation 里最核心的两个角色是 **host**（消费方，运行时去加载别的应用暴露的模块）和 **remote**（被消费方，把自己的部分模块暴露出去）；一个应用完全可以同时是某些模块的 host、又是另一些模块的 remote。

```js
// remote 应用（提供方）webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductCard': './src/components/ProductCard',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
}
```

```js
// host 应用（消费方）webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      remotes: {
        shop: 'shop@https://shop.example.com/remoteEntry.js',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
}
```

```js
// host 应用中按需加载 remote 暴露的模块，写法上就是一次动态 import()
const ProductCard = React.lazy(() => import('shop/ProductCard'))
```

- `exposes`：声明这个应用要把哪些模块公开出去，以及对外的引用名。
- `remotes`：声明这个应用要消费哪些外部应用暴露出来的模块，以及去哪个地址（`remoteEntry.js`）获取。
- `shared`：声明多个应用之间可以共用同一份依赖（比如 React），避免每个 remote 各自打包一份，既减少重复下载,也避免同一个页面里出现多个版本的 React 实例导致状态不一致或 hooks 报错；`singleton: true` 表示强制整个页面只使用一份实例。

### 使用边界与代价

Module Federation 解决的是"运行时跨应用共享模块"的问题，不是没有代价的免费能力：

- 多个独立部署的应用之间存在**版本耦合**的风险——host 依赖的 remote 模块接口如果发生了不兼容变更，只有到运行时才会暴露问题，缺少传统 npm 包那种在安装阶段就能被锁定版本、提前发现不兼容的机制。
- `shared` 配置不当（比如版本范围没对齐）可能导致同一个依赖被加载了多份，或者因为 `singleton` 冲突在控制台报警告甚至运行时出错。
- 调试体验比单体应用复杂：一个页面的问题可能横跨两个独立仓库、独立部署的应用，需要额外的约定（比如统一的错误上报、版本对齐机制）来保证可维护性。
- 它主要面向"多团队独立开发部署、又需要共享部分 UI 或逻辑"这类微前端场景；单体应用内部的代码复用，用普通的模块 `import` 或者发布内部 npm 包就足够，不需要引入 Module Federation 这一层运行时耦合。

## 十一、面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- Webpack 构建流程：`Compiler`、`Compilation`、依赖图、Loader、chunk、emit。
- HMR 完整链路与 `accept` 边界。
- Loader 与 Plugin 的职责、调用方式区别，以及 Tapable hooks 的注册/调用主干逻辑。
- Tree Shaking 的 ESM 前提与 `sideEffects` 声明的作用。
- 代码分割、`contenthash` 与长期缓存的配合关系。

### ⭐⭐⭐⭐ 高频重点

- Webpack 解决的模块化与资源处理问题。
- 开发服务器代理的原理与常用配置项。
- 构建提速：缩小处理范围、优化解析、启用缓存、选择合适的 Source Map。
- JS/CSS 代码压缩与 Gzip/Brotli 传输压缩的区别。
- 模块联邦的 host/remote 模型，`shared` 依赖共享与 `singleton` 的作用。

### 容易连续追问的知识链

- 入口 → 依赖图 → Loader 转换 → `Compilation` → chunk/assets → emit。
- 文件变更 → 增量编译 → WebSocket 通知 → HMR runtime → `accept` / 刷新降级。
- ES Modules → `usedExports` → 压缩器删除死代码 → Tree Shaking → `sideEffects` 声明。
- `import()` → 异步 chunk → `splitChunks` → `contenthash` → 浏览器长期缓存。
- 微前端多应用共享代码的诉求 → Module Federation → `exposes`/`remotes` → `shared` 依赖去重与版本耦合风险；微前端更完整的应用隔离、生命周期、路由分发等内容见《微前端面试知识整理》。
