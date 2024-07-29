"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[9365],{97042:(e,r,t)=>{t.d(r,{A:()=>i});var s=t(96540),a=t(40961),o=t(50991);const c={tooltip:"tooltip_LqSg",tooltipArrow:"tooltipArrow_bmQN"};var n=t(2445);function i(e){let{children:r,id:t,anchorEl:i,text:l,delay:d}=e;const[h,m]=(0,s.useState)(!1),[u,v]=(0,s.useState)(null),[g,p]=(0,s.useState)(null),[w,f]=(0,s.useState)(null),[_,b]=(0,s.useState)(null),{styles:Y,attributes:C}=(0,o.E)(u,g,{modifiers:[{name:"arrow",options:{element:w}},{name:"offset",options:{offset:[0,8]}}]}),F=(0,s.useRef)(null),N=t+"_tooltip";return(0,s.useEffect)((()=>{b(i?"string"==typeof i?document.querySelector(i):i:document.body)}),[_,i]),(0,s.useEffect)((()=>{const e=["mouseenter","focus"],r=["mouseleave","blur"],t=()=>{""!==l&&(null==u||u.removeAttribute("title"),F.current=window.setTimeout((()=>{m(!0)}),d||400))},s=()=>{clearInterval(F.current),m(!1)};return u&&(e.forEach((e=>{u.addEventListener(e,t)})),r.forEach((e=>{u.addEventListener(e,s)}))),()=>{u&&(e.forEach((e=>{u.removeEventListener(e,t)})),r.forEach((e=>{u.removeEventListener(e,s)})))}}),[u,l,d]),(0,n.FD)(n.FK,{children:[s.cloneElement(r,{ref:v,"aria-describedby":h?N:void 0}),_?a.createPortal(h&&(0,n.FD)("div",{id:N,role:"tooltip",ref:p,className:c.tooltip,style:Y.popper,...C.popper,children:[l,(0,n.Y)("span",{ref:f,className:c.tooltipArrow,style:Y.arrow})]}),_):_]})}},38619:(e,r,t)=>{t.r(r),t.d(r,{default:()=>S,prepareUserState:()=>I});var s=t(96540),a=t(37381),o=t.n(a),c=t(75150),n=t(20053),i=t(23230),l=t(13012),d=t(35358),h=t(49231);const m={showcaseCard:"showcaseCard_MkqL",showcaseCardImage:"showcaseCardImage_WoVb",showcaseCardHeader:"showcaseCardHeader_Mceh",showcaseCardTitle:"showcaseCardTitle_J7aP",svgIconFavorite:"svgIconFavorite_Xc7Y",showcaseCardSrcBtn:"showcaseCardSrcBtn_nptx",showcaseCardBody:"showcaseCardBody_R1Nj",cardFooter:"cardFooter_ODAT",tag:"tag_P8ik",textLabel:"textLabel_MjoO",colorLabel:"colorLabel_gM4S"},u={svgIcon:"svgIcon_R3jO",small:"small_SUAn",medium:"medium_GxVq",large:"large_TyPU",primary:"primary_V8Cc",secondary:"secondary_WyIo",success:"success_lY5U",error:"error_eHdq",warning:"warning_IB04",inherit:"inherit_2ln5"};var v=t(2445);function g(e){const{svgClass:r,colorAttr:t,children:s,color:a="inherit",size:o="medium",viewBox:c="0 0 24 24",...i}=e;return(0,v.Y)("svg",{viewBox:c,color:t,"aria-hidden":!0,className:(0,n.A)(u.svgIcon,u[a],u[o],r),...i,children:s})}function p(e){return(0,v.Y)(g,{...e,children:(0,v.Y)("path",{d:"M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"})})}var w=t(97042),f=t(41639);var _=t(23033);const b=s.forwardRef(((e,r)=>{let{label:t,color:s,description:a}=e;return(0,v.FD)("li",{ref:r,className:m.tag,title:a,children:[(0,v.Y)("span",{className:m.textLabel,children:t.toLowerCase()}),(0,v.Y)("span",{className:m.colorLabel,style:{backgroundColor:s}})]})}));function Y(e){let{tags:r}=e;const t=function(e,r){const t=[...e];return t.sort(((e,t)=>r(e)>r(t)?1:r(t)>r(e)?-1:0)),t}(r.map((e=>({tag:e,...f.YD[e]}))),(e=>f.LY.indexOf(e.tag)));return(0,v.Y)(v.FK,{children:t.map(((e,r)=>{const t="showcase_card_tag_"+e.tag;return(0,v.Y)(w.A,{text:e.description,anchorEl:"#__docusaurus",id:t,children:(0,v.Y)(b,{...e},r)},r)}))})}const C=(0,s.memo)((e=>{let{project:r}=e;const t=(0,s.useRef)(null),[{scale:a,zoom:o},c]=(0,h.zh)((()=>({scale:1,zoom:0,config:{mass:5,tension:500,friction:40}})));return(0,_.NH)({onHover:e=>{let{hovering:r}=e;return c(r?{scale:1.05}:{scale:1})}},{domTarget:t,eventOptions:{passive:!1}}),(0,v.FD)(h.CS.li,{ref:t,style:{transform:"perspective(100px)",scale:(0,h.to)([a,o],((e,r)=>e+r))},className:(0,n.A)("card shadow--md",m.showcaseCard),children:[r.preview&&(0,v.Y)("div",{className:(0,n.A)("card__image",m.showcaseCardImage),children:(0,v.Y)(l.A,{src:r.preview,alt:r.title,img:r.preview})}),(0,v.FD)("div",{className:"card__body",children:[(0,v.FD)("div",{className:(0,n.A)(m.showcaseCardHeader),children:[(0,v.Y)("h4",{className:m.showcaseCardTitle,children:(0,v.Y)(d.A,{href:r.website,className:m.showcaseCardLink,children:r.title})}),r.tags.includes("favorite")&&(0,v.Y)(p,{svgClass:m.svgIconFavorite,size:"small"}),r.source&&(0,v.Y)(d.A,{href:r.source,className:(0,n.A)("button button--secondary button--sm",m.showcaseCardSrcBtn),children:(0,v.Y)(i.A,{id:"showcase.card.sourceLink",children:"source"})})]}),(0,v.Y)("p",{className:m.showcaseCardBody,children:r.description})]}),(0,v.Y)("ul",{className:(0,n.A)("card__footer",m.cardFooter),children:(0,v.Y)(Y,{tags:r.tags})})]},r.title)})),F=C;var N=t(31712);const L={filterCheckbox:"filterCheckbox_FZyb",checkboxList:"checkboxList_LYI2",showcaseList:"showcaseList_mWrw",checkboxListItem:"checkboxListItem_b1JS",searchContainer:"searchContainer_a2sm",showcaseFavorite:"showcaseFavorite_GB3i",showcaseFavoriteHeader:"showcaseFavoriteHeader_A4FS",svgIconFavoriteXs:"svgIconFavoriteXs_M3yI",svgIconFavorite:"svgIconFavorite_DKtz"},y=(0,i.T)({id:"theme.project.title",message:"\u4e2a\u4eba\u9879\u76ee"}),A=(0,i.T)({id:"theme.project.description",message:"\u4ee5\u4e0b\u9879\u76ee\u5747\u7531\u672c\u4eba\u5f00\u53d1\uff0c\u5747\u53ef\u81ea\u7531\u4f7f\u7528\uff0c\u90e8\u5206\u5f00\u6e90\u3002"}),x="https://github.com/justwe7";function I(){var e;if(N.A.canUseDOM)return{scrollTopPosition:window.scrollY,focusedElementId:null==(e=document.activeElement)?void 0:e.id}}function k(){return(0,v.FD)("section",{className:"margin-top--lg margin-bottom--lg text--center",children:[(0,v.Y)("h1",{children:y}),(0,v.Y)("a",{className:"button button--primary",href:x,target:"_blank",rel:"noreferrer"})]})}function E(){return 0===f.dt.length?(0,v.Y)("section",{className:"margin-top--lg margin-bottom--xl",children:(0,v.Y)("div",{className:"container padding-vert--md text--center",children:(0,v.Y)("h2",{children:"No result"})})}):(0,v.Y)("section",{className:"margin-top--lg margin-bottom--xl",children:(0,v.Y)(v.FK,{children:(0,v.FD)("div",{className:"container margin-top--lg",children:[(0,v.Y)("div",{className:(0,n.A)("margin-bottom--md",L.showcaseFavoriteHeader)}),Object.entries(f.V3).map((e=>{let[r,t]=e;return(0,v.FD)("div",{children:[(0,v.Y)("div",{className:(0,n.A)("margin-bottom--md",L.showcaseFavoriteHeader),children:(0,v.Y)("h2",{children:o().upperFirst(r)})}),(0,v.Y)("ul",{className:L.showcaseList,children:t.map((e=>(0,v.Y)(F,{project:e},e.title)))})]},r)}))]})})})}const S=function(){return(0,v.Y)(c.A,{title:y,description:A,children:(0,v.FD)("main",{className:"margin-vert--lg",children:[(0,v.Y)(k,{}),(0,v.Y)(E,{})]})})}}}]);