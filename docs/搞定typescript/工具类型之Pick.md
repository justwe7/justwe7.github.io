> `Pick<T, K>`(`Pick<T, K extends keyof T>`)
> 
> 用于从类型T中选择U中定义的属性，生成新的类型（跟Extract功能类似<它针对联合类型>，与Omit功能相反）
> 
> 当我们想要复用一个对象类型/接口中的某些属性时候可以使用它

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个联合类型
```ts
type PickType = {
  name: string
  age: number
  hair: string
}
const PickCat: PickType = {
  name: '喵喵',
  age: 2,
  hair: 'white'
}
```

这个时候需要创建一组新的数据，但是需要提取`name`和`age`这个两个字段的类型，可以使用Pick来实现：
```ts
const PickDog: Pick<PickType, "name"|"age"> = {
  name: "汪汪",
  age: 7
};
```

第二个参数不像`Omit`那样宽泛可以随便传，`Pick`只能传`T`中存在的属性，否则无法通过静态检查：
![image.png](https://s2.loli.net/2023/01/12/YeQB8yXdTME47ol.png)