## 🧩 Rebase 的基本概念
- `git rebase <branch>` 是把当前分支的提交「重新应用」到 `<branch>` 的最新提交之后。
- 会**重写当前分支的提交历史**（提交 SHA 会变化）。

---

## 🧭 推荐使用方式
### ✅ 开发分支 rebase 主干分支（推荐）

```bash
git checkout dev
git rebase main
````

目的：让 `dev` 分支基于 `main` 的最新状态开发，减少合并冲突。

### ❌ 主干 rebase 到开发分支（不推荐）

```bash
git checkout main
git rebase dev
```
这样会让主干依赖开发分支，不符合常规协作逻辑，容易带来风险。

---

## 🧯 如何撤销 rebase 操作

如果 rebase 已经成功完成，可用：

```bash
git reflog                  # 查看 HEAD 变动历史
git reset --hard HEAD@{N}   # 回到 rebase 之前的状态
```

⚠️ 注意：使用 `--hard` 会丢弃未保存的更改。

如果 rebase 正在进行中未完成：

```bash
git rebase --abort
```

---

## 🚀 Rebase 后的推送操作

### 1. 强制推送开发分支（dev）

```bash
git push origin dev --force
```

原因：rebase 改变了历史，必须强推（如果之前已 push 过）。

---

## 🧨 是否能直接 `git push origin HEAD:main`？

### ✅ 可以，但需满足条件：
- 当前在 `dev` 分支（或任意分支）。
- 想把它**直接推到远程 `main`** 上。

### ⚠️ 风险：
- 如果本地不是基于最新 `main`，或远程 `main` 有别人提交，可能需要强推。
- 会覆盖远程主干历史，不适合团队协作。

```bash
git push origin HEAD:main --force
```

---

## ✅ 更推荐的安全做法

```bash
git checkout main
git pull origin main       # 更新本地主干
git merge dev              # 合并开发分支
git push origin main       # 正常推送
```
这样做可以保留主干的历史，适合协作团队。

## 🧠 快速参考流程图
```text
开发中：
  git checkout main
  git pull origin main
  git checkout dev
  git rebase main
  git push origin dev --force

准备发布：
  git checkout main
  git merge dev
  git push origin main
```
