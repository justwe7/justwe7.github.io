# Git worktree 与 Codex：配图存档

## 文章地图

| 段落位置 | 这一段在做什么 | 单句子命题 | 原文指纹 | 信息结构 | 情绪变化 |
| --- | --- | --- | --- | --- | --- |
| 「每个目录检出不同分支……底层 Git 对象库仍由同一份仓库共享。」 | 从频繁切分支的痛点转入机制解释 | worktree 让多个目录隔离工作，却共享同一份 Git 历史 | 主目录、功能分支、热修分支、HEAD、提交历史 | 结构与关系 | 从被打断到清楚、稳定 |
| 「整个过程中，主目录的 `feature/search` 工作区始终保持原样……」 | 用 hotfix 例子证明 worktree 的价值 | 热修可以分流处理，不必打断正在进行的功能开发 | feature/search、hotfix、修复补丁、合并主线 | 并行流程 | 从突发打断到可控收口 |
| 「完成后，可以先查看每个任务的 diff 和测试结果……」 | 解释 Codex 的任务隔离与人类责任 | 并行 agent 的改动必须经过审查和测试，才进入主分支 | 隔离任务、审查测试、主分支、diff | 关系与流程 | 从并行探索到审慎合并 |

固定角色参考图：`/Users/debugger/bugcave/github/skills/fork/article-metaphor-illustrator/assets/wuxia-visual.png`。

## 插图说明清单

1. `01-worktree共享历史与独立工作区.webp`：插在「一个本地分支通常只能同时被一个 worktree 检出。」之后，解释共享提交历史与独立工作区的关系。
2. `02-worktree-hotfix并行流程.webp`：插在完整 hotfix 示例结束后，说明功能开发不中断、热修独立分流、最终合并的顺序。
3. `03-codex隔离任务审查合并.webp`：插在 Codex、Git worktree 与开发者职责表之后，强调隔离任务不等于自动进入主线。

## 构思卡

### 01：共享历史与独立工作区

| 字段 | 内容 |
| --- | --- |
| 插入位置 | 「一个本地分支通常只能同时被一个 worktree 检出。」之后 |
| 图型 / 任务 | 结构 + 关系图 / 解释 |
| 画幅 | 16:9 横向，1536 × 864 |
| 单一命题 | 多个 worktree 的文件、HEAD 与未提交改动相互隔离，但它们连接到同一份提交历史。 |
| 原文指纹 | 主目录、功能分支、热修分支、HEAD、共享 commit。 |
| 信息单位 / 组织 | 左右两个工作目录，以中间提交脊柱连接；左右对称，细线体现共享关系。 |
| 重复与重量 | 两个大型文件夹、一个提交脊柱；三个主结构均衡，侠客约 8%。 |
| 标签规划 | 主目录、功能分支、热修分支；黑色文字，提交脊柱只用少量橙色强调。 |
| 阅读顺序 | 先看两个分开的目录，再看中间共享连接，最后理解隔离并非多 clone。 |
| 侠客动作 | 扶住中间连接线，成为共享关系的尺度与方向提示。 |
| 一秒 / 三秒目标 | 一秒看出两个独立目录；三秒看懂它们共用历史但不共用工作区。 |
| 删除项 | 不画完整 Git 命令、分支树、多人角色和额外卡片。 |

### 02：hotfix 并行流程

| 字段 | 内容 |
| --- | --- |
| 插入位置 | 「整个过程中，主目录的 `feature/search` 工作区始终保持原样。」之后 |
| 图型 / 任务 | 流程图 / 解释 |
| 画幅 | 16:9 横向，1536 × 864 |
| 单一命题 | 功能开发可持续向前，hotfix 在独立路径中修复后再合并，不需要来回切换分支。 |
| 原文指纹 | 功能开发、热修修复、补丁、合并主线。 |
| 信息单位 / 组织 | 上方直行功能路径；下方橙色 hotfix 分支从左向右汇入合并点。 |
| 重复与重量 | 三至四个节点；功能目录、热修目录、合并检查点，体量均衡。 |
| 标签规划 | 功能开发、热修修复、合并主线；黑色标签，hotfix 路径为橙色。 |
| 阅读顺序 | 先看不被打断的上方路径，再沿橙色分支走向补丁，最后到合并点。 |
| 侠客动作 | 带着补丁沿 hotfix 路径行走，直接承担分流与修复动作。 |
| 一秒 / 三秒目标 | 一秒看出一条主线和一条分支；三秒看懂它们并行而非相互打断。 |
| 删除项 | 不画命令行、stash、多人协作、复杂分支网。 |

### 03：Codex 隔离任务、审查与合并

| 字段 | 内容 |
| --- | --- |
| 插入位置 | Codex、Git worktree 与开发者职责表之后 |
| 图型 / 任务 | 关系 + 流程图 / 区分 |
| 画幅 | 16:9 横向，1536 × 864 |
| 单一命题 | Codex 可以并行处理隔离任务，但所有改动都应先通过开发者审查和测试再进入主分支。 |
| 原文指纹 | 修 bug、补测试、整理文档三个任务，审查测试，主分支。 |
| 信息单位 / 组织 | 左侧三个任务岛，非交叉路径汇聚到审查门，再通往右侧提交线。 |
| 重复与重量 | 三个任务岛各有不同图标；一个审查门为核心但不超过画面 20%。 |
| 标签规划 | 隔离任务、审查测试、主分支；黑色标签，已审查路径和门用橙色。 |
| 阅读顺序 | 先看分开的任务，再看汇聚到检查点，最后理解主分支不是任务的直接出口。 |
| 侠客动作 | 手持放大镜检查汇聚处，明确人负责审查而非装饰。 |
| 一秒 / 三秒目标 | 一秒看出多个任务汇聚；三秒理解隔离执行与合并决策是两件事。 |
| 删除项 | 不画完整 IDE、过多 agent、代码细节和第二个审核关卡。 |

## 可读性验证

三张图均通过：一秒测试、三秒测试、原文指纹测试、删减测试、图型测试、无文结构测试、重复审美测试和眯眼平衡测试。图中仅保留短标签；核心关系依靠文件夹、路径、汇聚和提交线表达。

## 完整生图提示词

### 01：共享历史与独立工作区

```text
The central recognizable article anchor is one shared Git commit archive feeding two independent working folders, clearly visible and not omitted. Diagram type: structure and relationship diagram. Strict 16:9 landscape composition, not 3:2, not square, not portrait. A central slim commit archive shown as a stacked commit spine, with two separate open folder workspaces on the left and right; each folder has its own tiny HEAD pointer and unstaged paper sheet, but both connect to the same archive with clean thin lines. This shows one repository, multiple isolated work directories. The recurring chibi Chinese young wuxia swordsman mascot is small at the bottom center, using one hand to hold the shared connection line steady while looking at both folders; use the provided wuxia mascot image as the strict character reference for body shape, hairstyle, clothing and color palette. Preserve the chibi Chinese young swordsman identity: large head and small agile body, near-black dark burgundy long hair, asymmetric long bangs covering one eye, high tied hair with a dark blue ribbon, one visible narrow gray-blue eye, two dark cinnabar cheek marks, deep indigo navy and gray-blue Chinese wuxia outfit, dark blue wrist wraps, one Chinese short sword with a brown-gold tassel. The character occupies only 8 percent of canvas and supports the reading direction, not focal point. Include only these exact short Chinese labels in natural handwritten style, no additional text: 主目录, 功能分支, 热修分支. Black labels for objects, one small warm orange accent only on the shared commit spine. Reading order: first see two clearly separated work folders, then their thin connections, finally understand they share a history without sharing uncommitted files. Three large structures maximum, balanced visual weight, no ordinary module over 15 percent. Avoid mechanical repeated boxes and PowerPoint grid. Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, slightly organic hand-drawn edges, sparse thin interior detail lines, large areas of clean negative space, clean white background, mostly monochrome black ink with one small warm orange accent, crisp readable silhouettes, clear information hierarchy, no watercolor wash, no pencil shading, no hatching, no heavy paper grain, no complex texture, no watermark, no border.
```

### 02：hotfix 并行流程

```text
The central recognizable article anchor is a feature development workspace continuing untouched while a separate hotfix branch leaves, fixes an incident, and returns as a reviewed merge path; clearly visible and not omitted. Diagram type: process diagram with two parallel lanes. Strict 16:9 landscape composition, not 3:2, not square, not portrait. On the upper lane a calm open folder with a small code page continues straight toward the right, representing feature development. From its left side, a single orange branching path descends to a lower lane: a small bug marker is repaired in a second isolated folder, then a thin path rises to a final merge checkpoint on the right. Use three to four distinct nodes only, left-to-right reading. The recurring chibi Chinese young wuxia swordsman mascot is small at the lower branching point, walking along the orange hotfix path while holding a tiny repair patch, directing the eye from branch to merge; use the provided wuxia mascot image as strict character reference: large head, small agile body, near-black dark burgundy long hair, asymmetric bangs hiding one eye, high tied hair with dark blue ribbon, one visible narrow gray-blue eye, two dark cinnabar cheek marks, deep indigo navy and gray-blue Chinese wuxia outfit, dark blue wrist wraps, Chinese short sword with brown-gold tassel. Character only 8 percent of canvas. Include only these exact short Chinese handwritten labels beside objects, no additional text: 功能开发, 热修修复, 合并主线. Labels black, main hotfix path orange. Reading order: first see the feature lane stays straight, then follow the one branch through repair, finally understand no stash or branch switching is required. Balanced visual weight, no box larger than 15 percent, no more than three repeated elements, clean arrow directions. Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive line weight, organic hand-drawn edges, sparse thin interior details, large clean negative space, white background, mostly monochrome black ink with one small warm orange accent color only, crisp readable silhouettes, no watercolor wash, no pencil shading, no hatching, no heavy paper grain, no complex texture, no watermark, no border.
```

### 03：Codex 隔离任务、审查与合并

```text
The central recognizable article anchor is three isolated Codex agent worktrees converging through a human review and test gate into one main branch, clearly visible and not omitted. Diagram type: architecture and process relationship diagram. Strict 16:9 landscape composition, not 3:2, not square, not portrait. On the left, show three non-identical small isolated workspace islands, one with a bug patch, one with a test check, one with a document page; use thin separate paths that converge into a single central review gate with a magnifying glass and checkmark, then one clean path to a right-side main branch commit line. The recurring chibi Chinese young wuxia swordsman mascot is small beside the review gate, holding the magnifying glass toward the converging changes; use provided wuxia mascot image as strict character reference: large head and small agile body, near-black dark burgundy long hair with asymmetric bangs covering one eye, high back-tied hair with dark blue ribbon, one visible narrow gray-blue eye, two dark cinnabar diagonal cheek marks, deep indigo navy and gray-blue Chinese wuxia outfit, dark blue wrist wraps, Chinese short sword with a brown-gold tassel. The character occupies only 8 percent of canvas and must direct review, not dominate image. Include only these exact short Chinese handwritten labels near objects, no additional text: 隔离任务, 审查测试, 主分支. Black labels for objects, warm orange only for the reviewed path and gate. Reading order: first see separate task islands, then follow paths to one review gate, finally understand Codex tasks are isolated but changes require human review before merging. No more than three task islands, no repeated grid, clear non-crossing lines, balanced visual weight; ordinary modules under 15 percent, core gate under 20 percent. Minimalist bold-line hand-drawn editorial illustration, strong confident black ink contours with expressive variation in line weight, slightly organic hand-drawn edges, sparse thin interior detail lines, large clean negative space, clean white background, mostly monochrome black ink with one small warm orange accent, crisp readable silhouettes, no watercolor wash, no pencil shading, no hatching, no heavy paper grain, no complex texture, no watermark, no border.
```
