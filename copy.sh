#!/bin/bash
echo "登录..."
export SSHPASS=$DEP_PASS

sshpass -e ssh -o stricthostkeychecking=no tudou@120.53.221.250
echo "链接..."
ls
echo "复制..."
rsync -avzuP -e tudou@120.53.221.250:/www/wwwroot/chevereto/images origin-img
echo "复制完成..."

cd origin-img
ls