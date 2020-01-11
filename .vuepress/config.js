const autoSidebar = require('vuepress-auto-sidebar.js')
module.exports = {
  home: true,
  title: '学习笔记',
  description: '记录平时所接触到的知识点',
  plugins: [
    [
      autoSidebar,
      // { base: 'doc' }
      // { titleOverflow: 20, ignoreFilder: ['doc'] }
    ]
  ],
  themeConfig: {
    repoLabel: '查看原文',
    repo: 'https://github.com/justwe7/blog',
    lastUpdated: '最近提交',
    editLinks: true,
    editLinkText: '完善此文档',
    smoothScroll: true
  }
}
