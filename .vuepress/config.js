module.exports = {
  home: true,
  title: '学习笔记',
  description: '记录平时所接触到的知识点',
  plugins: [require('../slideBar')],
  // plugins: ['autobar'],

  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}], 'rpurl'],
  themeConfig: {
    // sidebar: [
    //   {
    //     title: '基础概念',
    //     /* children: [
    //       ['基础概念/函数定义的5种方式', '函数定义的5种方式'],
    //       '基础概念/git如何保持commit信息整洁',
    //       '基础概念/vue中v-model和sync修饰符',
    //       '基础概念/模块化'
    //     ] */
    //     children: [
    //       [
    //         '基础概念/for-in遍历对象属性的顺序与定义是否相同',
    //         'for-in遍历对象属性的顺序与定义是否相同.md'
    //       ],
    //       ['基础概念', 'git基本工作流程.md'],
    //       ['基础概念', 'git如何保持commit信息整洁.md'],
    //       ['基础概念', 'git常用的分支操作.md'],
    //       ['基础概念', 'vue中v-model和sync修饰符.md'],
    //       ['基础概念', '函数定义的5种方式.md'],
    //       ['基础概念', '模块化.md']
    //     ]
    //   }
    // ]
    // displayAllHeaders: true,
    // sidebar: 'auto'
    /* sidebar: {
      title: 'Group 2',
      children: [
        '/',
        '/深度篇/正则速查表',
        '/深度篇/发布订阅模式'
      ]
    }, */

    // sidebar: [
    //   '/',
    //   '/深度篇/正则速查表',
    //   '/深度篇/发布订阅模式'
    // ]
    /* sidebar: [{ title: '基础概念',
    children:
     [ ['基础概念/函数定义的5种方式', '函数定义的5种方式'],
       '基础概念/git如何保持commit信息整洁',
       '基础概念/vue中v-model和sync修饰符',
       '基础概念/模块化' ] },
  { title: '广度篇',
    children:
     [ '广度篇/vscode',
       '广度篇/gitpage+vuepress+jenkins静态博客' ] },
  { title: '深度篇',
    children:
     [ '深度篇/chrome性能',
       '深度篇/vue实现原理',
       '深度篇/vue生命周期',
       '深度篇/从0开始手写一个promise',
       '深度篇/前端性能优化',
       '深度篇/发布订阅模式',
       '深度篇/正则速查表' ] } ] */
    /* sidebar: {
      '/深度篇/': [
       '正则速查表',
       '发布订阅模式'
      ]
    } */
  }
}
