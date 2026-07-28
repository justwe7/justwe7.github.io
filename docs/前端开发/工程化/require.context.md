```js
const requirePlugin = require.context('./pages/', false, /\.(t|j)s$/);
requirePlugin.keys().forEach(requirePlugin);
```
上面代码中，require.context有三个参数：
- 第一个参数：指定要搜索的目录。
- 第三个参数：指定要加载的文件的扩展名。

require.context方法会生成一个上下文对象，该对象的keys方法会返回一个数组，包含所有匹配的文件名。
然后，遍历这个数组，使用require方法加载每个文件。

这种写法的好处是，可以在不修改代码的情况下，引入新的文件。比如，新增一个a.js文件，require.context会自动将这个文件加入到数组中。