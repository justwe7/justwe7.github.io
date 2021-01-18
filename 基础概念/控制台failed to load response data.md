## chromium 控制台 network 的 response 为 `failed to load response data`
经常有疑问，假如一个ajax接口发生请求后，立即发生页面跳转（要记得勾选preserve log，不然连个request都没），然后控制台的响应没有任何数据，只有几个空荡荡的单词:  
![image.png](https://img.lihx.top/images/2021/01/18/image.png)

搜了搜百度，一堆复制粘贴没营养的答案：勾选preserve log，完全是两码事好嘛

### 解决方式（一）
最简单粗暴的方式，换个浏览器，使用 chromium 的浏览器，包括新edge都是不能正常抓到数据的。可以试试 Firefox，甚至 IE 😒，亲测有效！

### 解决方式（二）
个人感觉是因为接口响应之后立即发生了页面跳转（很快啊😎），导致看不到response的内容，可以通过打断点的方式（让页面跳转的代码执行的慢一点，给控制台响应的时间）：  
![image72437.png](https://img.lihx.top/images/2021/01/18/image72437.png)

怎么断点就不细说了，可以看之前总结的一篇chrome控制台的文章https://justwe7.github.io/blog/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/%E6%94%BB%E7%95%A5chrome%E6%8E%A7%E5%88%B6%E5%8F%B0.html#%E6%96%AD%E7%82%B9%E7%9A%84%E9%9D%A2%E6%9D%BF

大概就是：`event listener breakpoints` > `XHR` > 勾选`readystatechange` > 重新操作
