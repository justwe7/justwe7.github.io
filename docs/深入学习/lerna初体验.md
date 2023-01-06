>  自己在github创建的仓库太多了，有个idea就搞个仓库挖个坑，搞来搞去啥都没完成还留了一堆破烂仓库，删也不是不删也不是😂

发现[lerna.js](https://lerna.js.org/)升到了v6，与老版本使用上有一点点区别，正好拿来练练手，把现有的仓库给“治理”一下~

## 迁移旧项目

1. 首先创建`npm -y`创建`package.json`配置
2. 在项目根目录下执行`npx lerna -init`，lerna会自动生成`lerna.json`，同时在`package.json`新增一个配置项: `"workspaces": [
       "packages/*"
     ]`，还会在根目录下创建一个packages目录，该目录存放以后要维护的项目
3. 可以通过`npx lerna import ./mp-devtool`把现有的项目复制到`packages`目录下(这里踩到一个坑，导入的时候会把子应用package.json改成根目录出现问题，目前我是手动复制过来的)，或者通过`lerna create [pkg-name]`创建一个新的包。这里我的目的是迁移旧包选择了前者。
4. 这时候就要把所有子应用的 `node_moudles` 清空掉，然后在根目录`npm install`，lerna会帮我们安装所有子应用的依赖（新版本的lerna会弃用`lerna  bootstrap`，完全采用
5. 这个时候执行 `npx lerna run dev` 会启动`packages`下所有子应用相应的`npm script`

如果仅仅想运行指定的子项目，可以通过 `npx lerna run dev --scope=[subpkg-name]` 运行指定的子应用

- [lerna的常用指令](https://lerna.js.org/docs/api-reference/commands)