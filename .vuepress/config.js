const autoSidebar = require('vuepress-auto-sidebar.js')
module.exports = {
  home: true,
  title: '前端日志',
  description: '记录平时所接触到的知识点',
  dest: 'docs',
  base: '/blog/',
  // permalink: "/:year/:month/:day/:slug",
  plugins: [
    ['@vuepress/nprogress'],
    ['@vuepress/back-to-top'],
    [
      autoSidebar,
      // { base: 'doc' }
      // { titleOverflow: 20, ignoreFilder: ['doc'] }
    ],
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine',
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          avatar: 'monsterid',
          appId: 'hAfrJDiMKxLmXVpSnRDIp1JT-gzGzoHsz',
          appKey: 'uJ7s48tGgYtEqI5tSFPMTymR',
        },
      },
    ],
  ],
  head: [['link', { rel: 'icon', href: '/favorite.ico' }]],
  themeConfig: {
    // sidebar: 'auto'
    repoLabel: 'GitHub',
    repo: 'https://github.com/justwe7/blog',
    lastUpdated: '最近提交',
    // displayAllHeaders: true,
    // activeHeaderLinks: false, //用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新
    docsDir: '',
    docsBranch: 'feature',
    editLinks: true,
    editLinkText: '纠正错误',
    smoothScroll: true,
  },
}
