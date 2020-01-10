module.exports = {
  home: true,
  title: '学习笔记',
  description: '记录平时所接触到的知识点',
  plugins: [
    [
      require('../slideBar'),
      { titleEllipsis: 10 }
    ]
  ],
  // plugins: ['autobar'],

  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}], 'rpurl'],
  themeConfig: {
    // lastUpdated: true
    repoLabel: '查看原文',
    repo: 'vuejs/vuepress',
    lastUpdated: 'Last Updated',
    smoothScroll: true
  }
}
