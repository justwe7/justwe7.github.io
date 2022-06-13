# 名词解释

-----
## 分支
如```master分支，dev分支```，使用分支可以把工作从开发主线上分离开来,以免影响开发主线代码
## 本地分支
开发者主机上基于远程分支创建，修改并不会影响远程分支的内容，执行push会与远程分支合并形成新的分支
## 远程分支
git仓库某个分支
## HEAD
HEAD指向的是现在使用中的分支的最后一次更新。通常默认指向master分支的最后一次更新。通过移动HEAD，就可以变更使用的分支。 
```git push origin HEAD:release 将当前工作的分支指向到release分支，无需切换合并```
## pull
- git pull <远程主机名> <远程分支名> 
当前分支是feature，但是你想把远程master”同步”到本地master，但又不想checkout切换到master分支,使用```git pull origin master:master```
- git pull origin <远程主机名>
如果当前分支与远程分支存在追踪关系,将指定远程分支同步到当前本地分支```git pull origin master```
- git pull

git pull --rebase origin branch
本地分支已经和想要拉取的分支建立了“关联”关系。拉取所有远程分支的新版本"坐标"，并同步当前分支的本地代码(具体根据关联分支而定)
什么是"关联"分支?```git branch -vv```查看分支关联
配置关联方法
```bash
1. git checkout -b dev origin/dev
当我们检查时，git会自动为我们检出的分支和远程分支建立关联关系
2. git push -u origin <远程分支> | git push --set-upstream origin <远程分支>
默认配置下，提交时本地分支需和远程分支同名
3. git branch --set-upstream-to=<远程分支>
```
## push
推送本地分支到远程，与pull的可选参数基本相同
没有"关联"分支的情况下，使用push会先让你设置一个upstream branch.
| 指令                        | 描述                                      |
| --------------------------- | ----------------------------------------- |
| git push                    | 将当前已关联分支代码同步到远程同名分支    |
| git push origin master      | master推送本地分支到远程master            |
| git push origin feature:dev | 提交本地feature分支到远程的dev分支        |
| git push origin :dev        | 提交到远程的dev将被删除，但是本地还会保存 |
## 分支操作
| 指令                        | 描述                                            |
| --------------------------- | ----------------------------------------------- |
| git branch                  | 查看本地分支                                    |
| git branch -r               | 查看远程分支                                    |
| git branch -m old new       | 修改分支名                                      |
| git branch -a               | 查看所有分支                                    |
| git branch feature          | 创建本地feature分支                             |
| git push origin feature-bug | 创建远程feature-bug分支                         |
| git checkout dev            | 切换到dev分支                                   |
| git merge feature           | 合并feature分支到当前分支(多出一个节点)         |
| git rebase feature          | 合并feature分支到当前分支(master变基到当前分支) |
## merge与rebase(合并分支)
如小明与小红同时基于master分支各自创建了b-ming和b-hong分支，小明首先完成，并合并到了master分支，(假设没有代码冲突)小红之后进行push操作会提示需要先pull，之后再进行提交操作。
1. 使用merge合并 
合并最新的master和小红的最新分支，汇入一个最新的分支指向，会多余一个合并提交的结尾 

| 指令                       | 描述                           |
| -------------------------- | ------------------------------ |
| git merge feature          | 只保留单条分支记录             |
| git merge --no-ff feature  | 保留分支的commit历史           |
| git merge --squash feature | 把多次分支commit历史压缩为一次 | 

2. 使用rebase 
基于小明的分支b-ming的最新mater之后添加小红的分支，并最终指向为小红的分支 
```bash
可以在pull添加模式 git pull --rebase origin master,--rebase选项告诉Git把小红的提交移到同步了中央仓库修改后的master分支的顶部
出现冲突
git add <some-file> 
git rebase --continue
如果你碰到了冲突，但发现搞不定，不要惊慌。只要执行下面这条命令，就可以回到你执行git pull --rebase命令前的样子：
git rebase --abort
```
拉取变基
如线上最新分支为A-B-C-D服务器为A-B-E
需要先pull一下再push，那最终服务器上会是A-B-分叉：一边是C-D，一边是E，然后E和D又连到一个新的merge commit F上，优点：记录下合并动作；缺点：很多时候这种合并动作是垃圾信息，记录意义不大，反而把历史树搞得复杂不直观，会对实际工作带来负面作用。
如果先做一次rebase。git pull --rebase，那么本地分支就会被更新成A-B-E-C'-D'，把C-D的基从B上变到E上，这时再去push，那服务器上也变成A-B-E-C'-D'. 那tag打在D'上就行了。目标分支上的历史树还是一条线  
**git rebase过程相比较git merge合并整合得到的结果没有任何区别，但是通过git rebase衍合能产生一个更为整洁的提交历史。**  

## 工作流程   
## 一、首先确认环境
- 每次操作前，确认本地环境是否干净？  
- 是否有未提交内容？ 
- 是否有未添加内容？ 
git status 
红色：未添加 
黄色：未提交本地分支 
出现：nothing to commit, working tree clean 视为可操作环境 
## 二、准备开发
### 步骤：
1. 基于最新master新建本地工作分支
2. 将本地分支推送到远端分支
### 命令：
1. git checkout -b <本地分支> origin/<远程分支>    
  例：git checkout -b feature-bugfixes origin/master
  说明：基于远端 master 新建 feature-bugfixes 分支，feature-bugfixes 为本地开发分支
2. git push origin <本地分支>:<远程分支>
例：git push origin feature-bugfixes:feature-bugfixes
说明：将本地 feature-bugfixes 分支推送到远端 feature-bugfixes 分支
备注：
**分支命名遵循feature-xxx，jira-0000，hotfix-0000等格式**
## 三、代码提交与推送
### 步骤：
1. 将新增文件添加到版本库
2. 修改代码后，提交到本地
3. 将本地分支同步到远端分支
### 命令：
1. ```git add <path>``` 或 ```git add .``` 或 ```git add documentation/*.txt```
例：git add .
说明：将所有新改动添加到版本控制中 
- git add -A 暂存当前git仓库下更高级目录下的所有变化 
- git add . 暂存当前目录下包括子孙目录的所有文件变化 
2. git commit -m "message" 
例：git commit -m "jira-0000: 修改图片播放顺序" 
说明：将本地修改提交到当前分支，提交信息为：jira-0000: 修改图片播放顺序 
3. git push origin local-branch:origin-branch 
例：git push origin feature-bugfixes:feature-bugfixes 
说明：将本地 feature-bugfixes 分支的修改同步到远端 feature-bugfixes 分支 
备注：
**提交信息格式遵循：jira-xxx: 修改图片播放顺序**
## 四、代码上线
代码开发完成，需要把feature分支合并到对应分支进行提测、上线 
| 提交环境   | git分支 | 注意事项                                                            |
| ---------- | ------- | ------------------------------------------------------------------- |
| 测试环境   | dev     | 合并时自己做code-review(尽量避免出现因粗心问题重复提交产生无用节点) |
| 预发布环境 | release | bug全部修改完成，已达到提测条件                                     |
| 生产环境   | master  | 预发布已无bug，可以上线                                             |
### 合并步骤(方法1): 
- 步骤：
1. 切换至对应的远程分支(dev/release/master) 
2. 更新远程代码为最新 
3. 合并代码分支代码 
4. 推送代码 
- 示例： 
1. git checkout dev //切换分支到dev 
2. git pull origin dev 
3. git merge origin/feature 
4. git push origin dev 
### 合并步骤(方法2): 
1. 登录 [gitlab](http://gitlab.fenqi.d.xiaonei.com/) 
2. 选择项目 -> 选择 Merge Requests -> 点击 New Merge Requests 
3. Source branch 选择 feature 开发分支 
4. Target branch 选择对应环境分支 
5. 点击 Compare branches 提交 merge 请求 
## 五、总结
工作流程基本只操作各自feature-xxx功能分支，合并feature-xxx分支至dev 
**避免直接修改**三个主干分支 master、release、dev,需求迭代使用merge方式推动节点更新 

## 需求版本操作流程示例整合(假设需求版本为v1.1) 
- 准备开发
```bash
git status
git pull origin master //拉取最新master分支 
git checkout -b feature-v1.1 origin/master //基于远端master创建本地feature-v1.1分支
git push origin feature-v1.1:feature-v1.1 //推送本地feature-v1.1至远端
```
> **多人协作-任务分工** 如遇到多人（小明、小红）同时开发v1.1版本，小明首先创建好远端的v1.1分支，小红基于v1.1分支拉取自己维护的分支feature-v1.1red，小明基于v1.1开发
- 代码存档 
```bash 
git add . 
git commit -m "feature-v1.1: 新增轮播图功能" 
git push origin feature-v1.1:feature-v1.1 //本地版本库推送至远程feature-v1.1 
``` 
- 发布(提测/预发布/生产) 
```bash 
方式一：基于(dev/release/master)分支操作
git checkout master 
git pull origin master //确保当前master为最新节点 
git merge origin/feature-v1.1 //合并远程feature-v1.1到当前分支(需确保当前版本feature已push到远程) 
#git merge --no-ff origin/feature-v1.1 //保留分支的commit历史 
#git merge --squash origin/feature-v1.1 //把多次分支commit历史压缩为一次 
#如多人同时修改可能出现冲突(解决冲突后执行 git add . ) 
git commit -m 'feature 轮播图需求上线' 
git push origin HEAD:master 
方式二：基于feature分支操作(需确保当前feature没有push到远程版本库，commit之后未执行push操作) 
git checkout feature-v1.1 //切换分支到feature-v1.1 
git rebase origin/master //将远程的master分支变基至当前节点 
git push origin feature-v1.1:master 
#git rebase过程相比较git merge合并整合得到的结果没有任何区别，但是通过git rebase衍合能产生一个更为整洁的提交历史。 
``` 
> **多人协作-功能开发完成** 小红首先将自己维护的分支feature-v1.1red合并至小明维护的v1.1分支，小明整合代码内容为功能完善的v1.1版本代码，再执行合并至远端dev/release/master操作 