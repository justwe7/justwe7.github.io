const globby = require('globby');
const aMdList = globby.sync(['**/*.md', '!*.md'], {gitignore: true})
const sidebar = []

/* 
  根节点处理
*/
const setRootItem = (pathArr, fileName, fullPath) => {
  pathArr.forEach(pathName => {
    let sidebarIdx = null
    const curObj = sidebar.filter((item, idx) => {
      if (item.title === pathName) {
        sidebarIdx = idx
        return true
      }
      return false
    })
    if (curObj.length) {
      if (!sidebar[sidebarIdx].children) {
        sidebar[sidebarIdx].children = []
      }
      sidebar[sidebarIdx].children.push([
        fullPath, fileName
      ])
    } else {
      sidebar.push({
        title: pathName,
        children: [
          [fullPath, fileName]
        ]
      })
    }
  })
}

/* 
·多级路径处理
*/
const setLeafItem = (fullPathArr, fileName, fullPath) => {
  let curObj = sidebar
  const pathArr = fullPathArr.slice(0)
  pathArr.forEach(pathName => {
    let _cur = curObj.filter(item => pathName === item.title)
    if (_cur.length) {
      curObj = _cur[0]
      curObj = curObj.children
    } else {
      curObj.push({
        title: pathName,
        children: []
      })
      curObj = curObj[curObj.length-1].children
    }
  })
  curObj.push([fullPath, fileName])
}

module.exports = (options, ctx) => {
  return {
    async ready() {
      const {themeConfig} = ctx.getSiteData ? ctx.getSiteData() : ctx;
      console.log(options)
      const { titleEllipsis = null, } = options

      aMdList.forEach(path => {
        const pathArr = path.split('/')
        let fileName = pathArr.pop()
        const pathLevel = pathArr.length
        if (!pathLevel) {
          return false
        }
        if (titleEllipsis && !isNaN(Number(titleEllipsis))) {
          fileName = `${fileName.substr(0, titleEllipsis)}...`
        }
        if (pathLevel === 1) { // 层级为1直接操作 源数据
          setRootItem(pathArr, fileName, path)
        } else { // 多级目录文件 操作引用地址
          setLeafItem(pathArr, fileName, path)
        }
      })
      /* const {rootDir = ctx.sourceDir} = options;
      const {nav, sidebar} = await getConfig(rootDir, options);

      if (options.pinyinNav && nav.length) {
        translitePinyin(nav);
      }

      if (themeConfig.nav && themeConfig.nav.length) {
        themeConfig.nav = [...nav, ...themeConfig.nav]
      } else {
        themeConfig.nav = nav
      }

      themeConfig.sidebar = sidebar; */
      themeConfig.sidebar = sidebar;
      /* themeConfig.sidebar = [{ title: '基础概念',
    children:
     [ ['基础概念/函数定义的5种方式', '函数定义的5种方式'],
       '基础概念/git如何保持commit信息整洁',
       {
         title: 'synctitle',
         children: [
          '基础概念/vue中v-model和sync修饰符'
         ]
       },
       '基础概念/模块化' ] },
  { title: '广度篇',
    children:
     [ '广度篇/vscode',
       '广度篇/gitpage+vuepress+jenkins静态博客' ] },
  { title: '深度篇',
    children:
     [ '深度篇/chrome性能',
       '深度篇/vue实现原理',
       '深度篇/vue生命周期',
       '深度篇/从0开始手写一个promise',
       '深度篇/前端性能优化',
       '深度篇/发布订阅模式',
       '深度篇/正则速查表' ] } ] */
      return {};
    }
  }
}
