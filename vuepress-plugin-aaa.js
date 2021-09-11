const { path } = require('@vuepress/utils')
module.exports = (options, ctx) => {
  return {
    name: 'aaa',
    clientAppSetupFiles: path.resolve(__dirname, './a.js'),
    /* extendsPageOptions: ({ filePath, title }) => {
      console.log(22, title)
      title = '222111'
      if (filePath?.startsWith('_posts/')) {
        return {
          frontmatter: {
            permalinkPattern: '/:year/:month/:day/:slug.html',
          },
        }
      }
      return {
        title: 999
      }
    }, */
    /* onInitialized: async (app) => {
      console.log(1111, options, app.options)
      const sidebar = [
        {
          text: 'Gui2de',
          link: '/广度知识',
          children: ['/广度知识/node.md', '/广度知识/shell.md', 
            {
              text: 'github',
              link: '/广度知识/testcafe.md'
            },
          ],
        },
        {
          text: 'Reference',
          children: ['/markdown.md'],
        }
      ]
      app.options.themeConfig.navbar = sidebar
      app.options.title = 'aaaaaaa'
      // await app.init()
      return sidebar
    } */
  }
}