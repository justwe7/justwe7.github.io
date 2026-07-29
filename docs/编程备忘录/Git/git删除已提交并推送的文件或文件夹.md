## 已经提交并推送的文件或文件夹如何删除

如果一个文件或文件夹已经被提交，并且已经推送到了远程仓库，后来又把它加入了 `.gitignore`，希望以后不再提交它的变更，需要注意：

`.gitignore` 只能忽略还没有被 Git 跟踪的文件。已经提交过的文件或文件夹，即使写进 `.gitignore`，Git 仍然会继续记录它的修改。

所以真正要做的是：先把它从 Git 的跟踪列表里移除，但保留本地文件。

删除方式要先分清楚目标：

- 不再需要这个文件：从本地和 Git 仓库里一起删除
- 本地还要保留：只取消 Git 跟踪，以后不再提交，这是最常见场景
- 文件包含密码、Token、密钥等敏感信息：普通删除不够，需要清理历史并立即废弃密钥

## 一、文件不再需要：直接从仓库删除

适用于文件或文件夹本身已经不需要保留的情况。

### 删除文件

```bash
git rm <文件路径>
git commit -m "chore: remove unused file"
git push
```

示例：

```bash
git rm docs/demo.md
git commit -m "chore: remove demo doc"
git push
```

### 删除文件夹

```bash
git rm -r <文件夹路径>
git commit -m "chore: remove unused folder"
git push
```

示例：

```bash
git rm -r dist
git commit -m "chore: remove dist folder"
git push
```

执行后，远程仓库会新增一个“删除文件”的提交。之前的历史提交里仍然能看到这个文件。

## 二、本地保留：只从 Git 跟踪中移除

适用于文件还要留在本地，但不希望继续被 Git 管理的情况，比如：

- 本地配置文件
- 日志文件
- 构建产物
- 临时缓存目录

操作顺序是：

1. 先确认路径已经写入 `.gitignore`
2. 再用 `git rm --cached` 从 Git 跟踪中移除
3. 提交这次“停止跟踪”的变更
4. 推送到远程

### 取消跟踪文件

```bash
git rm --cached <文件路径>
git commit -m "chore: stop tracking file"
git push
```

示例：

```bash
git rm --cached .env
git commit -m "chore: stop tracking env file"
git push
```

### 取消跟踪文件夹

```bash
git rm -r --cached <文件夹路径>
git commit -m "chore: stop tracking folder"
git push
```

示例：

```bash
git rm -r --cached dist
git commit -m "chore: stop tracking dist folder"
git push
```

如果还没有写 `.gitignore`，需要补上对应路径，避免之后又被重新提交：

```gitignore
.env
dist/
```

然后再提交 `.gitignore`：

```bash
git add .gitignore
git commit -m "chore: ignore local files"
git push
```

完成后，本地的 `dist/` 还在，但 Git 不会再记录它里面的新增、修改和删除。

可以用下面命令确认当前是否还有相关变更：

```bash
git status
```

## 三、如果已经提交了敏感信息

如果误提交的是密码、Token、私钥、证书等敏感信息，不能只用 `git rm`。

原因是：`git rm` 只会在最新提交里删除文件，历史提交里仍然能找到旧内容。

正确处理顺序：

1. 立即废弃已经泄露的密钥或 Token
2. 重新生成新的密钥
3. 从 Git 历史中清理敏感文件
4. 强制推送清理后的历史
5. 通知协作者重新同步仓库

常见工具是 `git filter-repo`：

```bash
git filter-repo --path <敏感文件路径> --invert-paths
git push --force
```

> 清理历史会改写提交记录，已经拉取过仓库的人需要重新同步。团队仓库操作前要先确认影响范围。

## 四、如何选择

| 目标 | 命令 |
| --- | --- |
| 文件不再需要，本地也删除 | `git rm <path>` |
| 文件夹不再需要，本地也删除 | `git rm -r <path>` |
| 本地保留，只取消 Git 跟踪 | `git rm --cached <path>` |
| 本地保留，只取消文件夹跟踪 | `git rm -r --cached <path>` |
| 删除敏感信息 | 清理历史并废弃密钥 |

普通文件误提交后，用 `git rm` 或 `git rm --cached` 就够了。敏感信息误提交后，重点不是“删文件”，而是“让泄露内容失效，并从历史里移除”。
