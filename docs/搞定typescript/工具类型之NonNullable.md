> `Parameters<TArea>`
> 
> 获取函数的形参参数类型，并基于它构造一个类型（与ReturnType类似）
> 
> 在我们知道函数的接收的形参符合某种类型想要复用时非常有用

[示例代码](https://codesandbox.io/s/tsgong-ju-lei-xing-pc65yr?file=/src/index.tsx)

`Parameters`返回的参数为数组类型
```ts
function logCatInfo(name: string, age: number) {
  console.log({ name, age })
}
function logDogInfo({ name = '', age = 0 }) {
  console.log({ name, age })
}
type ParametersType = Parameters<typeof logCatInfo>; // [string, number]
type ParametersType2 = Parameters<typeof logDogInfo>[0]; // [{ name: string|undefined, age: number|undefined }]
const ParametersCat:ParametersType = ['喵喵', 6]
const ParametersDog:ParametersType2 = { name: '汪汪', age: 1 }
```
