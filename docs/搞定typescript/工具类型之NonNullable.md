> `NonNullable<T>`(`NonNullable<T extends null | undefined ? never : T>`)
> 
> 根据现有的联合类型剔除null、undefined，返回一个新的类型

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假如现有的联合类型可以满足新的变量类型约束，但是并不存在可选和null，可以使用它:
```ts
type TypeNonNullable = string | number | null | undefined
type TypeNoNulls = NonNullable<TypeNonNullable> // 排除null和undefined，只剩下string | number
```
