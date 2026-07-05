const path = require('path')
const beian = '晋ICP备2021001641号'

const announcementBarContent = `🚀 如果你觉得还不错, 就给一个 ⭐️ Start 吧 ~ <a target="_blank" rel="noopener noreferrer" href="https://github.com/justwe7/justwe7.github.io/tree/feature">Click here</a> `

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '土豆和土豆丝写字的地方',
  titleDelimiter: '-',
  url: 'https://wiki.lihx.top',
  // url: 'https://justwe7.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'justwe7',
  projectName: 'blog',
  tagline: '会当凌绝顶，一览众山小',
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: 'img/logo.png',
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: announcementBarContent,
    // },
    metadata: [
      {
        name: 'keywords',
        content: '土豆和土豆丝'
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web, 小程序',
      },
      {
        name: 'keywords',
        content: '前端开发',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    navbar: {
      title: '土豆和土豆丝',
      logo: {
        alt: '土豆和土豆丝',
        src: 'hero.png',
        // srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '开发笔记',
          position: 'right',
          to: 'docs'
        },
        {
          label: '生活日常',
          position: 'right',
          type: 'docSidebar',
          sidebarId: 'lifeSidebar',
          docsPluginId: 'life',
        },
        // {
        //   label: '博客',
        //   position: 'right',
        //   to: 'archive',
        // },
        // {
        //   label: '博客',
        //   position: 'right',
        //   items: [
        //     {
        //       label: '归档',
        //       to: 'archive',
        //     },
        //     {
        //       label: '标签',
        //       to: 'tags',
        //     },
        //   ],
        // },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          label: '网址收藏',
          position: 'right',
          to: 'website',
        },
        // { href: 'https://lihx.top', label: '个人博客', position: 'right' },
        {
          href: 'https://github.com/justwe7/justwe7.github.io',
          label: 'GitHub',
          position: 'right',
        },
        /* {
          type: 'localeDropdown',
          position: 'right',
        }, */
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '学习笔记',
              to: 'docs',
            },
            {
              label: '个人项目',
              to: 'project',
            },
            // {
            //   label: '博客归档',
            //   to: 'archive',
            // },
            {
              label: '标签',
              to: 'tags',
            }
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/justwe7',
            },
            {
              label: 'bilibili',
              href: 'https://space.bilibili.com/6871701',
            },
            {
              label: 'v2ex',
              href: 'https://v2ex.com/member/justwe7',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '网址收藏',
              position: 'right',
              to: 'website',
            },
            {
              html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img style="height:50px;margin-top:0.5rem" src="/img/buildwith.png" /><a/>`
            },
          ],
        },
      ],
      copyright: `<p><a href="http://beian.miit.gov.cn/" >${beian}</a></p><p>Copyright © ${new Date().getFullYear()} - PRESENT 土豆和土豆丝 Built with Docusaurus.</p>`,
    },
    prism: {
      //       const lightCodeTheme = require('prism-react-renderer/themes/github');
      // // const lightCodeTheme = require('prism-react-renderer/themes/ultramin');
      // const darkCodeTheme = require('prism-react-renderer/themes/dracula');
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java', 'php', 'rust', 'dart'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)'
      },
      config: {}
    },
    /* matomo: {
      matomoUrl: 'https://matomo.kuizuo.cn/',
      siteId: '1',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
    }, */
    giscus: {
      repo: 'justwe7/justwe7.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnkxOTM2NTg4MjQ=',
      category: 'General',
      categoryId: 'DIC_kwDOC4r_yM4CT9_2',
      mapping: 'title',
      lang: 'zh-CN',
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    socials: {
      github: 'https://github.com/justwe7',
      bilibili: 'https://space.bilibili.com/6871701',
      qq: 'https://wpa.qq.com/msgrd?v=3&amp;uin=747399919&amp;site=qq',
      cloudmusic: 'https://music.163.com/#/user/home?id=3657515',
    },
  },
  onBrokenLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          editUrl: 'https://github.com/justwe7/justwe7.github.io/blob/feature/',
          // showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        googleAnalytics: {
          trackingID: '4395927556',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-4LKHLLWJBC',
          anonymizeIP: true,
        },
        // debug: true,
      }),
    ],
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

  plugins: [
    // 'docusaurus-plugin-matomo',
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    [require.resolve('./src/plugin/baidu-analytics'), { secret: '03bd357b8e5a65d704a7acbc2ed52566' }],
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'life',
        path: 'life',
        routeBasePath: 'life',
        sidebarPath: require.resolve('./sidebarsLife.js'),
        include: ['**/*.md', '**/*.mdx'],

      },
    ],
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'), {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/justwe7/justwe7.github.io/edit/feature/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogSidebarCount: 10,
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '土豆和土豆丝',
          copyright: `Copyright © ${new Date().getFullYear()} 土豆和土豆丝 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      }
    ],
    [
      '@docusaurus/plugin-ideal-image', {
        disableInDev: false,
      }
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'hero.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [],
  scripts: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      defer: true,
      'data-cf-beacon': '{"token": "1e38779c7e05409dadde35ad20a3d1df"}',
    },
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: [/* 'en',  */'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
}

module.exports = config
