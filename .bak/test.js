const globby = require('globby')
// https://stackoverflow.com/questions/23055651/disable-developer-mode-extensions-pop-up-in-chrome/38011386#38011386
const getConfig = (() => {
  const defaultConf = {
    // pattern: ['**/*.md', '!*.md'],
    ignoreRoot: true,
    ignoreFilder: ['doc'],
    titleoverflow: 13,
    base: '',
    gitignore: true
  }
  return function(_config) {
    const config = Object.assign({}, defaultConf, _config)
    Object.defineProperty(config, 'pattern', {
      get: function() {
        let { ignoreRoot = true, base, ignoreFilder = [] } = config
        ;(base && !base.endsWith('/')) && (base = `${base}/`)
        const ruleStr = `${ignoreRoot ? '!*.md' : ''}&&${base}**/*.md`
        const pattern = ruleStr.split('&&').concat(ignoreFilder.map(path => `!${path}/**`))
        return pattern
      }
    })
    return config
  }
})()

const obj = {
  ignoreRoot: true,
  // base: 'doc'
}

const config = getConfig(obj)
console.log(config)
const { pattern, gitignore } = getConfig(obj)
// const pattern = [`${base}/**/*.md`]

console.log(globby.sync(['**/*.md', '!*.md'], {gitignore: true}))
const list = globby.sync(pattern, { gitignore })
// const list = globby.sync(['基础概念/**/*.md', '!*.md'], {gitignore: true})
console.log(list)

return false
const sidebar = []

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

list.forEach(path => {
  const pathArr = path.split('/')
  const fileName = pathArr.pop()

  const pathLevel = pathArr.length
  if (!pathLevel) {
    return false
  }
  if (pathLevel === 1) {
    setRootItem(pathArr, fileName, path)
  } else {
    setLeafItem(pathArr, fileName, path)
  }
})
console.log(JSON.stringify(sidebar))
