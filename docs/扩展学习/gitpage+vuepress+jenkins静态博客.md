## Git Page
1. GitHub新建仓库(\<github user\>.github.io最终生成的访问链接是同名的，推荐配置此仓库名)
2. tab找到 `settings` => `GitHub Pages` => `source`下拉选择 `master branch`   
![image.png](https://image.littl.cn/images/2020/01/14/image.png)   
3. 现在，可以直接访问git page了，由于仓库master分支上还未部署html代码，所以可能是空白页面，接下来使用vuepress生成静态页面


## VuePress 

### 安装
1. git clone 刚才创建的仓库，作为vuepress的运行目录。
2. 安装 `npm i vuepress -D`，个人认为不需要将其安装到全局
3. 保证项目根路径下有一个markdown文件：`readme.md` 
   ```
    # 测试大标题

    - 列表1
    - 列表2
   ```
4. 运行 - 执行指令 `npx vuepress dev`
5. 构建发布 - `npx vuepress build`   
  默认会在 `.vuepress` => `dist` 目录下生成html页面，因为git page只识别master分支下的根目录或者docs/文件夹。稍后需要修改HTML的输出目录

### 配置
（1） 在根目录下新建目录 `.vuepress`   
（2） 自定义配置：新建文件 `config.js`  
更多配置查看[官网](https://vuepress.vuejs.org/zh/guide/)  

**由于vuepress暂时不支持根据目录自动生成侧边栏，自己写了一个vuepress的插件 `vuepress-auto-sidebar.js`,[仓库地址](https://github.com/justwe7/vuepress-auto-sidebar.js)**
```js
// 需要以commonjs规范导出配置
const autoSidebar = require('vuepress-auto-sidebar.js')
module.exports = {
  dest: 'docs', // 配置 html 的输出目录
  plugins: [
    [
      autoSidebar,
      // { base: 'doc' }
    ]
  ]
}
```

**再次打包`npx vuepress build`会生成一个docs目录，html文件生成在目录中**

（3） 将改动push到master分支，然后在setting中修改Git Page的设置，选中`master branch/docs folder`  
（4） 访问Git Page的url，可以看到vuepress生成的静态页面已经生效  

## Jenkins部署
> 首先在GitHub仓库新增一个feature分支

### （1）新建一个构建任务
选择第一项：`Freestyle project`

### （2）配置源码地址
指定拉取的分支为feature，**以后feature用来更新内容，master分支只用来部署HTML页面**（对应的，需要基于master分支拉取一个feature分支并push到GitHub仓库）  
![image8c8c0.png](https://image.littl.cn/images/2020/01/14/image8c8c0.png)

### （3）配置构建任务
![imagecf199.png](https://image.littl.cn/images/2020/01/14/imagecf199.png)   
弹出的输入框中填写如下shell指令：  
```shell
#!/bin/bash
echo "安装依赖..."
npm i
echo "安装依赖成功，开始打包..."
npm run build
cd docs
git init
echo "开始发布到远端..."
git config user.name 'justwe7'
git config user.email 'ilihuaxi@gmail.com'
git remote add origin https://name:password@github.com/justwe7/blog.git

git add .
git commit -m 'jenkins: auto deploy'
git push origin HEAD:master --force
echo "发布完成！！！"
```

> git config username和email信息需要填写自己的

> remote地址name和password需要替换成自己的GitHub的name和密码

此时点击build应该可以将feature分支的markdown文章生成html静态页面，并将html文件推送到master下，目录结构差不多是这样：  
![image2f410.png](https://image.littl.cn/images/2020/01/14/image2f410.png)

😂需要再去settings将Git Page的select改回`master`。--- 页面可以正常访问了。

**构建后要将当前的文件清空，避免影响下次构建**
选中`Delete workspace when build is done`：    
![image66c2b.png](https://image.littl.cn/images/2020/01/14/image66c2b.png)


### （4）配置git hooks触发自动构建

#### 生成GitHub token
1. 进入GitHub，点击右上角头像 => settings
2. 左边找到 Developer settings 点击
3. 点击 Personal access tokens   
[![imaged5c7d.png](https://image.littl.cn/images/2020/01/14/imaged5c7d.png)](https://image.littl.cn/image/XB48)
4. 点击右上角的Generate new token按钮，生成的token只会展示一次，记得保存好

#### Jenkins配置
1. 去到Jenkins首页。在系统设置页面找到”GitHub”，点击添加GitHub Server，如下图，名称随便起，API URL填写https://api.github.com，凭据位置如下图红框所示，选中管理 Hook选择Add ->Jenkins：

![image.png](https://image.littl.cn/images/2020/01/04/image.png)

2. 填写刚刚从GitHub生成的token：  
![image242f4.png](https://image.littl.cn/images/2020/01/04/image242f4.png)

3. 配置完成可以试试是否可以正确连接：
![image11a35.png](https://image.littl.cn/images/2020/01/04/image11a35.png)

4. 勾选`为 Github 指定另外一个 Hook URL`，将生成的Jenkins hook地址复制
![imagee3427.png](https://image.littl.cn/images/2020/01/14/imagee3427.png)

5. 去到GitHub的仓库，settings => webhooks 点击add webhooks按钮,会要求输入GitHub密码，然后在输入框中填写Jenkins hook的地址

![imagee4ac4.png](https://image.littl.cn/images/2020/01/14/imagee4ac4.png)

6. 回到Jenkins任务配置，添加两项配置：
secret 选择刚刚在Jenkins配置中添加的GitHub token的label
  
![image7c0cc.png](https://image.littl.cn/images/2020/01/14/image7c0cc.png)

！！保存

7. 此时在GitHub，feature分支push会触发GitHub hook => Jenkins拉取代码 => 自动打包 => push到仓库master分支，实现自动化部署静态笔记
