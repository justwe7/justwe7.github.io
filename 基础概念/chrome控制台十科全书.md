# chrome/edge 控制台指南

## Console面板
> 请打开 [devtools/console/console.html](https://justwe7.github.io/devtools/console/console.html) 一起食用

首先看一下console对象下面都有哪些方法:  
![image.png](https://img.lihx.top/images/2020/06/28/image.png)

### console.clear
顾名思义，清空控制台

### console.log, info, warn, error
日常用的比较多的就是这几个了，其中 `log` 和 `info`，印象中在2016年之前老用info打印，还是有区别的，`info` 输出的内容前面是有一个蓝色的小圈, 大概跟这个差不多 ℹ，后来chrome更新就没了

```js
console.log('普通信息')
console.info('提示性信息')
console.error('错误信息')
console.warn('警示信息')
```

![image344c2.png](https://img.lihx.top/images/2020/06/28/image344c2.png)

**进阶**

```js
// 支持逗号分隔参数，不需要每个参数都单独打印
console.log(1, '2', +'3')
// 占位符
// %s 
console.log('今晚%s产品', '打', '？？？')
// %c 
console.log('今晚%s%c老虎', '打', 'color: red', '？？？')
// 示例图没变红是因为我控制台装的样式插件好像有点bug
```

![image4d911.png](https://img.lihx.top/images/2020/06/28/image4d911.png)

带有占位符的参数之后的若干参数属于占位符的配置参数。剩下的也可以自己试试，支持的占位符列表：

| 占位符 | 功能          |
| ------ | ------------- |
| %s     | 字符串        |
| %d     | 整数          |
| %i     | 整数          |
| %f     | 浮点数        |
| %o     | 对象的链接    |
| %c     | css格式字符串 |

### console.time, timeEnd
`time` 和 `timeEnd` 一般放在一起用，传入一个参数用来标识起始位置用于统计时间:

```js
console.time('t')
Array(900000).fill({}).forEach((v, index) => v.index = index)
console.timeEnd('t')
// t: 28.18603515625ms
```
会打印出中间代码的执行时间

### console.count
顾名思义。。计数,可以用来统计某个函数的执行次数，也可以传入一个参数，并且根据传入的参数分组统计调用的次数
```js
function foo(type = '') {
  type ? console.count(type) : console.count()
  return 'type：' + type
}

foo('A') //A: 1
foo('B') //B: 1
foo()    //default: 1
foo()    //default: 2
foo()    //default: 3
foo('A') //A: 2
```

### console.trace
用于追踪代码的调用栈，不用专门断点去看了
```js
console.trace()
function foo() {
  console.trace()
}
foo()
```

![imagebabdf.png](https://img.lihx.top/images/2020/06/28/imagebabdf.png)

### console.table
console.table()方法可以将复合类型的数据转为表格显示
```js
var arr = [
  { name: '梅西', qq: 10 },
  { name: 'C罗', qq: 7 },
  { name: '内马尔', qq: 11 },
]
console.table(arr)
```
![imageab741.png](https://img.lihx.top/images/2020/06/28/imageab741.png)

### console.dir
按便于阅读和打印的形式将对象打印  
```js
var obj = {
  name: 'justwe7',
  age: 26,
  fn: function () {
    alert('justwe7')
  },
}
console.log(obj)
console.dir(obj)
```
![image688f0.png](https://img.lihx.top/images/2020/06/28/image688f0.png)

打印 DOM 对象区别：   
![imagef2bad.png](https://img.lihx.top/images/2020/06/28/imagef2bad.png)


### console.assert
断言，用来进行条件判断。当表达式为false时，则显示错误信息，不会中断程序执行。

> 可以用于提示用户，内部状态不正确
```js
var val = 1
console.assert(val === 1, '等于1')
console.assert(val !== 1, '不等于1')
console.log('代码往下执行呢啊')
```
![image68db1.png](https://img.lihx.top/images/2020/06/28/image68db1.png)

### console.group, groupEnd
分组输出信息，可以用鼠标折叠/展开 
```js
console.group('分组1')
console.log('分组1-1111')
console.log('分组1-2222')
console.log('分组1-3333')
console.groupEnd()
console.group('分组2')
console.log('分组2-1111')
console.log('分组2-2222')
console.log('分组2-3333')
console.groupEnd()
```
![image4d2c2.png](https://img.lihx.top/images/2020/06/28/image4d2c2.png)

### $ 选择器

#### $_
可以记录上次计算的结果，直接用于代码执行:

![20200628_171742.gif](https://img.lihx.top/images/2020/06/28/20200628_171742.gif)

#### $0,$1...$4
代表最近5个审查元素**选中**过的DOM节点，看图（是要选中一下，我更喜欢用存储全局变量的方式玩，省的自己手残又选了一个节点）：

![20200628_164937.gif](https://img.lihx.top/images/2020/06/28/20200628_164937.gif)

#### $和$$
- `$(selector)`是原生 document.querySelector() 的封装。
- `$$(selector)`返回的是所有满足选择条件的元素的一个集合，是 document.querySelectorAll() 的封装

#### #x
将所匹配的节点放在一个数组里返回
```html
<ul>
  <ul>
    <li><p>li下的p1</p></li>
    <li><p>li下的p2</p></li>
    <li><p>li下的p3</p></li>
  </ul>
</ul>
<p>外面的p</p>
```
```js
$x('//li') // 所有的li
$x('//p') // 所有的p
$x('//li//p') // 所有的li下的p
$x('//li[p]') // 所有的li下的p
```

![image538c8.png](https://img.lihx.top/images/2020/06/28/image538c8.png)

#### keys, values
跟ES6对象扩展方法， `Object.keys()` 和 `Object.values()` 相同

```js
keys(obj);
values(obj);
```