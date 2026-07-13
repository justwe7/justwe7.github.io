# 集中管理skill的思路 - 配图存档

## 插图说明清单

| 图片 | 插入位置 | 画面 | 放置原因 |
|---|---|---|---|
| `01-集中仓库软链接.webp` | “仅仅是个人赛博洁癖的处理方案，并不是通用最佳实践，整理这套思路时参考了 dotey 在 X 上关于 Skill 管理的讨论线索。”之后 | 中央源仓库通过橙色软链接连接到两个项目，背剑侠客正在系上链接 | 解释全文核心结构：集中维护，项目按需启用 |
| `02-Skill和Agent区别.webp` | “Skill 更适合按需启用，Agent 文案则需要根据项目情况决定是否允许项目继续自定义。”之后 | 左侧 Skill 卷轴、右侧 Agent 文档，侠客在中间用线比较 | 区分 Skill 与项目级 Agent 的职责边界 |
| `03-安装验证流程.webp` | “这样不需要手动记住不同 Agent 的目录结构和源文件路径。”之后 | 更新、索引、查找、安装、验证五步流程，侠客在最后勾选验证 | 解释仓库使用流程不是只创建链接，还要生成索引并验证可读 |

## 构思卡摘要

### 01 - 集中仓库软链接

- 图型：结构图
- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：Skill 内容只在中央仓库维护一次，具体项目通过软链接按需启用。
- 原文指纹：`my-skillhub`、中央仓库、`.agents/skills` / `.claude/skills`、软链接。
- 信息单位：源仓库、项目文件夹、软链接路径、Skill 套件集合。
- 组织规则：左侧中央源仓库，右侧项目目录，橙色连接线表示软链接。
- 重复元素预算：项目文件夹最多两个，更多项目用叠层轮廓表示。
- 视觉重量：源仓库约 18%，项目文件夹各低于 12%，侠客约 6%-8%。
- 手写标签：源仓库、软链接、项目、按需。
- 阅读顺序：先看中央源仓库，再沿软链接到项目，最后理解项目引用而不是复制 Skill。
- 侠客动作：在源仓库旁系上软链接，作为动作和尺度参照。
- 一秒读图目标：看出一个中心连接多个项目。
- 三秒读图目标：看懂集中维护、项目按需启用的关系。
- 删除项：不画完整命令、不画所有目录、不画 Codex 和 Claude Code 的所有细节。

### 02 - Skill 和 Agent 区别

- 图型：对比图
- 画幅：16:9 横向
- 配图任务：区分
- 单一命题：Skill 是可复用能力，项目级 Agent 是项目规则，两者不应该混在一起。
- 原文指纹：Skill、Agent、项目规则、按需启用。
- 信息单位：左侧 Skill 卷轴、右侧 Agent 文档、比较线、安装分支符号。
- 组织规则：左右对照，同一比较维度是职责边界和安装方式。
- 重复元素预算：左右各一个主体，Agent 的安装方式只用三条轻分支表示。
- 视觉重量：左右主体各约 18%，侠客约 6%-8%，中间比较线轻量。
- 手写标签：Skill、Agent、能力、规则。
- 阅读顺序：先看左右两个对象，再看中间比较线，最后理解能力和规则的边界。
- 侠客动作：站在中间拉开测量线，表示比较和分界。
- 一秒读图目标：看出 Skill 与 Agent 是两类东西。
- 三秒读图目标：看懂 Skill 管能力，Agent 管项目规则。
- 删除项：不画具体代码、不展开三种 Agent 安装方式的完整说明。

### 03 - 安装验证流程

- 图型：流程图
- 画幅：16:9 横向
- 配图任务：解释
- 单一命题：使用中央 Skill 仓库时，流程要经过更新、生成索引、查找、安装和验证。
- 原文指纹：`registry-data.js`、本地 `index.html`、软链接、验证命令。
- 信息单位：更新、索引、查找、安装、验证五个状态节点。
- 组织规则：从左到右的主路径，验证节点用一条轻虚线回到更新表示后续维护循环。
- 重复元素预算：五个节点保持不同内部图标，不扩展更多步骤。
- 视觉重量：单节点低于 10%，整体核心结构约 55%，侠客约 6%-8%。
- 手写标签：更新、索引、查找、安装、验证。
- 阅读顺序：先看橙色路径，再看五个不同站点，最后理解安装后必须验证。
- 侠客动作：在最后一个检查板上勾选验证结果。
- 一秒读图目标：看出一条从左到右的安装流程。
- 三秒读图目标：看懂中央仓库使用不是只创建链接，还要查找和验证。
- 删除项：不画具体 shell 命令全文、不画浏览器完整界面、不画过多检查项。

## 生成提示词

### 01 - 集中仓库软链接

```text
The central recognizable article anchor is a single central repository folder named "源仓库" feeding two project folders through thin symbolic symlink strands, clearly visible and not omitted. Use the provided wuxia mascot image as the strict character reference for body shape, hairstyle, clothing and color palette. The recurring chibi Chinese young wuxia swordsman mascot is small, kneeling near the central repository, carefully tying one orange symlink strand from the repository to a project folder, acting as the operator and scale reference.

Diagram type: structure diagram. Whole system: centralized Skill source files. First-level components: one central repository folder, two project folders, a small suite stack beside the source folder. Containment rule: source files stay inside the central repository; projects only receive symlink entrances. One conclusion: Skill content should be maintained once in the central hub, while projects only enable what they need through symlinks. Information units: source repository, project folders, symlink paths, one suite stack. Layout: central source on the left-center, two projects on the right, clean connectors from left to right. Repeated project folders: exactly two; any extra projects appear only as faint stacked outlines behind one folder. Visual weight: central source about 18 percent, each project under 12 percent, mascot 6 to 8 percent, connectors light and readable. Include only these exact short Chinese labels in a clear natural handwritten style: 源仓库, 软链接, 项目, 按需. Each label stays close to its object. No additional text. Black labels plus one small warm orange accent on the symlink path.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, clean white background, mostly monochrome black ink with one small warm orange accent color only, strict 16:9 landscape composition.
```

### 02 - Skill 和 Agent 区别

```text
The central recognizable article anchor is a side-by-side comparison of two installation objects: a reusable Skill scroll on the left and a project Agent document on the right, clearly visible and not omitted. Use the provided wuxia mascot image as the strict character reference for body shape, hairstyle, clothing and color palette. The recurring chibi Chinese young wuxia swordsman mascot is small at the center, holding a thin measuring cord between the two sides to compare them, calm and focused, acting as the guide and scale reference.

Diagram type: comparison diagram. Shared question: what belongs in a reusable capability and what belongs in project rules. Left approach: Skill as a portable ability enabled only when needed. Right approach: Agent document as project context and coding rules that may be copied, symlinked, or locally referenced. Comparison dimensions: scope and installation style only. Different outcomes: Skill remains capability-focused; Agent remains project-rule-focused. Layout: strict mirrored alignment, left scroll bundle, right document sheet, mascot centered below the comparison line. Repeated elements: one scroll bundle and one document sheet only; installation options on the right shown as three tiny branch marks, not full repeated documents. Visual weight: each side about 18 percent, mascot 6 to 8 percent, branch marks very light. Include only these exact short Chinese labels in a clear natural handwritten style: Skill, Agent, 能力, 规则. Each label stays close to its object. No additional text. Black labels plus one small warm orange accent on the comparison cord.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, clean white background, mostly monochrome black ink with one small warm orange accent color only, strict 16:9 landscape composition.
```

### 03 - 安装验证流程

```text
The central recognizable article anchor is a local HTML index page connected to a generated registry-data.js sheet and then to installation verification checkmarks, clearly visible and not omitted. Use the provided wuxia mascot image as the strict character reference for body shape, hairstyle, clothing and color palette. The recurring chibi Chinese young wuxia swordsman mascot is small near the final verification node, using a small brush to tick the last checkmark, calm and precise, acting as the operator and scale reference.

Diagram type: process diagram. Start state: updated central Skill repository. Ordered nodes: 更新 -> 索引 -> 查找 -> 安装 -> 验证. End state: project has a readable symlinked Skill. Optional feedback loop: a single thin dotted return line from verification to update for future changes. Reading direction: left to right along one gently curved orange path, not a row of identical boxes. Node consistency: five simple hand-drawn stations with varied internal icons: git branch, registry sheet, local HTML window, symlink chain, checklist. One conclusion: the workflow is not just creating a link; it must generate the index, choose the right install target, and verify that the Skill can be read. Repeated elements: exactly five stations; no extra repeated cards. Visual weight: each station under 10 percent, mascot 6 to 8 percent, entire core composition about 55 percent of canvas. Include only these exact short Chinese labels in a clear natural handwritten style: 更新, 索引, 查找, 安装, 验证. Each label stays close to its station. No additional text. Black labels plus one small warm orange accent on the main path and final check.

Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, clean white background, mostly monochrome black ink with one small warm orange accent color only, strict 16:9 landscape composition.
```
