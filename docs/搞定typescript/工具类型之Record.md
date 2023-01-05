
假设需要定义一个对象，需要对其value进行约束，比如这样:
```ts
const obj = {
  'cat': { 'name': '喵喵', 'age': 2 },
  'dog': { 'name': '汪汪', 'age': 6 },
  'duck': { 'name': '嘎嘎', 'age': 1 },
}
```

数据可能是写死的，前端最终会拿到页面中渲染，所以在数据编写的时候期望可以进行一下约束：

key是一个字符串，而value是包含`name`和`age`属性的对象，所以可以定义出基本类型：
```ts
type Info = {
  name: string
  age: number
}
```
但是obj对象是一个不确定长度的对象，总不能每次都使用`as`显式制定`value`的类型吧

这个时候可以使用 `Record<K, T>` 对`value`进行类型定义：
```ts
const obj:Record<string, Info> = {
  'cat': { 'name': '喵喵', 'age': 2 },
  'dog': { 'name': '汪汪', 'age': 6 },
  'duck': { 'name': '嘎嘎', 'age': 1 },
}
```
这个时候实现了最初的需求，约定值的类型定义，但是使用起来又发现一个问题:

如果我在编辑器输入`obj.`的时候能帮我提示出现在有的属性就好了~

接下来我们对`key`进行一下约束：

```ts
type Animals = 'cat' | 'dog' | 'duck' | 'tiger'
const obj:Record<Animals, Info> = {
  'cat': { 'name': '喵喵', 'age': 2 },
  'dog': { 'name': '汪汪', 'age': 6 },
  'duck': { 'name': '嘎嘎', 'age': 1 },
  'tiger': { 'name': '喵呜', 'age': 7 },
}
```

这个时候编辑器输入`obj.`的时候可以帮我们推断出可能会出现的`key`，回车后再来一个`.`，就会帮我们联想出`value`的两个属性了:

![20230105_223556.gif](https://s2.loli.net/2023/01/05/3tWmCNErbUJMnkS.gif)
