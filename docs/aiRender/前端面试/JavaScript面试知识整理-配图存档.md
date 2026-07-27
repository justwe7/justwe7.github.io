# JavaScript 面试知识整理-配图存档

本文档记录 `docs/前端面试/JavaScript面试知识整理.md` 中 `[!VISUALIZATION]` 标记对应的配图产物。

## 插图说明清单

| 序号 | 插入位置 | 图片文件 | 图型 | 目的 |
|---|---|---|---|---|
| 01 | 基础类型与引用类型的存储关系 | `01-基础类型与引用类型的存储关系.webp` | relationship | 展示基础类型复制值、引用类型复制地址并共享对象。 |
| 02 | 构造函数、实例与原型链 | `02-构造函数实例与原型链.webp` | relationship | 展示实例、构造函数、原型和原型链查找关系。 |
| 03 | 闭包如何保留外部变量 | `03-闭包如何保留外部变量.webp` | relationship | 展示内部函数引用外部词法环境，变量因此被保留。 |
| 04 | `new` 的执行流程 | `04-new的执行流程.webp` | flow | 展示创建对象、连接原型、绑定 `this`、处理返回值。 |
| 05 | DOM 事件流 | `05-DOM事件流.webp` | flow | 展示捕获、目标、冒泡，以及 `target` 和 `currentTarget`。 |
| 06 | Event Loop 执行流程 | `06-EventLoop执行流程.webp` | flow | 展示同步代码、微任务和宏任务的执行顺序。 |
| 07 | 大文件上传流程 | `07-大文件上传流程.webp` | flow | 展示切片、hash、上传、重试、合并。 |
| 08 | 可达性与内存泄漏 | `08-可达性与内存泄漏.webp` | relationship | 展示已移除 DOM 仍被引用时无法被回收。 |
| 09 | JavaScript 输出题分析顺序 | `09-JavaScript输出题分析顺序.webp` | flow | 展示输出题从同步代码到微任务、宏任务的分析路径。 |

## 构思卡摘要

### 01 基础类型与引用类型的存储关系

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：基础类型复制值，引用类型复制地址，因此多个变量可以共享同一个对象。
- 原文指纹：基础类型、引用类型、对象、共享引用。
- 信息单位：基础值、引用标签、对象容器、共享箭头。
- 组织规则：左右关系对照。
- 标签：`基础值`、`引用`、`对象`、`共享`
- 侠客动作：站在中间指向两侧存储关系，作为阅读方向参照。
- 删除项：不画真实栈堆底层结构，不画复杂内存地址。

### 02 构造函数、实例与原型链

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：实例读取属性时沿原型链向上查找，直到 `null`。
- 原文指纹：构造函数、实例、原型、`null`、查找箭头。
- 信息单位：构造、原型、实例、查找路径、终点。
- 组织规则：单中心关系链。
- 标签：`构造`、`实例`、`原型`、`查找`、`null`
- 侠客动作：持指示棒观察原型关系。
- 删除项：不突出 `__proto__`，避免误导成推荐业务 API。

### 03 闭包如何保留外部变量

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：内部函数仍被引用时，外层变量会随词法环境被保留。
- 原文指纹：外层函数、变量、内层函数、保留连接线。
- 信息单位：外层边界、变量、内层函数、保留连线。
- 组织规则：保留关系。
- 标签：`外层`、`变量`、`内层`、`保留`
- 侠客动作：牵住内层函数和变量之间的线，强调仍然可达。
- 删除项：不把闭包限制为“返回函数”一种场景。

### 04 `new` 的执行流程

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：`new` 按创建对象、连接原型、绑定 `this`、处理返回值的顺序执行。
- 原文指纹：创建、原型桥、绑定结、返回门。
- 信息单位：创建、原型、绑定、返回。
- 组织规则：从左到右流程，末尾返回值分支。
- 标签：`创建`、`原型`、`绑定`、`返回`
- 侠客动作：在原型连接节点盖章。
- 删除项：不画完整构造函数源码。

### 05 DOM 事件流

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：事件从捕获到目标再到冒泡传播，`target` 和 `currentTarget` 不是同一个概念。
- 原文指纹：DOM 节点树、捕获、目标、冒泡、当前监听节点。
- 信息单位：捕获路径、目标节点、冒泡路径、当前节点。
- 组织规则：垂直 DOM 树和双向路径。
- 标签：`捕获`、`目标`、`冒泡`、`当前`
- 侠客动作：在树旁指示传播路径。
- 删除项：不画复杂浏览器窗口细节。

### 06 Event Loop 执行流程

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：同步任务执行完后先清空微任务，再进入下一轮宏任务。
- 原文指纹：同步栈、Promise、微任务托盘、定时器宏任务轨道。
- 信息单位：同步、微任务、宏任务、下一轮。
- 组织规则：左到右流程加一条回路。
- 标签：`同步`、`微任务`、`宏任务`、`下一轮`
- 侠客动作：把 Promise 纸条放入微任务托盘。
- 删除项：不画所有宏任务一次性执行。

### 07 大文件上传流程

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：大文件上传依赖切片、hash、分片上传、失败重试和服务端合并。
- 原文指纹：文件卷轴、切片、hash 印章、上传轨道、重试循环、服务器合并。
- 信息单位：切片、hash、上传、重试、合并。
- 组织规则：左到右流程，一个重试回路。
- 标签：`切片`、`hash`、`上传`、`重试`、`合并`
- 侠客动作：给文件切片盖 hash 印章。
- 删除项：不画把整个文件一次性读入内存。

### 08 可达性与内存泄漏

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：对象只要仍能从根对象访问到，就不会被回收；已移除 DOM 被引用时会泄漏。
- 原文指纹：根对象树、引用绳、DOM 节点、垃圾桶、断开动作。
- 信息单位：根、引用、DOM、断开。
- 组织规则：可达关系和断开动作。
- 标签：`根`、`引用`、`DOM`、`断开`
- 侠客动作：切断 DOM 和引用之间的绳。
- 删除项：不把 `null` 赋值画成唯一解决方案。

### 09 JavaScript 输出题分析顺序

- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：输出题应先走同步代码和 `this`，再分析微任务和宏任务。
- 原文指纹：代码卷轴、`this` 指南针、Promise 微任务托盘、定时器宏任务轨道。
- 信息单位：同步、`this`、微任务、宏任务。
- 组织规则：左到右步骤路径，一条同轮回看线。
- 标签：`同步`、`this`、`微任务`、`宏任务`
- 侠客动作：把 Promise 纸条放入微任务托盘。
- 删除项：不简化成“Promise 永远比 setTimeout 快”。

## 提示词存档

所有提示词共用以下风格基线和角色约束：

```text
Use the provided wuxia mascot image as the strict character reference for body shape, hairstyle, clothing and color palette. Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive line weight variation, sparse interior detail, large negative space, clean white background, mostly monochrome black ink with one small warm orange accent, crisp silhouettes, no watercolor wash, no pencil shading, no hatching, no heavy paper grain, no watermark, no border. Avoid mechanical repetition, PowerPoint-like grids, diagram title, repeated rounded boxes, adult wuxia proportions, cute baby eyes, katana, extra weapons.
```

### 01 完整提示词

```text
The central recognizable article anchor is JavaScript primitive value boxes and reference arrows to a shared heap object, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot, occupying only 6 to 10 percent of the canvas, gently points from two small variable tags to their different storage models. Relationship diagram, strict 16:9 landscape composition, clean white background. One side shows a tiny stack-like area with two separate simple value stones labeled “值”, the other side shows two variable tags pointing to one shared object container labeled “对象”; one orange accent on the shared arrow only. Single conclusion: primitive variables copy values, reference variables copy addresses so two variables can see the same object mutation. Information units: primitive value, variable reference, shared object, address arrow. Organization: side-by-side relationship, no literal low-level memory internals. Repetition budget: no more than two variable tags, no more than one shared object container. Include only these exact short Chinese handwritten labels: “基础值”, “引用”, “对象”, “共享”. No additional text.
```

### 02 完整提示词

```text
The central recognizable article anchor is a JavaScript constructor function scroll, an instance pebble, and a prototype ladder ending at null, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and lightly holds a pointer beside the chain. Relationship diagram, strict 16:9 landscape composition, clean white background. Show one constructor block connected to a prototype platform, one instance tag connected upward through a simple chain of three nodes, with the final small broken end labeled “null”; include a small side loop for constructor returning from prototype but keep it secondary. Single conclusion: an instance looks up its own properties first, then follows the prototype chain until null. Information units: constructor, prototype, instance, lookup arrow, null endpoint. Organization: one clean upward/rightward relationship path with no crossing lines. Repetition budget: three chain nodes maximum, extra ancestors represented by one fading stacked outline. Include only these exact short Chinese handwritten labels: “构造”, “实例”, “原型”, “查找”, “null”. No additional text.
```

### 03 完整提示词

```text
The central recognizable article anchor is an outer function shell still tethered to an inner callback lantern, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and gently holds the callback lantern cord, showing it remains connected. Relationship diagram, strict 16:9 landscape composition, clean white background. Show a faded outer function frame on the left labeled “外层”, a small variable gem inside labeled “变量”, and an inner function lantern outside the frame labeled “内层”; a single orange tether line connects the lantern back to the variable gem, while the outer frame is lightly fading but not gone. Single conclusion: an inner function keeps access to its lexical environment as long as it is still referenced. Information units: outer function, retained variable, inner function reference, closure tether. Organization: one clear retention relationship, not a return-only story. Repetition budget: one frame, one gem, one lantern, one tether. Include only these exact short Chinese handwritten labels: “外层”, “变量”, “内层”, “保留”. No additional text.
```

### 04 完整提示词

```text
The central recognizable article anchor is JavaScript new invocation as a four-step creation path, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and places a small seal on the prototype-link step, not fighting. Process diagram, strict 16:9 landscape composition, clean white background. Show four compact stations on one flowing left-to-right path: empty object bowl, prototype bridge, this binding ribbon, return gate splitting into object return versus default instance. One orange accent marks the final decision gate. Single conclusion: new creates an object, links its prototype, calls the constructor with this, then returns an explicit object or the created instance. Information units: create, link, bind, return decision. Organization: left-to-right sequence with one small branch at the end. Repetition budget: four stations maximum, no repeated icons beyond the path. Include only these exact short Chinese handwritten labels: “创建”, “原型”, “绑定”, “返回”. No additional text.
```

### 05 完整提示词

```text
The central recognizable article anchor is a DOM target node with event ripples moving down then up the tree, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and observes the target node with a small pointer, not blocking the paths. Process diagram, strict 16:9 landscape composition, clean white background. Show a simple nested DOM tree: window outline, document branch, parent node, target node. A thin blue downward path indicates capture, a small orange pulse at target, and a black upward path indicates bubbling. Place target and current handler as separate marks near the same tree. Single conclusion: events travel through capture, target, and bubbling; target is the source while currentTarget is the current listener node. Information units: capture path, target node, bubbling path, current handler. Organization: vertical tree with two directional paths. Repetition budget: four nodes maximum, no dense tree. Include only these exact short Chinese handwritten labels: “捕获”, “目标”, “冒泡”, “当前”. No additional text.
```

### 06 完整提示词

```text
The central recognizable article anchor is the JavaScript Event Loop as a call stack, microtask tray, and macrotask queue, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and moves a small Promise note into the microtask tray. Process diagram, strict 16:9 landscape composition, clean white background. Show a vertical call stack tower on the left labeled “同步”, a small tray in the middle labeled “微任务” with a Promise note, and a larger queue rail on the right labeled “宏任务” with a timer token; one orange curved arrow shows stack clears then microtasks drain before the next macro task. Single conclusion: current synchronous work finishes, microtasks are cleared, then the next macro task runs. Information units: call stack, microtask queue, macrotask queue, next turn arrow. Organization: left-to-right cycle with one feedback loop. Repetition budget: one stack, one tray, one rail, two tokens only. Include only these exact short Chinese handwritten labels: “同步”, “微任务”, “宏任务”, “下一轮”. No additional text.
```

### 07 完整提示词

```text
The central recognizable article anchor is a large file scroll cut into upload slices, hash seal, parallel upload tracks, retry loop, and server merge box, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and stamps a small hash seal on the first slice. Process diagram, strict 16:9 landscape composition, clean white background. Show one file scroll on the left being divided into three visible slices, a small hash seal, two parallel upload tracks with one red retry loop, and a server merge box on the right. Single conclusion: large upload depends on slicing, file identity, retryable chunks, and server merge rather than reading the whole file at once. Information units: slice, hash, upload, retry, merge. Organization: left-to-right sequence, one small retry loop only. Repetition budget: three visible slices maximum, additional slices represented by stacked outlines. Include only these exact short Chinese handwritten labels: “切片”, “hash”, “上传”, “重试”, “合并”. No additional text.
```

### 08 完整提示词

```text
The central recognizable article anchor is a removed DOM tile still connected by a closure cord to a root tree, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and carefully cuts one unnecessary cord with a tiny utility knife-like motion while the sword remains sheathed. Relationship diagram, strict 16:9 landscape composition, clean white background. Show a root tree on the left labeled “根”, a normal reachable object chain in black, and one removed DOM tile on the right labeled “DOM” still held by an orange cord labeled “引用”; a faint trash outline below shows it should be gone but is still reachable. Single conclusion: objects are collected only when unreachable; removed DOM can leak if references remain. Information units: root, reference cord, removed DOM, unreachable cut. Organization: one clear reachable relationship with a cut point. Repetition budget: one root, two cords maximum, one removed DOM tile. Include only these exact short Chinese handwritten labels: “根”, “引用”, “DOM”, “断开”. No additional text.
```

### 09 完整提示词

```text
The central recognizable article anchor is a JavaScript output-question analysis path with code scroll, this compass, Promise microtask tray, and timer macrotask rail, clearly visible and not omitted. The recurring chibi Chinese young wuxia swordsman mascot occupies only 6 to 10 percent of the canvas and moves a Promise note into the microtask tray after checking the code scroll. Process diagram, strict 16:9 landscape composition, clean white background. Show four compact checkpoints on one left-to-right path: code scroll for synchronous code, small compass for scope and this, microtask tray with Promise note, macrotask rail with timer token. One orange arrow emphasizes Promise constructor sync first, then then callback into microtask before timer. Single conclusion: analyze output questions by walking sync code first, then scope and this, then microtasks, then macro tasks within the same event loop turn. Information units: sync, this/scope, microtask, macrotask. Organization: left-to-right sequence, one event-loop turn curve. Repetition budget: four checkpoints maximum, no repeated icons. Include only these exact short Chinese handwritten labels: “同步”, “this”, “微任务”, “宏任务”. No additional text.
```

