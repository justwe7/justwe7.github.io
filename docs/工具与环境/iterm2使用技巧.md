# iTerm2 使用技巧

macOS 自带的 Terminal 够用，但碰到需要分屏、持久 Session、Hotkey 快速呼出、Shell 深度集成的场景时会频繁卡壳。iTerm2 把这些全覆盖了，配置好之后几乎不需要再换别的终端。

---

## 一、窗口与分屏

iTerm2 的窗口层级是：Window → Tab → Pane（分屏）。日常操作围绕这三层展开。

### 标签管理

| 操作 | 快捷键 |
|------|--------|
| 新建标签 | `⌘T` |
| 关闭标签 | `⌘W` |
| 切换到下一个标签 | `⌘→` 或 `⌘⇧]` |
| 切换到上一个标签 | `⌘←` 或 `⌘⇧[` |
| 跳转到第 N 个标签 | `⌘1` ~ `⌘9` |

### 分屏

| 操作 | 快捷键 |
|------|--------|
| 左右分屏 | `⌘D` |
| 上下分屏 | `⌘⇧D` |
| 关闭当前 Pane | `⌘W` |
| 在 Pane 间切换 | `⌘⌥←` / `⌘⌥→` / `⌘⌥↑` / `⌘⌥↓` |
| 最大化当前 Pane | `⌘⇧Enter`（再按一次还原） |
![](../../static/docs/Pasted%20image%2020260410102755.png)
分屏适合同时看日志 + 跑命令，或者一边编辑一边 watch 输出，不需要专门开多个窗口。

---

## 二、常用快捷键速查

### 会话与窗口

| 操作 | 快捷键 |
|------|--------|
| 新建窗口 | `⌘N` |
| 全屏切换 | `⌘Enter` |
| 清屏（保留历史） | `⌘K` |
| 清除当前行 | `⌃U` |
| 退出当前进程 | `⌃C` |
| 退出 shell | `⌃D` |

### 光标与文本操作

| 操作 | 快捷键 |
|------|--------|
| 跳到行首 | `⌃A` |
| 跳到行尾 | `⌃E` |
| 向前删一个词 | `⌃W` |
| 删到行首 | `⌃U` |
| 删到行尾 | `⌃K` |
| 按词前跳 | `⌥←` |
| 按词后跳 | `⌥→` |

> `⌥←` / `⌥→` 需要在 Preferences → Profiles → Keys 中确认 Option 键行为设置为 `Esc+`，否则不生效。

### 搜索与历史

| 操作 | 快捷键 |
|------|--------|
| 搜索当前 Session 内容 | `⌘F` |
| 历史命令搜索 | `⌃R`（zsh 内置） |
| 向上翻页 | `⌘↑` |
| 向下翻页 | `⌘↓` |

---

## 三、选中与复制技巧

iTerm2 的选中交互和普通编辑器有几处差异，用熟了效率很高。

**选中即复制**：鼠标划选文本后自动写入剪贴板，不需要 `⌘C`。这是默认行为，可在 Preferences → General → Selection 中开关。

**智能选中**：
- 双击选中一个词
- 三击选中整行
- 双击 URL 会识别完整地址（含括号、斜杠等）

**搜索高亮后复制**：`⌘F` 打开搜索框，找到匹配内容后按 `Enter` 跳转，此时匹配文本已在选中状态，可直接 `⌘C`。

**Semantic History**：按住 `⌘` 单击文件路径会直接用默认编辑器打开文件，单击 URL 会在浏览器里打开。对日志里的路径特别好用。

---

## 四、Shell Integration

Shell Integration 是 iTerm2 和 shell 之间的通信层，装完之后终端会"理解"命令的边界和状态，而不只是被动显示文字。

### 安装

```bash
curl -L https://iterm2.com/shell_integration/zsh -o ~/.iterm2_shell_integration.zsh
echo 'source ~/.iterm2_shell_integration.zsh' >> ~/.zshrc
source ~/.zshrc
```

安装后每个命令的提示符旁边会出现一个小三角标记。

### 带来的能力

**跳转上一个命令的输出**：`⌘⇧↑` / `⌘⇧↓` 可以在各条命令的输出块之间跳转，不需要手动翻滚找边界。

**命令完成通知**：长时间运行的命令结束后，如果 iTerm2 窗口不在前台，会弹出系统通知。

**上传 / 下载文件**：
```bash
# 从远程机器下载文件到本地（在 ssh 会话里执行）
it2dl /path/to/remote/file

# 上传本地文件到远程（在 ssh 会话里执行）
it2ul
```

**显示图片**：
```bash
imgcat image.png
```
![](../../static/docs/Pasted%20image%2020260410112109.png)
图片会直接内联渲染在终端里，不需要打开单独的预览窗口。

---

## 五、Hotkey Window

Hotkey Window 是一个全局快捷键呼出的悬浮终端，任何应用里按一次快捷键就能弹出来，再按一次收起。适合快速执行一条命令、查个值、然后立刻回到原来的应用。

### 配置方式

1. Preferences → Profiles → 新建或选择一个 Profile
2. Keys → Hotkey Window → 勾选 `A hotkey opens a dedicated window with this profile`
3. 设置快捷键（比如 `⌥Space` 或 `⌥\``）
4. 可以调整窗口是否跟随当前屏幕、是否透明、是否动画滑入

![](../../static/docs/Pasted%20image%2020260410102727.png)

### 使用建议

- 把 Hotkey Window 的 Profile 和日常 Profile 分开，比如单独设置透明度高一点、尺寸小一点
- 勾选 `Pin hotkey window`：窗口不会因为切换应用而自动收起
- 勾选 `Animate showing and hiding`：开合有滑动动画，视觉上更自然

---

## 六、Profiles 与配置建议

Profile 是 iTerm2 里一套完整的终端配置（字体、颜色、行为、快捷键、透明度等），可以同时存多个，不同场景切换使用。

### 多 Profile 的典型用法

- **默认 Profile**：日常开发，浅色或深色主题
- **SSH Profile**：颜色方案调成明显不同的颜色（比如红色边框），一眼区分本地和远端
- **Hotkey Profile**：透明度高、尺寸小，用于快速查询

### 值得调整的默认配置

**字体**：推荐 Nerd Font 系列（比如 `MapleMono-NF-CN`、`MesloLGS NF`），能完整显示 Powerline 符号和图标。

**光标**：Preferences → Profiles → Text → Cursor，选 `Vertical bar` + 开启 `Blinking cursor`，打字时位置更直观。

**Option 键行为**：Profiles → Keys → General → Left/Right Option key 设置为 `Esc+`，才能用 `⌥←` / `⌥→` 按词跳转。

**Status Bar**：Profiles → Session → Status bar enabled，可以添加工作目录、Git 分支、CPU/内存、网络等组件，放在窗口顶部或底部。

**窗口类型**：Profiles → Window → Style，选 `Compact` 可以隐藏标题栏，让终端和 macOS 窗口边框融为一体。
