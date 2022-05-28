# 禁用eslint校验的几种方式
### 配置.eslintignore
> 代码文件内以注释配置的规则会覆盖配置文件(.eslintignore)里的规则，优先级要更高

最简单的是在项目 `.eslintignore` 加入对应的文件即可，类似 `.gitignore` [用法](https://cn.eslint.org/docs/user-guide/configuring#comments-in-configuration-files)

### 针对单个文件禁用 ESLint 语法校验
在代码顶部添加注释 `/* eslint-disable */`
```js
/* eslint-disable */

let a = 1
let b = 2
console.log(b)
```

### 针对某个代码区间禁用 ESLint 语法校验
两个 `/* eslint-disable */` 注释中间的代码块可以忽略语法检查
```js
/* eslint-disable */
alert('校验忽略')
/* eslint-enable */
alert('校验不通过')
```

### 整个文件禁用部分 ESLint 语法校验规则（如no-alert, no-console）
```js
/* eslint-disable no-alert, no-console */

// Disables no-alert and no-console warnings between comments
let a = 1
let b = 2
console.log(b)
alert(b)
```

### 针对某一行禁用
```js
针对某一行禁用eslint检查：
alert('foo') // eslint-disable-line
// eslint-disable-next-line
alert('foo')

针对某一行的某一具体规则禁用eslint检查：
alert('foo') // eslint-disable-line no-alert
// eslint-disable-next-line no-alert
alert('foo')

针对某一行禁用多项具体规则的检查：
alert('foo') // eslint-disable-line no-alert, quotes, semi
// eslint-disable-next-line no-alert, quotes, semi
alert('foo')
```