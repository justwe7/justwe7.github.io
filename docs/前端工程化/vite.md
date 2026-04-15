## 一、为什么选 Vite

在 Vite 出现之前，前端项目几乎都依赖 Webpack 作为构建工具。Webpack 的工作方式是：启动时将所有模块递归分析、打包成一个或多个 bundle，再启动开发服务器。项目越大，冷启动时间越长，动辄十几秒甚至几分钟。

根本原因在于：**Webpack 必须先打包，才能提供服务**。哪怕你只改了一个组件，整个模块图都可能需要重新处理。

Vite 反过来思考这个问题：

- **开发阶段**：不打包，浏览器直接通过原生 ES Modules（`<script type="module">`）加载文件，Vite 充当一个按需编译的服务器，只有浏览器真正请求某个文件时才处理它
- **生产阶段**：交给 Rollup 打包，输出高度优化的静态资源

这让开发服务器的启动时间从"秒级"缩短到"毫秒级"，HMR 也只需要处理实际改动的模块，不受项目规模影响。

---

## 二、安装与初始化

### 创建项目

```bash
# npm
npm create vite@latest my-app

# pnpm（推荐）
pnpm create vite my-app

# yarn
yarn create vite my-app
```

执行后会交互式询问框架（Vue、React、Svelte 等）和语言（JS / TS），选完后：

```bash
cd my-app
pnpm install
pnpm dev
```

也可以一次性指定模板，跳过交互：

```bash
pnpm create vite my-app --template vue-ts
```

常用模板名：`vue`、`vue-ts`、`react`、`react-ts`、`vanilla`、`vanilla-ts`。

### 项目结构说明

```
my-app/
├── public/           # 不经过 Vite 处理的静态资源，原样输出
├── src/
│   ├── assets/       # 会被 Vite 处理的图片、样式等
│   ├── main.ts       # 入口文件
│   └── App.vue
├── index.html        # ⚠️ 入口 HTML，在项目根目录（不是 public/）
├── vite.config.ts    # Vite 配置文件
└── tsconfig.json
```

> `index.html` 在根目录而非 `public/` 是 Vite 的设计决定。
>
> Webpack 的入口是 JS 文件，先打包、再把产物注入 HTML。Vite 反过来——**以 HTML 为入口**，从 HTML 里找到 `<script type="module" src="/src/main.ts">` 这类引用，再把它纳入模块图统一管理（依赖追踪、HMR 等）。
>
> 如果放进 `public/`，Vite 只会原样转发，不会解析其中的 `<script>`，就退化成普通静态文件服务了。

---

## 三、工作原理

### 开发模式：原生 ESM + 请求拦截

Vite 开发服务器本质上是一个 **按需编译的 HTTP 服务器**。浏览器请求 `main.ts` → Vite 拦截请求 → 即时编译成浏览器可执行的 JS → 返回响应。整个过程只处理当前请求的文件，其余文件静默等待。

Vite 把依赖分为两类分别对待：

| 类型 | 代表 | 处理方式 |
|---|---|---|
| **预构建依赖**（第三方包） | Vue、React、lodash | 启动时用 esbuild 预构建一次，缓存到 `node_modules/.vite/` |
| **源码模块** | src/ 下的文件 | 按需编译，改动后只处理变动文件 |

预构建解决了两个问题：
1. 很多 npm 包是 CommonJS 格式，浏览器不认识，预构建转成 ESM
2. 某些包（如 lodash-es）内部有大量细碎模块，把它们合并成一个文件，减少浏览器的并发请求数

### 生产模式：Rollup 打包

生产构建用 Rollup，而不是直接用 esbuild，原因是 Rollup 的 tree-shaking 和代码分割能力更成熟，输出的产物更适合生产环境。

esbuild 在 Vite 生产构建中仍然承担部分任务：JS/TS 转译和代码压缩（比 Terser 快 20-40 倍）。

---

## 四、基本配置（vite.config.ts）

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 3000,
    open: true,       // 启动时自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // 单位 KB，超过此值会警告
  },
})
```

### 路径别名配置

配置别名后，`import Foo from '@/components/Foo.vue'` 等价于从 `src/components/Foo.vue` 导入。

如果使用 TypeScript，还需要在 `tsconfig.json` 中同步配置，否则编辑器会报类型错误：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 环境变量

Vite 使用 `.env` 文件管理环境变量，文件命名决定它在哪个环境下生效：

| 文件 | 何时加载 |
|---|---|
| `.env` | 所有环境 |
| `.env.development` | `vite dev` 时 |
| `.env.production` | `vite build` 时 |
| `.env.local` | 本地覆盖，不应提交到 git |

**只有以 `VITE_` 开头的变量才会暴露给客户端代码**，没有这个前缀的变量 Vite 直接忽略，目的是防止服务端密钥意外泄露到前端 bundle 里：

```bash
# .env.development
VITE_API_BASE=http://localhost:8080
SECRET_KEY=不会暴露给前端         # 没有 VITE_ 前缀，在代码里读不到
```

在代码中通过 `import.meta.env` 访问，注意不是 Webpack 的 `process.env`：

```ts
const baseURL = import.meta.env.VITE_API_BASE  // "http://localhost:8080"
console.log(import.meta.env.SECRET_KEY)        // undefined

// Vite 内置变量
const isDev = import.meta.env.DEV      // boolean
const isProd = import.meta.env.PROD    // boolean
const mode = import.meta.env.MODE      // 'development' | 'production' | 自定义
```

> 即便加了 `VITE_` 前缀，变量值也会被打包进前端代码，任何人都能在浏览器里看到。密钥、数据库密码等敏感信息永远不要放进来。

---

## 五、插件使用

Vite 的插件系统基于 Rollup 插件接口扩展，所以大多数 Rollup 插件可以直接在 Vite 中使用。

### 官方插件

```bash
pnpm add -D @vitejs/plugin-vue        # Vue 3 SFC 支持
pnpm add -D @vitejs/plugin-vue-jsx    # Vue 3 JSX 支持
pnpm add -D @vitejs/plugin-react      # React（含 Fast Refresh）
pnpm add -D @vitejs/plugin-legacy     # 兼容旧浏览器（注入 polyfill）
```

### 常用社区插件

**unplugin-auto-import** — 自动引入 Composition API，不用每次手写 `import { ref, computed } from 'vue'`：

```bash
pnpm add -D unplugin-auto-import
```

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件
    }),
  ],
})
```

**unplugin-vue-components** — 自动按需引入组件，无需手动注册：

```bash
pnpm add -D unplugin-vue-components
```

```ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
})
```

**vite-plugin-svg-icons** — SVG 雪碧图：

```bash
pnpm add -D vite-plugin-svg-icons
```

### 插件执行顺序

插件默认在 build 和 serve 阶段都运行。可以通过 `apply` 字段限制：

```ts
{
  ...somePlugin(),
  apply: 'build',  // 仅生产构建时运行
}
```

插件数组中的顺序就是执行顺序，有依赖关系时注意排列。

---

## 六、常用技巧

### CSS 处理

**CSS Modules**：文件名以 `.module.css` 结尾即自动启用，类名会被哈希化避免冲突：

```vue
<template>
  <div :class="styles.container">...</div>
</template>

<script setup lang="ts">
import styles from './foo.module.css'
</script>
```

**CSS 预处理器**：安装对应包后直接使用，无需额外配置：

```bash
pnpm add -D sass        # SCSS
pnpm add -D less
pnpm add -D stylus
```

**全局注入变量**（如 SCSS 变量、mixin）：

```ts
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
})
```

**PostCSS**：在根目录创建 `postcss.config.js` 即自动读取，常用于 autoprefixer：

```bash
pnpm add -D autoprefixer
```

```js
// postcss.config.js
export default {
  plugins: {
    autoprefixer: {},
  },
}
```

### 静态资源处理

```ts
// 作为 URL 引入
import imgUrl from './logo.png'
// imgUrl 是字符串，如 '/assets/logo.2d8efhg.png'

// 作为字符串引入（适合 SVG inline）
import svgContent from './icon.svg?raw'

// 作为 Worker 引入
import Worker from './heavy.ts?worker'
const worker = new Worker()
```

`public/` 目录中的文件不会被处理，直接以 `/` 路径访问：

```html
<img src="/logo.png" />   <!-- 对应 public/logo.png -->
```

适合放：favicon、robots.txt、不需要版本 hash 的资源。

### 代理配置

开发时解决跨域问题：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://api.example.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      // 如果后端是 https 且证书有问题
      secure: false,
    },
    // WebSocket 代理
    '/ws': {
      target: 'ws://localhost:3001',
      ws: true,
    },
  },
},
```

### 多页面应用（MPA）

每个页面有独立的 HTML 入口：

```ts
// vite.config.ts
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        login: resolve(__dirname, 'login/index.html'),
      },
    },
  },
})
```

### 动态导入与代码分割

使用 `import()` 语法实现懒加载，Rollup 会自动将其分割为独立 chunk：

```ts
// 路由懒加载（Vue Router）
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
]

// 按需加载工具函数
const { heavyFn } = await import('@/utils/heavy')
```

可以给 chunk 命名，便于调试：

```ts
const module = await import(/* @vite-ignore */ './dynamic-module')

// 或用 rollupOptions.output.chunkFileNames 统一控制命名规则
```

### 预构建与依赖优化（optimizeDeps）

一般情况下不需要手动配置，但在以下场景会用到：

```ts
optimizeDeps: {
  // 强制预构建某些包（比如某包用了非标准 CJS 写法导致报错）
  include: ['some-cjs-package', 'deep/nested/module'],

  // 排除预构建（比如你自己的本地包需要热更新）
  exclude: ['my-local-package'],
},
```

预构建缓存在 `node_modules/.vite/deps/`，如果遇到奇怪的依赖问题，可以删除后重启：

```bash
rm -rf node_modules/.vite
pnpm dev
```

或者直接加 `--force` 标志强制重新预构建：

```bash
pnpm dev --force
```

---

## 七、构建优化

### 分包策略（manualChunks）

默认情况下 Rollup 会自动分包，但有时需要手动控制：

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // 将 node_modules 中的包单独打成 vendor chunk
        if (id.includes('node_modules')) {
          // 把大型库单独拆出来
          if (id.includes('element-plus')) return 'element-plus'
          if (id.includes('echarts')) return 'echarts'
          return 'vendor'
        }
      },
    },
  },
},
```

> 分包不是越细越好。chunk 太多会导致大量并发请求，HTTP/1.1 下反而更慢；合理分包是把不常变动的第三方依赖和业务代码分离，利用浏览器缓存。

### 压缩配置

```ts
build: {
  // 默认使用 esbuild 压缩，也可改用 terser（更慢但压缩率更高）
  minify: 'esbuild',  // 'terser' | 'esbuild' | false

  // 使用 terser 时可以传配置
  // minify: 'terser',
  // terserOptions: {
  //   compress: { drop_console: true },
  // },
},
```

### 资源内联阈值

小于阈值的文件会被 base64 内联到 JS/CSS 中，减少请求数；大于阈值的会单独输出为文件：

```ts
build: {
  assetsInlineLimit: 4096, // 默认 4KB，单位 bytes
},
```

### 分析构建产物

用 `rollup-plugin-visualizer` 生成可视化报告：

```bash
pnpm add -D rollup-plugin-visualizer
```

```ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,        // 构建完自动打开浏览器
      filename: 'dist/stats.html',
      gzipSize: true,
    }),
  ],
})
```

运行 `pnpm build` 后会自动打开分析页面，一眼看出哪个包体积最大。

---

## 八、与 Webpack 对比及迁移建议

### 关键差异

| 维度 | Vite | Webpack |
|---|---|---|
| 开发服务器原理 | 原生 ESM，按需编译 | 全量打包后提供服务 |
| 冷启动速度 | 极快（毫秒级） | 慢（随项目规模增长） |
| HMR 速度 | 极快（与项目规模无关） | 随模块增多变慢 |
| 生产打包 | Rollup | Webpack 自身 |
| 配置复杂度 | 低，开箱即用 | 高，需要大量配置 |
| 生态成熟度 | 较新，插件数量少于 Webpack | 成熟，插件生态极丰富 |
| 旧浏览器支持 | 需要 `@vitejs/plugin-legacy` | 内置 babel-loader |
| CommonJS 支持 | 需预构建转换 | 原生支持 |

### 迁移时常见的坑

**1. `require()` 不可用**

Vite 的源码环境是纯 ESM，不能使用 `require()`，改用 `import`：

```ts
// ❌ Webpack 时代的写法
const logo = require('./logo.png')

// ✅ Vite 写法
import logo from './logo.png'
```

**2. `process.env` 变量**

Webpack 通过 DefinePlugin 注入 `process.env.XXX`，Vite 中替换为 `import.meta.env.VITE_XXX`，迁移时需要批量替换。

**3. `require.context` 不可用**

Webpack 的 `require.context` 在 Vite 中用 `import.meta.glob` 替代：

```ts
// Webpack
const modules = require.context('./modules', false, /\.ts$/)

// Vite
const modules = import.meta.glob('./modules/*.ts', { eager: true })
```

**4. Webpack 插件不通用**

Webpack 插件无法在 Vite 中使用，需要找对应的 Vite/Rollup 替代品。大多数常用功能 Vite 已内置，剩余部分通常有社区插件可替代。

**5. 旧浏览器兼容**

Vite 默认目标是支持原生 ESM 的现代浏览器（Chrome 87+、Firefox 78+ 等）。如果需要支持 IE 或更旧的浏览器，必须加 `@vitejs/plugin-legacy`：

```bash
pnpm add -D @vitejs/plugin-legacy terser
```

```ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

---

## 九、实践建议

- **新项目直接选 Vite**，特别是 Vue 3 / React 项目，没有理由不选
- **Webpack 老项目迁移要评估成本**：主要是插件替换、`require` 改写、环境变量迁移，中大型项目改造量可能较大，优先在新模块引入 Vite
- **依赖问题首先重置预构建缓存**，大多数奇怪报错都能解决
- **生产构建出现问题时先检查 `base` 配置**，部署到子路径时需要设置 `base: '/sub-path/'`，否则资源路径会出错
- **不要把所有东西都放 `public/`**，放进去的文件不会被 hash，缓存失效策略就失效了；只有真正不需要版本管理的文件才放 `public/`
