> Extract<T, U> - 用于从类型T中取出可分配给U类型的成员
> 
> 尝试寻找T类型成员和U类型成员的交集，并将其作为新类型返回（与Exclude相反）
> 
> 当我们想要定义一个：原始联合类型与特定变量的交集时可以使用它

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个联合类型
```ts
type ExtractType = '喵喵' | '汪汪' | '喵呜' | '咩咩'
const ExtractCat: ExtractType = '喵喵'
```

使用`Extract`创建一个新的类型：
```ts
type ExtractCatType = '喵喵'
let ExtractPet: Extract<ExtractCatType, '喵呜'> = '喵喵'
```
因为这两个类型定义不会出现交集，所以它的值必不符号条件，此时编译时会抛出错误：`Type 'string' is not assignable to type 'never'.ts(2322)`

![image.png](https://s2.loli.net/2023/01/09/QIgN6iXwDfMFJ5q.png)

正确（~~不报错~~）的写法应该是：
```ts
type ExtractCatType = '喵喵'
type ExtractPetsType = '汪汪'|'喵喵'
let ExtractPet2: Extract<ExtractCatType, ExtractPetsType> = '喵喵' // 通过
let ExtractPet3: Extract<ExtractCatType|'喵呜', ExtractPetsType> = '咩咩' // Type '"咩咩"' is not assignable to type '"喵喵"'.ts(2322)
```