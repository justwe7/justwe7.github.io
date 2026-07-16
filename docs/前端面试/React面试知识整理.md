# React 面试知识整理

> 本文基于《React 面试真题（31 题）》完整重构。没有按原 PDF 的逐题顺序编排，而是按知识依赖组织；重复内容已合并，示例已压缩。原资料以 React 16、React Router v5 和传统 Redux 为背景，涉及旧接口时均会说明现代项目的差异。

## 复习建议

- 先掌握五星模块的“面试回答”和代码边界，再复习四星模块。
- 回答原理题时，按“结论 → 为什么 → 一个工程影响”组织，避免只背 API。
- 区分 **React 的通用机制** 与 **某个版本或库的 API**：例如 Fiber 是机制，`Switch` 和 `useHistory` 是 Router v5 API。

## 组件、JSX 与数据流

**重要程度：⭐⭐⭐⭐⭐**

### React 的核心思想

React 是用声明式组件描述 UI 的库：开发者根据当前 `props`、`state` 和 `context` 声明“界面应该长什么样”，React 在更新时负责协调并提交必要的 DOM 变更。组件不是 DOM 的简单封装；它把 UI、事件和状态组合为可复用单元。

#### 面试回答

“React 的核心是声明式和组件化。我们不手动逐步修改 DOM，而是让 UI 成为状态的函数。状态变化后 React 会重新计算组件树，协调新旧结果，再把必要的改动提交到 DOM。”

### JSX、React Element 与组件

JSX 是 JavaScript 的语法扩展，构建时会转成创建 React Element 的调用；React Element 是对 UI 的不可变描述，不是真实 DOM，也不是组件实例。

```jsx
const element = <Greeting name="Ada" />;
// 概念上相当于 React.createElement(Greeting, { name: 'Ada' })
```

- 小写标签（如 `div`）描述宿主 DOM 节点；大写标识符（如 `Greeting`）表示自定义组件。
- 函数组件是普通函数，React 调用它得到 Element；类组件则创建实例并调用 `render`。
- `key`、`ref` 是 React 用于协调和引用的特殊字段，组件内部不能像普通 props 一样读取它们。

### `props`、`state` 与单向数据流

`props` 由父组件传入，组件应视为只读；`state` 由组件自身或其状态逻辑维护。数据通常自上而下流动，子组件要影响父组件时，应调用父组件作为 props 传入的回调，这叫“状态提升”。

```jsx
function PricePicker({ onChange }) {
  return <button onClick={() => onChange(100)}>选择商品</button>;
}

function Cart() {
  const [price, setPrice] = useState(0);
  return <PricePicker onChange={setPrice} />;
}
```

### 受控组件与非受控组件

|类型|值的来源|常见写法|适用场景|
|---|---|---|---|
|受控组件|React state|`value` + `onChange`|表单校验、联动、唯一数据源|
|非受控组件|DOM 本身|`defaultValue` + `ref`|简单表单、接入非 React 控件、文件输入|

受控输入框必须在 `onChange` 中更新对应 state；只给 `value` 不更新 state 会使输入无法编辑。

### 事件系统与 `this` 绑定

React 事件使用 camelCase，例如 `onClick`，并接收合成事件对象；需要原生事件时可访问 `event.nativeEvent`。事件通常会沿 React 树冒泡，必要时用 `event.stopPropagation()`。

类组件的普通方法默认不会自动绑定实例：

```jsx
class Counter extends React.Component {
  state = { count: 0 };
  handleClick = () => this.setState(({ count }) => ({ count: count + 1 }));
  render() { return <button onClick={this.handleClick}>{this.state.count}</button>; }
}
```

箭头字段、构造器中 `bind`、或渲染时包一层函数都可以解决绑定问题；现代新代码优先使用函数组件，不必处理该问题。

## 状态更新、批处理与副作用

**重要程度：⭐⭐⭐⭐⭐**

### `setState` / 状态 setter 为什么不是“立刻改变量”

状态更新是一次向 React 发起的更新请求。React 会调度、批处理并在后续渲染中提供新状态，因此不能依赖调用后的同步读取结果。

```jsx
setCount(count + 1);
setCount(count + 1); // 两次都基于同一个旧 count

setCount(c => c + 1);
setCount(c => c + 1); // 依次基于前一次结果，可靠地 +2
```

#### 面试回答

“不要直接修改 state，也不能把 state 更新理解为同步赋值。React 会把更新放入队列并批处理；当新值依赖旧值时，用函数式更新，React 会按顺序把每次更新应用到最新的待处理状态。”

> **补充说明（非原文）：** React 18 起，自动批处理覆盖了更多异步边界；因此不要再以“合成事件内异步、`setTimeout` 内同步”作为通用判断。应把更新当作可批处理、可调度的请求。

### 不要直接修改状态

直接写 `this.state.message = 'x'` 或 `state.user.name = 'x'` 会绕过 React 的更新流程，也会破坏引用比较。应创建新引用：

```jsx
setUser(user => ({ ...user, profile: { ...user.profile, name: 'Ada' } }));
```

### 状态为何会保留或重置

React 将 state 关联到组件在**渲染树中的位置**，而不是关联到 JSX 中写出的变量名。相同位置上，组件类型和 key 都相同，React 通常保留 state；类型改变、位置改变或 key 改变，旧状态会被重置。

```jsx
// 切换用户时主动重置 Profile 内部的表单状态
<Profile key={user.id} user={user} />
```

这是理解列表 key、条件渲染、表单“为什么没有清空”的统一原则。不要通过定义嵌套组件来“方便地拆代码”：每次父组件渲染都会得到新的组件类型，从而意外重置内部 state。

### `useEffect` 的正确定位

`useEffect` 用来让组件和 React 外部系统同步，例如订阅、定时器、浏览器 API 或第三方实例。它不是“每次想执行一段代码就放进去”的位置。

```jsx
useEffect(() => {
  const connection = connect(roomId);
  return () => connection.disconnect();
}, [roomId]);
```

- 未传依赖数组：每次提交后运行。
- `[]`：挂载后运行一次；开发 Strict Mode 会额外进行一次 setup → cleanup → setup 检验。
- `[a, b]`：首次提交及 `a` 或 `b` 发生 `Object.is` 意义上的变化后运行。
- 返回函数是清理逻辑：在下一次同 Effect 重新执行前，以及卸载时运行。

常见错误是遗漏依赖导致闭包过期、把计算派生值塞进 Effect、或 cleanup 没有撤销订阅。若不是与外部系统同步，通常直接在渲染过程中计算即可。

## 类组件生命周期与函数组件迁移

**重要程度：⭐⭐⭐**

### 生命周期主线

类组件可以按创建、更新、卸载理解：

1. 创建：`constructor` → `render` → `componentDidMount`
2. 更新：`getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`
3. 卸载：`componentWillUnmount`

`render` 必须是纯函数，不能在其中调用 `setState` 或发送请求。`componentDidMount` 适合订阅、请求或读取 DOM；`componentWillUnmount` 要清理计时器、订阅和外部资源。

### 容易追问的方法

- `getDerivedStateFromProps` 是静态方法，返回新的局部 state 或 `null`；只在确实需要从 props 派生状态时使用，绝大多数场景应避免复制 props。
- `shouldComponentUpdate` 返回是否继续本次更新；它是性能提示，不能承载业务正确性。
- `getSnapshotBeforeUpdate` 在 DOM 变更前读取如滚动位置的信息，其返回值传给 `componentDidUpdate`。
- `componentDidUpdate` 适合依据前后 props/state 做副作用，但必须有条件，否则会循环更新。

> **补充说明（非原文）：** `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 属于不安全的旧生命周期，现代代码不要使用。新逻辑优先用函数组件与 Hooks；生命周期不是简单的一对一映射，应该按“渲染计算”和“外部同步”重新拆分。

> [!VISUALIZATION]  
> **类型：** lifecycle  
> **优先级：** high  
> **标题：** 类组件创建、更新与卸载生命周期  
> **目的：** 区分 render 前后、DOM 提交前后以及卸载时的职责。  
> **必须表达：** `getSnapshotBeforeUpdate` 在 DOM 更新前，`componentDidUpdate` 在更新提交后；`render` 保持纯净。  
> **避免表达：** 不要把旧的 `componentWill*` 方法画成现代推荐流程。

## Context、Refs、高阶组件与错误边界

**重要程度：⭐⭐⭐**

### Context：跨层传递，不等于全局状态方案

Context 适合主题、当前用户、国际化等“许多层都需要、变化频率相对可控”的数据。由 Provider 提供值，子树用 `useContext` 读取：

```jsx
const ThemeContext = createContext('light');
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>保存</button>;
}
```

Provider 的 `value` 变化会让使用该 Context 的消费者重新渲染；高频变化的巨大对象应拆分 Context 或使用更合适的状态方案。

### `ref` 的正确边界

`ref` 用于命令式访问 DOM 或保存不触发渲染的可变值，例如聚焦输入框、保存定时器 ID、集成地图/播放器。不要用 ref 替代 UI state。

```jsx
function Search() {
  const inputRef = useRef(null);
  return <button onClick={() => inputRef.current?.focus()}>聚焦</button>;
}
```

类组件可用 `createRef`，函数组件用 `useRef`。跨组件传递 ref 需要组件明确支持；不要依赖已经废弃的字符串 ref。

### Portal：DOM 位置变了，React 树关系不变

Portal 用于把弹窗、浮层等渲染到 `document.body` 等 DOM 容器，避免被父元素的 `overflow` 或层叠上下文裁切：

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(<div className="modal">{children}</div>, document.body);
}
```

它只改变 DOM 挂载位置，不改变 React 的父子关系：Context 仍可读取，事件仍按 React 树冒泡。面试中要把 Portal 与“另开一个 React 根节点”区分开。

### 高阶组件（HOC）

HOC 是接收组件、返回增强组件的模式，例如权限、日志、注入数据。它不是继承，也不应在 `render` 内动态创建，否则每次都会产生新组件类型并导致子树卸载重建。

```jsx
const withLogging = Wrapped => function WithLogging(props) {
  console.log('render', Wrapped.displayName);
  return <Wrapped {...props} />;
};
```

注意透传无关 props；`ref` 不是普通 prop，旧式 HOC 若需转发引用要明确处理。现代业务组合逻辑多用自定义 Hook，HOC 主要出现在旧代码或库封装中。

### 错误边界（Error Boundary）

错误边界通过 `static getDerivedStateFromError` 渲染兜底 UI，通过 `componentDidCatch` 记录错误。它能捕获其子树在渲染、生命周期及构造阶段的错误，但不能捕获事件处理器、异步回调、服务端渲染错误或边界自身错误。

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { reportError(error, info); }
  render() { return this.state.hasError ? <Fallback /> : this.props.children; }
}
```

## 虚拟 DOM、协调、Fiber 与 `key`

**重要程度：⭐⭐⭐⭐⭐**

### 虚拟 DOM 与协调（Reconciliation）

虚拟 DOM 是用普通 JavaScript 对象表达 UI 结构的中间表示；它让 React 能比较前后两次描述并安排 DOM 操作，但性能并非单纯因为“JS 比 DOM 快”。真正价值是声明式编程、批处理和可预测的更新模型。

协调阶段比较新旧 Element/Fiber 树，决定复用、创建、删除或移动哪些节点；提交阶段才把变更写入 DOM。组件状态是否保留取决于它在树中的位置、类型与 key。

### Fiber 是什么

#### 面试回答

“Fiber 是 React 16 引入的协调器重写，也是 React 内部表示一个组件工作单元的数据结构。旧的递归协调一旦开始就会占住调用栈；Fiber 把整棵树的更新拆成一个个节点任务，React 可以给更新分配优先级，在合适的节点让出主线程。低优先级渲染可能被更高优先级更新打断、重启或丢弃；只有完成后才会一次性提交 DOM，所以用户不会看到半更新的界面。”

#### 为什么旧的 Stack Reconciler 不够用

React 15 的协调过程主要依赖 JavaScript 函数调用栈：从根向下递归处理更新，开始后必须一路执行到返回浏览器。大型组件树或昂贵计算容易占用一帧，输入、动画和绘制就会延后，表现为卡顿。

UI 更新并非都同等紧急：输入回显、点击反馈通常应优先于列表筛选、后台数据刷新。要实现“先做重要工作、其余工作稍后继续”，React 需要把递归调用栈中的隐式上下文显式保存下来；Fiber 就是这份可保存、可恢复的工作上下文。

#### Fiber、React Element、组件实例与 DOM 的区别

|对象|是什么|何时创建 / 是否可变|关键作用|
|---|---|---|---|
|React Element|JSX / `createElement` 产出的轻量描述|每次渲染可新建；不可变|描述“想要什么 UI”|
|Fiber|React 内部的工作节点|协调过程中复用、更新|记录该节点的状态、更新、优先级和树关系|
|类组件实例|`class extends Component` 的实例|类组件挂载时创建|保存类实例字段和方法；函数组件没有此实例|
|DOM 节点|浏览器中的宿主节点|提交阶段创建 / 更新|最终的真实页面|

因此，Fiber 不是虚拟 DOM 的同义词，也不是 DOM。一个可更新组件在内部通常会有 `current` 与 `workInProgress` 两个相互指向的 Fiber 副本，但这**不表示一个 DOM 节点有两个 DOM**。

#### 一个 Fiber 节点保存什么

字段会随 React 版本调整，面试不需要背源码的逐字段类型；但可以把一个 Fiber 理解为下面这个“面试理解版”的 TypeScript 对象：

```ts
/**
 * 用于理解 Fiber 的简化模型，不是 React 对外 API，也不保证和任一源码版本逐字段一致。
 */
type FiberNodeForInterview = {
  // ===== 1. 身份：我代表哪个 React 节点 =====

  /**
   * 节点类别：函数组件、类组件、原生 DOM 标签、文本、Fragment 等。
   * React 根据它决定以何种方式处理这个节点。
   */
  tag: number;

  /**
   * 列表中的稳定身份；同一层级中与 type 一起决定是否复用旧 Fiber 和 state。
   */
  key: string | null;

  /**
   * JSX 中的类型：例如函数组件本身、class，或 'div' 这样的宿主标签。
   */
  type: unknown;

  /**
   * 运行环境对应的“实际对象”：类组件通常是实例，DOM Fiber 通常是 DOM 节点。
   * 函数组件没有组件实例，因此这里未必是 DOM。
   */
  stateNode: unknown;

  // ===== 2. 结构：如何不用 JavaScript 调用栈也能遍历整棵树 =====

  /** 父 Fiber；字段名叫 return，表示当前节点完成后要回到哪里。 */
  return: FiberNodeForInterview | null;

  /** 第一个子 Fiber。 */
  child: FiberNodeForInterview | null;

  /** 下一个兄弟 Fiber；多个子节点由 child + sibling 串成链。 */
  sibling: FiberNodeForInterview | null;

  /** 当前节点在同级兄弟中的位置，协调列表时会用到。 */
  index: number;

  /** 本次 render 要附着 / 更新的 ref。 */
  ref: unknown;

  // ===== 3. 输入、状态和更新：本次工作与上次提交结果的对照 =====

  /** 本次 render 正准备处理的 props。 */
  pendingProps: unknown;

  /** 上一次已经完成并提交的 props，可用于判断是否需要继续更新。 */
  memoizedProps: unknown;

  /**
   * 上一次已提交的 state：类组件对应 state；函数组件中对应 Hook 链表的入口。
   */
  memoizedState: unknown;

  /** setState、Hook state 更新、回调等排队等待处理的更新信息。 */
  updateQueue: unknown;

  // ===== 4. 优先级和提交：这次工作何时做、完成后要做什么 =====

  /**
   * 当前节点自身待处理更新所在的 lane 位掩码；不同 lane 代表不同优先级/工作集合。
   */
  lanes: number;

  /** 子树中仍待处理的 lane，帮助 React 快速跳过没有工作的分支。 */
  childLanes: number;

  /** 当前节点在 commit 阶段需要执行的操作，如插入、更新、删除、ref 等。 */
  flags: number;

  /** 子树中的 flags 汇总，避免 commit 阶段重新全树扫描。 */
  subtreeFlags: number;

  // ===== 5. 双缓冲：保持屏幕上的 current 树始终完整 =====

  /**
   * 当前 Fiber 与 work-in-progress Fiber 的配对指针。
   * React 在 alternate 上计算下一版 UI；完成后再提交并切换 current。
   */
  alternate: FiberNodeForInterview | null;
};
```

读这个类型时，可以记住一句话：**Fiber 同时是树节点、可暂停的工作单元，以及保存这次更新中间状态的记录。**

原资料中的 `effectTag`、`nextEffect`、`expirationTime` 是较早版本源码的字段。现代实现用 `flags` / `subtreeFlags` 和 `lanes` 表达相近职责；理解职责比记住字段名更可靠。

#### Fiber 树为什么使用 `child` / `sibling` / `return`

它不是把“DOM diff 树变成链表”，而是用三个指针把组件树改写为可手动遍历的工作链：

```text
App
└─ child → Header ─ sibling → Main ─ sibling → Footer
             ↑ return        ↑ return          ↑ return
            App             App               App
```

React 处理完一个节点后，可以知道下一个要处理的子节点或兄弟节点；若没有，就沿 `return` 回到父节点完成收尾。因为下一步工作和中间状态都在 Fiber 中，而不只存在于 JavaScript 调用栈，调度器才能在节点边界暂停，之后继续寻找剩余工作。

#### 调度、render 与 commit 的工作流程

1. `setState`、state setter、Context 等产生更新；React 为其标记 lane（优先级通道）。
2. 调度器选择当前最重要的 lane，从根开始构造或复用 work-in-progress Fiber 树。
3. **render / reconciliation 阶段**：逐个执行 Fiber 的 begin work 与 complete work，比较新旧子节点，标记需要的副作用；这一阶段在并发渲染中可以让出、继续、重试或因更高优先级更新而放弃。
4. **commit 阶段**：把已完成树的变更写入 DOM / 原生视图，执行 ref 处理和相应的生命周期；提交必须保持原子性，不能中断，否则用户可能看到半成品 UI。
5. 成功提交后，work-in-progress 成为新的 current 树；之后再运行被动 Effect（如 `useEffect`）。

“可中断”只描述 render 阶段，**不是**任意 JavaScript 代码或 DOM 提交都能中断。也不是每个低优先级任务都从精确断点继续：当新的更新使旧计算过期时，React 可以重新渲染，以最终一致且可提交的结果为准。

#### 优先级、Lanes 与 `requestIdleCallback` 的纠正

早期资料常说“每个 Fiber 有优先级”，现代 React 更准确的模型是：**更新和根节点的待处理工作**用 `lanes`（位掩码通道）表示优先级和可合并的工作集合，Fiber / 子树会记录相关 lane 以便快速跳过无关分支。高优先级交互可抢占低优先级渲染；`startTransition` 标记的更新通常属于可延后的工作。

`requestIdleCallback` 体现了“浏览器空闲时做低优先级工作”的早期思路，但 React 不把它当成 Fiber 的必需实现，也不建议业务代码据此推断 React 行为。React 使用自己的 Scheduler 和 `shouldYield` 协作式让出机制；React 源码的 Scheduler 曾明确改用 `MessageChannel` 调度。面试中说“**requestIdleCallback-like 的可让出调度思想**”可以，说“Fiber 调用 `requestIdleCallback` 实现”则不够准确。

#### 双缓冲：`current` 与 `workInProgress`

屏幕正在展示的 Fiber 树是 `current`；React 计算下一版 UI 时，在对应的 `workInProgress` 树上工作，两者由 `alternate` 关联。这样 render 阶段即使被中断，已展示的 `current` 仍然完整可交互；完成后只需在 commit 时切换到新树并应用变更。这是“允许中断却不露出中间态”的关键。

> **补充说明（非原文）：** Fiber 在 React 16 已作为内部架构落地，但早期 React 16 为兼容性并没有开放完整并发能力。可中断渲染、Transitions 等面向应用的并发特性在后续版本、尤其 React 18 的并发根中才成为日常开发会遇到的能力；Fiber 本身不是一个需要业务代码直接调用的 API。

> [!VISUALIZATION]  
> **类型：** architecture  
> **优先级：** high  
> **标题：** React 更新：调度、协调与提交  
> **目的：** 展示状态更新如何进入调度，协调阶段可分片，提交阶段统一写入 DOM。  
> **必须表达：** render/协调可被中断或重试，commit 不可中断；Fiber 节点具有 child、sibling、return 关系。  
> **避免表达：** 不要把 Fiber 描述成真实 DOM，或声称它必然使用 `requestIdleCallback`。

### 并发渲染与 Transition

并发渲染不是“同时运行多个 JavaScript 线程”，而是 React 可以把非紧急的渲染工作暂停、让出、重启。输入回显、点击反馈等紧急更新应保持即时；筛选大列表、切换重页面等可标记为 Transition。

```jsx
const [isPending, startTransition] = useTransition();

function onFilterChange(value) {
  setInput(value);                 // 紧急：立即回显输入框
  startTransition(() => {
    setFilter(value);              // 非紧急：允许被更新输入打断
  });
}
```

- `isPending` 用来展示“结果更新中”的反馈。
- Transition 不应用来控制文本输入的值，否则输入可能滞后。
- 它优化的是交互响应，不替代数据请求、缓存或虚拟列表。

> [!VISUALIZATION]  
> **类型：** timeline  
> **优先级：** medium  
> **标题：** 紧急更新与 Transition 的调度优先级  
> **目的：** 展示输入回显可先完成，而大列表的非紧急渲染可暂停并在新输入后重启。  
> **必须表达：** 这是可中断的渲染调度，不是多线程并行执行。  
> **避免表达：** 不要把 Transition 画成延迟 `setTimeout`，或用于控制文本输入。

### `key`：身份，不是为了消除警告

在同一层级的同类节点之间，`key` 用于标识稳定身份。React 据此决定复用哪一个组件实例和它的 state。

```jsx
items.map(item => <Todo key={item.id} item={item} />)
```

- 优先使用稳定的业务 ID。
- 静态且不重排的列表可使用 index；会插入、删除、排序或含输入状态的列表不要使用 index。
- 不要在每次渲染中生成随机 key；它会强制节点重建并丢失状态。

## Hooks：状态、规则与闭包

**重要程度：⭐⭐⭐⭐⭐**

### Hooks 的规则和 `useState`

Hooks 只能在函数组件或自定义 Hook 的顶层调用，不能放进循环、条件或嵌套函数；React 依靠每次渲染中调用顺序来对应 Hook 状态。

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

`useState` 的 setter 会触发重新渲染；若新旧值按 `Object.is` 相同，React 可跳过不必要更新。复杂的互相关联状态可考虑 `useReducer`。

### 闭包与依赖数组

每次渲染都会产生该次渲染的 props/state 快照；函数、Effect、定时器回调会闭包捕获它们。依赖数组不是“控制 Effect 是否运行的随意开关”，而是声明该 Effect 使用了哪些响应式值。

```jsx
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

这里使用函数式更新，因此不需要读取外层 `count`。若 Effect 读取了 `roomId`、`serverUrl`，它们就应在依赖中。不要为了压过 lint 而随意删除依赖。

### `useRef`、`useMemo`、`useCallback` 与 `memo`

|工具|解决的问题|不要误解为|
|---|---|---|
|`useRef`|跨渲染保存可变值或 DOM 引用，不触发渲染|状态管理替代品|
|`useMemo`|缓存昂贵计算结果或稳定对象引用|默认性能开关|
|`useCallback`|缓存函数引用，常配合 memoized 子组件|让函数执行更快|
|`React.memo`|props 浅比较相等时跳过函数组件渲染|对所有组件都有收益|

先保证组件纯净、state 下沉、列表 key 正确和数据引用稳定；只有通过 profiler 发现实际问题，再增加记忆化。自定义比较函数必须比较所有会影响渲染的 props，否则会产生陈旧 UI。

### `useReducer` 与自定义 Hook

当多个状态彼此关联、更新规则很多，或希望把状态转换独立出来时，用 `useReducer` 会比多个 setter 更清晰。reducer 与 Redux reducer 一样：接收旧状态和 action，返回新状态，保持纯函数。

```jsx
function reducer(state, action) {
  if (action.type === 'submitted') return { ...state, status: 'success' };
  return state;
}
const [state, dispatch] = useReducer(reducer, { status: 'idle' });
```

自定义 Hook 则复用**有状态逻辑**而非 UI：例如 `useOnlineStatus()`、`useDebouncedValue()`。每个调用自定义 Hook 的组件都有自己的 state；它们共享的是逻辑，不是状态实例。Hook 名必须以 `use` 开头，并同样遵守顶层调用规则。

## 渲染性能、代码分割与动画

**重要程度：⭐⭐⭐⭐**

### React 的重渲染不等于 DOM 重建

父组件更新时，子组件通常会再次执行渲染逻辑；随后 React 才会协调差异，若输出没有变化，DOM 可能完全不动。因此排查性能时要区分“组件函数执行”与“DOM 提交”。

常见优化路径：

1. 让 state 靠近真正使用它的组件，避免无关父组件更新。
2. 避免不必要地创建变化引用，合理使用不可变更新。
3. 对确认昂贵且 props 稳定的子组件使用 `memo` / `PureComponent`。
4. 用 React DevTools Profiler 验证，不能凭“行内函数一定慢”等经验下结论。

### 懒加载与 `Suspense`

`lazy` 配合 `Suspense` 可按需加载组件，适合按路由或大功能边界切包。

```jsx
const SettingsPage = lazy(() => import('./SettingsPage'));

<Suspense fallback={<Spinner />}>
  <SettingsPage />
</Suspense>
```

被懒加载模块应有默认导出；加载失败还要用错误边界提供恢复体验。不要把所有小组件都拆包，额外请求和 loading 抖动也有成本。

### 动画的状态转换

`react-transition-group` 的 `CSSTransition` 常通过 enter / exit class 控制样式过渡；动态列表需由 `TransitionGroup` 管理。动画列表同样要求稳定 key，不能使用会变化的 index。优先尊重 `prefers-reduced-motion`，不要让动画阻塞交互。

## 路由：SPA 原理与版本差异

**重要程度：⭐⭐⭐⭐**

### BrowserRouter 与 HashRouter

两者都把 URL 映射到 UI：

- `BrowserRouter` 使用 History API，URL 更自然；生产服务器必须把未知路径回退到应用入口，否则直接访问深层链接会 404。
- `HashRouter` 使用 `#` 后的片段和 `hashchange`，不需要服务器改写，但 URL 较不美观，且片段通常不会发给服务器。

前端路由跳转应使用路由提供的 `Link`/`NavLink`，而非普通 `<a href>` 全页重载。

### 路由匹配、参数与导航

路由参数形如 `/detail/:id`，从路径参数读取；查询参数来自 `location.search`。匹配从具体到模糊排列，避免 `/:id` 抢走固定路径。

> **补充说明（非原文）：** 原 PDF 的 `Switch`、`component` prop、`useHistory`、`Redirect` 是 React Router v5 写法。React Router v6+ 采用 `Routes`、`element`、`useNavigate`、`Navigate`；面试应先说明所用版本，再解释原理，不要混写两套 API。

## Redux、不可变数据与状态管理

**重要程度：⭐⭐⭐⭐**

### Redux 数据流与 `connect`

传统 Redux 的核心链路是：UI `dispatch(action)` → middleware（可选）→ reducer 根据旧 state 和 action 计算新 state → store 通知订阅者 → UI 读取新 state。`reducer` 必须是纯函数，不能直接修改旧 state。

`react-redux` 的 `Provider` 把 store 放入 Context；旧代码用 `connect(mapStateToProps, mapDispatchToProps)` 将 state 和 dispatch 映射为组件 props。函数组件通常使用 `useSelector` 和 `useDispatch`。

### middleware 与 thunk

middleware 位于 dispatch 与 reducer 之间，形态通常为：

```js
const middleware = ({ getState, dispatch }) => next => action => {
  // 记录、拦截或扩展 action
  return next(action);
};
```

`redux-thunk` 允许 dispatch 函数，把异步请求后的结果再 dispatch 成普通 action；logger 用于记录 action 与 state。

> **补充说明（非原文）：** 新项目通常推荐 Redux Toolkit，它封装了 `configureStore`、不可变更新和常见异步模式。理解 Redux 基础链路比手写 `applyMiddleware` 源码更重要。

### 为什么强调不可变更新

不可变更新让“是否变化”可通过引用快速判断，便于 reducer、`memo` 和时间旅行调试。它不是每次都深拷贝：正确做法是只复制被修改路径上的节点，未变化分支复用引用（结构共享）。

`immutable.js` 是一种持久化数据结构库，旧项目可能见到 `Map`、`getIn`、`setIn`；现代 React/Redux 项目更常用普通对象配合 Immer/Redux Toolkit。不要把“深拷贝”当作不可变更新的同义词。

## 服务端渲染（SSR）与 Hydration

**重要程度：⭐⭐⭐**

### SSR 的完整链路

SSR 在服务器根据请求 URL 渲染初始 HTML，浏览器先显示内容，再下载客户端 JavaScript 对已有 HTML 做 hydration，使事件处理和状态接管生效。

```text
请求 URL → 服务端匹配路由并渲染 HTML → 浏览器首屏展示
     → 下载客户端 JS → hydrate / hydrateRoot → 交互可用
```

优点是更快的首屏内容呈现和更利于搜索抓取；代价是服务器渲染成本、数据一致性和工程复杂度。服务端路由通常使用 `StaticRouter`，客户端使用 `BrowserRouter`。

### Hydration 常见追问

- 服务端 HTML 与首次客户端渲染必须一致；把 `Date.now()`、随机数、仅浏览器可用 API 直接写进首屏 render，可能产生 hydration mismatch。
- Effect 不在服务端运行，访问 `window`、`document` 的逻辑应在客户端 Effect 或明确的客户端边界中处理。
- 原资料使用 `renderToString` 和 `ReactDOM.hydrate`。现代客户端入口使用 `hydrateRoot`；大型应用通常采用框架提供的流式 SSR、路由和数据加载能力。

> [!VISUALIZATION]  
> **类型：** flow  
> **优先级：** high  
> **标题：** SSR 到 Hydration 的请求与交互链路  
> **目的：** 区分服务器生成 HTML、浏览器首屏显示与客户端接管交互三个阶段。  
> **必须表达：** SSR 只提供初始 HTML；hydration 复用既有 DOM 并绑定交互；首屏两端输出需要一致。  
> **避免表达：** 不要画成客户端下载 JavaScript 后重新替换全部 DOM。

## 面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- `props`、`state`、单向数据流、受控组件
- `setState` / setter 的队列、批处理与函数式更新
- JSX、虚拟 DOM、协调、Fiber、commit
- `key` 的身份语义
- `useState`、`useEffect`、依赖数组、闭包与 cleanup
- 状态保留/重置、并发渲染与 `useTransition`

### ⭐⭐⭐⭐ 高频重点

- 生命周期与旧生命周期的替代方案
- `Context`、`ref`、错误边界、HOC
- `memo` / `useMemo` / `useCallback` 的边界
- `useReducer`、自定义 Hook 与 Portal 的适用边界
- BrowserRouter / HashRouter 与 Router v5、v6 差异
- Redux 的 dispatch → middleware → reducer 链路

### 容易连续追问的知识链

- 状态更新 → 批处理 → 闭包快照 → 函数式更新 → Effect 依赖
- JSX → React Element → 虚拟 DOM → Reconciliation → Fiber → commit
- 列表渲染 → `key` → 组件身份 → state 保留/重置
- Fiber → 可中断渲染 → 紧急更新 → Transition
- SSR → 首屏 HTML → hydration → 路由与两端一致性
