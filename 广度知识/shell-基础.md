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

2. 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```shell
/bin/sh test.sh
/bin/php test.php
```

> 这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

## echo
> 先学一学bash的 console.log 

### 显示普通字符串
```bash
$ echo "It is a test"
It is a test
# 双引号完全可以省略，以下命令与上面实例效果一致
$ echo It is a test
It is a test
```

### 显示转义字符
```bash
$ echo "\"It is a test\""
"It is a test"
```
下面部分为echo进阶，稍后看

### 显示变量
以下代码保存为 `test.sh`，name 接收标准输入的变量
```bash
#!/bin/sh
read name 
echo "$name It is a test"
```
运行shell `sh test.sh`（以shell环境来解释test.sh），结果将是:
```
OK                     #标准输入
OK It is a test        #输出
```

### 显示换行
**-e 开启转义**
```bash
echo -e "OK! \n" # -e 开启转义
echo "It is a test"
# 输出
OK!

It is a test
```

### 显示不换行
```bash
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
# 输出
OK! It is a test
```

### 显示结果定向至文件
> 可以读取变量内容，将内容写入到某文件。将 readme.md 文件写入内容: 读我
`echo "读我" > readme.md`

### 原样输出字符串，不进行转义或取变量(用单引号)
```bash
$ echo '$name\"'
$name\"
```

### 显示命令执行结果
```bash
$ echo `date`
Thu Jul 24 10:08:46 CST 2014
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
##### 用户配置区 开始 #####
#
#
# 这里可以添加脚本描述信息
# 
#
##### 用户配置区 结束  #####
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
