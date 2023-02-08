## 查看操作

### 查看本地分支    
`git branch`     

### 查看远程分支    
`git branch -r`     

### 查看所有分支    
`git branch -a`     

### 查看本地分支所关联的远程分支    
`git branch -vv`     


## 修改操作

### 重命名本地分支    
`git branch -m <old_branch> <new_branch>` 
或者直接将当前分支重命名
`git branch -M <new_branch>` 

### 删除本地分支    
`git branch -D <branch>`     

### 删除远程分支    
`git push origin --delete <branchName>` 或者    
`git push origin :<branchName>` 推送一个空分支到远程分支，其实就相当于删除远程分支

### 重命名远端分支
1. 先重命名本地分支 `git branch -m oldBranch newBranch`
2. 删除远端的分支 `git push --delete origin oldBranch`
3. 然后推送到远端 `git push origin newBranch`
4. 建立本地分支与远端 `git branch --set-upstream-to origin/newBranch`    

## 关联远程分支

把本地分支与远程origin的分支feat_a进行关联处理
`git branch --set-upstream-to origin/feat_a`


## 本地仓库与远端仓库建立关联
1. `git remote add origin httpxxx` 关联远程仓库
2. `git push -u origin master` 将最新的修改推送到远程仓库,在第一次进行push时,我们加上-u参数,后期push时就不用再加-u参数
