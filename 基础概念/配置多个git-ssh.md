1. 生成一个公司用的SSH-Key
```bash
ssh-keygen -t rsa -C 'email@example.com' -f ~/.ssh/weiyi_rsa
ssh-keygen -t rsa -C 'email@gmail.com' -f ~/.ssh/github_rsa
```

2. 配置SSH
把`.pub`后缀的文件内容复制，配置到远端

3. 添加私钥
```bash
$ ssh-add ~/.ssh/weiyi_rsa $ ssh-add ~/.ssh/github_rsa
Identity added: /c/Users/monster/.ssh/weiyi_rsa (xxxx@xxxx.com)
```
或者执行多次，依次添加私钥：`ssh-add ~/.ssh/weiyi_rsa`。
出现诸如 `Identity added: `的提示说明成功

假如遇到报错，`Could not open a connection to your authentication agent.`
可以执行 `ssh-agent bash`，然后重新执行指令
![image.png](https://image.littl.cn/images/2020/07/27/image.png)

4. 修改配置文件
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
