组件之间传递数据，大部分场景用 `props` 就够了，但如果父组件想往子组件里塞一段**结构**（一段 HTML、一段带样式的内容，甚至是别的组件），`props` 就不好使了——`props` 传的是数据，不是模板片段。这时候就要用插槽（slot），它是 Vue 提供的"内容分发"机制，让父组件决定子组件某个区域"长什么样"。

Vue 2.6 是插槽语法的一个分水岭：之前用 `slot` / `slot-scope` 两个独立指令分别处理具名和作用域插槽，写法割裂、也不好扩展；2.6 统一成 `v-slot` 一个指令。本文按 2.6+ 的写法来梳理插槽的用法、常见坑和背后的实现思路。

## 一、插槽解决的问题

假设要封装一个通用的对话框组件 `Dialog`，标题、内容、底部按钮在不同页面都不一样。如果全部通过 `props` 传，要么传字符串（只能是纯文本，没法传 HTML 结构），要么给每一处都开一个 `render` 函数传入的作用域插槽（本末倒置）。

插槽的思路是反过来的：子组件只负责**布局和预留位置**，具体填什么由父组件决定。

```html
<!-- 子组件 Dialog.vue -->
<template>
  <div class="dialog">
    <header><slot name="title">默认标题</slot></header>
    <main><slot>默认内容</slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>
```

```html
<!-- 父组件使用 -->
<Dialog>
  <template #title>删除确认</template>
  <p>该操作不可撤销，是否继续？</p>
  <template #footer>
    <button>取消</button>
    <button>确认</button>
  </template>
</Dialog>
```

子组件里的 `<slot>` 就是一个占位符，父组件传入的内容会替换掉它。如果父组件没传，就显示 `<slot>` 标签内的默认内容（上面的"默认标题"）。

## 二、插槽的三种类型

### 默认插槽（匿名插槽）

不指定 `name` 的 `<slot>` 就是默认插槽，对应父组件里没有用 `template` 包裹、直接写在组件标签内部的内容：

```html
<!-- 子组件 -->
<div class="card"><slot></slot></div>

<!-- 父组件 -->
<Card><p>直接写的内容会进入默认插槽</p></Card>
```

### 具名插槽

子组件可以放多个 `<slot>`，用 `name` 区分；父组件用 `v-slot:name`（缩写 `#name`）指定内容归属哪个插槽：

```html
<!-- 子组件 Layout.vue -->
<div class="layout">
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  <footer><slot name="footer"></slot></footer>
</div>
```

```html
<!-- 父组件 -->
<Layout>
  <template #header><h1>页面标题</h1></template>
  <p>这段没写 v-slot，会进入默认插槽（main 区域）</p>
  <template #footer><p>© 2026</p></template>
</Layout>
```

### 作用域插槽

前两种插槽里，父组件传的内容用的是**父组件自己作用域**里的数据。但有些场景需要反过来：子组件内部有一些数据（比如列表遍历时的每一项），想让父组件决定"这份数据怎么渲染"。这就是作用域插槽——子组件通过 `<slot>` 上的属性把数据传出去，父组件通过 `v-slot` 接收：

```html
<!-- 子组件 List.vue：只负责遍历，不关心每一项怎么展示 -->
<ul>
  <li v-for="item in items" :key="item.id">
    <slot :item="item" :index="item.id"></slot>
  </li>
</ul>
```

```html
<!-- 父组件：决定每一项具体渲染成什么样 -->
<List :items="users">
  <template #default="{ item, index }">
    <span>{{ index }}. {{ item.name }}</span>
  </template>
</List>
```

这个模式常见于表格、下拉列表、树形控件这类"结构由组件库提供、内容展示由使用方决定"的组件。Element UI 的 `el-table` 的 `scope="row"`（早期写法）本质就是这个。

## 三、2.6 之前 vs 2.6+：v-slot 语法统一

Vue 2.6 之前，具名插槽和作用域插槽是两套独立指令：

```html
<!-- 2.6 之前：具名插槽用 slot 特性 -->
<template slot="footer">...</template>

<!-- 2.6 之前：作用域插槽用 slot-scope 特性，且必须配合 template -->
<template slot="item" slot-scope="props">
  {{ props.item.text }}
</template>
```

这种写法有两个问题：一是同一个插槽如果既要指定名字又要接收数据，需要 `slot` 和 `slot-scope` 两个特性一起写，语义上是割裂的；二是普通插槽和作用域插槽概念上其实可以统一——普通插槽只是"不传数据的作用域插槽"。

2.6 引入 `v-slot` 统一了这两者：

```html
<!-- 2.6+：具名 + 作用域一次写完 -->
<template v-slot:item="props">
  {{ props.item.text }}
</template>

<!-- 缩写形式，# 代替 v-slot: -->
<template #item="props">
  {{ props.item.text }}
</template>
```

> 官方从 2.6 起标记 `slot` 和 `slot-scope` 为**已废弃**（不是移除，2.x 生命周期内一直保留），推荐新代码统一用 `v-slot`。Vue 3 里 `slot`/`slot-scope` 已经彻底不支持了，所以现在写 2.x 项目也建议直接用 `v-slot`，减少以后升级的改动量。

### 动态插槽名

`v-slot` 支持动态参数，插槽名可以是一个变量：

```html
<template v-slot:[dynamicSlotName]>...</template>
<!-- 或缩写 -->
<template #[dynamicSlotName]>...</template>
```

这在插槽名需要按数据动态生成时很有用，比如一个表单组件根据字段配置动态渲染不同名字的插槽。

## 四、v-slot 详细用法

### 默认插槽的简写

只使用默认插槽、且不需要解构数据时，`v-slot` 可以直接写在组件标签上，不必再套一层 `<template>`：

```html
<Card v-slot="{ item }">
  {{ item.name }}
</Card>
```

但一旦组件同时用了具名插槽，默认插槽也必须显式用 `<template #default>` 写出来，不能再省略 `<template>` 标签，否则 Vue 编译时无法区分这段内容归属哪个插槽。

### 解构、重命名、默认值

`v-slot` 接收到的插槽 prop 是一个对象，支持 ES6 解构的全部写法：

```html
<!-- 解构 -->
<template #default="{ item, index }">{{ item }} - {{ index }}</template>

<!-- 重命名 -->
<template #default="{ item: user }">{{ user.name }}</template>

<!-- 默认值（插槽 prop 为 undefined 时生效） -->
<template #default="{ item = { name: '匿名' } }">{{ item.name }}</template>
```

### 具名插槽 + 作用域插槽同时使用

一个组件里，具名插槽和默认插槽可以同时存在，各自独立接收数据：

```html
<List :items="users">
  <template #header="{ total }">共 {{ total }} 条</template>
  <template #default="{ item }">{{ item.name }}</template>
</List>
```

## 五、使用限制与常见坑

- **`v-slot` 只能用在 `<template>` 标签或组件标签上**，不能用在普通 HTML 标签（如 `<div v-slot="...">`）上，这点和 `slot-scope` 一致，容易在重构旧代码时漏改。
- **新旧语法不能混用**。同一个组件内不要一部分插槽写 `slot`，另一部分写 `v-slot`，虽然大部分情况编译不会直接报错，但语义容易混乱，排查起来麻烦。
- **具名插槽出现后，裸露在组件标签下、没有 `template` 包裹的内容会自动归入默认插槽**，如果这不是预期行为（比如手误漏加 `template`），内容会渲染到不该出现的位置。
- **作用域插槽的数据只在插槽内可用**，不能在组件外部的 `data`、`computed` 里直接访问，因为它本质上是子组件通过 `slot` 标签的属性传出来的，作用域仅限于 `v-slot` 接收到的那块模板。
- **具名插槽名不能和保留字冲突**，比如不要把插槽命名为 `slot`。

## 六、实现原理简述

2.6 之后，插槽在编译阶段被统一处理为 `scopedSlots`，不再区分"普通插槽走 `$slots`，作用域插槽走 `$scopedSlots`"这种历史上的双轨机制（这也是 2.6 一并做的性能优化：普通插槽如果不依赖父组件的响应式数据，会被标记为**稳定插槽**，更新时可以跳过子组件的重新渲染）。

大致过程：

1. **编译父组件模板**：`v-slot` 上的内容会被编译成一个个函数，挂到 `scopedSlots` 选项上，key 是插槽名，value 是接收 `props` 并返回 VNode 的函数。比如 `<template #item="props">{{ props.item.text }}</template>` 会编译成近似：

```js
scopedSlots: {
  item: function(props) {
    return createElement('span', props.item.text)
  }
}
```

2. **子组件渲染时执行 `<slot>`**：子组件内的 `<slot name="item" :item="xxx">` 在渲染函数中会调用 `renderSlot('item', undefined, { item: xxx })`，本质就是去 `this.$scopedSlots['item']` 里取出父组件传入的函数并执行，传入子组件准备好的数据，拿到 VNode 插入渲染结果。

3. **`normalizeScopedSlots`**：因为历史上 `$slots`（VNode 数组）和 `$scopedSlots`（函数）两套 API 并存过渡期，Vue 内部有一层 `normalizeScopedSlots` 做兼容处理——把普通插槽也统一包装成返回 VNode 的函数形式放进 `$scopedSlots`，这样组件内部不用区分插槽类型，`<slot>` 渲染逻辑可以走同一套代码路径。

也就是说，插槽从"父组件传内容"这件事，本质上被编译成了"父组件传一个函数，子组件在合适的时机调用这个函数、把数据作为参数传进去、拿到结果插入渲染树"，这也是为什么作用域插槽能实现"数据由子组件提供、结构由父组件决定"——函数调用天然支持传参。

## 七、总结

| 场景 | 用法 |
|---|---|
| 子组件区域内容完全由父组件决定，无需子组件数据 | 默认插槽 |
| 子组件有多个可替换区域 | 具名插槽 `#name` |
| 父组件需要根据子组件内部数据（如遍历项）决定渲染方式 | 作用域插槽 `#name="props"` |

写 Vue 2.x 项目时统一使用 `v-slot`（或缩写 `#`），不要再用 `slot` / `slot-scope`：一是语法更紧凑，具名和作用域可以一起写；二是为将来迁移 Vue 3 减少改动，Vue 3 已经不支持旧语法。遇到组件库封装（表格列、下拉选项这类），插槽通常是唯一能自定义内部渲染逻辑的手段，理解作用域插槽"子传数据、父定结构"的本质，能帮助更快看懂第三方组件文档里那些 `v-slot="scope"` 的用法。
