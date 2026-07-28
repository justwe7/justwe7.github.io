---
title: JavaScript 面试知识整理
---

# JavaScript 面试知识整理

JS 面试的题目看起来零散，但真正会被连续追问的知识点其实是一条链：从数据类型讲到类型转换，从原型讲到继承，从作用域讲到闭包和内存泄漏，从 Promise 讲到事件循环。单独背某个 API 的用法很容易，难的是被追问"为什么"时能讲清楚底层机制。这份笔记按知识依赖顺序组织，每个问题都尽量讲到能反问面试官的深度。

## 复习建议

- 代码输出题不要死记结论，按"同步代码 → 微任务 → 宏任务"的顺序自己推一遍，推错了说明某个环节理解有误。
- `this`、闭包、原型链、事件循环是四个最容易被连续追问的话题，优先吃透。
- DOM、BOM、存储、安全相关内容更偏工程 API，记使用场景和边界比记 API 签名更重要。
- 手写题不要只背代码，要能讲清楚每一步为什么这么写，面试官通常会在手写完之后追问边界情况。

## 一、数据类型与类型判断

### JS 有哪些数据类型？基本类型和引用类型的存储方式有什么区别？

JavaScript 的数据类型分为两大类：

**基本类型（7 种）：** `string`、`number`、`boolean`、`null`、`undefined`、`symbol`（ES6）、`bigint`（ES2020）

**引用类型：** 统称 `object`，包括普通对象、数组、函数、`Date`、正则、`Map`、`Set` 等。

两类的核心区别不是"种类多少"，而是**存储方式和赋值行为完全不同**：

| 类型 | 存储位置 | 赋值时拷贝的内容 |
| --- | --- | --- |
| 基本类型 | 栈内存 | 值本身 |
| 引用类型 | 栈 + 堆 | 栈中的地址（引用） |

基本类型的值直接存在栈上，赋值就是复制一份新值，两个变量互不影响：

```js
let a = 1;
let b = a;
b = 2;
console.log(a); // 1，不受影响
```

引用类型的变量在栈上只存一个指向堆内存的地址，真正的数据在堆里。赋值时拷贝的是地址，两个变量指向同一块堆内存，修改其中一个会影响另一个：

```js
const obj1 = {};
const obj2 = obj1;
obj2.name = 'Tom';
console.log(obj1.name); // 'Tom'，被影响了
```

> 这也是浅拷贝和深拷贝问题的根源：浅拷贝只复制了第一层的地址，深拷贝才会递归复制堆里的实际数据。

需要强调的是，`Symbol` 和 `BigInt` 是 ES6 之后才补充进来的基本类型。很多旧资料还在说"基本类型只有 5 种"，现代面试里应该完整说出 7 种。

> [!VISUALIZATION]
> **类型：** relationship
> **优先级：** high
> **标题：** 基础类型与引用类型的存储关系
> **目的：** 展示基础类型变量直接保存值，引用类型变量保存对象地址，对象内容位于堆内存。
> **必须表达：** 两个变量引用同一个对象时，修改对象属性会互相可见；重新赋值变量不会修改原对象。
> **避免表达：** 不要把"栈"和"堆"画成绝对的语言规范细节，应表达为便于理解的内存模型。

![](../../static/docs/aiRender/前端面试/01-基础类型与引用类型的存储关系.webp)

### `null` 和 `undefined` 有什么区别？

语义上：`undefined` 表示"系统层面的缺失"——变量声明了没赋值、函数没有返回值、访问对象不存在的属性，得到的都是 `undefined`；`null` 表示"开发者主动设置的空值"，是一个显式的空对象引用。

必须记住的几条结论：

```js
typeof undefined; // "undefined"
typeof null;      // "object"，历史遗留问题（下面详细讲）
null == undefined;  // true
null === undefined; // false
```

**为什么 `typeof null` 是 `"object"`？** JS 最初的实现用 32 位存储一个值，其中低 3 位是类型标签：`000` 表示对象、`001` 表示整数，其余几种标签对应浮点数、字符串、布尔值。`null` 在底层的机器码是全零（同时也是 NULL 指针的值），低 3 位自然也是 `000`，因此被 `typeof` 误判成了对象。这是 JS 引擎最早期实现留下的 bug，为了向下兼容，一直没有修复，后续标准也就把它固化了下来。

实际开发中判断字段是否为空，通常用 `value == null`，因为它能同时覆盖 `null` 和 `undefined` 两种情况。

### `typeof`、`instanceof`、`Object.prototype.toString` 怎么选？

三种类型判断方式适用场景完全不同，选错了会漏判或误判。

**`typeof`**：返回一个字符串，适合快速判断基本类型：

```js
typeof 'hello';      // "string"
typeof 42;            // "number"
typeof true;           // "boolean"
typeof undefined;     // "undefined"
typeof Symbol();      // "symbol"
typeof 42n;            // "bigint"
typeof function(){};  // "function"

typeof null;   // "object"（历史遗留，见上）
typeof {};      // "object"
typeof [];      // "object"，无法区分数组和普通对象
```

**`instanceof`**：通过原型链判断，适合区分引用类型，语法是 `obj instanceof Constructor`，本质是检查 `Constructor.prototype` 是否出现在 `obj` 的原型链上：

```js
[] instanceof Array;  // true
[] instanceof Object;  // true，Array.prototype 的原型链上有 Object.prototype
```

局限性有两条：一是无法判断基本类型（`1 instanceof Number` 是 `false`，因为 `1` 不是对象，没有原型链）；二是跨 iframe 会失效——不同 iframe 有各自独立的全局环境，`iframe` 里创建的数组的 `Array` 构造函数和主页面的 `Array` 不是同一个引用，跨环境判断会返回 `false`。

**`Object.prototype.toString.call()`**：最准确的方式，能精确区分所有内置类型，返回 `[object Xxx]` 格式：

```js
Object.prototype.toString.call('hello');   // "[object String]"
Object.prototype.toString.call(null);       // "[object Null]"
Object.prototype.toString.call(undefined);  // "[object Undefined]"
Object.prototype.toString.call([]);          // "[object Array]"
Object.prototype.toString.call(/reg/);       // "[object RegExp]"
```

封装成通用工具函数是面试常考点：

```js
function getType(value) {
  if (value === null) return 'null';

  const type = typeof value;
  if (type !== 'object') return type;

  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

getType([]);   // "array"
getType(null); // "null"
```

> 判断数组还有一个专用方法 `Array.isArray()`，语义清晰、性能也更好，能用它就优先用它，不必绕道 `toString`。

三者对比：

| 方法 | 适用场景 | 主要局限 |
| --- | --- | --- |
| `typeof` | 快速判断基本类型和函数 | 无法区分 `null`、数组、普通对象 |
| `instanceof` | 判断对象是否属于某个构造函数的原型链 | 不能判断基本类型；跨 iframe 可能失效 |
| `Object.prototype.toString` | 精确判断任意内置类型 | 写法较繁琐，通常封装成工具函数 |

## 二、类型转换与 Number 精度

### 隐式类型转换发生在哪些场景？

隐式转换常出现在 `==` 比较、条件判断、加法运算、对象转基本类型等场景。最基础的是转布尔值的规则：

```js
Boolean(undefined); // false
Boolean(null);       // false
Boolean(0);           // false
Boolean(NaN);         // false
Boolean('');           // false
Boolean({});           // true，注意空对象是 truthy
Boolean([]);           // true，空数组也是 truthy
```

对象转基本值时，会先调用 `valueOf()`，如果结果不是基本值再调用 `toString()`（`Symbol.toPrimitive` 存在时优先级更高，但面试考的多是默认场景）。

### `==` 和 `===` 的区别？`[] == false` 怎么推导？

`===` 严格相等：类型不同直接返回 `false`，不做任何转换，行为最可预期。

`==` 宽松相等：类型不同时会按固定规则做隐式转换后再比较，规则大致是：

1. 有一方是 `boolean`，先把它转成数字（`true → 1`，`false → 0`）。
2. 一方是 `string`、一方是 `number`，把字符串转成数字。
3. 一方是对象、一方是原始值，对象先转基本值（`valueOf` 优先，其次 `toString`），再继续比较。
4. `null == undefined` 恒为 `true`，且它俩和其他任何值比较都是 `false`。

以 `[] == false` 为例，完整推导过程：

```text
[] == false

// 第一步：一方是 boolean，先把 false 转成数字
[] == 0

// 第二步：一方是 object，转基本值
//   [].valueOf() 返回 [] 本身，不是基本值，继续调用 toString()
//   [].toString() 返回 ""（空字符串），是基本值
"" == 0

// 第三步：string vs number，把字符串转数字
//   Number("") === 0
0 == 0

// 结果
true
```

> 关键点：`[]` 不是直接变成 `0`，中间必须经过 `toString()` 得到 `""`，再由 `""` 转成 `0`。理解这一步是理解一切数组隐式转换题的基础。

几个容易混淆的结果，建议自己动手推一遍再对答案：

```js
[] == false;    // true
[] == ![];       // true（![] 先求值得 false，再走上面流程）
{} == false;     // false（{}.toString() 是 "[object Object]"，转数字是 NaN）
null == false;   // false（null 只等于 undefined，不参与其他隐式转换）
null == 0;        // false
```

实际项目中一律用 `===`，`==` 的转换链路太长，容易埋下难以排查的 bug；唯一常见的例外是 `value == null`，用来同时判断 `null` 和 `undefined`。

### `Number` 为什么会有精度问题？怎么解决？

JS 的 `number` 类型使用 IEEE 754 双精度浮点数表示，小数在二进制下往往无法精确表达（就像十进制无法精确表示 1/3 一样），因此产生了广为人知的精度误差：

```js
console.log(0.1 + 0.2);         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

常见的解决思路：

- **金额类场景转成整数分计算**，避免小数运算，展示时再除回来。
- **用 `Number.EPSILON` 做误差范围判断**，而不是直接用 `===`：

```js
function nearlyEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
```

- **大整数场景使用 `BigInt`**，但要注意 `BigInt` 解决的是安全整数范围（超过 `Number.MAX_SAFE_INTEGER` 之后普通数字会丢失精度）的问题，不能直接解决小数精度问题，而且不能和普通 `Number` 混合运算，需要显式转换。
- **精度要求高的业务（如金融计算）用专门的高精度计算库**，靠字符串或大数运算规避浮点数问题。

## 三、变量声明：var、let、const

### var、let、const 有什么区别？

三者的核心差异在作用域、提升行为和是否可重新赋值：

| 特性 | `var` | `let` | `const` |
| --- | --- | --- | --- |
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 提升，初始值 `undefined` | 提升，但不初始化（TDZ） | 提升，但不初始化（TDZ） |
| 声明前访问 | `undefined`，不报错 | `ReferenceError` | `ReferenceError` |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 挂到 `window` | 是（全局声明时） | 否 | 否 |
| 重新赋值 | 允许 | 允许 | 不允许 |

### 变量提升是怎么回事？

`var` 声明会在编译阶段被提升到函数（或全局）作用域顶部，但只提升"声明"，不提升"赋值"：

```js
console.log(a); // undefined，不报错
var a = 1;

// 引擎实际处理成：
var a;
console.log(a); // undefined
a = 1;
```

函数声明会整体提升（包括函数体），优先级高于同名 `var`：

```js
console.log(fn()); // "hello"，可以在声明前调用
function fn() {
  return 'hello';
}
```

### 什么是暂时性死区（TDZ）？

`let` 和 `const` 声明的变量同样会被提升到当前块作用域的顶部，但从块开始到声明语句执行之前，这段区间变量处于**暂时性死区（Temporal Dead Zone）**，访问会直接抛出 `ReferenceError`，而不是像 `var` 那样得到 `undefined`：

```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;
```

TDZ 是刻意设计的：它强制要求"先声明再使用"，避免 `var` 提升带来的隐蔽 bug（比如变量被提前访问时还是 `undefined`，却没有任何报错提示）。

### `const` 的"不可变"到底约束的是什么？

`const` 禁止的是**重新赋值**（即改变变量绑定的引用地址），而不是禁止修改对象内部的属性：

```js
const obj = { a: 1 };
obj.a = 2; // ✅ 允许，修改的是对象属性，绑定没变
obj = {};  // ❌ TypeError，不能重新绑定

const arr = [1, 2];
arr.push(3); // ✅ 允许
arr = [];     // ❌ TypeError
```

如果需要让对象内容也不可变，需要用 `Object.freeze(obj)`。但要注意 `Object.freeze` 只是**浅冻结**，只冻结第一层属性，嵌套对象仍然可以被修改，需要递归调用才能实现深度冻结。

## 四、原型、原型链与继承

### `prototype`、`__proto__`、原型链是什么关系？

三个容易混淆的概念，先分别讲清楚：

**`prototype`**：函数专有的属性。每个函数都有一个 `prototype` 对象，用 `new` 调用这个函数创建实例时，实例的原型会指向这个对象。注意 `Date`、`Array` 这些内置构造函数本质上也是函数，所以同样有 `prototype`，但它们创建出来的**实例**上没有 `prototype`：

```js
typeof Date;             // "function"
Date.prototype;           // ✅ 存在，挂着 getFullYear 等方法
new Date().prototype;     // undefined，实例没有 prototype
new Date().__proto__ === Date.prototype; // true
```

**`__proto__`**：每个对象都有的属性（非标准，但浏览器普遍实现），指向该对象的原型，等价于 `Object.getPrototypeOf(obj)`。

**`Object.getPrototypeOf()`**：获取对象原型的标准方法，生产代码中应该用它替代 `__proto__`。

三者的核心关系：

```js
function Person(name) {
  this.name = name;
}

const p = new Person('Alice');

p.__proto__ === Person.prototype;              // true
Object.getPrototypeOf(p) === Person.prototype; // true
Person.prototype.constructor === Person;        // true
```

### 属性查找为什么要沿着原型链走？

访问对象属性时，JS 引擎的查找顺序是：

1. 先在对象自身找。
2. 找不到，去它的 `__proto__`（即构造函数的 `prototype`）找。
3. 还找不到，继续往上，直到 `Object.prototype`。
4. `Object.prototype.__proto__` 是 `null`，链到头了，返回 `undefined`。

这条查找路径就是**原型链**，它的存在让多个实例可以共享方法，而不用每个实例都复制一份：

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} speaks`;
};

const dog = new Animal('Rex');
dog.speak();        // "Rex speaks"，在 Animal.prototype 上找到
dog.hasOwnProperty;  // 在 Object.prototype 上找到
dog.xxx;              // undefined，一直到 null 都没找到
```

`hasOwnProperty` 只判断自身属性，`in` 运算符会包含原型链上的属性，两者不能混用：

```js
const obj = Object.create({ inherited: true });
obj.own = true;

'own' in obj;                   // true
'inherited' in obj;             // true
obj.hasOwnProperty('inherited'); // false
```

> [!VISUALIZATION]
> **类型：** relationship
> **优先级：** high
> **标题：** 构造函数、实例与原型链
> **目的：** 展示构造函数的 `prototype`、实例的原型引用、`constructor` 以及向上查找属性的路径。
> **必须表达：** 实例先查自身，再沿原型链查找；原型链终点是 `null`。
> **避免表达：** 不要把 `__proto__` 表达成推荐业务代码直接依赖的 API。

![](../../static/docs/aiRender/前端面试/02-构造函数实例与原型链.webp)

### `instanceof` 的实现原理是什么？

`instanceof` 判断的本质是：沿着左侧对象的原型链向上查找，看右侧构造函数的 `prototype` 是否出现在链上。手写实现是高频题：

```js
function myInstanceof(value, Constructor) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }

  let proto = Object.getPrototypeOf(value);
  const target = Constructor.prototype;

  while (proto) {
    if (proto === target) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
```

常见追问：`[] instanceof Object` 为什么是 `true`？因为 `Array.prototype` 的原型链上有 `Object.prototype`，两次沿链查找都会命中。`Object.create(null)` 创建的对象有什么特殊之处？它的原型链是空的，`obj.__proto__` 是 `undefined`，不继承任何 `Object.prototype` 上的方法，常用来创建"纯净字典对象"，避免原型污染。

### JS 继承是怎么一步步演进的？

理解继承演进比死记某一种写法更重要，因为面试常问"为什么不直接用某种方案"。

**第一步：原型链继承**——把父类实例赋给子类的 `prototype`：

```js
function Parent() {
  this.colors = ['red'];
}
function Child() {}
Child.prototype = new Parent();

const c1 = new Child();
const c2 = new Child();
c1.colors.push('blue');
console.log(c2.colors); // ['red', 'blue']，被 c1 影响了
```

问题很明显：所有实例共享同一个父类实例，引用类型属性会被互相污染；而且没法在创建子类实例时给父类构造函数传参。

**第二步：构造函数继承**——在子类构造函数里用 `call` 借用父类构造函数：

```js
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}
```

属性隔离问题解决了，但新问题是父类原型上的方法没法被继承，每个实例都得重新定义方法，无法复用。

**第三步：组合继承**——结合前两种，属性用构造函数继承、方法用原型链继承：

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 第一次调用 Parent
  this.age = age;
}
Child.prototype = new Parent(); // 第二次调用 Parent
Child.prototype.constructor = Child;
```

属性隔离和方法复用都解决了，唯一的缺点是**父构造函数被调用了两次**（一次在 `Child.prototype = new Parent()`，一次在 `Parent.call(this, name)`），会产生多余的实例属性和一次不必要的开销。

**第四步：寄生组合继承**——用 `Object.create` 代替 `new Parent()`，避免多余的一次调用，是 ES6 之前公认的最优写法：

```js
function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype); // 只创建一个空对象作为原型，不执行 Parent
  Child.prototype.constructor = Child;
}

function Parent(name) {
  this.name = name;
}
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
inherit(Child, Parent);
```

**为什么不能 `Child.prototype = new Parent()`？** 因为这样会真的执行一次父类构造函数，产生的实例属性会挂在原型上而不是子类实例上，属于多余且可能有副作用的调用；`Object.create()` 只创建一个以 `Parent.prototype` 为原型的空对象，更干净，不会触发父类构造逻辑。

### `class extends` 底层做了什么？

ES6 的 `class` 不是新的类系统，本质上仍然是原型链的语法糖：

```js
class Parent {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 必须先调用，相当于执行父类的 constructor
    this.age = age;
  }
}
```

`extends` 等价于底层做了两件事：

```js
// class Child extends Parent 等价于：
Child.prototype = Object.create(Parent.prototype); // 实例方法继承
Child.__proto__ = Parent;                            // 静态方法继承
```

验证：

```js
Object.getPrototypeOf(Child) === Parent;              // true，静态继承
Object.getPrototypeOf(Child.prototype) === Parent.prototype; // true，实例继承
```

第二行 `Child.__proto__ = Parent` 是 ES5 手写继承容易漏掉的一步——它让子类能继承父类的静态方法，用寄生组合继承的写法必须额外手动处理，而 `class` 自动帮你做了。

### `class` 有哪些和普通函数不同的行为？

`class` 只是原型机制上的语法糖，但存在几个容易被追问的行为差异：

- 类声明存在暂时性死区，不能像函数声明那样在声明前调用。
- 类内部默认是严格模式，不需要显式声明 `'use strict'`。
- 类方法定义在 `prototype` 上，但**不可枚举**（`for...in` 不会遍历到），这一点和手动挂在 `prototype` 上的普通函数不同。
- 子类构造函数中必须先调用 `super()`，才能使用 `this`——因为 JS 引擎要求父类先完成实例的初始化，子类才能在其基础上继续处理。
- `class` 必须通过 `new` 调用，直接 `Person()` 会抛出 `TypeError`。

## 五、作用域、执行上下文与闭包

### 作用域是什么？有哪几种？

**作用域（Scope）** 决定了变量和函数的**可访问范围**。它存在的核心目的是隔离变量，防止不同区域的同名变量互相干扰：

```js
function a() { let x = 1; }
function b() { let x = 2; }
// 两个 x 分别在各自的函数作用域内，互不影响
```

JS 中有四种作用域：

**全局作用域**：在所有函数和块之外声明的变量，整个程序都能访问。浏览器环境下，`var` 声明的全局变量会挂到 `window` 上：

```js
var globalVar = 'global';
console.log(window.globalVar); // "global"
```

**函数作用域**：`var` 声明的变量只在所在函数内可访问：

```js
function fn() {
  var local = 'only here';
}
console.log(local); // ReferenceError
```

**块级作用域**：`let`、`const` 声明的变量只在 `{}` 块内有效：

```js
if (true) {
  let x = 1;
}
console.log(x); // ReferenceError

for (let i = 0; i < 3; i++) { /* ... */ }
console.log(i); // ReferenceError（换成 var 则不会报错，因为 var 没有块级作用域）
```

**模块作用域**：ES Module 中每个文件都有自己独立的作用域，不会污染全局，需要显式 `export` 才能被外部引用。

### 什么是词法作用域和作用域链？

JS 使用**词法作用域**（静态作用域）：变量的作用域在**代码书写的位置**就已经确定，和函数在哪里被调用无关：

```js
const x = 'global';
function outer() {
  const x = 'outer';
  function inner() {
    console.log(x); // "outer"，由书写位置决定，与调用位置无关
  }
  inner();
}
outer();
```

**作用域链**是变量的查找路径：当前作用域找不到变量时，向外层词法作用域继续查找，一直到全局作用域为止；全局作用域都找不到，才会抛出 `ReferenceError`。

### 执行上下文和调用栈是什么关系？

每次函数被调用，JS 引擎都会创建一个**执行上下文（Execution Context）**并压入**调用栈（Call Stack）**。执行上下文大致包含三部分：

| 组成 | 内容 |
| --- | --- |
| 变量环境 | 当前函数的 `var` 声明和函数声明（`var` 提升发生在这里） |
| 词法环境 | `let`/`const` 声明、外层作用域的引用（构成作用域链） |
| `this` 绑定 | 当前执行上下文里 `this` 的指向 |

调用栈遵循**先入后出（LIFO）**：调用函数就压栈，函数返回就弹栈：

```js
function c() { console.log('c'); }
function b() { c(); }
function a() { b(); }
a();

// 调用栈变化：[] → [a] → [a, b] → [a, b, c] → [a, b] → [a] → []
```

调用栈的大小是有限的（浏览器环境通常约一万层），如果递归没有终止条件，栈帧会持续压入而不弹出，最终抛出 `RangeError: Maximum call stack size exceeded`：

```js
function infinite() {
  return infinite(); // 没有终止条件
}
infinite(); // RangeError

function countdown(n) {
  if (n <= 0) return; // 正确写法，有终止条件
  countdown(n - 1);
}
```

深递归场景的常见解法：改写成迭代（用循环 + 手动数组模拟调用栈），或者用 `setTimeout` 把递归拆成多个异步任务，让调用栈在每次执行之间被清空。

### 闭包是什么？为什么内层函数能访问外层变量？

**闭包**：当一个内层函数引用了外层函数的变量，并且这个内层函数在外层函数执行结束后依然存活（被外部引用保留了下来），就形成了闭包。

闭包的关键不是"函数里嵌套了函数"，而是**内层函数持有了对外层变量的引用，使这些变量在外层函数销毁后依然不会被回收**：

```js
function createCounter() {
  let count = 0; // 外层变量
  return function () { // 内层函数持有 count 的引用
    count += 1;
    return count;
  };
}

const counter = createCounter(); // createCounter 已经执行完，但 count 没有被回收
console.log(counter()); // 1
console.log(counter()); // 2
```

常见用途：封装私有变量、函数柯里化、防抖节流的计时器状态保存、模块化写法。

> [!VISUALIZATION]
> **类型：** relationship
> **优先级：** high
> **标题：** 闭包如何保留外部变量
> **目的：** 展示外层函数执行结束后，内部函数仍然引用外部词法环境中的变量。
> **必须表达：** 只要内部函数仍被引用，相关外部变量就不会被回收。
> **避免表达：** 不要把闭包描述成只有返回函数才会产生，事件回调和异步回调也可能形成闭包。

![](../../static/docs/aiRender/前端面试/03-闭包如何保留外部变量.webp)

### 循环里用闭包为什么容易出错？

这是闭包最经典的输出题：

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  });
}
// 3 3 3
```

原因是 `var` 没有块级作用域，三次循环共用同一个 `i`；`setTimeout` 的回调是异步执行的，等它们真正执行时，循环早已结束，`i` 的值已经变成了 `3`，三个回调闭包引用的都是同一个 `i`。

用 `let` 可以直接解决：

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  });
}
// 0 1 2
```

`let` 具有块级作用域，**每次循环迭代都会创建一个新的 `i` 绑定**，每个 `setTimeout` 回调闭包捕获的是各自那一轮独立的 `i`，因此不会互相覆盖。

不改用 `let` 的话，ES5 时代常见的解法是用 IIFE（立即执行函数）为每次迭代单独创建一个作用域，把 `i` 当参数传进去，本质上是手动模拟 `let` 的块级作用域效果。

### 闭包会导致内存泄漏吗？

不是必然，但确实是常见诱因。正常情况下，函数执行完毕后，它的局部变量会被垃圾回收；但如果闭包持有了对这些变量的引用，垃圾回收器就无法回收它们，长期持有会导致内存占用持续增长：

```js
function createHeavy() {
  const bigData = new Array(1000000).fill('*'); // 大对象
  return function () {
    console.log(bigData.length); // 持有引用，bigData 无法被回收
  };
}

const fn = createHeavy();
// fn 不再使用但没有释放，bigData 会一直留在内存里
```

解决方法：不再需要时手动断开引用（`fn = null`），或者在闭包内只保留必要的数据，而不是整个大对象：

```js
function createHeavy() {
  const bigData = new Array(1000000).fill('*');
  const len = bigData.length; // 只取需要的值
  return function () {
    console.log(len); // 闭包只引用 len，bigData 本身可以被回收
  };
}
```

> 实际项目里最常见的闭包内存泄漏场景是事件监听器引用了大对象，但组件销毁时忘记移除监听器，导致监听器和它闭包持有的整个数据一直留在内存里。这一点会在"内存管理与垃圾回收"章节里进一步展开。

## 六、this、call/apply/bind 与 new

### `this` 的指向是怎么确定的？

`this` 的值不是在函数**定义时**确定的，而是在函数**调用时**确定的（箭头函数除外）。同一个函数用不同方式调用，`this` 会完全不同。绑定规则按优先级从高到低分四种：

**1. `new` 绑定**：用 `new` 调用构造函数，`this` 指向新创建的实例：

```js
function Person(name) {
  this.name = name;
}
const p = new Person('Alice');
p.name; // "Alice"，this 指向 p
```

**2. 显式绑定**：通过 `call`、`apply`、`bind` 手动指定 `this`，优先级高于隐式绑定。

**3. 隐式绑定**：通过对象调用方法，`this` 指向该对象：

```js
const obj = {
  name: 'obj',
  fn() {
    console.log(this.name);
  },
};
obj.fn(); // "obj"，this 是 obj
```

隐式绑定容易丢失——把方法赋值给一个变量再单独调用，脱离了调用它的对象，`this` 就不再指向原来的对象：

```js
const fn = obj.fn;
fn(); // this 变成全局对象（非严格模式）或 undefined（严格模式），this.name 读取失败
```

**4. 默认绑定**：直接调用函数（前三种规则都不满足时），非严格模式下 `this` 是全局对象（浏览器里是 `window`），严格模式下是 `undefined`。

> 现代项目里模块代码、构建工具产物、`class` 内部默认都是严格模式，普通函数直接调用时 `this` 很可能是 `undefined`，不要一概认为是 `window`。

### 箭头函数的 `this` 有什么不同？

箭头函数**没有自己的 `this`**，它的 `this` 在**定义时**就从外层词法作用域继承下来，并且不能被 `call`/`apply`/`bind` 改变：

```js
const obj = {
  name: 'obj',
  fn() {
    const arrow = () => console.log(this.name); // 继承 fn 的 this
    arrow(); // "obj"
  },
};
obj.fn();

// 尝试用 call 改变箭头函数的 this 是无效的
const arrow = () => console.log(this);
arrow.call({ name: 'other' }); // this 仍然是外层作用域的 this，call 不起作用
```

箭头函数解决的是回调函数中 `this` 丢失的经典问题（比如 `setTimeout`、数组方法回调里想访问外层对象的 `this`），本质是词法绑定，而不是"禁止修改"。正因为它没有自己的 `this`，也不适合用作需要动态 `this` 的对象方法：

```js
const obj = {
  name: 'Tom',
  say: () => {
    console.log(this.name); // this 是定义时的外层 this（浏览器里是 window），不是 obj
  },
};
obj.say(); // 通常不是 'Tom'
```

同理，箭头函数也没有自己的 `arguments`、`super`、`new.target`，都会从外层继承。

### `call`、`apply`、`bind` 有什么区别？

三者都能显式指定 `this`，区别在于**是否立即执行**和**参数传递方式**：

| 方法 | 是否立即执行 | 参数形式 | 返回值 |
| --- | --- | --- | --- |
| `call` | 是 | 逐个传入 | 函数执行结果 |
| `apply` | 是 | 数组或类数组 | 函数执行结果 |
| `bind` | 否 | 逐个传入，可预置、可分次传 | 新函数 |

```js
function greet(prefix, suffix) {
  return `${prefix}${this.name}${suffix}`;
}
const user = { name: 'Tom' };

greet.call(user, 'Hi, ', '!');    // "Hi, Tom!"
greet.apply(user, ['Hi, ', '!']); // "Hi, Tom!"

const bound = greet.bind(user, 'Hi, ');
bound('!'); // "Hi, Tom!"，第一个参数已经提前绑定
```

`apply` 在 ES6 之前常用于把数组"展开"传给不接受数组参数的函数，现在这个场景基本被展开运算符取代：

```js
Math.max.apply(null, [1, 3, 2]); // 3，ES6 之前的写法
Math.max(...[1, 3, 2]);           // 3，现代写法
```

手写 `bind` 是高频题，核心要点有三个：返回一个新函数、支持预置参数、被 `new` 调用时绑定的 `this` 应该失效（因为 `new` 绑定优先级最高）：

```js
Function.prototype.myBind = function (context, ...presetArgs) {
  const fn = this;

  function boundFn(...args) {
    const isNew = this instanceof boundFn; // 判断是否用 new 调用了绑定后的函数
    return fn.apply(isNew ? this : context, [...presetArgs, ...args]);
  }

  boundFn.prototype = Object.create(fn.prototype); // 保证原型链正常，new 出来的实例能访问原函数原型上的方法
  return boundFn;
};
```

### `new` 执行时到底发生了什么？

`new` 调用构造函数会依次做四件事：

1. 创建一个新的空对象。
2. 把新对象的原型指向构造函数的 `prototype`。
3. 把这个新对象作为 `this`，执行构造函数。
4. 如果构造函数显式返回一个对象，就返回该对象；否则返回第一步创建的新对象。

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype); // 第 1、2 步
  const result = Constructor.apply(obj, args);        // 第 3 步

  // 第 4 步：只有返回值是对象或函数才会覆盖默认返回的新对象
  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj;
}

function Person(name) {
  this.name = name;
}

const p = myNew(Person, 'Tom');
p.name;               // "Tom"
p instanceof Person;  // true
```

常见追问：构造函数如果返回一个基本类型（比如 `return 1`），这个返回值会被忽略，仍然返回新创建的对象；如果返回一个对象，则会覆盖默认的新对象，`new` 出来的就是这个显式返回的对象。这也是为什么第 4 步的判断要同时排除 `null`（`typeof null === 'object'` 但它不是一个有效的返回目标）。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** high
> **标题：** `new` 的执行流程
> **目的：** 展示创建对象、连接原型、绑定 `this`、处理返回值的顺序。
> **必须表达：** 构造函数返回对象时会覆盖默认新对象，返回基本类型不会覆盖。
> **避免表达：** 不要遗漏原型连接步骤。

![](../../static/docs/aiRender/前端面试/04-new的执行流程.webp)

## 七、DOM、BOM 与浏览器事件

### DOM 和 BOM 分别是什么？

**DOM（Document Object Model）** 把 HTML/XML 文档表示成一棵节点树，JavaScript 通过 DOM API 查询、创建、修改、删除节点：

```js
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

常见查询 API 及易混点：

| API | 返回值 | 备注 |
| --- | --- | --- |
| `getElementById` | 单个元素 | 只能按 id 查 |
| `getElementsByClassName` / `getElementsByTagName` | **动态**集合（`HTMLCollection`） | 后续 DOM 变化会实时反映到集合里 |
| `querySelector` / `querySelectorAll` | 单个元素 / **静态**集合（`NodeList`） | 支持任意 CSS 选择器，`querySelectorAll` 返回的是快照，DOM 变化不会同步 |

`innerHTML` 会把字符串当作 HTML 解析并插入，存在 XSS 风险（如果内容包含用户输入的 `<script>`）；`textContent` 只处理纯文本，更安全，写入用户数据时应该优先用它。

**BOM（Browser Object Model）** 描述浏览器窗口相关的能力，核心对象是 `window`：

```js
console.log(location.href);
history.pushState({}, '', '/new-path');
console.log(navigator.userAgent);
```

常见对象：`window`（浏览器窗口，同时也是全局对象）、`location`（URL 信息和跳转）、`history`（浏览历史操作）、`navigator`（浏览器和设备信息）、`screen`（屏幕信息）。区分的关键是：DOM 关注**文档结构**，BOM 关注**浏览器环境**。

### DOM 事件流是怎么传播的？

浏览器事件传播分三个阶段：

1. **捕获阶段**：事件从 `window`、`document` 向下传播到目标元素。
2. **目标阶段**：事件到达真正触发的目标元素。
3. **冒泡阶段**：事件从目标元素向外层祖先节点逐层传播。

```js
element.addEventListener('click', handler, false); // 默认在冒泡阶段触发
element.addEventListener('click', handler, true);   // 捕获阶段触发
```

常用控制方法：`event.stopPropagation()` 阻止事件继续传播；`event.preventDefault()` 阻止默认行为（比如阻止表单提交、阻止链接跳转）；`event.target` 是事件真正触发的元素，`event.currentTarget` 是当前绑定监听器、正在处理事件的元素——这两者在事件委托场景下经常不是同一个元素，是高频追问点。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** high
> **标题：** DOM 事件流
> **目的：** 展示事件从捕获阶段到目标阶段，再到冒泡阶段的传播路径。
> **必须表达：** `target` 是触发源，`currentTarget` 是当前处理事件的元素。
> **避免表达：** 不要把事件冒泡画成只发生在父子两层之间。

![](../../static/docs/aiRender/前端面试/05-DOM事件流.webp)

### 什么是事件委托？为什么用它？

事件委托利用**事件冒泡**机制：不给每个子元素单独绑定监听器，而是把监听器绑定在父元素上，通过 `event.target` 判断实际点击的是哪个子元素：

```js
const list = document.getElementById('list');

list.addEventListener('click', (event) => {
  const item = event.target.closest('li'); // 无论点的是 li 本身还是内部的 span，都能定位到 li
  if (!item || !list.contains(item)) return;

  console.log(item.dataset.id);
});
```

主要优势：**减少事件监听器数量**（1000 个 `<li>` 直接绑定需要 1000 个监听器，委托只需要 1 个，节省内存）；**天然支持动态元素**，后来通过 JS 动态插入的子元素不需要重新绑定事件，委托的父监听器自动生效，非常适合列表、表格、菜单这类结构。

需要注意的限制：不是所有事件都会冒泡，`focus`、`blur`、`scroll`、`mouseenter`、`mouseleave` 默认不冒泡，无法直接委托（`focusin`/`focusout` 是它们的冒泡版本，可以替代）；如果某个子元素内部调用了 `stopPropagation()`，事件不会继续冒泡，父元素上的委托监听器会收不到，这是排查"委托失效"问题时最容易漏看的一点；判断目标元素时，如果点击的是子元素内部更深层的节点，需要用 `closest()` 向上查找最近的匹配节点，而不能直接判断 `event.target.tagName`。

## 八、异步编程、Promise 与事件循环

### 事件循环是怎么调度同步代码、宏任务和微任务的？

JS 主线程先执行同步代码。当前调用栈清空后，会**优先清空全部微任务队列**，然后浏览器可能进行一次渲染，再取出下一个宏任务继续执行。

常见宏任务：`setTimeout`、`setInterval`、DOM 事件回调、网络请求回调、`script` 整体代码本身。

常见微任务：`Promise.then/catch/finally`、`queueMicrotask`、`MutationObserver`。

```js
console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('script end');

// script start
// script end
// promise
// setTimeout
```

关键点：**每个宏任务结束后，会立即清空当前全部微任务队列（包括微任务执行期间新产生的微任务），再执行下一个宏任务**，不是等到"下一轮事件循环"才处理微任务。即使 `setTimeout` 的延迟写的是 `0`，它对应的宏任务也一定排在当前所有微任务之后。

> 如果微任务里持续产生新的微任务（比如递归的 Promise 链），会在同一轮全部清空，不会让出执行权给下一个宏任务，这可能导致宏任务被"饿死"，是写递归 Promise 逻辑时需要留意的坑。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** high
> **标题：** Event Loop 执行流程
> **目的：** 展示同步代码、调用栈、微任务队列和宏任务队列的执行顺序。
> **必须表达：** 当前同步任务执行完成后先清空微任务，再进入下一个宏任务。
> **避免表达：** 不要将所有宏任务画成一次性全部执行。

![](../../static/docs/aiRender/前端面试/06-EventLoop执行流程.webp)

### Node.js 的事件循环和浏览器有什么不同？

Node.js 的事件循环比浏览器更复杂，分为 **6 个阶段**，每个阶段处理特定类型的回调：

```text
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

每个阶段切换之间，Node.js 都会清空两个微任务队列，且**优先级不同**：`process.nextTick` 队列优先于 `Promise.then` 队列，这是 Node.js 与浏览器最大的差异（浏览器只有一种统一优先级的微任务队列）：

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
// 输出：nextTick → promise
```

`setImmediate` 和 `setTimeout(fn, 0)` 也经常被拿来比较：`setImmediate` 在 check 阶段执行，`setTimeout(fn, 0)` 在 timers 阶段执行。在主模块（非 I/O 回调）里，两者的先后顺序**不确定**，受系统计时器精度影响；但在 **I/O 回调内部**，`setImmediate` 一定先于 `setTimeout` 执行，因为此时事件循环已经处于 poll 阶段，会先进入 check 阶段再回到下一轮的 timers 阶段：

```js
const fs = require('fs');
fs.readFile('file', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // 在 I/O 回调内部，始终输出：immediate → timeout
});
```

| | 浏览器 | Node.js |
| --- | --- | --- |
| 循环结构 | 宏任务 + 微任务队列 | 6 个阶段 |
| 微任务优先级 | `Promise.then`（统一） | `nextTick` > `Promise.then` |
| `setImmediate` | 不支持 | check 阶段执行 |
| 渲染时机 | 微任务后、下一宏任务前 | 无渲染 |

### Promise 的状态机制和四个静态方法分别怎么用？

Promise 有三种状态：`pending`（等待）、`fulfilled`（成功）、`rejected`（失败），且**状态一旦从 `pending` 变化就不可逆**：

```js
const promise = new Promise((resolve, reject) => {
  resolve('ok');   // pending → fulfilled
  reject('err');   // 已经 fulfilled，这行不会生效
});
```

需要特别记住：Promise 构造函数里的代码是**同步执行**的；`then` 回调是微任务；`then` 会返回一个新的 Promise，因此可以链式调用；错误会沿链路向后传递，直到被 `catch` 捕获为止。

四个静态方法解决的场景各不相同：

| 方法 | 触发条件 | 失败处理 | 典型场景 |
| --- | --- | --- | --- |
| `Promise.all` | 全部 `fulfilled` | 任一 `rejected` 立即终止 | 多个请求都必须成功才能继续（如同时拉取多份配置） |
| `Promise.race` | 第一个落定（无论成败） | 第一个若是 `rejected` 也终止 | 超时控制 |
| `Promise.allSettled` | 全部落定 | 不会 `reject`，把每一项结果都记录下来 | 批量操作，需要知道每一项的成败（如批量上传，无论成败都要汇总报告） |
| `Promise.any` | 第一个 `fulfilled` | 全部 `rejected` 才 `reject`（抛出 `AggregateError`） | 多个数据源，任意一个成功即可 |

`Promise.race` 用于超时控制的典型写法：

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

`Promise.allSettled` 返回的数组，每一项是 `{ status: 'fulfilled', value }` 或 `{ status: 'rejected', reason }`，不需要额外的 `catch` 就能拿到全部结果。

### `async/await` 和 Generator 是什么关系？

`async/await` 让异步代码写起来像同步代码，本质上是对 Promise 的语法糖封装：`async` 函数始终返回一个 Promise，`await` 会暂停当前 `async` 函数的执行，等待右侧 Promise 落定后再继续，并把后续代码放到微任务中执行。它并不会阻塞整个线程，只是暂停当前函数内部的后续逻辑：

```js
async function fetchUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    return data.name;
  } catch (err) {
    console.error('请求失败：', err); // rejected 的 Promise 和运行时错误都能被这里捕获
  }
}
```

`try/catch` 能捕获 `await` 抛出的错误（即 Promise `rejected` 的情况），这是相比 `.then` 链最大的优势——可以和同步错误用统一的方式处理。裸 Promise 需要用 `.catch()`，两种方式等价，但没有任何错误处理的话，`rejected` 的 Promise 会变成未处理的 rejection，生产环境会报错。

理解 `async/await` 的本质，绕不开 **Generator**：用 `function*` 声明，`yield` 暂停执行并返回一个值，调用 `.next()` 才会继续：

```js
function* gen() {
  console.log('start');
  const a = yield 1;   // 暂停，返回 1；下次 .next(val) 传入的 val 赋给 a
  console.log('a =', a);
  yield 2;
  console.log('end');
}

const g = gen();
g.next();        // 输出 "start"，返回 { value: 1, done: false }
g.next('hello'); // 输出 "a = hello"，返回 { value: 2, done: false }
g.next();        // 输出 "end"，返回 { value: undefined, done: true }
```

| | Generator | `async/await` |
| --- | --- | --- |
| 声明 | `function*` | `async function` |
| 暂停 | `yield` | `await` |
| 恢复执行 | 手动调用 `.next()` | 自动恢复（由 Promise 驱动） |
| 返回值 | Iterator 对象 | Promise |
| 错误处理 | `.throw()` 注入错误 | `try/catch` |

一句话总结两者关系：`async/await` 本质上就是 **Generator + 自动执行器**——不需要手动调用 `.next()`，JS 引擎会在每次 `await` 后的 Promise 落定时自动帮你调用，驱动 Generator 继续往下走。

### 综合输出题怎么一步步推？

这是把 `async/await`、Promise、`setTimeout` 放在一起的经典综合题：

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

// script start → async1 start → async2 → promise1 → script end
// → async1 end → promise2 → setTimeout
```

推导过程：

```text
【同步执行 script 宏任务】
1. console.log('script start')
2. setTimeout 回调 → 推入宏任务队列
3. async1() 调用：
   - console.log('async1 start')
   - await async2()：
     - async2 函数体同步执行，console.log('async2')
     - async2 返回一个已 resolved 的 Promise
     - await 在这里挂起 async1，后续代码被推入微任务队列
4. new Promise(executor)：
   - executor 同步执行，console.log('promise1')
   - resolve() 调用，.then 回调被推入微任务队列
5. console.log('script end')

【清空微任务队列】
6. async1 的后续代码：console.log('async1 end')
7. promise.then：console.log('promise2')

【执行下一个宏任务】
8. setTimeout 回调：console.log('setTimeout')
```

两个最容易出错的点：`await async2()` 里，`async2` 的**函数体是同步执行的**，只是 `async2` 返回之后 `await` 才会挂起外层的 `async1`，`async2` 本身不会被推迟到微任务；`new Promise(executor)` 里，**`executor` 是同步执行的**，只有 `.then` 的回调才是微任务，所以 `promise1` 会在同步阶段就打印出来，而不是等到微任务阶段。

## 九、深拷贝与浅拷贝

### 浅拷贝和深拷贝的区别是什么？

**浅拷贝**只复制对象的第一层，如果属性值是引用类型，复制的是引用地址，嵌套对象仍然共享同一块堆内存：

```js
const obj = { a: 1, b: { c: 2 } };

const shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99，被影响了
```

**深拷贝**会递归复制所有层级，新对象和原对象完全独立：

```js
const deep = structuredClone(obj);
deep.b.c = 99;
console.log(obj.b.c); // 2，不受影响
```

常见浅拷贝方式：`Object.assign({}, obj)`、`{ ...obj }`、`array.slice()`、`[...array]`，都只处理第一层。

### 深拷贝有哪些实现方案，怎么选？

**方案一：`JSON.parse(JSON.stringify())`**，最常见但缺陷很多：

| 情况 | 结果 |
| --- | --- |
| `function` | 属性直接消失 |
| `undefined` | 属性直接消失 |
| `Symbol` 属性 | 消失 |
| `Date` 对象 | 变成字符串，不会还原为 `Date` |
| `RegExp`、`Map`、`Set` | 无法正确复制 |
| `NaN`、`Infinity` | 变成 `null` |
| 循环引用 | 直接抛错 |

```js
const obj = { fn: () => {}, d: new Date(), n: NaN };
JSON.parse(JSON.stringify(obj));
// { d: "2024-01-01T00:00:00.000Z", n: null }，fn 消失，d 变字符串，n 变 null
```

**方案二：`structuredClone()`**，现代原生方案（Node 17+、现代浏览器原生支持），解决了 JSON 方案的大部分问题，正确还原 `Date`、`Map`、`Set`、支持循环引用，但不支持 `function`（会抛 `DataCloneError`）：

```js
const copy = structuredClone({
  d: new Date(),
  map: new Map([['key', 'val']]),
});
copy.d instanceof Date; // true
```

**方案三：`_.cloneDeep()`（lodash）**，最全面，几乎支持所有类型（包括 `function`，会直接复制引用），适合复杂场景，代价是引入额外依赖。

**方案四：手写递归**，面试高频考点，核心是用 `WeakMap` 处理循环引用：

```js
function deepClone(value, cache = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (cache.has(value)) return cache.get(value); // 命中已处理过的对象，直接返回，避免死循环

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  const result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  cache.set(value, result); // 先登记再递归，保证循环引用时能命中缓存

  Reflect.ownKeys(value).forEach((key) => {
    result[key] = deepClone(value[key], cache);
  });

  return result;
}
```

关键点：用 `WeakMap` 记录已处理的对象，防止循环引用导致死循环，并且不会阻止这些对象被垃圾回收；`Reflect.ownKeys()` 能遍历到 `Symbol` 属性，`for...in` 或 `Object.keys()` 做不到。

方案选择建议：数据简单、无特殊类型用 `JSON.parse(JSON.stringify())` 图省事；现代浏览器或 Node 17+ 优先 `structuredClone()`；复杂对象且项目已经依赖 lodash，用 `_.cloneDeep()`；面试手写考的是递归 + `WeakMap` 处理循环引用的思路。

## 十、浏览器存储、Cookie 与同源策略

### Cookie 有哪些关键属性？

Cookie 会随同域请求自动发送，常用于登录态、服务端会话标识和少量状态保存。常见属性：

| 属性 | 作用 |
| --- | --- |
| `Expires` / `Max-Age` | 过期时间 |
| `Domain` | 生效域名 |
| `Path` | 生效路径 |
| `HttpOnly` | 禁止 JavaScript 读取，降低 XSS 窃取风险 |
| `Secure` | 只在 HTTPS 下发送 |
| `SameSite` | 限制跨站请求携带 Cookie，缓解 CSRF |

Cookie 的特点是容量小（单个通常不超过 4KB）、会自动随请求发送，适合保存会话标识，不适合保存大量数据。安全上要重点关注 `HttpOnly`、`Secure` 和 `SameSite`，不要把敏感明文信息直接放进 Cookie。

### `localStorage`、`sessionStorage`、IndexedDB 怎么选？

| 存储 | 生命周期 | 容量 | 适用场景 |
| --- | --- | --- | --- |
| `localStorage` | 手动清除前长期存在 | 通常约 5MB | 本地偏好、非敏感缓存 |
| `sessionStorage` | 当前标签页会话结束即清除 | 通常约 5MB | 页面临时状态 |
| IndexedDB | 长期存在 | 更大（通常受磁盘配额限制） | 结构化、大体量的离线数据 |

```js
localStorage.setItem('username', 'Tom');
localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear();
```

注意点：Web Storage 只能直接存字符串，对象需要 `JSON.stringify` 序列化；同步 API 可能阻塞主线程，不适合频繁写入大量数据；不要存储敏感信息，因为 XSS 攻击可以直接读取 Web Storage 里的内容（这一点和有 `HttpOnly` 保护的 Cookie 不同）。

### 同源策略和跨域方案有哪些？

同源要求协议、域名、端口三者完全一致。浏览器限制跨源读取响应，是前端安全的基础机制，避免恶意页面读取用户在其他站点的敏感数据。

常见跨域解决方案：

- **CORS**：主流方案，由服务端在响应头里声明允许跨域，浏览器据此放行。
- **JSONP**：利用 `<script>` 标签不受同源策略限制的特性，只支持 GET，且存在潜在的 XSS 风险，现在已经较少使用。
- **代理**：开发环境用构建工具代理，生产环境用服务端转发请求，绕开浏览器的跨域限制（本质是服务端之间没有同源限制）。
- **`postMessage`**：用于窗口、iframe 之间的安全跨源通信。

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true
```

CORS 里有两个高频追问点：**简单请求和预检请求的区别**——简单请求（GET/HEAD/POST 且 `Content-Type` 是几种受限类型之一）会直接发送，复杂请求（比如带自定义 header、`Content-Type: application/json`）浏览器会先发一个 `OPTIONS` 预检请求，服务端确认允许后才会真正发送；**为什么不能把 `Access-Control-Allow-Origin` 设为 `*` 同时携带凭证**——因为通配符加凭证意味着任意源都能带着用户的 Cookie 发起请求并读取响应，是明显的安全漏洞，规范里明确禁止了这种组合，携带凭证时 `Allow-Origin` 必须是具体的域名。

## 十一、Ajax、网络请求与文件上传

### `XMLHttpRequest` 的基本用法是什么？

Ajax 的核心是通过 JavaScript 在不刷新页面的情况下发起 HTTP 请求并更新页面。`XMLHttpRequest` 的基本流程：

```js
function ajax({ method = 'GET', url, data, headers = {} }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP ${xhr.status}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };

    xhr.send(data);
  });
}
```

`readyState` 常见状态：`0` 未初始化、`1` 已调用 `open`、`2` 已收到响应头、`3` 正在接收响应体、`4` 请求完成。

### `fetch` 有哪些面试易错点？

`fetch` 返回 Promise，API 比 `XMLHttpRequest` 更现代，但有几个容易踩坑的地方：**HTTP 4xx/5xx 不会自动 `reject`**，只有网络层面的错误（比如断网）才会 `reject`，判断请求是否成功需要额外检查 `response.ok`；**默认不携带 Cookie**，跨域场景下需要显式配置 `credentials: 'include'`；**中止请求需要 `AbortController`**，`fetch` 本身没有内置的取消能力。

```js
async function request(url) {
  const response = await fetch(url, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

### 文件上传，尤其是大文件上传，通常怎么做？

浏览器文件上传常用 `input[type=file]`、`FileReader`、`FormData`：

```js
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', async function () {
  const file = this.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  await fetch('/upload', {
    method: 'POST',
    body: formData,
  });
});
```

普通文件上传直接用 `FormData` 就够了，但文件很大（比如几百 MB 的视频）时，直接整体上传会有几个问题：单次请求体积过大容易超时失败；网络中断后需要从头重传；无法显示细粒度的上传进度。大文件上传的常见思路是：**前端按固定大小切片**；**计算文件 hash（通常抽样部分内容而不是整个文件，避免计算太慢），用于秒传或断点续传**——如果服务端已经存在相同 hash 的完整文件，直接返回成功，不需要真正上传；**并发上传多个分片**，加快整体速度；**服务端接收完所有分片后按顺序合并**；**上传失败时只重传失败的分片**，而不是整个文件重来。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** medium
> **标题：** 大文件上传流程
> **目的：** 展示文件切片、计算 hash、并发上传、失败重试、服务端合并的顺序。
> **必须表达：** 秒传和断点续传依赖文件标识与分片状态。
> **避免表达：** 不要把所有上传都画成必须先完整读入内存。

![](../../static/docs/aiRender/前端面试/07-大文件上传流程.webp)

## 十二、性能优化：防抖、节流与懒加载

### 防抖和节流的核心区别是什么？

两者都是限制函数执行频率的技术，区别在于触发时机：**防抖（debounce）**是连续触发时只执行最后一次，停止触发后等待 n 秒才真正执行；**节流（throttle）**是无论触发多密集，每隔 n 秒最多执行一次。

防抖的核心思路是每次触发都清除上一个定时器、重新计时，只有停止触发 n 秒后才真正执行：

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer); // 清除上次的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const handleSearch = debounce((val) => {
  console.log('搜索：', val);
}, 500);

input.addEventListener('input', (e) => handleSearch(e.target.value));
```

适用场景：搜索框输入（停止输入后再发请求）、窗口 `resize` 后重新计算布局、表单校验。

节流的核心思路是记录上次执行时间，每次触发时判断距上次是否已超过间隔：

```js
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log('滚动位置：', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```

适用场景：页面滚动监听（`scroll`、`mousemove`）、按钮防重复点击。

| | 防抖 | 节流 |
| --- | --- | --- |
| 执行时机 | 停止触发后 n 秒 | 每 n 秒最多一次 |
| 连续触发时 | 一直不执行，直到停下来 | 稳定地每隔 n 秒执行一次 |
| 核心实现 | `clearTimeout` + `setTimeout` | 时间戳对比 |
| 典型场景 | 搜索框、`resize` | `scroll`、`mousemove`、防重复点击 |

上面的节流实现本身就是"立即执行（leading）"版本：第一次触发时 `Date.now() - 0 >= interval` 恒成立，会直接执行。防抖如果想要立即执行版本，需要额外加 `immediate` 参数：第一次触发立即执行，冷却期内的后续触发都忽略，等定时器结束清空后才允许下一次立即执行：

```js
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    if (immediate && !timer) {
      fn.apply(this, args); // timer 为空说明是"冷却后的第一次"，立即执行
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null; // 冷却完毕，下次触发可以再立即执行
      if (!immediate) fn.apply(this, args);
    }, delay);
  };
}
```

> 实际项目中推荐直接用 lodash 的 `_.debounce()` 和 `_.throttle()`，它们通过 `{ leading, trailing }` 等配置项灵活控制执行时机，不需要自己重复造轮子。

### 图片懒加载怎么实现？

图片懒加载的目标是只加载即将进入视口的图片，减少首屏请求和带宽消耗。现代方案优先使用 `IntersectionObserver`，它由浏览器底层优化，不需要手动监听 `scroll` 计算位置：

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    img.src = img.dataset.src;
    observer.unobserve(img); // 加载完就停止观察，避免重复触发
  });
});

document.querySelectorAll('img[data-src]').forEach((img) => {
  observer.observe(img);
});
```

旧方案是监听 `scroll` 事件并用 `getBoundingClientRect()` 手动计算元素是否进入视口，但必须配合节流，否则滚动过程中会触发大量不必要的计算：

```js
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}
```

工程中优先考虑 `IntersectionObserver`，代码更简洁，而且性能明显优于手动监听 `scroll`。

## 十三、正则表达式

### 正则怎么创建？常用修饰符有哪些？

正则可以用字面量或构造函数创建：

```js
const re1 = /\d+/g;
const re2 = new RegExp('\\d+', 'g');
```

常见修饰符：`g` 全局匹配、`i` 忽略大小写、`m` 多行匹配、`s` 允许 `.` 匹配换行符、`u` 启用 Unicode 模式、`y` 粘连匹配（要求从 `lastIndex` 位置精确开始匹配）。

### 常用方法和量词有哪些？

```js
const str = 'I love JavaScript 2026';

str.match(/\d+/);              // ['2026']
/\d+/.test(str);                // true
str.replace(/JavaScript/, 'JS'); // 'I love JS 2026'
```

常见量词：`*` 0 次或多次、`+` 1 次或多次、`?` 0 次或 1 次、`{n}` 恰好 n 次、`{n,}` 至少 n 次、`{n,m}` n 到 m 次。

### 贪婪匹配和非贪婪匹配有什么区别？

默认量词是**贪婪匹配**，会在满足整体匹配的前提下尽可能多地匹配字符；在量词后加 `?` 会变成**非贪婪匹配**，尽可能少地匹配：

```js
const html = '<div>one</div><div>two</div>';

html.match(/<div>.*<\/div>/)[0];  // '<div>one</div><div>two</div>'，贪婪匹配到最后一个 </div>
html.match(/<div>.*?<\/div>/)[0]; // '<div>one</div>'，非贪婪匹配到第一个 </div> 就停止
```

解析 HTML 这类有明确边界标签的场景，用非贪婪匹配才能得到符合预期的单个片段，这也是这道题最容易踩坑的地方。

## 十四、Web 安全

### XSS 是什么？怎么防护？

XSS（跨站脚本攻击）是攻击者把恶意脚本注入页面，并让脚本在其他用户的浏览器中执行。常见类型：**存储型**——恶意内容被存进数据库，其他用户访问相关页面时触发执行（比如评论区里插入的脚本）；**反射型**——恶意脚本通过 URL 参数等方式，被服务端未经处理就直接"反射"回页面执行；**DOM 型**——前端脚本自己把不可信的数据写入了 DOM（比如把 URL 参数直接塞进 `innerHTML`），不需要经过服务端。

常见防护手段：对用户输入和输出都做转义；避免把不可信内容直接写入 `innerHTML`；Cookie 设置 `HttpOnly`，即便页面被注入脚本也无法窃取 Cookie；配置内容安全策略 CSP，限制页面能加载和执行的脚本来源；富文本场景用可信的白名单方式过滤标签和属性，而不是简单转义（否则富文本功能会失效）。

```js
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (char) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[char];
  });
}
```

### CSRF 是什么？和 XSS 有什么区别？

CSRF（跨站请求伪造）是攻击者诱导已登录用户在不知情的情况下向目标站点发起请求，利用的是浏览器会自动携带 Cookie 的特性完成操作（比如诱导用户点击一个链接，链接背后偷偷发起了转账请求）。常见防护：`SameSite` Cookie 属性，限制跨站请求是否携带 Cookie；CSRF Token，服务端下发一个只有当前页面知道的令牌，请求时必须携带；验证请求的 `Origin`/`Referer` 是否符合预期；关键操作（如支付、删除）增加二次确认，即使 CSRF 发生了也很难悄无声息地完成。

XSS 和 CSRF 是完全不同的攻击路径，容易被面试官拿来对比：

| 攻击 | 核心能力 | 防护重点 |
| --- | --- | --- |
| XSS | 在受害者页面里执行恶意脚本 | 输入输出转义、CSP、`HttpOnly` |
| CSRF | 借用已登录用户的身份发起请求，不需要执行脚本 | CSRF Token、`SameSite`、`Origin` 校验 |

### SQL 注入前端要了解到什么程度？

SQL 注入通常发生在服务端拼接 SQL 语句时，前端面试中了解概念即可，不是考察重点：

```sql
-- 风险写法：把用户输入直接拼进 SQL
SELECT * FROM users WHERE name = '${name}';
```

核心防护是服务端使用参数化查询，不要直接拼接用户输入。回答时可以说明：前端能做输入格式校验提升体验（比如禁止用户名里出现特殊字符），但真正的安全边界必须在服务端，不能依赖前端校验来防注入。

## 十五、内存管理与垃圾回收

### JS 引擎怎么判断一个对象可以被回收？

JS 引擎会自动回收不再需要的内存，开发者不需要手动释放。判断标准是**可达性（Reachability）**：从根对象出发，沿着引用链能访问到的对象保留，访问不到的对象回收。

常见的根对象包括：全局对象（`window`/`global`）、当前调用栈中的局部变量和参数、闭包仍在引用的变量。

```js
let user = { name: 'Alice' }; // { name: 'Alice' } 可达
user = null;                    // 断开引用，对象不可达，可以被 GC
```

### 引用计数和标记清除有什么区别？

**引用计数（Reference Counting）** 是早期算法：每个对象维护一个"被引用次数"，次数归零就回收。它的致命缺陷是无法处理**循环引用**：

```js
function createCycle() {
  const a = {};
  const b = {};
  a.ref = b; // a 引用 b
  b.ref = a; // b 引用 a
  // 函数结束后，a 和 b 的引用计数都还是 1（互相引用）
  // 永远不会变成 0，永远不会被回收 → 内存泄漏
}
createCycle();
```

IE6/7 使用的就是引用计数，循环引用是当时最常见的内存泄漏根源之一。

**标记清除（Mark-and-Sweep）** 是现代 JS 引擎（V8 等）的主流算法，彻底解决了循环引用问题：先从根对象出发遍历所有可达对象并打上标记，再遍历整个堆，回收所有未被标记的对象。循环引用不再是问题——只要 `a` 和 `b` 都从根对象不可达，无论它们互相引用多少次，都会一起被回收。

### V8 的分代回收是怎么优化的？

V8 把堆内存分成两个区域，用不同的策略管理：

| | 新生代（New Space） | 老生代（Old Space） |
| --- | --- | --- |
| 存放内容 | 新创建的短命对象 | 存活时间长的对象 |
| 大小 | 小（约 1～8 MB） | 大（数百 MB） |
| GC 频率 | 高频（Minor GC） | 低频（Major GC） |
| 算法 | Scavenge（复制算法） | 标记清除 + 标记整理 |

新生代对象如果经过两次 GC 依然存活，会被"晋升"移入老生代。这也是为什么短命的临时对象性能开销小——它们绝大多数在新生代就被快速回收了，很少触发代价更高的 Major GC。

### 常见的内存泄漏场景有哪些？

| 场景 | 原因 |
| --- | --- |
| 意外创建全局变量 | 全局变量是根对象，永远可达，不会被回收 |
| 定时器或事件监听未清除 | 监听器持有的外部引用一直存在 |
| 闭包长期持有大对象 | 外层变量被内层函数引用，无法释放 |
| DOM 被移除后仍被 JS 引用 | 节点已从页面移除，但变量还指着它，依然可达 |
| 缓存没有淘汰策略 | 数据只增不减，逐渐撑爆内存 |

组件销毁时应该主动清理副作用，这是避免上面几种泄漏最直接的做法：

```js
const timer = setInterval(() => {
  // do something
}, 1000);

window.addEventListener('resize', handleResize);

function cleanup() {
  clearInterval(timer);
  window.removeEventListener('resize', handleResize);
}
```

> `WeakMap`/`WeakRef` 的设计初衷正是解决"需要引用一个对象，但又不希望这个引用阻止它被 GC"的问题，后面 Map 与 WeakMap 一章会展开讲它的具体用法。

> [!VISUALIZATION]
> **类型：** relationship
> **优先级：** medium
> **标题：** 可达性与内存泄漏
> **目的：** 展示对象是否能从根对象访问到，决定其是否可被回收。
> **必须表达：** 已移除 DOM 如果仍被闭包或变量引用，就仍然可达。
> **避免表达：** 不要把"变量置为 null"画成唯一解决方案，关键是断开所有不再需要的引用。

![](../../static/docs/aiRender/前端面试/08-可达性与内存泄漏.webp)

## 十六、数组、字符串与常用 API

### 哪些数组方法会改变原数组？

| 会改变原数组 | 不会改变原数组 |
| --- | --- |
| `push`、`pop`、`shift`、`unshift` | `concat`、`slice`、`map`、`filter` |
| `splice`、`sort`、`reverse` | `reduce`、`find`、`some`、`every` |

```js
const arr = [1, 2, 3];
arr.push(4);                          // 改变原数组
const next = arr.map((item) => item * 2); // 返回新数组，原数组不变
```

面试容易连续追问几组方法的区别：`slice` 和 `splice`——`slice` 是截取并返回新数组，不修改原数组；`splice` 是直接在原数组上删除/插入，会修改原数组。`map` 和 `forEach`——`map` 返回一个新数组，`forEach` 没有返回值，只是单纯遍历。`find` 和 `filter`——`find` 返回第一个满足条件的元素本身，`filter` 返回所有满足条件的元素组成的新数组。`some` 和 `every`——`some` 只要有一项满足条件就返回 `true`，`every` 要求全部满足才返回 `true`。

### 数组去重和类数组转换怎么做？

基础去重直接用 `Set`：

```js
const unique = [...new Set([1, 1, 2, 3])];
```

对象数组按某个字段去重，需要用 `Map` 记录已出现过的 key：

```js
function uniqueBy(list, key) {
  const map = new Map();
  list.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return [...map.values()];
}
```

类数组（有 `length` 和索引，但没有数组方法，比如 `arguments`）转真正的数组有三种常见写法：

```js
function fn() {
  const args1 = Array.prototype.slice.call(arguments);
  const args2 = Array.from(arguments);
  const args3 = [...arguments];
}
```

> `arguments` 只在普通函数中可用，箭头函数没有自己的 `arguments`，会从外层函数继承。

其他常用的数组 API：`includes(2)` 判断是否包含某项，比 `indexOf(2) !== -1` 更语义化，并且能正确处理 `NaN`（`indexOf` 找不到 `NaN`）；`flat(Infinity)` 递归打平多层嵌套数组；`findIndex` 返回第一个满足条件的元素下标，找不到返回 `-1`。

## 十七、Map、Set、WeakMap、WeakSet

### `Map` 和普通对象 `{}` 有什么区别？

**键的类型**：普通对象的 key 只能是字符串或 `Symbol`，用对象做 key 会被隐式转成字符串 `"[object Object]"`；`Map` 的 key 可以是任意类型，包括对象、函数、`NaN`：

```js
const map = new Map();
map.set({ id: 1 }, 'user');  // ✅ 对象作为 key，保持独立
map.set(42, 'number key');    // ✅ 数字作为 key，不会被转成字符串

const obj = {};
obj[{ id: 1 }] = 'user'; // ⚠️ key 被转成了字符串 "[object Object]"
```

**key 的顺序**：`Map` 严格按插入顺序遍历；普通对象里整数 key 会按数值升序排在最前面，字符串 key 按插入顺序排在其后，`Symbol` key 排在最后：

```js
const obj = {};
obj['b'] = 1;
obj['a'] = 2;
obj[2] = 3;
obj[1] = 4;
Object.keys(obj); // ['1', '2', 'b', 'a']，整数 key 先按数值排序
```

**遍历方式**：`Map` 支持直接 `for...of` 或 `.forEach()`；普通对象需要先 `Object.keys()` 拿到 key 数组才能遍历。

| | `Map` | 普通对象 `{}` |
| --- | --- | --- |
| key 类型 | 任意值 | 字符串 / `Symbol`（数字做 key 会被隐式转换成字符串） |
| 大小 | `.size` 直接获取 | `Object.keys(obj).length` |
| 遍历 | 直接 `for...of` | 需要 `Object.keys()` 等中转 |
| 原型污染风险 | 无 | 有（`{}` 继承自 `Object.prototype`，`toString`、`constructor` 等属性名可能被意外覆盖或触发） |
| 适合场景 | 频繁增删、key 非字符串 | 静态结构、需要 JSON 序列化 |

### `WeakMap` 解决了什么问题？

`WeakMap` 和 `Map` 的核心区别：**key 必须是对象，且是弱引用**。弱引用意味着，如果 key 对象在外部没有其他强引用了，垃圾回收器可以直接回收它，`WeakMap` 里对应的条目也会跟着自动消失，不会造成内存泄漏：

```js
const wm = new WeakMap();
let obj = { name: 'Alice' };
wm.set(obj, { extraData: '...' });

obj = null; // obj 被回收，wm 中对应的条目也会被自动清除
```

正因为 key 随时可能被回收，`WeakMap` **不支持遍历**，没有 `forEach`、`keys()`、`size` 这些方法——遍历的语义在这里没法保证稳定。

典型使用场景：**存储 DOM 节点的附加数据**，节点从页面移除后关联数据自动清理，不需要手动清空缓存；**私有属性模拟**，在没有 `#` 私有字段语法之前的常见模式，把私有数据存在 `WeakMap` 里，外部无法直接访问：

```js
const _private = new WeakMap();

class Person {
  constructor(name, age) {
    _private.set(this, { age }); // age 不挂在实例上，外部访问不到
    this.name = name;
  }
  getAge() {
    return _private.get(this).age;
  }
}
```

**缓存计算结果**，对象销毁后缓存自动失效，前面手写深拷贝时用 `WeakMap` 处理循环引用也是同样的思路——用完即弃，不会人为延长对象的生命周期。

`WeakSet` 是弱引用版本的 `Set`，只能存对象，同样不可遍历，使用场景相对较少，常见于标记"某个对象是否已经被处理过"。

## 十八、现代 JS 语法与模块化

### 解构、展开运算符、可选链、空值合并分别解决什么问题？

**解构赋值**简化了从对象或数组中取值的写法，支持重命名和默认值：

```js
const { name, age = 18, address: addr } = user;
// 等价于：const name = user.name; const age = user.age ?? 18; const addr = user.address;

const [first, , third] = [1, 2, 3]; // 跳过第二项

function render({ title, visible = false }) { // 函数参数解构，最常见的用法
  console.log(title, visible);
}
```

**展开运算符 `...`** 把数组或对象"展开"，常用于合并、浅拷贝、传参：

```js
const merged = [...arr1, ...arr2]; // 数组合并
const copy = [...arr];              // 数组浅拷贝

const newObj = { ...defaults, ...overrides }; // 对象合并，后面的同名属性覆盖前面的

function sum(first, ...rest) { // 收集剩余参数（rest 参数）
  return rest.reduce((a, b) => a + b, first);
}
```

**可选链 `?.`** 安全访问可能为 `null`/`undefined` 的嵌套属性，代替繁琐的 `&&` 链式判断：

```js
const name = user && user.profile && user.profile.name; // 旧写法

const name = user?.profile?.name; // 任一层是 null/undefined 就短路返回 undefined
const result = obj?.method?.();    // 方法不存在时不会报错，直接返回 undefined
```

**空值合并 `??`** 只在左侧是 `null` 或 `undefined` 时才取右侧默认值，解决了 `||` 会把 `0`、`''`、`false` 也当成 falsy 处理的问题：

```js
const count = value || 10; // value 是 0 时会返回 10，不符合预期

const count = value ?? 10; // value 是 0 时返回 0；value 是 null 时才返回 10
const name = user?.profile?.name ?? '匿名'; // 常与可选链组合使用
```

| 运算符 | 触发条件 | 典型用途 |
| --- | --- | --- |
| `\|\|` | 左侧为任意 falsy（`0`、`''`、`false`、`null`、`undefined`） | 旧式默认值，容易误伤合法的假值 |
| `??` | 左侧仅为 `null` 或 `undefined` | 精确的默认值判断 |
| `?.` | 左侧为 `null` 或 `undefined` 时短路 | 安全访问嵌套属性或调用方法 |

其他常用 ES6+ 特性速览：模板字符串支持多行和表达式插值（`` `Hello, ${name}!` ``）；默认参数（`function fetch(url, method = 'GET') {}`）；`for...of` 可以遍历任意可迭代对象（数组、`Map`、`Set`、字符串），比 `for...in` 更安全，因为 `for...in` 会遍历到原型链上的可枚举属性；`Object.entries`/`Object.values` 常用于把对象转成 `Map`（`new Map(Object.entries(obj))`）；逻辑赋值运算符（ES2021）`a ||= b`、`a &&= b`、`a ??= b` 是对应逻辑运算符和赋值的组合简写。

### CommonJS 和 ES Module 的核心区别是什么？

**CommonJS（CJS）** 是 Node.js 传统采用的模块规范，用 `require()` 同步加载模块，`module.exports` 导出：

```js
module.exports = { add: (a, b) => a + b };
const { add } = require('./math');
```

特点：**运行时加载**，`require` 执行到对应行才会加载模块；**导出值是拷贝**，导入的是值的副本，模块内部变量后续变化不会反映到已导入的值上；**同步执行**，适合服务端读取本地文件，不适合浏览器（网络请求是异步的，同步加载会阻塞）。

**ES Module（ESM）** 是 ES6 引入的官方标准，现代浏览器和 Node.js（12+）原生支持：

```js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

import { add } from './math.js';
import multiply from './math.js';
```

特点：**编译时静态分析**，`import` 在解析阶段就会被处理，不能写在条件语句里；**导出是实时绑定（live binding）**，导入的是变量的引用，模块内部的变化会同步反映到导入方；**支持 Tree Shaking**，打包工具能静态分析出哪些导出没被使用，从而删除；**天然支持异步加载**，更适合浏览器环境。

| | CommonJS | ES Module |
| --- | --- | --- |
| 语法 | `require` / `module.exports` | `import` / `export` |
| 加载时机 | 运行时 | 编译时（静态） |
| 导出内容 | 值的拷贝 | 实时绑定（引用） |
| 动态导入 | 天然支持 | `import()` 函数 |
| Tree Shaking | 不支持 | 支持 |
| 顶层 `await` | 不支持 | 支持 |
| 运行环境 | Node.js | 浏览器 + Node.js 12+ |

原生 Node.js 不能直接混用两种规范，`.js` 文件默认按 CJS 解析，要用 ESM 需要把文件改成 `.mjs`，或在 `package.json` 里设置 `"type": "module"`。打包工具（Webpack/Vite/Babel）里可以混用，工具会自动处理两种规范之间的互操作。

### AMD、CMD、UMD 是什么，现在还需要了解吗？

这三种规范是 ES Module 出现之前，社区为解决浏览器模块化问题探索出来的方案，现在项目里已经很少直接手写，但历史规范偶尔还会被问到：**AMD（Asynchronous Module Definition）** 由 RequireJS 推广，专为浏览器设计，异步加载，依赖需要前置声明：

```js
define(['jquery', 'lodash'], function ($, _) {
  return { doSomething() {} };
});
```

**CMD（Common Module Definition）** 由国内的 SeaJS 推广，和 AMD 类似但采用懒加载（用到时才执行依赖），写法更接近 CommonJS：

```js
define(function (require, exports, module) {
  const $ = require('jquery'); // 用到时再 require
  exports.doSomething = function () {};
});
```

**UMD（Universal Module Definition）** 兼容 AMD、CommonJS 和全局变量三种环境的通用格式，常用于发布同时要给浏览器和 Node.js 使用的第三方库。现在写库通常用 Rollup、tsup 这类打包工具自动生成 ESM + CJS 双格式产物，不再需要手写 UMD 样板代码。

## 十九、手写题与输出题复习清单

### 哪些手写题是高频必会的？

建议能独立写出并解释以下题目，而不是死记代码：`new`、`bind`、`instanceof`、防抖、节流、浅拷贝、深拷贝、发布订阅/事件总线、Promise 基础版、数组去重、Ajax 封装。

复习时要能说清楚每一步为什么存在：手写 `new` 必须解释原型连接和返回值处理逻辑；手写深拷贝必须解释为什么要用 `WeakMap` 处理循环引用；手写 `bind` 必须解释被 `new` 调用时为什么绑定的 `this` 要失效。只背代码，面试官追问一句"为什么这一步要这样写"就容易卡住。

### 遇到输出题应该按什么顺序分析？

按下面的顺序逐步分析，比死记某几道题的结论更可靠：

1. 找出同步代码，按书写顺序执行。
2. 遇到函数调用，先判断 `this` 的指向和作用域。
3. 遇到 Promise 构造函数，它内部的同步代码立即执行。
4. 遇到 `then`、`await` 之后的代码，放入微任务队列。
5. 遇到 `setTimeout`、DOM 事件等，放入宏任务队列。
6. 当前同步代码执行结束后，清空全部微任务队列。
7. 再取出下一个宏任务继续执行，回到第 6 步。

> [!VISUALIZATION]
> **类型：** flow
> **优先级：** medium
> **标题：** JavaScript 输出题分析顺序
> **目的：** 给出分析输出题时从同步代码、作用域、`this`、微任务到宏任务的步骤。
> **必须表达：** Promise 构造函数同步执行，`then` 回调进入微任务。
> **避免表达：** 不要简化成"Promise 永远比 setTimeout 快"，应强调同一轮事件循环中的关系。

![](../../static/docs/aiRender/前端面试/09-JavaScript输出题分析顺序.webp)

## 二十、面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- 数据类型、存储差异与类型判断
- 原型、原型链、`instanceof` 与继承
- 作用域、执行上下文与闭包
- `this` 绑定、箭头函数、`call/apply/bind` 与 `new`
- Promise、`async/await` 与 Event Loop
- 高频手写题与输出题

### ⭐⭐⭐⭐ 高频重点

- 深拷贝与浅拷贝
- DOM 事件流与事件委托
- Cookie、Web Storage、同源策略与跨域
- 防抖、节流、图片懒加载
- XSS、CSRF 与基础安全
- 垃圾回收与内存泄漏
- Map、Set、WeakMap、WeakSet

### ⭐⭐⭐ 常见考点

- Ajax、`XMLHttpRequest` 与 `fetch`
- 文件上传、大文件分片上传
- 正则表达式
- 数组、字符串与常用 API
- `var`、`let`、`const`
- 模块化（CommonJS / ES Module / AMD / CMD / UMD）
- 解构、展开运算符、可选链、空值合并

### 容易连续追问的知识链

- 数据类型 → 类型判断 → 隐式转换 → `==` 输出题
- 作用域 → 执行上下文 → 闭包 → 内存泄漏
- `this` → 箭头函数 → `call/apply/bind` → `new`
- 构造函数 → 原型 → 原型链 → `instanceof` → 继承 → `class`
- Promise → `async/await` → Generator → 微任务 → Event Loop 输出题
- Cookie → 同源策略 → CORS → CSRF
- DOM 事件流 → 事件委托 → 性能优化
- 引用计数 → 标记清除 → V8 分代回收 → 常见内存泄漏场景
