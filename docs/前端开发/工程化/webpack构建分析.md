### 测量各个插件和loader所花费的时间
包名: [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

### 安装
```bash
npm install --save-dev speed-measure-webpack-plugin
```
### 使用
直接将webpack的配置包裹后交给webpack传入webpack后运行项目:
```js
// - webpack文件配置
const webpackConfig = {
  module: { rules: [] },
  plugins: [new MyPlugin(), new MyOtherPlugin()],
};

// - 创建实例插件实例接收配置 webpackConfig
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const webpackConfig = smp.wrap({
  module: { rules: [] },
  plugins: [new MyPlugin(), new MyOtherPlugin()],
});

// 将新的配置传给webpack进行编译
const webpack = require('webpack');
webpack(webpackConfig);
```

### 体积分析
包名： [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

### 安装
```bash
npm install --save-dev webpack-bundle-analyzer
```
### 使用
作为插件传入webpack配置（最好与开发、打包环境分开）
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```