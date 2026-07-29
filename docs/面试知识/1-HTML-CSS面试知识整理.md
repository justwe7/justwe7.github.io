# HTML/CSS 面试知识整理

> 本文覆盖 HTML/CSS 面试高频知识点，按知识依赖组织：先讲文档结构和盒模型这类基础概念，再展开布局、层叠、动画，最后是移动端适配和渲染性能。每个话题尽量先说清楚"要解决什么问题"，再讲具体属性和代码——只背属性名很容易在追问"为什么"的时候露怯。

## 复习建议

- 布局类问题（Flexbox、Grid、居中、圣杯布局）优先动手写一遍代码，比只看概念记得牢。
- 移动端适配（rem/vw）是高频源码理解题，建议能讲清楚 `flexible.js` 的核心逻辑，而不是只会说"用 rem 就行"。
- 层叠上下文、BFC 这类"看不见摸不着"的概念，回答时结合一个具体现象（如清除浮动、避免 margin 塌陷）来说明，比抽象背定义更容易让面试官认可。

## 一、HTML 语义化与文档结构

### 为什么要语义化

早期页面大量使用 `<div>` 嵌套 `<div>` 描述结构，浏览器、屏幕阅读器、搜索引擎爬虫都无法从标签本身获知这块内容是导航、正文还是页脚，只能靠开发者自己约定的 class 名去猜测。语义化标签（`<header>`、`<nav>`、`<main>`、`<article>`、`<aside>`、`<footer>` 等）让标签本身就携带结构信息。

> 面试回答：
>
> 语义化的价值主要体现在三方面：一是可访问性，屏幕阅读器可以根据 `<nav>`、`<main>` 这类标签让视障用户快速跳转到关键区域；二是 SEO，搜索引擎会给语义化标签包裹的内容更高的权重判断；三是可维护性，团队协作时看到 `<article>` 就知道这是一篇独立可复用的内容块，不需要每次都翻 class 命名约定。语义化不是"用更好看的标签名"，而是让标签本身承载结构含义。

### 常见语义化标签的实际边界

- `<header>`/`<footer>` 不是只能用在页面级别，一个 `<article>` 内部也可以有自己的 `<header>`（比如文章标题和作者信息）。
- `<section>` 表示一个有主题的内容分区，通常应该带有标题（`<h1>`~`<h6>`）；如果只是为了应用样式而分组，应该用没有语义的 `<div>`，不要滥用 `<section>`。
- `<article>` 强调"可以独立于页面其余部分被分发或复用的内容"，比如一篇博客文章、一条评论。

### 文档解析与 DOM 树构建

浏览器拿到 HTML 后会解析成 DOM 树，拿到 CSS 后解析成 CSSOM 树，两者合并生成渲染树（Render Tree），再进行布局（Layout）和绘制（Paint）。`<script>` 标签默认会阻塞 HTML 解析（浏览器必须先下载并执行完脚本才能继续解析后面的 DOM），这也是为什么工程实践中推荐给非首屏必需的脚本加上 `defer`（延迟到 DOM 解析完成后按顺序执行）或 `async`（下载完成后立即执行，不保证顺序）。

## 二、盒模型：content-box、border-box 与 BFC

### 两种盒模型

`box-sizing` 决定 `width`/`height` 的计算范围：

| 值 | `width` 包含的范围 | 说明 |
| --- | --- | --- |
| `content-box`（默认） | 只有内容区 | 设置 `width: 200px` 后再加 `padding`/`border`，元素实际占用宽度会超过 200px |
| `border-box` | 内容区 + `padding` + `border` | 设置 `width: 200px` 后，`padding`/`border` 会挤压内容区，元素实际总宽度始终是 200px |

工程实践中普遍会在全局样式里加一条 `* { box-sizing: border-box; }`，因为 `border-box` 下设置宽高更符合直觉——改 `padding`/`border` 不会连带影响元素占用的总空间，避免布局计算时需要手动加减这些值。

### BFC（块级格式化上下文）

BFC 是一块独立的渲染区域，内部元素的布局不会影响到外部，外部的布局也不会影响到内部。它解决的是几个具体的、日常会遇到的布局问题：

- **父子元素 `margin` 塌陷**：如果父元素没有 `border`/`padding` 分隔，子元素的 `margin-top` 会"穿透"父元素直接作用在父元素外部，让父元素看起来也有了一样的上边距。父元素触发 BFC 后，内部子元素的 margin 就不会再和外部元素发生这种塌陷。
- **清除浮动导致父元素高度塌陷**：如果父元素内部全部是浮动元素，父元素默认不会把浮动子元素的高度计算进自己的高度（浮动元素脱离了正常文档流）。父元素触发 BFC 后，会重新把内部浮动元素的高度纳入自身高度计算。
- **两栏自适应布局**：一栏固定宽度并 `float`，另一栏触发 BFC 后会自动避开浮动元素占据的区域，天然形成不需要计算精确宽度的两栏布局。

```css
.clearfix {
  overflow: hidden; /* 触发 BFC 最简单的方式之一 */
}
```

常见触发 BFC 的方式：`overflow` 设为非 `visible`（如 `hidden`、`auto`）、`display: flow-root`（专门为触发 BFC 设计、没有其他副作用的现代写法）、`float` 不为 `none`、`position` 为 `absolute`/`fixed`。

> 面试回答：
>
> BFC 本质上是一个独立的布局环境，内外互不干扰。理解它最好的方式不是背定义，而是记住它解决的三个具体问题：避免相邻 `margin` 塌陷、让父元素能正确包裹住浮动子元素的高度、以及实现浮动栏和自适应栏共存的两栏布局。现代项目里如果只是为了触发 BFC，优先用 `display: flow-root`，因为它没有 `overflow: hidden` 那种"顺带裁剪溢出内容"的副作用。

### 清除浮动的另一种经典写法

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

这种写法通过给父元素追加一个不可见的伪元素、显式设置 `clear: both`，让父元素的高度计算把浮动子元素纳入进来，是 `display: flow-root` 出现之前最通用的兼容写法，很多项目至今仍在用。

## 三、CSS 选择器、优先级与层叠规则

### 优先级计算

CSS 优先级通常用一个四元组 `(内联样式, ID, 类/属性/伪类, 标签/伪元素)` 表示，数值大的优先级更高，逐位比较，不会进位（100 个类选择器的优先级也不会超过 1 个 ID 选择器）：

| 选择器类型 | 权重位 | 示例 |
| --- | --- | --- |
| 内联样式 `style=""` | 第一位 | `style="color: red"` |
| ID 选择器 | 第二位 | `#header` |
| 类、属性、伪类选择器 | 第三位 | `.btn`、`[type="text"]`、`:hover` |
| 标签、伪元素选择器 | 第四位 | `div`、`::before` |

`!important` 会直接跳过这套优先级计算，强制最高优先级生效（内联样式加 `!important` 也会被同样带 `!important` 的样式表规则覆盖，具体取决于两者的优先级再比一次）。工程实践中应该尽量避免使用 `!important`，它会让样式覆盖关系变得难以追踪——一旦一处用了，后续要覆盖它往往只能用优先级更高的选择器或者也加 `!important`，容易演变成"优先级军备竞赛"。

### 层叠（Cascade）的完整判断顺序

当多条规则命中同一个元素的同一个属性时，浏览器按以下顺序决定生效哪一条：来源和重要性（用户代理样式 < 用户样式 < 作者样式，`!important` 会反转这个顺序）→ 优先级（上表的四元组）→ 源码顺序（优先级相同时，后声明的规则覆盖先声明的）。

### 常见伪类与伪元素的区别

伪类（单冒号 `:hover`、`:nth-child()`）描述元素的一种特殊状态或位置；伪元素（双冒号 `::before`、`::after`）则是创建了一个实际上不存在于 DOM 树中、但会被渲染出来的虚拟元素。CSS3 规范里用单双冒号区分两者，但浏览器出于兼容性，对 `:before`/`:after` 这类历史写法也仍然支持。

## 四、定位与浮动：position、float 及清除浮动

### position 的取值与脱离文档流

| 值 | 参照对象 | 是否脱离文档流 |
| --- | --- | --- |
| `static`（默认） | 无 | 否 |
| `relative` | 元素自身原本的位置 | 否，原位置仍占据空间 |
| `absolute` | 最近的非 `static` 定位祖先元素（找不到则相对于初始包含块） | 是 |
| `fixed` | 视口（viewport） | 是 |
| `sticky` | 视口，但限定在其父元素范围内 | 否，滚动到阈值前正常占据文档流位置 |

`absolute` 定位元素会去寻找最近的、`position` 不为 `static` 的祖先元素作为参照——这也是为什么"给父元素加 `position: relative`，配合子元素 `position: absolute`"是一个高频组合写法：父元素不必真的发生偏移（`relative` 不设置 `top`/`left` 时元素位置不变），只是为了给子元素提供一个定位参照系。

`sticky` 是 `relative` 和 `fixed` 的混合体：滚动到设定的阈值之前表现和 `relative` 一样正常占据文档流；滚动超过阈值后表现得像 `fixed`，固定在视口的某个位置，但活动范围被限制在其父元素的边界内（父元素滚出视口后，`sticky` 元素也会跟着一起消失，而不是一直悬浮）。

### float 与清除浮动

`float` 最初是为了实现"文字环绕图片"这种排版效果设计的，后来被大量借用来做整体页面布局（在 Flexbox/Grid 普及之前）。浮动元素会脱离正常文档流，但不会像 `absolute` 那样完全脱离——它仍然会影响同一行内其他内联内容的排布（这也是"文字环绕"效果的来源）。

浮动带来的经典问题是父元素高度塌陷（见第二章 BFC），清除浮动的方式除了触发 BFC，还可以用 `clear: both` 显式声明"这个元素不允许出现在浮动元素旁边，必须另起一行"。

## 五、Flexbox 布局

### 核心概念

Flexbox 要解决的是一维方向（要么横向、要么纵向）上的空间分配和对齐问题——在它之前，垂直居中、等高列、多个元素按比例分配剩余空间，都需要一些不那么直观的 hack 手段（比如 `vertical-align`、负 `margin`、`display: table-cell`）。

```css
.container {
  display: flex;
  justify-content: space-between; /* 主轴对齐方式 */
  align-items: center;            /* 交叉轴对齐方式 */
}
.item {
  flex: 1 1 200px; /* flex-grow flex-shrink flex-basis 的简写 */
}
```

| 属性 | 含义 |
| --- | --- |
| `flex-grow` | 有剩余空间时，这个子项按什么比例参与分配 |
| `flex-shrink` | 空间不够时，这个子项按什么比例参与收缩 |
| `flex-basis` | 在分配剩余空间之前，这个子项的基础尺寸 |

`justify-content` 控制主轴（`flex-direction` 决定主轴方向）方向上的对齐/分布方式；`align-items` 控制交叉轴方向的对齐方式；单个子项还可以用 `align-self` 覆盖整体的 `align-items` 设置。垂直居中在 Flexbox 出现之后变得非常直接：父元素 `display: flex; justify-content: center; align-items: center;` 即可同时实现水平和垂直居中，不需要再依赖 `position` + 负 `margin` 的老写法。

## 六、Grid 布局

Flexbox 擅长一维排列，Grid 解决的是二维（行和列同时规划）的布局问题，比如整体页面骨架（头部、侧边栏、主内容、底部）这种需要同时控制行高和列宽的场景。

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

`grid-template-columns`/`grid-template-rows` 定义网格的行列尺寸，`fr` 单位表示"剩余空间的份数"；`grid-template-areas` 用直观的字符串布局描述每个区域该占据哪些网格单元，配合子元素的 `grid-area` 指定自己对应哪个区域，代码可读性比纯数字网格坐标高很多。

Flexbox 和 Grid 不是互相替代的关系：整体页面骨架、需要同时控制行列的场景用 Grid；骨架内部某一块区域里一组同类项目（比如一排导航链接、一组标签）按一个方向排列、对齐、分配空间，用 Flexbox 会更简单直接。实践中两者经常嵌套使用。

## 七、移动端适配：viewport、rem 与 vw 方案原理

### 问题的起点：viewport

手机浏览器为了兼容那些按桌面端宽度（约 980px）设计的老网站，默认会把页面渲染在一个虚拟的、比屏幕物理宽度大得多的"布局视口"（layout viewport）里，再整体缩小显示，导致移动端页面默认是缩小、需要手动放大才能看清的状态。`<meta name="viewport">` 就是用来告诉浏览器"不要这样做，按设备实际宽度渲染"：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width`：让布局视口宽度等于设备的独立像素宽度（而不是默认的约 980px）。
- `initial-scale=1.0`：初始缩放比例为 1，不做默认缩小。

这一行 `meta` 标签是移动端适配的前提，没有它，后面所有基于视口宽度的适配方案都无从谈起。

### 为什么需要相对单位适配

不同手机的屏幕物理宽度差异很大（从几年前的 320px 到现在主流的 390px、414px 甚至更宽），如果页面元素全部用固定的 `px` 写死尺寸，在小屏手机上会溢出、在大屏手机上会显得元素过小、留白过多。**核心思路是让页面上大多数尺寸都不写死，而是跟随屏幕宽度等比例缩放**。

### rem 适配方案：动态设置根字号

`rem` 是相对于根元素（`<html>`）字号的单位。适配方案的核心思路是：**根据当前设备屏幕宽度，动态计算并设置 `<html>` 的 `font-size`，页面里其他元素的尺寸全部用 `rem` 书写，这样只要根字号跟着屏幕宽度变化，所有用 `rem` 写的尺寸就会等比例跟着缩放**。

以设计稿宽度 750px（对应 375px 的设备独立像素宽度，因为设计稿通常按 2 倍图给）、约定 1rem = 75px（即把设计稿宽度分成 10rem）为例：

```js
function setRootFontSize() {
  const designWidth = 750; // 设计稿宽度（单位：px，按视觉稿标注）
  const baseFontSize = 75; // 约定 1rem 对应设计稿上的 75px，方便设计稿标注除以 75 直接换算
  const html = document.documentElement;
  const clientWidth = html.clientWidth;
  // 按当前屏幕宽度相对设计稿宽度的比例，等比例缩放根字号
  html.style.fontSize = (clientWidth / designWidth) * baseFontSize + 'px';
}

setRootFontSize();
window.addEventListener('resize', setRootFontSize); // 横竖屏切换/窗口变化时重新计算
window.addEventListener('pageshow', (e) => {
  if (e.persisted) setRootFontSize(); // 从 bfcache 恢复页面时也要重新计算一次
});
```

设计稿上标注"某个元素宽度 300px"，直接除以 75 得到 `4rem`，写进 CSS：

```css
.card {
  width: 4rem; /* 对应设计稿上的 300px，会随根字号等比例缩放 */
}
```

> 面试回答：
>
> rem 适配的核心是"用 JS 动态设置 `html` 根元素的 `font-size`，让它和当前屏幕宽度成正比"，页面上的尺寸全部用 `rem` 书写。因为 `rem` 是相对根字号计算的，根字号一旦跟随屏幕宽度变化，所有用 `rem` 写的尺寸就会整体等比例缩放，从而实现"不同尺寸屏幕上视觉比例保持一致"的效果。这正是曾经流行的 `flexible.js`（手淘方案）的核心逻辑，本质上就是上面这几行动态计算根字号的代码，只是额外做了一些设备像素比（`dpr`）相关的精细化处理。

### vw 方案：更直接的相对单位

`vw` 是相对视口宽度的单位，`1vw` 等于视口宽度的 1%，不需要 JS 动态计算根字号就能天然实现"随屏幕宽度等比例缩放"：

```css
.card {
  width: 40vw; /* 视口宽度的 40%，无需任何 JS 介入 */
}
```

vw 方案不需要引入 `flexible.js` 这类运行时脚本，也不需要处理 `resize` 事件重新计算——这是它相比 rem 方案更简洁的地方；缺点是数值需要单独用工具（如 PostCSS 插件 `postcss-px-to-viewport`）从设计稿的 px 尺寸批量转换成 vw，手动心算不如 rem 方案（除以 75 这种整数关系）直观，且早期低版本浏览器对 vw 的兼容性不如 rem。现代项目里 vw 方案已经是主流选择，构建时用 PostCSS 插件自动把设计稿标注的 px 转换成 vw，开发时仍然按 px 直接书写，不需要手动换算。

### 两种方案的对比

| 维度 | rem 方案 | vw 方案 |
| --- | --- | --- |
| 原理 | JS 动态计算根字号，元素用 rem 相对根字号缩放 | 浏览器原生支持，元素直接用 vw 相对视口宽度缩放 |
| 是否需要 JS | 需要（计算并监听 resize 重新设置根字号） | 不需要 |
| 单位换算 | 通常约定整数比例（如 1rem = 75px），心算直观 | 需要构建工具按视口宽度批量转换，不直接心算 |
| 兼容性 | 更好，`rem` 单位支持早 | 现代浏览器已普遍支持，老旧浏览器需注意 |
| 与固定尺寸元素混用 | 灵活，可以让某些元素保持固定 `px` 不参与缩放 | 相对麻烦，因为整个方案依赖视口比例 |

### Retina 屏与 1px 边框问题

普通 CSS 像素（`px`）和设备物理像素之间存在一个换算关系，即设备像素比 `devicePixelRatio`（简称 dpr）：iPhone 等 Retina 屏设备的 dpr 通常是 2 或 3，意味着写 `border: 1px solid` 时，这 1 个 CSS 像素实际会用 2×2 或 3×3 个物理像素来渲染，视觉上会显得比设计稿期望的"真实 1 物理像素细线"粗。

常见解决方案是用 `transform: scale()` 把边框元素在视觉上缩小到期望的物理像素比例：

```css
.hairline::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: #ddd;
  transform: scaleY(0.5); /* dpr 为 2 时，把 1px 边框在视觉上压缩成约 0.5px，接近真实物理像素细线 */
  transform-origin: bottom;
}
```

这类问题在使用 vw/rem 等比例缩放方案，且不追求像素级精确还原设计稿时，很多团队会选择直接接受这种"细线偏粗"的视觉差异，不做额外处理——是否值得为这 1px 的精确度投入这样的实现复杂度，需要结合项目对视觉还原度的要求判断。

## 八、层叠上下文与 z-index

`z-index` 只在设置了 `position`（非 `static`）的元素上才会生效，它决定的不是全局唯一的绝对堆叠顺序,而是**在同一个层叠上下文内部**的堆叠顺序。层叠上下文可以嵌套：一个元素一旦创建了自己的层叠上下文，它的所有子元素的 `z-index` 比较范围就被限制在这个层叠上下文内部，无法与层叠上下文外部的元素直接比较大小。

```html
<div style="position: relative; z-index: 1;">
  <div style="position: relative; z-index: 9999;">A（z-index 999 看起来很大）</div>
</div>
<div style="position: relative; z-index: 2;">B</div>
```

上面这个例子里，A 的 `z-index: 9999` 并不能保证盖住 B——因为 A 所在的父级层叠上下文本身 `z-index` 只有 1，比 B 所在的层叠上下文（`z-index: 2`）低，A 再怎么调高自己的 `z-index`，也只是在父级层叠上下文内部"最靠上"，父级本身在更外层的比较中已经先输了。这是层叠上下文相关面试题里最容易被问到、也最容易在实际项目里（尤其是做了大量嵌套弹层的场景）踩坑的地方。

`transform`、`opacity` 不为 1、`filter`、`will-change` 等属性也会创建新的层叠上下文，这也是为什么给一个元素加了 `transform` 之后，有时会意外影响它和兄弟元素之间原本预期的堆叠顺序。

## 九、CSS 动画与过渡：transition、animation、transform

### transition 与 animation 的选择

`transition` 描述的是"一个属性从状态 A 变化到状态 B 时如何过渡"，需要由某个触发条件（`:hover`、JS 修改样式等）驱动，只能定义起止两个状态；`animation` 配合 `@keyframes` 可以定义任意多个中间状态，且不需要外部触发就能自动播放，还支持循环、暂停、方向反转等更丰富的控制。

```css
.btn {
  transition: background-color 0.2s ease;
}
.btn:hover {
  background-color: #333;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.loading {
  animation: spin 1s linear infinite;
}
```

简单的状态切换（悬停变色、展开收起）用 `transition` 足够；需要多阶段、自动播放或者循环的效果（加载动画、跑马灯）用 `animation`。

### 为什么优先用 transform/opacity 做动画

浏览器渲染流程大致是：布局（Layout，计算元素几何位置尺寸）→ 绘制（Paint，把元素画成位图）→ 合成（Composite，把多个图层合成最终画面）。修改会影响元素几何属性的样式（`width`、`top`、`margin` 等）会触发重新布局，进而级联触发重绘和合成，成本最高；修改只影响外观、不影响布局的属性（如 `background-color`）会跳过布局，只触发重绘和合成；而 `transform`、`opacity` 这两个属性在现代浏览器里可以完全跳过布局和绘制，只在合成阶段处理（通常还能利用 GPU 加速），成本最低。

> 面试回答：
>
> 做动画时优先选择 `transform` 和 `opacity`，是因为它们可以只触发合成层的重新合成，不会引起重新布局或重绘，动画帧率更容易稳定在 60fps。用 `left`/`top` 这类会触发重新布局的属性做动画，元素越复杂、页面越大，越容易出现掉帧卡顿。需要移动元素位置时优先用 `transform: translate()` 而不是修改 `left`/`top`，效果相同但性能差异明显。

### will-change 的合理使用

`will-change: transform` 可以提前告知浏览器"这个元素接下来可能会有变换动画"，让浏览器提前为它创建独立的合成层，减少动画开始瞬间的卡顿。但它不是一个可以无脑加在很多元素上的性能优化开关——每个独立合成层都会占用额外的内存，滥用反而会拖慢整体性能，应该只在真正即将发生动画的元素上按需添加，动画结束后有必要的话再移除。

## 十、常见布局手写题

### 水平垂直居中

```css
/* 方案一：Flexbox，现代项目首选 */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方案二：绝对定位 + transform，适合不确定子元素尺寸的场景 */
.center-absolute {
  position: relative;
}
.center-absolute > .child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 多列等分布局

```css
/* Flexbox 等分 */
.row { display: flex; }
.col { flex: 1; } /* 各列平分剩余空间 */

/* Grid 等分，列数固定时更直接 */
.grid-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

### 圣杯布局（两侧定宽，中间自适应，且中间列 DOM 顺序在前）

```css
.container { display: flex; }
.main { flex: 1; order: 2; }       /* 中间列自适应，且视觉上放在中间 */
.left { width: 200px; order: 1; }  /* 左侧固定宽度 */
.right { width: 200px; order: 3; } /* 右侧固定宽度 */
```

在 Flexbox 普及之前，圣杯布局需要靠三栏全部 `float: left`、中间列用 `margin` 负值配合父元素 `padding` 精确让位给两侧栏——实现思路绕、依赖精确的数值计算。Flexbox 的 `order` 属性可以让"DOM 顺序"和"视觉顺序"彻底解耦（这里让中间列先在 DOM 里声明，方便主内容优先被解析渲染，同时视觉上又能正确显示在中间），大幅简化了这个经典问题。

## 十一、CSS 预处理器与现代 CSS

### 预处理器解决了什么

原生 CSS 早期不支持变量、嵌套、逻辑复用，Sass/Less 这类预处理器通过引入变量、嵌套规则、mixin（可复用的样式片段）、函数运算，让样式代码可以像写普通程序一样组织，编译成浏览器能识别的标准 CSS。

```scss
$primary-color: #3498db;

.card {
  padding: 16px;
  &__title {       // 编译为 .card__title
    color: $primary-color;
  }
  &:hover {         // 编译为 .card:hover
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
```

### 原生 CSS 变量（Custom Properties）

现代浏览器已原生支持 CSS 变量，和预处理器变量的关键差异是：**CSS 变量是运行时生效的，可以被 JS 动态读写，也会遵循 CSS 的层叠和继承规则**；预处理器变量只在编译阶段替换成字面量，编译完成后就和普通写死的值没有区别。

```css
:root {
  --primary-color: #3498db;
}
.dark-theme {
  --primary-color: #5dade2; /* 局部覆盖，只影响这个作用域下的元素 */
}
.btn {
  background: var(--primary-color);
}
```

```js
document.documentElement.style.setProperty('--primary-color', '#e74c3c'); // 运行时动态修改主题色
```

这也是为什么"运行时可切换主题"这类需求，现代项目更倾向用原生 CSS 变量而不是预处理器变量实现——预处理器变量在构建时就已经被替换成固定值，运行时无法再改。

### PostCSS 的定位

PostCSS 本身不是预处理器，而是一个用 JS 插件转换 CSS 的工具平台：`autoprefixer` 自动补全浏览器前缀、`postcss-px-to-viewport` 把 px 批量转换成 vw（第七章提到的 vw 适配方案的实现工具）、`postcss-preset-env` 让你提前使用尚在草案阶段的新 CSS 特性。它和 Sass/Less 不冲突，实践中常见的链路是"Sass 负责变量、嵌套这类语言层面的增强，PostCSS 负责编译后再做一层针对浏览器兼容性、适配规则的转换"。

## 十二、渲染性能：重排与重绘

浏览器渲染管线大致是布局（Layout/Reflow）→ 绘制（Paint）→ 合成（Composite）（第九章已展开）。**重排（Reflow）** 指重新计算元素的几何信息（尺寸、位置），成本最高，因为一个元素的几何变化可能连锁影响其父元素、兄弟元素乃至整个页面的布局；**重绘（Repaint）** 指外观变化但几何信息不变，只需要重新绘制像素，成本低于重排；只影响合成层的变化（`transform`/`opacity`）成本最低。

### 常见触发重排的操作

- 修改元素尺寸、位置相关的样式（`width`、`height`、`margin`、`top` 等）。
- 增删 DOM 节点、改变字体大小。
- **读取某些会强制浏览器立即完成一次布局计算的属性**，比如 `offsetWidth`、`offsetHeight`、`getComputedStyle()`——如果在修改样式之后紧接着读取这类属性，会强制浏览器提前同步执行本该异步批量处理的布局计算（这个现象通常被称为"强制同步布局"或者"布局抖动"）。

```js
// 反例：循环里交替读写会导致每次循环都强制触发一次同步布局
for (const el of elements) {
  el.style.width = el.offsetWidth + 10 + 'px'; // 读（触发计算）→ 写 → 下一轮又读
}

// 优化：先集中读取，再集中写入，把多次强制同步布局合并成一次
const widths = elements.map(el => el.offsetWidth); // 集中读
elements.forEach((el, i) => { el.style.width = widths[i] + 10 + 'px'; }); // 集中写
```

### 常见优化手段

- 需要连续多次修改样式时，尽量合并成一次修改（比如通过切换一个 class，而不是分开设置多条内联样式），减少触发布局计算的次数。
- 需要频繁修改的元素（动画中的元素），配合 `transform`/`opacity` 而不是几何属性。
- 大批量 DOM 操作前，先用 `display: none` 隐藏容器（隐藏和显示各触发一次重排，但中间的所有修改不会逐条触发），或者用文档片段 `DocumentFragment` 在内存中构建好整个结构后一次性插入真实 DOM。
- 用 Chrome DevTools 的 Performance 面板实际录制分析，确认是否真的存在重排/重绘瓶颈，避免凭经验做无谓的"预防性优化"。

## 十三、常见兼容性与实践坑

- **`vertical-align` 只对行内元素/行内块元素生效**，对块级元素设置无效，是一个高频的"为什么不生效"排查点。
- **`margin: auto` 只能实现水平居中，不能实现垂直居中**（在没有配合 Flexbox/Grid 或绝对定位的前提下），因为块级元素的高度默认由内容撑开，`auto` 在这个方向上没有多余空间可分配。
- `box-shadow`/`filter` 等属性可能意外触发新的层叠上下文，导致 `z-index` 的表现和预期不一致（第八章已展开）。
- 移动端点击存在大约 300ms 的延迟（历史上为了判断用户是否要"双击缩放"），现代浏览器在识别到页面已正确设置 `viewport` 且禁用缩放的情况下，通常会自动消除这个延迟，不再需要额外引入 `fastclick` 之类的库；但如果 `viewport` 配置不当，仍可能在部分设备上复现这个问题。
- Safari（尤其是 iOS）在 `position: fixed` 配合软键盘弹出、`100vh` 单位计算（软键盘弹出/地址栏隐藏显示会动态改变视口高度）等场景上和其他浏览器的表现差异较大，是移动端适配里除了 rem/vw 之外另一个高频的实际踩坑点，通常需要用 `100dvh`（动态视口高度单位）等较新的方案缓解。

## 十四、面试冲刺索引

### ⭐⭐⭐⭐⭐ 核心必会

- 盒模型两种取值的区别，BFC 解决的三个具体问题（margin 塌陷、浮动高度塌陷、两栏自适应）。
- CSS 优先级计算规则与层叠顺序。
- Flexbox/Grid 的核心属性与适用场景区别。
- rem/vw 移动端适配原理，能讲清楚动态设置根字号的实现逻辑。
- 层叠上下文与 `z-index` 的比较范围规则。

### ⭐⭐⭐⭐ 高频重点

- position 各取值的参照对象与是否脱离文档流，`sticky` 的表现。
- transition 与 animation 的选择依据，为什么动画优先用 transform/opacity。
- 常见布局手写题：水平垂直居中、多列等分、圣杯布局。
- 重排与重绘的触发条件，强制同步布局的规避方式。

### 容易连续追问的知识链

- 浮动脱离文档流 → 父元素高度塌陷 → BFC 触发方式 → `display: flow-root` 与 `overflow: hidden` 的取舍。
- viewport 设置 → 布局视口等于设备宽度 → rem/vw 等比例缩放 → dpr 与 1px 边框问题。
- transform/opacity 只影响合成层 → 动画性能优于几何属性 → will-change 的合理使用边界。
- 层叠上下文创建条件（transform/opacity/position 等）→ z-index 比较范围被限制在父级层叠上下文内 → 子元素 z-index 再高也无法突破父级限制。
