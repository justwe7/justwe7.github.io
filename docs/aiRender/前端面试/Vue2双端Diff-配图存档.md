# Vue 2 同层子节点双端 Diff 配图存档

## 插图说明

- **插入位置：** `Vue 2 的双端比较 Diff` 小节，五种命中策略说明之后。
- **图型：** 关系图，底部附带一个 `key` 查找的兜底分支。
- **画幅：** 16:9 横向（生成结果 1672 × 941）。
- **配图任务：** 解释。
- **单一命题：** Vue 2 只比较同层子节点，先依次尝试四种头尾组合；全未命中才通过 `key` 判断复用移动或创建。

## 构思卡摘要

| 字段 | 内容 |
| --- | --- |
| 原文指纹 | 旧/新子节点两排列表、四个头尾指针、`key` 查找 |
| 信息单位 | 两组同层 VNode、四条匹配路径、一个兜底分支 |
| 组织规则 | 上方左右对照；橙色路径表示四种头尾命中；底部蓝色分支表示 `key` 查找 |
| 重复元素预算 | 仅保留两组各四个 VNode；节点以 A/B/C/D 代表身份，不画多余列表项 |
| 视觉重量 | 两组列表均衡；路径作为阅读方向；`key` 分支缩小为辅助信息 |
| 手写标签 | `old`、`new`、`head`、`tail`、`key lookup`、`reuse + move`、`create` |
| 阅读顺序 | 先看两组同层列表，再沿橙色路径看四种头尾组合，最后看蓝色的 `key` 兜底 |
| 一秒读图目标 | 只在两行同层子节点之间比较 |
| 三秒读图目标 | 四种端点命中优先，失败后再根据 `key` 复用移动或创建 |
| 删除项 | 未画 setter、Watcher、队列、VNode 全链路，避免与本节 Diff 主题混淆 |

## 完整生图提示词

```text
The central recognizable article anchor is a Vue 2 same-level child-list diff comparison: two horizontal arrays of four compact VNode tiles, old children on the left and new children on the right, each tile has a crisp distinct simple symbol A, B, C, D and a small key-tag shape, four endpoint pointers visibly mark the first and last tile on both arrays. Create a highly readable explanatory relationship diagram, NOT a generic reactive pipeline. Use four clean curved matching paths between the arrays: top-to-top for old head equals new head, bottom-to-bottom for old tail equals new tail, a long curved route from old head to new tail to indicate moving to the end, and a long curved route from old tail to new head to indicate moving to the front. One small fifth fallback branch below uses a magnifying-glass over a key tag, splitting into reuse-and-move versus create-new icons. Visually show that only the two aligned child rows are being compared: draw a faint parent container around each row and show a separate deeper nested child tile below with a crossed-out connector, clearly indicating no cross-level comparison. Diagram type: relationship diagram with a small fallback decision. Strict 16:9 landscape composition. Single message: Vue 2 compares only siblings, then tries four head/tail matches before looking up by key. Information units: exactly eight main tiles, four endpoint pointer markers, four match paths, one small key fallback; avoid any other process steps. Reading order: first see same-level old/new rows, then follow the four endpoint match paths, then see key lookup fallback. Keep the core composition balanced and centered, about 55 percent of canvas; no tile dominates. Use short exact English handwritten labels only: "old", "new", "head", "tail", "key lookup", "reuse + move", "create". Label old/new and head/tail in black; main matching paths use one small warm orange accent; fallback lookup uses muted blue. Do not add any other text. Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, slightly organic hand-drawn edges, sparse thin interior detail lines, every object described with as few lines as possible, large areas of clean negative space, clean white background, mostly monochrome black ink with small warm orange accents and muted blue only for the fallback, crisp readable silhouettes, clear information hierarchy, no watercolor wash, no pencil shading, no hatching, no heavy paper grain, no complex texture, no watermark, no border. Communicate through shapes, icons, alignment and connectors. Avoid mechanical repetition: show no more than three near-identical large objects; use the eight tiles only because they are essential identity comparisons. Avoid a PowerPoint grid, uniform arrows, and a diagram-type title. Strict 16:9 landscape composition, not 3:2, not square, not portrait.
```
