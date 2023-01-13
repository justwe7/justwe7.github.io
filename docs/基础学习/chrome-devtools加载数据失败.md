---
title: chrome控制台network查不到记录问题
lang: zh-CN
---
## chromium 控制台 network 的 response 为 `failed to load response data`
经常有疑问，假如一个ajax接口发生请求后，立即发生页面跳转（要记得勾选preserve log，不然连个request都没），然后控制台的响应没有任何数据，只有几个空荡荡的单词:  
![image.png](https://image.littl.cn/images/2021/01/18/image.png)

搜了搜百度，一堆复制粘贴没营养的答案：勾选preserve log，完全是两码事好嘛

### 解决方式（一）
最简单粗暴的方式，换个浏览器，使用 chromium 的浏览器，包括新edge都是不能正常抓到数据的。可以试试 Firefox，甚至 IE 😒，亲测有效！

### 解决方式（二）
个人感觉是因为接口响应之后立即发生了页面跳转（很快啊😎），导致看不到response的内容，可以通过打断点的方式（让页面跳转的代码执行的慢一点，给控制台响应的时间）：  
![image72437.png](https://image.littl.cn/images/2021/01/18/image72437.png)

怎么断点就不细说了，之前总结过一篇[攻略chrome控制台](https://justwe7.github.io/blog/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/%E6%94%BB%E7%95%A5chrome%E6%8E%A7%E5%88%B6%E5%8F%B0.html#%E6%96%AD%E7%82%B9%E7%9A%84%E9%9D%A2%E6%9D%BF)

**大概操作就是**：  
1. `event listener breakpoints` > `XHR` > 勾选`readystatechange` > 重新操作
2. 然后找到关键代码，熟悉原生ajax对象的应该知道，不管jQuery还是axios（fetch除外），底层肯定会监听一个 `onreadystatechange` 的方法，之后就简单了，依次断点可以看到内容的： ![image893b2.png](https://image.littl.cn/images/2021/01/18/image893b2.png)
3. 控制台也会有，上一步在断点的时候也能知道接口的状态

