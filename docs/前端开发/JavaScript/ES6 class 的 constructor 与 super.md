> 记录 ES6 `class` 里 `constructor` 到底在做什么、形参怎么用、继承时 `super()` 为什么必须先调用，以及这套语法对应到 ES5 是怎么手写出来的。

## 一、constructor 是什么，解决了什么问题

`constructor` 是类被 `new` 出来时自动调用的特殊方法，作用是初始化这个实例——把外部传进来的参数变成实例自己的属性。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const p = new Point(1, 2);
console.log(p.x, p.y); // 1 2
```

如果不写 `constructor`，JS 引擎会隐式补一个空的：

```js
class Point {}
// 等价于：
class Point {
  constructor() {}
}

const p = new Point(1, 2);
console.log(p.x, p.y); // undefined undefined，传进去的实参被直接丢弃了
```

这里有个容易漏掉的细节：**没有继承关系的类，默认 constructor 是空的**；但如果这个类是用 `extends` 继承来的，默认 constructor 并不是空的，而是自动把收到的所有参数原样转发给父类：

```js
class ColorPoint extends Point {}
// 等价于：
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

这个差异是后面 `super()` 那一节的伏笔——子类不写 constructor 也能正常工作，靠的就是这个隐式生成的 `super(...args)`。

---

## 二、constructor 的形参与基本用法

`constructor` 的形参就是普通函数参数，支持默认值、解构等所有写法：

```js
class User {
  constructor(name, { age = 18, role = 'user' } = {}) {
    this.name = name;
    this.age = age;
    this.role = role;
  }
}

const u = new User('Tom', { age: 20 });
console.log(u); // User { name: 'Tom', age: 20, role: 'user' }
```

有一条容易忽略的边界规则：`constructor` 的返回值会影响 `new` 表达式最终拿到的对象。

- 不写 `return`，或者 `return` 一个非对象值（比如字符串、数字）：`new` 表达式正常返回由 `this` 代表的那个实例。
- `return` 一个对象：`new` 表达式会返回这个对象，**而不是** `this` 所指向的实例。

```js
class Foo {
  constructor() {
    this.a = 1;
    return { b: 2 }; // 显式返回了一个对象
  }
}

const f = new Foo();
console.log(f); // { b: 2 }，f.a 是 undefined，this 创建的那个实例被丢弃了
```

这条规则平时很少主动用到，但排查"为什么 `new` 出来的实例上少了字段"这类问题时，第一反应应该是去看 constructor 里是不是手滑 `return` 了一个对象。

---

## 三、继承场景下的 super 调用

子类的 `constructor` 里，**必须先调用 `super()`，之后才能使用 `this`**：

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);       // 把 x、y 转交给父类的 constructor 去初始化
    this.color = color; // super 执行完之后，this 才可用
  }
}

const cp = new ColorPoint(1, 2, 'red');
console.log(cp); // ColorPoint { x: 1, y: 2, color: 'red' }
```

如果调换顺序，在 `super()` 之前用 `this`，会直接报错：

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError: Must call super constructor before accessing 'this'
    super(x, y);
  }
}
```

原因在于实例的创建过程：**子类的实例本质上是由父类的 constructor 创建出来的**，`super()` 做的事就是去调用父类的 constructor、拿到父类那部分的初始化结果，绑定成子类的 `this`。在 `super()` 跑完之前，这个 `this` 根本还不存在，是一个未初始化状态，所以引擎会直接拒绝访问它。这也是为什么 `super()` 只能调用一次——多调用一次就等于让父类 constructor 把同一个实例重复初始化一遍，引擎同样会报错。

> 结合第一节的结论：子类如果不写 constructor，引擎会自动生成 `constructor(...args) { super(...args) }`。这条规则只对子类成立，普通类不写 constructor 时补的是完全空的 `constructor() {}`。

---

## 四、对应的 ES5 写法

ES6 的 class 语法没有引入新的运行时能力，`constructor` 和 `super` 对应的效果，用 ES5 完全可以手写出来。

**无继承版本**，对应第二节的 constructor 形参：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

var p = new Point(1, 2);
console.log(p.x, p.y); // 1 2
```

普通函数本身就是构造函数，函数体里的赋值逻辑，跟 class 里的 `constructor` 是同一件事。

**继承版本**，对应第三节的 `super()`：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

function ColorPoint(x, y, color) {
  Point.call(this, x, y); // 模拟 super(x, y)：借用父类构造函数，把 this 传进去跑一遍
  this.color = color;
}

// 建立原型链，让 ColorPoint 的实例能访问 Point.prototype 上定义的方法
ColorPoint.prototype = Object.create(Point.prototype);
ColorPoint.prototype.constructor = ColorPoint;

var cp = new ColorPoint(1, 2, 'red');
console.log(cp); // ColorPoint { x: 1, y: 2, color: 'red' }
```

逐条对照关系：

| ES6 | ES5 | 作用 |
| --- | --- | --- |
| `constructor(x, y) { ... }` | `function Point(x, y) { ... }` | 定义构造逻辑 |
| `super(x, y)` | `Point.call(this, x, y)` | 借用父类构造函数，把父类的初始化逻辑在当前 `this` 上跑一遍 |
| `class ColorPoint extends Point` | `ColorPoint.prototype = Object.create(Point.prototype)` + 修正 `constructor` 指向 | 建立原型链，让实例能访问父类原型上的方法 |

> 有一点是 ES5 手写版本做不到的：class 语法对"必须先调用 super 才能用 this"有强制的运行时检查，忘记调用会直接报错；而 ES5 里 `Point.call(this, x, y)` 只是一次普通函数调用，忘了写不会报任何错，只是父类那部分字段悄悄没有被初始化——这类问题排查起来会更隐蔽。

---

## 五、总结：class 语法糖到底"糖"在哪

`constructor` 和 `super` 没有给 JS 带来新的继承能力，本质上还是"用函数当构造器、用 `.call` 转发到父类构造器、手动搭原型链"这套 ES5 模式，只是把这套容易写错、容易漏步骤的手工流程，收敛成了固定语法，并且加上了运行时检查（`super` 必须先调用、只能调用一次）。理解了 ES5 那一版的手写实现，再看 `constructor`/`super` 就只是换了一层写法，没有新概念需要单独记。
