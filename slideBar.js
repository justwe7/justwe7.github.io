const globby = require('globby');
const list = globby.sync(['**/*.md', '!*.md'], {gitignore: true})
const sidebar = []


const getItem = (pathArr, fileName, fullPath) => {
  // pathArr.length
  pathArr.forEach((path, deep) => {
    let sidebarIdx = null
    if (deep === 0) { // 深度为0 代表一级目录  todo 优化为递归
      const curObj = sidebar.filter((item, idx) => {
        if (item.title === path) {
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
          title: path,
          children: [
            [fullPath, fileName]
          ]
        })
      }
    }
  })
}

module.exports = (options, ctx) => {
  return {
    async ready() {
      const {themeConfig} = ctx.getSiteData ? ctx.getSiteData() : ctx;
      console.log(themeConfig)

      
      list.forEach(path => {
        const pathArr = path.split('/')
        const fileName = pathArr.pop()

        const pathLevel = pathArr.length
        if (!pathLevel) {
          return false
        }
        if (pathLevel === 1) {
          getItem(pathArr, fileName, path)
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
