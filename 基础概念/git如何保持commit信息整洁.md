### 与远端代码同步

1. 执行`git status`查看本地仓库状态，确认：
 - 是否有未提交内容？ 
 - 是否有未添加内容？ 
```
红色：未添加 
黄色：未提交本地分支 
出现：nothing to commit, working tree clean 视为可操作环境 
```

2. 确认是否有远端同名分支，如有`origin/feat-a`：
```
※本地代码有更改(git status)
git add .
git commit -m 'feat: 新增xx功能' // 提交至本地版本库
git pull origin feat-a // 基于远端同名分支更新代码
git push origin feat-a // 推送至远端

※本地代码无更改(git status)
// 那没事了
```

### 保持commit信息整洁

**在git push之前，对commit信息进行整理**

```
业务并行开发，周期较长，切换分支也频繁。可能为了存代码，不想用git stash(万一丢代码)，同样的功能commit了多次，且信息相同：   
git commit -a -m 'feat: 新增xx用户' 
git commit -a -m 'feat: 新增xx用户' 
git commit -a -m 'feat: 新增xx用户' 

能够合并为
git commit -m 'feat: 新增xx用户' 

之后再
git push  
git的线会简洁很多
```

**实现方式**  

**(一)第2+n次commit时候使用 --amend**   

> 此操作适用commit一次，第二(+n)次的情况，如已经连续commit两条信息，只能修改最近一次的信息  

amend会使用一个新的commit去替换最近的一次commit，如先改了A.js，已经commit，但是同一个需求B.js也需要修改push，此时可以修改完：
```
git add B.js

git commit --amend -C HEAD // 直接使用上一个commit描述
或者
git commit --amend //弹出编辑窗口，修改commit信息，重新提交新commit。(i编辑，wq保存)

git push origin feat // 此时再去提交至远端
```

**(二)使用reset来修改信息**

> amend仅能替换最近一次commit。想要快速的将working tree的修改和最近的两次commit合并得到一个新的commit则需要用到reset啦

```
// 提交了多次
git commit -a -m 'add: line1' 
git commit -a -m 'add: line2' 
git commit -a -m 'add: line3' 

// 整合一下
git reset --soft HEAD~3 // 删除前3次commit信息,保留文件更改
git commit -a -m 'add: line-3次一起add'
git push
```

> reset适用于需要修改多个commit的情况，但也受限于修改从HEAD~开始连续的多个commit

可以完全的删除前几个commit，万一如果需要修改的commit已经push出去了（不要reset!!!）。那就需要使用revert命令，revert命令会接着重新提交一个新的commit，用以回滚上一个commit的修改。


**(三)使用rebase**

依次添加代码，并依次提交4次：   
```
git commit -a -m 'add: 0'
git commit -a -m 'add: 1'
git commit -a -m 'add: 2'
git commit -a -m 'add: 3'
```

`git log` 查看到历史：
```
commit 3cd74a4219f5501166f6a73f0eb6d175a87f7148 (HEAD -> master)
Author: justwe7 <x13133053566@163.com>
Date:   Thu Oct 10 17:39:06 2019 +0800

    add: 3

commit d55cc2d2258b20e1c7d83ee67c1c981b1f852fde
Author: justwe7 <x13133053566@163.com>
Date:   Thu Oct 10 17:39:00 2019 +0800

    add: 2

commit 3f7dba6d03e47a077fd12f2d8be3b0cf57b09019
Author: justwe7 <x13133053566@163.com>
Date:   Thu Oct 10 17:38:53 2019 +0800

    add: 1

commit 6a965e149f55cc01c64da0cd9e3d45518b067111
Author: justwe7 <x13133053566@163.com>
Date:   Thu Oct 10 17:38:37 2019 +0800

    add: 0
```

合并代码：   
1. 使用`git rebase -i HEAD~3`(就看最近的3条)，数字3代表压缩最后3次提交。
```
该命令执行后，会弹出vim的编辑窗口，3次提交的信息会倒序排列，最上面的是倒数第3次提交，最下面的是最新提交。(因为查看的是最近3条，少了add: 0的信息)

pick 3f7dba6 add: 1
pick d55cc2d add: 2
pick 3cd74a4 add: 3
```

2. 将第2和第3的add行， pick 改为 squash
```
pick 3f7dba6 add: 1
squash d55cc2d add: 2
squash 3cd74a4 add: 3

这个意义为将最后两次的提交压缩到倒数第3次的提交，效果就是我们在pick所在的提交就已经做了4次动作，但是看起来commit就是2次(rebase了最近3条，还有add: 0的信息，保留了add: 1信息)而已。
```

3. 然后保存退出。如果有冲突(没冲突就不用啦！！！执行第4步)
```
解决
git add .
git rebase --continue //如果有冲突，需要修改，修改的时候要注意，保留最新的历史
或者放弃
git rebase --abort //如果你要放弃这次压缩的话
```


4. 之后会弹出这样的窗口
```
# This is the 1st commit message:

add: 1

# This is the commit message #1:

add: 2

add: 3
```

可以再修改这次合并后的信息   
```
add: 1 => 我是新改的123合并

然后wq保存
git push
```

`git log` 查看，会发现记录合并为：
add: 1 => 我是新改的123合并

[参考](https://blog.csdn.net/itfootball/article/details/44154121)