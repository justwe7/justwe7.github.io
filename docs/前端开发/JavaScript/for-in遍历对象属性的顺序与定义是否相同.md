### 定义一个对象进行测试
```js
var num = -1
var o = {
  '1': 1,
  'b': 'b',
  '3': 3,
  '0': 0,
  [num]: '-1',
  false: false,
  'a': 'a',
  'aa': 'aa',
  '哈哈': 'hh',
  '2': 2,
  '22': 22,
  '21': 21,
  '02': 2,
  '01': 1
}
// forin遍历
for (var key in o) {
  console.log(key)
}

/* 预想结果 */
// 1
// b
// 3
// 0
// -1
// false
// a
// aa
// 哈哈
// 2
// 22
// 21
// 02
// 01


/* 实际输出 */
// 1
// 2
// 3
// 21
// 22
// b
// -1
// false
// a
// aa
// 哈哈
// 02
// 01
```

诶...好像有点不一样😄，顺序好像也不是完全按照asc码来重排的  


### 查阅标准

根据 ECMA-262（ECMAScript）第三版中描述，for-in 语句的属性遍历的顺序是*由对象定义时属性的书写顺序决定的*。   
> 关于 ECMA-262（ECMAScript）第三版中 for-in 语句的更多信息，请参考 [ECMA-262 3rd Edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) 中 12.6.4 The for-in Statement。  


在ES5 ECMA-262（ECMAScript）第五版规范中，对 for-in 语句的遍历机制又做了调整，*属性遍历的顺序是没有被规定的*。    
> 关于 ECMA-262（ECMAScript）第五版中 for-in 语句的更多信息，请参考 [ECMA-262 5rd Edition](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf) 中 12.6.4 The for-in Statement。    

ES5+中的属性遍历顺序说明与早期版本不同，这将导致遵循 ECMA-262 第三版规范内容实现的 JavaScript 解析引擎在处理 for-in 语句时，与遵循第五版规范实现的解析引擎，对属性的遍历顺序存在不一致的问题。       
> Chrome Opera 的 JavaScript 解析引擎遵循的是新版 ECMA-262 第五版规范。因此，使用 for-in 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6 IE7 IE8 Firefox Safari 的 JavaScript 解析引擎遵循的是较老的 ECMA-262 第三版规范，属性遍历顺序由属性构建的顺序决定。


**Chrome/Opera 中使用 for-in 语句遍历对象的属性时，遍历出的属性顺序与对象定义时不同**    

1. 先提取所有 key 的 parseFloat 值为非负整数的属性(0开头的好像当作字符串处理了)
2. 根据数字顺序对属性排序首先遍历出来
3. 按照对象定义的顺序遍历余下的所有属性
   
其它浏览器则完全按照对象定义的顺序遍历属性  


### 解决方案

1. 使用数组进行排序
2. 转为es6的 Map结构