## git cherry-pick 备忘

### 基本用法
`git cherry-pick` 命令的作用，就是将指定的提交（commit）应用于其他分支。

 `git cherry-pick <commitHash>` 会将指定的提交commitHash，应用于当前分支。这会在当前分支产生一个新的提交，它们的哈希值会不一样。

举例来说，代码仓库有master和feature两个分支。
```
    a - b - c - d   Master
         \
           e - f - g Feature
```
现在将提交 `f` 应用到 `master` 分支:
```
git checkout master # 切换到 master 分支

git cherry-pick f # Cherry pick 操作
```

上面的操作完成以后，代码库就变成了下面:
```
    a - b - c - d - f   Master
         \
           e - f - g    Feature
```

`git cherry-pick` 命令的参数，不一定是提交的哈希值，分支名也是可以的: `git cherry-pick feature` 表示将 `feature` 分支的最近一次提交，转移到当前分支。

### 需求场景

假如存在并行开发的需求，A需求开发（ `feat-a` ）了一段时间，后续接入B需求 ( `feat-b` )，上线时间节点不能确定先后，可能A先上也可能B先上。但是 `feat-b` 需要复用 `feat-a` 的某几次提交，手动复制粘贴文件的话错误率有点高，这时可以考虑使用 `cherry-pick`

> 如果一次提交一股脑的改动都在一个commit里面就复杂了，所以说平时要保持良好的 commit 习惯。按**需**提交，而不是按次提交。


```
    a - b - c   Master
        |    \
         \     g - h      feat-b
          \  
           d - e - f      feat-a
```

现在想要把 `feat-a` 的 `e` commit改动应用到 `feat-b` 中
```
git checkout feat-b
git cherry-pick e       #e 的commit hash
```

然后 `feat-b` 后面会追加一条 `feat-a / e` 的改动
```
    a - b - c   Master
        |    \
         \     g - h - e     feat-b
          \  
           d - e - f         feat-a
```

### 转移多个提交

#### 指定的多个commit转移
```
git cherry-pick <HashA> <HashB>
```
将 A 和 B 两个提交应用到当前分支。这会在当前分支生成两个对应的新提交。

### 转移连续的commit提交
```
git cherry-pick A..B
```
可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：**提交 A 必须早于提交 B**，否则命令将失败，但不会报错

> 注意，使用上面的命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用
> ```git cherry-pick A^..B```


### 指令参数 -options
1. `-e，--edit`

打开外部编辑器，编辑提交信息。


2. `-n，--no-commit`

只更新工作区和暂存区，不产生新的提交


3. `-x`

在提交信息的末尾追加一行(cherry picked from commit ...)，方便以后查到这个提交是如何产生的。


4. `-s，--signoff`

在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。


5. `-m parent-number，--mainline parent-number`

如果原始提交是一个合并节点，来自于两个分支的合并，那么 Cherry pick 默认将失败，因为它不知道应该采用哪个分支的代码变动。

> -m 配置项告诉 Git，应该采用哪个分支的变动。它的参数parent-number是一个从1开始的整数，代表原始提交的父分支编号。
> 
> 比如 `git cherry-pick -m 1 <commitHash>` 命令表示，Cherry pick 采用提交commitHash来自编号1的父分支的变动。
> 
> 一般来说，1号父分支是接受变动的分支（the branch being merged into），2号父分支是作为变动来源的分支（the branch being merged from）。


### 代码冲突
如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作

1. `--continue`
  用户解决代码冲突后:  
      - 第一步将修改的文件重新加入暂存区 `git add .`
      - 第二步使用 `git cherry-pick --continue`，让 Cherry pick 过程继续执行

2. `--abort`

稳妥之举~~。发生代码冲突后，放弃合并，回到操作前的样子。

3. `--quit`

发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子

### 转移另一个仓库的提交
- 前提是先把目标的仓库添加到当前的远程仓库：`git remote add target git://gitUrl`
- 然后，将远程代码抓取到本地 `git fetch target`
- 检查一下要从远程仓库转移的提交，获取它的哈希值 `git log target/master`
- 使用git cherry-pick 命令转移提交 `git cherry-pick <commitHash>`


趁着今天有类似的场景，终于照着阮老师的[教程](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)把心心念念很久又没有实践的 `cherry-pick` 实践了一遍
