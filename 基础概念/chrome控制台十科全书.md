# chrome/edge 控制台指南

## Console面板

> 此章节请打开 [devtools/console/console.html](https://justwe7.github.io/devtools/console/console.html) 一起食用

> 一方面用来记录页面在执行过程中的信息（一般通过各种 console 语句来实现），另一方面用来当做 shell 窗口来执行脚本以及与页面文档、DevTools等进行交互

首先看一下console对象下面都有哪些方法:  
![image.png](https://img.lihx.top/images/2020/06/28/image.png)

### console.clear
顾名思义，清空控制台

### console.log, info, warn, error
日常用的比较多的就是这几个了，其中 `log` 和 `info`，印象中在2016年之前老用info打印，还是有区别的，`info` 输出的内容前面是有一个蓝色背景的小圈, 大概跟这个差不多: i，后来chrome更新就没了

```js
console.log('普通信息')
console.info('提示性信息')
console.error('错误信息')
console.warn('警示信息')
```

![image344c2.png](https://img.lihx.top/images/2020/06/28/image344c2.png)

**使用占位符**

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


## Element面板

> 此章节请打开 [devtools/element/element.html](https://justwe7.github.io/devtools/element/element.html) 一起食用

> 在 Elements 面板中可以通过 DOM 树的形式查看所有页面元素，同时也能对这些页面元素进行所见即所得的编辑

### css 调试
#### style
选中目标节点，element面版，查看style->:hov,选择对应的状态即可

1.  
![image6a303.png](https://img.lihx.top/images/2020/06/28/image6a303.png)

2.  
![20200628_185451.gif](https://img.lihx.top/images/2020/06/28/20200628_185451.gif)


#### computed
有时候样式覆盖过多，查看起来很麻烦，`computed` 就派上用场了

![image1154d.png](https://img.lihx.top/images/2020/06/28/image1154d.png)

> 点击某个样式可以直接跳转至对应css定义

#### 调整某个元素的数值
选中想要更改的值，按方向键上下就可以 `+ / -` 1个单位的值
> `alt + 方向键` 可以 ×10 调整单位值
> `Ctrl + 方向键` 可以 ×100 调整单位值
> `shift + 方向键` 可以 /10 调整单位

### html 调试

#### 骚操作
选中节点，直接按键盘 `H` 可以直接让元素显示/隐藏，不用手动敲样式了，效果等同 `visibility: hidden`，还是要占据盒模型空间的。（记得把输入法改成英文~）

![20200628_191941.gif](https://img.lihx.top/images/2020/06/28/20200628_191941.gif)


#### 将某个元素存储到全局临时变量中
选中节点，右键，`Store as global variable`（在network面板中也能用，尤其是筛选接口的返回值很方便）

![20200628_192801.gif](https://img.lihx.top/images/2020/06/28/20200628_192801.gif)

#### 滚动到某个节点
如果页面很长，想找一个文本节点的显示位置又不想手动滑动可以试试 `滚动到视图`

![20200628_190729.gif](https://img.lihx.top/images/2020/06/28/20200628_190729.gif)


#### Edge 专属的3D视图
使用 chromium 后的 Edge 真的是改头换面，3D 视图可以帮忙定位一些定位层级还有DOM嵌套的问题，页面结构写的好不好看很直观的可以看出来(跟辅助功能里面的dom树结合使用很舒服)

![20200628_194515.gif](https://img.lihx.top/images/2020/06/28/20200628_194515.gif)

### DOM 断点

可以监听到 DOM 节点的变更(子节点变动/属性变更/元素移除)，并断点至变更 DOM 状态的 js 代码行： 

![20200628_192344.gif](https://img.lihx.top/images/2020/06/28/20200628_192344.gif)


## Network面板
在 Network 面板中可以查看通过网络来请求来的资源的详细信息以及请求这些资源的耗时

> 个人觉得理解 `Chrome Network` 的参数有助于我们对接口的性能有一个比较直观的感觉

按区域划分大概分为如下几个区域：  
![image.png](https://img.lihx.top/images/2020/07/02/image.png)

1. `Controls`。使用这些选项可以控制 Network 面板的外观和功能。
2. `Filters`。 使用这些选项可以控制在 Requests Table 中显示哪些资源。提示：按住 Cmd (Mac) 或 Ctrl (Windows/Linux) 并点击过滤器可以同时选择多个过滤器。
3. `Overview`。 此图表显示了资源检索时间的时间线。如果您看到多条竖线堆叠在一起，则说明这些资源被同时检索x。
4. `Requests Table`。 此表格列出了检索的每一个资源。 默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。 提示：右键点击 Timeline 以外的任何一个表格标题可以添加或移除信息列。
5. `Summary` 此窗格可以一目了然地告诉您请求总数、传输的数据量和加载时间


### (1、2)Controls，Filters区域
![imagee28b2.png](https://img.lihx.top/images/2020/07/04/imagee28b2.png)


### (3) Overview区域
**使用大请求行**
使用大请求行可以粗略的

**捕获屏幕截图**
将鼠标悬停在某个屏幕截图上的时候，Timeline(时间轴)会显示一条垂直的黄线，指示该帧是何时被捕获的

**显示概述**
展示页面整个生命周期的各个阶段的耗时（蓝色绿色黄色的那些小点）

![image2e1ab.png](https://img.lihx.top/images/2020/07/05/image2e1ab.png)

- `Queuing` (排队)
- `Stalled` (停滞)
- 如果适用:
  - `DNS lookup` (DNS查找)
  - `initial connection` (初始连接)
  - `SSL handshake` (SSL握手)
- `Request sent` (请求发送)
- `Waiting` (等待)（到开始下载第一个字节的时间（TTFB））
- `Content Download`(内容下载)

![image7dd79.png](https://img.lihx.top/images/2020/07/05/image7dd79.png)

### 使用Network面板进行网络优化

#### 了解资源加载时序 
了解网络下载资源的阶段至关重要。这是修复加载问题的基础。

- 了解资源时序的阶段。
- 知道每个阶段提供给`Resource Timing`(资源时序)API。
- 在时间轴图表中识别性能问题的不同指示。如连续的透明条或大块绿色。

所有网络请求都被视为资源。当它们通过网络检索时，分为不同的生命周期。`Network`(网络)面板使用的[Resource Timing API](http://www.w3.org/TR/resource-timing)和提供给开发者的API是一样的。


> 当使用跨源资源的`Resource Timing API`时， 请确保所有资源都有CORS头信息。

Resource Timing API提供了关于每个单独资源接收时间的详细信息。 请求生命周期的主要阶段是：
- `Redirect` (重定向)
  - 立即开始`startTime`
  - 如果发生重定向, `redirectStart`也会开始计时。
  - 如果重定向发生在此阶段结束时，那么 `redirectEnd` 将被采用。
- `App Cache` (应用程序缓存)
  - 如果浏览器有缓存，将采用 `fetchStart` 时间
- `DNS`
  - `domainLookupStart` 记录DNS请求开始的时间。
  - `domainLookupEnd` 记录DNS请求结束的时间。
- `TCP`
  - `connectStart` 记录开始连接到服务器的时间。
  - 如果用了TLS或SSL，`secureConnectionStart` 记录开始连接时间。
  - `connectEnd` 记录连接完毕时间。
- `Request` (请求)
  - `requestStart` 记录请求发送到服务器的时间。
- `Response` (响应)
  - `responseStart` 记录最开始的响应时间。
  - `responseEnd` 记录响应结束时间。

![资源时序API图](https://img.lihx.top/images/2020/07/05/image.png)


**在DevTools中查看**

`Network` (网络)面板中查看完整时序信息，您有三个选择：
- 将鼠标悬停在时间轴列下的时间图表上。这将显示一个弹出窗口，显示完整的时序数据。
- 点击任何 `Requests Table` (请求列表)中的条目，并打开该条目的 `Timing` (时序)标签页。
- 使用 `Resource Timing API` (资源时序API)从JavaScript中检索原始数据:

<!-- ![资源时序信息](../images/resource-timing-data.png) -->

> 这段代码可以在DevTools控制台中运行。它将使用`Resource Timing API`(资源时序API)来检索所有资源。然后它过滤条目，查找包含`logo-1024px.png`名称的条目。如果找到，会返回相关信息。
```js
  performance.getEntriesByType(
  'resource'
  ).filter(item => item.name.includes("logo-1024px.png"))
```

##### 各个阶段
**Queuing(排队)**

如果一个请求排队，则表明：  
- 请求被渲染引擎推迟，因为它被认为比关键资源（如脚本/样式）的优先级低。这经常发生在 images（图像） 上。
- 这个请求被搁置，在等待一个即将被释放的不可用的TCP socket。
- 这个请求被搁置，因为浏览器限制。在HTTP 1协议中，每个源上只能有
[6个TCP连接](https://crbug.com/12066)
- 正在生成磁盘缓存条目（通常非常快）


**Stalled/Blocking (停止/阻塞)**

发送请求之前等待的时间。它可能因为进入队列的任意原因而被阻塞。这个时间包括代理协商的时间。

**Proxy Negotiation (代理协商)**

与代理服务器连接协商花费的时间。


**DNS Lookup (DNS查找)**

执行DNS查找所用的时间。 页面上的每个新域都需要完整的往返(roundtrip)才能进行DNS查找。


**Initial Connection / Connecting (初始连接/连接)**

建立连接所需的时间， 包括TCP握手/重试和协商SSL。


**SSL**

完成SSL握手所用的时间。


**Request Sent / Sending (请求已发送/正在发送)**

发出网络请求所花费的时间。 通常是几分之一毫秒。


**Waiting (TTFB) (等待)**

等待初始响应所花费的时间，也称为`Time To First Byte`(接收到第一个字节所花费的时间)。这个时间除了等待服务器传递响应所花费的时间之外，还捕获到服务器发送数据的延迟时间。


**Content Download / Downloading (内容下载/下载)**

接收响应数据所花费的时间。(从接收到第一个字节开始，到下载完最后一个字节结束)

#### 诊断网络问题 

通过`Network`(网络)面板可以发现许多可能的问题。要找到这些问题需要很好地了解客户端和服务端之间的通信以及协议的限制。

#### 排队或停止阻塞 

最常见的问题是很多个请求排队或被阻塞。这表示从单个客户端检索的资源太多。在HTTP 1.0/1.1连接协议中，Chrome限制每个域名最多执行6个TCP连接。如果您一次请求十二个资源，前6个将开始，后6个将排队。一旦其中一个请求完成，队列中的第一个请求项目将开始其请求过程。

![一系列被阻塞的请求](https://img.lihx.top/images/2020/07/05/imageef7ae.png)

要解决传统HTTP 1的此问题，需要用多个子域名提供服务资源，将资源拆分到多个子域中，均匀分配。

> 上面说的修复HTTP 1连接数问题，不适用于HTTP 2连接，反而有害。如果您已部署HTTP 2，不要对您的资源进行域划分，因为它会影响HTTP 2的工作原理。在HTTP 2中，TCP连接多路复用连接的。这消除了HTTP 1的6个连接限制，并且可以通过单个连接同时传输多个资源。

#### 接收到第一个字节的时间很慢 

正如我们所看到的，很多绿色。

![高TTFB示例](https://img.lihx.top/images/2020/07/05/image23444.png)

TTFB就是等待第一个响应字节的时间，建议在200ms以下，以下情况可能会导致高TTFB:

1. 客户端和服务器之间的网络条件差，
2. 要么，服务器端程序响应很慢。

> 为了解决高TTFB，首先去除尽可能多的网络连接。理想情况下，在本地托管应用程序（部署在本地），并查看是否仍有一个大的TTFB。如果有，那么需要优化应用程序针的响应速度。这可能意味着优化数据库查询，为内容的某些部分实现高速缓存，或修改Web服务器配置。后端可能很慢的原因有很多。您需要对您的程序进行研究，并找出不符合您预期的内容。
>
> 如果本地TTFB低，那么是您的客户端和服务器之间的网络问题。网络传输可能被很多种事情干扰阻碍。在客户端和服务器之间有很多点，每个都有自己的连接限制，可能会导致问题。测试减少这种情况的最简单的方法是将您的应用程序放在另一台主机上，看看TTFB是否改进。

#### 加载缓慢 

正如我们所看到的，很多蓝色。
![高TTFB示例](https://img.lihx.top/images/2020/07/05/imageae084.png)

如果看到 `Content Download` (内容下载)阶段花费了很多时间，提高服务响应速度、并行下载等优化措施帮助都不大。 主要的解决方案是发送更少的字节。（比如，下载一张高质量的大图，可能是几兆，这个时候你需要优化图片。）


### (4) Requests Table区域

#### 重新发起`xhr`请求
在平时和后端联调时，我们用的最多的可能就是`Network`面板了。但是每次想重新查看一个请求，我们往往都是通过刷新页面、点击按钮等方式去触发`xhr`请求，这种方式有时显得会比较麻烦，我们可以通过`google`提供的`Replay XHR`的方式去发起一条新的请求，这样对于我们开发效率的提升是有所帮助的：
![](https://img.lihx.top/images/2020/07/05/640wx_fmtgif.gif)


#### 查看HTTP相关信息
**查看网络请求的参数**

可以通过点击query string parameters(查询字符串参数)旁边的view URL encoded(查看URL编码)或view decoded(查看解码)链接，查看URL编码或解码格式的query string parameters(查询字符串参数)
![image85eb1.png](https://img.lihx.top/images/2020/07/05/image85eb1.png)


**查看HTTP响应内容**
点击Response(响应)标签页可以查看该资源未格式化的HTTP响应内容

> 接口的返回值(在preview中）同样也可以 `Save global variable` 存储一个全局变量  
![20200705_111751.gif](https://img.lihx.top/images/2020/07/05/20200705_111751.gif)


#### Size 和 Time 为什么有两行参数？
![image08194.png](https://img.lihx.top/images/2020/07/05/image08194.png)

##### 关于Size列
`Size`有两行：

- 第一行表示的是数据的**传输时**的大小，例如上图中的`190KB`，
- 第二行表示的是数据**实际**的大小`708KB`

> 在服务器端采取`gzip`压缩算法将原有`708KB`压缩至`190KB`,传输大小缩短`3.7倍`，大大的提高了资源传输的效率

**需要注意的点：**

`gzip`压缩只会压缩`响应体`内容，所以适用于返回数据量大的时候，如果数据量太小的话，有可能会导致数据**传输时**的大小比**实际**大小要大(*例如加入一些额外的响应头*)

##### 关于Time列
Time有两行：

- 第一行表示从客户端发送请求到服务端返回所有数据所花费的总时间，对于上图来说就是`471ms`
- 第二行表示的是从客户端发送请求到服务器端返回第一个字节所表示的时间，对于上图来说就是`55ms`

> 第一行的时间代表了所有项目：例如`解析dns`，`建立连接`，`等待服务器返回数据`，`传输数据`等
> 
> 第二行的时间是 `总时间 - 数据传输`的时间


从上面的分析中我们看到 从**客户端请求到服务器处理结束准备返回数据**花了`55ms`（*算蛮久了*），但是在进行**传输数据**的时候花费了`471ms`

每个用户网络带宽不一样，对于网慢的用户来说，这个体验可能更差，所以在编写代码的时候，返回的数据量要尽量精简


### (5) Summary 区域
114次请求 | 已传输 | 已加载 | 页面运行时间 | DOMContentLoaded时间 | load时间  
![image.png](https://img.lihx.top/images/2020/07/04/image.png)

当页面的初始的标记被解析完时，会触发 `DOMContentLoaded`。 它在Network(网络)面板上的显示：
- 在 Overview (概览)窗格中的蓝色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)窗格中，您可以查看事件的确切时间。
![image4af35.png](https://img.lihx.top/images/2020/07/05/image4af35.png)

当页面完全加载时触发 `load` 事件。 它显示也显示在：
- 在 Overview (概览)窗格的红色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)中，您可以查看改事件的确切时间。
![imagee4d7e.png](https://img.lihx.top/images/2020/07/05/imagee4d7e.png)


## Sources 面板
主要用来调试页面中的 JavaScript

https://justwe7.github.io/devtools/debug-js/get-started.html

### 自定义代码片段 Snippets
在平常开发过程中，我们经常有些 `JavaScript` 的代码想在 `Chrome Devtools`中调试，直接在 `console` 下 写比较麻烦，或者我们经常有些代码片段(防抖、节流、获取地址栏参数等)想保存起来，每次打开 `Devtools` 都能获取到这些代码片段，而不用再去`google`，正好`Chrome Devtool` 就提供了这种功能。

如图所示，在 `Sources` 这个`tab`栏下，有个 `Snippets` 标签，在里面可以添加一些常用的代码片段。（当个小笔记本）

![20200705_114001.gif](https://img.lihx.top/images/2020/07/05/20200705_114001.gif)



### 设置断点



## 终极大招 Command
在控制台打开的状态下， 组合按键 `Ctrl + Shift + P` 打开“命令”菜单，接下来就可以为所欲为了~

### 截图
当你只想对一个特别的 `DOM` 节点进行截图时，你可能需要使用其他工具弄半天，但现在你直接选中那个节点，打开 命令（`Command`） 菜单并且使用 `节点截图` 就可以了
截取特定节点对应上图命令是`Screenshot Capture node screenshot`
不只是这样，你同样可以用这种方式 实现`全屏截图` ：通过 `Screenshot Capture full size screenshot` 命令

### CSS/JS 覆盖率
- 打开调试面板，用快捷键 `shift+command+P （mac）`输入 `Show Coverage`调出相应面板![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)
- 点击`reload` 按钮开始检测![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)
- 点击相应文件即可查看具体的覆盖情况（绿色的为用到的代码，红色表示没有用到的代码）![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)


### 媒体查询
媒体查询是自适应网页设计的基本部分。在Chrome Devtools中的设备模式下，在三圆点菜单中点击 Show Media queries即可启用：
点击媒体查询条形，调整视口大小和预览适合目标屏幕大小的样式
右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义





[Chrome Network ，Size 和 Time 为什么有两行参数](https://juejin.im/post/5c78aa2ae51d4575e963dc62)
[chrome 开发者工具](http://shouce.jb51.net/chrome/jian-cha-he-diao-shi-javascript/bian-li-dai-ma.html)



https://justcode.ikeepstudying.com/2018/09/chrome%E8%AE%BE%E7%BD%AE%E6%96%AD%E7%82%B9%E7%9A%84%E5%90%84%E7%A7%8D%E5%A7%BF%E5%8A%BF-js%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95%E5%BF%83%E5%BE%97-chrome-devtools-%E4%B8%AD%E8%B0%83%E8%AF%95-javascrip/
http://mdn.github.io/simple-web-worker/

