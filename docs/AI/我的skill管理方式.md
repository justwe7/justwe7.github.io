# 我的 Skill 管理方式：集中维护，项目按需启用

同时使用 Codex、Claude Code 这类 coding agent 后，Skill 很容易越装越乱。

一开始只是想让某个项目能用一个工具，后来会慢慢变成几套目录并存：Codex 有一套入口，Claude Code 有一套入口，老项目里还残留旧目录。某个 Skill 修了一版，只改到了其中一个地方；另一个项目继续用旧版本。时间久了，问题不在于“有没有 Skill”，而在于我已经说不清哪一份才是真的。

所以我现在的做法很明确：**Skill 源码集中放在一个仓库里维护，具体项目只通过软链接按需启用。**

这篇笔记记录的是我当前在本机使用的管理方式。它不是通用最佳实践，而是一套适合个人多项目、多 Agent 使用的维护模型。整理这套思路时，也参考了 dotey 在 X 上关于 Skill 管理的讨论线索。[^1]

---

## 一、我想解决的问题

Skill 本质上是一段给 Agent 读取的能力说明。它可以描述写文档的流程、生成配图的规则，也可以封装某类项目的操作习惯。它的问题在于：一旦复制到多个地方，就会立刻产生版本分叉。

以前混乱主要来自三类情况。

第一类是 **Agent 入口不同**。Codex 主要读取 `.agents/skills`，Claude Code 读取 `.claude/skills`。如果同一个 Skill 在两个目录里各放一份，很快就会出现一边更新、另一边没更新。

第二类是 **全局和项目混用**。全局安装看起来省事，但也会让所有项目都看到同一批 Skill。项目越多，误触发和上下文污染的概率越高。

第三类是 **来源不清楚**。有些 Skill 是自己写的，有些是 fork 后改的，有些是第三方原版，有些来自 npx 安装器。它们的维护策略不一样，如果都堆在同一个目录里，后续更新和回退都会变得很费劲。

我希望最终达到几个目标：

- 每个 Skill 只有一份可信源。
- 每个项目只启用自己需要的 Skill。
- Codex 和 Claude Code 可以单独启用，也可以共存。
- 安装动作可重复、可验证，不覆盖项目里已有的真实目录。
- 第三方、fork、自写和实验来源能分清楚，避免后续维护时搞混。

---

## 二、核心原则：源和入口分开

这套方案的关键不是某个脚本，而是一个简单原则：

> **源目录集中维护，项目目录只保留入口。**

我把所有 Skill 的源放在这个仓库：

```text
/Users/debugger/bugcave/github/skills
```

具体项目里不复制 Skill 内容，只创建软链接。例如某个项目需要启用 `write-docs-note`，Codex 的入口可以是：

```text
<project>/.agents/skills/write-docs-note
  -> /Users/debugger/bugcave/github/skills/mine/write-docs-note
```

Claude Code 的入口可以是：

```text
<project>/.claude/skills/write-docs-note
  -> /Users/debugger/bugcave/github/skills/mine/write-docs-note
```

这样做以后，项目里看到的是入口，真正维护的是源。源目录更新后，所有指向它的项目都会读到同一份新内容。

这比复制更适合我的场景。复制适合一次性分发，软链接适合长期维护。Skill 这种东西经常会根据使用反馈调整规则、补充边界、修正文案，显然更适合后者。

---

## 三、源仓库的目录分层

当前源仓库不是把所有内容平铺，而是按来源和用途分层：

```text
/Users/debugger/bugcave/github/skills/
  upstream/    # 第三方原版 Skill，只更新，不直接改
  fork/        # fork 后本地维护的第三方 Skill
  mine/        # 自己编写和维护的 Skill
  npx/         # npx 安装器生成或实验的 Skill 组，当前先不纳入索引
  profiles/    # 项目级 Agent 文案模板
  registry.json
  index.html
  README.md
  AGENTS.md
```

这里最重要的是不要把几类东西混在一起。

`upstream/` 放第三方原版。如果需要修改，不直接在这里动，而是迁移到 `fork/`。这样以后还可以对比上游变化。

`fork/` 放我接管维护的第三方 Skill。比如当前的 `article-metaphor-illustrator`，它原本是文章配图相关 Skill，我在本地维护后，就把它作为可安装的个人 Skill 管理。

`mine/` 放我自己写的 Skill。比如 `write-docs-note`，它用于把零散知识、经验和材料整理成结构清晰的中文笔记。

`npx/` 暂时只保留，不进入索引。原因是 npx 安装器生成的内容往往是一整组 Skill，而不是一个独立目录对应一个能力。现在强行把它们拆成单个条目，容易把模型做复杂，所以我先不纳入主流程。

`profiles/` 放项目级 Agent 文案模板。它不是 Skill，而是项目启动规则，例如前端、Flutter、Node 项目的 `AGENTS.md` 模板。这个目录单独存在，是为了避免把“可触发能力”和“项目规则”混为一谈。

---

## 四、Skill 和 Project Profile 的区别

在这个仓库里，我刻意区分了两类东西。

| 类型 | 放置位置 | 作用 | 典型安装方式 |
|---|---|---|---|
| Skill | `fork/`、`mine/` | 给 Agent 增加某类可触发能力 | 项目内软链接 |
| Project Profile | `profiles/` | 给某类项目提供基础工作规则 | 默认复制初始化，也可软链或本地引用 |

Skill 的例子：

- `fork/article-metaphor-illustrator`：为文章规划并生成手绘配图。
- `mine/write-docs-note`：把知识、经验、材料整理成中文笔记。

Project Profile 的例子：

- `profiles/frontend`：前端项目 Agent 规则。
- `profiles/flutter`：Flutter 项目 Agent 规则。
- `profiles/node`：Node.js 项目 Agent 规则。

二者的生命周期不一样。

Skill 适合软链接，因为它应该长期跟随源仓库更新。比如我改进了 `write-docs-note` 的写作规则，希望所有启用它的项目都能读到新版。

Project Profile 默认更适合复制初始化。因为一个项目的 `AGENTS.md` 往往会逐渐加入项目自己的规则。如果直接整文件软链到中央模板，项目本地定制就不方便。只有在确认某个项目完全服从中央模板时，才适合整文件软链。

如果既想保留项目本地规则，又想持续引用中央模板，可以用“本地引用”模式：项目保留自己的 `AGENTS.md`，再软链接一个 `.agent-profiles/<profile>.agents.md`，并在项目规则里要求 Agent 开始任务前读取它。

---

## 五、registry.json 和 index.html 的角色

源仓库里有两个辅助文件：

```text
registry.json
index.html
```

`registry.json` 是索引数据。它记录当前有哪些可安装 Skill、有哪些 Project Profile、它们的源路径、目标路径和标签。页面和 Agent 都应该读取这个文件，而不是靠人脑记目录。

当前 `registry.json` 的范围是：

- 扫描 `fork/*/SKILL.md`
- 扫描 `mine/*/SKILL.md`
- 扫描 `profiles/*/profile.json`
- 暂时忽略 `upstream/`
- 暂时忽略 `npx/`

截至当前仓库状态，索引里有 2 个 Skill：

| Skill | 来源 | 用途 |
|---|---|---|
| `article-metaphor-illustrator` | `fork` | 给文章规划并生成可读性强的手绘配图 |
| `write-docs-note` | `mine` | 编写、扩写、重组中文知识笔记 |

还有 3 个 Project Profile：

| Profile | 用途 |
|---|---|
| `frontend` | Web 前端项目规则 |
| `flutter` | Flutter App 项目规则 |
| `node` | Node.js 后端、脚本或工具项目规则 |

`index.html` 是本地可视化页面。它只读取 `registry.json`，用于搜索、查看条目，并复制安装提示词或命令。这样我不用每次手写路径，也能减少软链接写错的概率。

启动方式很简单：

```bash
cd /Users/debugger/bugcave/github/skills
python3 -m http.server 8765
```

然后打开：

```text
http://localhost:8765/index.html
```

不建议直接用 `file://` 打开，因为浏览器可能阻止页面读取旁边的 `registry.json`。

---

## 六、项目里如何启用 Skill

在某个项目里启用 Skill 时，我只创建项目内入口，不复制源目录。

Codex 的默认目标目录是：

```text
.agents/skills
```

Claude Code 的默认目标目录是：

```text
.claude/skills
```

以 `write-docs-note` 为例，Codex 入口大致是：

```bash
mkdir -p .agents/skills
ln -sfn "/Users/debugger/bugcave/github/skills/mine/write-docs-note" ".agents/skills/write-docs-note"
```

Claude Code 入口大致是：

```bash
mkdir -p .claude/skills
ln -sfn "/Users/debugger/bugcave/github/skills/mine/write-docs-note" ".claude/skills/write-docs-note"
```

如果一个项目两边都用，就创建两条软链接；如果只用其中一个，就只创建对应入口。

我不会把 `.claude/skills` 直接链接到 `.agents/skills`。这种做法看起来省事，但会带来边界问题：当我只想给 Claude Code 装一个 Skill 时，实际上也把 Codex 的入口暴露出来了。现在的规则是入口可以有两套，但源只有一套。

安装后要做最小验证：

```bash
test -L .agents/skills/write-docs-note
test -r .agents/skills/write-docs-note/SKILL.md
```

Claude Code 对应：

```bash
test -L .claude/skills/write-docs-note
test -r .claude/skills/write-docs-note/SKILL.md
```

这里验证的是两件事：入口确实是软链接，并且通过入口能读到 `SKILL.md`。

---

## 七、安全规则：宁可停下，也不要覆盖

软链接安装看起来只是两行命令，但真正重要的是冲突处理。

我的规则是：

1. 源目录必须存在，并且里面有可读的 `SKILL.md`。
2. 目标路径不存在时，才创建软链接。
3. 目标路径已经是软链接且指向同一源时，保持不变。
4. 目标路径如果是普通文件、普通目录，或者软链接指向别处，就停下，不直接覆盖。
5. 创建后必须验证目标路径和 `SKILL.md` 可读。

这条规则解决的是“项目已有内容不能被工具误删”的问题。尤其是 `.agents/skills` 或 `.claude/skills` 下可能已经有手工维护的内容，不能因为我要启用一个新 Skill 就把它覆盖掉。

如果 Agent 因为沙箱权限无法创建指向源仓库的软链接，正确做法是按相同源路径和目标路径申请提升权限后重试，而不是退而求其次复制一份 Skill。复制会破坏这套管理方式的核心假设。

---

## 八、项目级 Agent 文案怎么处理

除了 Skill，我还把项目级 Agent 文案放进同一个仓库的 `profiles/` 目录。

这类文案解决的是另一类问题：不同技术栈的项目，开始工作前应该读取哪些上下文、遵守哪些编码边界、运行哪些验证命令。

例如：

- 前端项目要关注组件、样式、响应式、交互状态和浏览器检查。
- Flutter 项目要关注 `pubspec.yaml`、Widget 组织、状态管理、国际化和 `flutter analyze`。
- Node 项目要关注 `package.json`、模块边界、错误处理、配置、测试和构建。

这些规则不是某个任务触发的 Skill，而是项目的长期工作约束。

我给 Project Profile 保留三种安装方式：

| 模式 | 适用场景 |
|---|---|
| `copy` | 默认方式，把模板复制成项目的 `AGENTS.md` 或 `CLAUDE.md`，后续项目自己维护 |
| `symlink` | 整个项目规则都想跟随中央模板更新 |
| `reference` | 项目有自己的规则，但额外引用中央模板 |

默认选择 `copy`。原因很简单：项目级规则通常会变成项目资产，而不是永远由中央仓库控制。Skill 更像可复用工具，Profile 更像项目初始化模板，这两者不能用同一个心智模型。

---

## 九、我现在怎么新增或更新

新增 Skill 时，我先判断来源。

如果是第三方原版，放到 `upstream/`。如果需要本地修改，就迁到 `fork/`。如果是自己写的，就放到 `mine/`。当前版本只把 `fork/*/SKILL.md` 和 `mine/*/SKILL.md` 作为可安装单个 Skill 进入索引。

新增后要保证 `SKILL.md` 有基本 front matter：

```md
---
name: my-skill
description: 什么时候应该使用这个 Skill。
---
```

然后重新生成 `registry.json`，确认：

- JSON 合法。
- `summary` 数量和实际目录一致。
- 每个 Skill 的源路径、Codex 目标路径、Claude Code 目标路径正确。
- `index.html` 仍然只读取 `registry.json`，没有硬编码条目。

更新已有 Skill 时，我会先看仓库差异：

```bash
git status --short
git diff --stat
git diff -- <skill-path>
```

确认变化后再更新索引。这样做虽然多一步，但能避免“我以为只改了一个说明，实际动了很多文件”的情况。

---

## 十、这套方式的代价

这套方式不是零成本的。

首先，它要求我维护一个中央仓库。源路径、索引、页面、安装规则都要保持一致。如果这个仓库本身没人维护，项目里的软链接迟早会变成一堆失效入口。

其次，它要求我接受“入口可以重复”。同一个 Skill 可能同时出现在 `.agents/skills` 和 `.claude/skills`，但这不是重复维护，因为二者都指向同一份源。这个代价换来的是 Codex 和 Claude Code 的边界清楚。

再次，它没有急着处理所有来源。`npx/` 现在被保留但不纳入索引，就是因为它的结构更像 Skill 组，而不是个人维护的单个 Skill。先把 `fork/`、`mine/` 和 `profiles/` 跑稳，比急着支持所有来源更重要。

最后，软链接对路径有依赖。如果中央仓库移动位置，已有项目里的链接就会失效。因此源仓库路径最好稳定，不要频繁搬家。

---

## 十一、当前状态和后续计划

截至当前仓库状态，我的 Skill 管理系统已经有了最小闭环：

- 中央仓库：`/Users/debugger/bugcave/github/skills`
- 可安装 Skill：`article-metaphor-illustrator`、`write-docs-note`
- 项目级 Profile：`frontend`、`flutter`、`node`
- 索引文件：`registry.json`
- 本地页面：`index.html`
- 项目启用方式：Codex / Claude Code 分别创建软链接

下一步不急着扩张数量，而是把规则稳定下来：

1. 继续把自维护 Skill 放在 `mine/` 和 `fork/`。
2. 保持 `registry.json` 由扫描结果生成，不手工零散改字段。
3. 项目里只做软链接，不复制 Skill 内容。
4. Project Profile 默认复制初始化，只有明确需要同步时才软链。
5. 等当前模型稳定后，再考虑如何把 `npx/` 这类 Skill 组纳入管理。

这套管理方式的核心结论可以压缩成一句话：

> **Skill 是能力源，项目只是入口；中央仓库负责维护，具体项目负责按需启用。**

只要这条边界守住，后续无论是新增 Skill、修正文案、给不同项目安装，还是同时支持 Codex 和 Claude Code，都不会再回到多目录复制、多版本漂移的混乱状态。

## 参考资料

[^1]: dotey — [关于 Skill 管理的 X 帖子](https://x.com/dotey/status/2069632132431929651) · X · 2026
