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

  /* compileText(node, key) {
    var value = this.$vm[key];
    node.textContent = typeof value == "undefined" ? "" : value;
  } */

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

/* dom操作 */
var updater = {
  textUpdater: function(node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function(node, value) {
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },

  classUpdater: function(node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, "").replace(/\s$/, "");

    var space = className && String(value) ? " " : "";

    node.className = className + space + value;
  },

  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  }
};

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
