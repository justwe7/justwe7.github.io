// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const globby = require('globby')

const aArticles = globby.sync(['docs/**/*.md', '!*.md'], { gitignore: true })
// aArticles.then(res => {
//   console.log(res)
// })
// console.log(111, aArticles, 99)

const oArticleCatalog = aArticles.reduce(function(target, v, currentIndex) {
  const arr = v.substring(5).split('/')
  const root = arr[0]
  const name = arr[arr.length - 1].split('.')[0]
  // const item = `  - [${name}](/blog/${v})`
  const item = {
    title: name,
    link: `/blog/${v.replace(/(.md)$/, '')}`
  }
  if (target[root]) {
    target[root].push(item)
  } else {
    target[root] = [item]
  }
  return target
}, {})
// console.log(oArticleCatalog)

// let temp = fs.readFileSync('./catalog-template.md', 'utf8')
// for (const key in oArticleCatalog) {
//   if (oArticleCatalog.hasOwnProperty(key)) {
//     const list = oArticleCatalog[key]
//     const reg = new RegExp(`\\$${key}\\$`)
//     temp = temp.replace(reg, list.join('\n'))
//   }
// }

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '小前端的笔记 - justwe7 Wiki',
  tagline: 'Hi, jser. Enjoy It!',
  url: 'https://justwe7.github.io',
  baseUrl: '/blog/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favorite.ico',
  customFields: {
    homeCatalog: oArticleCatalog
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'justwe7', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/justwe7/blog/blob/feature/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '前端笔记 - justwe7のWiki',
        logo: {
          alt: 'My Site Logo',
          src: 'hero.png',
          // src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {href: 'https://lihx.top', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/justwe7/blog',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/intro',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} justwe7@<a target='_blank' href='https://github.com/justwe7/blog/tree/feature'>blog</a>, Inc. Built with Docusaurus.转载请标明来源`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
