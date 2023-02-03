export const projects: Project[] = [
  {
    title: '土豆和土豆丝小站',
    description: '基于Docusaurus v2 静态网站生成器实现个人博客',
    // preview: '/img/project/blog.png',
    website: 'https://wiki.lihx.top',
    source: 'https://github.com/justwe7/justwe7.github.io',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'file-chooser',
    description: '无UI的文件选择器，通过方法唤起文件选择器，输出base64与File。',
    website: 'https://www.npmjs.com/package/@justwe7/file-chooser',
    source: 'https://github.com/justwe7/npm-pkgs/tree/main/packages/file-chooser#readme',
    tags: ['opensource'],
    type: 'web',
  },
  {
    title: 'jw-cli',
    description: '集翻译、拉取项目模板快速开发功能的脚手架工具',
    website: 'https://www.npmjs.com/package/@justwe7/cli',
    source: 'https://github.com/justwe7/jw-cli',
    tags: ['opensource', 'favorite'],
    type: 'web',
  },
  {
    title: '小程序devtool增强工具',
    description: '解决小程序自带vconsole无法查看网络请求，storage等痛点的webpack插件',
    website: 'https://www.npmjs.com/package/@justwe7/mp-devtool-plugin',
    tags: ['opensource'],
    type: 'web',
  },
  {
    title: '自用的stylelint规则',
    description: '@justwe7/stylelint-order-standard',
    website: 'https://www.npmjs.com/package/@justwe7/stylelint-order-standard',
    tags: ['opensource'],
    type: 'web',
  },
  {
    title: 'vue-ssr',
    description: '从0实现一套vue-ssr项目框架',
    website: 'https://github.com/justwe7/Vue-SSR',
    tags: [],
    type: 'web',
  },
  {
    title: '吃什么呢',
    // preview: 'https://github.com/justwe7/mp-pick/blob/master/gh_7f17c5c9474c_258.jpg',
    description: '【小程序】纠结吃什么？我来伴你做选择！支持自定义随机项目/获取当前位置周边的餐馆',
    website: 'https://github.com/justwe7/mp-pick',
    tags: ['opensource'],
    type: 'toy',
  },
]

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal';

export type ProjectType =
  | 'personal'
  | 'web'
  | 'app'
  | 'toy'
  | 'other';

export type Project = {
  title: string;
  description: string;
  preview?: any;
  website: string;
  source?: string | null;
  tags: TagType[];
  type: ProjectType
};

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
};

export const TagList = Object.keys(Tags) as TagType[];

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project;
  group[type] = group[type] ?? [];
  group[type].push(project);
  return group;
},
  {} as Record<ProjectType, Project[]>
)

