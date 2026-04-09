> `Partial<T>`
> 
> 将类型中的所有属性设置为可选（与Required相反）

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个完整的type，但是其他代码想要复用这个类型，但是`age`属性是可选的
```ts
type PartialType = {
  name: string
  age: number
}
const PartialCat: PartialType = {
  name: '喵喵',
  age: 2
}
```

这个时候最常规的方式是将其类型定义改为`age?： number`，但是如果这个类型定义是在`ant design`中定义的怎么办？

可以使用`Partial`将类型定义全部设置为可选：
```ts
const PartialDog: Partial<PartialType> = {
  name: '汪汪'
}
```

其实`Partial<PartialType>`等同于：
```ts
type PartialType = {
  name?: string
  age?: number
}
```

![image.png](https://s2.loli.net/2023/01/09/h5QCWaHAPyL9qfb.png)