> Required<T>
> 
> 将类型中的所有属性设置为必选（与Partial相反）

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个宽松的type，但是其他代码想要复用这个类型，但是需要所有属性都需要必选
```ts
type RequiredType = {
  name?: string
  age?: number
}
const RequiredCat: RequiredType = {
  age: 2
}
const RequiredDog: RequiredType = {
  name: '汪汪'
}
```

这个时候改类型定义肯定不合适，可能会影响旧代码，这个时候可以使用`Required`将类型定义全部设置为必选：
```ts
const RequiredTiger: Required<RequiredType> = {
  name: '喵呜'
}
```
此时编译时会抛出错误：`Property 'age' is missing in type '{ name: string; }' but required in type 'Required<RequiredType>'.ts(2741)`

![image.png](https://s2.loli.net/2023/01/09/zj7ius2wOqMRltD.png)

其实`Required<RequiredType>`等同于：
```ts
type RequiredType = {
  name: string
  age: number
}
```
