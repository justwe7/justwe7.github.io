// const autoSidebar = require('vuepress-auto-sidebar.js')
const path = require('path');
const getNavBar = require('./auto-sidebar');

module.exports = {
  bundler: '@vuepress/bundler-webpack',
  lang: 'zh-CN',
  home: true,
  title: '前端日志',
  description: '土豆和土豆丝的学习记录',
  dest: 'docs',
  base: '/blog/',
  // sidebar: 'auto',
  // permalink: "/:year/:month/:day/:slug",
  plugins: [
    ['@vuepress/plugin-back-to-top', {}],
    ['@vuepress/plugin-nprogress', {}],
    ['@vuepress/plugin-medium-zoom'],
    [
      '@vuepress/plugin-google-analytics',
      { id: 'GG-KXX3D4CCYS' }
    ],
    // [
    //   // 'vuepress-plugin-auto-sidebar',
    //   path.resolve(__dirname, '../vuepress-plugin-aaa'),
    // ],
    // [
    //   'vuepress-plugin-comment',
    //   {
    //     choosen: 'valine',
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: '#valine-vuepress-comment',
    //       avatar: 'monsterid',
    //       appId: 'hAfrJDiMKxLmXVpSnRDIp1JT-gzGzoHsz',
    //       appKey: 'uJ7s48tGgYtEqI5tSFPMTymR',
    //     },
    //   },
    // ],
  ],
  head: [['link', { rel: 'icon', href: '/blog/favorite.ico' }]],
    backToHome: '返回首页',
    themeConfig: {
    logo: '/hero.png',
    toggleDarkMode: '切换深色模式',
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      ...getNavBar(),
      /* {
        text: 'Gui2de',
        link: '/广度知识',
        children: ['/广度知识/node.md', '/广度知识/shell.md', 
          {
            text: 'github',
            link: '/广度知识/testcafe.md',
            children: ['/markdown.md']
          },
        ],
      }, */
      {
        text: '个人博客',
        link: 'https://lihx.top'
      }
    ],
    repoLabel: 'GitHub',
    repo: 'https://github.com/justwe7/blog',
    lastUpdatedText: '最近更新',
    backToHome: '返回首页',
    contributors: false, // 贡献者
    // activeHeaderLinks: false, //用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新
    docsDir: '',
    docsBranch: 'feature',
    editLinks: true,
    editLinkText: '纠正错误',
    smoothScroll: true,
  },
}
