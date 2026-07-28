## 期望目标
> 本文基于webpack@5.75.0、nodejs@16.18.0
>
> 为什么要用webpack打包library而不用rollup？想要尝试在项目中写example，webpack生态更丰富一些

- 支持`umd`、`esm`、`commonjs`、`iife`
- 支持typescript
- 有本地预览功能

## 从0开始
### **一、初始化项目**
```bash
# 创建空文件夹

# 初始化package.json
npm init -y

# 安装 webpack 及 ts 相关依赖
npm install webpack webpack-cli -D
```

> 此时一个0配置的webpack项目已创建好:
> 
> ```bash
> #1. 创建 ./src/index.js 并编辑内容
> #2. 执行npx webpack 可以直接进行编译
> ```

### **二、创建基本的配置文件**
创建`build/webpack.config.js`
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};
```

在`package.json`中新增`npm script`:
```json
{ "build": "webpack --config ./build/webpack.config.js" }
```

执行`npm run build`与第一步的效果是一样的

### **三、支持typescript编译**
需要对`.ts`文件的支持，所以需要安装相关loader进行处理:
```bash
npm install typescript ts-loader -D
```

修改`webpack`配置:
```js
module.exports = {
  - entry: './src/index.js',
  + entry: './src/index.ts',
  + resolve: {
  +  extensions: ['.tsx', '.ts', '.js'],
  + },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  + module: {
  +   rules: [
  +     {
  +       test: /\.tsx?$/,
  +       use: 'ts-loader',
  +       exclude: /node_modules/,
  +     },
  +   ],
  + }
};
```

将`src/index.js`修改为`src/index.ts`文件

根目录创建`tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM"],
    "noImplicitAny": true,
    "sourceMap": true,
    "module": "ESNext",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "declaration": true, // 生成类型声明
    "declarationDir": "./types",
    "moduleResolution": "node",
    "baseUrl": "./",
  },
  "include": ["src", "types"]
}

```

执行打包`npm run build`查看效果


### **四、产物支持iife、commonJs、umd**
1. 修改`src/index.ts`，导出一个方法 `foo`，接收字符串或数字，返回一个数组
```ts
export function foo <T extends number|string>(val: T): T[] {
  return [val]
}
```
这时进行打包会发现产物的内容是空的，因为没有被使用会被`tree shaking`掉

2. 修改webpack配置，使其可以作为library输出，作为iife
```json
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    + library: "trans2Array",
  },
```

这时会发现有内容了，创建一个html文件尝试下也没有问题:
```html
<script src="./dist/bundle.js"></script>
<script>
  console.log(window.trans2Array.foo(10)) // [10]
</script>
```

3. 支持commonjs
默认是不支持在nodejs环境下使用的，继续修改配置:
```json
output: {
  filename: 'bundle.js',
  globalObject: 'this', // 避免commonjs下出错 https://webpack.js.org/configuration/output/#outputglobalobject
  path: path.resolve(__dirname, '../dist'),
  // library: "trans2Array",
  library: {
    name: 'trans2Array',
    type: 'umd'
  }
},
```
这时进行打包，然后在node环境下尝试:
```js
const lib = require('./dist/bundle')
console.log(lib.foo(66)) // [66]
```

> `umd` 兼容性已经很好，但是如果想要给到现代化前端工程，想要更好的支持`tree shaking`怎么办~ 毕竟模块化是`commonJs`

### **五、产物支持esm**
刚才提到`es6`模块化的问题，同样需要修改配置，但与原配置不兼容！先做一版`esm`打包的配置：
```json
module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  + experiments: {
  +  outputModule: true,
  + },
  output: {
    filename: 'bundle.js',
    globalObject: 'this', // 避免commonjs下出错 https://webpack.js.org/configuration/output/#outputglobalobject
    path: path.resolve(__dirname, '../dist'),
    library: {
    -  name: 'trans2Array', // 尤其这里不应该与 type module 共存
    -  type: 'umd'
    +  type: 'module'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};
```

打包后进行测试没有问题：
```html
  <script type="module">
    import { foo } from './dist/bundle.js'

    console.log(foo(911)) // [911]
  </script>
```


### **六、产物同时支持esm、umd**
此时就有一个问题，如果`esm`和`umd`模式不能同时进行打包怎么办~

那就分开打包吧，所以先区分下环境先，安装`npm i cross-env -D`

1. 修改下scripts
```json
  "scripts": {
    "build:umd": "cross-env MODULE_TYPE=umd webpack --mode=production --config ./build/webpack.config.js",
    "build:esm": "cross-env MODULE_TYPE=esm webpack --mode=production --config ./build/webpack.config.js",
    "build": "npm run build:umd & npm run build:esm"
  },
```

> 其实build的时候使用concurrently更优雅~ 
> 
> concurrently vs. npm-run-all vs. parallelshell

2. 修改打包配置
```js
const path = require('path');

const moduleType = process.env.MODULE_TYPE // （umd/esm）
const outputConfig = moduleType === 'esm'
? { // esm
    filename: 'bundle.esm.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'module'
    }
  }
: { // umd
  filename: 'bundle.umd.js',
  globalObject: 'this', // 避免commonjs下出错 https://webpack.js.org/configuration/output/#outputglobalobject
  path: path.resolve(__dirname, '../dist'),
  library: {
    name: 'trans2Array',
    type: 'umd'
  }
}

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: { // 该特性只支持 type: 'module'
    outputModule: moduleType === 'esm',
  },
  output: outputConfig,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};
```

打包后会有两个文件提供给不同的模块化引入方式，验证下：
```html
  <script src="./dist/bundle.umd.js"></script>
  <script>
    console.log(window.trans2Array.foo(10)) // umd 没问题
  </script>
  <script type="module">
    import { foo } from './dist/bundle.esm.js'

    console.log(foo(911)) // esm 没问题
  </script>
```
```js
const lib = require('./dist/bundle.umd') // commonjs没问题
console.log(lib.foo(66))
```

### **七、配置package.json**
指定当前模块、类型声明的入口文件
```json
{
  "name": "webpack-library",
  "version": "1.0.0",
  "files": [
    "dist",
    "types"
  ],
  "main": "./dist/bundle.umd.js",
  "module": "./dist/bundle.esm.js",
  "types": "./types/index.d.ts",
  "exports": {
    "types": "./types/index.d.ts",
    "import": "./dist/bundle.esm.js",
    "require": "./dist/bundle.umd.js"
  },
  "scripts": {
    "build:umd": "cross-env MODULE_TYPE=umd webpack --mode=production --config ./build/webpack.config.js",
    "build:esm": "cross-env MODULE_TYPE=esm webpack --mode=production --config ./build/webpack.config.js",
    "build": "npm run build:umd & npm run build:esm"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
  "author": "justwe7<ilihuaxi@gmail.com>",
  "license": "ISC",
  "devDependencies": {
    "cross-env": "^7.0.3",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1"
  }
}
```

## 开发环境配置
