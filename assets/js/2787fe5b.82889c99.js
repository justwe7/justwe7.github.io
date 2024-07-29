"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[7215],{15680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>m});var r=t(96540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),u=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(i.Provider,{value:n},e.children)},l="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=u(t),d=o,m=l["".concat(i,".").concat(d)]||l[d]||f[d]||a;return t?r.createElement(m,c(c({ref:n},p),{},{components:t})):r.createElement(m,c({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=d;var s={};for(var i in n)hasOwnProperty.call(n,i)&&(s[i]=n[i]);s.originalType=e,s[l]="string"==typeof e?e:o,c[1]=s;for(var u=2;u<a;u++)c[u]=t[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},72500:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=t(58168),o=(t(96540),t(15680));const a={},c=void 0,s={unversionedId:"\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272",id:"\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272",title:"vscode\u4e3b\u9898\u8272",description:"",source:"@site/docs/\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272.md",sourceDirName:"\u7f16\u7a0b\u5907\u5fd8\u5f55",slug:"/\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272",permalink:"/docs/\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/\u7f16\u7a0b\u5907\u5fd8\u5f55/vscode\u4e3b\u9898\u8272.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"react\u76f8\u5173",permalink:"/docs/\u7f16\u7a0b\u5907\u5fd8\u5f55/react\u76f8\u5173"},next:{title:"\u5fae\u4fe1xweb\u771f\u673a\u8c03\u8bd5",permalink:"/docs/\u7f16\u7a0b\u5907\u5fd8\u5f55/\u5fae\u4fe1xweb\u771f\u673a\u8c03\u8bd5"}},i={},u=[],p={toc:u},l="wrapper";function f(e){let{components:n,...t}=e;return(0,o.yg)(l,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'    "editor.tokenColorCustomizations": {\n        // "comments": "#82e0aa", // \u914d\u7f6e\u6ce8\u91ca\u989c\u8272\u548c\u6837\u5f0f\uff0c\u5305\u62ec\u5355\u884c\u6ce8\u91ca\u3001\u591a\u884c\u6ce8\u91ca\u7b49\u3002\n        // "keywords": "#03C988", // \u914d\u7f6e\u5173\u952e\u5b57\uff08\u5982 if\u3001else\u3001for\u3001while \u7b49\uff09\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "variables": "#439A97", // \u914d\u7f6e\u53d8\u91cf\u540d\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "constants": "#BFDB38", // \u914d\u7f6e\u5e38\u91cf\u540d\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "strings": "#E5BA73", // \u914d\u7f6e\u5b57\u7b26\u4e32\uff08\u5305\u62ec\u5355\u5f15\u53f7\u548c\u53cc\u5f15\u53f7\uff09\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "numbers": "#C58940", // \u914d\u7f6e\u6570\u5b57\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "types": "#C58940", // \u914d\u7f6e\u7c7b\u578b\uff08\u5982 class\u3001interface\u3001enum \u7b49\uff09\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        // "functions": "#5b99fcc9", // \u914d\u7f6e\u51fd\u6570\u540d\u7684\u989c\u8272\u548c\u6837\u5f0f\u3002\n        "textMateRules": [\n            {\n                "name": "Tag brackets",\n                "scope": [\n                    "punctuation.definition.tag",\n                ],\n                "settings": {\n                    "foreground": "#a4c6f0"\n                }\n            },\n            {\n                "name": "Tag attributes",\n                "scope": "entity.other.attribute-name",\n                "settings": {\n                    "foreground": "#f0dc83db"\n                }\n            },\n            {\n                "name": "Tags",\n                "scope": "entity.name.tag",\n                "settings": {\n                    "foreground": "#BE5A83",\n                }\n            },\n            {\n                "name": "Markup list punctuation",\n                "scope": "punctuation.definition.list",\n                "settings": {\n                    "foreground": "#fba292e6"\n                }\n            },\n            {\n                "name": "Provided functions",\n                "scope": "support.function",\n                "settings": {\n                    "foreground": "#25bca5e6"\n                }\n            },\n            {\n                "name": "Function names",\n                "scope": "entity.name.function",\n                "settings": {\n                    "foreground": "#25bca5e6"\n                }\n            }\n        ]\n    },\n')))}f.isMDXComponent=!0}}]);