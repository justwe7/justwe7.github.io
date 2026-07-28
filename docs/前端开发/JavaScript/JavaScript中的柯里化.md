> 在[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中，**柯里化**（英语：Currying），又译为**卡瑞化**或**加里化**，是把接受多个[参数](https://zh.wikipedia.org/wiki/參數_(程式設計))的[函数](https://zh.wikipedia.org/wiki/函数)变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`：

```js
function f (a, b, c) {
  return a + b + c
}
f(1, 2, 3) // 6

将f转换为一个新的函数，转换的过程就是柯里化
const currying = (fn) => { // 柯里化转换
  return function (a) {
    return function (b) {
      return function (c) {
        // 获取到与原函数接收参数数量相等的参数后执行原函数
        return fn(a, b, c)
      }
    }
  }
}
const newF = currying(fn)
newF(1)(2)(3) // 6
```

看上去柯里化把简单的问题复杂化了，所以平时也不那么“常用”。那它在面试中出现的频率这么高，有什么应用场景？

1. 参数复用
2. 提前返回
3. 延迟计算/运行

**示例：日志上报**

```js
function log (scenes, msg) {
  $.post('/xxx', { scenes, msg })
}

log('onLoad', 1)
log('onShow', 2)
log('onLoad', 3)
```

封装通用的上报处理方法，场景值又各不相同，而且log本身属于通用的工具函数，没有特别的含义。这个时候如果用柯里化封装一下：

```js
const logCurry = currying(log)
const logOnLoad = logCurry('onLoad')
const logOnShow = logOnLoad('onShow')
// ...

logOnLoad(1)
logOnShow(2)
logOnLoad(3)
```

此时借助柯里化log进行封装提高可读性。

在lodash中的`_.curry`，其实是可以一次传递多个参数的：

```js
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // 使用来自 lodash 库的 _.curry

alert( curriedSum(1, 2) ); // 3，仍可正常调用
alert( curriedSum(1)(2) ); // 3，以偏函数的方式调用
```

**如何实现柯里化函数**

已知：柯里化函数接收一个原始函数，返回偏函数（对原始函数的二次封装,是将现有函数的部分参数预先绑定为指定值,从而得到一个新的函数）。当接收到的参数等于原始函数时，即执行原函数

如何判断接收到的参数等于原始函数？

```js
function foo (a, b) {}
foo.length // 2
```

偏函数？

```js
function foo (fn) {
  return function (arg) {
    return fn(arg)
  }
}
```

知道判断条件就好说了:

```js
function curry (func) {
	const argLength = func.length
  return function curried (...args) {
    if (args.length >= argLength) { // 长度符合执行条件立即执行
      return func.apply(this, args);
    } else { // 不符合条件返回新的偏函数，并将此次的参数与即将传入的参数进行合并
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

个人理解，柯里化的本质就是闭包，函数内部保存状态

参考：

https://zh.javascript.info/currying-partials

