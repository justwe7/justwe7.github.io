### 实现简易的plugin
> 编写 [自定义插件 | webpack 中文文档 | webpack 中文文档 | webpack 中文网](https://www.webpackjs.com/contribute/writing-a-plugin/)

实现一个在文件头部插入打包时间注释的插件：
1.  创建`plugin/index.js`  文件:
```js
class MyAddRenderDatePlugin {
  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    const dateStr = `// rendertime: ${formatDate(this.options.format)}`;
    // 指定一个挂载到 compilation 的钩子，回调函数的参数为 compilation 。
    compiler.hooks.emit.tapAsync('MyAddRenderDatePlugin', (compilation, callback) => {
      // 现在可以通过 compilation 对象绑定各种钩子
      // 遍历每个文件进行处理
      compilation.assets && Object.keys(compilation.assets).forEach((filePath) => {
        // 判断是否为要处理的文件类型（只针对JS文件）
        if(/\.(js)$/.test(filePath)) {
          let content = compilation.assets[filePath].source();
          // 在文件最前面插入指定字符串
          content = `${dateStr}\n${content}`;
          // 替换原来的文件内容
          compilation.assets[filePath] = {
            source: () => content,
            size: () => Buffer.byteLength(content, 'utf8')
          };
        }
      });

      callback();
    });
  }
}

module.exports = MyAddRenderDatePlugin
```
2. 在配置文件中引入:
```js
const MyPlugin = require('./plugin')

module.exports = {
  plugins: [
    new MyPlugin({
      format: 'YYYYMMDD HH:mm:ss'
    })
  ],
}
```
从上面代码中可以看到导出的类:
- `constructor` 构造方法在可以接收传入的参数
- **apply** 是必要的方法，接收`compiler`参数，Webpack会调用它来注册插件，可以在函数体中注册各种Webpack事件钩子来对编译过程进行干预
在 `apply` 中有两个对象:
-   `compiler`: 表示整个Webpack编译过程的配置对象，可以访问Webpack配置文件中的选项、输入输出路径等信息。
-   `compilation`: 表示Webpack每次编译生成的对象，包含了当前编译的状态和资源信息。

### 如何调试
[如何调试](./xxx)
> `Compiler` 支持可以监控文件系统的 [监听(watching)](https://www.webpackjs.com/api/node/#watching) 机制，并且在文件修改时重新编译。 当处于监听模式(watch mode)时， compiler 会触发诸如 `watchRun`, `watchClose` 和 `invalid` 等额外的事件。 通常在 [开发环境](https://www.webpackjs.com/guides/development) 中使用， 也常常会在 `webpack-dev-server` 这些工具的底层调用， 由此开发人员无须每次都使用手动方式重新编译。 还可以通过 [CLI](https://www.webpackjs.com/api/cli/#watch-options) 进入监听模式。


### compiler 和 compilation区别
- `compiler` 表示整个编译过程，在Webpack编译生命周期内，在构建过程中只有一个`Compiler`实例存在
- `compilation` 表示一次具体的编译过程，它包含了当前编译过程中产生的所有资源以及编译过程的状态信息。每当Webpack开始一次新的编译时，就会创建一个新的`Compilation`实例

> 在构建过程中只有一个`Compiler`实例存在，那什么情况下会有多个`Compilation`事例？难道一次过程会有不同的结果？

一般来说也是一次过程只有一次结果，什么情况下会有不同的结果？没错！就是编译的文件变了！
也就是说在`watch`模式下或者使用 `webpack-dev-server` 的时候执行webpack编译会有一对多的情况

### compiler
> `Compiler` 模块是 webpack 的主要引擎，它通过 [CLI](https://www.webpackjs.com/api/cli) 或者 [Node API](https://www.webpackjs.com/api/node) 传递的所有选项创建出一个 compilation 实例。 它扩展（extends）自 `Tapable` 类，用来注册和调用插件。 大多数面向用户的插件会首先在 `Compiler` 上注册。

`Compiler`对象代表了整个Webpack打包过程，它从webpack配置文件中读取配置选项，负责处理所有的资源文件，并最终生成打包结果。在构建过程中，会创建一个`Compiler`实例，在Webpack编译生命周期内，只有一个`Compiler`实例存在

开头实现的plugin源码中`compiler.hooks.emit.tapAsync` 使用的`tapAsync`钩子就是集成自[tapable](https://github.com/webpack/tapable#hook-types)

所有的钩子及参数在 [compiler 钩子 | webpack 中文文档 | webpack 中文文档 | webpack 中文网](https://www.webpackjs.com/api/compiler-hooks/) 都可以查到，列举几个常用的钩子：

#### entryOption
> 在解析Webpack配置文件的入口选项之前执行的操作。

使用该钩子来动态生成Webpack的入口配置，从而根据不同条件动态加载不同的模块

#### afterPlugins
> 在完成插件注册之后执行的操作。

使用该钩子来检查当前Webpack配置是否合法，或者对已注册的插件进行进一步的初始化

#### compile
> 在开始新一轮编译之前执行的操作

使用该钩子来输出一条日志信息，表示Webpack即将开始一个新的编译过程

#### emit
> 在Webpack生成最终资源之前执行的操作

使用该钩子来对输出的资源文件进行优化、压缩或加密等操作

#### done
> 在Webpack编译完成并输出资源文件之后执行的操作。

使用该钩子来输出一条消息，表示Webpack编译完成，并在此基础上执行一些额外的操作，如启动服务器、打开浏览器等

```js
class MyPlugin {
  apply(compiler) {
	// 动态修改Webpack的入口配置，添加一个新的入口文件`./src/custom.js`
    compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
      if (entry.app) {
        const appEntry = Array.isArray(entry.app) ? entry.app : [entry.app]
        entry.app = [...appEntry, './src/custom.js']
      }
    })

	// 检查当前Webpack配置是否合法
    compiler.hooks.afterPlugins.tap('MyPlugin', (compiler) => {
      if (!compiler.options.output.path) {
        throw new Error('Output path must be specified.')
      }
    })

    compiler.hooks.compile.tap('MyPlugin', () => {
      console.log('开始一次新的编译...')
    })
	
	// 对输出的JS文件进行优化处理，使用`optimize`函数来优化代码，并更新Webpack的资源列表
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      for (const filename of Object.keys(compilation.assets)) {
        if (filename.endsWith('.js')) {
          const source = compilation.assets[filename].source()
          compilation.assets[filename] = {
            source: () => optimize(source),
            size: () => source.length
          }
        }
      }
    })
	// 编译完成
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      console.log('Compilation completed successfully.')
      // 启动服务器或打开浏览器等操作
      startServer(stats)
      openBrowser(stats)
    })
  }
}
```

### compilation
> `Compilation` 模块会被 `Compiler` 用来创建新的 compilation 对象（或新的 build 对象）。 `compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。 它会对应用程序的依赖图中所有模块， 进行字面上的编译(literal compilation)。 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。

和 `compiler` 用法相同，取决于不同的钩子类型， 所以也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。同样按照 compiler 钩子的相同方式来调用 tap：

```js
compilation.hooks.someHook.tap(/* ... */);
```

`compilation`是指代表一次构建过程的实例对象。Compilation对象提供一些钩子（Hook），可以用于在Webpack的构建过程中干预、修改或扩展Compilation的功能。
所有的钩子及参数在 [compilation 钩子 | webpack 中文文档 | webpack 中文文档 | webpack 中文网](https://www.webpackjs.com/api/compilation-hooks/) 中查找，列举一下常用的钩子：

#### optimize
> 在进行代码优化之前执行的操作

使用该钩子来检查当前编译过程中是否有错误或警告，并根据结果进行后续处理

#### optimizeModules
> 在对模块进行优化之前执行的操作

使用该钩子来检查当前模块的依赖关系，并在此基础上进行代码优化

#### seal
> 在完成资源处理之后执行的操作

使用该钩子来生成一些额外的资源文件，如源码映射文件、缓存清单等

#### afterSeal
> 在生成额外资源文件之后执行的操作

使用该钩子来输出一条日志信息，表示Webpack已经生成了所有的资源文件

#### additionalAssets
> 在生成最终资源之前执行的操作

使用该钩子来动态生成一些额外的资源文件，如JSON数据文件、HTML模板文件等

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {

      // 检查当前编译过程中是否有错误或警告，并根据结果进行后续处理
      compilation.hooks.optimize.tap('MyPlugin', () => {
        const errors = compilation.errors
        if (errors && errors.length > 0) {
          console.error('Compilation failed:', errors)
          process.exit(1)
        }
      })

      // 检查当前模块的依赖关系，并在此基础上进行代码优化
      compilation.hooks.optimizeModules.tap('MyPlugin', (modules) => {
        for (const module of modules) {
          // ...
        }
      })

      // 生成一些额外的资源文件，如源码映射文件、缓存清单等
      compilation.hooks.seal.tap('MyPlugin', () => {
        compilation.assets['source-map.json'] = generateSourceMap()
      })

      // 输出一条日志信息，表示Webpack已经生成了所有的资源文件
      compilation.hooks.afterSeal.tap('MyPlugin', () => {
        console.log('Additional assets generated.')
      })

      // 动态生成一些额外的资源文件，如JSON数据文件、HTML模板文件等
      compilation.hooks.additionalAssets.tapAsync('MyPlugin', (callback) => {
        const data = { a: 1 }
        compilation.assets['data.json'] = {
          source: () => JSON.stringify(data),
          size: () => JSON.stringify(data).length
        }
        callback()
      })
    })
  }
}

```

