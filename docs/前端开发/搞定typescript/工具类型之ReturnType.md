> `ReturnType<Type>`
> 
> 获取函数的返回输出，并基于它构造一个类型
> 
> 在需要复用另一个函数返回值类型情况下非常有用。这样可以创建一个新的自定义类型，接收函数的输出约束到该类型

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

在代码中已有一个工具方法返回了固定类型的数据，假如现在想要复用这个方法返回数据的类型定义，比如在`useState`中可以使用`ReturnType`结合`typeof`实现:
```ts
function getCatInfo(name: string) {
  return {
      name,
      age: 2
  }
}

const [ReturnTypeDog] = useState<ReturnType<typeof getCatInfo>|null>(null)
```

`ReturnType`还可以拿来帮我们去推断一些现有的数据是什么样的类型，比如定时器：
```ts
// let timer: number // 我们知道定时器返回值是数字，但是赋值的时候类型检查器不通过！
let timer: ReturnType<typeof setInterval>
clearInterval(timer);
timer = setInterval(() => {
  /*  */
}, 5000);

```

> 在Node.js中，可能会遇到这样的错误："Type 'Timer' is not assignable to type 'number'"。这是因为在Node.js中setTimeout()返回的是一个Timer对象而不是一个数字类型的id。为了解决这个问题，可以使用Timer、类型推断作为返回类型，或者也可以使用window.setTimeout()代替setTimeout()，因为window.setTimeout()会返回数字类型的id

