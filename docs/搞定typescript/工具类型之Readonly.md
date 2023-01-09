> Readonly<T>
> 
> 顾名思义，表明类型或接口的定义是只读的

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设有一条数据我们不希望任何人更新，可以使用`const`定义，但如果是引用类型的数据就失~效~了~
```ts
type ReadonlyType = {
  name: string
  age: number
}
const ReadonlyCat: ReadonlyType = {
  name: '喵喵',
  age: 2
}
ReadonlyCat.age = 10
```

这个时候可以使用`Readonly<ReadonlyType>`进行类型约束：
```ts
const ReadonlyCat2: Readonly<ReadonlyType> = {
  name: '喵喵',
  age: 2
}
ReadonlyCat2.age = 10
```
这个时候就会抛出错误：`Cannot assign to 'age' because it is a read-only property.ts(2540)`


`Readonly`仅适用于接口或自定义类型，因此对`let`或者`var`定义的基本类型不生效，乖乖用`const`吧：
```ts
let catName: Readonly<string> = '喵喵'
catName = '汪汪' // 不会报错
```