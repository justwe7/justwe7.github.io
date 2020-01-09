const globby = require('globby');
// console.log(globby.sync(['**/*.md', '!*.md'], {gitignore: true}))
const list = globby.sync(['**/*.md', '!*.md'], {gitignore: true})
// const list = globby.sync(['基础概念/**/*.md', '!*.md'], {gitignore: true})
console.log(list)
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

/* const getItem = (pathArr, fileName, fullPath) => {
  // pathArr.length
  let curObj
  let sidebarIdx = null
  let title
  pathArr.forEach((path, deep) => {
    title = path
    if (deep === 0) { // 深度为0 代表一级目录
      curObj = sidebar.filter((item, idx) => {
        if (item.title === path) {
          sidebarIdx = idx
          // sidebar3Idx
          return true
        }
        return false
      })

      if (!curObj.length) {
        curObj = sidebar
      } else {
        curObj = sidebar[sidebarIdx].children
      }
      
    } else {
      let _curObj
      _curObj = curObj[0].children.filter((item, idx) => {
        if (item.title === path) {
          sidebarIdx = idx
          // sidebar3Idx
          return true
        }
        return false
      })
      if (_curObj.length) { // 能匹配到对应的目录
        curObj = curObj[0].children
        console.log(title, fullPath, JSON.stringify(curObj),'---------------')
        let __idx
        curObj.forEach((item, _idx) => {
          if (item.title === path) {
            __idx = _idx
            // curObj = item.children
          }
        })
        console.log(JSON.stringify(curObj),__idx, JSON.stringify(curObj[__idx]), 'lllllllllllllllllllllllll99')
        curObj = curObj[__idx]
      } else { // 添加对应的目录
        // console.log(title, fullPath, JSON.stringify(curObj),'++++++++++++++++++++')
        curObj[0].children.push({
          title: title,
          children: [[fullPath, fileName]]
        })
      }
    }
    
  })
  // console.log(JSON.stringify(curObj))

  if (Object.prototype.toString.call(curObj) === '[object Object]') {
    curObj.children.push([
      fullPath, fileName
    ])
    return false
  }

  if (curObj.length) {
    if (!curObj[0].children) {
      curObj[0].children = []
    }
    console.log(fullPath, fileName)
    curObj[0].children.push([
      fullPath, fileName
    ])
  } else {
    curObj.push({
      title: title,
      children: [
        [fullPath, fileName]
      ]
    })
  }
}
 */
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
