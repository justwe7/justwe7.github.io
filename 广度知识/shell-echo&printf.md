> printf 使用引用文本或空格分隔的参数，外面可以在 printf 中使用格式化字符串，还可以制定字符串的宽度、左右对齐方式等。默认 printf 不会像 echo 自动添加换行符，我们可以手动添加 \n。


## echo
> 先学一学bash的 console.log 

#### 显示普通字符串
```bash
$ echo "It is a test"
It is a test
# 双引号完全可以省略，以下命令与上面实例效果一致
$ echo It is a test
It is a test
```

#### 显示转义字符
```bash
$ echo "\"It is a test\""
"It is a test"
```

#### 显示变量
以下代码保存为 `test.sh`，name 接收标准输入的变量
```bash
#!/bin/sh
read name 
echo "$name It is a test"
```
运行shell `sh test.sh`（以shell环境来解释test.sh），结果将是:
```
OK                     #键盘输入
OK It is a test        #输出
```

#### 显示换行
**-e 开启转义**
```bash
echo -e "OK! \n" # -e 开启转义
echo "It is a test"
# 输出
OK!

It is a test
```


## printf
`printf  format-string  [arguments...]`
- format-string: 为格式控制字符串
- arguments: 为参数列表。

### 简单示例
```bash
#!/bin/bash
 
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876 
```
输出
```bash
姓名     性别   体重kg
郭靖     男      66.12
杨过     男      48.65
郭芙     女      47.99
```

**%s %c %d %f都是格式替代符**
`%-10s` 指一个宽度为10个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在10个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。

`%-4.2f` 指格式化为小数，其中.2指保留2位小数。

### 替换符示例
```bash
#!/bin/bash

# format-string为双引号
$ printf "%d %s\n" 1 "abc"
1 abc

# 单引号与双引号效果一样 
$ printf '%d %s\n' 1 "abc" 
1 abc

# 没有引号也可以输出
$ printf %s abcdef
abcdef

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
$ printf %s abc def
abcdef

$ printf "%s\n" abc def
abc
def

$ printf "%s %s %s\n" a b c d e f g h i j
a b c
d e f
g h i
j

# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
$ printf "%s and %d \n" 
 and 0
```

### printf的转义序列表

| 序列                      | 说明                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \a                        | 警告字符，通常为ASCII的BEL字符                                                                                                                                               |
| \b                        | 后退                                                                                                                                                                         |
| \c                        | 抑制（不显示）输出结果中任何结尾的换行字符（只在%b格式指示符控制下的参数字符串中有效），而且，任何留在参数里的字符、任何接下来的参数以及任何留在格式字符串中的字符，都被忽略 |
| \f                        | 换页（formfeed）                                                                                                                                                             |
| \n                        | 换行                                                                                                                                                                         |
| \r                        | 回车（Carriage return）                                                                                                                                                      |
| \t                        | 水平制表符                                                                                                                                                                   |
| \v                        | 垂直制表符                                                                                                                                                                   |
| \\|一个字面上的反斜杠字符 |
| \ddd                      | 表示1到3位数八进制值的字符。仅在格式字符串中有效                                                                                                                             |
| \0ddd                     | 表示1到3位的八进制值字符                                                                                                                                                     |