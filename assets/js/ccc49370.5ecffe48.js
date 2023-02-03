"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[6103],{2187:function(e,t,a){a.d(t,{Z:function(){return F}});a(7294);var r=a(6010),i=a(9107),n=a(9524),l=a(5944);function o(e){var t,a=e.children,r=e.className,o=(0,i.C)(),s=o.frontMatter,c=o.assets,d=(0,n.C)().withBaseUrl,m=null!=(t=c.image)?t:s.image;return(0,l.BX)("article",{className:r,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting",children:[m&&(0,l.tZ)("meta",{itemProp:"image",content:d(m,{absolute:!0})}),a]})}var s=a(3699),c={titleLink:"titleLink_BX2g"};function d(e){var t=e.className,a=(0,i.C)(),n=a.metadata,o=a.isBlogPostPage,d=n.permalink,m=n.title,u=o?"h1":"h2";return(0,l.tZ)(u,{className:(0,r.Z)(c.title,t),itemProp:"headline",children:o?m:(0,l.tZ)(s.Z,{itemProp:"url",to:d,className:c.titleLink,children:m})})}var m=a(7325),u=a(3777),h="container_iJTo";function g(e){var t,a=e.readingTime,r=(t=(0,u.c)().selectMessage,function(e){var a=Math.ceil(e);return t(a,(0,m.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))});return(0,l.tZ)(l.HY,{children:r(a)})}function Z(e){var t=e.date,a=e.formattedDate;return(0,l.tZ)("time",{dateTime:t,itemProp:"datePublished",children:a})}function p(){return(0,l.tZ)(l.HY,{children:" \xb7 "})}function b(e){var t=e.className,a=(0,i.C)().metadata,n=a.date,o=a.formattedDate,s=a.readingTime;return(0,l.BX)("div",{className:(0,r.Z)(h,"margin-vert--md",t),children:[(0,l.tZ)(Z,{date:n,formattedDate:o}),void 0!==s&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(p,{}),(0,l.tZ)(g,{readingTime:s})]})]})}function v(e){return e.href?(0,l.tZ)(s.Z,Object.assign({},e)):(0,l.tZ)(l.HY,{children:e.children})}function f(e){var t=e.author,a=e.className,i=t.name,n=t.title,o=t.url,s=t.imageURL,c=t.email,d=o||c&&"mailto:"+c||void 0;return(0,l.BX)("div",{className:(0,r.Z)("avatar margin-bottom--sm",a),children:[s&&(0,l.tZ)(v,{href:d,className:"avatar__photo-link",children:(0,l.tZ)("img",{className:"avatar__photo",src:s,alt:i})}),i&&(0,l.BX)("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person",children:[(0,l.tZ)("div",{className:"avatar__name",children:(0,l.tZ)(v,{href:d,itemProp:"url",children:(0,l.tZ)("span",{itemProp:"name",children:i})})}),n&&(0,l.tZ)("small",{className:"avatar__subtitle",itemProp:"description",children:n})]})]})}var _="authorCol_q4o9",N="imageOnlyAuthorRow_lXe7",P="imageOnlyAuthorCol_cxD5";function k(e){var t=e.className,a=(0,i.C)(),n=a.metadata.authors,o=a.assets;if(0===n.length)return null;var s=n.every((function(e){return!e.name}));return(0,l.tZ)("div",{className:(0,r.Z)("margin-top--md margin-bottom--sm",s?N:"row",t),children:n.map((function(e,t){var a;return(0,l.tZ)("div",{className:(0,r.Z)(!s&&"col col--6",s?P:_),children:(0,l.tZ)(f,{author:Object.assign({},e,{imageURL:null!=(a=o.authorsImageUrls[t])?a:e.imageURL})})},t)}))})}function B(){var e=(0,i.C)().isBlogPostPage;return(0,l.BX)("header",{children:[(0,l.tZ)(d,{}),e&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(b,{}),(0,l.tZ)(k,{})]})]})}var T=a(3905),X=a(2235);function y(e){var t=e.children,a=e.className,n=(0,i.C)().isBlogPostPage;return(0,l.tZ)("div",{id:n?T.blogPostContainerID:void 0,className:(0,r.Z)("markdown",a),itemProp:"articleBody",children:(0,l.tZ)(X.Z,{children:t})})}var C=a(4850),I=a(4597),L=a(3852),w=a(3366),O=["blogPostTitle"];function H(){return(0,l.tZ)("b",{children:(0,l.tZ)(m.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function j(e){var t=e.blogPostTitle,a=(0,w.Z)(e,O);return(0,l.tZ)(s.Z,Object.assign({"aria-label":(0,m.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t})},a,{children:(0,l.tZ)(H,{})}))}var R=a(1954),A="blogPostFooterDetailsFull_Wr5y",M="blogPostInfo_k7sy",U="blogPostInfoTags_W9UY",Y="blogPostAuthor_OLeU",x="blogPostDate_Z606",D="blogPostReadTime_AZ1H",S="divider_nSib";function J(){var e=(0,i.C)(),t=e.metadata,a=e.isBlogPostPage,n=t.tags,o=t.title,s=t.editUrl,c=t.hasTruncateMarker,d=t.date,m=t.formattedDate,u=t.readingTime,h=t.authors,Z=!a&&c,p=n.length>0,b=h.length>0;return a?(0,l.BX)("footer",{className:(0,r.Z)("row docusaurus-mt-lg",a&&A),children:[p&&(0,l.tZ)("div",{className:(0,r.Z)("col",{"col--9":Z}),children:(0,l.tZ)(I.Z,{tags:n})}),a&&s&&(0,l.tZ)("div",{className:"col margin-top--sm",children:(0,l.tZ)(C.Z,{editUrl:s})}),Z&&(0,l.tZ)("div",{className:(0,r.Z)("col text--right",{"col--3":p}),children:(0,l.tZ)(j,{blogPostTitle:o,to:t.permalink})})]}):(0,l.BX)(l.HY,{children:[(0,l.tZ)("hr",{className:S}),(0,l.BX)("div",{className:M,children:[b&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(R.JO,{icon:"ri:user-fill",color:"#c4d3e0"}),h.map((function(e){return(0,l.tZ)("span",{className:"blog__author",children:(0,l.tZ)("a",{href:e.url,className:Y,children:e.name})},e.url)}))]}),d&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(R.JO,{icon:"ri:calendar-fill",color:"#c4d3e0"}),(0,l.tZ)("time",{dateTime:d,className:x,itemProp:"datePublished",children:m})]}),p&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(R.JO,{icon:"ri:price-tag-3-fill",color:"#c4d3e0"}),(0,l.tZ)("span",{className:U,children:n.map((function(e){var t=e.label,a=e.permalink;return(0,l.tZ)(L.Z,{label:t,permalink:a},a)}))})]}),u&&(0,l.BX)(l.HY,{children:[(0,l.tZ)(R.JO,{icon:"ri:time-fill",color:"#c4d3e0"}),(0,l.tZ)("span",{className:(0,r.Z)(D,"blog__readingTime"),children:(0,l.tZ)(g,{readingTime:u})})]})]})]})}function F(e){var t=e.children,a=e.className,n=(0,i.C)().isBlogPostPage?void 0:"blogPost-container margin-bottom--lg";return(0,l.BX)(o,{className:(0,r.Z)(n,a),children:[(0,l.tZ)(B,{}),(0,l.tZ)(y,{children:t}),(0,l.tZ)(J,{})]})}},9452:function(e,t,a){a.r(t),a.d(t,{default:function(){return _}});a(7294);var r=a(6010),i=a(5463),n=a(3702),l=a(9107),o=a(7624),s=a(2187),c=a(3008),d=a(5944);function m(){var e,t=(0,l.C)(),a=t.assets,r=t.metadata,n=r.title,o=r.description,s=r.date,c=r.tags,m=r.authors,u=r.frontMatter,h=u.keywords,g=null!=(e=a.image)?e:u.image;return(0,d.BX)(i.d,{title:n,description:o,keywords:h,image:g,children:[(0,d.tZ)("meta",{property:"og:type",content:"article"}),(0,d.tZ)("meta",{property:"article:published_time",content:s}),m.some((function(e){return e.url}))&&(0,d.tZ)("meta",{property:"article:author",content:m.map((function(e){return e.url})).filter(Boolean).join(",")}),c.length>0&&(0,d.tZ)("meta",{property:"article:tag",content:c.map((function(e){return e.label})).join(",")})]})}var u=a(5228),h=a(7086),g=a(107),Z=a(9200),p=a(748),b=a(9861);function v(){var e=(0,g.L)(),t="dark"===(0,Z.I)().colorMode?"dark":"light",a=Object.assign({},e.giscus,{id:"comments",reactionsEnabled:"1",emitMetadata:"0",inputPosition:"top",theme:t});return(0,d.tZ)(p.Z,{fallback:(0,d.tZ)("div",{}),children:function(){return(0,d.tZ)(b.Z,Object.assign({},a))}})}function f(e){e.sidebar;var t=e.children,a=(0,l.C)(),r=a.metadata,i=a.toc,n=r.nextItem,m=r.prevItem,g=r.frontMatter,Z=g.hide_table_of_contents,p=g.toc_min_heading_level,b=g.toc_max_heading_level;return(0,d.BX)(o.Z,{toc:!Z&&i.length>0?(0,d.tZ)(h.Z,{toc:i,minHeadingLevel:p,maxHeadingLevel:b}):void 0,children:[(0,d.tZ)(s.Z,{children:t}),(n||m)&&(0,d.tZ)(c.Z,{nextItem:n,prevItem:m}),(0,d.tZ)(v,{}),(0,d.tZ)(u.Z,{})]})}function _(e){var t=e.content;return(0,d.tZ)(l.n,{content:e.content,isBlogPostPage:!0,children:(0,d.BX)(i.FG,{className:(0,r.Z)(n.k.wrapper.blogPages,n.k.page.blogPostPage),children:[(0,d.tZ)(m,{}),(0,d.tZ)(f,{sidebar:e.sidebar,children:(0,d.tZ)(t,{})})]})})}},1501:function(e,t,a){a.d(t,{Z:function(){return v}});a(7294);var r=a(3488),i=a(6010),n=a(3699),l=a(7325),o="sidebar_brwN",s="sidebarItemTitle_r4Q1",c="sidebarItemList_QwSx",d="sidebarItem_lnhn",m="sidebarItemLink_yNGZ",u="sidebarItemLinkActive_oSRm",h=a(5944);function g(e){var t=e.sidebar;return(0,h.tZ)("aside",{className:"col col--3",children:(0,h.BX)("nav",{className:(0,i.Z)(o,"thin-scrollbar"),"aria-label":(0,l.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,h.tZ)("div",{className:(0,i.Z)(s,"margin-bottom--md"),children:t.title}),(0,h.tZ)("ul",{className:(0,i.Z)(c,"clean-list"),children:t.items.map((function(e){return(0,h.tZ)("li",{className:d,children:(0,h.tZ)(n.Z,{isNavLink:!0,to:e.permalink,className:m,activeClassName:u,children:e.title})},e.permalink)}))})]})})}var Z=a(3086);function p(e){var t=e.sidebar;return(0,h.tZ)("ul",{className:"menu__list",children:t.items.map((function(e){return(0,h.tZ)("li",{className:"menu__list-item",children:(0,h.tZ)(n.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)}))})}function b(e){return(0,h.tZ)(Z.Zo,{component:p,props:e})}function v(e){var t=e.sidebar,a=(0,r.i)();return null!=t&&t.items.length?"mobile"===a?(0,h.tZ)(b,{sidebar:t}):(0,h.tZ)(g,{sidebar:t}):null}},8263:function(e,t,a){var r=a(7294),i=a(5944),n=Object.assign({React:r},r,{DataLog:function(e){var t=e.children;console.log("-"+decodeURIComponent(location.pathname.split("/").pop())+"LiveCode:",t);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&(t=JSON.stringify(t)),"Array"===a&&(t=t.toString()),(0,i.BX)("div",{children:[(0,i.tZ)("code",{children:t})," - ",a]})}});t.Z=n}}]);