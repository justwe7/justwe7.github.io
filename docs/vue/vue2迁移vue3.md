>  为方便自己查阅，阅读官方文档摘录API变更(setup)而做的总结，官方有详细的升级迁移[指南](https://v3-migration.vuejs.org/zh/breaking-changes/)

## 基础变更

### 响应式

`ref`和`reactive`都可以完成响应式渲染，但后者返回的对象在解构之后将脱离与声明对象的响应式连接

#### reactive

使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组：

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

`reactive()` API 有两条限制：

1. 仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。
2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：

```js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```

同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性：

```vue
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })
    function increment() {
      state.count++ // 响应式已经丢失，视图不更新
    }
    return {
      ...state,
      increment
    }
  }
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

可以通过`toRefs`进行包裹解决：

> `toRefs`，它可以将一个*响应型对象(reactive object)* 转化为*普通对象(plain object)*，同时又把该对象中的每一个属性转化成对应的*响应式属性(ref)*。说白了就是放弃该*对象(Object)*本身的*响应式特性(reactivity)*，转而给对象里的属性赋予*响应式特性(reactivity)*

```vue
<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })
    const stateRefs = toRefs(state)
    function increment() {
      state.count++ // 响应式已经丢失，视图不更新
    }
    return {
      ...state,
      increment
    }
  }
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

#### ref

`reactive()` 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。为此，Vue 提供了一个 [`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用任何值类型的响应式 **ref**

`ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象：

> 当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 `.value`

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- 无需 .value -->
  </button>
</template>
```

与reactive不同，一个包含对象类型值的 ref 可以响应式地替换整个对象，解构也不会丢失属性：

```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }

const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

### 计算属性

> ```
> `computed()` 方法期望接收一个 getter 函数，返回值为一个`计算属性 ref`。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value
> ```

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

运行 `fullName.value = 'John Doe'` 时，setter 会被调用而 `firstName` 和 `lastName` 会随之更新

### 侦听器

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

按2.0的写法，观察对象的属性值 'obj.a' 的写法应该写成一个返回该属性的 getter 函数：

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

// 正确，提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

**立即执行的watch: `watchEffect()`**

`watch()` 是懒执行的：仅当数据源变化时，才会执行回调。`watchEffect()` 会立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// 立即获取
fetchData()
// ...再侦听 url 变化
watch(url, fetchData)

/**** 可以重写为 ****/
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

这个例子中，回调会立即执行。在执行期间，它会自动追踪 `url.value` 作为依赖（和计算属性的行为类似）。每当 `url.value` 变化时，回调会再次执行。

**回调的触发时机**

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

// 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

watch会返回一个方法，用于停止监听。侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()

/**** 应避免异步创建，而使用条件判断的方式进行监听： ****/
// 需要异步请求得到的数据
const data = ref(null)
watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```



## 组件

### 模板引用

通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref 进行访问：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

也可以通过`getCurrentInstance`访问的代理对象进行访问：

```vue
<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  proxy.$refs.input.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

多个ref，当在 `v-for` 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露。如果一个子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权

即：组件内部的变量需要 `defineExpose` 显式暴露父组件才能访问：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

### props传参

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props：

```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>

<template>
  <h4>{{ foo }}</h4>
</template>
```

在没有使用 `<script setup>` 的组件中，prop 可以使用 [`props`](https://cn.vuejs.org/api/options-state.html#props) 选项来声明：

```vue
<script>
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}
</script>
```

其余，仍旧可以按option的写法，按对象的形式接收参数、定义类型

可以使用`v-bind`传入对象实现一次向子组件传入多个属性：

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
<BlogPost v-bind="post" />
// 等价于
<BlogPost :id="post.id" :title="post.title" />
```

### 事件

组件要触发的事件可以显式地通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明：

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>

<template>
  <button @click="$emit('increaseBy', 1)">
    模板内的事件不需要使用defineEmits来定义
  </button>
</template>
```

`defineEmits()` 宏**不能**在子函数中使用。如上所示，它必须直接放置在 `<script setup>` 的顶级作用域下。

如果你显式地使用了 `setup` 函数而不是 `<script setup>`，则事件需要通过 [`emits`](https://cn.vuejs.org/api/options-state.html#emits) 选项来定义，`emit` 函数也被暴露在 `setup()` 的上下文对象上：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

### 自定义v-model

之前默认的`value`变更为`modelValue`，$emit触发由`input`变更为`update:modelValue`

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<CustomInput v-model="searchText" />
```

也可以使用computed来实现一个`v-model`:

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。我们可以通过给 `v-model` 指定一个参数来更改这些名字以及同时指定多个：

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<!-- UserName.vue -->
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

现在还可以自定义修饰符，对于又有参数又有修饰符的 `v-model` 绑定，生成的 prop 名将是 `arg + "Modifiers"`。举例来说：

```vue
<MyComponent v-model:title.capitalize="myText">

// 相应的声明应该是：
<script setup>
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
</script>
```

实例：

有了 `modelModifiers` 这个 prop，我们就可以在原生事件侦听函数中检查它的值，然后决定触发的自定义事件中要向父组件传递什么值。在下面的代码里，我们就是在每次 `<input>` 元素触发 `input` 事件时将值的首字母大写：

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

### 父子组件 Attributes 透传

一般情况下，父组件传给子组件的class，子组件会将其继承并渲染在根节点上：

```vue
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>

<!-- 渲染后的结果 -->
<button class="btn large">click me</button>
```

同2.0一样，传入的属性同样可以通过 `$attrs`读取：

```vue
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>

<main v-bind="$attrs">...</main>
```

如果没有使用 `<script setup>`，`attrs` 会作为 `setup()` 上下文对象的一个属性暴露：

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

**禁止继承**

如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明:

```js
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

**多个根节点继承**

因为vue3不强制指定根节点标签的唯一性，所以传入属性继承的节点不明确，所以需要指定，否则会出现警告：

```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

> 需要注意的是，虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用。

### 插槽

具名插槽改动，由`slot='xx'`变更为`#xx`:

```vue
<BaseLayout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</BaseLayout>
```

### provide/inject

vue3默认就可以传入响应式数据了：

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location', '这是默认值') // 如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和 props 类似
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

如果注入方的数据不想被更改：

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

## 逻辑复用

### 自定义指令

保留了2.0的指令注册方式。在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令:

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

## 原型链属性

> vue3删除了过滤器，所以也可以通过这种方式来“曲线救国”

在vue2中可以通过原型链挂载的方式直接挂载并访问全局变量：

```js
Vue.prototype.$http = () => {}
this.$http()
```

在vue3中可以通过`globalProperties`及`getCurrentInstance`定义及访问:

```js
app.config.globalProperties.$http = 'hello'

import { getCurrentInstance } form 'vue'
const { proxy } = getCurrentInstance()
proxy.$http()
```

