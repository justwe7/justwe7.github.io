#!/bin/bash

foo=justwe
echo foo
echo "输出变量：foo"
echo '输出变量：$foo'
echo "输出变量：$foo"
# echo `输出日期：$foo` # 这条指令不能正常执行
echo '输出日期：`date`' # 如果反引号括起来的命令又被单引号括起来，那么这条命令不会执行，`date`会被当成普通字符输出
echo "输出日期：`date`" # 反引号的命令会正常执行
echo "输出日期：$(date)" # $(date) 可以正常执行
