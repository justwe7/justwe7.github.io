普通 AI 对话工具有个根本限制：你得把代码复制进去，它才能看到。项目稍微大一点，上下文就不够用了，每次都要手动拼装背景，改完还得自己去执行。Claude Code 解决的就是这个问题——让 AI 直接进入你的开发环境，而不是你把代码搬去找 AI。

---

## 一、Claude Code 是什么

Claude Code 是 Anthropic 推出的**终端 AI 编程工具**，直接在命令行运行，支持集成进 VS Code / Cursor / JetBrains。

区别于对话式 AI，它能：

- 读取整个代码库的上下文，不只是粘贴进去的片段
- 自主执行多步任务：读写文件、运行 shell 命令、调用外部工具
- 理解 Git 历史、项目结构、依赖关系
- 通过 MCP 协议接入第三方工具（数据库、浏览器、API 等）

**默认模型**：Claude Sonnet 4.5（日常任务），用 `/model` 切换 Opus 4.6（复杂任务）或 Haiku 4.5（轻量快速）。

---

## 二、工作原理

Claude Code 的核心是一个 **Agentic 循环**，理解这个循环才能用好它。

1. 你输入一个任务描述（自然语言）
2. Claude 先**探索上下文**：读取相关文件、查 Git 历史、理解项目结构
3. 制定执行计划，开始**逐步操作**：写文件、跑命令、验证结果
4. 每一步的输出会作为下一步的输入，Claude 根据反馈调整方向
5. 认为任务完成后停下，等待你的下一条指令

整个过程中你可以随时按 `Esc` 中断。每条指令执行前会自动创建 Checkpoint，出错可以 `/rewind` 回退。

> Claude 看到的上下文范围由"上下文窗口"决定。项目越大、对话越长，越容易超出限制。超出时用 `/compact` 压缩，或 `/clear` 重置后重新开始。

---

## 三、核心概念

| 概念             | 说明                                 |
| -------------- | ---------------------------------- |
| **Agentic 模式** | Claude 自主拆解任务、多步执行，中途可 `Esc` 中断    |
| **上下文窗口**      | Claude 当前能"看到"的内容范围，超出需压缩或重置       |
| **CLAUDE.md**  | 项目记忆文件，每次启动自动读取，持久保存项目背景           |
| **MCP 服务器**    | 扩展插件，让 Claude 能调用 GitHub、浏览器、数据库等  |
| **Skills**     | 自定义技能包，放在 `.claude/skills/`，按需加载执行 |
| **Hooks**      | 事件触发脚本，如编辑文件后自动跑 lint / 格式化        |
| **Checkpoint** | 每条指令自动创建还原点，`/rewind` 回滚，保留 30 天   |

---

## 四、安装与登录配置

### 安装

> `npm install -g @anthropic-ai/claude-code` 已废弃，不要用。

```bash
# macOS 推荐
brew install claude-code

# 更新（Homebrew 不自动更新，需手动执行）
brew upgrade claude-code
```

**Windows**：需先安装 Git for Windows，然后：

```bash
winget install Anthropic.ClaudeCode
# 或使用 WSL2（性能更好，推荐长期使用）
```

**Linux**：原生安装需要 `libgcc`、`libstdc++`、`ripgrep`。Alpine 等 musl 发行版需额外配置。

不习惯命令行的，可以下载官方 **macOS / Windows 桌面 App**，体验一致，零配置。

### 登录方式一：OAuth（官方账号）

需要 **Pro / Max / Team / Enterprise** 或 Console 账号，免费版不支持。

```bash
claude login
# 自动打开浏览器完成 claude.ai 授权
```

### 登录方式二：API Key

国内用户推荐这种方式，不依赖浏览器，也不受 OAuth 跳转的网络影响：

```bash
# 写进 ~/.zshrc 或 ~/.bash_profile，永久生效
export ANTHROPIC_API_KEY="sk-ant-xxxx"

# 或者命令行直接配置
claude config set api_key sk-ant-xxxx
```

API Key 在 [console.anthropic.com](https://console.anthropic.com) 生成，按 token 计费，无月费限制。

### 验证

```bash
claude doctor      # 检查环境、登录状态、网络连通性
claude --version
```

---

## 五、与 Prompt 工程的区别

两者不是替代关系，而是不同层次的工具。

| 维度   | Prompt 工程      | Claude Code    |
| ---- | -------------- | -------------- |
| 操作方式 | 手动复制代码到对话框     | 直接访问整个代码库      |
| 执行能力 | 只给建议，人来执行      | 自主写文件、跑命令      |
| 上下文  | 每次手动拼装         | 自动读取项目结构       |
| 适合任务 | 单点问题、创意生成、解释说明 | 多步重构、跨文件修改、自动化 |
| 学习成本 | 低，开箱即用         | 需要了解权限模型和工作流   |
| 可控程度 | 高，每步都是你在执行     | 低，AI 自主操作，需要审查 |

Prompt 工程更像"问 AI"，Claude Code 更像"让 AI 干活"。前者你全程掌控，后者你需要信任 AI 的判断——所以**复杂任务先让 Claude 出计划，确认后再执行**，而不是直接说"帮我改项目"。

---

## 六、适用 / 不适用场景

### ✅ 适合用

- **批量重复性修改**：把项目里所有 `var` 改成 `const/let`，补全 JSDoc 注释，统一错误处理格式
- **跨文件联动修改**：加一个新功能，涉及 router、controller、service、test 多层文件
- **代码理解**：解释一段陌生代码的执行流程，追踪某个 bug 的调用链
- **有明确验收标准的任务**：测试全部通过、构建成功、类型检查无报错——AI 能自我验证是否完成

### ❌ 不适合用

- **架构决策**：微服务还是单体、用哪个状态管理库——这些需要你来权衡，不能甩给 AI
- **安全相关代码**：认证、加密、权限逻辑，AI 可能引入不易察觉的漏洞，必须人工审查
- **需求模糊的探索**：没有明确目标时，AI 会自己补充假设，结果可能偏离预期
- **一次性简单任务**：改一行代码、查一个 API 用法，直接问对话 AI 更快

---

## 七、国内使用注意事项

Claude Code 需要访问 `api.anthropic.com` 和 `claude.ai`，**国内必须挂代理**。

### 配置终端代理

系统代理对终端通常不生效，必须显式设置环境变量：

```bash
# 写进 ~/.zshrc，每次启动终端自动生效
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
# 端口根据你的代理工具调整（Clash 默认 7890，其他工具自查）
```

### OAuth 登录卡住

OAuth 需要浏览器能打开 `claude.ai`，如果浏览器代理和终端代理不同步，会卡在授权页没有反应。

**直接解法**：换用 API Key 登录，完全走终端，绕开浏览器授权流程。

### VPN 断线

断线后 Claude Code 会报网络错误，当前任务中断。重连代理后重新发起请求即可，之前的 Checkpoint 还在，可以 `/rewind` 回退到中断前的状态继续。

### 速率限制

Pro 账号高峰期可能触发限流（报 `529 Overloaded`）。稍等几分钟重试，或改用 API Key 模式按量计费，不受订阅限流影响。

---

## 八、常用指令速查

### 会话管理

| 指令 | 作用 |
|------|------|
| `/clear` | 清空对话，释放 token（新任务前必用） |
| `/compact` | 压缩长对话，保留关键上下文 |
| `/resume` | 恢复历史会话（支持多终端共享上下文） |
| `/rewind` | 回滚到上一个 Checkpoint |
| `/cost` | 查看当前会话 token 消耗 |

### 配置与信息

| 指令 | 作用 |
|------|------|
| `/init` | 初始化项目 CLAUDE.md |
| `/memory` | 查看和编辑 CLAUDE.md |
| `/model` | 切换模型（Sonnet / Opus / Haiku） |
| `/status` | 查看当前模型和配置状态 |
| `/help` | 查看全部命令列表 |

### 扩展功能

| 指令 | 作用 |
|------|------|
| `/mcp` | 管理 MCP 服务器连接 |
| `/agents` | 管理和启动子 Agent |
| `/branch` | 分支当前会话（原 `/fork`，v2.1.77 改名） |
| `/bug` | 向 Anthropic 报告 Bug |
| `/install-github-app` | 安装 Claude 到 GitHub，自动 review PR |

> 在提示符前加 `!` 可直接执行 shell 命令，如 `! git status`。

---

## 九、核心配置项

### CLAUDE.md — 项目记忆

每次启动自动读取，省去重复解释项目背景。支持三个层级，Claude 会自动发现并叠加：

| 文件路径 | 作用范围 |
|---------|---------|
| `~/.claude/CLAUDE.md` | 全局，所有项目生效 |
| `./CLAUDE.md` | 当前项目根目录 |
| `./src/CLAUDE.md` | 子目录级别 |

写什么进去：技术栈、常用命令、编码规范、目录结构、不能碰的地方。对话中用 `# 内容` 可以快速追加到当前项目的 CLAUDE.md。

### .claudeignore — 排除文件

语法同 `.gitignore`，排除不需要 Claude 读取的文件，既减少无效 token，也避免敏感信息泄露：

```gitignore
node_modules/
dist/
build/
.env
.env.*
*.pem
package-lock.json
```

### settings.json — 行为配置

位于 `.claude/settings.json`：

```json
{
  "model": "claude-sonnet-4-6",
  "hooks": {
    "afterEdit": ["prettier --write $FILE"],
    "afterSave": ["tsc --noEmit"]
  }
}
```

Hooks 在特定事件后自动触发脚本，适合编辑后自动格式化、保存后跑类型检查。

### 自定义斜杠命令

在 `.claude/commands/` 下新建 `命令名.md`，内容是自然语言指令：

```markdown
<!-- .claude/commands/review.md -->
对最近的代码改动做全面 review，检查类型安全、错误处理和测试覆盖率。
```

输入 `/review` 触发。支持 `$ARGUMENTS` 传参，如定义 `/fix-issue $ARGUMENTS`，使用时输入 `/fix-issue 123`。

---

## 十、进阶技巧

### EPEC 框架 — 大任务必用

不要直接让 Claude "帮我改项目"，分四步走，质量和可控性都会大幅提升：

```
Explore（探索）→ Plan（计划）→ Execute（执行）→ Commit（提交）
```

1. **Explore**：让 Claude 先浏览代码库，理解上下文
2. **Plan**：让 Claude 生成详细计划，你确认后再执行
3. **Execute**：分步执行，随时可以 `Esc` 中断调整
4. **Commit**：让 Claude 生成规范的 commit message

### @文件名 — 精准引用上下文

提示词里输入 `@文件名` 可将指定文件加入当前上下文，让 Claude 聚焦于特定代码而不是扫描整个项目：

```
@src/auth/middleware.ts 帮我分析这个中间件的执行流程
```

### Esc+Esc 时光机 — 会话分支

`/rewind` 是回滚到上一个 Checkpoint，而**双击 Esc** 是跳回任意对话历史节点。跳回后可以 `/branch` fork 出新分支，在不同方向上反复尝试，不影响原有会话。

### 并行子 Agent — 多线程开发

用 `/agents` 启动独立子 Agent，每个有自己的上下文，可同时处理不同模块：

```
主线程：协调整体进度
子 Agent 1：重构 API 层
子 Agent 2：更新前端组件和测试
```

适合大型重构、同时开发多个 feature 的场景。

### GitHub PR 自动 Review

```bash
/install-github-app
```

安装后 Claude 会自动 review PR，发现逻辑问题和安全漏洞。可以在 `.github/claude-code-review.yml` 自定义 review 重点：

```yaml
direct_prompt: |
  只报告 bug 和安全漏洞，不要评论代码风格。
```

### --dangerously-skip-permissions 标志

Claude Code 默认对每个文件操作都请求确认。批处理或自动化脚本场景下可以跳过：

```bash
claude --dangerously-skip-permissions
```

> 日常开发建议保留确认步骤，防止误操作。仅在你完全信任当前任务时使用。

### 省 token 三板斧

1. 新任务前 `/clear`，不让旧对话消耗 token
2. 长会话用 `/compact` 压缩，保留关键上下文
3. 配好 `.claudeignore`，排除 `node_modules/`、`dist/`、`*.lock` 等大文件
