"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[8398],{15680:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>y});var n=t(96540);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),p=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},c=function(e){var r=p(e.components);return n.createElement(i.Provider,{value:r},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},s=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),m=p(t),s=o,y=m["".concat(i,".").concat(s)]||m[s]||d[s]||l;return t?n.createElement(y,a(a({ref:r},c),{},{components:t})):n.createElement(y,a({ref:r},c))}));function y(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var l=t.length,a=new Array(l);a[0]=s;var u={};for(var i in r)hasOwnProperty.call(r,i)&&(u[i]=r[i]);u.originalType=e,u[m]="string"==typeof e?e:o,a[1]=u;for(var p=2;p<l;p++)a[p]=t[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}s.displayName="MDXCreateElement"},37863:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var n=t(58168),o=(t(96540),t(15680));const l={},a=void 0,u={unversionedId:"Flutter/Future\u548cCompleter\u7684\u533a\u522b",id:"Flutter/Future\u548cCompleter\u7684\u533a\u522b",title:"Future\u548cCompleter\u7684\u533a\u522b",description:"Future",source:"@site/docs/Flutter/Future\u548cCompleter\u7684\u533a\u522b.md",sourceDirName:"Flutter",slug:"/Flutter/Future\u548cCompleter\u7684\u533a\u522b",permalink:"/docs/Flutter/Future\u548cCompleter\u7684\u533a\u522b",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/Flutter/Future\u548cCompleter\u7684\u533a\u522b.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Flutter\u4e2d\u7684class",permalink:"/docs/Flutter/Flutter\u4e2d\u7684class"},next:{title:"IOS\u672c\u5730\u8bc1\u4e66\u521b\u5efa\u53ca\u4f7f\u7528",permalink:"/docs/Flutter/IOS\u672c\u5730\u8bc1\u4e66\u521b\u5efa\u53ca\u4f7f\u7528"}},i={},p=[{value:"<code>Future</code>",id:"future",level:3},{value:"<code>Completer</code>",id:"completer",level:3}],c={toc:p},m="wrapper";function d(e){let{components:r,...t}=e;return(0,o.yg)(m,(0,n.A)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("h3",{id:"future"},(0,o.yg)("inlineCode",{parentName:"h3"},"Future")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\u8868\u793a\u4e00\u4e2a\u53ef\u80fd\u5728\u5c06\u6765\u67d0\u4e2a\u65f6\u95f4\u70b9\u5b8c\u6210\u7684\u8ba1\u7b97\u6216\u64cd\u4f5c\u3002\u5b83\u53ef\u4ee5\u6210\u529f\u5b8c\u6210\u5e76\u8fd4\u56de\u4e00\u4e2a\u503c\uff0c\u6216\u8005\u4ee5\u9519\u8bef\u5b8c\u6210\u5e76\u629b\u51fa\u5f02\u5e38\u3002",(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\u901a\u5e38\u7528\u4e8e\u5f02\u6b65\u64cd\u4f5c\uff0c\u6bd4\u5982\u7f51\u7edc\u8bf7\u6c42\u3001\u6587\u4ef6\u8bfb\u5199\u7b49\u3002"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-dart"},"Future<String> fetchUserOrder() {\n  return Future.delayed(Duration(seconds: 2), () => 'Large Latte');\n}\n\nvoid main() {\n  print('Fetching user order...');\n  fetchUserOrder().then((order) {\n    print('Order: $order');\n  });\n}\n")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"fetchUserOrder"),"\u8fd4\u56de\u4e00\u4e2a",(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\uff0c\u8be5",(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\u57282\u79d2\u540e\u5b8c\u6210\uff0c\u5e76\u8fd4\u56de\u5b57\u7b26\u4e32",(0,o.yg)("inlineCode",{parentName:"p"},"'Large Latte'")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"\u901a\u5e38\u901a\u8fc7\u5185\u7f6e\u65b9\u6cd5\u6216\u5f02\u6b65\u51fd\u6570\u81ea\u52a8\u521b\u5efa\u548c\u8fd4\u56de\u3002"),(0,o.yg)("li",{parentName:"ul"},"\u5b8c\u6210\u72b6\u6001\u7531\u7cfb\u7edf\u81ea\u52a8\u63a7\u5236\uff0c\u4f8b\u5982\u7f51\u7edc\u8bf7\u6c42\u5b8c\u6210\u540e\u81ea\u52a8\u8fd4\u56de\u7ed3\u679c\u3002"),(0,o.yg)("li",{parentName:"ul"},"\u9002\u7528\u4e8e\u7b80\u5355\u7684\u5f02\u6b65\u64cd\u4f5c\uff0c\u7ed3\u679c\u7531\u7cfb\u7edf\u6216\u5f02\u6b65\u51fd\u6570\u81ea\u52a8\u5904\u7406\u3002")),(0,o.yg)("h3",{id:"completer"},(0,o.yg)("inlineCode",{parentName:"h3"},"Completer")),(0,o.yg)("p",null,"\u7c7b\u4f3c",(0,o.yg)("inlineCode",{parentName:"p"},"new Promise"),"\u901a\u8fc7resolve\u56de\u8c03\u6765\u7ec8\u6b62\u8be5\u5f02\u6b65\u72b6\u6001\n",(0,o.yg)("inlineCode",{parentName:"p"},"Completer"),"\u662f\u4e00\u4e2a\u7528\u4e8e\u624b\u52a8\u63a7\u5236",(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\u5b8c\u6210\u72b6\u6001\u7684\u5de5\u5177\u3002\u901a\u8fc7",(0,o.yg)("inlineCode",{parentName:"p"},"Completer"),"\uff0c\u53ef\u4ee5\u521b\u5efa\u4e00\u4e2a",(0,o.yg)("inlineCode",{parentName:"p"},"Future"),"\u5e76\u5728\u9700\u8981\u7684\u65f6\u5019\u5c06\u5176\u6807\u8bb0\u4e3a\u5b8c\u6210\uff08\u5982\u9700\u8981\u7b49\u5f85\u7528\u6237\u6388\u6743\u7ed3\u679c\u7684\u573a\u666f\uff09"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-dart"},"import 'dart:async';\n\nFuture<String> fetchUserOrder() {\n  Completer<String> completer = Completer<String>();\n\n  // \u6a21\u62df\u4e00\u4e2a\u5f02\u6b65\u64cd\u4f5c\n  Future.delayed(Duration(seconds: 2), () {\n    completer.complete('Large Latte');\n  });\n\n  return completer.future;\n}\n\nvoid main() {\n  print('Fetching user order...');\n  fetchUserOrder().then((order) {\n    print('Order: $order');\n  });\n}\n\n")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"\u624b\u52a8\u521b\u5efa\uff0c\u4e3b\u8981\u7528\u4e8e\u9700\u8981\u624b\u52a8\u63a7\u5236",(0,o.yg)("inlineCode",{parentName:"li"},"Future"),"\u5b8c\u6210\u72b6\u6001\u7684\u573a\u666f\u3002"),(0,o.yg)("li",{parentName:"ul"},"\u5f00\u53d1\u8005\u624b\u52a8\u63a7\u5236\u5b8c\u6210\u72b6\u6001\uff0c\u8c03\u7528",(0,o.yg)("inlineCode",{parentName:"li"},"complete"),"\u6216",(0,o.yg)("inlineCode",{parentName:"li"},"completeError"),"\u65b9\u6cd5\u3002"),(0,o.yg)("li",{parentName:"ul"},"\u9002\u7528\u4e8e\u590d\u6742\u7684\u5f02\u6b65\u64cd\u4f5c\uff0c\u7279\u522b\u662f\u9700\u8981\u624b\u52a8\u63a7\u5236",(0,o.yg)("inlineCode",{parentName:"li"},"Future"),"\u5b8c\u6210\u7684\u573a\u666f\uff0c\u4f8b\u5982\u5e76\u53d1\u64cd\u4f5c\u7684\u534f\u8c03\u3002")))}d.isMDXComponent=!0}}]);