## 用途说明

`Tag` 是指向某个固定 commit 的标记，通常用来记录发布版本，例如 `v1.2.0`。分支会随着新的提交继续向前移动，而 Tag 一般保持不变，因此适合用于发布、回滚定位和生成 Changelog。

下面的命令以远程仓库名为 `origin` 为例。

## 查看标签

### 查看本地全部标签

```bash
git tag
```

### 按名称筛选标签

```bash
# 查看所有 v1 开头的标签
git tag -l 'v1.*'
```

### 查看标签对应的提交信息

```bash
git show v1.2.0
```

对于附注标签（annotated tag），输出中还会包含标签说明、创建者和创建时间。

## 创建标签

### 给当前提交创建轻量标签

```bash
git tag v1.2.0
```

轻量标签只是一个指向 commit 的名字，适合本地临时标记；正式发布版本更推荐使用附注标签。

### 创建附注标签

```bash
git tag -a v1.2.0 -m 'release: v1.2.0'
```

附注标签会保存标签信息和创建者，发布版本时更便于追溯。

### 给指定 commit 创建标签

```bash
git tag -a v1.2.0 6c84aa3 -m 'release: v1.2.0'
```

其中 `6c84aa3` 是目标提交的 commit SHA。若当前分支已经有后续提交，这种方式可以准确标记实际发布的那一次提交。

## 推送标签到远程

创建 Tag 后，普通的 `git push` 不会自动把它推送到远程仓库，需要单独执行推送。

### 推送单个标签

```bash
git push origin v1.2.0
```

### 推送全部本地标签

```bash
git push origin --tags
```

> `--tags` 会推送所有尚未推送的本地标签。团队仓库中如果存在实验性或临时标签，优先推送单个标签，避免意外发布。

## 删除标签

### 删除本地标签

```bash
git tag -d v1.2.0
```

### 删除远程标签

```bash
git push origin --delete v1.2.0
```

删除远程标签不会自动删除其他开发者机器上的本地标签；其他成员需要执行 `git fetch --prune --prune-tags`，或自行删除本地标签以完成同步。

## 使用标签

### 切换到指定标签查看代码

```bash
git switch --detach v1.2.0
```

此时会进入 detached HEAD 状态，适合查看、构建或验证历史版本。不要直接在该状态下继续开发并期望提交落在某个分支上。

### 基于标签创建分支继续开发

```bash
git switch -c hotfix/v1.2.0 v1.2.0
```

例如，需要从线上 `v1.2.0` 修复问题时，可以从该标签创建 `hotfix` 分支，再正常提交和推送。

## 使用 Tag 发布 GitHub Release

Git Tag 只是在 Git 历史中标记一个固定 commit；GitHub Release 则是在某个 Tag 的基础上补充版本标题、发布说明和可下载文件。也就是说，Tag 决定“发布的是哪一版代码”，Release 决定“如何把这一版交付给使用者”。GitHub 会为 Release 自动提供该 Tag 对应源码的 ZIP 与 tarball 下载；若要发布应用安装包、CLI 二进制文件或压缩包，还需要额外上传构建产物。[^1]

### 推荐发布流程

正式发布前，先确保待发布的 commit 已通过测试，然后创建附注标签并只推送该标签：

```bash
# 当前 HEAD 就是要发布的 commit
git tag -a v1.2.0 -m 'release: v1.2.0'
git push origin v1.2.0
```

> 正式 Release 建议先在本地创建并推送附注标签。这样 Tag 的指向、创建者和说明都可追溯，也避免 GitHub 在默认分支的最新 commit 上自动创建同名 Tag。

接着构建实际要交付的文件，例如 `dist/my-app-macos.zip`、`dist/my-app-windows.zip` 或校验文件 `dist/checksums.txt`。

### 在 GitHub 网页发布

进入仓库的 **Releases** 页面，选择 **Draft a new release**，然后：

1. 在 Tag 下拉框中选择已推送的 `v1.2.0`；
2. 填写发布标题和 Release notes，或使用 **Generate release notes** 自动生成；
3. 将 `dist/` 中的安装包、二进制文件或压缩包拖入附件区域；
4. 测试版勾选 **This is a pre-release**；准备好后点击 **Publish release**。

如果仓库启用了 immutable releases，建议先保存为 Draft、上传并检查全部附件，再发布；一旦发布，Tag 和附件可能不再允许修改。[^2]

### 用 GitHub CLI 一次完成发布

安装并登录 GitHub CLI（`gh`）后，可以把已推送的 Tag、自动生成的说明和构建产物一次提交为 Release：

```bash
gh release create v1.2.0 \
  ./dist/my-app-macos.zip \
  ./dist/my-app-windows.zip \
  ./dist/checksums.txt \
  --title 'v1.2.0' \
  --generate-notes \
  --verify-tag
```

`--verify-tag` 会要求远端已经存在该 Tag，避免 CLI 在默认分支的最新 commit 上自动创建同名 Tag。`--generate-notes` 会根据 GitHub 的 Release Notes 功能生成标题和说明；如果要使用本地 Tag 的附注内容，可改为 `--notes-from-tag`。[^3]

先让发布处于草稿状态时：

```bash
gh release create v1.2.0 ./dist/* \
  --title 'v1.2.0' \
  --generate-notes \
  --verify-tag \
  --draft

# 检查附件和说明后再公开发布
gh release edit v1.2.0 --draft=false
```

### 用 GitHub Actions 在推送 Tag 时自动发布

如果每次发布都需要构建并上传同一类产物，可以把发布流程放进 GitHub Actions。下面的工作流监听 `v*` 格式的 Tag：本地执行 `git push origin v1.2.0` 后，GitHub 会检出该 Tag 对应的 commit，运行测试、构建 `dist/`，再创建同名 Release 并上传构建产物。

创建 `.github/workflows/release.yml`：

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: 检出 Tag 对应的代码
        uses: actions/checkout@v6

      # 按项目技术栈替换为安装依赖、测试和构建命令
      - name: 安装依赖
        run: npm ci

      - name: 测试
        run: npm test

      - name: 构建发行包
        run: npm run build

      - name: 创建 GitHub Release 并上传附件
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          TAG: ${{ github.ref_name }}
        run: |
          gh release create "$TAG" ./dist/* \
            --title "$TAG" \
            --generate-notes \
            --verify-tag
```

GitHub 托管的 runner 已预装 `gh`。每个使用 GitHub CLI 的步骤都需要通过 `GH_TOKEN` 提供令牌；工作流中的 `GITHUB_TOKEN` 由 GitHub 为当前 job 自动创建。`permissions: contents: write` 则授予创建 Release 和上传附件所需的仓库内容写权限。[^5]

> 示例中的 `npm ci`、`npm test`、`npm run build` 和 `./dist/*` 必须替换为项目真实的构建流程。若产物需要 macOS、Windows 和 Linux 各自构建，应拆成多个 runner job，最后再由一个发布 job 汇总上传，而不是只在 `ubuntu-latest` 上构建所有平台包。

该工作流只在 Tag 已推送后创建 Release，不负责创建或移动 Tag。这样发布版本始终由本地的附注 Tag 决定，CI 只负责验证、构建和交付。如果测试或构建失败，Release 不会创建。

### 为已有 Release 补充附件

Release 已经创建，但漏传了某个文件时，可以单独上传：

```bash
gh release upload v1.2.0 ./dist/checksums.txt
```

如果远端已有同名附件，`--clobber` 会先删除旧附件再上传新文件；上传失败时旧文件也无法恢复，因此除非确认目标文件无误，不要随意使用该参数。[^4]

### 发布前检查

```bash
# 确认 Tag 指向的提交
git show v1.2.0

# 确认远端已有该 Tag
git ls-remote --tags origin v1.2.0

# 发布后查看 Release 与附件
gh release view v1.2.0
```

## 注意事项

- 正式发布建议使用附注标签：`git tag -a <tag> -m <message>`，其元数据更完整。
- 标签名称建议遵循团队约定，例如语义化版本 `v1.2.0`；保持统一能降低发布和检索成本。
- 已经推送且用于发布的 Tag 不应删除后重新创建。即使远程允许强制更新，也可能让 CI、部署记录和其他开发者的本地仓库指向不同提交。
- 如果确实需要修正错误的发布版本，优先创建一个新的 Tag，并在发布说明中明确废弃旧版本；是否删除旧 Tag 应遵循团队的发布规范。
- GitHub Release 的源码包不等于可运行的发行包；桌面应用、移动应用、CLI 等项目应上传对应平台的构建产物，并建议同时附上校验文件。

## 参考资料

[^1]: GitHub Docs — [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) · GitHub。
[^2]: GitHub Docs — [Managing releases in a repository](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) · GitHub。
[^3]: GitHub CLI Manual — [gh release create](https://cli.github.com/manual/gh_release_create) · GitHub。
[^4]: GitHub CLI Manual — [gh release upload](https://cli.github.com/manual/gh_release_upload) · GitHub。
[^5]: GitHub Docs — [Using GitHub CLI in workflows](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-github-cli)；[GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token) · GitHub。
