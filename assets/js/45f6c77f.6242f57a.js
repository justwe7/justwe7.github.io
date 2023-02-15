"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[9649],{4137:function(e,t,n){n.d(t,{Zo:function(){return k},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),c=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},k=function(e){var t=c(e.components);return r.createElement(o.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,k=p(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,f=m["".concat(o,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(f,l(l({ref:t},k),{},{components:n})):r.createElement(f,l({ref:t},k))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=d;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[m]="string"==typeof e?e:i,l[1]=p;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9046:function(e,t,n){n.r(t),n.d(t,{assets:function(){return k},contentTitle:function(){return o},default:function(){return f},frontMatter:function(){return p},metadata:function(){return c},toc:function(){return m}});var r=n(7462),i=n(3366),a=(n(7294),n(4137)),l=["components"],p={},o=void 0,c={unversionedId:"git/gitcherry-pick\u5907\u5fd8",id:"git/gitcherry-pick\u5907\u5fd8",title:"gitcherry-pick\u5907\u5fd8",description:"git cherry-pick \u5907\u5fd8",source:"@site/docs/git/gitcherry-pick\u5907\u5fd8.md",sourceDirName:"git",slug:"/git/gitcherry-pick\u5907\u5fd8",permalink:"/docs/git/gitcherry-pick\u5907\u5fd8",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/git/gitcherry-pick\u5907\u5fd8.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"\u4ecb\u7ecd",permalink:"/docs/"},next:{title:"git\u57fa\u672c\u5de5\u4f5c\u6d41\u7a0b",permalink:"/docs/git/git\u57fa\u672c\u5de5\u4f5c\u6d41\u7a0b"}},k={},m=[{value:"git cherry-pick \u5907\u5fd8",id:"git-cherry-pick-\u5907\u5fd8",level:2},{value:"\u57fa\u672c\u7528\u6cd5",id:"\u57fa\u672c\u7528\u6cd5",level:3},{value:"\u9700\u6c42\u573a\u666f",id:"\u9700\u6c42\u573a\u666f",level:3},{value:"\u8f6c\u79fb\u591a\u4e2a\u63d0\u4ea4",id:"\u8f6c\u79fb\u591a\u4e2a\u63d0\u4ea4",level:3},{value:"\u6307\u5b9a\u7684\u591a\u4e2acommit\u8f6c\u79fb",id:"\u6307\u5b9a\u7684\u591a\u4e2acommit\u8f6c\u79fb",level:4},{value:"\u8f6c\u79fb\u8fde\u7eed\u7684commit\u63d0\u4ea4",id:"\u8f6c\u79fb\u8fde\u7eed\u7684commit\u63d0\u4ea4",level:3},{value:"\u6307\u4ee4\u53c2\u6570 -options",id:"\u6307\u4ee4\u53c2\u6570--options",level:3},{value:"\u4ee3\u7801\u51b2\u7a81",id:"\u4ee3\u7801\u51b2\u7a81",level:3},{value:"\u8f6c\u79fb\u53e6\u4e00\u4e2a\u4ed3\u5e93\u7684\u63d0\u4ea4",id:"\u8f6c\u79fb\u53e6\u4e00\u4e2a\u4ed3\u5e93\u7684\u63d0\u4ea4",level:3}],u={toc:m},d="wrapper";function f(e){var t=e.components,n=(0,i.Z)(e,l);return(0,a.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"git-cherry-pick-\u5907\u5fd8"},"git cherry-pick \u5907\u5fd8"),(0,a.kt)("h3",{id:"\u57fa\u672c\u7528\u6cd5"},"\u57fa\u672c\u7528\u6cd5"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick")," \u547d\u4ee4\u7684\u4f5c\u7528\uff0c\u5c31\u662f\u5c06\u6307\u5b9a\u7684\u63d0\u4ea4\uff08commit\uff09\u5e94\u7528\u4e8e\u5176\u4ed6\u5206\u652f\u3002"),(0,a.kt)("p",null," ",(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick <commitHash>")," \u4f1a\u5c06\u6307\u5b9a\u7684\u63d0\u4ea4commitHash\uff0c\u5e94\u7528\u4e8e\u5f53\u524d\u5206\u652f\u3002\u8fd9\u4f1a\u5728\u5f53\u524d\u5206\u652f\u4ea7\u751f\u4e00\u4e2a\u65b0\u7684\u63d0\u4ea4\uff0c\u5b83\u4eec\u7684\u54c8\u5e0c\u503c\u4f1a\u4e0d\u4e00\u6837\u3002"),(0,a.kt)("p",null,"\u4e3e\u4f8b\u6765\u8bf4\uff0c\u4ee3\u7801\u4ed3\u5e93\u6709master\u548cfeature\u4e24\u4e2a\u5206\u652f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"    a - b - c - d   Master\n         \\\n           e - f - g Feature\n")),(0,a.kt)("p",null,"\u73b0\u5728\u5c06\u63d0\u4ea4 ",(0,a.kt)("inlineCode",{parentName:"p"},"f")," \u5e94\u7528\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"master")," \u5206\u652f:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"git checkout master # \u5207\u6362\u5230 master \u5206\u652f\n\ngit cherry-pick f # Cherry pick \u64cd\u4f5c\n")),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u64cd\u4f5c\u5b8c\u6210\u4ee5\u540e\uff0c\u4ee3\u7801\u5e93\u5c31\u53d8\u6210\u4e86\u4e0b\u9762:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"    a - b - c - d - f   Master\n         \\\n           e - f - g    Feature\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick")," \u547d\u4ee4\u7684\u53c2\u6570\uff0c\u4e0d\u4e00\u5b9a\u662f\u63d0\u4ea4\u7684\u54c8\u5e0c\u503c\uff0c\u5206\u652f\u540d\u4e5f\u662f\u53ef\u4ee5\u7684: ",(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick feature")," \u8868\u793a\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"feature")," \u5206\u652f\u7684\u6700\u8fd1\u4e00\u6b21\u63d0\u4ea4\uff0c\u8f6c\u79fb\u5230\u5f53\u524d\u5206\u652f\u3002"),(0,a.kt)("h3",{id:"\u9700\u6c42\u573a\u666f"},"\u9700\u6c42\u573a\u666f"),(0,a.kt)("p",null,"\u5047\u5982\u5b58\u5728\u5e76\u884c\u5f00\u53d1\u7684\u9700\u6c42\uff0cA\u9700\u6c42\u5f00\u53d1\uff08 ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-a")," \uff09\u4e86\u4e00\u6bb5\u65f6\u95f4\uff0c\u540e\u7eed\u63a5\u5165B\u9700\u6c42 ( ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-b")," )\uff0c\u4e0a\u7ebf\u65f6\u95f4\u8282\u70b9\u4e0d\u80fd\u786e\u5b9a\u5148\u540e\uff0c\u53ef\u80fdA\u5148\u4e0a\u4e5f\u53ef\u80fdB\u5148\u4e0a\u3002\u4f46\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-b")," \u9700\u8981\u590d\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-a")," \u7684\u67d0\u51e0\u6b21\u63d0\u4ea4\uff0c\u624b\u52a8\u590d\u5236\u7c98\u8d34\u6587\u4ef6\u7684\u8bdd\u9519\u8bef\u7387\u6709\u70b9\u9ad8\uff0c\u8fd9\u65f6\u53ef\u4ee5\u8003\u8651\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"cherry-pick")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5982\u679c\u4e00\u6b21\u63d0\u4ea4\u4e00\u80a1\u8111\u7684\u6539\u52a8\u90fd\u5728\u4e00\u4e2acommit\u91cc\u9762\u5c31\u590d\u6742\u4e86\uff0c\u6240\u4ee5\u8bf4\u5e73\u65f6\u8981\u4fdd\u6301\u826f\u597d\u7684 commit \u4e60\u60ef\u3002\u6309",(0,a.kt)("strong",{parentName:"p"},"\u9700"),"\u63d0\u4ea4\uff0c\u800c\u4e0d\u662f\u6309\u6b21\u63d0\u4ea4\u3002")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"    a - b - c   Master\n        |    \\\n         \\     g - h      feat-b\n          \\  \n           d - e - f      feat-a\n")),(0,a.kt)("p",null,"\u73b0\u5728\u60f3\u8981\u628a ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-a")," \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"e")," commit\u6539\u52a8\u5e94\u7528\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-b")," \u4e2d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"git checkout feat-b\ngit cherry-pick e       #e \u7684commit hash\n")),(0,a.kt)("p",null,"\u7136\u540e ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-b")," \u540e\u9762\u4f1a\u8ffd\u52a0\u4e00\u6761 ",(0,a.kt)("inlineCode",{parentName:"p"},"feat-a / e")," \u7684\u6539\u52a8"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"    a - b - c   Master\n        |    \\\n         \\     g - h - e     feat-b\n          \\  \n           d - e - f         feat-a\n")),(0,a.kt)("h3",{id:"\u8f6c\u79fb\u591a\u4e2a\u63d0\u4ea4"},"\u8f6c\u79fb\u591a\u4e2a\u63d0\u4ea4"),(0,a.kt)("h4",{id:"\u6307\u5b9a\u7684\u591a\u4e2acommit\u8f6c\u79fb"},"\u6307\u5b9a\u7684\u591a\u4e2acommit\u8f6c\u79fb"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"git cherry-pick <HashA> <HashB>\n")),(0,a.kt)("p",null,"\u5c06 A \u548c B \u4e24\u4e2a\u63d0\u4ea4\u5e94\u7528\u5230\u5f53\u524d\u5206\u652f\u3002\u8fd9\u4f1a\u5728\u5f53\u524d\u5206\u652f\u751f\u6210\u4e24\u4e2a\u5bf9\u5e94\u7684\u65b0\u63d0\u4ea4\u3002"),(0,a.kt)("h3",{id:"\u8f6c\u79fb\u8fde\u7eed\u7684commit\u63d0\u4ea4"},"\u8f6c\u79fb\u8fde\u7eed\u7684commit\u63d0\u4ea4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"git cherry-pick A..B\n")),(0,a.kt)("p",null,"\u53ef\u4ee5\u8f6c\u79fb\u4ece A \u5230 B \u7684\u6240\u6709\u63d0\u4ea4\u3002\u5b83\u4eec\u5fc5\u987b\u6309\u7167\u6b63\u786e\u7684\u987a\u5e8f\u653e\u7f6e\uff1a",(0,a.kt)("strong",{parentName:"p"},"\u63d0\u4ea4 A \u5fc5\u987b\u65e9\u4e8e\u63d0\u4ea4 B"),"\uff0c\u5426\u5219\u547d\u4ee4\u5c06\u5931\u8d25\uff0c\u4f46\u4e0d\u4f1a\u62a5\u9519"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff0c\u4f7f\u7528\u4e0a\u9762\u7684\u547d\u4ee4\uff0c\u63d0\u4ea4 A \u5c06\u4e0d\u4f1a\u5305\u542b\u5728 Cherry pick \u4e2d\u3002\u5982\u679c\u8981\u5305\u542b\u63d0\u4ea4 A\uff0c\u53ef\u4ee5\u4f7f\u7528\n",(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick A^..B"))),(0,a.kt)("h3",{id:"\u6307\u4ee4\u53c2\u6570--options"},"\u6307\u4ee4\u53c2\u6570 -options"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"-e\uff0c--edit"))),(0,a.kt)("p",null,"\u6253\u5f00\u5916\u90e8\u7f16\u8f91\u5668\uff0c\u7f16\u8f91\u63d0\u4ea4\u4fe1\u606f\u3002"),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"-n\uff0c--no-commit"))),(0,a.kt)("p",null,"\u53ea\u66f4\u65b0\u5de5\u4f5c\u533a\u548c\u6682\u5b58\u533a\uff0c\u4e0d\u4ea7\u751f\u65b0\u7684\u63d0\u4ea4"),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"-x"))),(0,a.kt)("p",null,"\u5728\u63d0\u4ea4\u4fe1\u606f\u7684\u672b\u5c3e\u8ffd\u52a0\u4e00\u884c(cherry picked from commit ...)\uff0c\u65b9\u4fbf\u4ee5\u540e\u67e5\u5230\u8fd9\u4e2a\u63d0\u4ea4\u662f\u5982\u4f55\u4ea7\u751f\u7684\u3002"),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"-s\uff0c--signoff"))),(0,a.kt)("p",null,"\u5728\u63d0\u4ea4\u4fe1\u606f\u7684\u672b\u5c3e\u8ffd\u52a0\u4e00\u884c\u64cd\u4f5c\u8005\u7684\u7b7e\u540d\uff0c\u8868\u793a\u662f\u8c01\u8fdb\u884c\u4e86\u8fd9\u4e2a\u64cd\u4f5c\u3002"),(0,a.kt)("ol",{start:5},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"-m parent-number\uff0c--mainline parent-number"))),(0,a.kt)("p",null,"\u5982\u679c\u539f\u59cb\u63d0\u4ea4\u662f\u4e00\u4e2a\u5408\u5e76\u8282\u70b9\uff0c\u6765\u81ea\u4e8e\u4e24\u4e2a\u5206\u652f\u7684\u5408\u5e76\uff0c\u90a3\u4e48 Cherry pick \u9ed8\u8ba4\u5c06\u5931\u8d25\uff0c\u56e0\u4e3a\u5b83\u4e0d\u77e5\u9053\u5e94\u8be5\u91c7\u7528\u54ea\u4e2a\u5206\u652f\u7684\u4ee3\u7801\u53d8\u52a8\u3002"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"-m \u914d\u7f6e\u9879\u544a\u8bc9 Git\uff0c\u5e94\u8be5\u91c7\u7528\u54ea\u4e2a\u5206\u652f\u7684\u53d8\u52a8\u3002\u5b83\u7684\u53c2\u6570parent-number\u662f\u4e00\u4e2a\u4ece1\u5f00\u59cb\u7684\u6574\u6570\uff0c\u4ee3\u8868\u539f\u59cb\u63d0\u4ea4\u7684\u7236\u5206\u652f\u7f16\u53f7\u3002"),(0,a.kt)("p",{parentName:"blockquote"},"\u6bd4\u5982 ",(0,a.kt)("inlineCode",{parentName:"p"},"git cherry-pick -m 1 <commitHash>")," \u547d\u4ee4\u8868\u793a\uff0cCherry pick \u91c7\u7528\u63d0\u4ea4commitHash\u6765\u81ea\u7f16\u53f71\u7684\u7236\u5206\u652f\u7684\u53d8\u52a8\u3002"),(0,a.kt)("p",{parentName:"blockquote"},"\u4e00\u822c\u6765\u8bf4\uff0c1\u53f7\u7236\u5206\u652f\u662f\u63a5\u53d7\u53d8\u52a8\u7684\u5206\u652f\uff08the branch being merged into\uff09\uff0c2\u53f7\u7236\u5206\u652f\u662f\u4f5c\u4e3a\u53d8\u52a8\u6765\u6e90\u7684\u5206\u652f\uff08the branch being merged from\uff09\u3002")),(0,a.kt)("h3",{id:"\u4ee3\u7801\u51b2\u7a81"},"\u4ee3\u7801\u51b2\u7a81"),(0,a.kt)("p",null,"\u5982\u679c\u64cd\u4f5c\u8fc7\u7a0b\u4e2d\u53d1\u751f\u4ee3\u7801\u51b2\u7a81\uff0cCherry pick \u4f1a\u505c\u4e0b\u6765\uff0c\u8ba9\u7528\u6237\u51b3\u5b9a\u5982\u4f55\u7ee7\u7eed\u64cd\u4f5c"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"--continue"),"\n\u7528\u6237\u89e3\u51b3\u4ee3\u7801\u51b2\u7a81\u540e:  "),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"- \u7b2c\u4e00\u6b65\u5c06\u4fee\u6539\u7684\u6587\u4ef6\u91cd\u65b0\u52a0\u5165\u6682\u5b58\u533a `git add .`\n- \u7b2c\u4e8c\u6b65\u4f7f\u7528 `git cherry-pick --continue`\uff0c\u8ba9 Cherry pick \u8fc7\u7a0b\u7ee7\u7eed\u6267\u884c\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"--abort")))),(0,a.kt)("p",null,"\u7a33\u59a5\u4e4b\u4e3e~~\u3002\u53d1\u751f\u4ee3\u7801\u51b2\u7a81\u540e\uff0c\u653e\u5f03\u5408\u5e76\uff0c\u56de\u5230\u64cd\u4f5c\u524d\u7684\u6837\u5b50\u3002"),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"--quit"))),(0,a.kt)("p",null,"\u53d1\u751f\u4ee3\u7801\u51b2\u7a81\u540e\uff0c\u9000\u51fa Cherry pick\uff0c\u4f46\u662f\u4e0d\u56de\u5230\u64cd\u4f5c\u524d\u7684\u6837\u5b50"),(0,a.kt)("h3",{id:"\u8f6c\u79fb\u53e6\u4e00\u4e2a\u4ed3\u5e93\u7684\u63d0\u4ea4"},"\u8f6c\u79fb\u53e6\u4e00\u4e2a\u4ed3\u5e93\u7684\u63d0\u4ea4"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u524d\u63d0\u662f\u5148\u628a\u76ee\u6807\u7684\u4ed3\u5e93\u6dfb\u52a0\u5230\u5f53\u524d\u7684\u8fdc\u7a0b\u4ed3\u5e93\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"git remote add target git://gitUrl")),(0,a.kt)("li",{parentName:"ul"},"\u7136\u540e\uff0c\u5c06\u8fdc\u7a0b\u4ee3\u7801\u6293\u53d6\u5230\u672c\u5730 ",(0,a.kt)("inlineCode",{parentName:"li"},"git fetch target")),(0,a.kt)("li",{parentName:"ul"},"\u68c0\u67e5\u4e00\u4e0b\u8981\u4ece\u8fdc\u7a0b\u4ed3\u5e93\u8f6c\u79fb\u7684\u63d0\u4ea4\uff0c\u83b7\u53d6\u5b83\u7684\u54c8\u5e0c\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"git log target/master")),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528git cherry-pick \u547d\u4ee4\u8f6c\u79fb\u63d0\u4ea4 ",(0,a.kt)("inlineCode",{parentName:"li"},"git cherry-pick <commitHash>"))),(0,a.kt)("p",null,"\u8d81\u7740\u4eca\u5929\u6709\u7c7b\u4f3c\u7684\u573a\u666f\uff0c\u7ec8\u4e8e\u7167\u7740\u962e\u8001\u5e08\u7684",(0,a.kt)("a",{parentName:"p",href:"https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html"},"\u6559\u7a0b"),"\u628a\u5fc3\u5fc3\u5ff5\u5ff5\u5f88\u4e45\u53c8\u6ca1\u6709\u5b9e\u8df5\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"cherry-pick")," \u5b9e\u8df5\u4e86\u4e00\u904d"))}f.isMDXComponent=!0}}]);