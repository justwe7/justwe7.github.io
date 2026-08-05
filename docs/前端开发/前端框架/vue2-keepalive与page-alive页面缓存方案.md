H5 页面从列表页跳到详情页，再点返回，理想情况下应该是"秒回"——滚动位置、已经拉取好的数据、已经填写的表单都还在，不需要重新请求接口、重新走一遍生命周期。但 Vue 2 默认行为是：路由一变，旧组件销毁，新组件创建，返回上一页时旧组件又是重新创建一遍。`keep-alive` 是官方给的解法，但它是按"组件身份"缓存的，遇到 H5 里"同一个路由组件因为参数不同要看成不同页面""要区分是前进还是后退"这类场景就不太够用了。这也是很多 SSR H5 项目会在 `keep-alive` 之上再包一层页面级缓存方案的原因，`page-alive` 就是这样一个内部插件。本文先讲清楚 `keep-alive` 的原生实现，再看 `page-alive` 在此基础上做了什么、以及它和 SSR 是怎么配合的。

## 一、keep-alive 原生实现原理

`keep-alive` 本身不渲染任何 DOM 节点，它是一个 `abstract: true` 的抽象组件——只在组件树里占位，patch 阶段不会生成对应的真实节点，也不会作为 `$parent` 出现在业务逻辑里。

核心逻辑在它的 `render` 函数里：

1. 拿到 `this.$slots.default[0]`，也就是被包裹的那个组件的 vnode（典型场景是 `<component :is="...">` 或 `<router-view>` 渲染出来的）。
2. 用 `cid + '::' + tag`（或者 vnode 自带的 `key`）算出一个缓存 key，去内部的 `cache` 对象里查有没有缓存过。
   - **命中缓存**：把 `vnode.componentInstance` 直接指向缓存里的旧实例，不会重新创建组件。
   - **没命中**：正常走创建流程，创建完成后把 vnode 存进 `cache`，并给它打上 `vnode.data.keepAlive = true`。
3. 用 `keys` 数组维护访问顺序，配合 `max` 属性做 LRU 淘汰——超过数量限制就销毁最久未使用的实例。

真正"不销毁 DOM、不重新渲染"的行为，其实不是 `keep-alive` 组件自己实现的，而是它打在 vnode 上的 `data.keepAlive = true` 标记被 Vue 核心的 patch 算法识别之后，走的是 `activateChildComponent` / `deactivateChildComponent`，而不是完整的 `$mount` / `$destroy`：组件实例、它持有的响应式数据、已经渲染好的 DOM 片段全部留在内存里，只是被搬出/搬回真实 DOM 树，对应触发的是 `activated` / `deactivated` 钩子，而不是 `created` / `beforeDestroy`。

## 二、keep-alive 在 H5 场景下的局限

`keep-alive` 的缓存 key 是"组件身份"（`cid + tag`），这决定了它天然适合"在固定几个组件间来回切换"的场景，比如 tab 页。但放到 H5 的路由导航场景里，会遇到两个问题：

- **不感知路由参数**：同一个路由组件因为动态参数不同渲染出不同页面内容时（比如 `/page/1` → `/page/2`），`keep-alive` 默认识别不出这是"两个不同页面"，需要业务自己在 `router-view` 上加 `:key="$route.fullPath"` 强制区分——但这样一来又会导致每次参数变化都重新创建，缓存直接失效，两者互相打架。
- **不感知浏览器前进/后退**：`keep-alive` 只知道"要不要复用这个组件"，不知道用户是点了返回按钮回到了上一条历史记录，还是正常往前跳转到了一个新页面。而 H5 里"返回要保留现场，前进/跳转新页面要看情况决定是否清缓存"是很常见的需求，原生机制处理不了。

## 三、page-alive：基于浏览历史的页面级缓存

`page-alive` 的思路不是重新发明缓存机制，而是**复用 Vue 核心那套 `vnode.data.keepAlive` 的 DOM 复用能力**，把缓存的 key 策略从"组件身份"换成了"浏览器历史记录条目"：

- 每次进入页面，先检查 `history.state[keyName]` 有没有值，没有就用随机生成的 key 写进去（通过 `history.replaceState`）。这个 key 绑定的是**这一条浏览器历史记录**，不是某个组件实例，所以不管路由参数怎么变、是不是同一个组件类，只要用户点了返回、回到了这条历史记录，就一定能命中正确的缓存槽位——这正是原生 `keep-alive` 做不到的。
- 插件劫持了 `router.afterEach`，把每次跳转的 `to/from` 记录下来，据此区分两种跳转，采取不同的缓存策略：

| 跳转类型 | 判断依据 | 缓存策略 |
|---|---|---|
| 同级父路由下切换子路由（如 tab 切换） | `from` 和 `to` 在父级 `matched` 相同，但最后一级不同 | 复用上一个 key 对应的缓存，避免 tab 来回切换时反复创建销毁 |
| 正常前进跳转 / 带参数跳转 | 其余情况 | 生成新 key，若缓存中存在相同 tag 的旧 vnode，则直接接管其 `componentInstance`（滚动位置、表单内容、已拉取数据原样保留）；否则清理失效缓存后新建 |

- 当某个缓存 key 已经不在当前有效的路由历史里（比如用户跳转到新页面、原本的前进分支被放弃），插件会主动 `$destroy` 掉对应实例，防止内存里一直攒着用不到的组件。
- 支持在路由 `meta` 上配置 `disableCache`，让个别页面（比如支付结果页）显式关闭缓存，强制每次都全新渲染。

可以看到，`page-alive` 并没有绕开 Vue 的底层复用机制，它只是给 `keep-alive` 依赖的"缓存 key 怎么算"这一步换了一套更贴合 H5 导航语义的算法，其余的 DOM 复用、生命周期切换，仍然是 Vue 核心在做。

## 四、和 SSR 的配合：只在客户端启用

`page-alive` 真正体现"SSR 优化"的地方，其实是它**只在客户端安装**这个设计决定。服务端渲染时，`App.vue` 的 `render` 函数会直接渲染 `router-view`，完全不经过 `page-alive`；只有客户端渲染分支才会把 `router-view` 包进 `page-alive`：

```js
render (createElement) {
  const isServer = process.env.VUE_ENV === 'server'
  if (isServer) {
    return createElement('div', { attrs: { id: 'app' } }, [
      createElement('router-view')
    ])
  } else {
    return createElement('div', { attrs: { id: 'app' } }, [
      createElement('page-alive', [createElement('router-view')])
    ])
  }
}
```

插件的安装代码同样有 `isServer` 判断：

```js
if (!isServer) {
  Vue.use(pageAlive, { router })
}
```

这样做对应两层考虑：

1. **正确性**：Node SSR 是一个进程处理多个用户的并发请求，`page-alive` 内部的缓存对象、用来记录浏览历史的模块级数组都是有状态的。如果服务端也启用它，不同用户的并发请求会共享同一份模块状态，等于把 A 用户的浏览记录/缓存串到了 B 用户的渲染结果里——这是 SSR 场景下必须避免的"跨请求状态污染"。把整个插件限制在客户端安装，是保证 SSR 无状态、每次请求独立渲染的前提。
2. **性能与体验**：这套组合本质上是"首屏 SSR + 后续导航走 SPA 缓存"的混合模式。首屏由服务端吐出完整 HTML，保证首屏速度和 SEO；hydration 完成之后，用户在 H5 内的跳转全部走纯客户端路由，`page-alive` 让"返回上一页"不需要重新请求接口、不需要重新渲染，而是直接复用内存里已经存在的实例和 DOM。对微信内 H5 这种场景来说，这避免了每次前进后退都重新打一次接口、重新走一遍 `created`/`mounted`，页面切换的观感更接近原生 App，而不是每次都要等一次服务端渲染。

## 五、总结

| 维度 | 原生 keep-alive | page-alive |
|---|---|---|
| 缓存 key | 组件身份（`cid + tag`） | 浏览器历史记录条目 |
| 淘汰策略 | `max` 数量限制的 LRU | 历史分支失效时主动清理 |
| 前进/后退感知 | 无 | 通过 `router.afterEach` + history state 判断 |
| 典型场景 | 固定组件间切换（tab） | H5 路由级页面缓存 |
| SSR 场景下是否启用 | 视具体项目而定 | 明确只在客户端启用，避免跨请求状态污染 |

如果只是要在几个固定组件之间切换保留状态，原生 `keep-alive` 已经够用，不必引入额外复杂度。但如果是 SSR H5 这类"路由驱动、需要区分前进后退、页面数量不固定"的场景，直接套用 `keep-alive` 的组件身份缓存会处处受限，更合适的做法是像 `page-alive` 这样：保留 Vue 核心的 `vnode.data.keepAlive` 复用能力，把缓存 key 换成与浏览器历史绑定的策略，并且严格把这套有状态的缓存逻辑限制在客户端，让服务端渲染保持无状态、每请求独立。
