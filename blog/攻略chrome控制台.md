---
tags: ['开发工具']
keywords: ['开发工具']
date: 2021-12-22
toc_max_heading_level: 3
---

## Console 面板
> 此章节请打开 [devtools/console/console.html](https://justwe7.github.io/devtools/console/console.html) 一起食用
>
> 一方面用来记录页面在执行过程中的信息（一般通过各种 console 语句来实现），另一方面用来当做 shell 窗口来执行脚本以及与页面文档、DevTools等进行交互

组合快捷键按键:  
Windows: `Control` + `Shift` + `J`  
Mac: `Command` + `Option` + `J`

<!-- truncate -->

首先看一下console对象下面都有哪些方法:  
![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image.png)

### console.clear()
顾名思义，清空控制台

### console.log(), info(), warn(), error()
日常用的比较多的就是这几个了，其中 `log` 和 `info`，印象中在2016年之前老用info打印，还是有区别的，`info` 输出的内容前面是有一个蓝色背景的小圈, 大概跟这个差不多: i，后来chrome更新就没了(IE还是可以看出差别的)

```js
console.log('普通信息')
console.info('提示性信息')
console.error('错误信息')
console.warn('警示信息')
```

![image344c2.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image344c2.png)

**使用占位符**

```js
// 支持逗号分隔参数，不需要每个参数都单独打印
console.log(1, '2', +'3')
// 占位符
// %s 
console.log('今晚%s老虎', '打', '？？？')
// %c 
console.log('今晚%s%c老虎', '打', 'color: red', '？？？')
// 带有占位符的参数之后的若干参数属于占位符的配置参数
```

![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/19/image.png)

其余的占位符列表还有：

| 占位符 | 功能          |
| ------ | ------------- |
| %s     | 字符串        |
| %d     | 整数          |
| %i     | 整数          |
| %f     | 浮点数        |
| %o     | 对象的链接    |
| %c     | css格式字符串 |

### console.time(), timeEnd()
`time` 和 `timeEnd` 一般放在一起用，传入一个参数用来标识起始位置用于统计时间:

```js
console.time('t')
Array(900000).fill({}).forEach((v, index) => v.index = index)
console.timeEnd('t')
// t: 28.18603515625ms
```
会打印出中间代码的执行时间

### console.count()
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

### console.trace()
用于追踪代码的调用栈，不用专门断点去看了
```js
console.trace()
function foo() {
  console.trace()
}
foo()
```

![imagebabdf.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/imagebabdf.png)

### console.table()
console.table()方法可以将复合类型的数据转为表格显示
```js
var arr = [
  { name: '梅西', qq: 10 },
  { name: 'C罗', qq: 7 },
  { name: '内马尔', qq: 11 },
]
console.table(arr)
```
![imageab741.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/imageab741.png)

### console.dir()
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
![image688f0.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image688f0.png)

打印 DOM 对象区别：   
![imagef2bad.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/imagef2bad.png)


### console.assert()
断言，用来进行条件判断。当表达式为false时，则显示错误信息，不会中断程序执行。

> 可以用于提示用户，内部状态不正确（把那个说假话的揪出来）
```js
var val = 1
console.assert(val === 1, '等于1')
console.assert(val !== 1, '不等于1')
console.log('代码往下执行呢啊')
```
![image68db1.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image68db1.png)

### console.group(), groupEnd()
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
![image4d2c2.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image4d2c2.png)

### $ 选择器
#### $_
可以记录上次计算的结果，直接用于代码执行:

![20200628_171742.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_171742.gif)

#### $0,$1...$4
代表最近5个审查元素**选中**过的DOM节点，看图（是要选中一下，我更喜欢用存储全局变量的方式玩，省的自己手残又选了一个节点）：

![20200628_164937.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_164937.gif)

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

![image538c8.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image538c8.png)

#### keys(), values()
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
与 `Save global variable` 结合使用神器

## Element 面板

> 此章节请打开 [devtools/element/element.html](https://justwe7.github.io/devtools/element/element.html) 一起食用
>
> 在 Elements 面板中可以通过 DOM 树的形式查看所有页面元素，同时也能对这些页面元素进行所见即所得的编辑

组合快捷键按键:  
Windows: `Control` + `Shift` + `C`  
Mac: `Command` + `Option` + `C`

### css 调试
#### style
选中目标节点，element面版，查看style->:hov,选择对应的状态即可

1.  
![image6a303.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image6a303.png)

2.  
![20200628_185451.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_185451.gif)

#### 查看placeholder的颜色
1. 打开开发者工具，点击右上角的`⚙`，进入 `Settings`
2. 找到 `Preferences` -> `Elements`，勾选 `Show user agent shadow DOM`
3. 然后在元素的 `Styles` 就能看到 `placeholder` 的颜色了

#### computed
有时候样式覆盖过多，查看起来很麻烦，`computed` 就派上用场了

![image1154d.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/image1154d.png)

> 点击某个样式可以直接跳转至对应css定义

#### 调整某个元素的数值
选中想要更改的值，按方向键上下就可以 `+ / -` 1个单位的值

> `alt + 方向键` 可以 ×10 调整单位值  
> `Ctrl + 方向键` 可以 ×100 调整单位值  
> `shift + 方向键` 可以 /10 调整单位  

### html 调试

#### 骚操作
选中节点，直接按键盘 `H` 可以直接让元素显示/隐藏，不用手动敲样式了，效果等同 `visibility: hidden`，还是要占据盒模型空间的。（记得把输入法改成英文~）

![20200628_191941.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_191941.gif)


#### 将某个元素存储到全局临时变量中
选中节点，右键，`Store as global variable`（在network面板中也能用，尤其是筛选接口的返回值很方便）

![20200628_192801.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_192801.gif)

#### 滚动到某个节点
如果页面很长，想找一个文本节点的显示位置又不想手动滑动可以试试 `Scroll into view`

![20200628_190729.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_190729.gif)


#### Edge 专属的3D视图
使用 chromium 后的 Edge 真的是改头换面，**3D 视图**可以帮忙定位一些定位层级还有DOM嵌套的问题，页面结构写的好不好看很直观的可以看出来(跟辅助功能里面的dom树结合使用很舒服)

![20200628_194515.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_194515.gif)

目前chrome还是没有这项功能的，Edge打开位置：控制台打开状态 => `Esc`打开抽屉 => `···`选择3D视图面板

### DOM 断点

可以监听到 DOM 节点的变更(子节点变动/属性变更/元素移除)，并断点至变更 DOM 状态的 js 代码行： 

![20200628_192344.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/06/28/20200628_192344.gif)


## Network 面板
> 可以查看通过网络请求的资源的相关详细信息

组合快捷键按键:  
Windows: `Control` + `Shift` + `I`   
Mac: `Command` + `Option` + `I`

按区域划分大概分为如下几个区域：  
![QQ20200719120526.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/19/QQ20200719120526.png)

1. `Controls` - 控制 Network 功能选项，以及一些展示外观
2. `Filters` - 控制在 Requests Table 中显示哪些类型的资源
   > tips：按住 Cmd (Mac) 或 Ctrl (Windows/Linux) 并点击筛选项可以同时选择多个筛选项
3. `Overview` - 此图表显示了资源检索时间的时间线。如果看到多条竖线堆叠在一起，则说明这些资源被同时检索
4. `Requests Table` - 此表格列出了检索的每一个资源。 默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。 提示：右键点击 Timeline 以外的任何一个表格标题可以添加或移除信息列
5. `Summary` - 可以一目了然地看到页面的请求总数、传输的数据总量、加载时间


### （1、2）Controls，Filters区域
![imagee28b2.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/04/imagee28b2.png)

Filters 控制的展示：
- **使用大请求行** - 默认情况下，`Requests Table`一个资源只显示很小的一行。选中`Use large resource rows`(使用大资源行)按钮可以显示两个文本字段：主要字段和次要字段。
- **捕获屏幕截图** - 将鼠标悬停在某个屏幕截图上的时候，Timeline/Waterfall(时间轴)会显示一条垂直的黄线，指示该帧是何时被捕获的
- **显示概述** - 展示页面整个生命周期的各个阶段（Overview区域）的耗时（蓝色绿色的那些横杠）

**only show blocked requests**
假如遇到network抓不到任何请求，检查也不是filter和recording的原因的话，可以看看是不是因为设置了仅显示已阻止请求的勾选：  
![2021-03-0415.04.53.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2021/03/04/2021-03-0415.04.53.gif)

### （3） Overview区域
页面整个生命周期的各个阶段网络资源加载耗时信息的汇总，可以选择区域来筛选 `Requests Table` 的详细资源信息

### (4) Requests Table区域

标题栏的对应描述：

- `Name`**(名称)**: 资源的名称。
- `Status`**(状态)**: HTTP状态代码。
- `Type`**(类型)**: 请求的资源的MIME类型。
- `Initiator`**(发起)**: 发起请求的对象或进程。它可能有以下几种值：
  - `Parser`**(解析器)**: Chrome的HTML解析器发起了请求。
  - `Redirect`**(重定向)**: HTTP重定向启动了请求。
  - `Script`**(脚本)**: 脚本启动了请求。
  - `Other`**(其他)**: 一些其他进程或动作发起请求，例如用户点击链接跳转到页面，或在地址栏中输入网址。
- `Size`**(大小)**: 响应头的大小（通常是几百字节）加上响应数据，由服务器提供。
- `Time`**(时间)**: 总持续时间，从请求的开始到接收响应中的最后一个字节
- `Timeline/Waterfall`**(时间轴)**: 显示所有网络请求的可视化统计信息

> 在标题栏如(Name上)右键，可以添加或删除信息列。比如可以多加一列 Response Header => Content-Encoding 选项来总览页面资源的gzip压缩情况:

![image11f8b.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image11f8b.png)

#### 重新发起`xhr`请求
在平时和后端联调时，我们用的最多的可能就是`Network`面板了。但是每次想重新查看一个请求通过刷新页面、点击按钮等方式去触发`xhr`请求，这种方式有时显得会比较麻烦，可以通过`Replay XHR`的方式去发起一条新的请求：

![20200720_143313.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/20/20200720_143313.gif)


#### 查看HTTP相关信息
**查看网络请求的参数**

可以通过点击 `query string parameters` (查询字符串参数)旁边的 `view URL encoded` (查看URL编码)或 `view decoded` (查看解码)链接，查看URL编码或解码格式的 `query string parameters` (查询字符串参数)。在使用postman复制相关入参时尤其实用。

![image85eb1.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image85eb1.png)


**查看HTTP响应内容**
点击Response(响应)标签页可以查看该资源未格式化的HTTP响应内容

> 接口的返回值(在preview中）同样也可以 `Save global variable` 存储一个全局变量  
![20200705_111751.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/20200705_111751.gif)


#### Size 和 Time 为什么有两行参数？
![image08194.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image08194.png)

##### 关于Size列
`Size`有两行：

- 第一行表示的是数据的**传输时**的大小，例如上图中的`190KB`
- 第二行表示的是数据**实际**的大小`708KB`

> 在服务器端采取`gzip`压缩算法将原有`708KB`压缩至`190KB`,传输大小缩短`3.7倍`，大大的提高了资源传输的效率

**需要注意的点：**

`gzip`压缩只会压缩`响应体`内容，所以适用于返回数据量大的时候，如果数据量太小的话，有可能会导致数据**传输时**的大小比**实际**大小要大(*加入了一些额外的响应头*)

##### 关于Time列
Time有两行：

- 第一行表示从客户端发送请求到服务端返回所有数据所花费的总时间，对于上图来说就是`471ms`
- 第二行表示的是从客户端发送请求到服务器端返回第一个字节所表示的时间，对于上图来说就是`55ms`

> 第一行的时间代表了所有项目：例如`解析dns`，`建立连接`，`等待服务器返回数据`，`传输数据`等
> 
> 第二行的时间是 `总时间 - 数据传输`的时间


从上面的分析中我们看到 从**客户端请求到服务器处理结束准备返回数据**花了`55ms`，但是在进行**传输数据**的时候花费了`471ms`

对于网慢的用户来说，可能会耗费更长的时间，所以在写代码（接口）的时候，返回的数据量要尽量精简


#### Waterfall
点击某个资源会展示出详细的网络加载信息：
<!-- ![image2e1ab.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image2e1ab.png) -->

![image143a7.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/19/image143a7.png)

相关字段描述:

- `Queuing` (排队)
  > 浏览器在以下情况下对请求排队
  > 1. 存在更高优先级的请求,请求被渲染引擎推迟，这经常发生在 images（图像）上,因为它被认为比关键资源（如脚本/样式）的优先级低。
  > 2. 此源已打开六个 TCP 连接，达到限值，仅适用于 HTTP/1.0 和 HTTP/1.1。在等待一个即将被释放的不可用的TCP socket
  > 3. 浏览器正在短暂分配磁盘缓存中的空间，生成磁盘缓存条目（通常非常快）
- `Stalled` (停滞) - 发送请求之前等待的时间。它可能因为进入队列的任意原因而被阻塞，这个时间包括代理协商的时间。请求可能会因 Queueing 中描述的任何原因而停止。
- `DNS lookup` (DNS查找) - 浏览器正在解析请求IP地址，页面上的每个新域都需要完整的往返(roundtrip)才能进行DNS查找
- `Proxy Negotiation` - 浏览器正在与代理服务器协商请求
- `initial connection` (初始连接) - 建立连接所需的时间，包括TCP握手/重试和协商SSL。
- `SSL handshake` (SSL握手) - 完成SSL握手所用的时间
- `Request sent` (请求发送) - 发出网络请求所花费的时间，通常是几分之一毫秒。
- `Waiting` (等待) - 等待初始响应所花费的时间，也称为`Time To First Byte`(接收到第一个字节所花费的时间)。这个时间除了等待服务器传递响应所花费的时间之外，还包括1次往返延迟时间及服务器准备响应所用的时间（服务器发送数据的延迟时间）
- `Content Download`(内容下载) - 接收响应数据所花费的时间(从接收到第一个字节开始，到下载完最后一个字节结束)
- `ServiceWorker Preparation` - 浏览器正在启动Service Worker
- `Request to ServiceWorker` - 正在将请求发送到Service Worker
- `Receiving Push` - 浏览器正在通过 HTTP/2 服务器推送接收此响应的数据
- `Reading Push` - 浏览器正在读取之前收到的本地数据

![image7dd79.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image7dd79.png)


### (5) Summary 区域

![imagef7b67.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/imagef7b67.png)

`requests` 查看请求的总数量 | `transferred` 查看请求的总大小 | `resources` 资源 | `Finish` 所有http请求响应完成的时间 | DOMContentLoaded时间 | load时间  

当页面的初始的标记被解析完时，会触发 `DOMContentLoaded`。 它在Network(网络)面板上的显示：
- 在 Overview (概览)窗格中的蓝色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)窗格中，您可以查看事件的确切时间。
![image4af35.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image4af35.png)

当页面完全加载时触发 `load` 事件。 它显示也显示在：
- 在 Overview (概览)窗格的红色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)中，可以查看改事件的确切时间
![imagee4d7e.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/imagee4d7e.png)

> DOMContentLoaded 会比 Load 时间小，两者时间差大致等于外部资源加载（一般是图片/字体）的时间
>
> Finish 时间是页面上所有 http 请求发送到响应完成的时间（如果页面存在一个轮询的接口，这个值也会累加的）。HTTP1.0/1.1 协议限定单个域名的请求并发量是 6 个，即Finish是所有请求（不只是XHR请求，还包括DOC，img，js，css等资源的请求）在并发量为6的限制下完成的时间。
> - Finish 的时间比 Load 大，意味着页面有相当部分的请求量
> - Finish 的时间比 Load 小，意味着页面请求量很少，如果页面是只有一个 html文档请求的静态页面，Finish时间基本就等于HTML文档请求的时间
> 
> 所以Finish 时间与DOMContentLoaded 和 Load 并无直接关系


### 使用Network面板进行网络优化
> 参考Network面板可以针对Network提出一些优化建议

#### 排队或停止阻塞 

最常见的问题是很多个请求排队或被阻塞。这表示从单个客户端检索的资源太多。在HTTP 1.0/1.1连接协议中，Chrome限制每个域名最多执行6个TCP连接。如果一次请求十二个资源，前6个将开始，后6个将排队。一旦其中一个请求完成，队列中的第一个请求项目将开始其请求过程。

![一系列被阻塞的请求](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/imageef7ae.png)

要解决传统HTTP 1的此问题，需要用多个子域名提供服务资源，将资源拆分到多个子域中，均匀分配。

> 上面说的修复HTTP 1连接数问题，不适用于HTTP 2连接，如果已部署HTTP 2，不要对资源进行域划分，因为它会影响HTTP 2的工作原理（在HTTP 2中TCP连接多路复用连接的）。取消了HTTP 1的6个连接限制，并且可以通过单个连接同时传输多个资源。

#### 接收到第一个字节的时间很慢 

绿色的块占据比例很高：

![高TTFB示例](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/image23444.png)

TTFB就是等待第一个响应字节的时间，建议在200ms以下，以下情况可能会导致高TTFB:

1. 客户端和服务器之间的网络条件差
2. 要么，服务器端程序响应很慢

> 为了解决高TTFB，首先去排除尽可能多的网络连接。理想情况下，在本地托管应用程序（部署在本地），并查看是否仍有一个大的TTFB。如果有，那么需要优化应用程序针的响应速度。这可能意味着优化数据库查询，为内容的某些部分实现高速缓存，或修改Web服务器配置。后端可能很慢的原因有很多。您需要对您的程序进行研究，并找出不符合您预期的内容。
>
> 如果本地TTFB低，那么是您的客户端和服务器之间的网络问题。网络传输可能被很多种事情干扰阻碍。在客户端和服务器之间有很多点，每个都有自己的连接限制，可能会导致问题。测试减少这种情况的最简单的方法是将您的应用程序放在另一台主机上，看看TTFB是否改进。

#### 加载缓慢 

蓝色的块占据比例很高：

![高TTFB示例](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/imageae084.png)

如果 `Content Download` (内容下载)阶段花费了很多时间，提高服务响应速度、并行下载等优化措施帮助都不大。 主要的解决方案是发送更少的字节（比如一张高质量的大图可能几M的大小，这时可以酌情优化一下图片的宽高/清晰度）


## Sources 面板
> 此章节请打开 [/devtools/debug-js/get-started.html](https://justwe7.github.io/devtools/debug-js/get-started.html) 一起食用
>
> 主要用来调试页面中的 JavaScript

### 自定义代码片段 Snippets
> 我们经常有些 `JavaScript` 的代码想在控制台中调试，假如代码量多的情况下直接在 `console` 下写比较麻烦，或者我们经常有些代码片段(防抖、节流、获取地址栏参数等)想保存起来，每次打开 `Devtools` 都能获取到这些代码片段，而不用再去从笔记里面找。

如图所示，在 `Sources` 这个`tab`栏下，有个 `Snippets` 标签，在里面可以添加一些常用的代码片段。（当个小笔记本）

![20200705_114001.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/05/20200705_114001.gif)

### 设置断点

#### 断点的面板

![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/07/image.png)

![image0187f.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/image0187f.png)


#### 指定位置的中断
[断点调试基本流程](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)

找到源代码，点击要中断代码执行的位置，点击红色按钮的位置。然后再触发该方法执行，因为已知点击按钮可以触发，精准的定位到代码行就可以了:

![20200709_225251.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/20200709_225251.gif)


#### 全局事件中断
假如不知道代码执行的位置，如以下场景：

![imagee7a93.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imagee7a93.png)

看接口返回的列表总数应该是20条，但是页面到15条就显示到底部了


![imagecc38e.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imagecc38e.png)

看代码写的判断条件有点问题，但从编译后的代码找到对应位置进行调试就相当于大海捞针了。想试试自己的设想的解决方式是否正确：   
1. 因为列表是提拉加载，所以肯定会触发网络请求，可以在事件侦听器里面打一个 `XHR` 的断点
2. 然后提拉加载页面触发接口请求，如预期的，代码中断执行了。但提示找不到sourcemap，暂时把js的资源映射给关掉[(相关解决方式)](https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e)：
  ![imageaadd2.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imageaadd2.png)
  ![imaged604f.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imaged604f.png)
3. 再次触发断点，发现可以查看到中断的代码了，因为肯定是页面中的业务代码将请求推入到执行堆栈的，所以可以在堆栈中找到对应的方法名：`getVideoList`
   
   ![image003b6.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/image003b6.png)
4. 点击方法名可以跳转到对应的源码，可以看到圈起来的代码和所猜想的问题代码应该是同一处
  ![imageb8ea4.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imageb8ea4.png)
5. 回过来看下问题原因： 页面请求完新数据后直接 `pageNum` 自增，然后直接就用于是否结束的判断了，有点不够严谨，不如直接比对当前的列表长度与接口返回的数据总数来判断: 
   ![imaged4077.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imaged4077.png)
6. 记住要修改的代码，在这个文件开头，也就是 `191.xxx.js` 
   1. 第一行先打个断点，push 方法之前再打一个断点: ![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/image.png) (如果没有再刷新一下(也不清楚为什么可能会没有))
   2. 然后刷新页面，找到刚刚想要修改的代码: 用 `t.recommendList.length` 替换掉 `n.pageSize*t.pageNo`（前两步是为了避免js开始解析问题代码，先阻塞一下运行: [stackoverflow](https://stackoverflow.com/questions/6657229/how-can-i-edit-javascript-in-my-browser-like-i-can-use-firebug-to-edit-css-html)）
7. 再`Ctrl + S`，保存一下，然后看下页面效果，列表可以全部加载出来了:
![imagea80ad.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imagea80ad.png)

> 在美化代码的面板中是不支持直接修改页面代码的

#### 黑盒模式
把脚本文件放入Blackbox(黑盒)，可以忽略来自第三方库的调用堆栈

默认（不开启黑盒）：  
![image70101.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/image70101.png)

开启黑盒：  
![imagec7749.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/06/imagec7749.png)

- 打开方式①  
  1. 打开 DevTools `Settings` (设置)
  2. 在左侧的导航菜单中，单击 `Blackboxing` (黑箱)
  3. 点击 `Add pattern...` (添加模式)按钮。
  4. 在 `Pattern`(模式)文本框输入您希望从调用堆栈中排除的文件名模式。DevTools 会排除该模式匹配的任何脚本。
  5. 在文本字段右侧的下拉菜单中，选择 `Blackbox` (黑箱)以执行脚本文件但是排除来自调用堆栈的调用，或选择 `Disabled` (禁用)来阻止文件执行。
  6. 点击`Add`(添加) 保存

- 打开方式②   
直接在想要忽略的堆栈信息上 `blackbox script`

#### DOM断点
查看element 面板[DOM 断点](#dom-断点)

## Performance 面板
> 此章节请使用**Chrome的隐身模式**打开 [/devtools/jank/index.html](https://justwe7.github.io/devtools/jank/index.html) 一起食用
> 隐身模式可以保证Chrome在一个相对干净的环境下运行。假如安装了许多chrome插件，这些插件可能会影响分析性能表现
> 
> 在 Performance 面板可以查看页面加载过程中的详细信息，比如在什么时间开始做什么事情，耗时多久等等。相较于 Network 面板，不仅可以看到通过网络加载资源的信息，还能看到解析 JS、计算样式、重绘等页面加载的方方面面的信息

### 面板主要的区域划分：

1. `Controls` - 开始记录，停止记录和配置记录期间捕获的信息
2. `Overview` - 页面性能的汇总
3. `Flame Chart` - [火焰图(线程面板)]。在火焰图上看到三条（绿色的有好几条）垂直的虚线：
   - 蓝线代表 `DOMContentLoaded` 事件
   - 绿线代表首次绘制的时间
   - 红线代表 `load` 事件
4. `Details` - 在Flame Chart中，选择了某一事件后，这部分会展示与这个事件相关的更多信息；
   > 如果选择了某一帧，这部分会展示与选中帧相关的信息。如果既没有选中事件也没有选中帧，则这部分会展示当前记录时间段内的相关信息。

![imagef4dfb.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/07/imagef4dfb.png)

### 开始记录
1. 首先点击控制条左边的第一个圆圈，开始记录日志
2. 等待几分钟(正常操作页面)
3. 点击Stop按钮，Devtools停止录制，处理数据，然后显示性能报告

然后就会出来上图的内容

> 与台式机和笔记本电脑相比移动设备的 CPU 功率要小得多。无论何时分析页面，都使用 CPU 限制来模拟页面在移动设备上的表现。
> 在"开发工具"中，单击"性能"选项卡。
> 确保启用"屏幕截图"复选框。
> 单击"捕获设置"。 Capture SettingsDevTools 揭示了与如何捕获性能指标相关的设置。
> 对于CPU，选择 2 倍减速。DevTools 会限制CPU使其速度比平时慢 2 倍

> 注意：如果想要确保它们在低端移动设备上运行良好，请将 CPU 限制设置为 20 倍减速。

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
![imagee53ec.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/07/imagee53ec.png)

#### FPS
绿色竖线越高，FPS 越高。 FPS 图表上的红色块(上图刚开始的部分)表示长时间帧，很可能会出现卡顿。经常打游戏肯定知道这个指标代表什么，`120FPS` 代表流畅（手动滑稽） 

火焰图的 `FPS` 可以量化这项参数

> FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在60的FPS的话，那么用户体验就是不错的
>
> Q: 为什么是60fps?
> 
> A: 我们的目标是保证页面要有高于每秒60fps(帧)的刷新频率，这和目前大多数显示器的刷新率相吻合(60Hz)。如果网页动画能够做到每秒60帧，就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，一秒之内进行60次重新渲染，每次重新渲染的时间不能超过16.66毫秒


#### CPU
CPU 资源。**此面积图指示消耗 CPU 资源的事件类型**。在CPU图表中的各种颜色与 `Summary` 面板里的颜色是相互对应的，`Summary` 面板就在 `Performance` 面板的下方。CPU图表中的各种颜色代表着在这个时间段内，CPU在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索

##### CPU 资源面积图颜色划分:
| 颜色        | 执行内容               |
| ------------------------------------------------------------------------------------------ | ---------------------------- |
| <span style={{background: 'rgb(144,183,233)', color: '#fff' }}>蓝色</span>(Loading)   | 网络通信和HTML解析           |
| <span style={{background: 'rgb(243,209,124)', color: '#fff' }}>黄色</span>(Scripting) | JavaScript执行               |
| <span style={{background: 'rgb(175,153,235)', color: '#fff' }}>紫色</span>(Rendering) | 样式计算和布局，即重排       |
| <span style={{background: 'rgb(144,193,233)', color: '#fff' }}>绿色</span>(Painting)  | 更改外观而不会影响布局，重绘 |
| <span style={{background: 'rgb(222,222,222)', color: '#fff' }}>灰色</span>(other)     | 其它事件花费的时间           |
| <span style={{background: '#fff', color:' #000' }}>白色</span>(Idle)                  | 空闲时间                     |

> 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘
> 回流(重排)是布局或者几何属性需要改变就称为回流
> 
> 重排必定会发生重绘，重绘不一定会引发重排。重排所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列重排

js修改dom结构或样式 -> 计算style -> layout(重排) -> paint(重绘) -> composite(合成)

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

![image10bff.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/07/image10bff.png)

#### 看到的几条虚线：
![20200708_184105.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/08/20200708_184105.gif)

- 蓝线代表 `DOMContentLoaded` 事件
- 绿线代表首次绘制的时间
  - FP(First Paint): 首次绘制
  - FCP(First Contentful Paint)： 第一次丰富内容的绘图
  - FMP(First Meaningful Paint)：第一次有意义的绘图
  - LCP(Largest Contentful Paint)： 最大区域内容绘制
- 红线代表 `load` 事件

> - `DOMContentLoaded`: 就是dom内容加载完毕。
> 那什么是dom内容加载完毕呢？打开一个网页当输入一个URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发 `DOMContentLoaded` 事件。而这段时间就是HTML文档被加载和解析完成。
>
> - `load`: 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在 `DOMContentLoaded` 被触发之后才触发。


#### Main
看下主线程，Devtools展示了主线程运行状况
- X轴代表着时间。每个长条代表着一个event。长条越长就代表这个event花费的时间越长。
- Y轴代表了调用栈（call stack）。在栈里，上面的event调用了下面的event

Google官方文档的例子：

![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/08/image.png)

如上图：click事件触发了 `script_foot_closure.js` 第53行的函数调用。
再看下面，Function Call 可以看到一个匿名函数被调用，然后调用 Me() 函数，然后调用 Se()，依此类推。

> DevTools为脚本分配随机颜色。在上图中，来自一个脚本的函数调用显示为浅绿色。来自另一个脚本的调用被渲染成米色。较深的黄色表示脚本活动，而紫色的事件表示渲染活动。这些较暗的黄色和紫色事件在所有记录中都是一致的。

![20200708_191952.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/08/20200708_191952.gif)

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

#### performance API

<details>
<summary>performance API</summary>

- `memory`
  - totalJSHeapSize: '可使用内存大小' // 单位 KB
  - usedJSHeapSize: '已使用内存大小'
  - jsHeapSizeLimit: '内存大小限制'
- `navigation`
  - redirectCount: 0 
    > 如果有重定向的话，页面通过几次重定向跳转而来
  - type: 0 
    > 类似于小程序定义的场景值，type的值：
    > 0  即TYPE_NAVIGATENEXT 正常进入页面（非刷新、非重定向等)
    > 1  即TYPE_RELOAD 通过window.location.reload()刷新的页面
    > 2  即TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
    > 255 即TYPE_UNDEFINED 非以上方式进入的页面
- `onresourcetimingbufferfull` // 一个当resourcetimingbufferfull 事件触发时调用的EventHandler 这个事件当浏览器的资源时间性能缓冲区已满时会触发
  ```js
  function buffer_full(event) {
  // 在onresourcetimingbufferfull属性上设置一个回调函数：
    console.log("WARNING: Resource Timing Buffer is FULL!");
    performance.setResourceTimingBufferSize(200);
  }
  function init() {
    // Set a callback if the resource buffer becomes filled
    performance.onresourcetimingbufferfull = buffer_full;
  }
  <body onload="init()">
  ```
- `timeOrigin`: 1594219100175.9412 
  > 返回性能测量开始时的时间的高精度时间戳
- `timing`
  - navigationStart: '时间戳'
    > 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload的时间戳，如果无前一个网页unload，则与fetchStart值相等；
  - unloadEventStart: 0
    > 前一个网页（与当前页面同域）unload的时间戳，如果无前一个网页unload或者前一个网页与当前页面不同域，则值为0
  - unloadEventEnd:  0
    >  和unloadEventStart 相对应，返回前一个网页unload事件绑定的回调函数执行王弼的时间戳
  - redirectStart:  0
    > 第一个HTTP重定向发生时的时间，有跳转且是同域名内部的重定向才算，否则值为0
  - redirectEnd:  0
    > 最后一个HTTP重定向完成时的时间，有跳转切尔是同域名内部的重定向才算，否则值为0
  - fetchStart: '时间戳'
    > 浏览器准备好使用HTTP请求抓取文档的时间，这发生在检查本地缓存之前
  - domainLookupStart: '时间戳'
    > DNS域名查询开始的时间，如果使用了本地缓存（即无DNS查询）或持久连接，则与fetchStart值相等
  - domainLookupEnd: '时间戳'
    > DNS域名查询完成的时间，如果使用了本地缓存（即 无DNS查询）或持久连接，则与fetchStart值相等
  - connectStart: '时间戳'
    > HTTP(TCP)开始建立连接的时间，如果是持久连接，则与fetchStart值相等；如果在传输层发生了错误且重新建立了连接，则这里显示的是新建立连接的时间
  - connectEnd: '时间戳'
    > HTTP(TCP)完成建立连接的时间（握手），如果是持久连接，则与fetchStart相等；如果是在传输层发生了错误且重新建立连接，则这里咸宁市的是新建立的连接完成的时间；这
  - secureConnectionStart: 0
    > HTTPS连接开始的时间，如果不是安全连接，则值为0;
  - requestStart: '时间戳'
    > HTTP请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存，连接错误时这里显示的是新建立的连接的时间
  - responseStart: '时间戳'
    > HTTP开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
  - responseEnd: 0
    > HTTP响应全部接收完毕的时间（获取到最后一个字节），包括从本地读取的缓存
  - domLoading: 0
    > 开始解析渲染DOM树的时间，此时Document.readyState变为interactive，并将抛出readystatechange相关事件（这里只是DOM树解析完毕，这时候并没有开始加载网页内的
  - dominteractive: 0
    > 完成解析DOM树的时间，Document,readyState变为interactive,并将抛出readystatechange相关事件（这时候并没有开始加载网页资源）
  - domContentLoadedEventStart: 0
    > DOM解析完成后，网页内资源加载开始的时间，在DOMContentLoaded事件抛出之前发生
  - domContentLoadedEventEnd: 0
    > DOM解析完成后，网页内资源加载完成的时间
  - domComplete: 0
    > DOM树解析完成，且资源也准备就绪的时间，Document.readyState变为complete,并将抛出readystatechange相关事件
  - loadEventStart: 0
    > load事件发送给文档，也即load回调函数开始执行的时间，如果没有绑定load事件，值为0
  - loadEventEnd: 0
    > load事件的回调函数执行完毕的时间

</details>

#### 几个实用的API
##### performance.now()方法
`performance.now()` 返回 `performance.navigationStart` 至当前的毫秒数。
`performance.navigationStart` 是下文将介绍到的可以说是浏览器访问最初的时间测量点。

值得注意的两点：
- 测量初始点是浏览器访问最初测量点，或者理解为在地址栏输入URL后按回车的那一瞬间。
- 返回值是毫秒数，但带有精准的多位小数。

用performance.now()检测js代码的执行时间(毫秒):
```js
  var st = performance.now();
  console.log(Array(9999999).fill(null).filter(v => !v).length);
  var end = performance.now();
  console.log(`取值时间${end - st}ms`); // 取值时间558.7849999992759ms
```

#### performance.navigation
performance.navigation负责纪录用户行为信息，只有两个属性:
- `redirectCount`
  - 如果有重定向的话，页面通过几次重定向跳转而来
- `type`
  - type的值：
  - 0  即 `TYPE_NAVIGATENEXT` 正常进入页面（非刷新、非重定向等)
  - 1  即 `TYPE_RELOAD` 通过window.location.reload()刷新的页面
  - 2  即 `TYPE_BACK_FORWARD` 通过浏览器的前进后退按钮进入的页面（历史记录）
  - 255 即 `TYPE_UNDEFINED` 非以上方式进入的页面
```js
  console.log(performance.navigation); // PerformanceNavigation {type: 1, redirectCount: 0}
```

##### performance.timing
`timing` 内包含了几乎所有时序的时间节点

可以通过此字段来统计页面相关事件的发生时长：  
```js
function getTiming() {
  try {
    var timing = performance.timing;
    var timingObj = {};

    var loadTime = (timing.loadEventEnd - timing.loadEventStart) / 1000;

    if(loadTime < 0) {
      setTimeout(function() {
        getTiming();
      }, 0);
      return;
    }

    timingObj['重定向时间'] = (timing.redirectEnd - timing.redirectStart);
    timingObj['DNS解析时间'] = (timing.domainLookupEnd - timing.domainLookupStart);
    timingObj['TCP完成握手时间'] = (timing.connectEnd - timing.connectStart);
    timingObj['HTTP请求响应完成时间'] = (timing.responseEnd - timing.requestStart);
    timingObj['DOM开始加载前所花费时间'] = (timing.responseEnd - timing.navigationStart);
    timingObj['DOM加载完成时间'] = ((timing.domComplete || timing.domLoading) - timing.domLoading);
    timingObj['DOM结构解析完成时间'] = (timing.domInteractive - timing.domLoading);
    timingObj['总体网络交互耗时，即开始跳转到服务器资源下载完成时间'] = (timing.responseEnd - timing.navigationStart);
    timingObj['可交互的时间'] = (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart);
    timingObj['首次出现内容'] = (timing.domLoading - timing.navigationStart);
    timingObj['onload事件时间'] = (timing.loadEventEnd - timing.loadEventStart);
    timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);

    for(item in timingObj) {
      console.log(item + ":" + timingObj[item] + '(ms)');
    }

    console.log(performance.timing);

  } catch(e) {
    console.log(performance.timing);
  }
}
window.onload = getTiming()
```

##### performance.memory
用于显示当前的内存占用情况
```js
console.log(performance.memory)
/* {
  jsHeapSizeLimit: 4294705152,
  totalJSHeapSize: 13841857,
  usedJSHeapSize: 12417637
} */
```
- usedJSHeapSize表示：JS 对象（包括V8引擎内部对象）占用的内存数
- totalJSHeapSize表示：可使用的内存
- jsHeapSizeLimit表示：内存大小限制

> 通常，`usedJSHeapSize` 不能大于 `totalJSHeapSize`，如果大于，有可能出现了内存泄漏。

##### performance.getEntries()
浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个HTTP请求。`performance.getEntries` 方法以数组形式，返回一个 `PerformanceEntry` 列表，这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员

- `name`：资源的链接
- `duration`: 资源的总耗时（包括等待时长，请求时长，响应时长 相当于responseEnd - startTime）
- `entryType`: 资源类型，entryType类型不同数组中的对象结构也不同:
  | 值         | 该类型对象                  | 描述                                                             |
  | ---------- | --------------------------- | ---------------------------------------------------------------- |
  | mark       | PerformanceMark             | 通过mark()方法添加到数组中的对象                                 |
  | measure    | PerformanceMeasure          | 通过measure()方法添加到数组中的对象                              |
  | paint      | PerformancePaintTiming      | 值为first-paint'首次绘制、'first-contentful-paint'首次内容绘制。 |
  | resource   | PerformanceResourceTiming   | 所有资源加载时间，用处最多                                       |
  | navigation | PerformanceNavigationTiming | 现除chrome和Opera外均不支持，导航相关信息                        |
  | frame      | PerformanceFrameTiming      | 现浏览器均未支持                                                 |
- `initiatorType`: 如何发起的请求,初始类型（注意这个类型并不准确，例如在css中的图片资源会这个值显示css，所以还是推荐用name中的后缀名）
  | 发起对象                             | 值                       | 描述                                                   |
  | ------------------------------------ | ------------------------ | ------------------------------------------------------ |
  | a Element                            | link/script/img/iframe等 | 通过标签形式加载的资源，值是该节点名的小写形式         |
  | a CSS resource                       | css                      | 通过css样式加载的资源，比如background的url方式加载资源 |
  | a XMLHttpRequest object              | xmlhttprequest/fetch     | 通过xhr加载的资源                                      |
  | a PerformanceNavigationTiming object | navigation               | 当对象是PerformanceNavigationTiming时返回              |

##### performance.getEntriesByType()
方法返回给定类型的 getEntries 列表
[打开页面](https://justwe7.github.io/devtools/network/queue.html)

> 这段代码可以在DevTools控制台中运行。它将使用`Resource Timing API`(资源时序API)来检索所有资源。然后它过滤条目，查找包含`logo-1024px.png`名称的条目。如果找到，会返回相关信息。

```js
performance
  .getEntriesByType('resource')
  .filter(item => item.name.includes('logo-1024px.png'))
```

注意:  
返回资源的 `connectEnd` 等相关字段不是 `Unix` 时间戳，而是 `DOMHighResTimeStamp`。 [MDN PerformanceResourceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming)

> `DOMHighResTimeStamp` 是一个double类型，用于存储时间值。该值可以是离散的时间点或两个离散时间点之间的时间差。T单位为毫秒 ms (milliseconds) ，应准确至5微秒 µs (microseconds)。但是，如果浏览器无法提供准确到5微秒的时间值(例如,由于硬件或软件的限制), 浏览器可以以毫秒为单位的精确到毫秒的时间表示该值

## Lighthouse(Audits) 面板
> 来自Google的描述： Lighthouse 是一个开源的自动化工具，用于改进网络应用的质量。 您可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。 您为 Lighthouse 提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告
> 
> 会对页面的加载进行分析，然后给出提高页面性能的建议

懒人专用👍

![imagee4183.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/imagee4183.png)

有5个指标:
- `Performance` 性能
- `accessibility` 无障碍使用
- `Best Practice` 用户体验
- `SEO` SEO优化
- `Progressive Web App` 页对于PWA的兼容性

## Memory 面板
> Memory 面板主要显示页面 JS 对象和相关联的 DOM 节点的内存分布情况

开始录制前先点击下垃圾回收 -> 点击开始录制。如果JS堆内存动态分配时间线，结束之前要再点击下垃圾回收，再结束录制

![image258e7.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/image258e7.png)

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
- 如果被请求的页面是通过HTTPS获取的，但这个页面接着通过HTTP继续从其他来源检索内容，那么这个页面仍然被标记为不安全。这就是所谓的混合内容页面,混合内容页面只是部分受到保护,因为HTTP内容(非加密的内容通信使用明文)可能会被窃听,容易受到中间人攻击。如163，虽然证书是有效的，但是页面有一部分http资源：  
![imagee8ea4.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/08/imagee8ea4.png)


## Command 终极大招
在控制台打开的状态下， 组合按键 `Ctrl + Shift + P` 打开“命令”菜单，接下来就可以为所欲为了~

### 截图
当你只想对一个特别的 `DOM` 节点进行截图时，你可能需要使用其他工具弄半天，但现在你直接选中那个节点，打开 命令（`Command`） 菜单并且使用 `节点截图` 就可以了
截取特定节点对应上图命令是`Screenshot Capture node screenshot`
不只是这样，你同样可以用这种方式 实现`全屏截图`：通过 `Screenshot Capture full size screenshot` 命令

### CSS/JS 覆盖率
- 打开调试面板，用快捷键 `shift+command+P （mac）`输入 `Show Coverage` 调出相应面板
- 点击`reload` 按钮开始检测 ![image1719a.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/20/image1719a.png)  
- 点击相应文件即可查看具体的覆盖情况（蓝色的为用到的代码，红色表示没有用到的代码）!![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/20/image.png)

### 媒体查询
媒体查询是自适应网页设计的基本部分。
在Chrome Devtools中的设备模式下，在三圆点菜单点击, `Show Media queries` 即可启用：
> 右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义

![20200709_171307.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/09/20200709_171307.gif)


## 参考
- [Chrome Network ，Size 和 Time 为什么有两行参数](https://juejin.im/post/5c78aa2ae51d4575e963dc62)
- [Chrome 开发者工具](http://shouce.jb51.net/chrome/jian-cha-he-diao-shi-javascript/bian-li-dai-ma.html)
- [Google chrome-devtools](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)
- [Chrome devtools使用详解——Performance](https://juejin.im/post/5c009115f265da612859d8e2)
- [全新Chrome Devtool Performance使用指南](https://zhuanlan.zhihu.com/p/29879682)
- [Chrome-performance页面性能分析使用教程](https://www.cnblogs.com/ranyonsue/p/9342839.html)
- [MDN Performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
- [网页性能检测-performance](https://juejin.im/post/5dd4a0de5188254f98605ff9)
- [浏览器渲染详细过程](https://juejin.im/entry/590801780ce46300617c89b8)
- [chrome设置断点的各种姿势](https://justcode.ikeepstudying.com/2018/09/chrome%E8%AE%BE%E7%BD%AE%E6%96%AD%E7%82%B9%E7%9A%84%E5%90%84%E7%A7%8D%E5%A7%BF%E5%8A%BF-js%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95%E5%BF%83%E5%BE%97-chrome-devtools-%E4%B8%AD%E8%B0%83%E8%AF%95-javascrip/)
- [Network Summary](https://blog.csdn.net/qq_37815596/article/details/89456190)
