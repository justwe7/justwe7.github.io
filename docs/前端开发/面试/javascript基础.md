## 一、数据类型

### JS 中有哪些数据类型？两类的存储方式有什么区别？

**基本类型（7 种）：** `string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`

**引用类型：** `object`（包含普通对象、数组、函数、Date 等）

#### 存储方式

| 类型 | 存储位置 | 存的内容 |
|------|----------|----------|
| 基本类型 | 栈内存 | 值本身 |
| 引用类型 | 栈 + 堆 | 栈中存堆的地址（引用） |

基本类型直接在栈上存值，赋值就是拷贝一份新值，互不影响：

```js
let a = 1;
let b = a;
b = 2;
console.log(a); // 1，不受影响
```

引用类型在栈上只存一个指针，真正的数据放在堆里。赋值时拷贝的是地址，两个变量指向同一块堆内存：

```js
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2，被影响了
```

> 这也是浅拷贝和深拷贝问题的根源：浅拷贝只复制引用，深拷贝才会递归复制堆里的数据。

### 如何判断变量类型？typeof / instanceof / Object.prototype.toString 有什么区别？

#### typeof

适合判断基本类型，返回一个字符串：

```js
typeof 'hello'     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof Symbol()    // "symbol"
typeof 42n         // "bigint"
typeof function(){}// "function"

typeof null        // "object"  ⚠️ 历史 bug
typeof {}          // "object"
typeof []          // "object"
```

**`typeof null === "object"` 的原因：** JS 最初用 32 位存储值，低 3 位表示类型标签，`000` 代表对象。`null` 的机器码全为 0，低 3 位也是 `000`，被误判为对象。这是早期实现的 bug，后来为了兼容性一直没修。

`typeof` 对引用类型几乎没区分能力（除了函数），不能区分数组、对象、null。

#### instanceof

通过原型链判断，适合区分引用类型：

```js
[] instanceof Array    // true
[] instanceof Object   // true（Array 原型链上有 Object）
{} instanceof Object   // true
```

**局限性：**

1. **无法判断基本类型**：`1 instanceof Number` 返回 `false`
2. **跨 iframe 失效**：不同窗口/iframe 的 `Array` 构造函数不是同一个，`iframe里的数组 instanceof Array` 会返回 `false`

#### Object.prototype.toString.call()（最准确）

返回 `[object Xxx]` 格式，能精准区分所有类型：

```js
Object.prototype.toString.call('hello')   // "[object String]"
Object.prototype.toString.call(42)        // "[object Number]"
Object.prototype.toString.call(null)      // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call({})        // "[object Object]"
Object.prototype.toString.call(/reg/)     // "[object RegExp]"
```

封装成工具函数：

```js
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}
getType([])   // "array"
getType(null) // "null"
```

> 判断数组还有一个专用方法：`Array.isArray()`，语义清晰，推荐优先用。

#### 三种方法对比

| 方法 | 适用场景 | 局限 |
|------|----------|------|
| `typeof` | 快速判断基本类型 | 无法区分 null / 数组 / 对象 |
| `instanceof` | 区分引用类型 | 跨 iframe 失效；不能判断基本类型 |
| `Object.prototype.toString` | 精准判断任意类型 | 写法稍繁琐 |

## 二、类型转换

### `==` 和 `===` 的区别？`[] == false` 的推导过程？

`===` 严格相等，类型不同直接返回 `false`，不做任何转换。

`==` 宽松相等，类型不同时按以下规则做隐式转换再比较：

#### `==` 的转换规则

1. **有 boolean**：先把 boolean 转为数字（`true → 1`，`false → 0`），再继续比较
2. **string vs number**：把 string 转为 number
3. **object vs 原始值**：对象先调 `valueOf()`，若结果不是原始值再调 `toString()`，转成原始值后继续比较
4. **`null == undefined`**：固定返回 `true`，与其他任何值比较都返回 `false`

#### `[] == false` 的完整推导

```
[] == false

// 步骤 1：有 boolean，先将 false 转为数字
[] == 0

// 步骤 2：object vs number，对象转原始值
//   [].valueOf() 返回 [] 本身，不是原始值
//   [].toString() 返回 ""（空字符串），是原始值
"" == 0

// 步骤 3：string vs number，把字符串转为数字
//   Number("") === 0
0 == 0

// 结果
true
```

> 关键点：`[]` 不是直接转成 `0`，中间经过 `toString()` 得到 `""`，再由 `""` 转成 `0`。

几个容易混淆的结果：

```js
[] == false   // true
[] == ![]     // true（![] 先算得 false，再走上面流程）
{} == false   // false（{}.toString() 是 "[object Object]"，转数字是 NaN）
null == false // false（null 只等于 undefined）
null == 0     // false
```

> 实际开发中一律用 `===`，`==` 的转换规则过于复杂，容易埋坑。

## 三、变量声明：var / let / const

### var、let、const 有什么区别？什么是变量提升和暂时性死区？

#### 三者对比

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 提升，初始值 `undefined` | 提升，但不初始化（TDZ） | 提升，但不初始化（TDZ） |
| 声明前访问 | `undefined` | `ReferenceError` | `ReferenceError` |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 挂到 window | 是 | 否 | 否 |
| 重新赋值 | 允许 | 允许 | 不允许 |

#### 变量提升

`var` 声明会在编译阶段被提升到函数顶部，但只提升声明，不提升赋值：

```js
console.log(a); // undefined（不报错）
var a = 1;

// 等价于：
var a;
console.log(a); // undefined
a = 1;
```

函数声明会整体提升（包括函数体），优先级高于 `var`：

```js
console.log(fn()); // "hello"，可以在声明前调用
function fn() { return 'hello'; }
```

#### 暂时性死区（TDZ）

`let` 和 `const` 同样会被提升，但从块作用域开始到声明语句之前，变量处于**暂时性死区**，访问会抛 `ReferenceError`：

```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;
```

TDZ 的存在是有意为之，强制要求先声明再使用，避免 `var` 带来的隐患。

#### const 的"不可变"是绑定不可变，不是值不可变

`const` 禁止的是重新赋值（修改绑定），对象或数组的内部属性仍可修改：

```js
const obj = { a: 1 };
obj.a = 2;    // ✅ 允许，修改的是属性
obj = {};     // ❌ TypeError，不能重新赋值

const arr = [1, 2];
arr.push(3);  // ✅ 允许
arr = [];     // ❌ TypeError
```

如果需要完全冻结对象，用 `Object.freeze(obj)`（浅冻结，嵌套对象需递归处理）。

## 四、作用域与闭包

### 什么是作用域链？什么是闭包？闭包会带来什么问题？

#### 什么是作用域

**作用域（Scope）** 是变量和函数的**可访问范围**，决定了代码中哪些地方可以引用某个变量。超出作用域访问变量会报 `ReferenceError`。

作用域的作用是**隔离变量**，防止不同区域的同名变量互相干扰：

```js
function a() { let x = 1; }
function b() { let x = 2; }
// 两个 x 在各自作用域内，互不影响
```

#### 作用域的分类

**作用域**决定变量在哪里可以被访问，JS 中有四种：

**1. 全局作用域**：在所有函数和块之外声明的变量，整个程序都能访问。浏览器中挂在 `window` 上（`var` 声明）：

```js
var globalVar = 'global';
console.log(window.globalVar); // "global"
```

**2. 函数作用域（局部作用域）**：`var` 声明的变量只在所在函数内可访问，函数外不可见：

```js
function fn() {
  var local = 'only here';
}
console.log(local); // ReferenceError
```

**3. 块级作用域**：`let` / `const` 声明的变量只在 `{}` 块内有效，出了块就不可访问：

```js
{
  let blockVar = 'block';
  const blockConst = 'block';
}
console.log(blockVar); // ReferenceError

if (true) {
  let x = 1;
}
console.log(x); // ReferenceError

for (let i = 0; i < 3; i++) { ... }
console.log(i); // ReferenceError（用 var 则不会报错）
```

**4. 模块作用域**：ES Module 中，每个文件有自己独立的作用域，不会污染全局，需要显式 `export` 才能被外部使用。

#### 词法作用域与作用域链

JS 使用**词法作用域**（静态作用域）：变量的作用域在**代码书写时**就已确定，与函数在哪里调用无关。

```js
const x = 'global';
function outer() {
  const x = 'outer';
  function inner() {
    console.log(x); // "outer"，由书写位置决定，不是调用位置
  }
  inner();
}
```

**作用域链**：查找变量时，先在当前作用域找，找不到就往外层作用域找，一直到全局作用域，形成一条链。找不到就报 `ReferenceError`。

#### 闭包

**定义**：当一个内层函数引用了外层函数的变量，并且这个内层函数在外层函数执行完后仍然存活，就形成了闭包。

闭包的关键不是"函数内有函数"，而是**内层函数持有了对外层变量的引用，使其在外层函数销毁后依然存在**：

```js
function makeCounter() {
  let count = 0;         // 外层变量
  return function () {   // 内层函数持有 count 的引用
    return ++count;
  };
}

const counter = makeCounter(); // makeCounter 执行完，但 count 没被回收
counter(); // 1
counter(); // 2
counter(); // 3
```

常见用途：**封装私有状态、函数工厂、模块模式**。

#### 闭包导致的内存问题

正常情况下，函数执行完毕，其局部变量会被垃圾回收。但如果闭包持有对这些变量的引用，GC 就无法回收，导致内存占用持续增长：

```js
function createHeavy() {
  const bigData = new Array(1000000).fill('*'); // 大对象
  return function () {
    console.log(bigData.length); // 持有引用，bigData 无法被回收
  };
}

const fn = createHeavy();
// fn 不用了但没有释放，bigData 一直在内存里
```

**解决方法：**

```js
fn = null; // 手动解除引用，GC 才能回收
```

或者在闭包内只保留需要的数据，不持有整个大对象：

```js
function createHeavy() {
  const bigData = new Array(1000000).fill('*');
  const len = bigData.length; // 只取需要的值
  return function () {
    console.log(len); // 闭包只引用 len，bigData 可以被回收
  };
}
```

> 经典的闭包内存泄漏场景：事件监听器中引用了大对象，但监听器没有及时移除。

## 五、原型与原型链

### prototype、__proto__、原型链是什么关系？

#### 三个概念

**`prototype`**：函数专有属性。每个函数都有一个 `prototype` 对象，用 `new` 创建实例时，实例的原型会指向这个对象。注意 `Date`、`Array`、`Object` 等内置构造函数本质也是函数，所以它们同样有 `prototype`；但 `new Date()` 这样的实例没有 `prototype`，只有 `__proto__`：

```js
typeof Date              // "function"
Date.prototype           // ✅ 存在，上面挂着 getFullYear 等方法
new Date().prototype     // undefined —— 实例没有 prototype
new Date().__proto__ === Date.prototype // true
```

**`__proto__`**：每个对象都有（非标准，但浏览器普遍支持）。指向该对象的原型，等价于 `Object.getPrototypeOf(obj)`。

**`Object.getPrototypeOf()`**：获取对象原型的标准方法，推荐用这个替代 `__proto__`。

三者的核心关系：

```js
function Person(name) {
  this.name = name;
}

const p = new Person('Alice');

p.__proto__ === Person.prototype              // true
Object.getPrototypeOf(p) === Person.prototype // true
Person.prototype.constructor === Person       // true
```

#### 原型链

访问对象的属性时，JS 引擎会：

1. 先在对象自身找
2. 找不到就去 `__proto__`（即构造函数的 `prototype`）找
3. 还找不到继续往上，直到 `Object.prototype`
4. `Object.prototype.__proto__` 是 `null`，到头了，返回 `undefined`

这条查找路径就是**原型链**：

```
p → Person.prototype → Object.prototype → null
```

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} speaks`;
};

const dog = new Animal('Rex');
dog.speak();        // "Rex speaks"（在 Animal.prototype 上找到）
dog.hasOwnProperty // 在 Object.prototype 上找到
dog.xxx            // undefined（到 null 都没找到）
```

#### 用图理解

```
dog
 └── __proto__ → Animal.prototype
                  ├── speak()
                  └── __proto__ → Object.prototype
                                   ├── hasOwnProperty()
                                   ├── toString()
                                   └── __proto__ → null
```

#### instanceof 的本质

`instanceof` 就是沿原型链查找，看构造函数的 `prototype` 是否出现在链上：

```js
dog instanceof Animal  // true：Animal.prototype 在 dog 的原型链上
dog instanceof Object  // true：Object.prototype 也在链上
```

> `__proto__` 是非标准属性，生产代码中用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 代替。

## 六、this 指向

### this 的指向规则？箭头函数的 this 有何不同？call / apply / bind 的区别？

`this` 的值不是在函数定义时确定的，而是在**调用时**确定的（箭头函数除外）。

#### 四种绑定规则（优先级从高到低）

**1. new 绑定**：用 `new` 调用构造函数，`this` 指向新创建的实例。

```js
function Person(name) { this.name = name; }
const p = new Person('Alice');
p.name; // "Alice"，this 指向 p
```

**2. 显式绑定**：通过 `call`、`apply`、`bind` 手动指定 `this`。

**3. 隐式绑定**：通过对象调用方法，`this` 指向该对象。

```js
const obj = {
  name: 'obj',
  fn() { console.log(this.name); }
};
obj.fn(); // "obj"，this 是 obj
```

隐式绑定容易丢失——把方法赋值给变量再调用，`this` 就不再是 `obj`：

```js
const fn = obj.fn;
fn(); // undefined 或报错，this 变成全局/undefined（严格模式）
```

**4. 默认绑定**：直接调用函数，非严格模式 `this` 是全局对象（浏览器是 `window`），严格模式是 `undefined`。

#### 箭头函数的 this

箭头函数**没有自己的 `this`**，它的 `this` 在**定义时**就从外层词法作用域继承，且不能被 `call`/`apply`/`bind` 改变：

```js
const obj = {
  name: 'obj',
  fn() {
    const arrow = () => console.log(this.name); // 继承 fn 的 this
    arrow(); // "obj"
  }
};
obj.fn();

// call 无效
obj.fn.call({ name: 'other' }); // arrow 里 this 跟随 fn 的 this，变成 "other"
// 但对 arrow 本身用 call 不起作用：
const arrow = () => {};
arrow.call({ x: 1 }); // this 仍然是外层的，call 无效
```

> 箭头函数解决的是回调中 `this` 丢失的问题，是词法绑定，不是"禁止修改"。

#### call / apply / bind 的区别

三者都可以显式指定 `this`，区别在于**是否立即执行**和**参数传法**：

| 方法 | 是否立即执行 | 参数形式 |
|------|------------|---------|
| `call` | 立即执行 | 逐个传：`fn.call(ctx, a, b)` |
| `apply` | 立即执行 | 数组传：`fn.apply(ctx, [a, b])` |
| `bind` | 不执行，返回新函数 | 逐个传，可分次传 |

```js
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}
const ctx = { name: 'Alice' };

greet.call(ctx, 'Hello', '!');     // "Hello, Alice!"
greet.apply(ctx, ['Hello', '!']);  // "Hello, Alice!"

const boundGreet = greet.bind(ctx, 'Hello');
boundGreet('!'); // "Hello, Alice!"，第一个参数已提前绑定
```

`apply` 常用于把数组展开传给不接受数组的函数（ES6 前的做法，现在可以用展开运算符代替）：

```js
Math.max.apply(null, [1, 3, 2]); // 3
Math.max(...[1, 3, 2]);          // 3，ES6 写法
```

## 七、事件循环

### 事件循环是什么？宏任务和微任务的执行顺序？

JS 是单线程语言，事件循环（Event Loop）是它处理异步任务的机制。

#### 宏任务与微任务

| 类型 | 常见来源 |
|------|---------|
| 宏任务（MacroTask） | `script` 整体代码、`setTimeout`、`setInterval`、I/O、UI 渲染 |
| 微任务（MicroTask） | `Promise.then/catch/finally`、`MutationObserver`、`queueMicrotask` |

#### 执行顺序规则

```
执行一个宏任务（含初始 script）
    ↓
清空所有微任务队列（含执行微任务期间新加入的）
    ↓
渲染（浏览器环境）
    ↓
取下一个宏任务，重复
```

关键点：**每个宏任务结束后，立即清空全部微任务，再执行下一个宏任务。** 不是等到"下一轮"才执行微任务。

#### 代码示例分析

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

执行过程：

```
1. 执行宏任务（script 整体）：
   - console.log('1')        → 输出 1
   - setTimeout 回调 → 推入宏任务队列
   - Promise.then 回调 → 推入微任务队列
   - console.log('4')        → 输出 4

2. 当前宏任务结束，清空微任务队列：
   - console.log('3')        → 输出 3

3. 取下一个宏任务（setTimeout 回调）：
   - console.log('2')        → 输出 2
```

**输出顺序：`1 → 4 → 3 → 2`**

#### 微任务会"插队"

微任务在当前宏任务结束后**立即**执行，即使 `setTimeout` 的延迟是 `0`，也会在它之后：

```js
setTimeout(() => console.log('宏任务'), 0);
Promise.resolve().then(() => console.log('微任务'));
// 输出：微任务 → 宏任务
```

> 面试追问：如果微任务里继续产生微任务，会在同一轮全部清空，不会等到下一个宏任务。这可能导致宏任务被饿死（starved），写递归 Promise 链时要注意。

#### Node.js 的事件循环

Node.js 的事件循环比浏览器更复杂，分为 **6 个阶段**，每个阶段处理特定类型的回调：

```
   ┌─────────────────────────┐
   │  timers                 │  ← setTimeout / setInterval 回调
   └──────────┬──────────────┘
              │
   ┌──────────▼──────────────┐
   │  pending callbacks      │  ← 上一轮延迟的 I/O 错误回调
   └──────────┬──────────────┘
              │
   ┌──────────▼──────────────┐
   │  poll                   │  ← 等待新的 I/O 事件（核心阶段）
   └──────────┬──────────────┘
              │
   ┌──────────▼──────────────┐
   │  check                  │  ← setImmediate 回调
   └──────────┬──────────────┘
              │
   ┌──────────▼──────────────┐
   │  close callbacks        │  ← socket.on('close') 等
   └─────────────────────────┘
```

**每个阶段切换之间**，Node.js 会清空两个微任务队列（优先级从高到低）：

1. `process.nextTick` 队列
2. `Promise.then` 队列

#### process.nextTick 的优先级高于 Promise

这是 Node.js 与浏览器最大的区别：

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
// 输出：nextTick → promise
```

#### setImmediate vs setTimeout(fn, 0)

- `setImmediate`：在 check 阶段执行
- `setTimeout(fn, 0)`：在 timers 阶段执行

在主模块（非 I/O 回调）中，两者顺序**不确定**（受系统计时器精度影响）；但在 **I/O 回调内部**，`setImmediate` 始终先于 `setTimeout`：

```js
const fs = require('fs');
fs.readFile('file', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // 始终输出：immediate → timeout
});
```

#### 浏览器 vs Node.js 事件循环对比

| | 浏览器 | Node.js |
|--|--------|---------|
| 循环结构 | 宏任务 + 微任务队列 | 6 个阶段 |
| 微任务优先级 | Promise.then（统一） | nextTick > Promise.then |
| setImmediate | 不支持 | check 阶段执行 |
| 渲染时机 | 微任务后、下一宏任务前 | 无渲染 |

#### 综合题：async/await + Promise + setTimeout

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');
```

**输出顺序：`script start → async1 start → async2 → promise1 → script end → async1 end → promise2 → setTimeout`**

推导过程：

```
【同步执行 script 宏任务】
1. console.log('script start')        → 输出 "script start"
2. setTimeout 回调                    → 推入宏任务队列
3. async1() 调用：
   - console.log('async1 start')      → 输出 "async1 start"
   - await async2()：
     - async2 函数体同步执行
     - console.log('async2')          → 输出 "async2"
     - async2 返回 resolved Promise
     - await 在此挂起 async1，后续代码推入微任务队列
4. new Promise(executor)：
   - executor 同步执行
   - console.log('promise1')          → 输出 "promise1"
   - resolve() 调用，.then 回调推入微任务队列
5. console.log('script end')          → 输出 "script end"

【清空微任务队列】
6. async1 后续：console.log('async1 end')  → 输出 "async1 end"
7. promise.then：console.log('promise2')   → 输出 "promise2"

【执行下一个宏任务】
8. setTimeout 回调：console.log('setTimeout') → 输出 "setTimeout"
```

**两个易错点：**

- `await async2()` 中，async2 的**函数体是同步执行的**，只是 async2 返回后 await 才挂起 async1。async2 不会被推迟。
- `new Promise(executor)` 中，**executor 是同步执行的**，只有 `.then` 的回调才是微任务。`promise1` 在同步阶段就打印了。

## 八、Promise

### Promise 的状态与静态方法

#### 三种状态

Promise 有三种状态，且状态一旦改变不可逆：

```
pending（等待）→ fulfilled（成功）
               → rejected（失败）
```

```js
const p = new Promise((resolve, reject) => {
  resolve('ok');   // pending → fulfilled
  reject('err');   // 已经 fulfilled，这行无效
});
```

#### Promise.all

**全部成功才成功，一个失败立即失败。**

- 接收 Promise 数组，全部 fulfilled 时返回结果数组（顺序与入参一致）
- 任意一个 rejected，立即以该原因 reject，其他 Promise 继续执行但结果被忽略

```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(res => console.log(res)); // [1, 2, 3]

Promise.all([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
]).catch(err => console.log(err)); // "error"
```

适用场景：多个请求都必须成功才能继续（如同时拉取多份配置）。

#### Promise.race

**第一个落定的结果（不论成功或失败）就是最终结果。**

```js
Promise.race([
  new Promise(resolve => setTimeout(() => resolve('慢'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('快'), 100)),
]).then(res => console.log(res)); // "快"

Promise.race([
  new Promise((_, reject) => setTimeout(() => reject('失败'), 100)),
  new Promise(resolve => setTimeout(() => resolve('成功'), 1000)),
]).catch(err => console.log(err)); // "失败"（失败的先落定）
```

适用场景：超时控制。

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

#### Promise.allSettled

**等所有 Promise 落定，不管成功还是失败，返回每个结果的详细信息。**

返回数组，每项是 `{ status, value }` 或 `{ status, reason }`：

```js
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
]).then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected',  reason: 'error' },
//   { status: 'fulfilled', value: 3 },
// ]
```

适用场景：批量操作，需要知道每一项的结果（如批量上传文件，无论成败都要汇总报告）。

#### 四种静态方法对比

| 方法 | 触发条件 | 失败处理 |
|------|---------|---------|
| `Promise.all` | 全部 fulfilled | 任一 rejected 立即终止 |
| `Promise.race` | 第一个落定 | 第一个若是 rejected 也终止 |
| `Promise.allSettled` | 全部落定 | 不会 reject，全部记录 |
| `Promise.any` | 第一个 fulfilled | 全部 rejected 才 reject |

## 九、async / await 与 Generator

### async/await 是什么？与 Promise 的关系？如何捕获错误？

#### async/await 是 Promise 的语法糖

`async/await` 让异步代码写起来像同步代码，本质上是对 Promise 的封装：

- `async` 函数始终返回一个 Promise
- `await` 暂停当前 async 函数，等待 Promise 落定后继续执行

```js
// Promise 写法
function fetchUser() {
  return fetch('/api/user')
    .then(res => res.json())
    .then(data => data.name);
}

// async/await 等价写法
async function fetchUser() {
  const res = await fetch('/api/user');
  const data = await res.json();
  return data.name; // 自动包成 Promise.resolve(data.name)
}
```

#### 错误捕获

`try/catch` **可以**捕获 async 函数内 await 抛出的错误（即 Promise rejected 的情况），这是 async/await 相比 `.then` 链最大的优势：

```js
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('请求失败：', err); // rejected 或运行时错误都能捕获
  }
}
```

裸 Promise 需要用 `.catch()` 处理：

```js
fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error(err));
```

两种方式等价，`try/catch` 的优势是能和同步错误统一处理，代码更直观。

> 注意：不加 `try/catch` 也不加 `.catch()`，rejected 的 Promise 会变成未处理的 rejection（`UnhandledPromiseRejection`），生产环境会报错。

#### Generator 函数（yield）

Generator 是 async/await 的前身，理解它有助于理解 async/await 的本质。

用 `function*` 声明，`yield` 暂停执行并返回值，调用 `.next()` 继续：

```js
function* gen() {
  console.log('start');
  const a = yield 1;   // 暂停，返回 1；下次 .next(val) 的 val 赋给 a
  console.log('a =', a);
  yield 2;
  console.log('end');
}

const g = gen();
g.next();        // 输出 "start"，返回 { value: 1, done: false }
g.next('hello'); // 输出 "a = hello"，返回 { value: 2, done: false }
g.next();        // 输出 "end"，返回 { value: undefined, done: true }
```

Generator 与 async/await 的对比：

| | Generator | async/await |
|--|-----------|------------|
| 声明 | `function*` | `async function` |
| 暂停 | `yield` | `await` |
| 恢复 | 手动 `.next()` | 自动（由 Promise 驱动） |
| 返回值 | Iterator 对象 | Promise |
| 错误处理 | `.throw()` 注入错误 | `try/catch` |

async/await 本质上就是 Generator + 自动执行器（不需要手动 `.next()`），由 JS 引擎帮你驱动。

## 十、深拷贝与浅拷贝

### 深拷贝和浅拷贝的区别？常见实现方式？JSON 方案的缺陷？

#### 浅拷贝 vs 深拷贝

- **浅拷贝**：只复制对象的第一层，嵌套的引用类型仍指向同一块堆内存
- **深拷贝**：递归复制所有层，新对象与原对象完全独立，互不影响

```js
const obj = { a: 1, b: { c: 2 } };

// 浅拷贝
const shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99，被影响了

// 深拷贝
const deep = structuredClone(obj);
deep.b.c = 99;
console.log(obj.b.c); // 2，不受影响
```

#### 常见浅拷贝方式

```js
Object.assign({}, obj)   // 只拷贝一层
{ ...obj }               // 展开运算符，同上
arr.slice()              // 数组浅拷贝
[...arr]                 // 数组展开
```

#### 深拷贝方案对比

**方案一：JSON.parse(JSON.stringify())**

最常见的简单方案，但缺陷很多：

| 情况 | 结果 |
|------|------|
| `function` | 属性消失 |
| `undefined` | 属性消失 |
| `Symbol` 属性 | 消失 |
| `Date` 对象 | 变成字符串，不还原为 `Date` |
| `RegExp`、`Map`、`Set` | 无法正确复制 |
| `NaN`、`Infinity` | 变成 `null` |
| 循环引用 | 直接报错 |

```js
const obj = { fn: () => {}, d: new Date(), n: NaN };
const copy = JSON.parse(JSON.stringify(obj));
// { d: "2024-01-01T00:00:00.000Z", n: null }
// fn 属性消失，d 变字符串，n 变 null
```

**方案二：structuredClone()（推荐，现代原生方案）**

Node 17+ 和现代浏览器原生支持，解决了 JSON 方案的大部分问题：

```js
const obj = {
  d: new Date(),
  arr: [1, 2, 3],
  map: new Map([['key', 'val']]),
};
const copy = structuredClone(obj);
copy.d instanceof Date; // true，Date 正确还原
```

支持：Date、Map、Set、ArrayBuffer、循环引用  
**不支持**：`function`（会抛 `DataCloneError`）

**方案三：_.cloneDeep()（lodash）**

最全面，支持几乎所有类型，包括 function（直接复制引用）：

```js
import _ from 'lodash';
const copy = _.cloneDeep(obj);
```

适合复杂场景，但引入了额外依赖。

**方案四：手写递归**

面试常考，核心思路：

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj); // 处理循环引用

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}
```

关键点：
- 用 `WeakMap` 记录已处理的对象，防止循环引用死循环
- `Reflect.ownKeys()` 能遍历 Symbol 属性
- 需要额外处理 Date、RegExp、Map、Set 等特殊类型

#### 方案选择建议

| 场景 | 推荐方案 |
|------|---------|
| 数据简单，无特殊类型 | `JSON.parse(JSON.stringify())` |
| 现代浏览器/Node 17+ | `structuredClone()` |
| 复杂对象，有依赖 lodash | `_.cloneDeep()` |
| 面试手写 | 递归 + WeakMap 处理循环引用 |

## 十一、防抖与节流

### 防抖和节流的区别？各适用什么场景？手写实现？

两者都是限制函数执行频率的技术，区别在于触发时机：

- **防抖（debounce）**：连续触发时，只执行**最后一次**。停止触发后等待 n 秒才真正执行。
- **节流（throttle）**：无论触发多密集，每隔 n 秒**最多执行一次**。

#### 防抖（debounce）

核心思路：每次触发都清除上一个定时器，重新计时；只有停止触发 n 秒后才真正执行。

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);                         // 清除上次定时器
    timer = setTimeout(() => {
      fn.apply(this, args);                      // 延迟执行
    }, delay);
  };
}

// 使用
const handleSearch = debounce((val) => {
  console.log('搜索：', val);
}, 500);

input.addEventListener('input', (e) => handleSearch(e.target.value));
```

适用场景：
- 搜索框输入（停止输入后再发请求）
- 窗口 resize 后重新计算布局
- 表单验证（停止输入后校验）

#### 节流（throttle）

核心思路：记录上次执行时间，每次触发时判断距上次是否超过间隔，超过才执行。

```js
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {            // 距上次执行已超过间隔
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用
const handleScroll = throttle(() => {
  console.log('滚动位置：', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```

适用场景：
- 页面滚动监听（scroll、mousemove）
- 按钮防重复点击
- 游戏中的按键触发频率控制

#### 对比总结

| | 防抖 | 节流 |
|--|------|------|
| 执行时机 | 停止触发后 n 秒 | 每 n 秒最多一次 |
| 连续触发时 | 一直不执行，直到停下来 | 稳定每隔 n 秒执行 |
| 核心实现 | clearTimeout + setTimeout | 时间戳对比 |
| 典型场景 | 搜索框、resize | scroll、mousemove、防重复点击 |

#### 立即执行（leading）版本

**节流的时间戳版本本身就是 leading**：第一次触发时 `Date.now() - 0 >= interval` 成立，直接执行。

**防抖需要额外加 `immediate` 参数**：第一次触发立即执行，delay 内的后续触发都忽略，等 timer 结束清空后才允许下一次立即执行：

```js
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    if (immediate && !timer) {
      fn.apply(this, args);  // timer 为空说明是"冷却后的第一次"，立即执行
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;          // 冷却完毕，下次触发可以再立即执行
      if (!immediate) fn.apply(this, args);
    }, delay);
  };
}
```

> 实际项目中推荐直接用 `lodash` 的 `_.debounce()` 和 `_.throttle()`，它们通过 `{ leading: true, trailing: false }` 等配置项灵活控制执行时机。

## 十二、继承与 class

### JS 继承怎么实现？class 和原型链是什么关系？super 是什么？

#### ES6 class 继承

用 `extends` 声明继承关系，子类 `constructor` 中必须先调用 `super()` 才能使用 `this`：

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);           // 必须先调用，相当于执行父类的 constructor
    this.breed = breed;    // 之后才能用 this
  }
  speak() {
    return `${this.name} barks.`;
  }
  info() {
    return super.speak() + ` (${this.breed})`; // super.method() 调用父类方法
  }
}

const dog = new Dog('Rex', 'Husky');
dog.speak();  // "Rex barks."
dog.info();   // "Rex makes a sound. (Husky)"
```

`super` 的两种用法：
- **`super()`**：在 constructor 中调用父类构造函数，初始化父类属性
- **`super.method()`**：在普通方法中调用父类的同名方法

#### class 是原型链的语法糖

`class` 的底层仍然是原型链，`extends` 本质上做了两件事：

```js
// class Dog extends Animal 等价于：
Dog.prototype = Object.create(Animal.prototype);  // 实例方法继承
Dog.__proto__ = Animal;                           // 静态方法继承
```

验证：

```js
Object.getPrototypeOf(Dog) === Animal             // true（静态继承）
Object.getPrototypeOf(dog) === Dog.prototype      // true
Dog.prototype instanceof Animal                   // true（实例继承）
```

#### ES5 原型链继承（面试常考）

在没有 `class` 之前，常用**组合继承**：构造函数继承属性 + 原型链继承方法：

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound.`;
};

function Dog(name, breed) {
  Animal.call(this, name);   // 借用构造函数，继承实例属性
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // 继承方法
Dog.prototype.constructor = Dog;                 // 修复 constructor 指向

const dog = new Dog('Rex', 'Husky');
dog.speak(); // "Rex makes a sound."
```

**为什么不直接 `Dog.prototype = new Animal()`？**  
这样做父类构造函数会被执行一次，可能带来副作用，也会在原型上留下多余的实例属性。`Object.create()` 只创建一个以 `Animal.prototype` 为原型的空对象，更干净。

#### 对比

| | ES5 组合继承 | ES6 class |
|--|------------|-----------|
| 写法 | 手动 call + Object.create | extends + super |
| 静态方法继承 | 需手动处理 | 自动继承 |
| 底层机制 | 原型链 | 原型链（语法糖） |
| 可读性 | 较差 | 清晰 |

## 十三、模块化

### CommonJS 和 ES Module 的区别？AMD / CMD / UMD 是什么？

#### CommonJS（CJS）

Node.js 采用的模块规范，使用 `require()` 同步加载，`module.exports` 导出：

```js
// 导出
module.exports = { add: (a, b) => a + b };
// 或
exports.add = (a, b) => a + b;

// 导入
const { add } = require('./math');
```

特点：
- **运行时加载**：`require` 在代码执行到该行时才加载模块
- **导出值的拷贝**：导入的是值的副本，模块内部变量变化不会影响已导入的值
- **同步**：适合服务端（文件系统读取），不适合浏览器（网络请求耗时）

#### ES Module（ESM）

ES6 引入的官方标准，现代浏览器和 Node.js（12+）原生支持：

```js
// 导出
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// 导入
import { add } from './math.js';
import multiply from './math.js';
```

特点：
- **编译时静态分析**：`import` 在解析阶段处理，不能放在条件语句里
- **导出实时绑定（live binding）**：导入的是变量的引用，模块内部变化会反映出来
- **支持 Tree Shaking**：打包工具可以静态分析，删除未使用的导出
- **异步加载**：适合浏览器环境

#### CJS vs ESM 核心区别

| | CommonJS | ES Module |
|--|---------|----------|
| 语法 | `require` / `module.exports` | `import` / `export` |
| 加载时机 | 运行时 | 编译时（静态） |
| 导出内容 | 值的拷贝 | 实时绑定（引用） |
| 动态导入 | 天然支持 | `import()` 函数 |
| Tree Shaking | 不支持 | 支持 |
| 顶层 await | 不支持 | 支持 |
| 环境 | Node.js | 浏览器 + Node.js 12+ |

#### 能否混用？

**原生 Node.js 不能直接混用**，`.js` 文件默认是 CJS，要使用 ESM 需要：
- 文件改为 `.mjs` 扩展名，或
- `package.json` 中设置 `"type": "module"`

**在打包工具（Webpack / Vite / Babel）中可以混用**，工具会自动处理两种规范的互操作（interop），编译后统一为一种格式。

#### AMD / CMD / UMD（历史规范）

这三种规范是 ES Module 出现前，社区为解决浏览器模块化问题的探索：

**AMD（Asynchronous Module Definition）**

由 RequireJS 推广，专为浏览器设计，**异步加载**，依赖前置（提前声明所有依赖）：

```js
define(['jquery', 'lodash'], function($, _) {
  return {
    doSomething: function() { ... }
  };
});
```

**CMD（Common Module Definition）**

由国内 SeaJS 推广，与 AMD 类似但采用**懒加载**（用到时才执行依赖），风格更接近 CommonJS：

```js
define(function(require, exports, module) {
  var $ = require('jquery');  // 用到时再 require
  exports.doSomething = function() { ... };
});
```

**UMD（Universal Module Definition）**

兼容 AMD、CommonJS 和全局变量三种环境的通用格式，常用于**发布第三方库**：

```js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['dep'], factory);          // AMD
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('dep')); // CommonJS
  } else {
    root.MyLib = factory(root.dep);    // 全局变量
  }
}(this, function(dep) {
  return { /* 库的代码 */ };
}));
```

> 现在写库一般用打包工具（Rollup / tsup）自动生成 ESM + CJS 双格式，不需要手写 UMD 样板代码了。

## 十四、Map 与 WeakMap

### Map 和普通对象的区别？WeakMap 是什么？什么时候用 WeakMap？

#### Map vs 普通对象 `{}`

**键的类型：**

```js
const map = new Map();
map.set({ id: 1 }, 'user');   // ✅ 对象作为 key
map.set(42, 'number key');    // ✅ 数字作为 key
map.set(() => {}, 'fn key');  // ✅ 函数作为 key

const obj = {};
obj[{ id: 1 }] = 'user';     // ⚠️ 对象 key 会被转成字符串 "[object Object]"
```

**key 的顺序：**

- `Map`：严格按**插入顺序**遍历
- `{}`：整数 key 按数值升序排在前面，字符串 key 按插入顺序，Symbol key 最后

```js
const obj = {};
obj['b'] = 1;
obj['a'] = 2;
obj[2] = 3;
obj[1] = 4;
Object.keys(obj); // ['1', '2', 'b', 'a']，整数 key 先按数值排
```

**遍历方式：**

```js
const map = new Map([['a', 1], ['b', 2]]);
for (const [key, val] of map) { ... }  // ✅ 直接 for...of
map.forEach((val, key) => { ... });    // ✅ forEach

// 对象需要先取 keys
for (const key of Object.keys(obj)) { ... }
```

**其他差异：**

| | Map | 普通对象 `{}` |
|--|-----|-------------|
| key 类型 | 任意值 | 字符串（数字做 key 会被隐式转换） / Symbol |
| 大小 | `.size` 直接获取 | `Object.keys(obj).length` |
| 遍历 | 直接 `for...of` | 需要 `Object.keys()` 等 |
| 原型污染 | 无原型链风险 | 有（如 `toString`、`constructor`） |
| 适合场景 | 频繁增删、key 非字符串 | 静态结构、JSON 序列化 |

#### WeakMap

WeakMap 与 Map 的核心区别：**key 必须是对象，且是弱引用**。

弱引用意味着：如果 key 对象在外部没有其他引用，垃圾回收器可以直接回收它，WeakMap 中对应的条目也会自动消失，**不会造成内存泄漏**。

正因为 key 随时可能被回收，WeakMap **不支持遍历**（没有 `forEach`、`keys()`、`size`）：

```js
const wm = new WeakMap();
let obj = { name: 'Alice' };
wm.set(obj, { extraData: '...' });

obj = null; // obj 被回收，wm 中对应条目也会自动清除
```

#### WeakMap 的典型使用场景

**1. 存储 DOM 节点的附加数据，节点删除后自动清理：**

```js
const domCache = new WeakMap();

function setData(node, data) {
  domCache.set(node, data);
}

// 节点从 DOM 中移除后，domCache 中的数据会被自动 GC，不会泄漏
```

**2. 私有属性模拟（class 出现前的常见模式）：**

```js
const _private = new WeakMap();

class Person {
  constructor(name, age) {
    _private.set(this, { age });  // age 不挂在实例上，外部访问不到
    this.name = name;
  }
  getAge() {
    return _private.get(this).age;
  }
}
```

**3. 缓存计算结果，对象销毁后缓存自动失效（前面手写深拷贝中处理循环引用用的就是 WeakMap）。**

#### 类似的还有 WeakSet

`WeakSet` 是弱引用版本的 `Set`，只能存对象，不可遍历，使用场景相对较少（常见：标记某个对象是否已被处理过）。

## 十五、垃圾回收

### JS 引擎如何判断对象可以被回收？GC 算法是什么？

**垃圾回收（Garbage Collection，GC）** 是 JS 引擎自动管理内存的机制。开发者申请内存（创建变量、对象）后，不需要手动释放，引擎会定期找出不再使用的内存并自动回收，避免内存持续增长。

#### 判断标准：可达性（Reachability）

GC 不是简单地判断"变量用完了"，而是判断对象是否**可达**：从根对象出发，沿引用链能不能找到它。

**根对象（Root）** 包括：
- 全局变量（`window`、`global`）
- 当前执行栈中的局部变量和参数
- 闭包引用的变量

能从根访问到 → 可达 → 不回收；不可达 → 回收。

```js
let user = { name: 'Alice' };  // { name: 'Alice' } 可达
user = null;                   // 断开引用，对象不可达，可以被 GC
```

#### 算法一：引用计数（Reference Counting）

早期算法：每个对象维护一个"被引用次数"，次数为 0 时回收。

**致命缺陷：循环引用**

```js
function createCycle() {
  const a = {};
  const b = {};
  a.ref = b;  // a 引用 b
  b.ref = a;  // b 引用 a
  // 函数结束，a 和 b 的引用计数都是 1（互相引用）
  // 永远不会变成 0，永远不会被回收 → 内存泄漏
}
createCycle();
```

IE6/7 使用了引用计数，循环引用是当时常见的内存泄漏根源。

#### 算法二：标记清除（Mark-and-Sweep）

现代 JS 引擎（V8 等）的主流算法，彻底解决了循环引用问题：

1. **标记阶段**：从根出发，遍历所有可达对象，打上标记
2. **清除阶段**：遍历堆内存，回收所有未标记的对象

循环引用不再是问题：只要 `a` 和 `b` 都不可达，无论它们互相引用多少次，都会被回收。

```
根对象
 └── user → { name: 'Alice' }  ← 可达，打标记，不回收

（user = null 后）

根对象
 └── （无引用）

{ name: 'Alice' }  ← 不可达，未标记，回收
```

#### V8 的分代回收优化

V8 将堆内存分为两个区域，分别用不同策略管理：

| | 新生代（New Space） | 老生代（Old Space） |
|--|-------------------|-------------------|
| 存放内容 | 新创建的短命对象 | 存活时间长的对象 |
| 大小 | 小（约 1-8 MB） | 大（数百 MB） |
| GC 频率 | 高频（Minor GC） | 低频（Major GC） |
| 算法 | Scavenge（复制算法） | 标记清除 + 标记整理 |

**晋升机制**：新生代对象经过两次 GC 仍存活，会被移入老生代。

> 这也是为什么短命的临时对象性能开销小——它们在新生代快速回收，不会触发代价高的 Major GC。

#### 常见内存泄漏场景

| 场景 | 原因 |
|------|------|
| 未清除的全局变量 | 全局变量是根，永远可达 |
| 未移除的事件监听 | 监听器持有外部引用 |
| 闭包持有大对象 | 外层变量被内层函数引用无法释放 |
| 定时器未清除 | `setInterval` 回调持有引用 |
| DOM 引用与节点不同步 | JS 变量引用已从 DOM 树移除的节点 |

> `WeakMap` / `WeakRef` 的设计初衷正是解决"需要引用对象，但又不想阻止 GC"的问题。

## 十六、ES6+ 常用特性

### 解构赋值、展开运算符、可选链、空值合并各解决什么问题？

#### 解构赋值

简化从对象或数组中取值的写法，支持重命名和默认值：

```js
// 对象解构
const { name, age = 18, address: addr } = user;
// 等价于：const name = user.name; const age = user.age ?? 18; const addr = user.address;

// 数组解构
const [first, , third] = [1, 2, 3];  // 跳过第二项

// 函数参数解构（最常见）
function render({ title, visible = false }) {
  console.log(title, visible);
}
```

#### 展开运算符 `...`

将数组或对象"展开"，常用于合并、浅拷贝、传参：

```js
// 数组合并 / 浅拷贝
const merged = [...arr1, ...arr2];
const copy = [...arr];

// 对象合并 / 浅拷贝（后面的同名属性覆盖前面的）
const newObj = { ...defaults, ...overrides };

// 收集剩余参数（rest 参数）
function sum(first, ...rest) {
  return rest.reduce((a, b) => a + b, first);
}
```

#### 可选链 `?.`

安全访问可能为 `null` / `undefined` 的嵌套属性，代替 `&&` 链式判断：

```js
// 旧写法
const name = user && user.profile && user.profile.name;

// 可选链
const name = user?.profile?.name;        // 任一层为 null/undefined 则返回 undefined
const len = arr?.length;                  // arr 为 null 时不报错，返回 undefined
const result = obj?.method?.();           // 方法不存在时不调用，不报错
```

#### 空值合并 `??`

只在左侧为 `null` 或 `undefined` 时才取右侧默认值，解决 `||` 误把 `0`、`''`、`false` 当 falsy 的问题：

```js
// || 的问题
const count = value || 10;   // value=0 → 返回 10，不符合预期

// ?? 只关心 null/undefined
const count = value ?? 10;   // value=0 → 返回 0；value=null → 返回 10

// 常与可选链组合使用
const name = user?.profile?.name ?? '匿名';
```

| 运算符 | 触发条件 | 典型用途 |
|--------|---------|---------|
| `\|\|` | 左侧为任意 falsy（`0`、`''`、`false`、`null`、`undefined`） | 旧式默认值 |
| `??` | 左侧仅为 `null` 或 `undefined` | 精确默认值 |
| `?.` | 左侧为 `null` 或 `undefined` 时短路 | 安全访问嵌套属性 |

#### 其他常用 ES6+ 特性速览

**模板字符串：**

```js
const msg = `Hello, ${name}! You have ${count} messages.`;
// 支持多行，支持表达式
```

**默认参数：**

```js
function fetch(url, method = 'GET', timeout = 3000) { ... }
```

**`for...of`：** 遍历任意可迭代对象（数组、Map、Set、字符串），比 `for...in` 更安全（`for...in` 会遍历原型链）：

```js
for (const [key, val] of map) { ... }
for (const char of 'hello') { ... }
```

**`Object.entries` / `Object.values`：**

```js
Object.entries({ a: 1, b: 2 })  // [['a', 1], ['b', 2]]
Object.values({ a: 1, b: 2 })   // [1, 2]

// 常用：对象转 Map
const map = new Map(Object.entries(obj));
```

**数组新方法：**

```js
[1, 2, 3].includes(2)           // true（比 indexOf !== -1 更语义化）
[1, [2, [3]]].flat(Infinity)    // [1, 2, 3]，递归打平
[1, 2, 3].findIndex(x => x > 1) // 1
```

**逻辑赋值运算符（ES2021）：**

```js
a ||= b   // 等价于 a = a || b
a &&= b   // 等价于 a = a && b
a ??= b   // 等价于 a = a ?? b
```

## 十七、事件委托

### 什么是事件委托？为什么用它？有什么缺点？

#### 工作原理

事件委托基于**事件冒泡**：DOM 事件触发后会从目标元素逐层向上冒泡到根节点。利用这一机制，把子元素的事件监听绑定在父元素上，通过 `event.target` 判断实际点击的是哪个子元素：

```js
// 不用委托：给每个 li 绑定监听（性能差，动态新增的 li 还不生效）
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handleClick);
});

// 用委托：只绑定一次到父元素
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    handleClick(e.target);
  }
});
```

#### 主要优点

**1. 减少监听器数量，节省内存**

列表有 1000 个 `<li>`，直接绑定需要 1000 个监听器；委托只需要 1 个。

**2. 天然支持动态元素**

后来通过 JS 动态添加的子元素，不需要重新绑定事件，委托的父监听器自动生效：

```js
// 父元素上绑定一次，后续动态添加的 li 点击也能触发
ul.addEventListener('click', (e) => {
  if (e.target.matches('li.item')) { ... }
});

// 之后动态插入的 li 照样能被捕获
ul.appendChild(newLi);
```

#### 缺点

**1. 不是所有事件都会冒泡**

`focus`、`blur`、`scroll`、`mouseenter`、`mouseleave` 默认不冒泡，无法委托。（`focusin`/`focusout` 是冒泡版本，可以替代）

**2. `stopPropagation()` 会破坏委托**

如果某个子元素调用了 `e.stopPropagation()`，事件不再冒泡，父元素的委托监听器收不到：

```js
child.addEventListener('click', (e) => {
  e.stopPropagation(); // 阻止冒泡，父元素上的委托监听器失效
});
```

**3. 嵌套结构判断复杂**

如果点击的是子元素内部更深层的元素，`e.target` 不是预期的那个，需要用 `closest()` 向上查找：

```js
ul.addEventListener('click', (e) => {
  const li = e.target.closest('li');  // 无论点的是 li 还是 li 内部的 span，都能找到
  if (li) handleClick(li);
});
```

## 十八、调用栈与执行上下文

### 什么是调用栈？执行上下文是什么？栈溢出怎么发生的？

#### 调用栈（Call Stack）

调用栈是 JS 引擎追踪函数调用的数据结构，遵循**先入后出（LIFO）**原则：

- 调用函数 → 压栈（push）
- 函数返回 → 弹栈（pop）

```js
function c() { console.log('c'); }
function b() { c(); }
function a() { b(); }
a();

// 调用栈变化过程：
// [] → [a] → [a, b] → [a, b, c] → [a, b] → [a] → []
```

#### 执行上下文（Execution Context）

每次函数调用，引擎都会创建一个**执行上下文**并压入调用栈。执行上下文包含三部分：

| 组成 | 内容 |
|------|------|
| 变量环境 | 当前函数的变量、函数声明（var 提升发生在这里） |
| 词法环境 | let/const、作用域链（指向外层上下文） |
| this 绑定 | 当前的 this 值 |

有三种执行上下文：
- **全局执行上下文**：程序启动时创建，只有一个，this 是 `window`/`global`
- **函数执行上下文**：每次函数调用创建一个
- **eval 执行上下文**：`eval()` 调用时创建（不常用）

```js
let x = 1;           // 全局执行上下文

function foo() {
  let y = 2;         // foo 的执行上下文
  function bar() {
    let z = 3;       // bar 的执行上下文
    console.log(x, y, z); // 通过作用域链向上查找 x、y
  }
  bar();
}
foo();
```

#### 栈溢出（Stack Overflow）

调用栈大小有限（浏览器一般约 10000 层）。递归没有终止条件时，栈帧持续压入而不弹出，超出限制报错：

```
RangeError: Maximum call stack size exceeded
```

```js
// 错误：无终止条件
function infinite() {
  return infinite();
}
infinite(); // RangeError

// 正确：有终止条件
function countdown(n) {
  if (n <= 0) return;
  countdown(n - 1);
}
```

**解决方法：**

1. 确保递归有终止条件
2. 深递归改为迭代（循环 + 手动栈模拟）
3. 用 `setTimeout` 将递归拆成异步，让调用栈在每次执行之间清空：

```js
function processLargeTree(node) {
  setTimeout(() => {
    if (node.children) node.children.forEach(processLargeTree);
  }, 0);
}
```

> 浏览器 DevTools 的 Call Stack 面板实时展示当前调用栈，断点调试时可以看到每一层的执行上下文。
