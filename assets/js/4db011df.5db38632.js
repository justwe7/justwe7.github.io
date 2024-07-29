"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[9729],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=c(n),d=o,m=p["".concat(u,".").concat(d)]||p[d]||f[d]||l;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[p]="string"==typeof e?e:o,a[1]=i;for(var c=2;c<l;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},67648:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return p}});var r=n(87462),o=n(63366),l=(n(67294),n(3905)),a=["components"],i={},u=void 0,c={unversionedId:"Flutter/getx",id:"Flutter/getx",title:"getx",description:"\u54cd\u5e94\u5f0f\u6570\u636e",source:"@site/docs/Flutter/getx.md",sourceDirName:"Flutter",slug:"/Flutter/getx",permalink:"/docs/Flutter/getx",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/Flutter/getx.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"flutterSdk\u5347\u7ea7\u964d\u7ea7",permalink:"/docs/Flutter/flutterSdk\u5347\u7ea7\u964d\u7ea7"},next:{title:"ios\u9879\u76ee\u6784\u5efa",permalink:"/docs/Flutter/ios\u9879\u76ee\u6784\u5efa"}},s={},p=[{value:"\u54cd\u5e94\u5f0f\u6570\u636e",id:"\u54cd\u5e94\u5f0f\u6570\u636e",level:3},{value:"\u624b\u52a8\u66f4\u65b0",id:"\u624b\u52a8\u66f4\u65b0",level:4},{value:"\u54cd\u5e94\u5f0f\u66f4\u65b0",id:"\u54cd\u5e94\u5f0f\u66f4\u65b0",level:4},{value:"\u751f\u547d\u5468\u671f",id:"\u751f\u547d\u5468\u671f",level:4}],f={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"\u54cd\u5e94\u5f0f\u6570\u636e"},"\u54cd\u5e94\u5f0f\u6570\u636e"),(0,l.kt)("h4",{id:"\u624b\u52a8\u66f4\u65b0"},"\u624b\u52a8\u66f4\u65b0"),(0,l.kt)("p",null,"\u5b9a\u4e49\u7684\u975e\u54cd\u5e94\u5f0f\u6570\u636e\u9700\u8981\u5728\u6539\u53d8\u540e\u624b\u52a8\u8c03\u7528update();"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-dart"},"class HomeState {\n  bool isLogin = false;\n}\n\nText(controller.state.isLogin ? '\u5df2\u767b\u5f55' : '\u672a\u767b\u5f55', style: const TextStyle(color: BaseColor.mainColor),),\n\nhandleDoLogin() async {\n    state.isLogin = !state.isLogin;\n    update();\n}\n")),(0,l.kt)("h4",{id:"\u54cd\u5e94\u5f0f\u66f4\u65b0"},"\u54cd\u5e94\u5f0f\u66f4\u65b0"),(0,l.kt)("h4",{id:"\u751f\u547d\u5468\u671f"},"\u751f\u547d\u5468\u671f"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-dart"},"class DemoController extends GetxController {\n  final DemoState state = DemoState();\n\n  @override\n  void onInit() {\n    super.onInit();\n    print('\u8fdb\u5165\u4e86DemoController\u9875\u9762');\n  }\n\n  @override\n  void onClose() {\n    super.onClose();\n    \n  }\n}\n")))}d.isMDXComponent=!0}}]);