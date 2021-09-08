var exports = module.exports
const getPath = (path) => {
  if (/^\//.test(path)) return path
  return '/'+path
}
/* 
  根节点处理
*/
exports.parseRootPath = (pathArr, fileName, fullPath, sidebar) => {
  pathArr.forEach(pathName => {
    let sidebarIdx = null
    const curObj = sidebar.filter((item, idx) => {
      if (item.text === pathName) {
        sidebarIdx = idx
        return true
      }
      return false
    })
    if (curObj.length) {
      if (!sidebar[sidebarIdx].children) {
        sidebar[sidebarIdx].children = []
      }
      sidebar[sidebarIdx].children.push({ text: fileName, link: getPath(fullPath) })
    } else {
      sidebar.push({
        text: pathName,
        path: '/' + pathName,
        children: [{ text: fileName, link: getPath(fullPath) }]
      })
    }
  })
}

/* 
·多级路径处理
*/
exports.parseLeafPath = (fullPathArr, fileName, fullPath, sidebar) => {
  let HEAD = sidebar
  const pathArr = fullPathArr.slice(0)
  pathArr.forEach(pathName => {
    let _HEAD = HEAD.filter(item => pathName === item.text)
    if (_HEAD.length) {
      HEAD = _HEAD[0]
      HEAD = HEAD.children
    } else {
      HEAD.push({
        text: pathName,
        children: []
      })
      HEAD = HEAD[HEAD.length - 1].children
    }
  })
  HEAD.push({ text: fileName, link: getPath(fullPath) })
}
