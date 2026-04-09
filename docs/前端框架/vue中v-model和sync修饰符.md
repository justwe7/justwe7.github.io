> 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。如子组件可以关闭一个confirm窗口，父组件也可以关闭，数据源应该使用同一个字段，即：数据双向绑定

上述问题的两种解决方式有：  
1. 传入对象，子组件通过对象引用修改对象key的值，触发父级数据的更新
2. 比较合理的是使用\$emit，父组件\$on来监听更改并更新数据

`v-model`和`.sync`都是类似基于第二种方法实现的语法糖。   
个人认为两者在解决问题的结果上没有太大区别，目的都是实现父子组件数据的双向绑定，本质都是语法糖。只不过sync写起来灵活一点

<a href="https://codepen.io/justwe7/pen/ymXzGK" target="_blank">效果在线预览地址</a>  

### v-model
组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件来实现

```js
Vue.component("x-vmodel", {
  props: ['value'],// v-model 接收的值默认以value定义
  template: `
  <div>
      <button @click="$emit('input', '按钮触发dei')">按钮触发v-model</button>---
      <input :value="value" @input="$emit('input', $event.target.value)" >---
      值变化:{{value}}
  </div>
  `
})

//parent
<x-vmodel v-model="mval" />
```

但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：

```js
Vue.component("x-vmodel2", {
  model: {
    prop: 'myval',//接收v-model对应的value
    event: 'abc'//触发父组件数值更新的事件 可以自定义
  },
  props: ['myval', 'mval2'],
  template: `
  <div>
      <button @click="$emit('abc', '按钮触发dei')">{{mval2}}</button>---
      <input :value="myval" @input="$emit('abc', $event.target.value)" >---
      值变化:{{myval}}
  </div>
  `
})

//parent
<x-vmodel2 v-model="mval" mval2="可以修改事件类型" />
```


### sync
使用\$emit来触发`update:myPropName`事件，使用update语义化比较明显，与业务代码可以区分。   
`.sync`就是这种模式的缩写

```js
Vue.component("x-sync", {
  props: ['sval'],
  methods: {
    hanldeInput(e) {
      this.$emit("update:sval", '按钮触发的')
    }
  },
  template: `
    <div>
      <button @click="hanldeInput">我也能按钮触发</button>---
      <input :value="sval" @input="$emit('update:sval', $event.target.value)" />---
      值变化:{{sval}}
    </div>
  `
})

//经典写法 $emit方式来更新数据
<x-sync :sval="sval" @update:sval="childVal => sval = childVal" />

//sync修饰符 简写
<x-sync :sval.sync="sval" />
```