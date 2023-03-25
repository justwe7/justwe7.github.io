### 1. 生成一个公司用的SSH-Key
```bash
ssh-keygen -t rsa -C 'email@example.com' -f ~/.ssh/weiyi_rsa
ssh-keygen -t rsa -C 'email@gmail.com' -f ~/.ssh/github_rsa
```

### 2. 配置SSH
把`.pub`后缀的文件内容复制，配置到远端

### 3. 添加私钥
```bash
$ ssh-add ~/.ssh/weiyi_rsa
$ ssh-add ~/.ssh/github_rsa
Identity added: /c/Users/monster/.ssh/weiyi_rsa (xxxx@xxxx.com)
```
或者执行多次，依次添加私钥：`ssh-add ~/.ssh/weiyi_rsa`。
出现诸如 `Identity added: `的提示说明成功

> 假如遇到报错，`Could not open a connection to your authentication agent.` 可以执行 `ssh-agent bash`，然后重新执行指令
![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/07/27/image.png)

### 4. 修改配置文件
.ssh目录(就是私钥所在的文件夹)创建 `config` 文件，把对应的路径还有其他相关的改一下：
```
# github
Host github.com
Port 22
HostName github.com
PreferredAuthentications publickey
IdentityFile C:/Users/monster/.ssh/github_rsa
User justwe7

# example
Host git.example-inc.com
HostName git.example-inc.com
PreferredAuthentications publickey
IdentityFile C:/Users/monster/.ssh/weiyi_rsa
User email
```


### QA
#### 0644警告 WARNING: UNPROTECTED PRIVATE KEY FILE!
```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '/Users/xx/.ssh/work_rsa.pub' are too open.
```
修改权限: `chmod 600 /Users/xx/.ssh/work_rsa.pub`

#### 拉取远端代码报错 warning: Pulling without 
```bash
warning: Pulling without specifying how to reconcile divergent branches is
discouraged. You can squelch this message by running one of the following
commands sometime before your next pull:

  git config pull.rebase false  # merge (the default strategy)
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only

You can replace "git config" with "git config --global" to set a default
preference for all repositories. You can also pass --rebase, --no-rebase,
or --ff-only on the command line to override the configured default per
invocation
```
> 原因: 在默认模式下，git pull是git fetch的简写，后面跟着git merge fetch HEAD。
> https://stackoverflow.com/questions/62653114/how-can-i-deal-with-this-git-warning-pulling-without-specifying-how-to-reconci
**一劳永逸的解法** 
```bash
git config --global pull.ff only
```
**单次拉取时添加参数**
```bash
git pull --ff-only
```