| 命令            | 说明                                               |
| --------------- | -------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |


### 输出重定向

**覆盖内容**

- 直接将输出内容覆盖到文件：
```bash
$ echo 'filenew' > file
$ cat file
filenew
```
- 将输出内容追加到文件：
```bash
$ echo "new line" >> file
$ cat file
filenew
new line
```

将指令的输出内容覆盖到文件
```bash
$ ls > file
file
```

### 输出重定向

没看懂~~ 
https://www.runoob.com/linux/linux-shell-io-redirections.html


### /dev/null
> 如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null

`ls > /dev/null`

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。
如果希望屏蔽 stdout 和 stderr，可以这样写: `command > /dev/null 2>&1`
