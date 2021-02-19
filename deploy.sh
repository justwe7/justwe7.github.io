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
# # echo "$MD_TEXT" > ${WORKSPACE}/docs/readme.md
cd docs

git init

echo "开始发布到远端..."
git config user.name 'justwe7'
git config user.email 'ilihuaxi@gmail.com'
git remote add origin https://justwe7:${GITHUB_TOKEN}@github.com/justwe7/blog.git

git add .
git commit -m 'travis-ci: deploy'
git push origin HEAD:master --force
echo "发布完成！！！"