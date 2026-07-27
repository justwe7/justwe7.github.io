---
title: Vue3 面试知识整理（Vue2 开发者过渡版）
---

# Vue3 面试知识整理（Vue2 开发者过渡版）

> 本文基于《Vue3 面试真题（6题）》重新梳理，不按原 PDF 的逐页顺序展开，而按“先会迁移、再懂原理、最后能回答工程题”的路径组织。面向 **Vue 2 实战较多、Vue 3 只了解基础且缺少项目经验** 的开发者：保留熟悉的 Vue 2 对照，同时把 Vue 3 中容易被连续追问的部分讲清楚。原资料中重复内容已合并，部分不严谨或容易过时的表述已修正，并以“补充说明（非原文）”标记。

## 复习建议

- 第一轮先掌握五星模块：能说清 Vue 3 为什么出现、怎么写组合式 API、响应式为何变成 Proxy。
- 不必为了面试强行否定 Options API。Vue 3 仍完整支持它；你的优势是能从 Vue 2 的组件拆分、生命周期和线上问题出发，再说明 Vue 3 的改进。
- 遇到 `ref`、`reactive`、`computed`、`watch` 时，先能讲使用边界，再解释依赖收集与触发更新；不要只背 API。
- Modal、Teleport、渲染优化和 Tree Shaking 是很好的“做过组件库/理解工程化”加分题。没有实战时应诚实说明学习型实现，并讲清设计取舍。

## 从 Vue 2 到 Vue 3：整体变化与迁移视角

**重要程度：⭐⭐⭐⭐⭐**

### Vue 3 的核心目标

面试回答可以这样说：

> Vue 3 不是把 Vue 2 推倒重来，而是在保持模板和组件心智模型的基础上，解决大型组件逻辑复用、TypeScript 支持、运行时性能和打包体积的问题。最直观的变化是组合式 API 与 Proxy 响应式；底层则通过编译期标记动态节点、静态提升和按需引入 API，减少不必要的工作。

可从四个方向展开：

- **更好维护：** 组合式 API 允许按“业务功能”聚合状态、计算属性、监听和生命周期，而不是分散到 `data`、`methods`、`computed`、`watch`。
- **更好复用：** 用 composable（通常命名为 `useXxx`）替代有命名冲突、来源不透明的 mixin。
- **更适合 TypeScript：** 函数参数、返回值和 props/emit 可以在组合函数边界上明确标注类型。
- **更快、更小：** Proxy、编译器优化和基于 ES Module 的 Tree Shaking 分别改善更新能力、更新范围和产物体积。

### Vue 2 与 Vue 3 的关键对照

| 维度 | Vue 2 常见方式 | Vue 3 推荐理解 | 面试要点 |
| --- | --- | --- | --- |
| 组件逻辑组织 | Options API | Options API 仍可用；复杂逻辑可用 Composition API | 不是二选一，而是按复杂度选择 |
| 逻辑复用 | mixin、renderless component | composable | composable 的依赖与返回值更显式 |
| 响应式 | `Object.defineProperty` + 数组方法改写 | `Proxy` + `Reflect` | Vue 3 可感知新增、删除、数组索引等操作 |
| 全局配置 | `Vue.prototype` | `app.config.globalProperties` | Vue 3 是应用实例级别 |
| 程序化组件 | `Vue.extend` / `new` | `createVNode` + `render` | 组件库常见，业务项目不必手写 |
| 跨 DOM 层级渲染 | 手动 append 到 `body` | `Teleport` | DOM 位置变了，组件逻辑仍在原组件树 |
| 生命周期 | `beforeDestroy`、`destroyed` | `beforeUnmount`、`unmounted` | 其余常用钩子名称基本对应 |

### 从 Vue 2 平滑迁移，而不是一次性重写

对已有 Vue 2 项目，更稳妥的做法是按组件和风险分层迁移：

1. 先升级构建链路、依赖和测试，确认第三方组件兼容性。
2. 保留简单页面的 Options API；新写或重构的复杂组件优先使用 `<script setup>` 与 Composition API。
3. 先抽离可独立验证的逻辑为 composable，例如分页、表单校验、键盘事件、请求状态。
4. 再处理 `this`、过滤器、事件总线、`Vue.prototype`、`$listeners` 等 API 差异。

> **补充说明（非原文）：** Vue 3 中的 Composition API 可以和 Options API 共存，但同一份状态不要在两种组织方式中重复维护。迁移时最常见的问题不是语法，而是响应式丢失、`this` 使用错误和插件 API 未改造。

## Composition API 与 Options API

**重要程度：⭐⭐⭐⭐⭐**

### 两种 API 的本质区别

Options API 按选项类型组织：状态在 `data`，副作用在 `watch`，方法在 `methods`。小组件非常直观；组件变大后，同一个“搜索功能”会散落在多个选项里。

Composition API 在 `setup`（或 `<script setup>`）中按业务能力组织：与搜索相关的条件、请求、加载状态、重置动作和监听可以放在一起。它不是“函数式组件”，也不是为了少写代码，而是为了让逻辑聚合与复用更自然。

```vue
<script setup>
import { computed, ref, watch } from 'vue';

const keyword = ref('');
const page = ref(1);
const loading = ref(false);
const query = computed(() => ({ keyword: keyword.value, page: page.value }));

watch(query, async () => {
  loading.value = true;
  try {
    // await fetchList(query.value)
  } finally {
    loading.value = false;
  }
});
</script>
```

面试回答可以这样说：

> Options API 是按 `data`、`methods` 这类选项分类；Composition API 是按业务功能聚合。复杂组件里后者更容易定位和抽取复用逻辑，也更利于 TypeScript 推导。简单展示型组件继续使用 Options API 也没有问题，关键是团队保持一致。

### 用 composable 替代 mixin

Vue 2 的 mixin 可以复用逻辑，但容易出现三类问题：

- 属性和方法命名冲突。
- 使用组件时不容易知道某个字段来自哪里。
- 多个 mixin 的生命周期和数据合并规则增加理解成本。

composable 是普通 JavaScript/TypeScript 函数，显式导入、显式调用、显式返回：

```ts
// composables/useMove.ts
import { onMounted, onUnmounted, reactive, toRefs } from 'vue';

export function useMove() {
  const position = reactive({ x: 0, y: 0 });

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.code === 'ArrowUp') position.y--;
    if (event.code === 'ArrowDown') position.y++;
    if (event.code === 'ArrowLeft') position.x--;
    if (event.code === 'ArrowRight') position.x++;
  };

  onMounted(() => window.addEventListener('keyup', handleKeyup));
  onUnmounted(() => window.removeEventListener('keyup', handleKeyup));

  return { ...toRefs(position) };
}
```

```vue
<script setup lang="ts">
import { useMove } from './composables/useMove';

const { x, y } = useMove();
</script>
```

这里 `onUnmounted` 和事件处理函数被封装在一起，调用方无需关心清理细节；这正是可复用副作用的价值。

### `setup`、`this` 与生命周期

- `setup` 在组件实例创建前执行，因此其中不能使用组件代理上的 `this`。
- `setup(props, context)` 中，`props` 是响应式只读对象；`context` 可取得 `attrs`、`slots`、`emit`、`expose`。`<script setup>` 通常不需要手写它们。
- 生命周期改为从 `vue` 显式导入，如 `onMounted`、`onUpdated`、`onUnmounted`。
- 在 composable 中调用生命周期钩子，必须发生在组件初始化的同步调用链中，不能等异步请求完成后才注册。

### `ref`、`reactive` 与解构陷阱

`ref` 适合基本类型，也能包裹对象；值通过 `.value` 访问。`reactive` 只接受对象、数组、`Map`、`Set` 等引用类型，返回代理对象。

```ts
import { reactive, ref, toRefs } from 'vue';

const count = ref(0);
const form = reactive({ name: '', age: 18 });

// 错误：普通解构会拿到当前值，失去与 form 属性的响应式连接
// const { name } = form;

// 正确：需要解构时改为 ref
const { name, age } = toRefs(form);
```

常见追问：为什么模板中可以省略 `.value`？

> 模板和组件代理会自动解包顶层 ref；但在普通 JavaScript 中仍需 `.value`。对象属性中的 ref 是否自动解包还取决于它所在的容器，不能把模板规则照搬到所有场景。

### `computed`、`watch` 与 `watchEffect`

| API | 适合场景 | 特点 |
| --- | --- | --- |
| `computed` | 从已有状态推导展示值 | 有缓存；应保持无副作用 |
| `watch` | 监听明确数据源并执行副作用 | 可拿到新旧值，适合请求、持久化、联动 |
| `watchEffect` | 自动收集当前回调访问到的依赖 | 立即执行；依赖不够显式 |

```ts
const count = ref(1);
const doubled = computed(() => count.value * 2);

watch(count, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});
```

不要在 computed getter 里写 `count.value++`。它会产生副作用，破坏“派生值”的语义，也可能导致难以排查的更新循环。

> **补充说明（非原文）：** 资料中的 `computed(() => age.value++)` 不是“只读计算属性”的正确示例。正确理解是：不传 setter 的 computed 结果只读；如果业务确实需要双向映射，可以传入 `{ get, set }`。

> [!VISUALIZATION]  
> **类型：** comparison  
> **优先级：** high  
> **标题：** Options API、Composition API 与 composable 的逻辑组织方式  
> **目的：** 对比同一个业务功能在 Options API 中分散到多个选项、在 Composition API 中聚合，并展示 composable 被多个组件显式复用。  
> **必须表达：** Composition API 的核心价值是按功能组织和显式复用，不是弃用 Options API。  
> **避免表达：** 不要把 Options API 描绘成错误或已废弃的写法。

![](../../static/docs/aiRender/前端面试/vue3-01-options-composition-composable.webp)

## Vue 3 响应式：为什么使用 Proxy

**重要程度：⭐⭐⭐⭐⭐**

### 一句话理解与面试回答

> Vue 2 主要通过 `Object.defineProperty` 为已有属性设置 getter/setter；Vue 3 用 Proxy 代理整个对象。Proxy 能拦截属性读取、设置、删除、`in`、遍历等更多操作，因此不再需要通过 `Vue.set`/`Vue.delete` 解决新增和删除属性的监听问题，对数组索引和 `length` 的处理也更自然。Vue 3 仍然是“访问时收集依赖、修改时触发依赖更新”的响应式模型。

### 依赖收集与触发更新

可把响应式过程理解为三步：

1. 组件渲染函数、computed 或 watcher 读取响应式属性时，Vue 记录“谁依赖这个属性”（`track`）。
2. 属性被写入、删除或集合结构变化时，Vue 找到对应依赖并通知它们（`trigger`）。
3. 组件更新通常会被调度并批量执行，而不是每次赋值立刻重新渲染。

```ts
const state = reactive({ count: 0 });

// 渲染或 watcher 中读取 state.count：收集依赖
console.log(state.count);

// 修改 count：触发依赖，随后调度组件更新
state.count++;
```

### Vue 2 与 Vue 3 响应式差异

| 场景 | Vue 2 的典型限制 | Vue 3 的处理 |
| --- | --- | --- |
| 新增/删除对象属性 | 默认无法侦测，需要 `Vue.set` / `Vue.delete` | Proxy 可拦截 `set` / `deleteProperty` |
| 数组索引与 `length` | 有限制，需要改写数组变更方法 | Proxy 能拦截属性设置，包含索引与 `length` |
| 深层对象 | 初始化时递归遍历，数据大时成本较高 | 在访问嵌套对象时按需创建代理（惰性深层响应） |
| `Map`、`Set` | 支持有限 | Vue 3 提供集合类型的响应式处理 |
| 兼容性 | 可兼容更旧的浏览器 | Proxy 无法完整 polyfill，需要现代运行环境 |

需要纠正一个常见误区：**Proxy 并非“天然只能监听第一层”**。Vue 3 在读取到嵌套对象时会递归返回其代理，所以 `state.user.profile.name` 能保持响应式；它的“惰性”是指不在初始化时一次性深度遍历整个对象。

```ts
const state = reactive({ user: { profile: { name: 'Ada' } } });
state.user.profile.name = 'Grace'; // 能触发依赖更新
```

### `reactive` 的边界与实际建议

- 不要把原始对象和代理对象混着作为状态源使用；更新应统一通过代理对象完成。
- `reactive` 不能直接代理基本类型，基本类型使用 `ref`。
- 给 `reactive` 对象整体重新赋值会失去原先的响应式引用；需要整体替换的场景常用 `ref({})`。
- 传入第三方库实例、DOM 节点或不想代理的大对象时，可考虑 `markRaw`、`shallowRef`、`shallowReactive`，但应先确认性能问题。

> [!VISUALIZATION]  
> **类型：** flow  
> **优先级：** high  
> **标题：** Vue 3 响应式的依赖收集与触发流程  
> **目的：** 展示组件渲染、computed/watch 读取代理属性时收集依赖，属性修改后触发调度和重渲染。  
> **必须表达：** 依赖按“属性”关联，深层对象在访问时被代理；更新通常经过批处理调度。  
> **避免表达：** 不要画成任意数据变化都会让整个应用立即全量重渲染。

![](../../static/docs/aiRender/前端面试/vue3-02-reactivity-track-trigger.webp)

### 高频追问

**Proxy 相比 `Object.defineProperty` 的缺点是什么？**

Proxy 的最大现实限制是旧浏览器兼容性，无法通过完整 polyfill 解决；另外 Proxy 代理的是对象本身，原始对象与代理对象不相等，调试或与第三方库交互时要注意身份问题。

**为什么 Vue 3 还保留 ref？**

因为 JavaScript 无法代理基本类型，`ref` 用一个带 `.value` 的对象包装值；同时它也提供了可整体替换对象引用的能力。

## 编译期优化与 Virtual DOM 更新

**重要程度：⭐⭐⭐⭐**

### Vue 3 为什么能减少不必要的 Diff

Vue 2 运行时更难直接知道模板里哪些节点会变，因此更新时需要较广地比较虚拟 DOM。Vue 3 的编译器会分析模板，把“静态内容”和“动态绑定”编码到生成的渲染函数中，让运行时把精力集中在可能变化的节点上。

面试回答可以这样说：

> Vue 3 的优化不只是改进传统 Diff 算法，而是把一部分判断提前到编译阶段。编译器会静态提升不会变的节点、给有变化的节点添加 Patch Flag，并把动态节点收集到 block 中。更新时运行时优先处理这些动态节点，因此减少了无关节点的比较。

### 三个高频关键词

- **静态提升（Static Hoisting）：** 静态 VNode 在渲染函数外创建并复用，避免每次渲染重新创建。
- **Patch Flags：** 记录节点可能变化的是文本、class、style、props、事件等哪一部分，避免无差别比较。
- **Block Tree：** 收集一个 block 下的动态子节点，更新时快速定位动态集合。

以模板为例：

```vue
<span>固定文案</span>
<div>{{ message }}</div>
```

编译后静态的 `span` 可以被提升；`div` 被标记为文本动态节点。当 `message` 变化时，不需要把所有静态兄弟节点重新比较一遍。

### 事件处理函数缓存与 SSR

当模板中的事件处理函数不依赖渲染过程中的临时变量时，Vue 3 可以缓存函数引用，避免每次渲染都创建新函数并导致子组件认为 prop 改变。SSR 场景中，编译器还能生成更贴合字符串拼接的代码，降低服务端渲染开销。

> **补充说明（非原文）：** 这些是框架内部优化，业务开发最有效的手段仍然是保持状态边界清晰、给列表正确的 `key`、避免无意义的深度监听和不必要的组件更新。不要为了“手动优化”大量直接操作 VNode。

> [!VISUALIZATION]  
> **类型：** relationship  
> **优先级：** medium  
> **标题：** Vue 3 编译期标记与运行时定向更新  
> **目的：** 对比模板中静态节点和动态节点，展示静态提升、Patch Flag、动态节点集合如何减少更新范围。  
> **必须表达：** 编译阶段提供信息，运行阶段据此定向更新。  
> **避免表达：** 不要宣称 Vue 3 完全没有 Diff 或不会创建 Virtual DOM。

![](../../static/docs/aiRender/前端面试/vue3-03-compiler-patchflag.webp)

## Teleport 与程序化 Modal：从组件到工程设计

**重要程度：⭐⭐⭐⭐**

### 为什么 Modal 适合用 Teleport

弹窗在组件语义上通常属于当前页面或当前业务模块，但其 DOM 往往需要挂到 `body`：避免被祖先元素的 `overflow: hidden`、层叠上下文或定位限制裁剪。

```vue
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal">
      <div class="mask" @click="close"></div>
      <section class="panel" role="dialog" aria-modal="true">
        <slot />
      </section>
    </div>
  </Teleport>
</template>
```

`Teleport` 改变的是最终 DOM 挂载位置，**不改变组件在 Vue 组件树中的父子关系**。因此 props、emit、注入、响应式状态仍按原组件关系工作。

### 一个可维护 Modal 的设计要点

除了遮罩、标题、内容、确认与取消，面试中更能体现工程思维的是：

- 用 `v-model` / `update:modelValue` 管理显隐，避免组件私自修改父状态。
- 内容优先使用 slot；确实需要 API 调用时再支持字符串、VNode 或渲染函数。
- 确认回调可能异步：loading 期间禁用重复提交；成功后关闭，失败后保留弹窗并给出错误反馈。
- 关闭时清理临时容器、事件监听、焦点与滚动锁；多个弹窗还要处理层级和队列。
- 补齐可访问性：`role="dialog"`、焦点进入/返回、Esc 关闭、背景不可聚焦。

### Vue 2 与 Vue 3 的程序化挂载差异

Vue 2 常见写法是 `Vue.extend(Modal)` 创建构造器并 `new` 出实例。Vue 3 不再提供 `Vue.extend`，低层实现通常使用 `createVNode` 和 `render` 把 VNode 渲染到临时容器，然后在关闭时 `render(null, container)` 卸载。

```ts
import { createVNode, render } from 'vue';
import Modal from './Modal.vue';

export function showModal(props: Record<string, unknown>) {
  const container = document.createElement('div');
  const vnode = createVNode(Modal, {
    ...props,
    onClose: () => {
      render(null, container);
      container.remove();
    },
  });

  render(vnode, container);
  document.body.appendChild(container);
}
```

这段代码表达的是底层思路。业务项目优先使用声明式 `<Modal v-model="visible" />`；只有组件库或全局确认框 API 才值得封装程序化调用。

### 插件全局 API 的迁移

Vue 2 插件常写 `Vue.prototype.$modal = ...`；Vue 3 则在安装函数中使用应用实例：

```ts
export default {
  install(app: App) {
    app.config.globalProperties.$modal = { show: showModal };
  },
};
```

> **补充说明（非原文）：** TypeScript 项目还需要扩展 `ComponentCustomProperties` 的类型声明；并且全局 API 应只用于真正通用的能力，普通业务逻辑优先显式导入，避免依赖来源不透明。

> [!VISUALIZATION]  
> **类型：** architecture  
> **优先级：** medium  
> **标题：** Vue 3 程序化 Modal 的挂载、交互与卸载  
> **目的：** 展示调用 `show`、创建容器和 VNode、Teleport 到 body、确认/取消回调、异步 loading、卸载清理的完整链路。  
> **必须表达：** 关闭后要卸载 VNode 并移除容器；Teleport 不改变组件事件和状态关系。  
> **避免表达：** 不要把 `createVNode` 画成每个普通业务弹窗都必须使用的方案。

![](../../static/docs/aiRender/前端面试/vue3-04-programmatic-modal.webp)

## Tree Shaking：Vue 3 为什么更容易按需打包

**重要程度：⭐⭐⭐**

### 一句话理解

Tree Shaking 是构建工具基于 ES Module 的静态 `import` / `export` 分析，删除确认未被使用且可安全移除的代码（dead code elimination）。Vue 3 将许多 API 设计为可命名导入的独立导出，因此打包器更容易只保留实际使用的部分。

```ts
// Vue 3：只声明要使用的 API
import { computed, nextTick, ref } from 'vue';
```

面试回答可以这样说：

> Tree Shaking 依赖 ES Module 的静态结构，构建工具才能在编译时判断导出是否被引用。Vue 3 的 API 更模块化，未使用的 API 更有机会从最终 bundle 中被移除。但它不是“写了命名导入就一定变小”，还受构建配置、副作用标记、动态引用和依赖本身实现影响。

### 常见误区

- Tree Shaking 不是运行时功能，而是构建阶段优化。
- 不能因为某个组件里没有调用 `watch`，就断言最终产物一定不包含全部相关代码；应以构建产物分析为准。
- CommonJS 的动态 `require` 更难静态分析；ES Module 更利于 Tree Shaking。
- 有副作用的模块不能被随意删除，例如只为注册全局样式或修改全局状态而导入的模块。

### 与 Composition API 的关系

Composition API 的按需导入和 Tree Shaking 有协同性：组件只导入 `ref`、`computed` 等使用到的 API。不过它不是采用 Composition API 的首要理由；可维护性和逻辑复用通常更重要。

## 面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- 为什么 Vue 3 要引入 Composition API，以及它与 Options API、mixin 的差别。
- `ref`、`reactive`、`toRefs` 的选择与解构陷阱。
- `computed`、`watch`、`watchEffect` 的使用边界。
- Vue 3 响应式如何完成 track / trigger，Proxy 比 `Object.defineProperty` 改善了什么。

### ⭐⭐⭐⭐ 高频加分

- Vue 3 编译期优化：静态提升、Patch Flag、Block Tree。
- Teleport 的作用及其不改变组件关系的原因。
- Vue 2 的 `Vue.extend`、`Vue.prototype` 如何迁移为 Vue 3 的 `createVNode`/`render` 与 `app.config.globalProperties`。

### 适合按这条链连续复习

- Vue 2 大组件难维护 → mixin 的问题 → Composition API → composable → `ref/reactive/toRefs`。
- 响应式读取 → track → 修改数据 → trigger → 调度更新 → 编译期标记减少更新范围。
- 弹窗 DOM 挂载限制 → Teleport → `v-model` 与 emit → 异步确认 → 程序化挂载与清理。
- ES Module 静态分析 → Tree Shaking → Vue 3 按需导入 → bundle 体积验证。
