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
