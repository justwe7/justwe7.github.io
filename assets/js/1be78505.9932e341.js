"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[9514,4248],{25228:function(e,t,n){n.d(t,{Z:function(){return m}});var a=n(67294),i=n(86010),r=n(97325),o=n(23702),l=n(72957),c=n(43266);var d="backToTopButton_sjWU",s="backToTopButtonShow_xfvO",u=n(35944);function m(){var e=function(e){var t=e.threshold,n=(0,a.useState)(!1),i=n[0],r=n[1],o=(0,a.useRef)(!1),d=(0,l.Ct)(),s=d.startScroll,u=d.cancelScroll;return(0,l.RF)((function(e,n){var a=e.scrollY,i=null==n?void 0:n.scrollY;i&&(o.current?o.current=!1:a>=i?(u(),r(!1)):a<t?r(!1):a+window.innerHeight<document.documentElement.scrollHeight&&r(!0))})),(0,c.S)((function(e){e.location.hash&&(o.current=!0,r(!1))})),{shown:i,scrollToTop:function(){return s(0)}}}({threshold:300}),t=e.shown,n=e.scrollToTop;return(0,u.tZ)("button",{"aria-label":(0,r.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,i.Z)("clean-btn",o.k.common.backToTopButton,d,t&&s),type:"button",onClick:n})}},41445:function(e,t,n){n.r(t),n.d(t,{default:function(){return Se}});var a=n(67294),i=n(86010),r=n(35463),o=n(23702),l=n(60246),c=n(3734),d=n(58801),s=n(84432),u=n(58493),m=n(25228),b=n(16550),h=n(13488),p=n(20107),v=n(96811),f=n(97325),Z=n(35944);function g(e){return(0,Z.tZ)("svg",Object.assign({width:"20",height:"20","aria-hidden":"true"},e,{children:(0,Z.BX)("g",{fill:"#7a7a7a",children:[(0,Z.tZ)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,Z.tZ)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})}))}var _="collapseSidebarButton_PEFL",k="collapseSidebarButtonIcon_kv0_";function C(e){var t=e.onClick;return(0,Z.tZ)("button",{type:"button",title:(0,f.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,f.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.Z)("button button--secondary button--outline",_),onClick:t,children:(0,Z.tZ)(g,{className:k})})}var I=n(65830),S=n(72957),N=n(63366),x=n(58755),B=Symbol("EmptyContext"),T=a.createContext(B);function w(e){var t=e.children,n=(0,a.useState)(null),i=n[0],r=n[1],o=(0,a.useMemo)((function(){return{expandedItem:i,setExpandedItem:r}}),[i]);return(0,Z.tZ)(T.Provider,{value:o,children:t})}var y=n(54639),L=n(69003),A=n(83699),E=n(51048),H=["item","onItemClick","activePath","level","index"];function M(e){var t=e.categoryLabel,n=e.onClick;return(0,Z.tZ)("button",{"aria-label":(0,f.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:t}),type:"button",className:"clean-btn menu__caret",onClick:n})}function P(e){var t=e.item,n=e.onItemClick,r=e.activePath,l=e.level,d=e.index,s=(0,N.Z)(e,H),u=t.items,m=t.label,b=t.collapsible,h=t.className,v=t.href,f=(0,p.L)().docs.sidebar.autoCollapseCategories,g=function(e){var t=(0,E.Z)();return(0,a.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,c.Wl)(e):void 0}),[e,t])}(t),_=(0,c._F)(t,r),k=(0,L.Mg)(v,r),C=(0,y.u)({initialState:function(){return!!b&&(!_&&t.collapsed)}}),I=C.collapsed,S=C.setCollapsed,w=function(){var e=(0,a.useContext)(T);if(e===B)throw new x.i6("DocSidebarItemsExpandedStateProvider");return e}(),P=w.expandedItem,j=w.setExpandedItem,F=function(e){void 0===e&&(e=!I),j(e?null:d),S(e)};return function(e){var t=e.isActive,n=e.collapsed,i=e.updateCollapsed,r=(0,x.D9)(t);(0,a.useEffect)((function(){t&&!r&&n&&i(!1)}),[t,r,n,i])}({isActive:_,collapsed:I,updateCollapsed:F}),(0,a.useEffect)((function(){b&&null!=P&&P!==d&&f&&S(!0)}),[b,P,d,S,f]),(0,Z.BX)("li",{className:(0,i.Z)(o.k.docs.docSidebarItemCategory,o.k.docs.docSidebarItemCategoryLevel(l),"menu__list-item",{"menu__list-item--collapsed":I},h),children:[(0,Z.BX)("div",{className:(0,i.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":k}),children:[(0,Z.tZ)(A.Z,Object.assign({className:(0,i.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!v&&b,"menu__link--active":_}),onClick:b?function(e){null==n||n(t),v?F(!1):(e.preventDefault(),F())}:function(){null==n||n(t)},"aria-current":k?"page":void 0,"aria-expanded":b?!I:void 0,href:b?null!=g?g:"#":g},s,{children:m})),v&&b&&(0,Z.tZ)(M,{categoryLabel:m,onClick:function(e){e.preventDefault(),F()}})]}),(0,Z.tZ)(y.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:I,children:(0,Z.tZ)(K,{items:u,tabIndex:I?-1:0,onItemClick:n,activePath:r,level:l+1})})]})}var j=n(2735),F=n(14082),X="menuExternalLink_NmtK",O=["item","onItemClick","activePath","level","index"];function D(e){var t=e.item,n=e.onItemClick,a=e.activePath,r=e.level,l=(e.index,(0,N.Z)(e,O)),d=t.href,s=t.label,u=t.className,m=t.autoAddBaseUrl,b=(0,c._F)(t,a),h=(0,j.Z)(d);return(0,Z.tZ)("li",{className:(0,i.Z)(o.k.docs.docSidebarItemLink,o.k.docs.docSidebarItemLinkLevel(r),"menu__list-item",u),children:(0,Z.BX)(A.Z,Object.assign({className:(0,i.Z)("menu__link",!h&&X,{"menu__link--active":b}),autoAddBaseUrl:m,"aria-current":b?"page":void 0,to:d},h&&{onClick:n?function(){return n(t)}:void 0},l,{children:[s,!h&&(0,Z.tZ)(F.Z,{})]}))},s)}var W="menuHtmlItem_M9Kj";function R(e){var t=e.item,n=e.level,a=e.index,r=t.value,l=t.defaultStyle,c=t.className;return(0,Z.tZ)("li",{className:(0,i.Z)(o.k.docs.docSidebarItemLink,o.k.docs.docSidebarItemLinkLevel(n),l&&[W,"menu__list-item"],c),dangerouslySetInnerHTML:{__html:r}},a)}var V=["item"];function Y(e){var t=e.item,n=(0,N.Z)(e,V);switch(t.type){case"category":return(0,Z.tZ)(P,Object.assign({item:t},n));case"html":return(0,Z.tZ)(R,Object.assign({item:t},n));default:return(0,Z.tZ)(D,Object.assign({item:t},n))}}var z=["items"];function U(e){var t=e.items,n=(0,N.Z)(e,z);return(0,Z.tZ)(w,{children:t.map((function(e,t){return(0,Z.tZ)(Y,Object.assign({item:e,index:t},n),t)}))})}var K=(0,a.memo)(U),q="menu_SIkG",G="menuWithAnnouncementBar_GW3s";function J(e){var t=e.path,n=e.sidebar,r=e.className,l=function(){var e=(0,I.nT)().isActive,t=(0,a.useState)(e),n=t[0],i=t[1];return(0,S.RF)((function(t){var n=t.scrollY;e&&i(0===n)}),[e]),e&&n}();return(0,Z.tZ)("nav",{"aria-label":(0,f.I)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,i.Z)("menu thin-scrollbar",q,l&&G,r),children:(0,Z.tZ)("ul",{className:(0,i.Z)(o.k.docs.docSidebarMenu,"menu__list"),children:(0,Z.tZ)(K,{items:n,activePath:t,level:1})})})}var Q="sidebar_njMd",$="sidebarWithHideableNavbar_wUlq",ee="sidebarHidden_VK0M",te="sidebarLogo_isFc";function ne(e){var t=e.path,n=e.sidebar,a=e.onCollapse,r=e.isHidden,o=(0,p.L)(),l=o.navbar.hideOnScroll,c=o.docs.sidebar.hideable;return(0,Z.BX)("div",{className:(0,i.Z)(Q,l&&$,r&&ee),children:[l&&(0,Z.tZ)(v.Z,{tabIndex:-1,className:te}),(0,Z.tZ)(J,{path:t,sidebar:n}),c&&(0,Z.tZ)(C,{onClick:a})]})}var ae=a.memo(ne),ie=n(53086),re=n(52600),oe=function(e){var t=e.sidebar,n=e.path,a=(0,re.e)();return(0,Z.tZ)("ul",{className:(0,i.Z)(o.k.docs.docSidebarMenu,"menu__list"),children:(0,Z.tZ)(K,{items:t,activePath:n,onItemClick:function(e){"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function le(e){return(0,Z.tZ)(ie.Zo,{component:oe,props:e})}var ce=a.memo(le);function de(e){var t=(0,h.i)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,Z.BX)(Z.HY,{children:[n&&(0,Z.tZ)(ae,Object.assign({},e)),a&&(0,Z.tZ)(ce,Object.assign({},e))]})}var se="expandButton_m80_",ue="expandButtonIcon_BlDH";function me(e){var t=e.toggleSidebar;return(0,Z.tZ)("div",{className:se,title:(0,f.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,f.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,Z.tZ)(g,{className:ue})})}var be={docSidebarContainer:"docSidebarContainer_b6E3",docSidebarContainerHidden:"docSidebarContainerHidden_b3ry",sidebarViewport:"sidebarViewport_Xe31"};function he(e){var t,n=e.children,i=(0,s.V)();return(0,Z.tZ)(a.Fragment,{children:n},null!=(t=null==i?void 0:i.name)?t:"noSidebar")}function pe(e){var t=e.sidebar,n=e.hiddenSidebarContainer,r=e.setHiddenSidebarContainer,l=(0,b.TH)().pathname,c=(0,a.useState)(!1),d=c[0],s=c[1],u=(0,a.useCallback)((function(){d&&s(!1),r((function(e){return!e}))}),[r,d]);return(0,Z.tZ)("aside",{className:(0,i.Z)(o.k.docs.docSidebarContainer,be.docSidebarContainer,n&&be.docSidebarContainerHidden),onTransitionEnd:function(e){e.currentTarget.classList.contains(be.docSidebarContainer)&&n&&s(!0)},children:(0,Z.tZ)(he,{children:(0,Z.BX)("div",{className:(0,i.Z)(be.sidebarViewport,d&&be.sidebarViewportHidden),children:[(0,Z.tZ)(de,{sidebar:t,path:l,onCollapse:u,isHidden:d}),d&&(0,Z.tZ)(me,{toggleSidebar:u})]})})})}var ve={docMainContainer:"docMainContainer_gTbr",docMainContainerEnhanced:"docMainContainerEnhanced_Uz_u",docItemWrapperEnhanced:"docItemWrapperEnhanced_czyv"};function fe(e){var t=e.hiddenSidebarContainer,n=e.children,a=(0,s.V)();return(0,Z.tZ)("main",{className:(0,i.Z)(ve.docMainContainer,(t||!a)&&ve.docMainContainerEnhanced),children:(0,Z.tZ)("div",{className:(0,i.Z)("container padding-top--md padding-bottom--lg",ve.docItemWrapper,t&&ve.docItemWrapperEnhanced),children:n})})}var Ze="docPage__5DB",ge="docsWrapper_BCFX";function _e(e){var t=e.children,n=(0,s.V)(),i=(0,a.useState)(!1),r=i[0],o=i[1];return(0,Z.BX)(u.Z,{wrapperClassName:ge,children:[(0,Z.tZ)(m.Z,{}),(0,Z.BX)("div",{className:Ze,children:[n&&(0,Z.tZ)(pe,{sidebar:n.items,hiddenSidebarContainer:r,setHiddenSidebarContainer:o}),(0,Z.tZ)(fe,{hiddenSidebarContainer:r,children:t})]})]})}var ke=n(74248),Ce=n(33647);function Ie(e){var t=e.versionMetadata;return(0,Z.BX)(Z.HY,{children:[(0,Z.tZ)(Ce.Z,{version:t.version,tag:(0,l.os)(t.pluginId,t.version)}),(0,Z.tZ)(r.d,{children:t.noIndex&&(0,Z.tZ)("meta",{name:"robots",content:"noindex, nofollow"})})]})}function Se(e){var t=e.versionMetadata,n=(0,c.hI)(e);if(!n)return(0,Z.tZ)(ke.default,{});var a=n.docElement,l=n.sidebarName,u=n.sidebarItems;return(0,Z.BX)(Z.HY,{children:[(0,Z.tZ)(Ie,Object.assign({},e)),(0,Z.tZ)(r.FG,{className:(0,i.Z)(o.k.wrapper.docsPages,o.k.page.docsDocPage,e.versionMetadata.className),children:(0,Z.tZ)(d.q,{version:t,children:(0,Z.tZ)(s.b,{name:l,items:u,children:(0,Z.tZ)(_e,{children:a})})})})]})}},74248:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});n(67294);var a=n(97325),i=n(35463),r=n(58493),o=n(35944);function l(){return(0,o.BX)(o.HY,{children:[(0,o.tZ)(i.d,{title:(0,a.I)({id:"theme.NotFound.title",message:"Page Not Found"})}),(0,o.tZ)(r.Z,{children:(0,o.tZ)("main",{className:"container margin-vert--xl",children:(0,o.tZ)("div",{className:"row",children:(0,o.BX)("div",{className:"col col--6 col--offset-3",children:[(0,o.tZ)("h1",{className:"hero__title",children:(0,o.tZ)(a.Z,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,o.tZ)("p",{children:(0,o.tZ)(a.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,o.tZ)("p",{children:(0,o.tZ)(a.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})})]})}},58801:function(e,t,n){n.d(t,{E:function(){return c},q:function(){return l}});var a=n(67294),i=n(58755),r=n(35944),o=a.createContext(null);function l(e){var t=e.children,n=e.version;return(0,r.tZ)(o.Provider,{value:n,children:t})}function c(){var e=(0,a.useContext)(o);if(null===e)throw new i.i6("DocsVersionProvider");return e}}}]);