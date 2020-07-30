1. 生成一个公司用的SSH-Key
   ```bash
   $ ssh-keygen -t rsa -C 'lihx5@wedoctor.com' -f ~/.ssh/weiyi_rsa
   $ ssh-keygen -t rsa -C 'ilihuaxi@gmail.com' -f ~/.ssh/github_rsa
   ```

2. 配置SSH
把pub配置到远端

3. 添加私钥
```bash
ssh-add ~/.ssh/id_rsa $ ssh-add ~/.ssh/github_rsa
```

$ ssh-add ~/.ssh/weiyi_rsa $ ssh-add ~/.ssh/github_rsa
Could not open a connection to your authentication agent.

$ ssh-add ~/.ssh/weiyi_rsa
Identity added: /c/Users/monster/.ssh/weiyi_rsa (lihx5@wedoctor.com)


4. 修改配置文件
.ssh目录(就是私钥所在的文件夹)创建 `config` 文件
