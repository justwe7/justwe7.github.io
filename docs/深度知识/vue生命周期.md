- [Vue生命周期](#vue%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)
- [Vue的声明周期各阶段](#vue%e7%9a%84%e5%a3%b0%e6%98%8e%e5%91%a8%e6%9c%9f%e5%90%84%e9%98%b6%e6%ae%b5)
- [从源码来看](#%e4%bb%8e%e6%ba%90%e7%a0%81%e6%9d%a5%e7%9c%8b)
- [根据vue周期总结什么时候做什么](#%e6%a0%b9%e6%8d%aevue%e5%91%a8%e6%9c%9f%e6%80%bb%e7%bb%93%e4%bb%80%e4%b9%88%e6%97%b6%e5%80%99%e5%81%9a%e4%bb%80%e4%b9%88)
- [总结](#%e6%80%bb%e7%bb%93)

### Vue生命周期  

fork了一个仓库有时间缕一缕加点注释[地址](https://github.com/justwe7/vue)  

图片来源于网络
![生命周期](../static/vue-lifecycle.png)  


### Vue的声明周期各阶段
- beforeCreated，创建前，在数据观测和初始化事件还未开始
- created，创建后，完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
- beforeMounted,载入前，在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下配置：编译模板，把data里面的数据和模板生成html，注意此时还没挂载到html页面上。
- mounted，载入后，在el被新创建的vm.$el替换，并挂载到实例上去之后调用。实例已完成如下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
- beforeUpdate，更新前，在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步更改状态，不会触发附加的冲渲染过程。
- uodated，更新后，在由于数据更改导致的虚拟dom重新渲染和打补丁之后调用。调用时，组件dom已经更新，所以可以执行依赖于dom的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用
- beforeDestroy，销毁前，在实例销毁之前调用。实例仍然完全可用。
- destroyed，销毁后，在实例销毁之后调用。调用后，所有的事件监听器会被移除掉，所有的子实例也会被销毁。


### 从源码来看
（一）new Vue之前，首先会初始化定义Vue构造函数的方法及属性
```js
initMixin(Vue)//初始化vue组件上一些如data created methods watch等 触发生命周期钩子函数：beforeCreate created
stateMixin(Vue)//定义$data $props $set $delete $watch
eventsMixin(Vue)//$on $emit $off $once
lifecycleMixin(Vue)//定义更新 _update $forceUpdate $destory  触发生命周期钩子函数： 'beforeDestroy' , 'destroyed' , 'beforeMount' , 'beforeUpdate' ,'mounted', 'activated' , 'deactivated'
renderMixin(Vue)//render函数 slot createElement调用
```

（二）new Vue(opt)
1. 在Vue构造函数之内会执行this._init
this._init主要执行了如下方法:
```js
initLifecycle(vm)//justwe   设置$parent/$root/$refs/$children等关系值
initEvents(vm)//vm._events updateComponents  监听事件
initRender(vm)//vm._c vm.$createElement  初始化插槽 createElement方法声明
callHook(vm, 'beforeCreate')// 生命周期通知
initInjections(vm) // resolve injections before data/props  justwe resolveInject  defineReactive 注入数据依赖
initState(vm)// initProps 初始化Methods data computed watch 
initProvide(vm) // resolve provide after data/props   vm._provided 为后代提供数据
callHook(vm, 'created')//生命周期
```
最终会调用 `vm.$mount(vm.$options.el)` 挂载组件   
2. $mount根据el将template转为render字符串方法，然后挂载到options属性下面(web平台会多一步操作)
```js
  const mount = Vue.prototype.$mount//A
  Vue.prototype.$mount = function (){
    code...//B
    return mount.call(this, el, hydrating)
  }
```
**B代码块会转换template为render字符串:**    
![vue-render2](../static/vue-render2.png)
![vue-render1](../static/vue-render1.png)   

1. \$mount会执行之前的 `Vue.prototype.$mount`方法，真实执行的是mountComponent方法，把当前的vm实例传入
mountComponent
- 开始触发钩子 beforeMount
- 定义updateComponent方法 最终调用update方法通过VNode生成真实dom，更新界面
- 创建watcher并将updateComponent方法传入，根据之前getter/setter管理通知watcher响应视图
```js
  /* 
  vm.$vnode 如果为 null，则表明这不是一次组件的初始化过程，而是我们通过外部 new Vue 初始化过程。那么对于组件，它的 mounted 时机在哪儿呢？ 
  组件的 VNode patch 到 DOM 后，会执行 invokeInsertHook 函数，把 insertedVnodeQueue 里保存的钩子函数依次执行一遍，它的定义在 src/core/vdom/patch.js
  */
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
```

### 根据vue周期总结什么时候做什么
- 在 `beforeCreate` 钩子函数调用的时候，是获取不到 `props` 或者 `data` 中的数据的，因为这些数据的初始化都在 initState
- 然后会执行 created 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。
- 接下来会先执行 beforeMount 钩子函数，开始创建 VDOM，最后执行 mounted 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
  
> 另外还有 keep-alive 独有的生命周期，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

- 最后就是销毁组件的钩子函数 beforeDestroy 和 destroyed。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 destroyed 钩子函数。


### 总结

1. new Vue会根据传入的option参数，初始化props，data，methods，watch，生命周期等，主要是实例一个Observer来进行数据劫持，主要是递归data使用defineReactive的核心代码Definepropty来getter setter
2. compile会分析模板，将dom解析为AST，然后把不需要动态响应的打上静态的标记，然后使用render来将AST转为render function字符串。
3. renderfunction渲染读取vue的插值表达式或v-xxx所对应值会触发getter，将值与Observer所劫持的值进行绑定，进行依赖收集。因为触发了getter所以可以在defineReactive处创建一个闭包，实例订阅发布的对象，setter的时候通知更新，getter来接受更新，这一步可以成为watcher
4. 数据更新时通过发布订阅通知watcher进行更新，watcher会调用_update方法执行__patch__传入_render生成的VNode进行dom更新，内部实现了diff比对等
