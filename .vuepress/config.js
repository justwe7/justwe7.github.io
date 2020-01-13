const autoSidebar = require('vuepress-auto-sidebar.js')
module.exports = {
  home: true,
  title: '学习笔记',
  description: '记录平时所接触到的知识点',
  dest: 'docs',
  base: 'blog',
  plugins: [
    [
      autoSidebar,
      // { base: 'doc' }
      // { titleOverflow: 20, ignoreFilder: ['doc'] }
    ]
  ],
  themeConfig: {
    repoLabel: 'GitHub',
    repo: 'https://github.com/justwe7/blog',
    lastUpdated: '最近提交',
    docsDir: '/docs',
    docsBranch: 'feature',
    editLinks: true,
    editLinkText: '纠正错误',
    smoothScroll: true
  }
}
