"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[905],{15680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>m});var n=r(96540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=s(r),d=o,m=u["".concat(p,".").concat(d)]||u[d]||f[d]||a;return r?n.createElement(m,c(c({ref:t},l),{},{components:r})):n.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:o,c[1]=i;for(var s=2;s<a;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},65264:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var n=r(58168),o=(r(96540),r(15680));const a={},c=void 0,i={unversionedId:"AI/\u673a\u5668\u4eba",id:"AI/\u673a\u5668\u4eba",title:"\u673a\u5668\u4eba",description:"1. \u542f\u52a8\u5bb9\u5668: sudo docker compose up -d",source:"@site/docs/AI/\u673a\u5668\u4eba.md",sourceDirName:"AI",slug:"/AI/\u673a\u5668\u4eba",permalink:"/docs/AI/\u673a\u5668\u4eba",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/AI/\u673a\u5668\u4eba.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Gpts\u63d0\u793a\u8bcd\u653b\u9632",permalink:"/docs/AI/Gpts\u63d0\u793a\u8bcd\u653b\u9632"},next:{title:"\u6a21\u578b\u533a\u522b",permalink:"/docs/AI/\u6a21\u578b\u533a\u522b"}},p={},s=[],l={toc:s},u="wrapper";function f(e){let{components:t,...r}=e;return(0,o.yg)(u,(0,n.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"\u542f\u52a8\u5bb9\u5668: sudo docker compose up -d",(0,o.yg)("ol",{parentName:"li"},(0,o.yg)("li",{parentName:"ol"},"sudo docker logs -f chatgpt-on-wechat \u626b\u7801\u767b\u5f55"))),(0,o.yg)("li",{parentName:"ol"},"\u505c\u6b62\u670d\u52a1: sudo docker compose down ")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'# config.json\u6587\u4ef6\u5185\u5bb9\u793a\u4f8b\n{\n  "open_ai_api_key": "YOUR API KEY",                          # \u586b\u5165\u4e0a\u9762\u521b\u5efa\u7684 OpenAI API KEY\n  "model": "gpt-3.5-turbo",                                   # \u6a21\u578b\u540d\u79f0\u3002\u5f53use_azure_chatgpt\u4e3atrue\u65f6\uff0c\u5176\u540d\u79f0\u4e3aAzure\u4e0amodel deployment\u540d\u79f0\n  "proxy": "",                                                # \u4ee3\u7406\u5ba2\u6237\u7aef\u7684ip\u548c\u7aef\u53e3\n  "single_chat_prefix": ["bot", "@bot"],                      # \u79c1\u804a\u65f6\u6587\u672c\u9700\u8981\u5305\u542b\u8be5\u524d\u7f00\u624d\u80fd\u89e6\u53d1\u673a\u5668\u4eba\u56de\u590d\n  "single_chat_reply_prefix": "[bot] ",                       # \u79c1\u804a\u65f6\u81ea\u52a8\u56de\u590d\u7684\u524d\u7f00\uff0c\u7528\u4e8e\u533a\u5206\u771f\u4eba\n  "group_chat_prefix": ["@bot"],                              # \u7fa4\u804a\u65f6\u5305\u542b\u8be5\u524d\u7f00\u5219\u4f1a\u89e6\u53d1\u673a\u5668\u4eba\u56de\u590d\n  "group_name_white_list": ["ChatGPT\u6d4b\u8bd5\u7fa4", "ChatGPT\u6d4b\u8bd5\u7fa42"], # \u5f00\u542f\u81ea\u52a8\u56de\u590d\u7684\u7fa4\u540d\u79f0\u5217\u8868\n  "group_chat_in_one_session": ["ChatGPT\u6d4b\u8bd5\u7fa4"],              # \u652f\u6301\u4f1a\u8bdd\u4e0a\u4e0b\u6587\u5171\u4eab\u7684\u7fa4\u540d\u79f0  \n  "image_create_prefix": ["\u753b", "\u770b", "\u627e"],                   # \u5f00\u542f\u56fe\u7247\u56de\u590d\u7684\u524d\u7f00\n  "conversation_max_tokens": 1000,                            # \u652f\u6301\u4e0a\u4e0b\u6587\u8bb0\u5fc6\u7684\u6700\u591a\u5b57\u7b26\u6570\n  "speech_recognition": false,                                # \u662f\u5426\u5f00\u542f\u8bed\u97f3\u8bc6\u522b\n  "group_speech_recognition": false,                          # \u662f\u5426\u5f00\u542f\u7fa4\u7ec4\u8bed\u97f3\u8bc6\u522b\n  "use_azure_chatgpt": false,                                 # \u662f\u5426\u4f7f\u7528Azure ChatGPT service\u4ee3\u66ffopenai ChatGPT service. \u5f53\u8bbe\u7f6e\u4e3atrue\u65f6\u9700\u8981\u8bbe\u7f6e open_ai_api_base\uff0c\u5982 https://xxx.openai.azure.com/\n  "azure_deployment_id": "",                                  # \u91c7\u7528Azure ChatGPT\u65f6\uff0c\u6a21\u578b\u90e8\u7f72\u540d\u79f0\n  "character_desc": "\u4f60\u662fChatGPT, \u4e00\u4e2a\u7531OpenAI\u8bad\u7ec3\u7684\u5927\u578b\u8bed\u8a00\u6a21\u578b, \u4f60\u65e8\u5728\u56de\u7b54\u5e76\u89e3\u51b3\u4eba\u4eec\u7684\u4efb\u4f55\u95ee\u9898\uff0c\u5e76\u4e14\u53ef\u4ee5\u4f7f\u7528\u591a\u79cd\u8bed\u8a00\u4e0e\u4eba\u4ea4\u6d41\u3002",  # \u4eba\u683c\u63cf\u8ff0\n  # \u8ba2\u9605\u6d88\u606f\uff0c\u516c\u4f17\u53f7\u548c\u4f01\u4e1a\u5fae\u4fe1channel\u4e2d\u8bf7\u586b\u5199\uff0c\u5f53\u88ab\u8ba2\u9605\u65f6\u4f1a\u81ea\u52a8\u56de\u590d\uff0c\u53ef\u4f7f\u7528\u7279\u6b8a\u5360\u4f4d\u7b26\u3002\u76ee\u524d\u652f\u6301\u7684\u5360\u4f4d\u7b26\u6709{trigger_prefix}\uff0c\u5728\u7a0b\u5e8f\u4e2d\u5b83\u4f1a\u81ea\u52a8\u66ff\u6362\u6210bot\u7684\u89e6\u53d1\u8bcd\u3002\n  "subscribe_msg": "\u611f\u8c22\u60a8\u7684\u5173\u6ce8\uff01\\n\u8fd9\u91cc\u662fChatGPT\uff0c\u53ef\u4ee5\u81ea\u7531\u5bf9\u8bdd\u3002\\n\u652f\u6301\u8bed\u97f3\u5bf9\u8bdd\u3002\\n\u652f\u6301\u56fe\u7247\u8f93\u51fa\uff0c\u753b\u5b57\u5f00\u5934\u7684\u6d88\u606f\u5c06\u6309\u8981\u6c42\u521b\u4f5c\u56fe\u7247\u3002\\n\u652f\u6301\u89d2\u8272\u626e\u6f14\u548c\u6587\u5b57\u5192\u9669\u7b49\u4e30\u5bcc\u63d2\u4ef6\u3002\\n\u8f93\u5165{trigger_prefix}#help \u67e5\u770b\u8be6\u7ec6\u6307\u4ee4\u3002"\n}\n')))}f.isMDXComponent=!0}}]);