# chrome/edge 控制台指南

## Console 面板

> 此章节请打开 [devtools/console/console.html](https://justwe7.github.io/devtools/console/console.html) 一起食用
>
> 一方面用来记录页面在执行过程中的信息（一般通过各种 console 语句来实现），另一方面用来当做 shell 窗口来执行脚本以及与页面文档、DevTools等进行交互

首先看一下console对象下面都有哪些方法:  
![image.png](https://img.lihx.top/images/2020/06/28/image.png)

### console.clear
顾名思义，清空控制台

### console.log, info, warn, error
日常用的比较多的就是这几个了，其中 `log` 和 `info`，印象中在2016年之前老用info打印，还是有区别的，`info` 输出的内容前面是有一个蓝色背景的小圈, 大概跟这个差不多: i，后来chrome更新就没了(IE还是可以看出差别的)

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

#### copy()
可以直接将变量复制到剪贴板
```js
copy(temp1)
```


## Element 面板

> 此章节请打开 [devtools/element/element.html](https://justwe7.github.io/devtools/element/element.html) 一起食用
>
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
使用 chromium 后的 Edge 真的是改头换面，**3D 视图**可以帮忙定位一些定位层级还有DOM嵌套的问题，页面结构写的好不好看很直观的可以看出来(跟辅助功能里面的dom树结合使用很舒服)

![20200628_194515.gif](https://img.lihx.top/images/2020/06/28/20200628_194515.gif)

### DOM 断点

可以监听到 DOM 节点的变更(子节点变动/属性变更/元素移除)，并断点至变更 DOM 状态的 js 代码行： 

![20200628_192344.gif](https://img.lihx.top/images/2020/06/28/20200628_192344.gif)


## Network 面板
在 Network 面板中可以查看通过网络来请求来的资源的详细信息以及请求这些资源的耗时

> 个人觉得理解 `Chrome Network` 的参数有助于我们对接口的性能有一个比较直观的感觉

按区域划分大概分为如下几个区域：  
![image.png](https://img.lihx.top/images/2020/07/02/image.png)

1. `Controls`。使用这些选项可以控制 Network 面板的外观和功能。
2. `Filters`。 使用这些选项可以控制在 Requests Table 中显示哪些资源。提示：按住 Cmd (Mac) 或 Ctrl (Windows/Linux) 并点击过滤器可以同时选择多个过滤器。
3. `Overview`。 此图表显示了资源检索时间的时间线。如果您看到多条竖线堆叠在一起，则说明这些资源被同时检索x。
4. `Requests Table`。 此表格列出了检索的每一个资源。 默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。 提示：右键点击 Timeline 以外的任何一个表格标题可以添加或移除信息列。
5. `Summary` 此窗格可以一目了然地告诉您请求总数、传输的数据量和加载时间


### （1、2）Controls，Filters区域
![imagee28b2.png](https://img.lihx.top/images/2020/07/04/imagee28b2.png)


### （3） Overview区域
**使用大请求行**
默认情况下，`Requests Table`一个资源只显示很小的一行。选中`Use large resource rows`(使用大资源行)按钮可以显示两个文本字段：主要字段和次要字段。列的标题栏指示辅助字段的含义。

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

#### 使用Network面板进行网络优化
> 了解以上的信息可以针对Network进行一些优化

##### 了解资源加载时序 
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


###### 在DevTools中查看

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

###### 各个阶段
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

正如我们所看到的，很多蓝色：
![高TTFB示例](https://img.lihx.top/images/2020/07/05/imageae084.png)

如果看到 `Content Download` (内容下载)阶段花费了很多时间，提高服务响应速度、并行下载等优化措施帮助都不大。 主要的解决方案是发送更少的字节。（比如，下载一张高质量的大图，可能是几兆，这个时候你需要优化图片。）


### (4) Requests Table区域
- `Name`**(名称)**: 资源的名称。
- `Status`**(状态)**: HTTP状态代码。
- `Type`**(类型)**: 请求的资源的MIME类型。
- `Initiator`**(发起)**: 发起请求的对象或进程。它可能有以下几种值：
  - `Parser`**(解析器)**: Chrome的HTML解析器发起了请求。
  - `Redirect`**(重定向)**: HTTP重定向启动了请求。
  - `Script`**(脚本)**: 脚本启动了请求。
  - `Other`**(其他)**: 一些其他进程或动作发起请求，例如用户点击链接跳转到页面，或在地址栏中输入网址。
- `Size`**(大小)**: 响应头的大小（通常是几百字节）加上响应数据，由服务器提供。
- `Time`**(时间)**: 总持续时间，从请求的开始到接收响应中的最后一个字节。
- `Timeline`**(时间轴)**: `Timeline`列显示所有网络请求的视觉瀑布。点击此列的标题栏会显示其他排序字段的菜单。

> 在标题栏如(Name上)右键，可以添加或删除信息列

![image11f8b.png](https://img.lihx.top/images/2020/07/05/image11f8b.png)

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


从上面的分析中我们看到 从**客户端请求到服务器处理结束准备返回数据**花了`55ms`，但是在进行**传输数据**的时候花费了`471ms`

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

https://wehmo.wy.guahao.com/search?q=%E7%B3%96%E5%B0%BF%E7%97%85&searchType=search#index-component


## Sources 面板
> 此章节请打开 [/devtools/debug-js/get-started.html](https://justwe7.github.io/devtools/debug-js/get-started.html) 一起食用
>
> 主要用来调试页面中的 JavaScript

### 自定义代码片段 Snippets
在平常开发过程中，我们经常有些 `JavaScript` 的代码想在 `Chrome Devtools`中调试，直接在 `console` 下 写比较麻烦，或者我们经常有些代码片段(防抖、节流、获取地址栏参数等)想保存起来，每次打开 `Devtools` 都能获取到这些代码片段，而不用再去`google`，正好`Chrome Devtool` 就提供了这种功能。

如图所示，在 `Sources` 这个`tab`栏下，有个 `Snippets` 标签，在里面可以添加一些常用的代码片段。（当个小笔记本）

![20200705_114001.gif](https://img.lihx.top/images/2020/07/05/20200705_114001.gif)

### 设置断点

#### 断点的面板

![image.png](https://img.lihx.top/images/2020/07/07/image.png)

![image0187f.png](https://img.lihx.top/images/2020/07/06/image0187f.png)


#### 指定位置的中断
[官方文档介绍的很清楚](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)

找到源代码，点击要中断代码执行的位置，点击红色按钮的位置。然后再触发该方法执行，因为已知点击按钮可以触发，精准的定位到代码行就可以了:

![image.png](https://img.lihx.top/images/2020/07/06/image.png)


#### 全局事件中断
假如不知道代码执行的位置，如以下场景：

![imagee7a93.png](https://img.lihx.top/images/2020/07/06/imagee7a93.png)

看接口返回的列表总数应该是20条，但是页面到15条就显示到底部了


![imagecc38e.png](https://img.lihx.top/images/2020/07/06/imagecc38e.png)

看代码写的判断条件有点问题，单webpack 编译后的代码包含很多模块，无从找起

大概知道问题原因是什么，可以试试自己的猜想对不对：

1. 因为列表是提拉加载，所以肯定会触发网络请求，可以在事件侦听器里面打一个 `XHR` 的断点
2. 然后提拉加载页面触发接口请求，如预期的，代码中断执行了。但是说找不到sourcemap，暂时把js的资源映射给关掉：
  ![imageaadd2.png](https://img.lihx.top/images/2020/07/06/imageaadd2.png)
  ![imaged604f.png](https://img.lihx.top/images/2020/07/06/imaged604f.png)
3. 再次触发断点，发现可以查看到中断的代码了，因为肯定是页面中的业务代码将请求推入到执行堆栈的，所以可以在堆栈中找到对应的方法名：`getVideoList`
   
   ![image003b6.png](https://img.lihx.top/images/2020/07/06/image003b6.png)
4. 点击方法名可以跳转到对应的源码，可以看到圈起来的代码和所猜想的问题代码应该是同一处
  ![imageb8ea4.png](https://img.lihx.top/images/2020/07/06/imageb8ea4.png)
5. 回过来看下问题原因： 页面请求完新数据后直接 `pageNum` 自增，然后直接就用于是否结束的判断了，有点不够严谨，不如直接比对当前的列表长度与接口返回的数据总数来判断: 
   ![imaged4077.png](https://img.lihx.top/images/2020/07/06/imaged4077.png)
6. 记住要修改的代码，在这个文件开头，也就是 `191.xxx.js` 第一行先打个断点。然后刷新页面，找到刚刚想要修改的代码: 用 `t.recommendList.length` 替换掉 `n.pageSize*t.pageNo`（不知道为什么在chrome上面一直不能成功，Edge可以。搜了搜,是因为Edge的bug还是chrome的bug🙃 [stackoverflow](https://stackoverflow.com/questions/6657229/how-can-i-edit-javascript-in-my-browser-like-i-can-use-firebug-to-edit-css-html)）
7. 再`Ctrl + S`，保存一下，然后看下页面效果，列表可以全部加载出来了:
![imagea80ad.png](https://img.lihx.top/images/2020/07/06/imagea80ad.png)

> 在美化代码的面板中是不支持直接修改页面代码的

#### 黑盒模式
把脚本文件放入Blackbox(黑盒)，可以忽略来自第三方库的调用堆栈

默认（不开启黑盒）：  
![image70101.png](https://img.lihx.top/images/2020/07/06/image70101.png)

开启黑盒：  
![imagec7749.png](https://img.lihx.top/images/2020/07/06/imagec7749.png)

- 打开方式1
  1. 打开 DevTools `Settings` (设置)。
  2. 在左侧的导航菜单中，单击 `Blackboxing` (黑箱)
  3. 点击 `Add pattern...` (添加模式)按钮。
  4. 在 `Pattern`(模式)文本框输入您希望从调用堆栈中排除的文件名模式。DevTools 会排除该模式匹配的任何脚本。
  5. 在文本字段右侧的下拉菜单中，选择 `Blackbox` (黑箱)以执行脚本文件但是排除来自调用堆栈的调用，或选择 `Disabled` (禁用)来阻止文件执行。
  6. 点击`Add`(添加) 保存。

- 打开方式2    
直接在想要忽略的堆栈信息上 `blackbox script`

#### DOM断点
查看element 面板[DOM 断点](#dom-断点)

### 调试serviceworker
http://mdn.github.io/simple-web-worker/


## Performance 面板
> 此章节请使用**Chrome的隐身模式**打开 [/devtools/jank/index.html](https://justwe7.github.io/devtools/jank/index.html) 一起食用
> 隐身模式可以保证Chrome在一个相对干净的环境下运行。比如说，你安装了许多chrome插件，这些插件可能会影响我们分析性能表现。
> 
> 在 Performance 面板可以查看页面加载过程中的详细信息，比如在什么时间开始做什么事情，耗时多久等等。
> 
> 有人会问，这个跟前面的 Network 有什么区别呢，上面也能显示耗时信息。在 Performance 面板中，你不仅可以看到通过网络加载资源的信息，还能看到解析 JS、计算样式、重绘等页面加载的方方面面的信息

### 面板主要的区域划分：

![imagef4dfb.png](https://img.lihx.top/images/2020/07/07/imagef4dfb.png)

1. controls。开始记录，停止记录和配置记录期间捕获的信息
2. overview。页面性能的高级汇总
3. Flame Chart [火焰图(线程面板)]。CPU 堆叠追踪的可视化在火焰图上看到一到三条垂直的虚线：
   - 蓝线代表 `DOMContentLoaded` 事件
   - 绿线代表首次绘制的时间
   - 红线代表 `load` 事件
4. Details。在Flame Chart中，选择了某一事件后，这部分会展示与这个事件相关的更多信息；
   > 如果选择了某一帧，这部分会展示与选中帧相关的信息。如果既没有选中事件也没有选中帧，则这部分会展示当前记录时间段内的相关信息。


### 开始记录
- 首先点击控制条左边的第一个圆圈，开始记录日志
- 等待几分钟
- 点击Stop按钮，Devtools停止录制，处理数据，然后显示性能报告

然后就会出来上面一张图的内容，

> 与台式机和笔记本电脑相比移动设备的 CPU 功率要小得多。无论何时分析页面，都使用 CPU 限制来模拟页面在移动设备上的表现。
> 在"开发工具"中，单击"性能"选项卡。
> 确保启用"屏幕截图"复选框。
> 单击"捕获设置"。 Capture SettingsDevTools 揭示了与如何捕获性能指标相关的设置。
> 对于CPU，选择2 倍减速。DevTools 会限制您的 CPU，因此其速度比平时慢 2 倍

> 注意：在测试其他页面时，如果您想要确保它们在低端移动设备上运行良好，请将 CPU 限制设置为20 倍减速。此演示在 20 倍减速时不能很好地工作，因此它仅使用 2 倍减速作为教学目的。

### (1)controls 控制条区域
- 上半区域
  - `Screenshots` 截图：默认勾选，每一帧都会截图
  - `Memory` 内存消耗记录：勾选后可以看到各种内存消耗曲线
- 下面的checkbox区域
  - `Disable javaScript samples` [禁用javaScript示例]：减少在手机运行时系统的开销，模拟手机运行时勾选
  - `Network` [网络模拟]：可以模拟在3G,4G等网络条件下运行页面
  - `Enable advanced paint instrumentation(slow)` [启用高级画图检测工具(慢速)]：捕获高级画图检测工具，带来显著的性能开销
  - `CPU` [CPU限制性能]：主要为了模拟底CPU下运行性能


### (2)overview 总览区域
![imagee53ec.png](https://img.lihx.top/images/2020/07/07/imagee53ec.png)

#### FPS
绿色竖线越高，FPS 越高。 FPS 图表上的红色块(上图刚开始的部分)表示长时间帧，很可能会出现卡顿。经常打游戏肯定知道这个指标代表什么，`120FPS` 代表流畅（手动滑稽） 

下面火焰图的 `FPS` 可以量化这项参数

> FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在60的FPS的话，那么用户体验就是不错的
>
> Q: 为什么是60fps?
> 
> A: 我们的目标是保证页面要有高于每秒60fps(帧)的刷新频率，这和目前大多数显示器的刷新率相吻合(60Hz)。如果网页动画能够做到每秒60帧，就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，一秒之内进行60次重新渲染，每次重新渲染的时间不能超过16.66毫秒


#### CPU
CPU 资源。**此面积图指示消耗 CPU 资源的事件类型**。在CPU图表中的各种颜色与 `Summary` 面板里的颜色是相互对应的，`Summary` 面板就在 `Performance` 面板的下方。CPU图表中的各种颜色代表着在这个时间段内，CPU在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索

##### CPU 资源面积图颜色划分:
| 颜色                                                                           | 执行内容                     |
| ------------------------------------------------------------------------------ | ---------------------------- |
| <span style="background: rgb(144,183,233);color: #fff;border: 1px;">蓝色</span>(Loading)   | 网络通信和HTML解析           |
| <span style="background: rgb(243,209,124);color: #fff;border: 1px;">黄色</span>(Scripting) | JavaScript执行               |
| <span style="background: rgb(175,153,235);color: #fff;border: 1px;">紫色</span>(Rendering) | 样式计算和布局，即重排       |
| <span style="background: rgb(144,193,233);color: #fff;border: 1px;">绿色</span>(Painting)  | 更改外观而不会影响布局，重绘 |
| <span style="background: rgb(222,222,222);color: #fff;border: 1px;">灰色</span>(other)     | 其它事件花费的时间           |
| <span style="background: #fff;color: #000;border: 1px;">白色</span>(Idle)      | 空闲时间                     |

> 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘
> 回流(重排)是布局或者几何属性需要改变就称为回流
> 
> 回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流

[性能优化的相关总结](https://justwe7.github.io/blog/%E6%B7%B1%E5%BA%A6%E7%9F%A5%E8%AF%86/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html#%E9%87%8D%E7%BB%98%EF%BC%88repaint%EF%BC%89%E5%92%8C%E5%9B%9E%E6%B5%81%EF%BC%88reflow%EF%BC%89)

#### NET
每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）
深色部分表示传输时间（下载第一个和最后一个字节之间的时间）

HTML：蓝色
CSS：紫色
JS：黄色
图片：绿色


> 感觉优化网络性能直接使用 network 面板就好了

### (3)Flame Chart 火焰图（线程面板）
详细的分析某些任务的详细耗时，从而定位问题

![image10bff.png](https://img.lihx.top/images/2020/07/07/image10bff.png)

#### 看到的几条虚线：
![20200708_184105.gif](https://img.lihx.top/images/2020/07/08/20200708_184105.gif)

- 蓝线代表 `DOMContentLoaded` 事件
- 绿线代表首次绘制的时间
  - FP: 首次绘制
  - FCP： 第一次丰富内容的绘图
  - FMP：第一次有意义的绘图
  - LCP： 最大区域内容绘制
- 红线代表 `load` 事件

> - `DOMContentLoaded`: 就是dom内容加载完毕。
> 那什么是dom内容加载完毕呢？我们从打开一个网页说起。当输入一个URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发 `DOMContentLoaded` 事件。而这段时间就是HTML文档被加载和解析完成。
>
> - `load`: 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在 `DOMContentLoaded` 被触发之后才触发。


#### Main
看下主线程，Devtools展示了主线程运行状况
- X轴代表着时间。每个长条代表着一个event。长条越长就代表这个event花费的时间越长。
- Y轴代表了调用栈（call stack）。在栈里，上面的event调用了下面的event

![image.png](https://img.lihx.top/images/2020/07/08/image.png)

如上图：click事件触发了 `script_foot_closure.js` 第53行的函数调用。
再看下面，Function Call 可以看到一个匿名函数被调用，然后调用 Me() 函数，然后调用 Se()，依此类推。

> DevTools为脚本分配随机颜色。在上图中，来自一个脚本的函数调用显示为浅绿色。来自另一个脚本的调用被渲染成米色。较深的黄色表示脚本活动，而紫色的事件表示渲染活动。这些较暗的黄色和紫色事件在所有记录中都是一致的。

![20200708_191952.gif](https://img.lihx.top/images/2020/07/08/20200708_191952.gif)

1. 在性能报告中，有很多的数据。可以通过双击，拖动等等动作来放大缩小报告范围，从各种时间段来观察分析报告
2. 在事件长条的右上角处，如果出现了红色小三角，说明这个事件是存在问题的，需要特别注意
3. 双击这个带有红色小三角的的事件。在Summary面板会看到详细信息。注意reveal这个链接，双击它会让高亮触发这个事件的event。如果点击了app.js:94这个链接，就会跳转到对应的代码处


### (4)Details 区域
一般要配合 `Flame Chart` 一起使用

- `summary` 区域是一个饼状图总览，汇总了各个事件类型所耗费的总时长，另外还有三个查看选项：
- `Bottom-Up` 选项卡：要查看直接花费最多时间的活动时使用
- `Call Tree` 选项卡：想查看导致最多工作的根活动时使用
- `Event Log` 选项卡：想要按记录期间的活动顺序查看活动时使用


### window.performance 对象
> Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。
>
> 实质上来说performance对象就是专门用于性能监测的对象，内置了几乎所有常用前端需要的性能参数监控。

- performance
  - `memory`
    - totalJSHeapSize: '可使用内存大小' // 单位 KB
    - usedJSHeapSize: '已使用内存大小'
    - jsHeapSizeLimit: '内存大小限制'
  - `navigation`
    - redirectCount: 0 //如果有重定向的话，页面通过几次重定向跳转而来
    - type: 0 
      > type的值：
      > 0  即TYPE_NAVIGATENEXT 正常进入页面（非刷新、非重定向等)
      > 1  即TYPE_RELOAD 通过window.location.reload()刷新的页面
      > 2  即TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
      > 255 即TYPE_UNDEFINED 非以上方式进入的页面
  - `onresourcetimingbufferfull` // 一个当resourcetimingbufferfull 事件触发时调用的EventHandler 这个事件当浏览器的资源时间性能缓冲区已满时会触发
    > 在onresourcetimingbufferfull属性上设置一个回调函数：
    > function buffer_full(event) {
    >   console.log("WARNING: Resource Timing Buffer is FULL!");
    >   performance.setResourceTimingBufferSize(200);
    > }
    > function init() {
    >   // Set a callback if the resource buffer becomes filled
    >   performance.onresourcetimingbufferfull = buffer_full;
    > }
    > `<body onload="init()">`
  - `timeOrigin`: 1594219100175.9412, // 返回性能测量开始时的时间的高精度时间戳
  - `timing`
    - navigationStart: '时间戳'， //在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload的时间戳，如果无前一个网页unload，则与fetchStart值相等；
    - unloadEventStart: 0, // 前一个网页（与当前页面同域）unload的时间戳，如果无前一个网页unload或者前一个网页与当前页面不同域，则值为0
    - unloadEventEnd:  0, //  和unloadEventStart 相对应，返回前一个网页unload事件绑定的回调函数执行王弼的时间戳
    - redirectStart:  0, // 第一个HTTP重定向发生时的时间，有跳转且是同域名内部的重定向才算，否则值为0
    - redirectEnd:  0, // 最后一个HTTP重定向完成时的时间，有跳转切尔是同域名内部的重定向才算，否则值为0
    - fetchStart: '时间戳'， // 浏览器准备好使用HTTP请求抓取文档的时间，这发生在检查本地缓存之前
    - domainLookupStart: '时间戳'， // DNS域名查询开始的时间，如果使用了本地缓存（即无DNS查询）或持久连接，则与fetchStart值相等
    - domainLookupEnd:  '时间戳'， // DNS域名查询完成的时间，如果使用了本地缓存（即 无DNS查询）或持久连接，则与fetchStart值相等
    - connectStart:  '时间戳'， // HTTP(TCP)开始建立连接的时间，如果是持久连接，则与fetchStart值相等；如果在传输层发生了错误且重新建立了连接，则这里显示的是新建立连接的时间
    - connectEnd:  '时间戳'， // HTTP(TCP)完成建立连接的时间（握手），如果是持久连接，则与fetchStart相等；如果是在传输层发生了错误且重新建立连接，则这里咸宁市的是新建立的连接完成的时间；这
    - secureConnectionStart:  0, // HTTPS连接开始的时间，如果不是安全连接，则值为0;
    - requestStart: '时间戳'， // HTTP请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存，连接错误时这里显示的是新建立的连接的时间
    - responseStart: '时间戳'， // HTTP开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
    - responseEnd: 0, // HTTP响应全部接收完毕的时间（获取到最后一个字节），包括从本地读取的缓存
    - domLoading: 0, // 开始解析渲染DOM树的时间，此时Document.readyState变为interactive，并将抛出readystatechange相关事件（这里只是DOM树解析完毕，这时候并没有开始加载网页内的
    - dominteractive: 0, // 完成解析DOM树的时间，Document,readyState变为interactive,并将抛出readystatechange相关事件（这时候并没有开始加载网页资源）
    - domContentLoadedEventStart: 0, // DOM解析完成后，网页内资源加载开始的时间，在DOMContentLoaded事件抛出之前发生
    - domContentLoadedEventEnd: 0, // DOM解析完成后，网页内资源加载完成的时间
    - domComplete: 0, // DOM树解析完成，且资源也准备就绪的时间，Document.readyState变为complete,并将抛出readystatechange相关事件
    - loadEventStart: 0, // load事件发送给文档，也即load回调函数开始执行的时间，如果没有绑定load事件，值为0
    - loadEventEnd: 0 // load事件的回调函数执行完毕的时间

## Memory 面板
> Memory 面板主要显示页面 JS 对象和相关联的 DOM 节点的内存分布情况


## Application 面板
> 记录网页加载的所有资源，包括存储信息、缓存信息以及页面用到的图片、字体、脚本、样式等信息

- Local Storage 如果你在开发过程中使用了local storage来存储键值对(KVPs)，那么你就可以通过Local Storage窗格来检查、新增、修改、删除这个键值对。
- Application Cache 你可以使用Application Cache窗格去查看通过Application Cache API创建的资源。
- Frames 将页面上的资源按frame类别进行组织显示。
- Service Worker 是一种Web离线应用解决方案，可以使你的应用先访问本地缓存资源，所以在离线状态时，在没有通过网络接收到更多的数据前，仍可以提供基本的功能

> [了解浏览器存储](https://segmentfault.com/a/1190000018748168)
> [Service Worker](https://www.cnblogs.com/dojo-lzz/p/8047336.html)

## Security 面板
> 用于检测当面页面的安全性

该面板可以区分两种类型的不安全的页面：
- 如果被请求的页面通过HTTP提供服务，那么这个主源就会被标记为不安全。
- 如果被请求的页面是通过HTTPS获取的，但这个页面接着通过HTTP继续从其他来源检索内容，那么这个页面仍然被标记为不安全。这就是所谓的混合内容页面,混合内容页面只是部分受到保护,因为HTTP内容(非加密的内容)可以被嗅探者入侵,容易受到中间人攻击。如163，虽然证书chrome是认可的，但是页面有一部分http资源：  
![imagee8ea4.png](https://img.lihx.top/images/2020/07/08/imagee8ea4.png)


## Audits 面板
> 审计面板会对页面的加载进行分析，然后给出提高页面性能的建议，官网建议查看 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) 来获得更多的页面加载建议


## Command 终极大招
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




## 参考
- [Chrome Network ，Size 和 Time 为什么有两行参数](https://juejin.im/post/5c78aa2ae51d4575e963dc62)
- [chrome 开发者工具](http://shouce.jb51.net/chrome/jian-cha-he-diao-shi-javascript/bian-li-dai-ma.html)
- [Google chrome-devtools](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)
- https://juejin.im/post/5c009115f265da612859d8e2
- https://zhuanlan.zhihu.com/p/29879682
- https://www.cnblogs.com/ranyonsue/p/9342839.html
- https://developer.mozilla.org/zh-CN/docs/Web/API/Performance
- https://juejin.im/post/5dd4a0de5188254f98605ff9



https://justcode.ikeepstudying.com/2018/09/chrome%E8%AE%BE%E7%BD%AE%E6%96%AD%E7%82%B9%E7%9A%84%E5%90%84%E7%A7%8D%E5%A7%BF%E5%8A%BF-js%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95%E5%BF%83%E5%BE%97-chrome-devtools-%E4%B8%AD%E8%B0%83%E8%AF%95-javascrip/

