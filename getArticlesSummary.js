const globby = require('globby')
const fs = require('fs');
const aArticles = globby.sync(['docs/**/*.md', '!*.md'], { gitignore: true })

/* 获取docs目录的文件及一级嵌套，用于首页大纲渲染 */
const oArticleCatalog = aArticles.reduce(function(target, relativeFilePath, currentIndex) {
  const arr = relativeFilePath.substring(5).split('/')
  const root = arr[0]
  const name = arr[arr.length - 1].split('.')[0]
  const absoluteFilePath = process.cwd() + '/' + relativeFilePath
  let tag = ''
  if (/docs\/(\W+)\//.test(relativeFilePath)) {
    tag = RegExp.$1
  }
  // const item = `  - [${name}](/blog/${relativeFilePath})`
  const item = {
    title: name,
    tag: root,
    // absoluteFilePath,
    // summary: fs.readFileSync(absoluteFilePath, { encoding: 'utf-8'}).substring(0, 50),
    link: `/${relativeFilePath.replace(/(.md)$/, '')}`
  }
  if (target[root]) {
    target[root].push(item)
  } else {
    target[root] = [item]
  }
  return target
}, {})
// console.log(oArticleCatalog)

module.exports = oArticleCatalog
