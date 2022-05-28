// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
// const lightCodeTheme = require('prism-react-renderer/themes/ultramin');
const darkCodeTheme = require('prism-react-renderer/themes/synthwave84');
const globby = require('globby')

const aArticles = globby.sync(['docs/**/*.md', '!*.md'], { gitignore: true })

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

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '小前端的笔记 - justwe7 Wiki',
  tagline: 'Hi, jser. Enjoy It!',
  url: 'https://justwe7.github.io',
  baseUrl: '/blog/',
  onBrokenLinks: 'warn',
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
  plugins: [
    'plugin-image-zoom'
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      },
    ],
  ],

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
      metadata: [{name: 'keywords', content: '前端开发，前端开发博客，justwe7，JavaScript，html，css，js，jQuery，vue，webpack'}],
      navbar: {

        hideOnScroll: true,
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
