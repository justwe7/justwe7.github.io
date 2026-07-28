# Vite 面试知识整理

> 本文侧重 Vite 的机制理解和配置速查，不铺陈虚构的大型项目经验——如果面试官追问具体项目细节，如实说明是通过官方文档、社区方案和本地 demo 验证过的理解，比编一段没有的经历更可靠，也更容易在追问下站得住。技术原理和配置本身是客观的，不会因为使用深度浅就打折扣。

## 复习建议

- 先搞清楚"Vite 开发环境为什么可以不整体打包"这一条主线，再展开依赖预构建、HMR 和生产构建。
- 不要死记配置项，理解每个配置解决的是"开发体验"还是"生产产物"哪一类问题。
- Vite 和 Webpack 面试经常放在一起问，回答时用《Webpack 面试知识整理》里的构建流程做参照对比，会比单独干背 Vite 的特点更有说服力。

## 一、Vite 是什么：为什么开发环境可以不整体打包

### 要解决的问题

Webpack 这类传统打包器在启动开发服务器之前，需要先构建出完整的依赖图、生成一份或多份 bundle，项目越大，这个"启动前的等待"就越长；文件改动后即便只改了一行代码，也往往需要重新走一遍局部的打包流程才能生效。Vite 的出发点是：**现代浏览器已经原生支持 ES Modules，那么开发阶段完全可以不预先打包，让浏览器直接按需请求它需要的模块**。

> 面试回答：
>
> Vite 在开发环境下利用浏览器原生的 ES Modules 加载能力：源码几乎不用打包，由一个轻量开发服务器按需转换、按需返回每一个被请求到的模块。这让开发服务器的启动时间基本和项目大小无关，文件改动后也只需要让浏览器重新请求这一个模块，而不必重新打包整个依赖图。生产构建阶段则不再依赖原生 ESM 的运行时开销，而是走一套完整的打包流程（早期是 Rollup，当前默认是 Rolldown）来保证兼容性和加载性能。

需要特别澄清一个常见误区：**"Vite 不打包"只是对开发环境的粗略概括，并不准确**。生产构建阶段 Vite 依然会打包、做 Tree Shaking、代码分割和压缩；开发阶段也不是完全零处理，第三方依赖会经过一次预构建（见第三章）。更准确的说法是"开发阶段基于原生 ESM 按需转换、生产阶段打包优化"，两个阶段用的是不同的路径,不能一概而论。

### Vite 名字的由来与整体架构

Vite 是法语"快"的意思。它主要由两部分组成：一个基于原生 ESM、在开发时提供按需编译能力的开发服务器；一个基于 Rollup（或当前默认的 Rolldown）、聚合了预设最佳实践的生产构建命令。这也是为什么 Vite 的插件系统很大程度上兼容 Rollup 插件 API（见第九章）——生产构建这一半本来就是在 Rollup/Rolldown 之上包了一层。

## 二、快速上手：create-vite 与最小配置

### 初始化项目

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
npm run dev
```

`create-vite` 提供了一批官方模板（`vanilla`、`vue`、`react`、`svelte` 等，以及各自的 TypeScript 变体），本质上是预先配置好的项目骨架，帮你省掉从零搭建 `vite.config.ts`、入口 HTML 和基础目录结构的过程。

### 最小配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
      },
    },
  },
})
```

和 Webpack 配置里通过 `module.rules` 挂一串 Loader 处理各种文件类型不同，Vite 对 `.vue`、`.jsx`、CSS、JSON 等常见资源类型提供了内置支持，框架相关的处理（比如单文件组件编译）则通过官方插件（如 `@vitejs/plugin-vue`）接入，不需要手动配置一条条 Loader 链。`server.proxy` 的作用和 Webpack `devServer.proxy` 完全一致：让开发服务器代替浏览器请求跨域接口，规避开发阶段的同源限制。

## 三、依赖预构建（Pre-bundling）

### 为什么需要预构建

如果完全不做任何预处理，浏览器直接按 ESM 规范请求 `node_modules` 里的第三方依赖，会遇到两个具体问题：

- **不少 CommonJS/UMD 格式发布的包不能被浏览器原生 `import` 直接使用**——浏览器只认识 ESM 的 `import`/`export` 语法，CommonJS 的 `require`/`module.exports` 需要先被转换。
- **一个第三方库内部可能拆成几十上百个模块文件**，浏览器如果对每一个内部模块都单独发一次 HTTP 请求，即使是 HTTP/2 下的多路复用，请求数量本身也会带来明显的瀑布式加载延迟，拖慢首次页面可用的时间。

Vite 用 esbuild（用 Go 编写，比传统基于 JavaScript 的打包器快出一个数量级）在开发服务器启动时，把每个第三方依赖预先转换、合并成少量的 ESM 格式模块，缓存到 `node_modules/.vite` 目录下。之后浏览器请求这些依赖时，直接命中的是预构建后的产物，而不是逐个请求依赖内部的原始文件。

> 面试回答：
>
> 依赖预构建做两件事：把 CommonJS/UMD 格式的依赖转换成 ESM，让浏览器能直接 `import`；把内部拆成大量小文件的依赖合并成少数几个模块，减少开发时的请求数量。这一步用 esbuild 完成，因为 esbuild 是原生语言实现，处理依赖预构建这种量大但转换逻辑相对固定的任务时，速度比基于 JavaScript 实现的工具快得多。业务源码本身不会被 esbuild 打包，仍然保持原生 ESM 按需转换的方式处理。

### 预构建的缓存与失效

预构建结果会被缓存，只有在 `package.json` 依赖发生变化、`vite.config.ts` 里影响依赖解析的配置发生变化，或者手动删除 `node_modules/.vite` 缓存目录时才会重新触发。开发时如果发现依赖更新了但页面行为看起来还是旧的，可以先怀疑是否命中了过期的预构建缓存。`optimizeDeps.include`/`optimizeDeps.exclude` 可以手动干预哪些依赖需要被预构建，常见于某些依赖没有被自动正确识别的场景。

## 四、原生 ESM 开发服务器如何处理一次请求

### 请求 - 转换 - 响应的链路

打开一个 Vite 开发页面时，大致会经历这样的过程：

1. 浏览器请求入口 HTML，Vite 开发服务器返回这份 HTML（通常包含一个 `<script type="module" src="/src/main.ts">`）。
2. 浏览器解析到这个 `<script type="module">`，发起对 `/src/main.ts` 的请求。
3. Vite 开发服务器拦截这个请求，发现是 `.ts` 文件，实时用 esbuild 把它转换成浏览器可执行的 JS，再把转换结果返回。
4. 转换后的代码里如果包含 `import './App.vue'` 这样的语句，浏览器会对这个路径再发起一次请求，Vite 再次拦截、转换（`.vue` 文件走 `@vitejs/plugin-vue` 编译成对应的 render 函数）、返回。
5. 这个过程递归进行，直到所有被实际用到的模块都被请求、转换过一遍——**没有被当前页面实际用到的模块，从始至终都不会被请求，也就不会被转换**，这正是"按需"的含义。

这和 Webpack 开发模式的核心区别在于：Webpack 需要在服务启动阶段就把整个依赖图构建完、生成好完整的 bundle，之后才能对外提供服务；Vite 的开发服务器启动时几乎不做事先构建，只是准备好"收到请求后如何转换"这套逻辑，真正的转换工作被推迟到浏览器实际发出请求的那一刻才发生，且只针对被请求到的模块。项目里没有被访问到的页面、组件，对应的转换开销根本不会发生。

### 为什么这种模式下项目越大、开发体验差异越明显

Webpack 开发服务器的启动时间和首次热更新反应速度，会随着项目规模增长而线性甚至更快地变差，因为它需要构建的依赖图和要处理的模块数量本身在增长。Vite 的开发服务器启动时间和项目里"总共有多少模块"基本无关，只和"当前这个页面实际用到多少模块"相关——一个有几千个组件的中后台系统，只要单个页面实际渲染用到的组件数量可控，打开这一个页面时的开发体验就不会因为项目里其他几千个组件的存在而变慢。

## 五、HMR 原理与 import.meta.hot

### 基本链路

Vite 的 HMR 同样依赖开发服务器和浏览器端 runtime 之间通过 WebSocket 协作完成，整体思路和 Webpack 的 HMR（见《Webpack 面试知识整理》第四章）目标一致，但因为 Vite 走的是原生 ESM 按需请求路径，具体实现更轻量：

1. 开发服务器监听文件变化。
2. 文件变化后，Vite 只需要重新转换这一个发生变化的模块，不需要重新构建任何依赖图或 bundle。
3. 通过 WebSocket 通知浏览器端的 HMR client："这个模块更新了"。
4. 浏览器端根据模块是否声明了 `import.meta.hot.accept`，决定是替换这个模块（及其上传递的边界）还是整页刷新。

```ts
if (import.meta.hot) {
  import.meta.hot.accept('./util.ts', (newModule) => {
    console.log('util.ts 已热更新', newModule)
  })
}
```

框架项目（Vue/React）通常由对应插件（`@vitejs/plugin-vue`、`@vitejs/plugin-react`）自动处理组件级别的 HMR 边界，业务代码一般不需要手写 `import.meta.hot.accept`，和 Webpack 侧框架插件接管 HMR 边界的思路是一致的。

### 为什么 Vite 的 HMR 通常感觉更快

Webpack 文件变化后，即便只用到了增量编译，仍然需要重新计算变化模块在整个依赖图/chunk 划分里的位置，走一遍相对完整的模块处理流程；Vite 由于开发阶段本身就没有"整体 bundle"这个概念，一个模块变化后，只需要让浏览器重新请求这一个模块的最新转换结果，不涉及任何 chunk 重新划分的计算，链路更短，这也是 Vite 主打的开发体验优势里最直观的一项。

## 六、CSS、静态资源、JSON 与 glob 导入

### CSS 处理

Vite 对 CSS 提供开箱即用的支持：直接 `import './style.css'` 即可，Sass/Less/Stylus 只需要安装对应的预处理器依赖，不需要额外配置 Loader 链（对比 Webpack 需要手动串 `sass-loader` → `css-loader` → `style-loader`）。CSS Modules 通过文件名约定 `*.module.css` 自动启用。

```ts
import styles from './App.module.css'
// styles.title 对应编译后的局部作用域类名
```

### 静态资源

```ts
import logoUrl from './logo.png' // 得到最终的资源 URL 字符串
```

小于 `assetsInlineLimit`（默认 4KB）的资源会被自动内联为 Base64 Data URL，减少一次请求；超过阈值的会被拷贝到输出目录并返回带 hash 的文件名，思路上和 Webpack 的 Asset Modules（`type: 'asset'`）是一致的。`public/` 目录下的文件会被原样拷贝到输出根目录，不经过任何转换，适合放 `favicon.ico`、不需要被引用分析的静态文件。

### JSON 与 glob 批量导入

```ts
import data from './data.json' // 直接得到解析后的对象

// 批量导入某个目录下所有匹配的模块
const modules = import.meta.glob('./pages/*.vue')
```

`import.meta.glob` 是 Vite 特有的能力，常用于按目录约定自动生成路由表、自动注册一批组件，避免手写一长串 `import` 语句；默认是懒加载（返回的是"如何导入"的函数），加 `{ eager: true }` 可以改成立即导入。

## 七、生产构建：Rollup/Rolldown、代码分割与 base 路径

### 为什么生产环境要打包

开发环境依赖原生 ESM 按需加载没有问题，是因为本地网络几乎没有延迟；但线上环境如果让浏览器为一个大型应用发出成百上千个模块请求，即使是 HTTP/2，也会因为请求数量本身和模块间的依赖等待关系拖慢首屏。因此 Vite 的生产构建仍然会走一条完整的打包流程：合并模块减少请求数、做 Tree Shaking 删除未使用代码、代码分割拆出可以并行加载或者按需加载的 chunk、压缩产物体积。

```bash
npm run build   # 内部执行 vite build
npm run preview # 本地起一个静态服务器预览构建产物，验证生产配置是否符合预期
```

早期版本的 Vite 生产构建基于 Rollup；较新版本默认改用 Rolldown（用 Rust 实现、对 Rollup 插件 API 保持兼容的打包器）以进一步提速。面试时不需要纠结具体用的是 Rollup 还是 Rolldown，两者在 Vite 里承担的角色和暴露给用户的配置方式是一致的，插件生态也是共通的。

### 常见构建配置

```ts
export default defineConfig({
  base: '/my-app/', // 部署在非根路径下时必须设置，否则静态资源引用路径会出错
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
})
```

- `base`：部署路径不是站点根目录时（比如挂在 `example.com/my-app/` 下）必须正确设置，否则打包后 HTML 里引用资源的路径会指向错误的位置，本地开发时容易注意不到，一到实际部署环境才暴露。
- `rollupOptions.output.manualChunks`：手动指定哪些依赖应该被打包进同一个 chunk，常见做法是把不常变化的第三方库单独拆成一个 vendor chunk，配合内容哈希文件名命中浏览器长期缓存，思路和 Webpack 的 `splitChunks` 一致。
- 路由级的动态导入（`() => import('./views/Detail.vue')`）在 Vite 里自动会被识别为异步 chunk 拆分边界，不需要额外配置。

## 八、环境变量与模式（mode）

Vite 通过 `.env` 系列文件管理环境变量：

```text
.env                # 所有模式下都会加载
.env.local          # 所有模式下都会加载，但不应提交到版本控制
.env.development    # 只在 development 模式下加载
.env.production     # 只在 production 模式下加载
```

```bash
# .env.production
VITE_API_BASE=https://api.example.com
```

```ts
console.log(import.meta.env.VITE_API_BASE)
console.log(import.meta.env.MODE) // 'development' | 'production' | 自定义模式名
```

出于安全考虑，只有以 `VITE_` 为前缀的变量才会被暴露给客户端代码，其余变量（比如某些只在构建脚本里使用、不应该被打进产物暴露给浏览器的密钥）不会被注入到 `import.meta.env` 上——这是一条容易被面试追问的边界：环境变量能不能被客户端读到，取决于变量名是否有这个前缀，而不是取决于它写在了哪个 `.env` 文件里。

`--mode` 参数可以在 `development`/`production` 之外自定义额外的模式（比如 `staging`），配合对应的 `.env.staging` 文件区分不同环境的配置，命令行执行 `vite build --mode staging` 即可。

## 九、插件机制：Rollup 插件 API 与 Vite 独有钩子

### 为什么 Vite 插件基本等于 Rollup 插件

因为 Vite 的生产构建本身建立在 Rollup（或兼容 Rollup API 的 Rolldown）之上，Vite 插件系统直接复用并扩展了 Rollup 的插件接口——一个标准的 Rollup 插件（只使用 `resolveId`、`load`、`transform` 这类通用钩子）通常可以直接在 Vite 里使用，不需要专门为 Vite 重写一遍。

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.special.js')) {
        return { code: code.replace('__BUILD_TIME__', Date.now().toString()) }
      }
    },
  }
}
```

### Vite 独有的部分

因为 Vite 除了生产构建，还有一个 Rollup 本身不具备的"开发服务器"角色，所以 Vite 在 Rollup 钩子基础上扩展了一批只在开发阶段生效的钩子，比较常见的有：

| 钩子 | 作用 |
| --- | --- |
| `config` | 在配置解析前修改或返回要合并的配置项 |
| `configureServer` | 拿到开发服务器实例，可以注册自定义中间件、拦截特定请求路径 |
| `transformIndexHtml` | 转换入口 HTML，比如注入自定义的 `<meta>` 或 `<script>` 标签 |
| `handleHotUpdate` | 自定义某个文件变化后的 HMR 处理逻辑，替代默认的更新行为 |

写插件时，`apply: 'build'` 或 `apply: 'serve'` 可以限定这个插件只在生产构建或者只在开发阶段生效，避免只用于优化生产产物的逻辑意外在开发阶段也执行一遍（反之亦然）。

## 十、常见配置与踩坑速查

以下是社区里高频出现、文档里也有专门说明的注意事项，不是基于大规模生产实践总结出来的经验，更适合当作"排查方向清单"使用：

| 现象 | 常见原因 | 处理方向 |
| --- | --- | --- |
| 部署后页面空白，静态资源 404 | `base` 配置和实际部署路径不一致 | 检查 `vite.config.ts` 里的 `base` 是否匹配站点实际挂载路径 |
| 开发环境正常，构建后某些依赖报错或行为不一致 | 依赖预构建阶段没有正确处理某个 CommonJS 依赖，或者某个依赖设计上只兼容特定打包器的边界情况 | 尝试 `optimizeDeps.include` 显式声明，或查阅该依赖是否有已知的 Vite 兼容性说明 |
| 环境变量在客户端代码里读取不到 | 变量名没有 `VITE_` 前缀 | 确认变量名前缀，或改用只在构建脚本阶段使用（不需要暴露给浏览器）的方式读取 |
| 改了 `.env` 文件后不生效 | 开发服务器没有重启；`.env` 相关的变量注入发生在启动时确定 | 重启 `vite dev`，而不是只依赖 HMR |
| 引入某个 npm 包后报"模块未找到"或语法错误 | 包本身发布的是较旧的 CommonJS/UMD 格式，或者内部使用了 Node.js 专属 API | 检查包的兼容性说明，考虑替换为有 ESM 支持的版本或改用适合浏览器端的替代包 |
| 首次访问某个页面明显卡顿，之后正常 | 该页面涉及的模块是第一次被请求，触发了实时转换和依赖预构建的冷启动开销 | 属于按需转换模式下预期内的现象，通常不需要特别处理；生产构建不存在这个问题 |

## 十一、与 Webpack 的关键差异速览

| 维度 | Webpack | Vite |
| --- | --- | --- |
| 开发环境核心思路 | 提前构建完整依赖图并打包，再启动服务 | 基于原生 ESM，浏览器按需请求，服务端按需转换 |
| 开发服务器启动速度 | 和项目总体量正相关 | 基本和项目总体量无关，只和当前页面用到的模块相关 |
| 依赖处理 | 和业务代码一起走完整的 Loader/Plugin 流程 | 用 esbuild 单独预构建，转换成少量 ESM 模块 |
| 生产构建 | 自身即为打包器，直接输出 | 委托给 Rollup/Rolldown 完成打包 |
| 资源处理方式 | 依赖 Loader 链（`css-loader`、`file-loader` 等） | 内置常见资源类型支持，框架相关通过官方插件接入 |
| 插件 API | 基于 Tapable 的 hooks（`compiler.hooks.xxx.tap`） | 兼容 Rollup 插件 API，并扩展了开发服务器相关钩子 |

不需要把两者塑造成非此即彼的竞争关系：现有的大型 Webpack 工程如果没有明显的开发体验痛点，不一定值得为了"用更新的工具"而承担迁移成本；新项目、尤其是对开发时的冷启动和热更新速度比较敏感的项目，Vite 通常是更顺手的默认选择。具体到某个项目该选哪个，还是要看现有生态兼容性、团队熟悉度和实际痛点，而不是单纯比"谁更快"。

## 十二、面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- Vite 开发环境为什么可以不整体打包：原生 ESM 按需请求 + 服务端按需转换。
- 依赖预构建解决什么问题：CommonJS 转 ESM、合并零散内部模块、esbuild 提速。
- HMR 基本链路，和 Webpack HMR 的异同。
- 生产构建仍然要打包的原因，以及为什么"Vite 不打包"这个说法不准确。

### ⭐⭐⭐⭐ 高频重点

- `base`、`manualChunks`、`.env` 系列文件与 `VITE_` 前缀的作用边界。
- `import.meta.glob` 解决的批量导入问题。
- Vite 插件为什么基本等于 Rollup 插件，以及 Vite 独有的开发期钩子。
- 和 Webpack 在开发环境思路、依赖处理、插件 API 上的具体差异。

### 容易连续追问的知识链

- 原生 ESM 按需加载 → 依赖预构建（esbuild）→ 请求转换链路 → HMR 只替换单个模块。
- 开发环境按需转换 → 生产环境为什么仍要打包 → Rollup/Rolldown → 代码分割与 `manualChunks`。
- `.env` 文件 → `VITE_` 前缀暴露规则 → `mode` 与 `--mode` 自定义环境。
- Rollup 插件 API → Vite 扩展的开发期钩子 → `configureServer`/`transformIndexHtml`/`handleHotUpdate`。
