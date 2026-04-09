纸上得来终觉浅😂，还是自己敲一遍才能深刻理解，先上代码[https://justwe7.github.io/mvvm/index.html](https://justwe7.github.io/mvvm/index.html)  


## Vue运行机制

![vue运行机制](/img/vue-2.png)

1. `new Vue()`之后会执行init，初始化data、props、生命周期、methods、computed、watch等。主要通过`Object.defineProperty`监听data的数据，形成Observer
2. compile会经过parse(解析)、optimize(优化)与generate(生成)三个阶段
   1. 解析`<template>`中的dom树为AST(抽象语法树–Abstract Syntax Tree)
   2. 标记静态节点，后面当update更新洁面时，会有一个patch的过程，diff算法会直接跳过静态节点，从而减少比较的过程，优化了patch的性能。
   3. 将AST转换为render function
3. render function会读取compile解析到的需要**依赖收集**的值，依赖收集的目的是将观察者Watcher对象(观察数据 更新视图)存放到`Observer`下当前闭包中的订阅者Dep的subs中。
4. 在修改data值的时候，会触发对应的`setter`，setter通知之前**依赖收集**得到的Dep中的每一个Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些Watcher就会开始调用update来更新视图(当然这中间还有一个patch的过程以及使用队列来异步更新的策略)。


## 简易实现思考

1. 首先，需要利用`Object.defineProperty`，将要观察的对象，转化成getter/setter，以便拦截对象赋值与取值操作，称之为Observer；
2. 需要将DOM解析，提取其中的指令与占位符，并赋予不同的操作，称之为Compiler；
3. 需要将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Observer观察到对象数据变化时，接收通知，同时更新DOM，称之为Watcher；
4. 最后，需要一个公共入口对象，接收配置，协调上述三者；

![vue运行机制](/img/vue-1.png)

首先看下最简单的vue实例包含的配置
```js
  var app = new Mvvm({
    el: "#app",
    data: {
      a: 122,
      obj: {
        foo: "foo的值"
      }
    },
    methods: {
      bar() {
        this.a = +new Date()
      }
    }
  })
```

### 实现Observer

核心是使用`Object.defineProperty`动态监听`new Vue()`传入option.data的每一个值，通过递归来实现 
```js
class Mvvm {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    /* 劫持数据 */
    this.observer(this.$data);
  }

  /* 数据劫持 */
  observer(data) {
    if (
      (data !== null && typeof data !== "object") ||
      Object.prototype.toString(data) !== "[object Object]"
    )
      return;
    // 取出所有属性遍历
    Object.keys(data).forEach(key => {
      // console.log(data, key, data[key]);
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, value) {
    /* 通过observer可以劫持到数据， 接下来目的是如何解决数据与视图同步的问题， 使用发布订阅模式  */
    this.observer(value); // 监听子属性，如果子属性是对象对跳过判断进行递归
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        console.log("getter监听值变化：%s", value);
        return value;
      },
      set: function(newVal) {
        if (value !== newVal) {
          console.log("setter监听值变化---旧值：%s => 新值：%s", value, newVal);
          value = newVal;
        }
      }
    });
  }
}
```

1. 传入【observer方法】一个对象`obj = {a: 122}`,`Object.keys(obj)`取出对象下的key值
2. 调用【defineReactive方法】，通过【observer中forEach遍历对象key值】遍历拿到的key值和当前闭包中的对象obj, 通过`Object.defineProperty(obj, key, {getter, setter, ...})`来实现数据劫持，如果是多维对象会递归调用【observer方法】
3. 此时如果在控制台执行app.$data.a = 123 应该会执行log打印信息


### 初步实现watcher与observer结合  

watcher职责是监听数据的更新，然后再触发视图的更新，如何监听？【订阅发布模式】在哪监听？【getter处订阅(添加complie编译模板时添加一次订阅)，setter处发布通知更新】watcher对象里面有什么数据？【当前的vue实例，当前watcher的data对象下数据的key值，还有要执行什么操作】

[订阅发布模式参考](https://lihx.top/shi-yao-shi-fa-bu-ding-yue-mo-shi/)

**首先实现的订阅发布模式**

```js
class Dep {
  constructor() {
    this.subs = [];
  }
  static targetWatcher = null
  addSub(tWatcher) {
    this.subs.push(tWatcher);
  }
  notify() {
    this.subs.forEach(function(tWatcher) {
      tWatcher.update();
    });
  }
}
```

**实现一个watcher**
```js
/* 观察数据 更新视图*/
class Watcher {
  constructor(vm, key) {
    this.vm = vm
    this.key = key
  }

  update() {
    console.log('watcher触发视图更新，data的key值:', this.key);
  }
}
```

**添加wather观察数据，接收数据变化**   

defineReactive执行形成了一个闭包，首次执行因为没有targetWatcher不会添加订阅，所以在`new Wacher()`要访问一下data.xxx【主动触发一下getter】

```js
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    /* 劫持数据 */
    this.observer(this.$data);

    /* 【主动触发一下getter】 */
    new Watcher(this, 'a')
    this.a
  }

  defineReactive(data, key, value) {
    var dep = new Dep();
    /* 通过observer可以劫持到数据， 接下来目的是如何解决数据与视图同步的问题， 使用发布订阅模式，  */
    this.observer(value); // 监听子属性，如果子属性是对象对跳过判断进行递归
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        /* watcher是订阅者  首次编译模板的时候先添加订阅 */
        Dep.targetWatcher && dep.addSub(Dep.targetWatcher);
        return value;
      },
      set: function(newVal) {
        if (value !== newVal) {
          value = newVal;
          dep.notify();
        }
      }
    });
```

**因为key可能在多处相同，所以Dep与watcher关系为：**   
Dep  
├─watcher  
├─watcher  
└─watcher  


### 实现compile  
compile职责是解析实例的dom树，提取出插值表达式中需要的data，添加watcher来更新视图。 

在构vue造实例中首先实例化compile，将dom树和当前的vm实例传入
```js
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    /* 劫持数据 */
    this.observer(this.$data);
    /* 
      编辑模板
      同时添加watcher
    */
    new Compile(options.el, this);
    // new Watcher(this, 'a')
    // this.a
  }
```

`new comile`会接收dom树
1. 将dom树依次遍历存入内存中 $fragment
2. 将内存中的dom树解析，如`{{}}  v-`等操作，并编译成真正的dom树，赋值给 $fragment
3. 将 $fragment 插入到当前的dom根节点中

第二步compile操作需要判断不同的节点类型执行不同的操作，如文本节点可能会存在{{}}表达式，标签节点可能会存在v-指令，区分不同的操作。



```js
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = this._isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el); //将el的节点存在缓存$fragment中  此时包含{{}}等
      // this.init(); //编译$fragment
      this.compile(this.$fragment); //编译$fragment
      this.$el.appendChild(this.$fragment); //将编译出的$fragment添加到节点  此时是dom节点
    }
  }

  node2Fragment(el) {
    //遍历el把内容返回出来
    var fragment = document.createDocumentFragment(),
      child;
    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile(el) {
    var childNodes = el.childNodes;

    [].slice.call(childNodes).forEach(node => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;
      // console.log(node.name);
      if (this._isElementNode(node)) {
        //如果是标签节点 <div></div>
        this.compileElement(node);
      } else if (this._isTextNode(node) && reg.test(text)) {
        //如果是文本节点 {{}}  取出key 然后从observer实例中取出对应的值
        /* RegExp.$1 取最近的上下文匹配正则的$1 */
        // console.log(RegExp.$1);
        compileUtil.text(node, this.$vm, RegExp.$1.trim());
        // this.compileText(node, RegExp.$1.trim());
      }

      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
    var nodeAttrs = node.attributes;

    [].slice.call(nodeAttrs).forEach(attr => {
      var attrName = attr.name;
      if (this._isDirective(attrName)) {
        var exp = attr.value;//取 属性名 v-model="foo" 的 foo
        var dir = attrName.substring(2);//取指令名 如 v-text的text  v-on
        // 事件指令
        if (this._isEventDirective(dir)) {
          compileUtil.eventHandler(node, this.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, this.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  }

  _isDirective(attr) {
    //是 vue 指令
    return attr.indexOf("v-") == 0;
  }

  _isEventDirective(dir) {
    return dir.indexOf("on") === 0;
  }

  _isElementNode(node) {
    return node.nodeType == 1;
  }

  _isTextNode(node) {
    return node.nodeType == 3;
  }
}
```

### 建立complie和watcher实现关系实现view更新   
封装compileUtil工具方法,在complie处调用，调用时可以添加wather进行数据订阅，数据修改时候，传入对应的操作进行dom更新。   
在这时整合之前的observer和watcher建立关联，并定义数据触发setter之后要执行什么样的数据操作。  

所以完善一下wacther
```js
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    
    this.value = this.getVal()
  }

  update() {
    console.log('watcher触发视图更新，data的key值:', this.key);
    this.cb && this.cb.call(this.vm, this.vm[this.key])
  }

  getVal() {
    Dep.targetWatcher = this //由于js是单线程
    // this.getter.call(this.vm, this.vm);
    const value = this.vm.$data[this.key]//访问一下实例的observer的data key属性，添加至dep中，修改时会触发视图更新
    Dep.targetWatcher = null
    return value;
  }

}
```

```js
var compileUtil = {
  /**
   * @param {*} node 当前操作的dom节点，可能是标签属性也可能是文本节点
   * @param {*} vm 当前的observer实例 也就是vue实例可以访问到对应的属性
   * @param {*} exp 表达式的key 如 {{foo}}中的foo 可以通过vm[foo]取到实例中的数据
   * @param {*} dir 定义的dom修改操作，如 v-text 中的 text
   */
  bind: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + "Updater"];
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    /* 
      observer实例
      exp对应的key的对象
    */
    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
  text: function(node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },

  html: function(node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },

  model: function(node, vm, exp) {
    this.bind(node, vm, exp, "model");

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener("input", function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function(node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },

  // 事件处理
  eventHandler: function(node, vm, exp, dir) {
    var eventType = dir.split(":")[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function(vm, exp) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function(k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function(vm, exp, value) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function(k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};
```

以上。。。基本实现简易版的vue  

## 核心知识点
<!-- 
### vue是如何收集依赖的

在实例化 Vue 时，依赖收集的相关过程如下∶ 初 始 化 状 态 initState ， 这 中 间 便 会 通 过 defineReactive 将数据变成响应式对象，其中的 getter 部分便是用来依赖收集的。 初始化最终会走 mount 过程，其中会实例化 Watcher （定义进入 Watcher 中，便会执行 this.get() 方法）

通过watch触发了数据的getter，在getter中dep.depend()会将数据添加到 -->

### 虚拟DOM

虚拟DOM（Virtual Dom）通过对象的方式来表示DOM结构（包含如 `tag`， `text`, `children` 等属性)，将页面的DOM结构抽象为JS对象的形式(vue2中的vdom借鉴了[snbbdom](https://github.com/snabbdom/snabbdom))

复杂的页面dom节点会很多，页面频繁的变更数据就需要精准的计算变更节点，否则页面更新性能会很差。所以将dom的更新计算转移到vdom中，用vdom模拟真实DOM结构，找出最小的变更，精准操作DOM

虚拟DOM的初始构建发生在complie过程最终通过`render`生成初始的dom树；页面数据的变更会重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较`update`（diff过程），将有差异的地方更新到真正的 DOM 树中去更新页面视图

```js
// vue构造函数
function Vue() {
  // ... 其他代码
  var updateComponent = () => {
    this._update(this._render());
  }
  new Watcher(updateComponent);
  // ... 其他代码
}
```

虚拟DOM另一个好处是可以用于服务端渲染，因服务端无法渲染html，所以无法直接生成html。通过vdom模拟真实DOM，通过内部的计算可以生成html输出给客户端

vue中的虚拟DOM（VNode）:

```js
// 源码位置：src/core/vdom/vnode.js

export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child (): Component | void {
    return this.componentInstance
  }
}
```

### vdom的Diff

在vue中的dom-diff就是对DOM的patch过程，最终的效果就是通过新旧vdom树的对比，精准的更新数据变化所影响到的DOM节点：

>- 创建节点：新的`VNode`中有而旧的`oldVNode`中没有，就在旧的`oldVNode`中创建
>- 删除节点：新的`VNode`中没有而旧的`oldVNode`中有，就从旧的`oldVNode`中删除
>- 更新节点：新的`VNode`和旧的`oldVNode`中都有，就以新的`VNode`为准，更新旧的`oldVNode`

引用图片看下patch的流程:

![image.png](https://s2.loli.net/2022/11/03/tyH3mOlb6sMhw4q.png)

源码中核心的两个patch方法有两个: 

- `patchVnode` 会判断是否需要判断子节点更新，调用`updateChildren`

- `updateChildren` 也会判断是否需要进行node的`patchVnode`更新

`patchVnode`内部逻辑：

- 新vnode有children
  - 旧的也有children，则进行子更新`updateChildren`（优化点）
  - 旧的没有children，直接添加新的
  - 新的没有children，旧的有，删除旧的
- 新vnode没有children有text，则移除旧的vnode内容进行重建

**为什么要做优化**

如果不做算法优化，两颗树的对比需要进行双层遍历操作：外循环遍历treeNew，内循环遍历treeOld，在内循环中还涉及到数组的移动删除等操作，时间复杂度会到O(n^3)，所以需要进行算法优化：

>- 只对比同层级，不跨级比较
>- tag不同直接删除重建不递归比较
>- tag、class、id、key相同则认为相同不进行递归比较

不优化会怎么样：

> 当新的`VNode`与旧的`oldVNode`都是元素节点并且都包含子节点时，那么这两个节点的`VNode`实例上的`children`属性就是所包含的子节点数组。我们把新的`VNode`上的子节点数组记为`newChildren`，把旧的`oldVNode`上的子节点数组记为`oldChildren`，我们把`newChildren`里面的元素与`oldChildren`里的元素一一进行对比，对比两个子节点数组肯定是要通过循环，外层循环`newChildren`数组，内层循环`oldChildren`数组，每循环外层`newChildren`数组里的一个子节点，就去内层`oldChildren`数组里找看有没有与之相同的子节点，伪代码如下：
>
> ```js
> for (let i = 0; i < newChildren.length; i++) {
>   const newChild = newChildren[i];
>   for (let j = 0; j < oldChildren.length; j++) {
>     const oldChild = oldChildren[j];
>     if (newChild === oldChild) {
>       // ...
>     }
>   }
> }
> ```
>
> - 创建子节点
>
>   如果`newChildren`里面的某个子节点在`oldChildren`里找不到与之相同的子节点，那么说明`newChildren`里面的这个子节点是之前没有的，是需要此次新增的节点，那么就创建子节点。
>
> - 删除子节点
>
>   如果把`newChildren`里面的每一个子节点都循环完毕后，发现在`oldChildren`还有未处理的子节点，那就说明这些未处理的子节点是需要被废弃的，那么就将这些节点删除。
>
> - 移动子节点
>
>   如果`newChildren`里面的某个子节点在`oldChildren`里找到了与之相同的子节点，但是所处的位置不同，这说明此次变化需要调整该子节点的位置，那就以`newChildren`里子节点的位置为基准，调整`oldChildren`里该节点的位置，使之与在`newChildren`里的位置相同。
>
> - 更新节点
>
>   如果`newChildren`里面的某个子节点在`oldChildren`里找到了与之相同的子节点，并且所处的位置也相同，那么就更新`oldChildren`里该节点，使之与`newChildren`里的该节点相同。

可以看到，如果不进行算法优化直接双循环对比，时间复杂度过高了

**怎么优化(重点)**

vue2(snabbdom)中使用了双指针的方式来优化循环对比方式，新旧树从两端往中间遍历直到结束

优化

1. **新前**与**旧前**对比，相同更新子节点

2. *新后*与*旧后*对比，相同更新子节点

3. *新后*与**旧前**对比，相同更新子节点

4. **新前**与*旧后*对比，相同更新子节点

5. 不符合前4条，则循环对比：

   通过新节点的key从旧节点中查找：

   1. 没有匹配的key，则新增节点到指定的下标位置
   2. 匹配到了
      1. 节点也相同（tag等），则使用`patchVnode`更新 （所以频繁删除新增的不要用index做key，假如内容只有text会有问题）
      2. 不同则新增节点

> - 先把`newChildren`数组里的所有未处理子节点的第一个子节点和`oldChildren`数组里所有未处理子节点的第一个子节点做比对，如果相同，那就直接进入更新节点的操作；
> - 如果不同，再把`newChildren`数组里所有未处理子节点的最后一个子节点和`oldChildren`数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作；
> - 如果不同，再把`newChildren`数组里所有未处理子节点的最后一个子节点和`oldChildren`数组里所有未处理子节点的第一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将`oldChildren`数组里的该节点移动到与`newChildren`数组里节点相同的位置；
> - 如果不同，再把`newChildren`数组里所有未处理子节点的第一个子节点和`oldChildren`数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将`oldChildren`数组里的该节点移动到与`newChildren`数组里节点相同的位置；
> - 最后四种情况都试完如果还不同，那就按照之前循环的方式来查找节点。

```js line
// 循环更新子节点
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0               // oldChildren开始索引
    let oldEndIdx = oldCh.length - 1   // oldChildren结束索引
    let oldStartVnode = oldCh[0]        // oldChildren中所有未处理节点中的第一个
    let oldEndVnode = oldCh[oldEndIdx]   // oldChildren中所有未处理节点中的最后一个

    let newStartIdx = 0               // newChildren开始索引
    let newEndIdx = newCh.length - 1   // newChildren结束索引
    let newStartVnode = newCh[0]        // newChildren中所有未处理节点中的第一个
    let newEndVnode = newCh[newEndIdx]  // newChildren中所有未处理节点中的最后一个

    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    // 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // 如果oldStartVnode不存在，则直接跳过，比对下一个
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 如果新前与旧前节点相同，就把两个节点进行patch更新
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 如果新后与旧后节点相同，就把两个节点进行patch更新
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        // 如果不属于以上四种情况，就进行常规的循环比对patch
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        // 如果在oldChildren里找不到当前循环的newChildren里的子节点
        if (isUndef(idxInOld)) { // New element
          // 新增节点并插入到合适位置
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          // 如果在oldChildren里找到了当前循环的newChildren里的子节点
          vnodeToMove = oldCh[idxInOld]
          // 如果两个节点相同
          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 调用patchVnode更新节点
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined
            // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      /**
       * 如果oldChildren比newChildren先循环完毕，
       * 那么newChildren里面剩余的节点都是需要新增的节点，
       * 把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中
       */
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      /**
       * 如果newChildren比oldChildren先循环完毕，
       * 那么oldChildren里面剩余的节点都是需要删除的节点，
       * 把[oldStartIdx, oldEndIdx]之间的所有节点都删除
       */
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }

```

### 通过diff理解一下key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，diff 操作可以更准确、更快速。`sameVnode`就是通过`key`和`tag`来判断的

如果使用index或者不指定key可能会：

1. 影响到节点内容错误的更新
2. 影响节点顺序变更，元素无法复用
3. 用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用

### template解析



## 参考文章

- [https://github.com/DMQ/mvvm](https://github.com/DMQ/mvvm)
- https://nlrx-wjc.github.io/Learn-Vue-Source-Code
- https://www.bilibili.com/video/BV1dr4y1M7ta