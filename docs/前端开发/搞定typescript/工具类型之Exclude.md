> `Exclude<T, U>`
> 
> 用于从类型T与类型U进行对比，从T中取出独有的属性生成新的类型（与Exclude相反）
> 
> 当我们想要定义一个：原始联合类型与特定变量的交集时可以使用它

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

假设现有类型定义中定义了一个联合类型
```ts
type ExcludeType = '喵喵' | '汪汪' | '喵呜' | '咩咩'
const ExcludeCat: ExcludeType = '喵喵'
```

使用`Exclude`创建一个新的类型：
```ts
type ExcludeCatType = '喵喵'
let ExcludePet: Exclude<ExcludeCatType, ExcludeType> = '喵喵'
```
因为这两个类型定义U和T的差集不存在，所以它的值必不符号条件，此时编译时会抛出错误：`Type 'string' is not assignable to type 'never'.ts(2322)`

正确（~~不报错~~）的写法应该是：
```ts
type ExcludeCatType = '喵喵'
type ExcludePetsType = '汪汪'|'喵喵'
let ExcludeWildAnimals1: Exclude<ExcludeType, ExcludePetsType> = '咩咩' // 通过
let ExcludeWildAnimals2: Exclude<ExcludePetsType, ExcludeType> = '咩咩' // 反之则报错： Type 'string' is not assignable to type 'never'.ts(2322)
```