> `Omit<T, U>`
> 
> 用于从类型T中剔除U中定义的属性，生成新的类型（跟Exclude功能类似<它针对联合类型>，与Pick功能相反）
> 
> 当我们想要复用一个对象类型/接口中的某些属性时候可以使用它

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个对象类型
```ts
type OmitType = {
  name: string
  age: number
  hair: string
}
const OmitCat: OmitType = {
  name: '喵喵',
  age: 2,
  hair: 'white'
}
```

这个时候需要创建一组新的数据，但是不需要`hair`这个字段，（这题我会~）然后写了一个`Exclude<OmitType, 'hair'>`，然后发现报错了。
> **Exclude是从联合类型里面排除某一个或几个**
> 
> Omit是从对象类型里面排除某一个或几个属性

所以应该使用Omit来实现：
```ts
const OmitDog: Omit<OmitType, "hair"> = {
  name: "汪汪",
  age: 7
};
```
