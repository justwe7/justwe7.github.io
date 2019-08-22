
<!-- 
1. mountComponent方法调用vm._update 根据vnode更新dom结构
2. vm._update调用vm._render 生成vnode -->

1. new Vue会根据传入的option参数，初始化props，data，methods，watch，生命周期等，主要是实例一个Observer来进行数据劫持，主要是递归data使用defineReactive的核心代码Definepropty来getter setter
2. compile会分析模板，将dom解析为AST，然后把不需要动态响应的打上静态的标记，然后使用render来将AST转为render function字符串。
3. renderfunction渲染读取vue的插值表达式或v-xxx所对应值会触发getter，将值与Observer所劫持的值进行绑定，进行依赖收集。因为触发了getter所以可以在defineReactive处创建一个闭包，实例订阅发布的对象，setter的时候通知更新，getter来接受更新，这一步可以成为watcher
4. 数据更新时通过发布订阅通知watcher进行更新，watcher会调用_update方法执行__patch__传入_render生成的VNode进行dom更新，内部实现了diff比对等