---
name: write-docs-note
description: Use when the user wants to write, fill in, or expand a note file under docs/ in the Obsidian/Docusaurus knowledge base, and provides a file path and topic description.
---

# Write Docs Note

## Overview

Guided workflow for writing knowledge-base notes in `docs/`. Outline first, then write. Notes should be practitioner-grade: explain mechanisms, include honest trade-offs, and ground abstract concepts in real scenarios.

## Workflow

```
READ file → UNDERSTAND topic → DRAFT outline → USER APPROVES → WRITE → DONE
```

### Step 1 — Read the target file(s)

Read every file the user points to. Note current state (empty / skeleton / partial) and any existing section titles — preserve them, only expand.

### Step 2 — Clarify scope (if needed)

If the topic is broad, ask ONE question:
> "这篇笔记侧重哪个方向？（工具使用 / 原理机制 / 实战案例）"

If the user's description is already specific, skip this.

### Step 3 — Draft outline

Present a numbered outline in Chinese. Wait for explicit approval before writing.

```
## 引言（可选，复杂主题才加）
## 一、[章节名]
## 二、[章节名]
...
## N、参考资源（可选）
```

Ask: "大纲是否符合预期？可以调整或直接开始写。"

### Step 4 — Write content

Write all sections in one pass (unless estimated >600 lines, then write 3-4 sections at a time).

---

## Writing Rules

### 结构（MUST follow）

- Language: 中文，技术术语保留英文
- 章节编号：`##` 级别用 一、二、三...；`###` 级别不加编号
- 每个 `##` 章节末尾加 `---` 分隔线
- 代码块必须标明语言（` ```bash `、` ```js ` 等）
- 表格用于：命令速查、选项对比、方法对比
- 注意事项用 blockquote（`>`）
- 图片引用：`![描述](/docs/文件名.png)`（图片存于 `static/docs/`）
- 无需 frontmatter（Docusaurus 自动处理侧边栏）

### 内容深度（来自参考文章的提炼）

**1. 先设问，再给答案**

不要直接堆定义。开头 1-3 句话说清楚"没有这个会遇到什么问题"，让读者先有感受：

```markdown
❌ Vue Router 是 Vue.js 官方路由库。
✅ 在多页应用里，每次跳转都刷整个页面——Vue Router 解决的就是这个问题：
   让页面切换不刷新，同时 URL 保持可分享。
```

**2. 工具/方法要讲工作原理**

"怎么用"之外，给出"为什么这样用"。复杂流程用编号步骤描述：

```markdown
### 工作原理

1. 请求到达时，中间件读取 Cookie 中的 token
2. 用密钥验证签名，解析出 userId
3. 把 userId 写进 `req.user`，后续 handler 直接取用
4. 验证失败则返回 401，不进入业务逻辑
```

**3. 均衡评估，不只写优点**

有利有弊才是真实的笔记。工具、方案、做法，都要有：

```markdown
### 优缺点

**适合用：**
- ✅ 大量重复性重构（测试通过 = 完成标准明确）
- ✅ 跨文件批量修改

**不适合用：**
- ❌ 架构决策（需要权衡取舍，不能自动化）
- ❌ 安全相关代码（漏洞往往很隐蔽）
```

**4. 用具体数字和案例**

模糊说法没有说服力，尽量给出真实场景或数据：

```markdown
❌ 性能有明显提升。
✅ 开启虚拟滚动后，10,000 行列表从卡顿 800ms 降到首帧 60ms。
```

**5. 连接散文，不只是列表**

不要把每个章节写成孤立的 bullet 堆。段落之间用 1-2 句话解释因果或过渡：

```markdown
❌
- 安装依赖
- 配置环境变量
- 启动服务

✅
安装依赖后，需要先配置好环境变量，否则服务启动时会因找不到密钥而直接报错：
```bash
npm install
export API_KEY=xxx
npm start
```

**6. 多方案时，最后给对比总结**

覆盖 2+ 种方法的笔记，结尾加一张横向对比表，帮读者做选择：

```markdown
## N、如何选择

| 方案 | 适合场景 | 缺点 |
|------|---------|------|
| A    | 快速原型 | 无错误处理 |
| B    | 生产环境 | 配置复杂 |
```

---

## Note Style Reference

```markdown
## 引言（复杂主题才加，2-4 句话）

说清楚"没有这个/不了解这个，会遇到什么问题"。

---

## 一、它是什么

1-2 句核心定义 + 解决的问题。

核心能力：
- 能力 A：一句话说明
- 能力 B：一句话说明

---

## 二、工作原理（复杂工具才加）

描述内部流程，用编号步骤或流程序列。

1. 第一步发生了什么
2. 第二步发生了什么
3. 最终产物是什么

---

## 三、安装与配置

> 注意事项用 blockquote

​```bash
# 推荐方式
brew install xxx
​```

---

## 四、基本使用

### 核心功能

| 功能 | 说明 |
|------|------|
| xxx  | yyy  |

​```js
// 完整可运行的示例，注释说明 why
​```

---

## 五、优缺点 / 适用场景

**适合用：**
- ✅ 场景 A

**不适合用：**
- ❌ 场景 B（原因）

---

## 六、常见问题

**Q：具体问题？** A：直接给解法，不绕弯。

---

## 七、参考资源（有必要才加）

| 资源 | 说明 |
|------|------|
| 官方文档 | `docs.xxx.com` |
```

---

## Common Mistakes

| 错误 | 修正 |
|------|------|
| 写 frontmatter | 不要写，Docusaurus 自动处理 |
| 用英文写正文 | 改中文 |
| 没给大纲就直接写内容 | 先出大纲等确认 |
| 只写优点，不写缺点 | 加"不适合用"场景 |
| 纯 bullet 堆砌，无连接 | 段落间加 1-2 句因果/过渡 |
| 写"总的来说""综上所述" | 直接删掉，跳到结论 |
| 用 `./img/x.png` 引用图片 | 改用 `/docs/x.png` |
| 覆盖多方案但没有对比表 | 结尾加横向对比总结 |
