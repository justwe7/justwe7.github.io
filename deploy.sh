#!/bin/bash

# echo --------------------------
# echo 打包分支：${GIT_BRANCH}
# echo --------------------------
# echo 配置新：$MASTER_FILE

# echo "安装依赖..."
# # shopt -s expand_aliases
# npm i
# echo "安装依赖成功，开始打包..."
# npm run build
# # cp -r docs /home/temp_filder
# # cp -f readme.md docs/
# cp -f .README.md ./docs/README.md
cp -f CNAME build/
cd build

git init

echo "开始覆盖提交..."
git config user.name 'justwe7'
git config user.email 'ilihuaxi@gmail.com'
# git remote add origin https://justwe7:${GITHUB_TOKEN}@github.com/justwe7/justwe7.github.io.git
git remote add origin git@github.com:justwe7/justwe7.github.io.git
git remote add gitee https://justwe7:${GITEE_TOKEN}@gitee.com/justwe7/justwe7.github.io.git

echo "[https://wiki.lihx.top/](https://wiki.lihx.top/)" > README.md
git add .
git commit -m 'travis-ci: deploy'
git push origin HEAD:master --force
git push gitee HEAD:master --force
echo "提交完成！！！"
