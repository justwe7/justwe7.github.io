const path = require('path')
const { Joi } = require('@docusaurus/utils-validation');

async function docusaurusPluginBaiduAnalytics(context, options) {
  const { secret } = options

  return {
    name: 'docusaurus-plugin-baidu-analytics',

    getClientModules() {
      return [path.resolve(__dirname, './core')]
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              defer: true,
            },
            innerHTML: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${secret}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `,
          },
        ],
      }
    },
  }
}

const pluginOptionsSchema = Joi.object({
  secret: Joi.string().required()
});

docusaurusPluginBaiduAnalytics.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(pluginOptionsSchema, options);
  return validatedOptions;
};

module.exports = docusaurusPluginBaiduAnalytics
