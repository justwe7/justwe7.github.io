module.exports = (() => {
  const defaultConf = {
    ignoreRoot: true, // 隐藏base目录下的md文件
    ignoreFilder: ['广度知识/shell'], // 忽略的目录
    titleOverflow: 30, // 隐藏title
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