#!/bin/bash
echo "登录..."
export SSHPASS=$DEP_PASS
# sshpass -e ssh -o stricthostkeychecking=no tudou@120.53.221.250
ls
echo "复制..."
mkdir nihao
sshpass -p ssh rsync -avzu tudou@120.53.221.250:/www/wwwroot/chevereto/images nihao
echo "复制完成..."
ls
cd nihao
ls