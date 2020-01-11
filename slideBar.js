const globby = require('globby')
const sidebar = []

const getConfig = (() => {
  const defaultConf = {
    // pattern: ['**/*.md', '!*.md'],
    ignoreRoot: true, // 隐藏base目录下的md文件
    ignoreFilder: [], // 忽略的目录
    titleOverflow: 13, // 隐藏title
    suffix: false, // 展示后缀 xx.md
    base: '', // base路径
    gitignore: true
  }
  return function(_config) {
    const config = Object.assign({}, defaultConf, _config)
    Object.defineProperty(config, 'pattern', {
      get: function() {
        let { ignoreRoot = true, base, ignoreFilder = [] } = config
        base && !base.endsWith('/') && (base = `${base}/`)
        const ruleStr = `${ignoreRoot ? '!*.md' : ''}&&${base}**/*.md`
        const pattern = ruleStr
          .split('&&')
          .concat(ignoreFilder.map(path => `!${path}/**`))
        return pattern
      }
    })
    return config
  }
})()

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
      sidebar[sidebarIdx].children.push([fullPath, fileName])
    } else {
      sidebar.push({
        title: pathName,
        children: [[fullPath, fileName]]
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
      curObj = curObj[curObj.length - 1].children
    }
  })
  curObj.push([fullPath, fileName])
}

module.exports = (options, ctx) => {
  // const aMdList = globby.sync(['**/*.md', '!*.md'], {gitignore: true})
  const { pattern, gitignore, titleOverflow, suffix } = getConfig(options)
  console.log(pattern, gitignore)
  // const pattern = [`${base}/**/*.md`]

  // console.log(globby.sync(['**/*.md', '!*.md'], {gitignore: true}))
  const aMdList = globby.sync(pattern, { gitignore })
  return {
    async ready() {
      const { themeConfig } = ctx.getSiteData ? ctx.getSiteData() : ctx

      aMdList.forEach(path => {
        const pathArr = path.split('/')
        let fileName = pathArr.pop()
        const pathLevel = pathArr.length
        if (!pathLevel) {
          return false
        }
        if (!suffix) {
          try {
            fileName = /(\S+)\.md/.exec(fileName)[1]
          } catch (error) {
            console.error(error)
          }
        }
        if (titleOverflow && !isNaN(Number(titleOverflow))) {
          fileName.length > titleOverflow &&
            (fileName = `${fileName.substr(0, titleOverflow)}...`)
        }
        if (pathLevel === 1) {
          // 层级为1直接操作 源数据
          setRootItem(pathArr, fileName, path)
        } else {
          // 多级目录文件 操作引用地址
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
      themeConfig.sidebar = sidebar
      return {}
    }
  }
}
