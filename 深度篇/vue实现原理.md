纸上得来终觉浅😂，还是自己敲一遍才能深刻理解，先上代码[https://justwe7.github.io/mvvm/index.html](https://justwe7.github.io/mvvm/index.html)  


### Vue运行机制

![vue运行机制](../static/vue-2.png)

1. `new Vue()`之后会执行init，初始化data、props、生命周期、methods、computed、watch等。主要通过`Object.defineProperty`监听data的数据，形成Observer
2. compile会经过parse(解析)、optimize(优化)与generate(生成)三个阶段
   1. 解析`<template>`中的dom树为AST(抽象语法树–Abstract Syntax Tree)
   2. 标记静态节点，后面当update更新洁面时，会有一个patch的过程，diff算法会直接跳过静态节点，从而减少比较的过程，优化了patch的性能。
   3. 将AST转换为render function
3. render function会读取compile解析到的需要**依赖收集**的值，依赖收集的目的是将观察者Watcher对象(观察数据 更新视图)存放到`Observer`下当前闭包中的订阅者Dep的subs中。
4. 在修改data值的时候，会触发对应的`setter`，setter通知之前**依赖收集**得到的Dep中的每一个Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些Watcher就会开始调用update来更新视图(当然这中间还有一个patch的过程以及使用队列来异步更新的策略)。


### 简易实现思考

1. 首先，需要利用`Object.defineProperty`，将要观察的对象，转化成getter/setter，以便拦截对象赋值与取值操作，称之为Observer；
2. 需要将DOM解析，提取其中的指令与占位符，并赋与不同的操作，称之为Compiler；
3. 需要将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Observer观察到对象数据变化时，接收通知，同时更新DOM，称之为Watcher；
4. 最后，需要一个公共入口对象，接收配置，协调上述三者；

![vue运行机制](../static/vue-1.png)

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

#### 实现Observer

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


#### 初步实现watcher与observer结合  

watcher职责是监听数据的更新，然后再触发视图的更新，如何监听？【订阅发布模式】在哪监听？【getter处订阅(添加complie编译模板时添加一次订阅)，setter处发布通知更新】watcher对象里面有什么数据？【当前的vue实例，当前watcher的data对象下数据的key值，还有要执行什么操作】

[订阅发布模式参考](https://17qu.top/shi-yao-shi-fa-bu-ding-yue-mo-shi/)

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


#### 实现compile  
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

#### 建立complie和watcher实现关系实现view更新   
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

[参考https://github.com/DMQ/mvvm](https://github.com/DMQ/mvvm)