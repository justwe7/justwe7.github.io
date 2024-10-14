"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[4813],{40185:(e,t,a)=>{a.d(t,{A:()=>o});a(96540);var l=a(20053),n=a(75150),r=a(33375),i=a(2445);function o(e){const{sidebar:t,toc:a,children:o,...s}=e,c=t&&t.items.length>0;return(0,i.Y)(n.A,{...s,children:(0,i.Y)("div",{className:"container margin-vert--lg",children:(0,i.FD)("div",{className:"row",children:[(0,i.Y)(r.A,{sidebar:t}),(0,i.Y)("main",{className:(0,l.A)("col",{"col--7":c,"col--9 col--offset-1":!c}),itemScope:!0,itemType:"http://schema.org/Blog",children:o}),a&&(0,i.Y)("div",{className:"col col--2",children:a})]})})})}},84934:(e,t,a)=>{a.d(t,{A:()=>i});a(96540);var l=a(23230),n=a(13555),r=a(2445);function i(e){const{metadata:t}=e,{previousPage:a,nextPage:i}=t;return(0,r.FD)("nav",{className:"pagination-nav","aria-label":(0,l.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[a&&(0,r.Y)(n.A,{permalink:a,title:(0,r.Y)(l.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer Entries"})}),i&&(0,r.Y)(n.A,{permalink:i,title:(0,r.Y)(l.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older Entries"}),isNext:!0})]})}},98798:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});a(96540);var l=a(20053),n=a(23230),r=a(57824),i=a(69817),o=a(18630),s=a(35358),c=a(40185),d=a(84934),m=a(51210),g=a(50181),u=a(2445);function h(e){const t=function(){const{selectMessage:e}=(0,r.W)();return t=>e(t,(0,n.T)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:t}))}();return(0,n.T)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:t(e.count),tagName:e.label})}function p(e){let{tag:t}=e;const a=h(t);return(0,u.FD)(u.FK,{children:[(0,u.Y)(i.be,{title:a}),(0,u.Y)(m.A,{tag:"blog_tags_posts"})]})}function b(e){let{tag:t,items:a,sidebar:l,listMetadata:r}=e;const i=h(t);return(0,u.FD)(c.A,{sidebar:l,children:[(0,u.FD)("header",{className:"margin-bottom--xl",children:[(0,u.Y)("h1",{children:i}),(0,u.Y)(s.A,{href:t.allTagsPath,children:(0,u.Y)(n.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View All Tags"})})]}),(0,u.Y)(g.A,{items:a}),(0,u.Y)(d.A,{metadata:r})]})}function f(e){return(0,u.FD)(i.e3,{className:(0,l.A)(o.G.wrapper.blogPages,o.G.page.blogTagPostListPage),children:[(0,u.Y)(p,{...e}),(0,u.Y)(b,{...e})]})}},55911:(e,t,a)=>{a.d(t,{A:()=>c});a(96540);var l=a(23230),n=a(18630),r=a(20053);const i={iconEdit:"iconEdit_Z9Sw"};var o=a(2445);function s(e){let{className:t,...a}=e;return(0,o.Y)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.A)(i.iconEdit,t),"aria-hidden":"true",...a,children:(0,o.Y)("g",{children:(0,o.Y)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function c(e){let{editUrl:t}=e;return(0,o.FD)("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:n.G.common.editThisPage,children:[(0,o.Y)(s,{}),(0,o.Y)(l.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},13555:(e,t,a)=>{a.d(t,{A:()=>i});a(96540);var l=a(20053),n=a(35358),r=a(2445);function i(e){const{permalink:t,title:a,subLabel:i,isNext:o}=e;return(0,r.FD)(n.A,{className:(0,l.A)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[i&&(0,r.Y)("div",{className:"pagination-nav__sublabel",children:i}),(0,r.Y)("div",{className:"pagination-nav__label",children:a})]})}},41883:(e,t,a)=>{a.d(t,{A:()=>o});a(96540);var l=a(20053),n=a(35358);const r={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var i=a(2445);function o(e){let{permalink:t,label:a,count:o}=e;return(0,i.FD)(n.A,{href:t,className:(0,l.A)(r.tag,o?r.tagWithCount:r.tagRegular),children:[a,o&&(0,i.Y)("span",{children:o})]})}},81113:(e,t,a)=>{a.d(t,{A:()=>s});a(96540);var l=a(20053),n=a(23230),r=a(41883);const i={tags:"tags_jXut",tag:"tag_QGVx"};var o=a(2445);function s(e){let{tags:t}=e;return(0,o.FD)(o.FK,{children:[(0,o.Y)("b",{children:(0,o.Y)(n.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.Y)("ul",{className:(0,l.A)(i.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:a}=e;return(0,o.Y)("li",{className:i.tag,children:(0,o.Y)(r.A,{label:t,permalink:a})},a)}))})]})}},38322:(e,t,a)=>{a.d(t,{e:()=>s,i:()=>o});var l=a(96540),n=a(4799),r=a(2445);const i=l.createContext(null);function o(e){let{children:t,content:a,isBlogPostPage:n=!1}=e;const o=function(e){let{content:t,isBlogPostPage:a}=e;return(0,l.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:n});return(0,r.Y)(i.Provider,{value:o,children:t})}function s(){const e=(0,l.useContext)(i);if(null===e)throw new n.dV("BlogPostProvider");return e}},57824:(e,t,a)=>{a.d(t,{W:()=>c});var l=a(96540),n=a(97639);const r=["zero","one","two","few","many","other"];function i(e){return r.filter((t=>e.includes(t)))}const o={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function s(){const{i18n:{currentLocale:e}}=(0,n.A)();return(0,l.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:i(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+t.message+"\n"),o}}),[e])}function c(){const e=s();return{selectMessage:(t,a)=>function(e,t,a){const l=e.split("|");if(1===l.length)return l[0];l.length>a.pluralForms.length&&console.error("For locale="+a.locale+", a maximum of "+a.pluralForms.length+" plural forms are expected ("+a.pluralForms.join(",")+"), but the message contains "+l.length+": "+e);const n=a.select(t),r=a.pluralForms.indexOf(n);return l[Math.min(r,l.length-1)]}(a,t,e)}}},87789:(e,t,a)=>{a.d(t,{A:()=>C});a(96540);var l=a(20053),n=a(38322),r=a(98180),i=a(2445);function o(e){var t;let{children:a,className:l}=e;const{frontMatter:o,assets:s}=(0,n.e)(),{withBaseUrl:c}=(0,r.h)(),d=null!=(t=s.image)?t:o.image;return(0,i.FD)("article",{className:l,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting",children:[d&&(0,i.Y)("meta",{itemProp:"image",content:c(d,{absolute:!0})}),a]})}var s=a(35358);const c={titleLink:"titleLink_BX2g"};function d(e){let{className:t}=e;const{metadata:a,isBlogPostPage:r}=(0,n.e)(),{permalink:o,title:d}=a,m=r?"h1":"h2";return(0,i.Y)(m,{className:(0,l.A)(c.title,t),itemProp:"headline",children:r?d:(0,i.Y)(s.A,{itemProp:"url",to:o,className:c.titleLink,children:d})})}var m=a(23230),g=a(57824);const u={container:"container_iJTo"};function h(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,g.W)();return t=>{const a=Math.ceil(t);return e(a,(0,m.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,i.Y)(i.FK,{children:a(t)})}function p(e){let{date:t,formattedDate:a}=e;return(0,i.Y)("time",{dateTime:t,itemProp:"datePublished",children:a})}function b(){return(0,i.Y)(i.FK,{children:" \xb7 "})}function f(e){let{className:t}=e;const{metadata:a}=(0,n.e)(),{date:r,formattedDate:o,readingTime:s}=a;return(0,i.FD)("div",{className:(0,l.A)(u.container,"margin-vert--md",t),children:[(0,i.Y)(p,{date:r,formattedDate:o}),void 0!==s&&(0,i.FD)(i.FK,{children:[(0,i.Y)(b,{}),(0,i.Y)(h,{readingTime:s})]})]})}function Y(e){return e.href?(0,i.Y)(s.A,{...e}):(0,i.Y)(i.FK,{children:e.children})}function v(e){let{author:t,className:a}=e;const{name:n,title:r,url:o,imageURL:s,email:c}=t,d=o||c&&"mailto:"+c||void 0;return(0,i.FD)("div",{className:(0,l.A)("avatar margin-bottom--sm",a),children:[s&&(0,i.Y)(Y,{href:d,className:"avatar__photo-link",children:(0,i.Y)("img",{className:"avatar__photo",src:s,alt:n})}),n&&(0,i.FD)("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person",children:[(0,i.Y)("div",{className:"avatar__name",children:(0,i.Y)(Y,{href:d,itemProp:"url",children:(0,i.Y)("span",{itemProp:"name",children:n})})}),r&&(0,i.Y)("small",{className:"avatar__subtitle",itemProp:"description",children:r})]})]})}const A={authorCol:"authorCol_q4o9",imageOnlyAuthorRow:"imageOnlyAuthorRow_lXe7",imageOnlyAuthorCol:"imageOnlyAuthorCol_cxD5"};function P(e){let{className:t}=e;const{metadata:{authors:a},assets:r}=(0,n.e)();if(0===a.length)return null;const o=a.every((e=>{let{name:t}=e;return!t}));return(0,i.Y)("div",{className:(0,l.A)("margin-top--md margin-bottom--sm",o?A.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>{var a;return(0,i.Y)("div",{className:(0,l.A)(!o&&"col col--6",o?A.imageOnlyAuthorCol:A.authorCol),children:(0,i.Y)(v,{author:{...e,imageURL:null!=(a=r.authorsImageUrls[t])?a:e.imageURL}})},t)}))})}function N(){const{isBlogPostPage:e}=(0,n.e)();return(0,i.FD)("header",{children:[(0,i.Y)(d,{}),e&&(0,i.FD)(i.FK,{children:[(0,i.Y)(f,{}),(0,i.Y)(P,{})]})]})}var _=a(64609),F=a(40744);function T(e){let{children:t,className:a}=e;const{isBlogPostPage:r}=(0,n.e)();return(0,i.Y)("div",{id:r?_.blogPostContainerID:void 0,className:(0,l.A)("markdown",a),itemProp:"articleBody",children:(0,i.Y)(F.A,{children:t})})}var k=a(55911),D=a(81113),w=a(41883);function I(){return(0,i.Y)("b",{children:(0,i.Y)(m.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function L(e){const{blogPostTitle:t,...a}=e;return(0,i.Y)(s.A,{"aria-label":(0,m.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,i.Y)(I,{})})}var y=a(25066);const R={blogPostFooterDetailsFull:"blogPostFooterDetailsFull_Wr5y",blogPostInfo:"blogPostInfo_k7sy",blogPostInfoTags:"blogPostInfoTags_W9UY",blogPostAuthor:"blogPostAuthor_OLeU",blogPostDate:"blogPostDate_Z606",blogPostReadTime:"blogPostReadTime_AZ1H",blogPostDetailsFull:"blogPostDetailsFull_rPUK",divider:"divider_nSib"};function x(){const{metadata:e,isBlogPostPage:t}=(0,n.e)(),{tags:a,title:r,editUrl:o,hasTruncateMarker:s,date:c,formattedDate:d,readingTime:m,authors:g}=e,u=!t&&s,p=a.length>0,b=g.length>0;return t?(0,i.FD)("footer",{className:(0,l.A)("row docusaurus-mt-lg",t&&R.blogPostFooterDetailsFull),children:[p&&(0,i.Y)("div",{className:(0,l.A)("col",{"col--9":u}),children:(0,i.Y)(D.A,{tags:a})}),t&&o&&(0,i.Y)("div",{className:"col margin-top--sm",children:(0,i.Y)(k.A,{editUrl:o})}),u&&(0,i.Y)("div",{className:(0,l.A)("col text--right",{"col--3":p}),children:(0,i.Y)(L,{blogPostTitle:r,to:e.permalink})})]}):(0,i.FD)(i.FK,{children:[(0,i.Y)("hr",{className:R.divider}),(0,i.FD)("div",{className:R.blogPostInfo,children:[b&&(0,i.FD)(i.FK,{children:[(0,i.Y)(y.In,{icon:"ri:user-fill",color:"#c4d3e0"}),g.map((e=>(0,i.Y)("span",{className:"blog__author",children:(0,i.Y)("a",{href:e.url,className:R.blogPostAuthor,children:e.name})},e.url)))]}),c&&(0,i.FD)(i.FK,{children:[(0,i.Y)(y.In,{icon:"ri:calendar-fill",color:"#c4d3e0"}),(0,i.Y)("time",{dateTime:c,className:R.blogPostDate,itemProp:"datePublished",children:d})]}),p&&(0,i.FD)(i.FK,{children:[(0,i.Y)(y.In,{icon:"ri:price-tag-3-fill",color:"#c4d3e0"}),(0,i.Y)("span",{className:R.blogPostInfoTags,children:a.map((e=>{let{label:t,permalink:a}=e;return(0,i.Y)(w.A,{label:t,permalink:a},a)}))})]}),m&&(0,i.FD)(i.FK,{children:[(0,i.Y)(y.In,{icon:"ri:time-fill",color:"#c4d3e0"}),(0,i.Y)("span",{className:(0,l.A)(R.blogPostReadTime,"blog__readingTime"),children:(0,i.Y)(h,{readingTime:m})})]})]})]})}function C(e){let{children:t,className:a}=e;const r=function(){const{isBlogPostPage:e}=(0,n.e)();return e?void 0:"blogPost-container margin-bottom--lg"}();return(0,i.FD)(o,{className:(0,l.A)(r,a),children:[(0,i.Y)(N,{}),(0,i.Y)(T,{children:t}),(0,i.Y)(x,{})]})}},50181:(e,t,a)=>{a.d(t,{A:()=>o});a(96540);var l=a(38322),n=a(87789),r=a(41705),i=a(2445);function o(e){let{items:t,component:a=n.A}=e;return(0,i.Y)(i.FK,{children:t.map((e=>{let{content:t}=e;return(0,i.Y)(l.i,{content:t,children:(0,i.Y)(r.zW,{direction:"left",duration:800,triggerOnce:!0,children:(0,i.Y)(a,{children:(0,i.Y)(t,{})})})},t.metadata.permalink)}))})}},33375:(e,t,a)=>{a.d(t,{A:()=>u});a(96540);var l=a(82216),n=a(20053),r=a(35358),i=a(23230);const o={sidebar:"sidebar_brwN",sidebarItemTitle:"sidebarItemTitle_r4Q1",sidebarItemList:"sidebarItemList_QwSx",sidebarItem:"sidebarItem_lnhn",sidebarItemLink:"sidebarItemLink_yNGZ",sidebarItemLinkActive:"sidebarItemLinkActive_oSRm"};var s=a(2445);function c(e){let{sidebar:t}=e;return(0,s.Y)("aside",{className:"col col--3",children:(0,s.FD)("nav",{className:(0,n.A)(o.sidebar,"thin-scrollbar"),"aria-label":(0,i.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,s.Y)("div",{className:(0,n.A)(o.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,s.Y)("ul",{className:(0,n.A)(o.sidebarItemList,"clean-list"),children:t.items.map((e=>(0,s.Y)("li",{className:o.sidebarItem,children:(0,s.Y)(r.A,{isNavLink:!0,to:e.permalink,className:o.sidebarItemLink,activeClassName:o.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var d=a(70763);function m(e){let{sidebar:t}=e;return(0,s.Y)("ul",{className:"menu__list",children:t.items.map((e=>(0,s.Y)("li",{className:"menu__list-item",children:(0,s.Y)(r.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function g(e){return(0,s.Y)(d.GX,{component:m,props:e})}function u(e){let{sidebar:t}=e;const a=(0,l.l)();return null!=t&&t.items.length?"mobile"===a?(0,s.Y)(g,{sidebar:t}):(0,s.Y)(c,{sidebar:t}):null}},24630:(e,t,a)=>{a.d(t,{A:()=>r});var l=a(96540),n=a(2445);const r={React:l,...l,DataLog:e=>{let{children:t}=e;console.log("-"+decodeURIComponent(location.pathname.split("/").pop())+"LiveCode:",t);const a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&(t=JSON.stringify(t)),"Array"===a&&(t=t.toString()),(0,n.FD)("div",{children:[(0,n.Y)("code",{children:t})," - ",a]})}}}}]);