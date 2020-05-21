#!/bin/sh

a="hello,world,nice,to,meet,you"
#要将$a分割开，先存储旧的分隔符
OLD_IFS="$IFS"
 
#设置分隔符
IFS="," 
 
#如下会自动分隔
arr=($a)
 
#恢复原来的分隔符
IFS="$OLD_IFS"
 
#遍历数组
for s in ${arr[@]}
do
echo "$s"
done