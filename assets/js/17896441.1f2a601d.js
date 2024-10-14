"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[8401],{4439:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ce});var a=n(96540),l=n(69817),i=n(4799),o=n(2445);const r=a.createContext(null);function s(e){let{children:t,content:n}=e;const l=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,o.Y)(r.Provider,{value:l,children:t})}function c(){const e=(0,a.useContext)(r);if(null===e)throw new i.dV("DocProvider");return e}function d(){var e;const{metadata:t,frontMatter:n,assets:a}=c();return(0,o.Y)(l.be,{title:t.title,description:t.description,keywords:n.keywords,image:null!=(e=a.image)?e:n.image})}var u=n(20053),m=n(82216),h=n(23230),v=n(13555);function p(e){const{previous:t,next:n}=e;return(0,o.FD)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,o.Y)(v.A,{...t,subLabel:(0,o.Y)(h.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,o.Y)(v.A,{...n,subLabel:(0,o.Y)(h.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function b(){const{metadata:e}=c();return(0,o.Y)(p,{previous:e.previous,next:e.next})}var g=n(97639),f=n(35358),Y=n(19802),A=n(18630),L=n(2780),C=n(33403);const N={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.Y)(h.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,o.Y)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.Y)(h.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,o.Y)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function _(e){const t=N[e.versionMetadata.banner];return(0,o.Y)(t,{...e})}function k(e){let{versionLabel:t,to:n,onClick:a}=e;return(0,o.Y)(h.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,o.Y)("b",{children:(0,o.Y)(f.A,{to:n,onClick:a,children:(0,o.Y)(h.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function T(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:a}}=(0,g.A)(),{pluginId:l}=(0,Y.vT)({failfast:!0}),{savePreferredVersionName:i}=(0,L.g1)(l),{latestDocSuggestion:r,latestVersionSuggestion:s}=(0,Y.HW)(l),c=null!=r?r:(d=s).docs.find((e=>e.id===d.mainDocId));var d;return(0,o.FD)("div",{className:(0,u.A)(t,A.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,o.Y)("div",{children:(0,o.Y)(_,{siteTitle:a,versionMetadata:n})}),(0,o.Y)("div",{className:"margin-top--md",children:(0,o.Y)(k,{versionLabel:s.label,to:c.path,onClick:()=>i(s.name)})})]})}function x(e){let{className:t}=e;const n=(0,C.r)();return n.banner?(0,o.Y)(T,{className:t,versionMetadata:n}):null}function H(e){let{className:t}=e;const n=(0,C.r)();return n.badge?(0,o.Y)("span",{className:(0,u.A)(t,A.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.Y)(h.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}function U(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return(0,o.Y)(h.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,o.Y)("b",{children:(0,o.Y)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function w(e){let{lastUpdatedBy:t}=e;return(0,o.Y)(h.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,o.Y)("b",{children:t})},children:" by {user}"})}function y(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:a}=e;return(0,o.FD)("span",{className:A.G.common.lastUpdated,children:[(0,o.Y)(h.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,o.Y)(U,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:a?(0,o.Y)(w,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var D=n(55911),F=n(81113);const M={lastUpdated:"lastUpdated_vwxv"};function I(e){return(0,o.Y)("div",{className:(0,u.A)(A.G.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,o.Y)("div",{className:"col",children:(0,o.Y)(F.A,{...e})})})}function B(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a,formattedLastUpdatedAt:l}=e;return(0,o.FD)("div",{className:(0,u.A)(A.G.docs.docFooterEditMetaRow,"row"),children:[(0,o.Y)("div",{className:"col",children:t&&(0,o.Y)(D.A,{editUrl:t})}),(0,o.Y)("div",{className:(0,u.A)("col",M.lastUpdated),children:(n||a)&&(0,o.Y)(y,{lastUpdatedAt:n,formattedLastUpdatedAt:l,lastUpdatedBy:a})})]})}function E(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:a,lastUpdatedBy:l,tags:i}=e,r=i.length>0,s=!!(t||n||l);return r||s?(0,o.FD)("footer",{className:(0,u.A)(A.G.docs.docFooter,"docusaurus-mt-lg"),children:[r&&(0,o.Y)(I,{tags:i}),s&&(0,o.Y)(B,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:a})]}):null}var O=n(94549),V=n(61507);const S={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function P(e){let{collapsed:t,...n}=e;return(0,o.Y)("button",{type:"button",...n,className:(0,u.A)("clean-btn",S.tocCollapsibleButton,!t&&S.tocCollapsibleButtonExpanded,n.className),children:(0,o.Y)(h.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const R={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function G(e){let{toc:t,className:n,minHeadingLevel:a,maxHeadingLevel:l}=e;const{collapsed:i,toggleCollapsed:r}=(0,O.u)({initialState:!0});return(0,o.FD)("div",{className:(0,u.A)(R.tocCollapsible,!i&&R.tocCollapsibleExpanded,n),children:[(0,o.Y)(P,{collapsed:i,onClick:r}),(0,o.Y)(O.N,{lazy:!0,className:R.tocCollapsibleContent,collapsed:i,children:(0,o.Y)(V.A,{toc:t,minHeadingLevel:a,maxHeadingLevel:l})})]})}const j={tocMobile:"tocMobile_ITEo"};function z(){const{toc:e,frontMatter:t}=c();return(0,o.Y)(G,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,u.A)(A.G.docs.docTocMobile,j.tocMobile)})}var q=n(98793);function W(){const{toc:e,frontMatter:t}=c();return(0,o.Y)(q.A,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:A.G.docs.docTocDesktop})}var Z=n(85225),J=n(40744);function K(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=c();return t.hide_title||void 0!==n?null:e.title}();return(0,o.FD)("div",{className:(0,u.A)(A.G.docs.docMarkdown,"markdown"),children:[n&&(0,o.Y)("header",{children:(0,o.Y)(Z.A,{as:"h1",children:n})}),(0,o.Y)(J.A,{children:t})]})}var Q=n(9048),X=n(80260),$=n(98180);function ee(e){return(0,o.Y)("svg",{viewBox:"0 0 24 24",...e,children:(0,o.Y)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const te={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function ne(){const e=(0,$.A)("/");return(0,o.Y)("li",{className:"breadcrumbs__item",children:(0,o.Y)(f.A,{"aria-label":(0,h.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,o.Y)(ee,{className:te.breadcrumbHomeIcon})})})}const ae={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function le(e){let{children:t,href:n,isLast:a}=e;const l="breadcrumbs__link";return a?(0,o.Y)("span",{className:l,itemProp:"name",children:t}):n?(0,o.Y)(f.A,{className:l,href:n,itemProp:"item",children:(0,o.Y)("span",{itemProp:"name",children:t})}):(0,o.Y)("span",{className:l,children:t})}function ie(e){let{children:t,active:n,index:a,addMicrodata:l}=e;return(0,o.FD)("li",{...l&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,u.A)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,o.Y)("meta",{itemProp:"position",content:String(a+1)})]})}function oe(){const e=(0,Q.OF)(),t=(0,X.Dt)();return e?(0,o.Y)("nav",{className:(0,u.A)(A.G.docs.docBreadcrumbs,ae.breadcrumbsContainer),"aria-label":(0,h.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,o.FD)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,o.Y)(ne,{}),e.map(((t,n)=>{const a=n===e.length-1;return(0,o.Y)(ie,{active:a,index:n,addMicrodata:!!t.href,children:(0,o.Y)(le,{href:t.href,isLast:a,children:t.label})},n)}))]})}):null}const re={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function se(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=c(),n=(0,m.l)(),a=e.hide_table_of_contents,l=!a&&t.length>0;return{hidden:a,mobile:l?(0,o.Y)(z,{}):void 0,desktop:!l||"desktop"!==n&&"ssr"!==n?void 0:(0,o.Y)(W,{})}}();return(0,o.FD)("div",{className:"row",children:[(0,o.FD)("div",{className:(0,u.A)("col",!n.hidden&&re.docItemCol),children:[(0,o.Y)(x,{}),(0,o.FD)("div",{className:re.docItemContainer,children:[(0,o.FD)("article",{children:[(0,o.Y)(oe,{}),(0,o.Y)(H,{}),n.mobile,(0,o.Y)(K,{children:t}),(0,o.Y)(E,{})]}),(0,o.Y)(b,{})]})]}),n.desktop&&(0,o.Y)("div",{className:"col col--3",children:n.desktop})]})}function ce(e){const t="docs-doc-id-"+e.content.metadata.unversionedId,n=e.content;return(0,o.Y)(s,{content:e.content,children:(0,o.FD)(l.e3,{className:t,children:[(0,o.Y)(d,{}),(0,o.Y)(se,{children:(0,o.Y)(n,{})})]})})}},55911:(e,t,n)=>{n.d(t,{A:()=>c});n(96540);var a=n(23230),l=n(18630),i=n(20053);const o={iconEdit:"iconEdit_Z9Sw"};var r=n(2445);function s(e){let{className:t,...n}=e;return(0,r.Y)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,i.A)(o.iconEdit,t),"aria-hidden":"true",...n,children:(0,r.Y)("g",{children:(0,r.Y)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function c(e){let{editUrl:t}=e;return(0,r.FD)("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:l.G.common.editThisPage,children:[(0,r.Y)(s,{}),(0,r.Y)(a.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},13555:(e,t,n)=>{n.d(t,{A:()=>o});n(96540);var a=n(20053),l=n(35358),i=n(2445);function o(e){const{permalink:t,title:n,subLabel:o,isNext:r}=e;return(0,i.FD)(l.A,{className:(0,a.A)("pagination-nav__link",r?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[o&&(0,i.Y)("div",{className:"pagination-nav__sublabel",children:o}),(0,i.Y)("div",{className:"pagination-nav__label",children:n})]})}},98793:(e,t,n)=>{n.d(t,{A:()=>c});n(96540);var a=n(20053),l=n(61507);const i={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var o=n(2445);const r="table-of-contents__link toc-highlight",s="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,o.Y)("div",{className:(0,a.A)(i.tableOfContents,"thin-scrollbar",t),children:(0,o.Y)(l.A,{...n,linkClassName:r,linkActiveClassName:s})})}},61507:(e,t,n)=>{n.d(t,{A:()=>v});var a=n(96540),l=n(86957);function i(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...l}=e;n>=0?t[n].children.push(l):a.push(l)})),a}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=o({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function r(e){const t=e.getBoundingClientRect();return t.top===t.bottom?r(e.parentNode):t}function s(e,t){var n;let{anchorTopOffset:a}=t;const l=e.find((e=>r(e).top>=a));if(l){var i;return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(l))?l:null!=(i=e[e.indexOf(l)-1])?i:null}return null!=(n=e[e.length-1])?n:null}function c(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,l.p)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,a.useRef)(void 0),n=c();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:l,minHeadingLevel:i,maxHeadingLevel:o}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let l=t;l<=n;l+=1)a.push("h"+l+".anchor");return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:i,maxHeadingLevel:o}),c=s(r,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(l),e.classList.add(l),t.current=e):e.classList.remove(l)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}var u=n(2445);function m(e){let{toc:t,className:n,linkClassName:a,isChild:l}=e;return t.length?(0,u.Y)("ul",{className:l?void 0:n,children:t.map((e=>(0,u.FD)("li",{children:[(0,u.Y)("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,u.Y)(m,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const h=a.memo(m);function v(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:s,minHeadingLevel:c,maxHeadingLevel:m,...v}=e;const p=(0,l.p)(),b=null!=c?c:p.tableOfContents.minHeadingLevel,g=null!=m?m:p.tableOfContents.maxHeadingLevel,f=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:l}=e;return(0,a.useMemo)((()=>o({toc:i(t),minHeadingLevel:n,maxHeadingLevel:l})),[t,n,l])}({toc:t,minHeadingLevel:b,maxHeadingLevel:g});return d((0,a.useMemo)((()=>{if(r&&s)return{linkClassName:r,linkActiveClassName:s,minHeadingLevel:b,maxHeadingLevel:g}}),[r,s,b,g])),(0,u.Y)(h,{toc:f,className:n,linkClassName:r,...v})}},41883:(e,t,n)=>{n.d(t,{A:()=>r});n(96540);var a=n(20053),l=n(35358);const i={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var o=n(2445);function r(e){let{permalink:t,label:n,count:r}=e;return(0,o.FD)(l.A,{href:t,className:(0,a.A)(i.tag,r?i.tagWithCount:i.tagRegular),children:[n,r&&(0,o.Y)("span",{children:r})]})}},81113:(e,t,n)=>{n.d(t,{A:()=>s});n(96540);var a=n(20053),l=n(23230),i=n(41883);const o={tags:"tags_jXut",tag:"tag_QGVx"};var r=n(2445);function s(e){let{tags:t}=e;return(0,r.FD)(r.FK,{children:[(0,r.Y)("b",{children:(0,r.Y)(l.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,r.Y)("ul",{className:(0,a.A)(o.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:n}=e;return(0,r.Y)("li",{className:o.tag,children:(0,r.Y)(i.A,{label:t,permalink:n})},n)}))})]})}},33403:(e,t,n)=>{n.d(t,{n:()=>r,r:()=>s});var a=n(96540),l=n(4799),i=n(2445);const o=a.createContext(null);function r(e){let{children:t,version:n}=e;return(0,i.Y)(o.Provider,{value:n,children:t})}function s(){const e=(0,a.useContext)(o);if(null===e)throw new l.dV("DocsVersionProvider");return e}},24630:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(96540),l=n(2445);const i={React:a,...a,DataLog:e=>{let{children:t}=e;console.log("-"+decodeURIComponent(location.pathname.split("/").pop())+"LiveCode:",t);const n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&(t=JSON.stringify(t)),"Array"===n&&(t=t.toString()),(0,l.FD)("div",{children:[(0,l.Y)("code",{children:t})," - ",n]})}}}}]);