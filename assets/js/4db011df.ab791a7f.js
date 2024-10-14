"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[7249],{15680:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>g});var n=r(96540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=u(r),f=o,g=p["".concat(c,".").concat(f)]||p[f]||d[f]||l;return r?n.createElement(g,a(a({ref:t},s),{},{components:r})):n.createElement(g,a({ref:t},s))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,a=new Array(l);a[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:o,a[1]=i;for(var u=2;u<l;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},11258:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var n=r(58168),o=(r(96540),r(15680));const l={},a=void 0,i={unversionedId:"Flutter/getx",id:"Flutter/getx",title:"getx",description:"\u54cd\u5e94\u5f0f\u6570\u636e",source:"@site/docs/Flutter/getx.md",sourceDirName:"Flutter",slug:"/Flutter/getx",permalink:"/docs/Flutter/getx",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/Flutter/getx.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"flutterSdk\u5347\u7ea7\u964d\u7ea7",permalink:"/docs/Flutter/flutterSdk\u5347\u7ea7\u964d\u7ea7"},next:{title:"ios\u9879\u76ee\u6784\u5efa",permalink:"/docs/Flutter/ios\u9879\u76ee\u6784\u5efa"}},c={},u=[{value:"\u54cd\u5e94\u5f0f\u6570\u636e",id:"\u54cd\u5e94\u5f0f\u6570\u636e",level:3},{value:"\u624b\u52a8\u66f4\u65b0",id:"\u624b\u52a8\u66f4\u65b0",level:4},{value:"\u54cd\u5e94\u5f0f\u66f4\u65b0",id:"\u54cd\u5e94\u5f0f\u66f4\u65b0",level:4},{value:"\u751f\u547d\u5468\u671f",id:"\u751f\u547d\u5468\u671f",level:4}],s={toc:u},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.yg)(p,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h3",{id:"\u54cd\u5e94\u5f0f\u6570\u636e"},"\u54cd\u5e94\u5f0f\u6570\u636e"),(0,o.yg)("h4",{id:"\u624b\u52a8\u66f4\u65b0"},"\u624b\u52a8\u66f4\u65b0"),(0,o.yg)("p",null,"\u5b9a\u4e49\u7684\u975e\u54cd\u5e94\u5f0f\u6570\u636e\u9700\u8981\u5728\u6539\u53d8\u540e\u624b\u52a8\u8c03\u7528update();"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-dart"},"class HomeState {\n  bool isLogin = false;\n}\n\nText(controller.state.isLogin ? '\u5df2\u767b\u5f55' : '\u672a\u767b\u5f55', style: const TextStyle(color: BaseColor.mainColor),),\n\nhandleDoLogin() async {\n    state.isLogin = !state.isLogin;\n    update();\n}\n")),(0,o.yg)("h4",{id:"\u54cd\u5e94\u5f0f\u66f4\u65b0"},"\u54cd\u5e94\u5f0f\u66f4\u65b0"),(0,o.yg)("h4",{id:"\u751f\u547d\u5468\u671f"},"\u751f\u547d\u5468\u671f"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-dart"},"class DemoController extends GetxController {\n  final DemoState state = DemoState();\n\n  @override\n  void onInit() {\n    super.onInit();\n    print('\u8fdb\u5165\u4e86DemoController\u9875\u9762');\n  }\n\n  @override\n  void onClose() {\n    super.onClose();\n    \n  }\n}\n")))}d.isMDXComponent=!0}}]);