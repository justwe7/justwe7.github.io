- [文件目录](https://github.com/justwe7/blog/tree/feature/docs/%E5%B9%BF%E5%BA%A6%E7%9F%A5%E8%AF%86/shell)

## hello shell

1. 创建文件`$ touch helloworld.sh`
2. 添加内容
```shell
#!/bin/bash
echo "Hello World !"
```
> #! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

> echo 命令用于向窗口输出文本。

### 运行 Shell 脚本有两种方法：

在刚才创建的shell文件同目录下

1. 作为可执行程序

```shell
chmod +x ./helloworld.sh  #使脚本具有执行权限
./helloworld.sh  #执行脚本
```

> 注意，**一定要写成 ./helloworld.sh**，而不是 helloworld.sh，运行其它二进制的程序也一样

> 直接写 helloworld.sh，linux 系统会去 PATH 里寻找有没有叫 helloworld.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 helloworld.sh 是会找不到命令的，要用 ./helloworld.sh 告诉系统说，就在当前目录找。

- macos报错：**Terminal error: zsh: permission denied: ./helloworld.sh**
- 可以执行 `chmod u+x ./helloworld.sh`

1. 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```shell
/bin/sh test.sh
/bin/php test.php
```

> 这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

### echo
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


## 变量

### 变量类型
运行shell时，会同时存在三种变量：

1. 局部变量 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2. 环境变量 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3. shell变量 shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

### 定义变量

- 命名只能使用**英文字母，数字**和**下划线**，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用bash里的关键字（可用help命令查看保留关键字）。

> **定义变量时**，变量名**不加美元符号**（$，PHP语言中变量需要）

示例：
```bash
your_name="bill"
或
for file in `ls`  将目录下的文件名循环出来。
或
for file in $(ls)  将目录下的文件名循环出来。
```

### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：
```shell
your_name="bill"
echo $your_name
echo ${your_name}
```
变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界


### 只读变量
> 使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```shell
your_name="bill"
readonly your_name
your_name="jack ma"
```

### 删除变量
`unset myUrl`

```bash
#!/bin/sh
myUrl="https://lihx.top"
echo $myUrl
unset myUrl
echo $myUrl
```


### 变量运算
```bash
#!/bin/bash

a=5
b=6

result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"
```
result 为： 11


## Shell字符串

> 单引号里的任何字符都会原样输出，双引号里可以有变量

### 单引号
```bash
str='this is a string'
```
单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

### 双引号
```bash
$ your_name='runoob'
$ str="Hello, I know you are \"$your_name\"! \n"
$ echo -e $str
Hello, I know you are "runoob"! 
```

### 拼接字符串
```bash
$ your_name="runoob"
# 使用双引号拼接
$ greeting="hello, "$your_name" !"
$ greeting_1="hello, ${your_name} !"
$ echo $greeting  $greeting_1
hello, runoob ! hello, runoob !

# 使用单引号拼接
$ greeting_2='hello, '$your_name' !'
$ greeting_3='hello, ${your_name} !'
$ echo $greeting_2  $greeting_3
hello, runoob ! hello, ${your_name} !
```

### 获取字符串长度
```bash
$ string="abcd"
$ echo ${#string} #输出 4
4
```

### 提取子字符串
```bash
$ string="runoob is a great site"
$ echo ${string:1:4} 
unoo
```

### 查找子字符串
查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：
```bash
$ string="runoob is a great site"
$ echo `expr index "$string" io`  # 输出 4
4
```


## 数组
bash支持一维数组（不支持多维数组），并且没有限定数组的大小。

### 定义数组
在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：`数组名=(值1 值2 ... 值n)`

```bash
array_name=(value0 value1 value2 value3)
或者
array_name=(
value0
value1
value2
value3
)
或者下标赋值
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
# 可以不使用连续的下标，而且下标的范围没有限制。
```

### 读取数组
读取数组元素值的一般格式是： `${数组名[下标]}`
```bash
$ arr=(1 22 333)
$ echo ${arr[2]}
333
$ echo ${arr[@]}
1 22 333

# 获取数组的长度
$ echo ${#arr[@]}
3
# 或者
$ echo ${#arr[*]}
3
# 取得数组单个元素的长度
$ echo ${#arr[0]}
2
```

## 注释
以 # 开头的行就是注释，会被解释器忽略。

通过每一行加一个 # 号设置多行注释，像这样：
```bash
#--------------------------------------------
# 这是一个注释
#--------------------------------------------
###### 用户配置区 开始 ######
#
#
# 这里可以添加脚本描述信息
# 
#
###### 用户配置区 结束  ######
```

### 多行注释
```bash
:<<EOF
注释内容...
注释内容...
注释内容...
EOF

# 或者

:<<'
注释内容...
注释内容...
注释内容...
'

# 或者

:<<!
注释内容...
注释内容...
注释内容...
!
```

## shell-输出(echo & printf)
> printf 使用引用文本或空格分隔的参数，外面可以在 printf 中使用格式化字符串，还可以制定字符串的宽度、左右对齐方式等。默认 printf 不会像 echo 自动添加换行符，我们可以手动添加 \n。


### echo
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


### printf
`printf  format-string  [arguments...]`
- format-string: 为格式控制字符串
- arguments: 为参数列表。

#### 简单示例
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

#### 替换符示例
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

#### printf的转义序列表

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


## shell-传递参数
### 传递参数
执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

`1.sh` 脚本内容：
```
#!/bin/bash

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

执行脚本，并传递参数： ` ./2.sh 1 23 4 5`，输出内容：
```
Shell 传递参数实例！
执行的文件名：./2.sh
第一个参数为：1
第二个参数为：23
第三个参数为：4
```


| 参数处理 | 说明                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `$#`     | 传递到脚本的参数个数                                                                                                     |
| `$*`     | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。                    |
| `$$`     | 脚本运行的当前进程ID号                                                                                                   |
| `$!`     | 后台运行的最后一个进程的ID号                                                                                             |
| `$@`     | 与`$*`相同，但是使用时加引号，并在引号中**返回每个参数**。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| `$-`     | 显示Shell使用的当前选项，与set命令功能相同。                                                                             |
| `$?`     | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。                                                            |


### $* 与 $@ 区别：

> - 相同点：都是引用所有参数。
> - 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3。
>   "*" 等价于 "1 2 3"（传递了一个参数）
>   "@" 等价于 "1" "2" "3"（传递了三个参数）

当前有如下shell脚本：
```bash
echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done
```
执行脚本并传入参数 `./test.sh 1 2 3`，输入：
```
-- $* 演示 ---
1 2 3
-- $@ 演示 ---
1
2
3
<!-- 我理解为JS数组串和数组的区别😂 -->
```


> 在为shell脚本传递的参数中如果包含空格，应该使用单引号或者双引号将该参数括起来，以便于脚本将这个参数作为整体来接收。
在有参数时，可以使用对参数进行校验的方式处理以减少错误发生：
```bash
if [ -n "$1" ]; then
    echo "包含第一个参数"
else
    echo "没有包含第一参数"
fi
```

## shell-输入输出重定向

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


## shell-流程控制(if & for)

> sh的流程控制不可为空（else中不允许出现空代码段）

### if else

**if**
```bash
if condition
then
    command1 
    command2
    ...
    commandN 
fi

或者写成单行

if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```

**if else**
```bash
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```

**if else-if else**
```bash
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

if else语句经常与test命令结合使用，如下所示：
```bash
num1=$[2*3]
num2=$[1+5]
if test $[num1] -eq $[num2]
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi

两个数字相等!
```

### for
语法
```bash
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

一行
for var in item1 item2 ... itemN; do command1; command2… done;
```

示例：
```bash
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

The value is: 1
The value is: 2
The value is: 3
The value is: 4
The value is: 5

for str in 'This is a string'; do echo $str; done;

This is a string
```


### while 语句
语法
```bash
while condition
do
    command
done
```

```bash
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```
> let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量



### until 循环
> until 循环执行一系列命令直至条件为 true 时停止。
>
> until 循环与 while 循环在处理方式上刚好相反。
```bash
until condition
do
    command
done
```

示例
```bash
#!/bin/bash

a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

### case
取值后面必须为单词in，每一模式必须以右括号结束。取值可以为变量或常数。匹配发现取值符合某一模式后，其间所有命令开始执行直至 ;;。  
取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。如果无一匹配模式，使用星号 * 捕获该值，再执行后面的命令。
```bash
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
```


### 跳出循环

#### break命令
break命令允许跳出所有循环（终止执行后面的所有循环）。

下面的例子中，脚本进入死循环直至用户输入数字大于5。要跳出这个循环，返回到shell提示符下，需要使用break命令。
```bash
#!/bin/bash
while :
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done
```

#### continue
它不会跳出所有循环，仅仅跳出当前循环。

#### case ... esac
case ... esac 与其他语言中的 switch ... case 语句类似
> 每个 case 分支用右圆括号开始，用两个分号 ;; 表示 break，即执行结束，跳出整个 case ... esac 语句，esac（就是 case 反过来）作为结束标记。
```bash
case 值 in
模式1)
    command1
    command2
    command3
    ;;
模式2）
    command1
    command2
    command3
    ;;
*)
    command1
    command2
    command3
    ;;
esac
```

示例
```bash
#!/bin/sh

site="runoob"

case "$site" in
   "runoob") echo "菜鸟教程"
   ;;
   "google") echo "Google 搜索"
   ;;
   "taobao") echo "淘宝网"
   ;;
esac
```


## shell-运算符

### 基本运算符
包括： 
- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符


### 算术运算符
> 原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，**expr 最常用**。
expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

| 运算符 | 说明                                          | 举例                          |
| ------ | --------------------------------------------- | ----------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 将把变量 b 的值赋给 a。  |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

```bash
a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"
# a + b : 30

val=`expr $a - $b`
echo "a - b : $val"
# a - b : -10

val=`expr $a \* $b`
echo "a * b : $val"
# a * b : 200

val=`expr $b / $a`
echo "b / a : $val"
# b / a : 2

val=`expr $b % $a`
echo "b % a : $val"
# b % a : 0

if [ $a == $b ]
then
   echo "a 等于 b"
fi
# 上面的不会输出
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
# a 不等于 b
```

> 乘号(*)前边必须加反斜杠(\)才能实现乘法运算；


### 关系运算符
> 关系运算符只支持数字，不支持字符串，除非字符串的值是数字。（有待考证，我试着使可以的）

| 运算符 | 说明                                                | 举例                     |
| ------ | --------------------------------------------------- | ------------------------ |
| -eq    | 检测两个数是否相等，相等返回 true                   | [ $a -eq $b ] 返回 false |
| -ne    | 检测两个数是否不相等，不相等返回 true               | [ $a -ne $b ] 返回 true  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true     | [ $a -gt $b ] 返回 false |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true     | [ $a -lt $b ] 返回 true  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true | [ $a -ge $b ] 返回 false |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true | [ $a -le $b ] 返回 true  |

示例：
```bash
a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi
```
输入： 
```
10 -eq 20: a 不等于 b
10 -ne 20: a 不等于 b
10 -gt 20: a 不大于 b
10 -lt 20: a 小于 b
10 -ge 20: a 小于 b
10 -le 20: a 小于或等于 b
```

### 布尔运算符

| 运算符 | 说明                                              | 举例                                   |
| ------ | ------------------------------------------------- | -------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true | [ ! false ] 返回 true                  |
| -o     | 或运算，有一个表达式为 true 则返回 true           | [ $a -lt 20 -o $b -gt 100 ] 返回 true  |
| -a     | 与运算，两个表达式都为 true 才返回 true           | [ $a -lt 20 -a $b -gt 100 ] 返回 false |

示例：
```bash
a=10
b=20

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi
```

输出：
```
10 != 20 : a 不等于 b
10 小于 100 且 20 大于 15 : 返回 true
10 小于 100 或 20 大于 100 : 返回 true
10 小于 5 或 20 大于 100 : 返回 false
```

### 逻辑运算符
| 运算符 | 说明       | 举例                                       |
| ------ | ---------- | ------------------------------------------ |
| `&&`   | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| `||`   | 逻辑的 OR  | `[[ $a -lt 100 || $b -gt 100 ]] 返回 true` |

示例：
```bash
a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

if [[ $a -lt 100 || $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi
```

输出：
```
返回 false
返回 true
```

### 字符串运算符
| 运算符 | 说明                                    | 举例                   |
| ------ | --------------------------------------- | ---------------------- |
| =      | 检测两个字符串是否相等，相等返回 true   | [ $a = $b ] 返回 false |
| !=     | 检测两个字符串是否相等，不相等返回 true | [ $a != $b ] 返回 true |
| -z     | 检测字符串长度是否为0，为0返回 true     | [ -z $a ] 返回 false   |
| -n     | 检测字符串长度是否为0，不为0返回 true   | [ -n "$a" ] 返回 true  |
| $      | 检测字符串是否为空，不为空返回 true     | [ $a ] 返回 true       |

示例：
```bash
a="abc"
b="efg"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
```

```
abc = efg: a 不等于 b
abc != efg : a 不等于 b
-z abc : 字符串长度不为 0
-n abc : 字符串长度不为 0
abc : 字符串不为空
```

### 文件测试运算符
> 文件测试运算符用于检测 Unix 文件的各种属性。

| 运算符  | 说明                                                                      | 举例                    |
| ------- | ------------------------------------------------------------------------- | ----------------------- |
| -b file | 检测文件是否是块设备文件，如果是，则返回 true                             | [ -b $file ] 返回 false |
| -c file | 检测文件是否是字符设备文件，如果是，则返回 true                           | [ -c $file ] 返回 false |
| -d file | 检测文件是否是目录，如果是，则返回 true                                   | [ -d $file ] 返回 false |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true | [ -f $file ] 返回 true  |
| -g file | 检测文件是否设置了 SGID 位，如果是，则返回 true                           | [ -g $file ] 返回 false |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true                 | [ -k $file ] 返回 false |
| -p file | 检测文件是否是有名管道，如果是，则返回 true                               | [ -p $file ] 返回 false |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true                           | [ -u $file ] 返回 false |
| -r file | 检测文件是否可读，如果是，则返回 true                                     | [ -r $file ] 返回 true  |
| -w file | 检测文件是否可写，如果是，则返回 true                                     | [ -w $file ] 返回 true  |
| -x file | 检测文件是否可执行，如果是，则返回 true                                   | [ -x $file ] 返回 true  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true                    | [ -s $file ] 返回 true  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true                         | [ -e $file ] 返回 true  |

> 其他检查符：
> -S: 判断某文件是否 socket。
> -L: 检测文件是否存在并且是一个符号链接。

示例：
```bash
# 变量 file 表示文件 ./test.sh，它的大小为 100 字节，具有 rwx 权限。下面的代码，将检测该文件的各种属性：
file="./test.sh"
if [ -r $file ]
then
   echo "文件可读"
else
   echo "文件不可读"
fi
if [ -w $file ]
then
   echo "文件可写"
else
   echo "文件不可写"
fi
if [ -x $file ]
then
   echo "文件可执行"
else
   echo "文件不可执行"
fi
if [ -f $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
if [ -d $file ]
then
   echo "文件是个目录"
else
   echo "文件不是个目录"
fi
if [ -s $file ]
then
   echo "文件不为空"
else
   echo "文件为空"
fi
if [ -e $file ]
then
   echo "文件存在"
else
   echo "文件不存在"
fi
```

输出：
```
文件可读
文件可写
文件可执行
文件为普通文件
文件不是个目录
文件不为空
文件存在
```

## shell-验证(test)

### 数值运算测试
与关系运算符规则类似

| 运算符 | 说明           |
| ------ | -------------- |
| -eq    | 等于则为真     |
| -ne    | 不等于则为真   |
| -gt    | 大于则为真     |
| -lt    | 大于等于则为真 |
| -ge    | 小于则为真     |
| -le    | 小于等于则为真 |

```bash
#!/bin/bash

num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi

两个数相等！
```

```bash
#!/bin/bash

a=5
b=6

result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"

result 为： 11
```

### 字符串验证
| 运算符    | 说明                     |
| --------- | ------------------------ |
| =         | 等于则为真               |
| !=        | 不相等则为真             |
| -z 字符串 | 字符串的长度为零则为真   |
| -n 字符串 | 字符串的长度不为零则为真 |

```bash
#!/bin/bash

num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi

两个字符串不相等!
```


### 文件测试验证
| 运算符    | 说明                                 |
| --------- | ------------------------------------ |
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

```bash
cd /bin

if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi

文件已存在!
```

**与( -a )、或( -o )、非( ! )三个逻辑操作符**用于将测试条件连接起来，其优先级为："!"最高，"-a"次之，"-o"最低。例如：

判断 notFile 存在 或  bash 存在
```bash
cd /bin
if test -e ./notFile -o -e ./bash
then
    echo '至少有一个文件存在!'
else
    echo '两个文件都不存在'
fi

至少有一个文件存在！
```


## shell-函数

### 函数定义
```bash
[ function ] fn [()] {
    action;
    [return int;]
}
```
> `[]`代表可缺省

- 可以带`function fun()` 定义，也可以直接`fun()` 定义,不带任何参数。
- 参数返回值，可以显式加：`return` 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255

> 所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至shell解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。

**示例1**
```bash
#!/bin/bash

demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```

**示例2**函数返回值
```bash
#!/bin/bash

funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```
> 函数返回值在调用该函数后通过 `$?` 来获得 
> **`$?`仅代表上一条指令的执行结果**，无论式function 还是 echo，没有指定返回则为0，0代表执行成功
> 
> 函数与命令的执行结果可以作为条件语句使用。要注意的是，和 C 语言不同，shell 语言中 0 代表 true，0 以外的值代表 false。


### 函数参数
`在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个参数...`

带参数的函数示例：
```bash
#!/bin/bash
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !" #错误写法
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73

第一个参数为 1 !
第二个参数为 2 !
第十个参数为 10 !
第十个参数为 34 !
第十一个参数为 73 !
参数总数有 11 个!
作为一个字符串输出所有参数 1 2 3 4 5 6 7 8 9 34 73 !
```
> `$10 `不能获取第十个参数，获取第十个参数需要`${10}`。当n>=10时，需要使用`${n}`来获取参数。

### 函数执行信息

| 参数符号 | 说明                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `$#`     | 传递到脚本的参数个数                                                                                                         |
| `$*`     | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。                        |
| `$$`     | 脚本运行的当前进程ID号                                                                                                       |
| `$!`     | 后台运行的最后一个进程的ID号                                                                                                 |
| `$@`     | 与`$*`相同，但是使用时加引号，并在引号中**返回每个参数**。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| `$-`     | 显示Shell使用的当前选项，与set命令功能相同。                                                                                 |
| `$?`     | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。                                                                |


## shell-模块化

Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

基本语法：
```bash
. filename   # 注意点号(.)和文件名中间有一空格

或

source filename
```

示例：
创建两个sh：

- `a.sh`
```bash
#!/bin/bash

foo="a来的"
```

- `b.sh`
```bash
#!/bin/bash

source ./a.sh
# 或者使用 `. ./a.sh`

echo `文件a的变量：$foo`
```

执行`./b.sh`，输出：
`文件a的变量：a来的`

如果./b.sh不能执行，需要添加可执行权限：`chmod +x b.sh`
