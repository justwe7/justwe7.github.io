// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
// const lightCodeTheme = require('prism-react-renderer/themes/ultramin');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '土豆和土豆丝 - justwe7 Wiki',
  tagline: 'Hi, jser. Enjoy It!',
  url: 'https://justwe7.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favorite.ico',
  customFields: {
    homeCatalog: require('./getArticlesSummary') // 获取docs目录的文件及层级关系，用于首页大纲渲染
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'justwe7', // Usually your GitHub org/user name.
  projectName: 'justwe7.github.io', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    [require.resolve('./plugins/baidu-analytics'), { secret: '03bd357b8e5a65d704a7acbc2ed52566' }],
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
    '@docusaurus/theme-live-codeblock',
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
            'https://github.com/justwe7/justwe7.github.io/blob/feature/',
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
        googleAnalytics: {
          trackingID: '4395927556',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-4LKHLLWJBC',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'keywords', content: '前端开发，前端开发博客，justwe7，JavaScript，html，css，js，jQuery，vue，webpack'}],
      // announcementBar: {
      //   content: '🚀 如果你觉得还不错, 就给一个 ⭐️ Start 吧 ~ <a target="_blank" rel="noopener noreferrer" href="https://github.com/justwe7/justwe7.github.io/tree/feature">Click here</a> ',
      //   backgroundColor: '#222831',
      //   textColor: '#A7D129',
      // },
      navbar: {

        hideOnScroll: true,
        title: 'justwe7的Wiki',
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
          {href: 'https://lihx.top', label: '个人博客', position: 'right'},
          {
            href: 'https://github.com/justwe7/justwe7.github.io',
            label: 'GitHub',
            className: "header-github-link",
            "aria-label": "GitHub repository",
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        /* links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
              {
                label: 'Blog',
                to: '/blog',
              }
            ],
          },
        ], */
        copyright: `Copyright © ${new Date().getFullYear()} justwe7@<a target='_blank' href='https://github.com/justwe7/justwe7.github.io/tree/feature'>Wiki</a>, Power by Docusaurus.`,
      },
      colorMode: {
        // defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        config: {}
      }
    }),
};

module.exports = config;
