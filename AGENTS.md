# Project: 土豆和土豆丝 — Docusaurus 知识库

## 渲染引擎

本项目使用 **Docusaurus v2**（`@docusaurus/preset-classic`）将 Markdown 文件渲染为静态站点。

- 站点地址：`https://lihx.top`
- 配置文件：`docusaurus.config.js`
- 侧边栏配置：`sidebars.js`（开发笔记）、`sidebarsLife.js`（生活日常）

Docusaurus 使用 MDX 解析 Markdown，支持 front matter（`---` 块），链接和图片路径相对于文档根目录解析。

## docs 目录

`docs/` 是开发笔记的主目录，对应导航栏「开发笔记」。目录结构：

```
docs/
├── 0-home.md          # 首页
├── AI/                # AI 相关笔记
├── Flutter/
├── 前端基础/
├── 前端框架/
├── 前端工程化/
├── 工具与环境/
├── 服务端基础/
├── 编程备忘录/
├── 应用上架与生态/
└── ...
```

侧边栏由 `sidebars.js` 自动生成，无需手动维护顺序，文件名前缀数字（如 `0-`）控制排序。

## 编辑工作流

- Markdown 文件通过 **Obsidian** 编辑
- 图片由 Obsidian 自动存放至 `static/docs/` 目录
- Obsidian 粘贴图片沿用现有相对路径风格，例如 `../../static/docs/<图片文件名>`
- AI 生成的文章配图统一放在 `static/docs/aiRender/<文章分类>/` 目录下，例如 `static/docs/aiRender/应用上架与生态/`
- 在文章中引用 AI 生成配图时沿用现有相对路径风格，例如 `![](../../static/docs/aiRender/应用上架与生态/example.png)`；不要把这类配图放到 `static/img/` 后再用 `/img/...` 引用

## 注意事项

- 不要修改 `build/` 目录（构建产物，不进版本控制）
- `node_modules/` 同上，不要编辑
- 中文目录名在 Docusaurus 中正常支持，无需转义
