# CSS 像素、DPR 与 1px 边框 - 配图存档

## 文章地图

**文章主命题：** DPR 负责把同样的 CSS 尺寸映射到不同密度的物理像素；只有追求一物理像素的 hairline 需要额外压缩，字体则保持逻辑尺寸并借助更高 DPR 获得更清晰的轮廓。

| 段落位置 | 这一段在做什么 | 单句子命题 | 原文指纹 | 信息结构 | 情绪变化 |
|---|---|---|---|---|---|
| “三种‘像素’不是一回事” | 建立前置坐标概念 | 物理像素、CSS 像素与设计稿单位属于三套坐标 | 375、750 @2x、1125 @3x 设计稿 | 层级与映射 | 从混淆到拆分 |
| “DPR 如何连接两套坐标” | 解释核心机制 | 同一个 CSS 像素在 DPR 1、2、3 下分别由 1、4、9 个物理像素绘制 | `1px × 1px`、1/4/9 网格、边框厚度 | 结构与对比 | 从抽象到可见 |
| “重新理解移动端 1px 问题” | 修正常见误解 | 普通 CSS 1px 与一物理像素 hairline 是两个设计目标 | `0.5 CSS px`、`0.333 CSS px`、750 @2x | 左右对比 | 从误判到澄清 |
| “1px 与 hairline 的实现方案” | 给出工程选择 | 普通边框直接用 1px，明确要求 hairline 时才使用小数或伪元素缩放 | `border-bottom`、`scaleY()`、`resolution` | 选择与流程 | 从机制到落地 |
| “为什么字体不需要按 DPR 缩小” | 完成关键区分 | 边框追求更细，字体追求同尺寸下更清晰 | `font-size: 16px`、像素字形、hairline | 对比 | 从疑问到顿悟 |
| “自适应单位与兼容处理” | 扩展到响应式单位 | DPR 适配与视口响应是不同问题 | `rem`、`clamp()`、`dvh`、`ch` | 分类与选择 | 从局部到完整策略 |

## 插图说明清单

| 图片 | 插入位置 | 画面 | 放置原因 |
|---|---|---|---|
| `01-DPR与物理像素映射.webp` | “所以 DPR 更准确的含义是：当前显示与缩放环境下，设备像素和 CSS 像素的比例。”之后 | 三个同尺寸 CSS 像素外框分别拆成 1、2×2、3×3 物理像素网格，背剑侠客用放大镜观察高密网格 | 把“逻辑尺寸不变、参与绘制的物理像素增加”变成一眼可见的结构 |
| `02-普通1px与hairline对比.webp` | “后者通常被称为 hairline。它比普通的 CSS 1px 边框更细，所以才需要特殊实现。”之后 | DPR=2 下两组相同 8×4 网格；左侧 CSS 1px 占两整行，右侧 hairline 占一整行 | 用同一像素尺度直接区分普通边框与一物理像素 hairline |
| `03-DPR提升时边框与字体差异.webp` | “字体的 CSS 布局尺寸仍然是 16px，不会因为 DPR=3 就变成视觉上的三倍大。”之后 | 左侧同宽网格中的边框从三整行压到一整行；右侧两个同尺寸字框里的 A 从粗糙像素变为细密像素 | 收束全文最重要的判断：边框追求更细，字体追求尺寸不变但更清晰 |

## 构思卡摘要

### 01 - DPR 与物理像素映射

- 插入位置：“所以 DPR 更准确的含义是：当前显示与缩放环境下，设备像素和 CSS 像素的比例。”之后。
- 图型：结构图，使用三个对齐的结构变体。
- 画幅：16:9 横向。
- 配图任务：解释。
- 单一命题：一个 CSS 像素的视觉外框保持相同，DPR 越高，内部用于绘制它的物理像素越多。
- 原文指纹：DPR=1、DPR=2、DPR=3，以及 1、2×2、3×3 物理像素网格。
- 信息单位：三个同尺寸 CSS 像素外框、三种物理像素网格、一个观察者。
- 组织规则：从左到右按 DPR 递增；外框等大，内部密度递增。
- 重复元素预算：三个大型同形外框，达到大型重复元素上限；不增加设备卡片或更多网格。
- 视觉重量：三个网格各约 12%-15%，整体核心约 50%，侠客约 7%。
- 手写标签：`DPR = 1 · 普通屏`、`DPR = 2 · Retina 屏`、`DPR = 3 · 高密屏`。
- 标签规划：三个黑色对象标签，分别紧贴对应网格下方；都不可删除，否则设备语义不完整。
- 阅读顺序：第一眼看到三个等大的外框；第二眼看到内部网格从 1 变为 4、9；最后理解 CSS 尺寸不变而物理像素密度增加。
- 侠客动作：在右下方使用放大镜观察 3×3 网格，提供观察动作与尺度。
- 一秒读图目标：看出三个外框同样大但网格越来越密。
- 三秒读图目标：理解 DPR 只增加绘制细节，不会把 CSS 像素的逻辑尺寸放大。
- 删除项：不画手机外壳、设备照片、代码窗口、面积公式、箭头群和说明段落。
- 画面一句话：三个同尺寸方框依次容纳 1、4、9 个物理像素，侠客用放大镜观察最密的一格。

### 02 - 普通 1px 与 hairline 对比

- 插入位置：“后者通常被称为 hairline。它比普通的 CSS 1px 边框更细，所以才需要特殊实现。”之后。
- 图型：对比图。
- 画幅：16:9 横向。
- 配图任务：区分。
- 单一命题：在 DPR=2 下，普通 CSS 1px 占两行物理像素，而一物理像素 hairline 只占一行。
- 原文指纹：DPR=2、CSS 1px、hairline、两行与一行橙色像素带。
- 信息单位：两个相同 8×4 物理像素截面、两条不同厚度的边框带、一个测量者。
- 组织规则：左右严格镜像对齐，只改变橙色像素带的纵向厚度。
- 重复元素预算：两个大型同形网格；每个网格只保留理解厚度需要的 8×4 单元。
- 视觉重量：两个网格各约 15%，左右外接面积一致，侠客约 7%。
- 手写标签：`DPR = 2`、`CSS 1px`、`hairline`。
- 标签规划：`DPR = 2` 位于上方中央作为共同条件；另外两个黑色对象标签分别紧贴左右网格下方，均不可删除。
- 阅读顺序：第一眼看两个相同网格；第二眼比较橙色占两行还是一行；最后理解 hairline 的目标是一物理像素。
- 侠客动作：站在两组网格之间用短尺测量厚度，参与比较动作。
- 一秒读图目标：看出左边橙色带是右边两倍厚。
- 三秒读图目标：看懂 DPR=2 时 CSS 1px 与 hairline 对应的物理像素行数不同。
- 删除项：不画 DPR=1/3、不画卡片 UI、不画小数公式、不画多种 hairline 实现方案。
- 画面一句话：同一把尺子下，两组相同网格中的橙色边框分别占两行与一行。

### 03 - DPR 提升时边框与字体差异

- 插入位置：“字体的 CSS 布局尺寸仍然是 16px，不会因为 DPR=3 就变成视觉上的三倍大。”之后。
- 图型：对比图。
- 画幅：16:9 横向。
- 配图任务：区分。
- 单一命题：高 DPR 下，hairline 需要在纵向压回一物理像素，字体则保持相同外框并获得更细密的字形。
- 原文指纹：DPR 提升、边框从三物理像素行变为一行、两个相同字框中的像素字母 A。
- 信息单位：边框压缩前后网格、字体精度前后字框、中央观察者。
- 组织规则：左右两条各自从粗到细的路径；左侧改变厚度，右侧只改变像素密度。
- 重复元素预算：两组边框网格、两个字体框；每一侧只保留一次前后变化。
- 视觉重量：左右核心结构各约 22%，单模块低于 15%，侠客约 8%。
- 手写标签：`DPR 提升`、`边框`、`变细`、`字体`、`更清晰`。
- 标签规划：五个黑色短标签紧贴共同条件、左右对象和结果；不使用第二功能色。
- 阅读顺序：第一眼看到左右“边框/字体”两组；第二眼沿箭头看到边框行数减少、字体像素变密；最后理解两者目标不同。
- 侠客动作：站在中央用放大镜观察更细密的 A，同时指向压缩后的边框，承担比较引导。
- 一秒读图目标：看出左侧线条变薄、右侧字形尺寸不变。
- 三秒读图目标：理解边框与字体面对高 DPR 时不应使用同一种补偿策略。
- 删除项：不画 `rem`、`clamp()`、浏览器缩放、设计稿尺寸和 hairline 代码。
- 画面一句话：同一次 DPR 提升，左边把三行边框压成一行，右边让同尺寸 A 的像素轮廓变得更细密。

## 可读性验证

三张图均通过以下检查：

1. 一秒测试：主结构和主要差异在手机宽度缩略图中仍可辨认。
2. 三秒测试：分别能够复述“网格变密但外框不变”“两行与一行”“边框变细而字体变清晰”。
3. 换文测试：每张图都保留 DPR、CSS 1px、hairline 或 16px 字形等原文指纹，不能无差别用于其他响应式文章。
4. 删减测试：未保留设备外壳、浏览器 UI、代码窗口、公式说明等次要元素。
5. 图型测试：机制拆解使用结构图，概念差异使用严格对比图。
6. 无文测试：移除标签后，等大外框、像素行数和字形密度关系仍成立。
7. 重复审美测试：大型重复元素不超过三个，未形成卡片阵列。
8. 眯眼平衡测试：核心结构左右重量接近，侠客没有压过技术对象。

## 生成提示词

### 01 - DPR 与物理像素映射

```text
Use case: infographic-diagram. Asset type: Docusaurus technical article body illustration. Use the provided image only as the strict recurring wuxia mascot character reference.

The central recognizable article anchor is three equal-sized square cutaway diagrams representing exactly ONE CSS pixel each, clearly visible and not omitted: the left square contains exactly one undivided physical-pixel cell; the middle square is divided into an exact 2 by 2 grid containing exactly four cells; the right square is divided into an exact 3 by 3 grid containing exactly nine cells. All three outer squares must have precisely the same visual width and height, showing that the CSS size stays equal while physical-pixel density increases. Mathematical grid counts must be exact. Structure diagram with three aligned variants, strict 16:9 landscape composition, not 3:2, not square, not portrait. First see three equal outer squares, then notice 1 / 4 / 9 internal cells, finally understand more device pixels draw the same CSS area.

Place the recurring chibi Chinese young wuxia swordsman mascot at the lower edge, only 6 to 8 percent of the canvas, actively holding a small magnifying glass toward the 3 by 3 grid as a scale and observation cue. Preserve the reference identity exactly: large head and small agile body, near-black dark burgundy long hair, asymmetric bangs covering one eye, high tied hair with dark blue ribbon, one narrow gray-blue eye, two cinnabar cheek marks, deep indigo/navy/gray-blue Chinese outfit, dark blue wrist wraps, one Chinese short sword with brown-gold tassel; calm confident, not babyish, sword sheathed.

Include only these three exact labels in a clear natural handwritten style, centered close below the corresponding grid: "DPR = 1 · 普通屏", "DPR = 2 · Retina 屏", "DPR = 3 · 高密屏". No other text, numbers, letters, title, legend, watermark, border, or frame. Render every character exactly as provided. Labels in black; use one small warm orange accent only to outline the shared one-CSS-pixel boundary.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, slightly organic decisive edges, sparse thin interior detail lines, large clean white negative space, crisp readable silhouettes and clear information hierarchy. The three diagram groups together occupy about 45 to 55 percent of the canvas; no single group above 15 percent; balanced visual weight. Avoid rounded cards, PowerPoint-like panels, mechanical UI decoration, perspective distortion, extra grid cells, repeated icons, uniform arrows, cream paper, watercolor, pencil shading, hatching, heavy paper grain, complex texture, oversaturated color, photorealism, 3D render, realistic wuxia, adult proportions, ornate armor, many weapons, ninja, samurai, katana, cute big round eyes. Strict 16:9 landscape composition.
```

### 02 - 普通 1px 与 hairline 对比

```text
Use case: infographic-diagram. Asset type: Docusaurus technical article body illustration. Use the provided image only as the strict recurring wuxia mascot character reference.

The central recognizable article anchor is a mathematically exact DPR=2 border cross-section comparison, clearly visible and not omitted. Show two equal-width, equal-height pixel-grid cutaways in strict mirrored alignment. Each cutaway has exactly 8 columns and 4 rows of large square physical-pixel cells. In the LEFT cutaway, a normal CSS 1px bottom border at DPR=2 occupies exactly the bottom TWO full rows of physical-pixel cells, highlighted as one continuous warm orange band. In the RIGHT cutaway, a hairline bottom border occupies exactly the bottom ONE full row of physical-pixel cells, highlighted as one continuous warm orange band. All cell sizes, outer dimensions, baselines and grid spacing are identical between left and right. The only visual difference is two orange rows versus one orange row. Comparison diagram, strict 16:9 landscape composition, not 3:2, not square, not portrait. First see equal cutaways, then compare band thickness, finally understand CSS 1px versus one-device-pixel hairline on DPR=2.

Place the recurring chibi Chinese young wuxia swordsman mascot at the bottom center, only 6 to 8 percent of the canvas, actively holding a short vertical measuring ruler between the two cutaways and looking at the orange bands. Preserve the reference identity exactly: large head and small agile body, near-black dark burgundy long hair, asymmetric bangs covering one eye, high tied hair with dark blue ribbon, one narrow gray-blue eye, two cinnabar cheek marks, deep indigo/navy/gray-blue Chinese outfit, dark blue wrist wraps, one Chinese short sword with brown-gold tassel; calm confident, not babyish, sword sheathed.

Include only these three exact labels in a clear natural handwritten style: "DPR = 2" centered above both cutaways, "CSS 1px" close below the left cutaway, and "hairline" close below the right cutaway. No other text, numbers, letters, title, legend, watermark, border, or frame. Render the exact labels verbatim. Labels in black; orange is used only for the two thickness bands and one tiny ruler mark.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive line-weight variation, slightly organic decisive edges, sparse thin interior grid lines, large clean white negative space, crisp readable silhouettes, clear information hierarchy. The complete comparison occupies about 45 to 55 percent of the canvas; each cutaway about 15 percent; balanced left-right visual weight. Avoid rounded cards, UI panels, perspective distortion, extra grid cells, diagonal lines, gradients, shadows, arrows, decorative icons, PowerPoint layout, cream paper, watercolor, pencil shading, hatching, heavy paper grain, complex texture, oversaturated colors, photorealism, 3D render, realistic wuxia, adult proportions, ornate armor, many weapons, ninja, samurai, katana, cute big round eyes. Strict 16:9 landscape composition.
```

### 03 - DPR 提升时边框与字体差异

首次生成后，边框侧被模型错误画成二维缩小，因此通过第二次局部编辑把它修正为只改变纵向厚度。最终图由以下两段提示词共同得到。

#### 首次生成

```text
Use case: infographic-diagram. Asset type: Docusaurus technical article body illustration. Use the provided image only as the strict recurring wuxia mascot character reference.

The central recognizable article anchor is a strict side-by-side comparison of how higher DPR should affect a hairline border versus a 16px font, clearly visible and not omitted. LEFT half: a magnified 3-by-3 physical-pixel grid with a normal CSS 1px divider occupying exactly three warm-orange pixel rows, followed by a clear inward compression motion into a second equal-size 3-by-3 grid where only exactly one warm-orange pixel row remains; this means the hairline is made thinner. RIGHT half: two precisely equal-size square font bounding boxes connected left-to-right; both contain the same capital letter A at exactly the same height and width, the first A is visibly coarse and stair-stepped with few large pixel blocks, the second A is visibly smoother and more detailed with many smaller pixel blocks, while the outer font boxes and A silhouette size stay equal; this means the font becomes clearer, not smaller. Comparison diagram, strict 16:9 landscape composition, not 3:2, not square, not portrait. Shared reading direction left to right within each half; balanced mirrored weight.

Place the recurring chibi Chinese young wuxia swordsman mascot at the bottom center divider, only 6 to 8 percent of the canvas, actively looking through a magnifying glass that points toward the finer A while his free hand indicates the compressed line, serving as the comparison guide. Preserve the reference identity exactly: large head and small agile body, near-black dark burgundy long hair, asymmetric bangs covering one eye, high tied hair with dark blue ribbon, one narrow gray-blue eye, two cinnabar cheek marks, deep indigo/navy/gray-blue Chinese outfit, dark blue wrist wraps, one Chinese short sword with brown-gold tassel; calm confident, not babyish, sword sheathed.

Include only these five exact short labels in clear natural handwritten Chinese, close to their objects: "DPR 提升" centered at the top, "边框" above the left structure, "变细" below the compressed one-row result, "字体" above the right structure, "更清晰" below the finer equal-size A. No other text, numbers, letters except the two required capital A glyphs, title, legend, watermark, border, or frame. Render every Chinese character exactly as provided. Labels in black; orange only emphasizes the divider pixels and one small clarity accent.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive line-weight variation, slightly organic decisive edges, sparse thin interior grid lines, large clean white negative space, crisp readable silhouettes, clear information hierarchy. Complete core composition occupies 45 to 60 percent; no ordinary module above 15 percent; left and right visual weight equal. Avoid rounded cards, UI panels, perspective distortion, incorrect grid counts, changing font box size, making the second A larger, extra glyphs, decorative icons, PowerPoint layout, cream paper, watercolor, pencil shading, hatching, heavy paper grain, complex texture, oversaturated colors, photorealism, 3D render, realistic wuxia, adult proportions, ornate armor, many weapons, ninja, samurai, katana, cute big round eyes. Strict 16:9 landscape composition.
```

#### 局部修正

```text
Use case: precise-object-edit. Image 1 is the edit target illustration. Image 2 is the strict wuxia mascot reference. Make one targeted correction only: replace the two pixel-grid diagrams on the LEFT border-comparison half while preserving every other aspect of Image 1 unchanged, including the exact 16:9 composition, all five Chinese labels and their spelling, the vertical divider, the entire font comparison on the right, the character identity/pose/size/colors, white background, line style, arrows, and spacing.

Correct the left border diagrams so the border changes ONLY in vertical thickness and never in horizontal width. Both before and after grids must be identical equal-size rectangular cutaways with exactly 6 columns and exactly 5 rows of square physical-pixel cells. In the BEFORE grid, highlight exactly the bottom THREE complete horizontal rows across ALL SIX columns in warm orange. In the AFTER grid, highlight exactly the bottom ONE complete horizontal row across ALL SIX columns in warm orange. The highlighted orange band must span the full width of both grids. Do not highlight a single center cell. Do not shrink the after-grid outer dimensions. Keep both grids the same width, height, columns, rows, cell sizes, baseline, and alignment. The only difference is three full orange rows versus one full orange row.

Preserve the exact labels verbatim: "DPR 提升", "边框", "变细", "字体", "更清晰". No new text or symbols. Maintain minimalist bold-line hand-drawn editorial style, clear black grid, one warm orange accent, no gradients, no extra objects, no watermark. Strict 16:9 landscape.
```

## 生成与落盘

- 生成方式：内置 `imagegen`，使用 `assets/wuxia-visual.png` 作为固定角色参考。
- 发布格式：WebP。
- 最终尺寸：`1536 × 864`，严格 16:9。
- 压缩质量：ImageMagick `quality 82`。
- PNG 仅保留在图片生成工具的缓存目录，文章目录只保存 WebP。
