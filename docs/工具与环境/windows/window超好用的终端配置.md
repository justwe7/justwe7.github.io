---
title: '为windows配置好用的终端配置'
tags: ['效率']
keywords: ['效率']
date: 2020-01-05
toc_max_heading_level: 3
---
### 什么是WSL
Windows Subsystem for Linux（简称WSL）是一个为在Windows 10上能够原生运行Linux二进制可执行文件（ELF格式）的兼容层。
说白了，意思就是，Windows10里可以用Linux的终端了

<!-- truncate -->

如果你是mac用户，可以跳过前两步，直接执行第三步操作


在vscode中的效果：
![20200101_184711.gif](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/01/01/20200101_184711.gif)

> 本文所有的指令（安装）都在Ubuntu子系统下执行

### （一）安装Ubuntu子系统
**开启windows子系统功能**

依次找到：   
控制面板 => 程序 => 程序和功能（启用或关闭windows功能） => 勾选：适用于 Linux 的 Windows 子系统

![image.png](https://testingcf.jsdelivr.net/gh/justwe7/cdn/images/2020/01/01/image.png)


**安装（Ubuntu）WSL子系统**  

1. 打开Win10应用商店
2. 搜索Ubuntu，进行安装。安装成功后，在开始菜单中输入Ubuntu找到并启动linux终端。
> 首次启动子系统需要进行安装，并需要创建用户，记得保存好密码。


#### 切换源

> 并不需要强制切换，境内的源安装会快点

1. `sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak` //备份以防万一
2. `sudo vim /etc/apt/sources.list` //编辑文件添加以下内容👇
```vim
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```
3. 使配置生效

        sudo apt-get update
        sudo apt-get upgrade

#### 简单使用
**windows下切换至Ubuntu**：在cmd下执行指令 `wsl` 可以切换至bash


### （二）安装nodejs

在bash下（使用Ubuntu虚拟机）按照以下步骤依次执行
```bash
$ cd ~ 
$ wget https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-x64.tar.xz
$ tar xvf node-v10.15.1-linux-x64.tar.xz
$ cd node-v10.15.1-linux-x64
$ pwd // 找到当前绝对路径👇
/home/xxmonster/node-v10.15.1-linux-x64
$ sudo cp /etc/profile /etc/profile.bak   //备份
$ vim /etc/profile
添加以下环境变量
export NODE_HOME=/home/xxmonster/node-v10.15.1-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export PATH=$NODE_HOME/bin:$PATH
$ source /etc/profile       //使配置生效
```

**如果安装zsh后node指令不生效（第三步的美化之后）**

需要再次在zsh配置文件中增加环境变量：

    $ sudo vim ~/.zshrc

添加配置
```bash
export NODE_HOME=/home/xxmonster/node-v10.15.1-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export PATH=$NODE_HOME/bin:$PATH
```

使配置生效

    soucre ~/.zshrc


### （三）美化+优zhuang化B命令行-使用zsh
#### 1. 安装zsh
```bash
$ sudo apt-get install zsh
$ zsh --version
zsh 5.4.2 (x86_64-ubuntu-linux-gnu)
```


#### 2. 安装 oh-my-zsh

    $ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

> 会询问是否设置zsh为默认shell? ==> Yes，如果没有询问，可以手动添加 👇


**设置默认shell**

    chsh -s /usr/bin/zsh  
    或者 
    chsh -s $(which zsh)

如果wsl系统中不生效，那么我们可以在.bashrc（在~目录下）末尾加上shell代码，当你打开bash时候切换到zsh：

    bash -c zsh
或者

    if test -t 1; then
        exec zsh
    fi



**切换使用zsh(z Shell)**

    zsh

**切回bash**

    bash

#### 3. 安装zsh扩展

> Oh My Zsh 默认自带了一些默认主题，存放在~/.oh-my-zsh/plugins目录中

**新增插件自动提示插件+语法高亮插件**
```bash
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions // 语法提示
$ git clone git://github.com/zsh-users/zsh-syntax-highlighting $ZSH_CUSTOM/plugins/zsh-syntax-highlighting //语法高亮

$ cd ~
$ sudo cp .zshrc .zshrc.bak // 先备份文件
$ sudo vim .zshrc
# 在文件里找到plugins，添加
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
source .zshrc
```

**配置zsh主题**
```bash
$ sudo vim .zshrc // 编辑生效

<!-- 找到ZSH_THEME项 -->
ZSH_THEME="muse" // 我配置的这个主题  https://github.com/ohmyzsh/ohmyzsh/wiki/Themes 找到喜欢的主题名称，直接修改即可

$ source .zshrc // 更新生效
```

**使用技巧**
- 连按两次Tab会列出所有的补全列表并直接开始选择，补全项可以使用 ctrl+n/p/f/b上下左右切换
- 智能跳转，安装了 autojump 之后，zsh 会自动记录你访问过的目录，通过 j 目录名 可以直接进行目录跳转，而且目录名支持模糊匹配和自动补全，例如你访问过 hadoop-1.0.0 目录，输入`j hado` 即可正确跳转。`j --stat` 可以看你的历史路径库。
- 命令选项补全。在zsh中只需要键入 `tar -<tab>` 就会列出所有的选项和帮助说明
- 在当前目录下输入 .. 或 ... ，或直接输入当前目录名都可以跳转，你甚至不再需要输入 cd 命令了。在你知道路径的情况下，比如 `/usr/local/bin` 你可以输入 `cd /u/l/b` 然后按进行补全快速输入
- 目录浏览和跳转：输入 `d`，即可列出你在这个会话里访问的目录列表，输入列表前的序号，即可直接跳转。
- 命令参数补全。键入 `kill <tab>` 就会列出所有的进程名和对应的进程号
- 更智能的历史命令。在用或者方向上键查找历史命令时，zsh支持限制查找。比如，输入ls,然后再按方向上键，则只会查找用过的ls命令。而此时使用则会仍然按之前的方式查找，忽略 ls
- 多个终端会话共享历史记录
- 通配符搜索：`ls -l **/*.sh`，可以递归显示当前目录下的 shell 文件，文件少时可以代替 `find`。使用 `**/` 来递归搜索
- 扩展环境变量，输入环境变量然后按 就可以转换成表达的值
- 在 .zshrc 中添加 `setopt HIST_IGNORE_DUPS` 可以消除重复记录，也可以利用 `sort -t ";" -k 2 -u ~/.zsh_history | sort -o ~/.zsh_history` 手动清除


### 接下来可以快乐的使（装）用（B）了~~  

推荐几个很实用的 bash 快捷键，[请戳](https://lihx.top/ti-sheng-ming-ling-xing-xiao-lu-de-bashkuai-jie-jian/)

还有 Windows terminal（巨硬官方[GitHub仓库地址](https://github.com/Microsoft/Terminal)） 的配置没有写，网上一搜一大堆。这个[教程](https://www.bilibili.com/video/av51726432)有点老，主题的配置项很多不起作用了。安装可以借鉴，主题颜色配置可以参考[iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)


### 参考文章

- [愉快的使用 Windows 开发！WSL 安装及前端开发环境配置](https://juejin.im/post/5cdcf930f265da03914d8820)
- [oh-my-zsh让终端好用到飞起~](https://juejin.im/post/5d773da76fb9a06aff5e9a99)
- [Windows10终端优化方案：Ubuntu子系统+cmder+oh-my-zsh](https://zhuanlan.zhihu.com/p/34152045)
- [zsh+on-my-zsh配置教程指南（程序员必备）【已备份】](https://segmentfault.com/a/1190000013612471)
- [WSL 打造最强windows命令行](https://segmentfault.com/a/1190000016677670)
- [Ubuntu 下 Oh My Zsh 的最佳实践「安装及配置」](https://segmentfault.com/a/1190000015283092)
